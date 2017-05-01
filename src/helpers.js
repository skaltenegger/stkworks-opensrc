export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function getFunName() {
  const adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 'worried'];

  const nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}


export function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
 
export function addClass(ele,cls) {  
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}
 
export function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {      
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
    ele.className=ele.className.replace(reg,'');  
  }
}

export function isHidden(el) {
    return (el.offsetParent === null)
}

var scrollTop = 0;

export function disableScroll(isSafari) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    if (isSafari) {
        scrollTop = document.body.scrollTop;
        document.body.style.height = '100vh';
        document.body.scrollTop = scrollTop;
    }
}

export function enableScroll(isSafari) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'scroll';
  
    if (isSafari) {
        document.body.style.height = 'auto';
        document.body.scrollTop = scrollTop;
    }
}

export function isSafari() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            return false;
        } else {
            return true
        }
    }
    return false;
}