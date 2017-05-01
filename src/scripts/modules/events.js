/**
 * Descrition
 */
define(function () {
    "use strict";

    /**
     * This is our classes constructor;
     */
    function bjsEvents() {
        if (!(this instanceof bjsEvents)) {
            throw new TypeError("bjsEvents constructor cannot be called as a function.");
        }
    }




    bjsEvents.prototype = {

        /**
         * Whenever you replace an Object's Prototype, you need to repoint
         * the base Constructor back at the original constructor Function,
         * otherwise `instanceof` calls will fail.
         */
        constructor: bjsEvents,
        addListener: addListener,
        // addListenerToAll: addListenerToAll,
        removeListener: removeListener,
        throttle: throttle
    };

    /**
     * adds an eventListener to an object.
     *
     * @param [NodeList|Object|String]  el  Object(s) to bind the listener
     * @param [String]  eventName Name of the event e.g. click
     * @param [function]  handler Callback function
     */
    function addListener(el, eventName, handler) {
      if(typeof(el) == "string"){
        el = document.querySelectorAll(el);
        if(el.length == 1){
          el = el[0]; // if only one set it properly
        }
      }

      if (el == null || typeof(el) == 'undefined') return;

      if(el.length !== undefined && el.length > 1 && el != window){ // it's a NodeListCollection
        for (var i = 0; i < el.length; ++i) {
          attachListener(el[i], eventName, handler);
        }
      }else { // it's a single node
        // console.log(el);
        attachListener(el, eventName, handler);
      }
    }

    function attachListener(element, eventName, handler){
      if (element.addEventListener) {
        element.addEventListener(eventName, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, handler);
      } else {
        element['on' + eventName] = handler;
      }
    }

    function detachListener(element, eventName, handler){
      if (element.addEventListener) {
        element.removeEventListener(eventName, handler, false);
      }
      else if (element.detachEvent) {
        element.detachEvent('on' + eventName, handler);
      }
      else {
        element['on' + eventName] = null;
      }
    }



    function removeListener(el, eventName, handler) {
      if(typeof(el) == "string"){
        el = document.querySelectorAll(el);
        if(el.length == 1){
          el = el[0]; // if only one set it properly
        }
      }

      if (el == null || typeof(el) == 'undefined') return;

      if(el.length !== undefined && el.length > 1 && el != window){ // it's a NodeListCollection
        for (var i = 0; i < el.length; ++i) {
          detachListener(el[i], eventName, handler);
        }
      }else { // it's a single node
        // console.log(el);
        detachListener(el, eventName, handler);
      }
    }

    function throttle(func, interval) {
      var lastCall = 0;
      return function() {
        var now = Date.now();
        if (lastCall + interval < now) {
          lastCall = now;
          return func.apply(this, arguments);
        }
      };
    }

    return new bjsEvents();
});