!function(){function e(e){return e&&e.__esModule?e.default:e}function t(e,t,o,n){Object.defineProperty(e,t,{get:o,set:n,enumerable:!0,configurable:!0})}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=o.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},o.parcelRequired7c6=a),a.register("UL92Z",(function(o,n){t(o.exports,"default",(function(){return i}));var r=a("8MBJY"),s=a("a2hTj"),i=(new(0,a("ko9ms").default),function(){"use strict";function t(){e(r)(this,t),this.keySavedFilters="Filters"}return e(s)(t,[{key:"save",value:function(e,t){try{var o=JSON.stringify(t);localStorage.setItem(e,o)}catch(e){console.error(e)}}},{key:"load",value:function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error(e)}}},{key:"loadFilters",value:function(){return this.load(this.keySavedFilters)?this.load(this.keySavedFilters):void 0}},{key:"saveDataFilters",value:function(e){console.log("saveDataFilters");var t=this.loadFilters()?this.loadFilters():{};t.selectedDate=e,this.save(this.keySavedFilters,t)}},{key:"saveCategoriesFilters",value:function(e){console.log("saveCategoriesFilters");var t=this.loadFilters()?this.loadFilters():{};t.selectedCategories=e,this.save(this.keySavedFilters,t)}},{key:"loadDataFilters",value:function(){console.log("loadDataFilters");var e=this.loadFilters(),t=(null==e?void 0:e.selectedDate)?e.selectedDate:null;return console.log(t),t}},{key:"loadCategoriesFilters",value:function(){console.log("loadCategoriesFilters");var e=this.loadFilters(),t=(null==e?void 0:e.selectedCategories)?e.selectedCategories.join('", "'):'""';return console.log(t),t}}]),t}())})),a.register("8MBJY",(function(e,t){"use strict";Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}})),a.register("a2hTj",(function(e,t){"use strict";function o(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t,n){t&&o(e.prototype,t);n&&o(e,n);return e}})),a.register("ko9ms",(function(o,n){t(o.exports,"default",(function(){return c}));var r=a("8MBJY"),s=a("a2hTj"),i="https://api.nytimes.com/svc/search/v2/articlesearch.json",l="H4EzmbJjzcMKAQjlOxUvVd6TipG3GhzM",c=function(){"use strict";function t(){e(r)(this,t),this.searchQuery="",this.SEARCH_BY_DATE_URL=this.page=0,this.loadCards=0}return e(s)(t,[{key:"getsearchNews",value:function(){var e=this;return fetch("".concat(i,"?q=").concat(this.searchQuery,"&page=").concat(this.page,"&api-key=").concat(l)).then((function(t){if(!t.ok)throw new Error(t.statusText);return e.nextPage(),t.json()}))}},{key:"nextPage",value:function(){this.page+=1}},{key:"resetData",value:function(){this.page=0,this.loadCards=0}},{key:"addLoadCards",value:function(e){this.loadCards=this.loadCards+e}},{key:"getpopularNews",value:function(){return fetch("".concat("https://api.nytimes.com/svc/mostpopular/v2/viewed","/").concat(7,".json?api-key=").concat(l)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}},{key:"getlistCategories",value:function(){return fetch("".concat("https://api.nytimes.com/svc/news/v3/content/section-list.json","?api-key=").concat(l)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}},{key:"getDateAndCategoryNews",value:function(e,t){var o,n="";return t&&(n="&fq=news_desk:(".concat(t,")")),console.log(e),o=e&&null!==e?"?facet_field=day_of_week&facet=true&begin_date=".concat(e,"&end_date=").concat(e,"&api-key=").concat(l):"?api-key=".concat(l),fetch("".concat(i).concat(o).concat(n)).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))}}]),t}()}))}();
//# sourceMappingURL=read.3c3c0052.js.map
