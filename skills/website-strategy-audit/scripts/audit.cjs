#!/usr/bin/env node
'use strict';
// Autonomous, read-only browser evidence collection. Requires global Playwright + Chromium.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { URL } = require('node:url');
const { chromium } = require('playwright');

const start = process.argv[2];
if (!start || !/^https?:\/\//i.test(start)) {
  console.error('Usage: node audit.cjs https://example.com [output-directory]');
  process.exit(2);
}
const rootInput = new URL(start);
if (rootInput.username || rootInput.password) throw new Error('Credentials in URLs are unsupported');
const output = path.resolve(process.argv[3] || path.join(process.cwd(), 'website-audit-' + rootInput.hostname.replace(/[^\w.-]/g, '-')));
const limit = 25, maxDiscovered = 180, maxSitemapFiles = 5;
const timeout = 18000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const safeName = (value) => value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 90) || 'home';
const xmlDecode = text => text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const cleanUrl = (candidate, base, origin) => {
  try {
    const u = new URL(candidate, base);
    if (!['http:', 'https:'].includes(u.protocol) || u.origin !== origin || u.username || u.password) return null;
    u.hash = '';
    for (const key of [...u.searchParams.keys()]) if (/^(utm_|gclid$|fbclid$|ref$|mc_)/i.test(key)) u.searchParams.delete(key);
    if ([...u.searchParams.keys()].length > 0) return null; // Exclude faceted/filter/tracking URLs.
    if (/\.(pdf|zip|png|jpe?g|gif|webp|avif|svg|css|js|json|xml|txt|mp4|webm|woff2?)$/i.test(u.pathname)) return null;
    u.pathname = u.pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
    return u.href;
  } catch { return null; }
};
const classify = (url) => {
  const p = new URL(url).pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (p === '/') return 'home';
  if (/\/(login|signin|sign-in|register|signup|account|profile)(\/|$)/.test(p)) return 'account';
  if (/\/(checkout|payment|pay)(\/|$)/.test(p)) return 'checkout';
  if (/\/(cart|basket)(\/|$)/.test(p)) return 'cart';
  if (/\/(contact|contacto|get-in-touch)(\/|$)/.test(p)) return 'contact';
  if (/\/(about|nosotros|quienes-somos|company)(\/|$)/.test(p)) return 'about';
  if (/\/(pricing|precios|plans|planes)(\/|$)/.test(p)) return 'pricing';
  if (/\/(faq|questions|ayuda)(\/|$)/.test(p)) return 'faq';
  if (/\/(privacy|legal|terms|cookies|privacidad)(\/|$)/.test(p)) return 'legal';
  if (/\/(blog|articles|news|journal|noticias|articulos)(\/[^/]+){1,}/.test(p)) return 'article_detail';
  if (/\/(blog|articles|news|journal|noticias|articulos)$/.test(p)) return 'editorial_index';
  if (/\/(product|products|producto|productos|shop|tienda)\/[^/]+\/[^/]+/.test(p)) return 'product_detail';
  if (/\/(product|products|producto|productos)\/[^/]+$/.test(p)) return 'product_detail';
  if (/\/(shop|tienda|category|categories|categoria|categorias|collections)(\/|$)/.test(p)) return 'catalog';
  if (/\/(services|servicios)(\/[^/]+)+/.test(p)) return 'service_detail';
  if (/\/(services|servicios)$/.test(p)) return 'services';
  if (/\/(search|buscar)$/.test(p)) return 'search';
  return 'other';
};
const template = url => {
  const p = new URL(url).pathname;
  const t = classify(url);
  if (['article_detail','product_detail','service_detail'].includes(t)) return p.split('/').slice(0,-1).join('/') + '/:slug';
  return p || '/';
};
const priority = url => {
  const type = classify(url);
  const ranked = ['home','pricing','services','contact','about','catalog','editorial_index','faq','cart','checkout','search','service_detail','product_detail','article_detail','other','legal','account'];
  return ranked.indexOf(type) * 10 + Math.min(new URL(url).pathname.split('/').length, 12);
};
const md = x => String(x ?? '').replace(/[|\r\n]+/g,' ').slice(0,180);
const graphId = x => 'N' + Buffer.from(x).toString('hex').slice(0, 18);
function write(f, data) { fs.writeFileSync(path.join(output,f),data); }
function tableCell(x) { return md(x).replace(/`/g,"'"); }
async function main() {
  fs.mkdirSync(output,{recursive:true});
  fs.mkdirSync(path.join(output,'screenshots'),{recursive:true});
  const browser = await chromium.launch({headless:true});
  const errors = [], visited = new Set(), candidates = new Set();
  const pages = [], edges = [], responseCodes = [], sitemapUrls = [];
  let origin = rootInput.origin;
  const context = await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,locale:'en-US'});
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(timeout);
  // Resolve the website's canonical host redirect before enforcing same-origin crawl.
  try { await page.goto(rootInput.href,{waitUntil:'domcontentloaded',timeout}); origin = new URL(page.url()).origin; }
  catch(e) { errors.push({url:rootInput.href,error:String(e.message)}); }
  const homepage = cleanUrl(page.url(), page.url(), origin) || origin + '/';
  const add = (url,base=homepage) => { const u=cleanUrl(url,base,origin); if(u && candidates.size < maxDiscovered) candidates.add(u); return u; };
  add(homepage);
  const fetchText = async url => {
    try { const r=await context.request.get(url,{timeout:9000,maxRedirects:3}); return r.ok() ? await r.text() : ''; }
    catch { return ''; }
  };
  const robots = await fetchText(origin + '/robots.txt');
  const blocked = [];
  let isWildcard=false;
  robots.split(/\r?\n/).forEach(line => {
    const text=line.split('#')[0].trim();
    if(/^user-agent:/i.test(text)) isWildcard = /^user-agent:\s*\*\s*$/i.test(text);
    if(isWildcard && /^disallow:/i.test(text)) {
      const value=text.slice(text.indexOf(':')+1).trim();
      if(value.startsWith('/')) blocked.push(value.split('*')[0]);
    }
  });
  const allowed = u => !blocked.some(p => p && new URL(u).pathname.startsWith(p));
  const initial = [...robots.matchAll(/^sitemap:\s*(\S+)/gim)].map(m=>m[1]);
  const sitemapQueue = initial.length ? initial : [origin + '/sitemap.xml'];
  const seenMaps = new Set();
  while(sitemapQueue.length && seenMaps.size < maxSitemapFiles) {
    const s = sitemapQueue.shift();
    if(seenMaps.has(s)) continue;
    seenMaps.add(s);
    const xml=await fetchText(s);
    for(const m of xml.matchAll(/<loc(?:\s[^>]*)?>([\s\S]*?)<\/loc>/gi)) {
      const val=xmlDecode(m[1].trim());
      if(/\.xml(?:\.gz)?(?:\?|$)/i.test(val)) { if(sitemapQueue.length<maxSitemapFiles) sitemapQueue.push(val); }
      else { const u=add(val); if(u) sitemapUrls.push(u); }
    }
  }
  let count=0;
  const typeCounts = new Map();
  const evaluated = new Set();
  const takeNext = () => {
    const choices = [...candidates].filter(x=>!evaluated.has(x) && allowed(x));
    choices.sort((a,b)=>priority(a)-priority(b));
    for(const u of choices) {
      evaluated.add(u);
      const t=classify(u);
      const cap=['product_detail','article_detail','service_detail'].includes(t) ? 2 : (t==='other' ? 7 : 5);
      if((typeCounts.get(t)||0) >= cap) continue;
      typeCounts.set(t,(typeCounts.get(t)||0)+1);
      return u;
    }
    return null;
  };
  while(count < limit) {
    const url = takeNext();
    if(!url) break;
    count++;
    try {
      const response = await page.goto(url,{waitUntil:'domcontentloaded',timeout});
      await page.waitForTimeout(650);
      const actual = cleanUrl(page.url(),page.url(),origin);
      if(!actual || visited.has(actual)) continue;
      visited.add(actual);
      const data = await page.evaluate(() => {
        const str = sel => document.querySelector(sel)?.content?.trim() || '';
        const trim = v => String(v||'').replace(/\s+/g,' ').trim().slice(0,180);
        const visible = el => !!(el.getBoundingClientRect().width && el.getBoundingClientRect().height);
        const links = (root,cap) => Array.from(root.querySelectorAll('a[href]')).slice(0,cap).map(a=>({href:a.href,text:trim(a.innerText || a.getAttribute('aria-label'))}));
        const ctas = Array.from(document.querySelectorAll('a,button,input[type="submit"]')).filter(visible).slice(0,140).map(el=>{
          const r=el.getBoundingClientRect(); return {text:trim(el.innerText||el.value||el.getAttribute('aria-label')),href:el.href||null,aboveFold:r.top<window.innerHeight,tag:el.tagName.toLowerCase()};
        }).filter(x=>x.text).slice(0,50);
        const forms=Array.from(document.querySelectorAll('form')).map(f=>({action:f.action,method:f.method,inputs:f.querySelectorAll('input,select,textarea').length})).slice(0,12);
        const scripts=Array.from(document.querySelectorAll('script[type="application/ld+json"]')).slice(0,12).map(s=>{try {return JSON.parse(s.textContent)}catch{return null}}).filter(Boolean);
        const navRoots=Array.from(document.querySelectorAll('nav,[role="navigation"],header')).slice(0,8);
        const perf=performance.getEntriesByType('navigation')[0];
        return {title:document.title,description:str('meta[name="description"]'),robots:str('meta[name="robots"]'),canonical:document.querySelector('link[rel="canonical"]')?.href||'',ogTitle:str('meta[property="og:title"]'),h1:Array.from(document.querySelectorAll('h1')).map(n=>trim(n.innerText)),h2:Array.from(document.querySelectorAll('h2')).slice(0,20).map(n=>trim(n.innerText)),lang:document.documentElement.lang,viewport:str('meta[name="viewport"]'),links:links(document,350),navigation:navRoots.flatMap(n=>links(n,70)).slice(0,140),ctas,forms,structuredDataTypes:scripts.flatMap(x=>Array.isArray(x)?x.map(i=>i['@type']):[x['@type']]).filter(Boolean).slice(0,15),imageCount:document.images.length,missingAlt:Array.from(document.images).filter(i=>!i.hasAttribute('alt')).length,overflowX:document.documentElement.scrollWidth > innerWidth + 2,viewportWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyText:String(document.body?.innerText||'').replace(/\s+/g,' ').trim().slice(0,6500),navigationDurationMs:perf?Math.round(perf.duration):null};
      });
      const rec={url:actual,type:classify(actual),template:template(actual),status:response?.status()||null,...data};
      pages.push(rec); responseCodes.push({url:actual,status:rec.status});
      for(const l of data.links){const dest=add(l.href,actual);if(dest)edges.push({from:actual,to:dest,text:l.text,isNavigation:data.navigation.some(n=>n.href===l.href)});}
      // Desktop evidence for important page types, mobile evidence for critical journeys.
      if (pages.length <= 6) {
        const name=String(pages.length).padStart(2,'0')+'-'+safeName(rec.type);
        await page.screenshot({path:path.join(output,'screenshots',name+'-desktop.png'),fullPage:false,timeout:7000}).catch(()=>{});
        const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
        const mp=await mobile.newPage();
        try {
          await mp.goto(actual,{waitUntil:'domcontentloaded',timeout});await mp.waitForTimeout(450);
          const mobileInfo=await mp.evaluate(()=>({overflowX:document.documentElement.scrollWidth>innerWidth+2,scrollWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,visibleCtas:Array.from(document.querySelectorAll('a,button')).filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&r.top<innerHeight}).slice(0,20).map(el=>(el.innerText||el.getAttribute('aria-label')||'').trim().slice(0,90)).filter(Boolean)}));
          rec.mobile=mobileInfo;
          await mp.screenshot({path:path.join(output,'screenshots',name+'-mobile.png'),fullPage:false,timeout:7000});
          const menu=mp.locator('button[aria-expanded="false"][aria-controls],button[aria-label*="menu" i],button[aria-label*="navigation" i]').first();
          if(await menu.count()) {await menu.click({timeout:2000}).catch(()=>{});await mp.screenshot({path:path.join(output,'screenshots',name+'-mobile-menu.png'),fullPage:false,timeout:6000}).catch(()=>{});}
        } catch(e) {errors.push({url:actual,device:'mobile',error:String(e.message)});}
        finally {await mobile.close();}
      }
    } catch(e) {errors.push({url,error:String(e.message)}); }
    await sleep(180);
  }
  await context.close();await browser.close();
  // Primary navigation plus architectural patterns, not every product/article URL.
  const nodes=new Map();
  for(const r of pages) nodes.set(r.url,r.type==='home'?'Home':(r.h1[0]||r.title||new URL(r.url).pathname).slice(0,44));
  const edgesTop=edges.filter(e=>e.isNavigation && nodes.has(e.from)&&nodes.has(e.to));
  const fallback=edges.filter(e=>nodes.has(e.from)&&nodes.has(e.to));
  const uniqueEdges=[...new Map((edgesTop.length?edgesTop:fallback).map(e=>[e.from+'|'+e.to,e])).values()].slice(0,100);
  const graph=['flowchart TD',...Array.from(nodes,([url,title])=>'  '+graphId(url)+'["'+md(title).replace(/["\[\]]/g,'')+'"]'),...uniqueEdges.map(e=>'  '+graphId(e.from)+' --> '+graphId(e.to))].join('\n')+'\n';
  write('navigation-as-is.mmd',graph);
  const archetypes=[...new Set(pages.map(p=>p.type))];
  const route=['flowchart TD','  H["Home / landing"]','  H --> V["Value proposition + primary CTA"]','  V --> P["Primary offer / category"]','  P --> D["Representative detail template"]','  D --> C["Conversion step / contact / checkout"]','  H --> T["Trust / about / FAQ"]','  T --> C'];
  write('navigation-to-be-proposal.mmd',route.join('\n')+'\n');
  const seenTypes=[...new Set(pages.map(p=>p.type))];
  const status=pages.filter(p=>p.status>=400).map(p=>p.url);
  const records=[];
  for(const p of pages){
    const issues=[];
    if(!p.title)issues.push('Missing title');
    if(!p.description)issues.push('Missing meta description');
    if(!p.canonical)issues.push('Canonical not found');
    if(!p.h1.length)issues.push('No H1');
    if(p.h1.length>1)issues.push('Multiple H1: review context');
    if(p.missingAlt)issues.push(p.missingAlt+' images without alt attribute');
    if(p.mobile?.overflowX)issues.push('Horizontal mobile overflow observed');
    if(p.status>=400)issues.push('HTTP '+p.status);
    records.push({url:p.url,type:p.type,issues});
  }
  write('evidence.json',JSON.stringify({input:start,origin,homepage,limits:{pages:limit,discovered:maxDiscovered},discovered:candidates.size,examined:pages.length,sitemapEntries:sitemapUrls.length,sitemapFiles:[...seenMaps],robotsPresent:!!robots,robotsDisallow:blocked,pages,edges,errors,issues:records},null,2));
  const csv=(v)=>'"'+String(v??'').replace(/"/g,'""')+'"';
  write('page-inventory.csv',['url,type,template,status,title,description,canonical,h1,issues',...pages.map(p=>[p.url,p.type,p.template,p.status,p.title,p.description,p.canonical,p.h1.join(' / '),records.find(r=>r.url===p.url).issues.join('; ')].map(csv).join(','))].join('\n')+'\n');
  const lhResults=[];
  if(process.env.SKIP_LIGHTHOUSE!=='1') {
    const targetUrls=[pages.find(p=>p.type==='home')?.url, pages.find(p=>p.type==='catalog'||p.type==='services'||p.type==='pricing')?.url].filter(Boolean);
    const chromePath=chromium.executablePath();
    for(const target of [...new Set(targetUrls)]) {
      const reportFile='lighthouse-'+safeName(new URL(target).pathname)+'-'+lhResults.length+'.json';
      const cmd=spawnSync('lighthouse',[target,'--output=json','--output-path='+path.join(output,reportFile),'--chrome-flags=--headless --no-sandbox','--quiet','--max-wait-for-load=20000','--only-categories=performance,accessibility,best-practices,seo'],{encoding:'utf8',timeout:95000,env:{...process.env,CHROME_PATH:chromePath}});
      if(cmd.status===0 && fs.existsSync(path.join(output,reportFile))) {
        try {const r=JSON.parse(fs.readFileSync(path.join(output,reportFile),'utf8'));lhResults.push({url:target,report:reportFile,scores:Object.fromEntries(Object.entries(r.categories||{}).map(([k,v])=>[k,Math.round((v.score||0)*100)])),lab:{lcp:r.audits?.['largest-contentful-paint']?.displayValue,cls:r.audits?.['cumulative-layout-shift']?.displayValue}});}
        catch(e){errors.push({tool:'lighthouse',url:target,error:String(e.message)});}
      } else errors.push({tool:'lighthouse',url:target,error:(cmd.error?.message||cmd.stderr||'Lighthouse failed or missing').slice(0,550)});
    }
  }
  write('lighthouse-summary.json',JSON.stringify(lhResults,null,2));
  const technical=records.filter(r=>r.issues.length);
  const home=pages.find(p=>p.type==='home');
  const navText=['# Website strategy audit — evidence report','','- Target: '+start,'- Final origin: '+origin,'- Pages inspected: '+pages.length+' (discovered '+candidates.size+', sampled by template)','- Date: '+new Date().toISOString(),'- Robots.txt: '+(robots?'retrieved':'not found / inaccessible'),'- Sitemap entries discovered: '+sitemapUrls.length,'- Browser: Playwright Chromium (desktop 1440px; mobile 390px on first six sampled pages)','','## Website structure','','Detected page types: '+(seenTypes.join(', ')||'none')+'.','','### Current navigation (AS-IS)','','```mermaid',graph.trim(),'```','','### Suggested conversion-oriented navigation (TO-BE — hypothesis)','','```mermaid',route.join('\n'),'```','','## Technical findings (observed)','','| URL | Page type | Findings |','| --- | --- | --- |',...technical.map(r=>'| '+tableCell(new URL(r.url).pathname)+' | '+r.type+' | '+tableCell(r.issues.join('; '))+' |'),'', '## Lighthouse lab audits','',lhResults.length?'| Page | Performance | Accessibility | Best practices | SEO |':'No verified Lighthouse scores collected. See errors in evidence.json.',...(lhResults.length?['| --- | --- | --- | --- | --- |',...lhResults.map(r=>'| '+tableCell(new URL(r.url).pathname)+' | '+(r.scores.performance??'N/A')+' | '+(r.scores.accessibility??'N/A')+' | '+(r.scores['best-practices']??'N/A')+' | '+(r.scores.seo??'N/A')+' |')]:[]),'','Lighthouse results are LAB observations. Do not present them as field Core Web Vitals or predict rankings.','','## Business / UX / marketing review (agent synthesis required)','','Review evidence.json, screenshots, sampled navigation, page content and CTA placement. Assess: audience, positioning, value proposition, funnel friction, mobile navigation, trust, visual hierarchy, form complexity, SEO content gaps and conversion optimization. Cite inspected URLs and images; distinguish observed failures from hypotheses.','','## Prioritization','','For every verified or hypothesized opportunity: problem → evidence → customer/business impact → proposed fix → effort → confidence → validation. Prioritize by impact versus effort.','','## Sampling and limitations','','Product and article detail URLs are represented by samples, not exhaustive page-by-page coverage. Navigation graphs are representative; AS-IS only links between visited pages, TO-BE is a proposed conversion structure, not an observed graph. No checkout submission, account authentication or live purchasing was performed. Missing scores indicate unavailable measurements, not passes.','','## Crawl errors','',''+(errors.map(x=>'- '+JSON.stringify(x)).join('\n')||'None')];
  write('report.md',navText.join('\n')+'\n');
  console.log(JSON.stringify({output,examined:pages.length,discovered:candidates.size,lighthouse:lhResults.length,errors:errors.length,report:path.join(output,'report.md')},null,2));
  if(!pages.length)process.exitCode=1;
}
main().catch(e=>{console.error(e.stack||String(e));process.exitCode=1;});
