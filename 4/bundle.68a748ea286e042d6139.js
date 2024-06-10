(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",n="second",a="minute",s="hour",r="day",d="week",o="month",c="quarter",l="year",f="date",p="Invalid Date",b=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,u=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},h=function(e,t,i){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(i)+e},m={s:h,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),n=Math.floor(i/60),a=i%60;return(t<=0?"+":"-")+h(n,2,"0")+":"+h(a,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var n=12*(i.year()-t.year())+(i.month()-t.month()),a=t.clone().add(n,o),s=i-a<0,r=t.clone().add(n+(s?-1:1),o);return+(-(n+(i-a)/(s?a-r:r-a))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:l,w:d,d:r,D:f,h:s,m:a,s:n,ms:i,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",y={};y[_]=v;var g=function(e){return e instanceof F},$=function e(t,i,n){var a;if(!t)return _;if("string"==typeof t){var s=t.toLowerCase();y[s]&&(a=s),i&&(y[s]=i,a=s);var r=t.split("-");if(!a&&r.length>1)return e(r[0])}else{var d=t.name;y[d]=t,a=d}return!n&&a&&(_=a),a||!n&&_},T=function(e,t){if(g(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new F(i)},M=m;M.l=$,M.i=g,M.w=function(e,t){return T(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var F=function(){function v(e){this.$L=$(e.locale,null,!0),this.parse(e)}var h=v.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(b);if(n){var a=n[2]-1||0,s=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],a,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],a,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return M},h.isValid=function(){return!(this.$d.toString()===p)},h.isSame=function(e,t){var i=T(e);return this.startOf(t)<=i&&i<=this.endOf(t)},h.isAfter=function(e,t){return T(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<T(e)},h.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,t){var i=this,c=!!M.u(t)||t,p=M.p(e),b=function(e,t){var n=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return c?n:n.endOf(r)},u=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},v=this.$W,h=this.$M,m=this.$D,_="set"+(this.$u?"UTC":"");switch(p){case l:return c?b(1,0):b(31,11);case o:return c?b(1,h):b(0,h+1);case d:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return b(c?m-g:m+(6-g),h);case r:case f:return u(_+"Hours",0);case s:return u(_+"Minutes",1);case a:return u(_+"Seconds",2);case n:return u(_+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(e,t){var d,c=M.p(e),p="set"+(this.$u?"UTC":""),b=(d={},d[r]=p+"Date",d[f]=p+"Date",d[o]=p+"Month",d[l]=p+"FullYear",d[s]=p+"Hours",d[a]=p+"Minutes",d[n]=p+"Seconds",d[i]=p+"Milliseconds",d)[c],u=c===r?this.$D+(t-this.$W):t;if(c===o||c===l){var v=this.clone().set(f,1);v.$d[b](u),v.init(),this.$d=v.set(f,Math.min(this.$D,v.daysInMonth())).$d}else b&&this.$d[b](u);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[M.p(e)]()},h.add=function(i,c){var f,p=this;i=Number(i);var b=M.p(c),u=function(e){var t=T(p);return M.w(t.date(t.date()+Math.round(e*i)),p)};if(b===o)return this.set(o,this.$M+i);if(b===l)return this.set(l,this.$y+i);if(b===r)return u(1);if(b===d)return u(7);var v=(f={},f[a]=e,f[s]=t,f[n]=1e3,f)[b]||1,h=this.$d.getTime()+i*v;return M.w(h,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||p;var n=e||"YYYY-MM-DDTHH:mm:ssZ",a=M.z(this),s=this.$H,r=this.$m,d=this.$M,o=i.weekdays,c=i.months,l=function(e,i,a,s){return e&&(e[i]||e(t,n))||a[i].slice(0,s)},f=function(e){return M.s(s%12||12,e,"0")},b=i.meridiem||function(e,t,i){var n=e<12?"AM":"PM";return i?n.toLowerCase():n},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:d+1,MM:M.s(d+1,2,"0"),MMM:l(i.monthsShort,d,c,3),MMMM:l(c,d),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:l(i.weekdaysMin,this.$W,o,2),ddd:l(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:M.s(s,2,"0"),h:f(1),hh:f(2),a:b(s,r,!0),A:b(s,r,!1),m:String(r),mm:M.s(r,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:a};return n.replace(u,(function(e,t){return t||v[e]||a.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(i,f,p){var b,u=M.p(f),v=T(i),h=(v.utcOffset()-this.utcOffset())*e,m=this-v,_=M.m(this,v);return _=(b={},b[l]=_/12,b[o]=_,b[c]=_/3,b[d]=(m-h)/6048e5,b[r]=(m-h)/864e5,b[s]=m/t,b[a]=m/e,b[n]=m/1e3,b)[u]||m,p?_:M.a(_)},h.daysInMonth=function(){return this.endOf(o).$D},h.$locale=function(){return y[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),n=$(e,t,!0);return n&&(i.$L=n),i},h.clone=function(){return M.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},v}(),w=F.prototype;return T.prototype=w,[["$ms",i],["$s",n],["$m",a],["$H",s],["$W",r],["$M",o],["$y",l],["$D",f]].forEach((function(e){w[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),T.extend=function(e,t){return e.$i||(e(t,F,T),e.$i=!0),T},T.locale=$,T.isDayjs=g,T.unix=function(e){return T(1e3*e)},T.en=y[_],T.Ls=y,T.p={},T}()}},t={};function i(n){var a=t[n];if(void 0!==a)return a.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,i),s.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}class n{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class a{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var s=i(484),r=i.n(s);const d="hh:mm";function o(e){return e?r()(e).format(d):""}const c=[{type:"taxi",offers:[{id:"3c51776b-6f91-4524-9f95-e4f7cc2a2d5d",title:"Upgrade to a business class",price:117},{id:"f0eb9d59-bb7c-4c8c-8f24-9fe0843e016a",title:"Choose the radio station",price:110},{id:"395df74c-af61-4a5e-88c6-07cf2faea36e",title:"Choose temperature",price:136},{id:"c0ca1e8a-d83e-429b-b119-3d269b959d75",title:"Drive quickly, I'm in a hurry",price:158},{id:"59619934-b3b6-41e4-a7cd-476976dbb252",title:"Drive slowly",price:46}]},{type:"bus",offers:[{id:"70f411f3-3097-4ecb-97d5-9a0e0c2e7a35",title:"Infotainment system",price:91},{id:"ed2fbc91-3dcd-405b-99b3-885819c7da42",title:"Order meal",price:151},{id:"c7a8e303-b967-4283-b769-2236a18123cb",title:"Choose seats",price:39}]},{type:"train",offers:[{id:"e47bed9f-87a5-4726-b63c-810a5bef9a5c",title:"Book a taxi at the arrival point",price:194},{id:"c15394fd-2ed2-4555-b8b9-996ef986b60b",title:"Order a breakfast",price:165},{id:"a19c013d-c4ff-46e7-a4d9-e44ad3607760",title:"Wake up at a certain time",price:127}]},{type:"flight",offers:[{id:"405b3f59-ad64-4db9-b5c3-83f4ef041917",title:"Choose meal",price:173},{id:"a6b4c777-df63-41c0-a2ba-04b11fc30c72",title:"Choose seats",price:133},{id:"3324d1f9-2395-49aa-ba86-e644e9cc4efe",title:"Upgrade to comfort class",price:48},{id:"fe667e84-c5b4-4f6f-8e11-90e1260af303",title:"Upgrade to business class",price:166},{id:"49d81986-d8f4-4bde-8bbf-3d193f0db2aa",title:"Add luggage",price:138},{id:"04e42937-c64d-4fae-93ce-f5ca690b5b78",title:"Business lounge",price:194}]},{type:"check-in",offers:[{id:"91a46f1e-794f-4d47-b5c6-8e6a44df8de1",title:"Choose the time of check-in",price:49},{id:"064a8338-92f3-4b83-8528-70464d7955d7",title:"Choose the time of check-out",price:106},{id:"4d7a41f2-99e3-41e4-94ef-1a05ef0f1ed8",title:"Add breakfast",price:167},{id:"cda9b12e-6d29-49cc-a784-ec3f897c75fc",title:"Laundry",price:97},{id:"c5240e15-264a-4027-9a6d-8942afbbd6bf",title:"Order a meal from the restaurant",price:123}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"9e99dce5-5091-499c-8c17-15d8fe9fd50a",title:"Choose meal",price:109},{id:"859d60b9-a8f3-4cb3-b782-8f3140007f0c",title:"Choose seats",price:55},{id:"caaba4d8-1422-405b-98d7-439cd87f9631",title:"Upgrade to comfort class",price:38},{id:"7bbeb839-ee37-4bcd-98ce-712e2cb1cd72",title:"Upgrade to business class",price:191},{id:"07bf5c98-8e58-4618-bd42-9c1a11c3ad08",title:"Add luggage",price:146},{id:"97da3e86-4741-44cb-8d5b-71d9e7246b8b",title:"Business lounge",price:124}]},{type:"drive",offers:[{id:"67c699a5-ab21-4066-be89-dec16e5018c8",title:"With automatic transmission",price:80},{id:"17cadf51-69ee-4efc-a4bf-961d19f54a74",title:"With air conditioning",price:114}]},{type:"restaurant",offers:[{id:"fd388899-2247-4eb5-9c72-84891acf7b87",title:"Choose live music",price:85},{id:"c6c07454-ad18-4553-bc05-0d35d76687e2",title:"Choose VIP area",price:61}]}];function l(e){const t=c.find((t=>t.type===e));return t?t.offers:[]}const f=[{id:"40790a4f-e69a-425d-b9d7-bf3e31993508",description:"Monaco - famous for its crowded street markets with the best street food in Asia",name:"Monaco",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Monaco in a middle of Europe"},{src:"https://22.objects.htmlacademy.pro/static/destinations/18.jpg",description:"Monaco in a middle of Europe"},{src:"https://22.objects.htmlacademy.pro/static/destinations/5.jpg",description:"Monaco middle-eastern paradise"},{src:"https://22.objects.htmlacademy.pro/static/destinations/5.jpg",description:"Monaco a perfect place to stay with a family"},{src:"https://22.objects.htmlacademy.pro/static/destinations/12.jpg",description:"Monaco with crowded streets"}]},{id:"e53dec72-b18b-4b04-a6a0-f05f02ddca48",description:"Rome - a perfect place to stay with a family",name:"Rome",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Rome a perfect place to stay with a family"}]},{id:"4c255f64-23df-4cdc-8153-6c7f95bb7bf6",description:"Rotterdam - is a beautiful city",name:"Rotterdam",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/18.jpg",description:"Rotterdam with a beautiful old town"},{src:"https://22.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Rotterdam famous for its crowded street markets with the best street food in Asia"}]},{id:"2b54ea67-6f96-418e-8e87-778211afbe3f",description:"Madrid - a perfect place to stay with a family",name:"Madrid",pictures:[]},{id:"20d7f3ec-f6de-4f2f-bbe1-31f8a017bab1",description:"",name:"Sochi",pictures:[]},{id:"220da512-955d-4c34-8753-6e267d6773c4",description:"Oslo - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Oslo",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/19.jpg",description:"Oslo with a beautiful old town"},{src:"https://22.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Oslo for those who value comfort and coziness"},{src:"https://22.objects.htmlacademy.pro/static/destinations/14.jpg",description:"Oslo is a beautiful city"},{src:"https://22.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Oslo is a beautiful city"}]},{id:"e0e1e01e-a2da-417e-bf4f-b6505a93694e",description:"Barcelona - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Barcelona",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Barcelona a true asian pearl"}]},{id:"d2e0c184-c9c0-4891-96e5-cc9ca8ab17b5",description:"",name:"Munich",pictures:[]},{id:"3b0e2445-d1d9-40b3-88a9-0a586be6866a",description:"Den Haag - is a beautiful city",name:"Den Haag",pictures:[]},{id:"1213bb06-f35e-4e9c-bfad-8c8d552d4b27",description:"Naples - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Naples",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Naples a true asian pearl"}]}];function p(e){return f.find((t=>t.id===e))}class b{constructor({point:e}){this.point=e}getTemplate(){return function(e){const t=l(e.type).filter((t=>e.offers.includes(t.id)));return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">${i=e.dateFrom,i?r()(i).format("MMM D"):""}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${e.type}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${e.type} ${p(e.destination).name}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="2019-03-18T10:30">${o(e.dateFrom)}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="2019-03-18T11:00">${o(e.dateTo)}</time>\n                  </p>\n                  <p class="event__duration">${function(e){let t=e%60,i="00",n="00";return e>=60&&(i=Math.floor(e/60)%24),e>=1440&&(n=Math.floor(e/1440)),n=n>0?`${`00${n}`.slice(-2)}D `:"",i=i>0?`${`00${i}`.slice(-2)}H `:"",t=t?`${`00${t}`.slice(-2)}M `:"",`${n}${i}${t}`}(r()(e.dateTo).diff(r()(e.dateFrom),"minutes"))}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${e.basePrice}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                ${t.map((e=>`\n                  <li class="event__offer">\n                    <span class="event__offer-title">${e.title}</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${e.price}</span>\n                  </li>\n                `)).join("")}\n                </ul>\n                <button class="${e.isFavorite?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn"}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`;var i}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const u=[{name:"taxi",title:"Taxi"},{name:"bus",title:"Bus"},{name:"train",title:"Train"},{name:"ship",title:"Ship"},{name:"drive",title:"Drive"},{name:"flight",title:"Flight"},{name:"check-in",title:"Check-in"},{name:"sightseeing",title:"Sightseeing"},{name:"restaurant",title:"Restaurant"}],v={id:"27f76798-a449-473a-91a9-23cb4211a177",basePrice:0,dateFrom:"2024-05-17T16:33:06.165Z",dateTo:"2024-05-18T15:44:06.165Z",destination:"40790a4f-e69a-425d-b9d7-bf3e31993508",isFavorite:!0,offers:["17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},h=p(v.destination),m=u.find((e=>e.name===v.type));class _{constructor({destination:e}){this.destination=e}getTemplate(){return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${m.name}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${u.map((e=>`\n                          <div class="event__type-item"> <input id="event-type-${e.name}-1" class="event__type-input  visually-hidden"\n                          type="radio" name="event-type" value="${e.name}" ${e.name===m.name?"checked":""}>\n                            <label class="event__type-label  event__type-label--${e.name}" for="event-type-${e.name}-1"> ${e.title}</label>\n                          </div>\n                        `)).join("")}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${m.name}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${h.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                    ${f.map((e=>`\n                      <option value="${e.name}"></option>\n                    `)).join("")}\n                    </datalist>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n                  </div>\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n                  </div>\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Cancel</button>\n                </header>\n\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n                    <div class="event__available-offers">\n                    ${l(v.type).map((e=>`\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="${e.id}"\n                        ${v.offers.includes(e.id)?"checked":""}>\n                        <label class="event__offer-label" for="${e.id}">\n                          <span class="event__offer-title">${e.title}</span>&plus;&euro;&nbsp;\n                          <span class="event__offer-price">${e.price}</span>\n                        </label>\n                      </div>\n                    `)).join("")}\n                    </div>\n                  </section>\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${h.description}</p>\n                    <div class="event__photos-container">\n                      <div class="event__photos-tape">\n                      ${h.pictures.map((e=>`\n                        <img class="event__photo" src="${e.src}" alt="Event photo">\n                      `)).join("")}\n                      </div>\n                    </div>\n                  </section>\n                </section>\n              </form>\n            </li>`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{constructor({point:e}){this.point=e}getTemplate(){return function(e){const t=l(e.type);return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${e.type}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${u.map((t=>`\n                          <div class="event__type-item">\n                            <input id="event-type-${t.name}-1" class="event__type-input  visually-hidden" type="radio"\n                            name="event-type" value="${t.name}" ${t.name===e.type?"checked":""}>\n                            <label class="event__type-label  event__type-label--${t.name}" for="event-type-${t.name}-1">${t.title}</label>\n                            </div>\n                        `)).join("")}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                  ${u.map((t=>`\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${t.name===e.type?t.name:""}\n                    </label>\n                  `)).join("")}\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${p(e.destination).name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                    ${f.map((e=>`\n                      <option value="${e.name}"></option>\n                    `)).join("")}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n                  <div class="event__available-offers">\n                    ${t.map((t=>`\n                      <div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="${t.id}"\n                        ${e.offers.includes(t.id)?"checked":""}>\n                        <label class="event__offer-label" for="${t.id}">\n                          <span class="event__offer-title">${t.title}</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">${t.price}</span>\n                        </label>\n                      </div>\n                    `)).join("")}\n                  </div>\n                </section>\n                <section class="event__section  event__section--destination">\n                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                  <p class="event__destination-description">${p(e.destination).description}</p>\n                </section>\n              </section>\n              </form>\n            </li>`}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const g=[{id:"c1333735-b4af-48b8-9252-7c5126d077cf",basePrice:1451,dateFrom:"2024-05-08T17:57:06.165Z",dateTo:"2024-05-09T03:03:06.165Z",destination:"220da512-955d-4c34-8753-6e267d6773c4",isFavorite:!0,offers:[],type:"ship"},{id:"203106c7-9956-427e-b20d-efae95dc2d4c",basePrice:277,dateFrom:"2024-05-10T02:12:06.165Z",dateTo:"2024-05-11T11:19:06.165Z",destination:"4c255f64-23df-4cdc-8153-6c7f95bb7bf6",isFavorite:!1,offers:["e47bed9f-87a5-4726-b63c-810a5bef9a5c","c15394fd-2ed2-4555-b8b9-996ef986b60b","a19c013d-c4ff-46e7-a4d9-e44ad3607760"],type:"train"},{id:"6a4e092f-b8e5-4393-8570-916d012247a5",basePrice:5053,dateFrom:"2024-05-13T03:43:06.165Z",dateTo:"2024-05-13T20:53:06.165Z",destination:"3b0e2445-d1d9-40b3-88a9-0a586be6866a",isFavorite:!0,offers:["67c699a5-ab21-4066-be89-dec16e5018c8","17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},{id:"05a441ee-2d55-4ff6-be7d-4a506dfb6e04",basePrice:7098,dateFrom:"2024-05-15T09:50:06.165Z",dateTo:"2024-05-16T18:17:06.165Z",destination:"3b0e2445-d1d9-40b3-88a9-0a586be6866a",isFavorite:!1,offers:[],type:"drive"},{id:"27f76798-a449-473a-91a9-23cb4211a177",basePrice:5254,dateFrom:"2024-05-17T16:33:06.165Z",dateTo:"2024-05-18T15:44:06.165Z",destination:"40790a4f-e69a-425d-b9d7-bf3e31993508",isFavorite:!0,offers:[],type:"drive"},{id:"e273df29-2f4c-43bc-90fd-78e27dff0c7a",basePrice:206,dateFrom:"2024-05-20T02:22:06.165Z",dateTo:"2024-05-21T00:38:06.165Z",destination:"3b0e2445-d1d9-40b3-88a9-0a586be6866a",isFavorite:!0,offers:["17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},{id:"e9896f9e-c049-47bf-bb50-b7b728d78e4b",basePrice:685,dateFrom:"2024-05-21T19:45:06.165Z",dateTo:"2024-05-22T23:13:06.165Z",destination:"40790a4f-e69a-425d-b9d7-bf3e31993508",isFavorite:!1,offers:["07bf5c98-8e58-4618-bd42-9c1a11c3ad08","97da3e86-4741-44cb-8d5b-71d9e7246b8b"],type:"ship"},{id:"07e69e63-9d0c-4f35-b3a0-6f42f7fbc87f",basePrice:5648,dateFrom:"2024-05-24T00:12:06.165Z",dateTo:"2024-05-24T06:23:06.165Z",destination:"1213bb06-f35e-4e9c-bfad-8c8d552d4b27",isFavorite:!0,offers:["c15394fd-2ed2-4555-b8b9-996ef986b60b","a19c013d-c4ff-46e7-a4d9-e44ad3607760"],type:"train"},{id:"c05f4297-e634-42ee-91ab-7a1a51fadeb0",basePrice:5903,dateFrom:"2024-05-25T02:50:06.165Z",dateTo:"2024-05-26T09:30:06.165Z",destination:"d2e0c184-c9c0-4891-96e5-cc9ca8ab17b5",isFavorite:!0,offers:["59619934-b3b6-41e4-a7cd-476976dbb252"],type:"taxi"},{id:"626236e5-4fa9-4384-ba3d-69ceae203027",basePrice:2592,dateFrom:"2024-05-27T03:43:06.165Z",dateTo:"2024-05-27T18:33:06.165Z",destination:"20d7f3ec-f6de-4f2f-bbe1-31f8a017bab1",isFavorite:!1,offers:[],type:"flight"},{id:"8da44258-4c38-4867-a9bd-2448d610caab",basePrice:5591,dateFrom:"2024-05-28T05:19:06.165Z",dateTo:"2024-05-29T01:40:06.165Z",destination:"40790a4f-e69a-425d-b9d7-bf3e31993508",isFavorite:!1,offers:["fe667e84-c5b4-4f6f-8e11-90e1260af303","49d81986-d8f4-4bde-8bbf-3d193f0db2aa","04e42937-c64d-4fae-93ce-f5ca690b5b78"],type:"flight"},{id:"7f1bbb33-687e-4b5f-8042-89d69b305268",basePrice:730,dateFrom:"2024-05-30T01:23:06.165Z",dateTo:"2024-05-30T08:57:06.165Z",destination:"1213bb06-f35e-4e9c-bfad-8c8d552d4b27",isFavorite:!1,offers:["3c51776b-6f91-4524-9f95-e4f7cc2a2d5d","f0eb9d59-bb7c-4c8c-8f24-9fe0843e016a","395df74c-af61-4a5e-88c6-07cf2faea36e","c0ca1e8a-d83e-429b-b119-3d269b959d75","59619934-b3b6-41e4-a7cd-476976dbb252"],type:"taxi"},{id:"b800f376-fb61-4af5-8461-171eb7807448",basePrice:4596,dateFrom:"2024-05-31T12:53:06.165Z",dateTo:"2024-06-01T05:09:06.165Z",destination:"4c255f64-23df-4cdc-8153-6c7f95bb7bf6",isFavorite:!1,offers:[],type:"restaurant"},{id:"d29e1400-dfb7-4005-aa1a-caa1b022cb4b",basePrice:9050,dateFrom:"2024-06-01T21:10:06.165Z",dateTo:"2024-06-03T18:45:06.165Z",destination:"40790a4f-e69a-425d-b9d7-bf3e31993508",isFavorite:!1,offers:[],type:"sightseeing"},{id:"ba1aaab5-f306-4d3f-b9b1-d01702f97ef9",basePrice:5684,dateFrom:"2024-06-04T08:36:06.165Z",dateTo:"2024-06-05T09:09:06.165Z",destination:"e0e1e01e-a2da-417e-bf4f-b6505a93694e",isFavorite:!0,offers:["c7a8e303-b967-4283-b769-2236a18123cb"],type:"bus"},{id:"2592dbcb-36e8-4271-b76a-76fda8132269",basePrice:4195,dateFrom:"2024-06-07T07:30:06.165Z",dateTo:"2024-06-08T21:58:06.165Z",destination:"e0e1e01e-a2da-417e-bf4f-b6505a93694e",isFavorite:!1,offers:["67c699a5-ab21-4066-be89-dec16e5018c8","17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},{id:"4f2cd93e-542b-4bc2-b69b-110c6410baeb",basePrice:224,dateFrom:"2024-06-10T02:45:06.165Z",dateTo:"2024-06-10T10:29:06.165Z",destination:"1213bb06-f35e-4e9c-bfad-8c8d552d4b27",isFavorite:!0,offers:["395df74c-af61-4a5e-88c6-07cf2faea36e","c0ca1e8a-d83e-429b-b119-3d269b959d75","59619934-b3b6-41e4-a7cd-476976dbb252"],type:"taxi"},{id:"5d83ef94-db23-43e5-acca-8d6ebdaa18c6",basePrice:7439,dateFrom:"2024-06-10T17:42:06.165Z",dateTo:"2024-06-12T05:59:06.165Z",destination:"e0e1e01e-a2da-417e-bf4f-b6505a93694e",isFavorite:!0,offers:["17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},{id:"85476b2c-a6f5-4244-9064-c6993529ff8c",basePrice:8308,dateFrom:"2024-06-12T12:15:06.165Z",dateTo:"2024-06-13T12:56:06.165Z",destination:"1213bb06-f35e-4e9c-bfad-8c8d552d4b27",isFavorite:!0,offers:["17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},{id:"5cc65537-a7cb-423a-ab92-07d791e16c04",basePrice:352,dateFrom:"2024-06-15T03:16:06.165Z",dateTo:"2024-06-16T12:34:06.165Z",destination:"d2e0c184-c9c0-4891-96e5-cc9ca8ab17b5",isFavorite:!0,offers:["9e99dce5-5091-499c-8c17-15d8fe9fd50a","859d60b9-a8f3-4cb3-b782-8f3140007f0c","caaba4d8-1422-405b-98d7-439cd87f9631","7bbeb839-ee37-4bcd-98ce-712e2cb1cd72","07bf5c98-8e58-4618-bd42-9c1a11c3ad08","97da3e86-4741-44cb-8d5b-71d9e7246b8b"],type:"ship"},{id:"fd43978d-be8c-4a66-bdec-a06f55f2f777",basePrice:5746,dateFrom:"2024-06-17T15:51:06.165Z",dateTo:"2024-06-18T16:41:06.165Z",destination:"3b0e2445-d1d9-40b3-88a9-0a586be6866a",isFavorite:!1,offers:[],type:"taxi"},{id:"d9a7a685-3912-4445-9ea3-89c50d260ddb",basePrice:7030,dateFrom:"2024-06-19T15:21:06.165Z",dateTo:"2024-06-19T22:20:06.165Z",destination:"2b54ea67-6f96-418e-8e87-778211afbe3f",isFavorite:!1,offers:["c6c07454-ad18-4553-bc05-0d35d76687e2"],type:"restaurant"},{id:"d46677a1-0fbb-4494-8aa8-5e88396aa94d",basePrice:7980,dateFrom:"2024-06-21T12:30:06.165Z",dateTo:"2024-06-22T03:51:06.165Z",destination:"e53dec72-b18b-4b04-a6a0-f05f02ddca48",isFavorite:!0,offers:["17cadf51-69ee-4efc-a4bf-961d19f54a74"],type:"drive"},{id:"846ec879-cee9-4d99-b1fb-6035ac670da3",basePrice:5761,dateFrom:"2024-06-23T17:26:06.165Z",dateTo:"2024-06-24T15:29:06.165Z",destination:"e53dec72-b18b-4b04-a6a0-f05f02ddca48",isFavorite:!1,offers:["405b3f59-ad64-4db9-b5c3-83f4ef041917","a6b4c777-df63-41c0-a2ba-04b11fc30c72","3324d1f9-2395-49aa-ba86-e644e9cc4efe","fe667e84-c5b4-4f6f-8e11-90e1260af303","49d81986-d8f4-4bde-8bbf-3d193f0db2aa","04e42937-c64d-4fae-93ce-f5ca690b5b78"],type:"flight"},{id:"4ff4a741-353b-4fa4-82e7-1acd514a86be",basePrice:9016,dateFrom:"2024-06-25T01:56:06.165Z",dateTo:"2024-06-26T16:30:06.165Z",destination:"e53dec72-b18b-4b04-a6a0-f05f02ddca48",isFavorite:!0,offers:[],type:"sightseeing"}],$=document.querySelector(".page-body"),T=new class{points=g;getPoints(){return this.points}},M=new class{destination=f;getDestination(){return this.destination}},F=new class{offers=c;getOffers(){return this.offers}},w=new class{constructor({siteMainElement:e,pointsModel:t,destinationModel:i,offersModel:n}){this.siteMainElement=e,this.pointsModel=t,this.destinationModel=i,this.offersModel=n}init(){this.points=[...this.pointsModel.getPoints()],this.destination=[...this.destinationModel.getDestination()],this.offers=[...this.offersModel.getOffers()],t(new n,this.siteMainElement.querySelector(".trip-controls__filters")),t(new a,this.siteMainElement.querySelector(".trip-events__trip-sort-container"));const e=this.siteMainElement.querySelector(".trip-events__list");t(new _({destination:this.destination}),e),t(new y({point:this.points[0]}),e);for(let i=0;i<this.points.length;i++)t(new b({point:this.points[i]}),e)}}({siteMainElement:$,pointsModel:T,destinationModel:M,offersModel:F});w.init()})()})();
//# sourceMappingURL=bundle.68a748ea286e042d6139.js.map