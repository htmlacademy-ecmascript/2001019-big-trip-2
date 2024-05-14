(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",a="hour",r="day",l="week",o="month",c="quarter",d="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},h=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:h,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+h(i,2,"0")+":"+h(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,o),a=n-s<0,r=t.clone().add(i+(a?-1:1),o);return+(-(i+(n-s)/(a?s-r:r-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:d,w:l,d:r,D:u,h:a,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=_;var $=function(e){return e instanceof w},g=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var a=t.toLowerCase();b[a]&&(s=a),n&&(b[a]=n,s=a);var r=t.split("-");if(!s&&r.length>1)return e(r[0])}else{var l=t.name;b[l]=t,s=l}return!i&&s&&(y=s),s||!i&&y},M=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},D=m;D.l=g,D.i=$,D.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function _(e){this.$L=g(e.locale,null,!0),this.parse(e)}var h=_.prototype;return h.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(f);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},h.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},h.$utils=function(){return D},h.isValid=function(){return!(this.$d.toString()===p)},h.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},h.isAfter=function(e,t){return M(e)<this.startOf(t)},h.isBefore=function(e,t){return this.endOf(t)<M(e)},h.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(e,t){var n=this,c=!!D.u(t)||t,p=D.p(e),f=function(e,t){var i=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(r)},v=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},_=this.$W,h=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case d:return c?f(1,0):f(31,11);case o:return c?f(1,h):f(0,h+1);case l:var b=this.$locale().weekStart||0,$=(_<b?_+7:_)-b;return f(c?m-$:m+(6-$),h);case r:case u:return v(y+"Hours",0);case a:return v(y+"Minutes",1);case s:return v(y+"Seconds",2);case i:return v(y+"Milliseconds",3);default:return this.clone()}},h.endOf=function(e){return this.startOf(e,!1)},h.$set=function(e,t){var l,c=D.p(e),p="set"+(this.$u?"UTC":""),f=(l={},l[r]=p+"Date",l[u]=p+"Date",l[o]=p+"Month",l[d]=p+"FullYear",l[a]=p+"Hours",l[s]=p+"Minutes",l[i]=p+"Seconds",l[n]=p+"Milliseconds",l)[c],v=c===r?this.$D+(t-this.$W):t;if(c===o||c===d){var _=this.clone().set(u,1);_.$d[f](v),_.init(),this.$d=_.set(u,Math.min(this.$D,_.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},h.set=function(e,t){return this.clone().$set(e,t)},h.get=function(e){return this[D.p(e)]()},h.add=function(n,c){var u,p=this;n=Number(n);var f=D.p(c),v=function(e){var t=M(p);return D.w(t.date(t.date()+Math.round(e*n)),p)};if(f===o)return this.set(o,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===r)return v(1);if(f===l)return v(7);var _=(u={},u[s]=e,u[a]=t,u[i]=1e3,u)[f]||1,h=this.$d.getTime()+n*_;return D.w(h,this)},h.subtract=function(e,t){return this.add(-1*e,t)},h.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),a=this.$H,r=this.$m,l=this.$M,o=n.weekdays,c=n.months,d=function(e,n,s,a){return e&&(e[n]||e(t,i))||s[n].slice(0,a)},u=function(e){return D.s(a%12||12,e,"0")},f=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},_={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:D.s(l+1,2,"0"),MMM:d(n.monthsShort,l,c,3),MMMM:d(c,l),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,o,2),ddd:d(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(a),HH:D.s(a,2,"0"),h:u(1),hh:u(2),a:f(a,r,!0),A:f(a,r,!1),m:String(r),mm:D.s(r,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(v,(function(e,t){return t||_[e]||s.replace(":","")}))},h.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},h.diff=function(n,u,p){var f,v=D.p(u),_=M(n),h=(_.utcOffset()-this.utcOffset())*e,m=this-_,y=D.m(this,_);return y=(f={},f[d]=y/12,f[o]=y,f[c]=y/3,f[l]=(m-h)/6048e5,f[r]=(m-h)/864e5,f[a]=m/t,f[s]=m/e,f[i]=m/1e3,f)[v]||m,p?y:D.a(y)},h.daysInMonth=function(){return this.endOf(o).$D},h.$locale=function(){return b[this.$L]},h.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=g(e,t,!0);return i&&(n.$L=i),n},h.clone=function(){return D.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},_}(),x=w.prototype;return M.prototype=x,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",r],["$M",o],["$y",d],["$D",u]].forEach((function(e){x[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,w,M),e.$i=!0),M},M.locale=g,M.isDayjs=$,M.unix=function(e){return M(1e3*e)},M.en=b[y],M.Ls=b,M.p={},M}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=n(484),r=n.n(a);const l="hh:mm";function o(e){return e[Math.floor(Math.random()*e.length)]}function c(e){return e?r()(e).format(l):""}const d=[{type:"taxi",offers:[{id:"fde78ca7-d63b-4ce5-9f16-a71cbf813e4d",title:"Upgrade to a business class",price:120},{id:"35a18a18-3b7d-493e-aaa8-d0959a71a9cb",title:"Choose the radio station",price:25},{id:"326fd06d-88b6-4c4e-9a31-c97359e44cf4",title:"Choose temperature",price:10},{id:"f747551d-a797-4340-93f5-c3d1a27fe5ca",title:"Drive quickly",price:150},{id:"22bb3eb9-899c-4a77-a4e5-e97fd448327a",title:"Drive slowly",price:150}]},{type:"flight",offers:[{id:"0195da48-b7ce-44c6-9611-5ba981dd3044",title:"Nunc fermentum tortor ac porta",price:500}]},{type:"check-in",offers:[{id:"20dce4cd-0640-4c39-bb87-44f8eb3251d3",title:"Aliquam erat volutpat",price:250}]},{type:"ship",offers:[{id:"755d026a-8974-4077-a873-9ab5af76e049",title:"Test offer",price:130}]}];function u(e){const t=d.find((t=>t.type===e));return t?t.offers:[]}const p=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01abcde",description:"Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.",name:"Athens",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Athens parliament building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcba",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.",name:"Delhi",pictures:[{src:"https://loremflickr.com/248/152?random=2",description:"Delhi parliament building"},{src:"https://loremflickr.com/248/152?random=3",description:"Delhi parliament building"},{src:"https://loremflickr.com/248/152?random=4",description:"Delhi parliament building"}]}];function f(){return o(p)}function v(e){return p.find((t=>t.id===e))}class _{constructor({point:e}){this.point=e}getTemplate(){return function(e){const{basePrice:t,dateFrom:n,dateTo:i,destination:s,isFavorite:a,offers:l,type:o}=e,d=(p=n)?r()(p).format("MMM D"):"";var p;const f=c(n),_=c(i),h=function(e){let t=e%60,n="00",i="00";return e>=60&&(n=Math.floor(e/60)%24),e>=1440&&(i=Math.floor(e/1440)),i=i>0?`${`00${i}`.slice(-2)}D `:"",n=n>0?`${`00${n}`.slice(-2)}H `:"",t=t?`${`00${t}`.slice(-2)}M `:"",`${i}${n}${t}`}(r()(i).diff(r()(n),"minutes")),m=v(s),y=a?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn",b=u(o).filter((e=>l.includes(e.id)));let $="";if(b.length>0){$='<h4 class="visually-hidden">Offers:</h4><ul class="event__selected-offers">';for(const e of b)$+=`\n         <li class="event__offer">\n            <span class="event__offer-title">${e.title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${e.price}</span>\n         </li>\n      `;$+="</ul>"}return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">${d}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${o}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${o} ${m.name}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="2019-03-18T10:30">${f}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="2019-03-18T11:00">${_}</time>\n                  </p>\n                  <p class="event__duration">${h}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${t}</span>\n                </p>\n                ${$}\n                <button class="${y}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const h=[{name:"taxi",title:"Taxi"},{name:"bus",title:"Bus"},{name:"train",title:"Train"},{name:"ship",title:"Ship"},{name:"drive",title:"Drive"},{name:"flight",title:"Flight"},{name:"check-in",title:"Check-in"},{name:"sightseeing",title:"Sightseeing"},{name:"restaurant",title:"Restaurant"}];function m(){return h}class y{constructor({destination:e}){this.destination=e}getTemplate(){return function(e){const{offers:t,type:n}=e,i=f(),s=o(h);let a="",r="",l="",c="";const d=m();for(const e of i.pictures)r+=`\n      <img class="event__photo" src="${e.src}" alt="Event photo">\n    `;for(const e of p)a+=`<option value="${e.name}"></option>`;for(const e of d)l+=`\n    <div class="event__type-item">\n     <input id="event-type-${e.name}-1" class="event__type-input  visually-hidden" type="radio"\n     name="event-type" value="${e.name}" ${e.name===s.name?"checked":""}>\n     <label class="event__type-label  event__type-label--${e.name}" for="event-type-${e.name}-1">${e.title}</label>\n    </div>\n    `;for(const e of u(n))c+=`\n    <div class="event__offer-selector">\n     <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="${e.id}"\n     ${t.includes(e.id)?"checked":""}>\n     <label class="event__offer-label" for="${e.id}">\n      <span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${e.price}</span>\n     </label>\n    </div>\n    `;return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${s.name}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n\n                        ${l}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${s.name}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${i.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      ${a}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Cancel</button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                      ${c}\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${i.description}</p>\n\n                    <div class="event__photos-container">\n                      <div class="event__photos-tape">\n                        ${r}\n                      </div>\n                    </div>\n                  </section>\n                </section>\n              </form>\n            </li>`}(this.destination)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{constructor({point:e}){this.point=e}getTemplate(){return function(e){const{destination:t,offers:n,type:i}=e,s=v(t);let a="",r="",l="";const o=m();let c;for(const e of o)a+=`\n    <div class="event__type-item">\n     <input id="event-type-${e.name}-1" class="event__type-input  visually-hidden" type="radio"\n     name="event-type" value="${e.name}" ${e.name===i?"checked":""}>\n     <label class="event__type-label  event__type-label--${e.name}" for="event-type-${e.name}-1">${e.title}</label>\n    </div>\n    `,e.name===i&&(c=e);for(const e of p)r+=`<option value="${e.name}"></option>`;for(const e of u(i))l+=`\n    <div class="event__offer-selector">\n     <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="${e.id}"\n     ${n.includes(e.id)?"checked":""}>\n     <label class="event__offer-label" for="${e.id}">\n      <span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${e.price}</span>\n     </label>\n    </div>\n    `;return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${a}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${c.title}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${s.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      ${r}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n                    <div class="event__available-offers">\n                        ${l}\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${s.description}</p>\n                  </section>\n                </section>\n              </form>\n            </li>`}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:1100,dateFrom:"2019-09-10T22:22:56.845Z",dateTo:"2019-09-10T22:55:56.845Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",isFavorite:!1,offers:["fde78ca7-d63b-4ce5-9f16-a71cbf813e4d","326fd06d-88b6-4c4e-9a31-c97359e44cf4"],type:"taxi"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808d",basePrice:500,dateFrom:"2019-07-09T06:30:56.845Z",dateTo:"2019-07-11T21:10:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01abcde",isFavorite:!0,offers:[],type:"ship"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808e",basePrice:111100,dateFrom:"2019-12-10T20:20:56.845Z",dateTo:"2019-12-11T11:10:45.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcba",isFavorite:!0,offers:["0195da48-b7ce-44c6-9611-5ba981dd3044"],type:"flight"}];function g(){return o($)}const M=document.querySelector(".page-body"),D=new class{points=Array.from({length:6},g);getPoints(){return this.points}},w=new class{destination=Array.from({length:1},f);getDestination(){return this.destination}},x=new class{constructor({siteMainElement:e,pointsModel:t,destinationModel:n}){this.siteMainElement=e,this.pointsModel=t,this.destinationModel=n}init(){this.points=[...this.pointsModel.getPoints()],this.destination=[...this.destinationModel.getDestination()],t(new i,this.siteMainElement.querySelector(".trip-controls__filters")),t(new s,this.siteMainElement.querySelector(".trip-events__trip-sort-container"));const e=this.siteMainElement.querySelector(".trip-events__list");t(new y({destination:this.destination}),e),t(new b({point:this.points[0]}),e);for(let n=0;n<this.points.length;n++)t(new _({point:this.points[n]}),e)}}({siteMainElement:M,pointsModel:D,destinationModel:w});x.init()})()})();
//# sourceMappingURL=bundle.4f1c9fa4e54926771138.js.map