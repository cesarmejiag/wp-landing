!function(){"use strict";"serviceWorker"in navigator&&navigator.serviceWorker.register("sw.js").then(function(e){console.log("Service worker registered.")}).catch(function(e){console.log("Can not find service worker.")}),window.addEventListener("load",function(e){var o;(o=document.querySelector(".loader"))&&(o.classList.remove("loader-visible"),setTimeout(function(){o.style.zIndex="-1"},575))})}();