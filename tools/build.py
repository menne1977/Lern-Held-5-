import os,json
from PIL import Image,ImageDraw,ImageFont
S='src/';out='.';os.makedirs(out,exist_ok=True)
js=''.join(open(S+f,encoding='utf8').read()+'\n' for f in ['core.js','mathe.js','eng.js','deu.js','app.js','vocab.js','packs.js','hub.js','quiz.js','library.js','reader.js'])
css=open(S+'style.css',encoding='utf8').read()
html=f'''<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Schul-Held</title>
<meta name="theme-color" content="#2563eb">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Schul-Held">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png"><link rel="apple-touch-icon" href="icon-192.png">
<style>{css}</style></head><body>
<div id="app"></div>
<nav><a href="#/" data-k="home"><span>🏠</span>Start</a><a href="#/search" data-k="search"><span>🔎</span>Suche</a><a href="#/ki" data-k="ki"><span>🤖</span>KI</a><a href="#/photo" data-k="photo"><span>📷</span>Foto</a><a href="#/vocab" data-k="voc"><span>🔤</span>Vokabeln</a><a href="#/mine" data-k="mine"><span>🗂️</span>Meine</a></nav>
<script>{js}</script></body></html>'''
open(out+'/index.html','w',encoding='utf8').write(html)
json.dump({"name":"Schul-Held","short_name":"Schul-Held","description":"Lern-App Klasse 5–13: alle Fächer","start_url":"./index.html","scope":"./","display":"standalone","orientation":"portrait","background_color":"#2563eb","theme_color":"#2563eb","lang":"de","icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png","purpose":"any maskable"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]},open(out+'/manifest.webmanifest','w'),ensure_ascii=False)
open(out+'/sw.js','w').write('''const C='sh5-v22',A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n}).catch(()=>caches.match('./index.html'))))});
''')
def icon(n):
    im=Image.new('RGB',(n,n));d=ImageDraw.Draw(im)
    for y in range(n):
        t=y/n;d.line([(0,y),(n,y)],fill=(int(37+80*t),int(99-20*t),int(235-30*t)))
    d.ellipse([n*.12,n*.12,n*.88,n*.88],fill=(255,255,255))
    f=None
    for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(p): f=ImageFont.truetype(p,int(n*.55));break
    if f is None: f=ImageFont.load_default(int(n*.55))
    d.text((n/2,n*.52),'5',font=f,fill=(37,99,235),anchor='mm')
    im.save(f'{out}/icon-{n}.png')
pass
print('ok',len(html))
