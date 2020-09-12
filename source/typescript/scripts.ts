/// <reference path="./../../node_modules/@types/jquery/JQuery.d.ts" />
/// <reference path="./ContactForm.ts" />
/// <reference path="./Scrollfire.ts" />

/**
 * Make your magic here!
 */
(() => {
    'use strict'

    // Register service worker.
    if ("serviceWorker" in navigator) {
        const swPath = 'sw.js';

        navigator.serviceWorker.register(swPath)
            .then(res => { console.log('Service worker registered.') })
            .catch(res => { console.log('Can not find service worker.') })
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

    /**
     * Initialize stellar js.
     */
    function initStellar() {
        $.stellar({
            // Set scrolling to be in either one or both directions
            horizontalScrolling: false,
            verticalScrolling: true,

            // Set the global alignment offsets
            horizontalOffset: 0,
            verticalOffset: 0,

            // Refreshes parallax content on window load and resize
            responsive: false,

            // Select which property is used to calculate scroll.
            // Choose 'scroll', 'position', 'margin' or 'transform',
            // or write your own 'scrollProperty' plugin.
            scrollProperty: 'scroll',

            // Select which property is used to position elements.
            // Choose between 'position' or 'transform',
            // or write your own 'positionProperty' plugin.
            positionProperty: 'position',

            // Enable or disable the two types of parallax
            parallaxBackgrounds: true,
            parallaxElements: true,

            // Hide parallax elements that move outside the viewport
            hideDistantElements: true,

            // Customise how elements are shown and hidden
            hideElement: function ($elem) { $elem.hide(); },
            showElement: function ($elem) { $elem.show(); }
        });
    }

    /**
     * Notify to google analytics.
     * @param category 
     * @param action 
     * @param label 
     */
    function ga(category, action, label?) {
        if ("function" === typeof (<any>window).gtag
            && "string" === typeof category
            && "string" === typeof action) {

            let obj = {
                'event_category': category,
                'event_label': label || ''
            };

            (<any>window).gtag('event', action, obj);

            // Print in console.
            if ("console" in window) {
                console.log(
                    'ga: [category: %s, action: %s, label: %s]',
                    category, action, label || ''
                );
            }
        }
    };

    /**
     * Initialize scrollfire.
     */
    function initScrollFire() {
        const elements = document.querySelectorAll('[class*=inview]');
        [].forEach.call(elements, element => {
            const settings = {
                method: 'markerOver',
                markerPercentage: 55,
                rangeMin: 10,
                rangeMax: 90
            };

            const scrollFire = new ScrollFire(element, settings);

            scrollFire.inview.add((element) => {
                if (!Classie.hasClass(element, 'apply-inview')) {
                    Classie.addClass(element, 'apply-inview');
                }
            });
        });
    }

    /**
     * Initialize ga buttons.
     */
    function initGaButtons() {
        const buttons = document.querySelectorAll('.ga-button');

        [].forEach.call(buttons, button => {
            button.addEventListener('click', ev => {
                ga(
                    ev.currentTarget.dataset['category'],
                    ev.currentTarget.dataset['action']
                );
            });
        });
    }

    /**
     * Show or hide element
     * @param {HTMLElement} element
     * @param {boolean} show
     */
    function showElement(element, show) {
        element.style.display = show ? 'block' : 'none';
    }

    var formElement: HTMLFormElement = document.querySelector('.contact-form');
    var message: HTMLElement = formElement.querySelector('.message');
    var wrapper: HTMLElement = formElement.querySelector('.wrapper');
    var form = new ContactForm(formElement, {
        url: 'handle-send-mail.php',
        useAjax: true,
        inputSelectors: [
            "input[type=text]",
            "input[type=checkbox]",
            "input[type=radio]",
            "select",
            "textarea"
        ]
    });

    // Attach error handler.
    form.error.add(function (status, statusText) {
        // Show message in console.
        console.log('There was an error. \nStatus: %s\nStatusText: %s', status, statusText);

        ga('Contacto', `Error al enviar mensaje`);

        message.innerText = "Ocurrió un error, por favor intentalo más tarde.";

        setTimeout(function () {
            showElement(wrapper, true);
            showElement(message, false);

            message.innerText = "";
        }, 3000);
    });

    // Attach sending handler.
    form.sending.add(function () {
        // Show message in console.
        console.log('Sending...');

        ga('Contacto', `Enviando mensaje`);

        showElement(wrapper, false);
        showElement(message, true);

        message.innerText = "Enviando... ";
    });

    // Attach success handler.
    form.success.add(function (response, status, statusText) {
        console.log(response);

        if (parseInt(response) === 1) {
            // Show message in console.
            console.log('The message has been sent successfuly. \nStatus: %s\nStatusText: %s', status, statusText);

            ga('Contacto', `Mensaje enviado`);

            message.innerText = "Tu mensaje ha sido enviado correctamente.";
        } else {
            ga('Contacto', `Error al enviar mensaje`);
            message.innerText = "Ocurrió un error, por favor intentalo más tarde.";
        }

        setTimeout(function () {
            showElement(wrapper, true);
            showElement(message, false);

            message.innerText = "";
        }, 3000);
    });

    // Attach inputChange handler.
    form.inputChange.add(function (input, valid) {
        let name = input.name;
        console.log("Input %s has changed", name);
    });

    window.addEventListener('load', ev => {
        initScrollFire();
        initStellar();
        initGaButtons();
        removeLoader();
    });


})()