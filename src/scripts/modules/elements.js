/**
 * Descrition
 */
 /*jslint */
 /*global require: false, define: false, requirejs: false,
   window: false, clearInterval: false, document: false,
   self: false, setInterval: false */

define(function () {
    // "use strict";

    /**
     * This is our classes constructor;
     */
    function Elements() {
        if (!(this instanceof Elements)) {
            throw new TypeError("Elements constructor cannot be called as a function.");
        }
    }

    function isElement(obj) {
      // var el; 
      try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        // return obj instanceof HTMLElement;
        if(!(obj instanceof HTMLElement)){
          el = find(el);
          return el.length > 0;
        }
        return true;
      }
      catch(e){
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have. (works on IE7)
        return (typeof obj==="object") &&
          (obj.nodeType===1) && (typeof obj.style === "object") &&
          (typeof obj.ownerDocument ==="object");
      }
    }

    Elements.prototype = {

        /**
         * Whenever you replace an Object's Prototype, you need to repoint
         * the base Constructor back at the original constructor Function,
         * otherwise `instanceof` calls will fail.
         */
        constructor: Elements,
        find: find,
        findParentByClass: findParentByClass,
        findParentByTag: findParentByTag,
        hasClass: hasClass,
        hasClasses: hasClasses,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        exists: exists,
        getElementHeight: getElementHeight,
        getElementWidth: getElementWidth
    };

    function find(querySelector, element){
      if(element === undefined){
        element = document;
      }
      return element.querySelectorAll(querySelector);
    }

    function hasClass(el, className){
      if(!isElement(el)){
        return false;
      }
      if (el.classList){
          return el.classList.contains(className);
      }else{
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
      }
    }

    function hasClasses(el, classNames){
      if(!isElement(el)) return false;
      return new RegExp('\\b(' + classNames.join('|') + ')\\b', 'gi').test(el.className);
    }

    function addClass(el, className){
      if(!isElement(el)){
        return false;
      }
      // console.log(el);
      // console.log(el.classList);
      if (el.classList){
        el.classList.add(className);
      }else{
        el.className += ' ' + className;
      }
    }

    function removeClass(el, className){
      if(!isElement(el)){
        return false;
      }
      if (el.classList){
          el.classList.remove(className);
      }else{
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }

    function toggleClass(el, className){
      if(!isElement(el)){
        return false;
      }
      if (el.classList) {
          el.classList.toggle(className);
      } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);
        if (existingIndex >= 0){
          classes.splice(existingIndex, 1);
        }else{
          classes.push(className);
          el.className = classes.join(' ');
        }
      }
    }

    function findParentByClass(element, className){
      var parent = element.parentNode;
      if(parent !== null){
        if(hasClass(parent, className)){
          return parent;
        }else{
          parent = findParentByClass(parent, className);
        }
      }
      return parent;
    }

    function findParentByTag(element, tag){
      var parent = element.parentNode;
      if(parent !== null){
        if(parent.tagName == tag.toUpperCase()){
          return parent;
        }else{
          parent = findParentByTag(parent, tag);
        }
      }
      return parent;
    }

    // TODO: Check if this works
    // find nearest parent element
    // var closest = function closest(el, fn) {
    //     return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    // };

    function exists(selector, element){
      if(element === undefined){
        element = document;
      }
      return element.querySelector(selector) !== null;
    }

    function getElementHeight(element) {
      return Math.max(
          element[0].scrollHeight, element[0].scrollHeight,
          element[0].offsetHeight, element[0].offsetHeight,
          element[0].clientHeight, element[0].clientHeight
      );
    }

    function getElementWidth(element) {
      return Math.max(
          element[0].scrollWidth, element[0].scrollWidth,
          element[0].offsetWidth, element[0].offsetWidth,
          element[0].clientWidth, element[0].clientWidth
      );
    }

    function getBrowserHeight(){

      var h = 0;
      if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        h = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        h = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        h = document.body.clientHeight;
      }
      return h;

    }


    return Elements;
});
