/**
 * Make your magic here!
 */

(() => {
    'use strict'

    // Register service worker.
    if ( "serviceWorker" in navigator ) {
        const swPath = 'sw.js';

        navigator.serviceWorker.register(swPath)
            .then( res => { console.log('Service worker registered.') } )
            .catch( res => { console.log('Can not find service worker.') } )
    }

    /**
     * Remove loader when page is fully loaded.
     */
    function removeLoader() {
        const loader: HTMLElement = document.querySelector('.loader');
        
        if (loader) {
            loader.classList.remove('loader-visible');
            setTimeout(() => {
                loader.style.zIndex = "-1";
            }, 575);
        }
    }

    window.addEventListener('load', ev => {
        removeLoader();
    });


})()