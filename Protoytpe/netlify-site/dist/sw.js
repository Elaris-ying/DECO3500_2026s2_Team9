// Same-origin static cache only. Private device navigation is never intercepted.
const CACHE='gallery-echoes-online-ccea7d3bfd94';
const FILES=["/index.html","/dist/app.js","/dist/style.css","/manifest.webmanifest","/app-icon.svg","/app-icon-192.png","/app-icon-512.png","/public/assets/collection-01.webp","/public/assets/collection-02.webp","/public/assets/collection-03.webp","/public/assets/collection-04.webp","/public/assets/collection-05.webp","/public/assets/collection-06.webp","/public/assets/collective-visual.webp","/public/assets/feeling-reference.webp","/public/assets/figma-mode-personal.svg","/public/assets/figma-team-symbol.svg","/public/assets/figma-welcome-bottom.svg","/public/assets/figma-welcome-left.svg","/public/assets/figma-welcome-top.svg","/public/assets/my-sketch.webp","/public/assets/nfc-card.webp","/public/assets/nfc-proximity-bg.webp","/public/assets/pair-team-bg.webp","/public/assets/reflection-art.webp","/public/assets/shared-sketch.webp","/public/assets/shared-visual.webp","/public/assets/sketch-anonymous.webp","/public/assets/sketch-leo.webp","/public/assets/sketch-mia.webp","/public/assets/sketch-rina.webp","/public/assets/unvisited-11.webp","/public/assets/unvisited-12.webp","/public/assets/unvisited-13.webp","/public/assets/unvisited-14.webp","/public/assets/unvisited-15.webp","/public/assets/unvisited-16.webp","/public/assets/water-lilies.webp","/online-bootstrap.js"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gallery-echoes-online-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  if(request.mode==='navigate')event.respondWith(fetch(request).catch(()=>caches.match('/index.html')));
  else event.respondWith(caches.match(request,{ignoreSearch:true}).then(cached=>cached||fetch(request)));
});
