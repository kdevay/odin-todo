(()=>{"use strict";var n={24:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(81),o=t.n(r),i=t(645),a=t.n(i)()(o());a.push([n.id,'/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n\n/* Document========================================================================== */\n\nhtml {\n    line-height: 1.15; /* Correct line height in all browsers.*/\n    -webkit-text-size-adjust: 100%; /* Prevent adjustments of font size after orientation changes in iOS. */\n}\n\n\n\n/* Sections========================================================================== */\n\n/* Remove margin in all browsers. */\nbody {\n    margin: 0;\n}\n\n/* Render `main` element consistently in IE. */\nmain {\n    display: block;\n}\n\n/* Correct font size and margin on `h1` inside `section` & `article` in Chrome, Firefox, and Safari. */\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n\n\n/* Grouping content ========================================================================== */\n\nhr {\n    box-sizing: content-box; /* Add correct box sizing in Firefox. */\n    height: 0; \n    overflow: visible; /*  Show overflow in Edge and IE.*/\n}\n\npre {\n    font-family: monospace, monospace; /* Correct inheritance and scaling of font size in all browsers. */\n    font-size: 1em; /* Correct odd `em` font sizing in all browsers. */\n}\n\n\n\n/* Text-level semantics ========================================================================== */\n\n/* Remove gray background on active links in IE 10.*/\na {\n    background-color: transparent;\n}\n\nabbr[title] {\n    border-bottom: none; /* Remove bottom border in Chrome 57- */\n    text-decoration: underline; /* Add correct text decoration in Chrome, Edge, IE, Opera, and Safari. */\n    text-decoration: underline dotted; \n}\n\n/* Add correct font weight in Chrome, Edge, and Safari. */\nb,\nstrong {\n    font-weight: bolder;\n}\n\ncode,\nkbd,\nsamp {\n    font-family: monospace, monospace; /* Correct font size inheritance and scaling in all browsers. */\n    font-size: 1em; /* Correct odd `em` font sizing in all browsers. */\n}\n\n/* Add correct font size in all browsers. */\nsmall {\n    font-size: 80%;\n}\n\n/* Prevent `sub` and `sup` from affecting line height in all browsers.*/\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\nsub {\n    bottom: -0.25em;\n}\nsup {\n    top: -0.5em;\n}\n\n\n/* Embedded content========================================================================== */\n\n/* Remove image borders inside links in IE 10. */\nimg {\n    border-style: none;\n}\n\n\n\n/* Forms========================================================================== */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n    font-family: inherit; /* Change font styles in all browsers. */\n    font-size: 100%; \n    line-height: 1.15; \n    margin: 0; /* Remove margin in Firefox and Safari. */\n}\n\n/* Show overflow in IE and Edge.*/\nbutton,\ninput { /* 1 */\n    overflow: visible;\n}\n\n/* Remove inheritance of text transform in Edge, Firefox, and IE.*/\nbutton,\nselect { \n    text-transform: none;\n}\n\n/* Correct inability to style clickable types in iOS and Safari.*/\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n    -webkit-appearance: button;\n}\n\n/* Remove inner border and padding in Firefox. */\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n}\n\n/* Restore focus styles unset by the previous rule. */\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n}\n\n/* Correct padding in Firefox.*/\nfieldset {\n    padding: 0.35em 0.75em 0.625em;\n}\n\n/* 1. Correct text wrapping in Edge and IE.\n* 2. Correct `fieldset` color inheritance in IE.\n* 3. Remove the padding for zeroed out `fieldset` elements in all browsers.\n*/\nlegend {\n    box-sizing: border-box; /* 1 */\n    color: inherit; /* 2 */\n    display: table; /* 1 */\n    max-width: 100%; /* 1 */\n    padding: 0; /* 3 */\n    white-space: normal; /* 1 */\n}\n\n/* Add correct vertical alignment in Chrome, Firefox, and Opera. */\nprogress {\n    vertical-align: baseline;\n}\n\n/* Remove default vertical scrollbar in IE 10+. */\ntextarea {\n    overflow: auto;\n}\n\n/* IE 10. */\n[type="checkbox"],\n[type="radio"] {\n    box-sizing: border-box; /* Add correct box sizing */\n    padding: 0; /* Remove padding */\n}\n\n/* Correct cursor style of increment and decrement buttons in Chrome. */\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type="search"] {\n    -webkit-appearance: textfield; /* Correct odd appearance in Chrome and Safari. */\n    outline-offset: -2px; /* Correct outline style in Safari. */\n}\n\n/* Remove inner padding in Chrome and Safari on macOS.*/\n[type="search"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n    -webkit-appearance: button; /* Correct inability to style clickables in iOS and Safari. */\n    font: inherit; /* Change font properties to `inherit` in Safari. */\n}\n\n\n\n/* Interactive ========================================================================== */\n\n/* Add correct display in Edge, IE 10+, and Firefox. */\ndetails {\n    display: block;\n}\n\n/* Add correct display in all browsers. */\nsummary {\n    display: list-item;\n}\n\n\n\n/* Misc ========================================================================== */\n\n/* Add correct display in IE 10+. */\ntemplate {\n    display: none;\n}\n\n/* Add correct display in IE 10. */\n[hidden] {\n    display: none;\n}',""]);const s=a},426:(n,e,t)=>{t.d(e,{Z:()=>s});var r=t(81),o=t.n(r),i=t(645),a=t.n(i)()(o());a.push([n.id,"*{\n    color: white;\n}\n\n#main {\n    width: 100vw;\n    height: 100vh;\n    display: grid;\n    grid-template: 1fr 10fr / 2fr 8fr;\n    background-color: black;\n}\n\n#modal {\n    display: none;\n}\n\n#top {\n    grid-area: 1 / 2 / 2 / 3;\n    display: flex;\n    background-color: rgb(18, 19, 19);\n    justify-content: space-between;\n    align-items: center;\n    padding-right: 1vw;\n}\n.icon-cont {\n    display: grid;\n    grid-template: 1fr / 1fr 1fr;\n    gap: 30px;\n}\n.icon {\n    max-width: 30px;\n    max-height: 30px;\n}\n#bell{\n    display:block;\n}\n#noti {\n    display:none;\n}\n\n#sidebar {\n    grid-area: 1 / 1 / 3 / 2;\n    display: flex;\n    flex-direction: column;\n    background-color: rgb(28, 30, 30);\n    padding-left: 10px;\n    justify-content: flex-start;\n}\n\n#content {\n    grid-area: 2 / 2 / 3 / 3;\n    display: grid;\n    grid-template: repeat(auto-fit, minmax(250px, 400px))/ repeat(auto-fit, minmax(200px, 350px));\n    justify-content: start;\n    align-items: start;\n    padding: 4vh 3vw;\n}\n.tile {\n    background-color: rgb(28, 30, 30);\n    min-width: 200px;\n    min-height: 200px;\n    border-radius: 20px;\n    padding: 20px;\n}\n\n",""]);const s=a},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);r&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var i={},a=[],s=0;s<n.length;s++){var c=n[s],d=r.base?c[0]+r.base:c[0],l=i[d]||0,p="".concat(d," ").concat(l);i[d]=l+1;var u=t(p),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var m=o(f,r);r.byIndex=s,e.splice(s,0,{identifier:p,updater:m,references:1})}a.push(p)}return a}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var i=r(n=n||[],o=o||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var s=t(i[a]);e[s].references--}for(var c=r(n,o),d=0;d<i.length;d++){var l=t(i[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}i=c}}},569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return n[r](i,i.exports,t),i.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0,(()=>{var n=t(379),e=t.n(n),r=t(795),o=t.n(r),i=t(569),a=t.n(i),s=t(565),c=t.n(s),d=t(216),l=t.n(d),p=t(589),u=t.n(p),f=t(426),m={};m.styleTagTransform=u(),m.setAttributes=c(),m.insert=a().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=l(),e()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;var b=t(24),g={};g.styleTagTransform=u(),g.setAttributes=c(),g.insert=a().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=l(),e()(b.Z,g),b.Z&&b.Z.locals&&b.Z.locals})()})();