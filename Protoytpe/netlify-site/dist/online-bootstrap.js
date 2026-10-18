// Online caching improves browsing after Wi-Fi changes; no device request occurs here.
if(location.protocol==='https:'&&'serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
