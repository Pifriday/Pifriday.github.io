(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{L6id:function(l,n,t){"use strict";t.r(n);var u=t("8Y7J");class e{}var i=t("pMnS"),o=t("MKJQ"),s=t("sZkV"),r=t("SVse"),a=t("s7LF"),c=t("mrSG"),h=t("yZrb"),b=t("V7lK"),g=t("HDdC"),p=t("quSY");class d extends p.a{constructor(l,n){super()}schedule(l,n=0){return this}}let m=(()=>{class l{constructor(n,t=l.now){this.SchedulerAction=n,this.now=t}schedule(l,n=0,t){return new this.SchedulerAction(this,l).schedule(t,n)}}return l.now=()=>Date.now(),l})();class v extends m{constructor(l,n=m.now){super(l,()=>v.delegate&&v.delegate!==this?v.delegate.now():n()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(l,n=0,t){return v.delegate&&v.delegate!==this?v.delegate.schedule(l,n,t):super.schedule(l,n,t)}flush(l){const{actions:n}=this;if(this.active)return void n.push(l);let t;this.active=!0;do{if(t=l.execute(l.state,l.delay))break}while(l=n.shift());if(this.active=!1,t){for(;l=n.shift();)l.unsubscribe();throw t}}}const f=new v(class extends d{constructor(l,n){super(l,n),this.scheduler=l,this.work=n,this.pending=!1}schedule(l,n=0){if(this.closed)return this;this.state=l;const t=this.id,u=this.scheduler;return null!=t&&(this.id=this.recycleAsyncId(u,t,n)),this.pending=!0,this.delay=n,this.id=this.id||this.requestAsyncId(u,this.id,n),this}requestAsyncId(l,n,t=0){return setInterval(l.flush.bind(l,this),t)}recycleAsyncId(l,n,t=0){if(null!==t&&this.delay===t&&!1===this.pending)return n;clearInterval(n)}execute(l,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const t=this._execute(l,n);if(t)return t;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(l,n){let t=!1,u=void 0;try{this.work(l)}catch(e){t=!0,u=!!e&&e||new Error(e)}if(t)return this.unsubscribe(),u}_unsubscribe(){const l=this.id,n=this.scheduler,t=n.actions,u=t.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==u&&t.splice(u,1),null!=l&&(this.id=this.recycleAsyncId(n,l,null)),this.delay=null}});var k=t("DH7j");function C(l){const{subscriber:n,counter:t,period:u}=l;n.next(t),this.schedule({subscriber:n,counter:t+1,period:u},u)}var w=t("bSmm"),y=t("naTb");class x{constructor(l,n,t,u,e){this.apiService=l,this.sharedService=n,this.storage=t,this.modalController=u,this.navCtrl=e,this.query="",this.suggestions=[],this.percentChange=0,this.graphRange=1,this.targetCoinCellWidth=0,this.coinCellWidth=0,this.isMobile=!1,this.isDesktop=!0,this.allCoins=[],this.colorStats=this.sharedService.colorStats,this.refresh=function(l=0,n=f){var t;return t=l,(Object(k.a)(t)||!(t-parseFloat(t)+1>=0)||l<0)&&(l=0),n&&"function"==typeof n.schedule||(n=f),new g.a(t=>(t.add(n.schedule(C,l,{subscriber:t,counter:0,period:l})),t))}(9e4).subscribe(()=>{this.sharedService.refreshWatchList()})}ngOnInit(){this.sharedService.refreshWatchList(),window.navigator.userAgent.toLowerCase().includes("mobile")&&(this.sharedService.isMobile=this.isMobile=!0,this.sharedService.isDesktop=this.isDesktop=!1)}ionViewDidEnter(){this.sharedService.coinData&&(this.sharedService.coinData=null);const l=document.querySelector("ion-searchbar"),n=l.querySelector("button"),t=document.createElement("div");t.setAttribute("class","searchbar-search-icon sc-ion-searchbar-md"),t.innerHTML=b.c;const u=l.querySelector("ion-icon");if(u){u.remove(),n.insertAdjacentElement("beforebegin",t);const l=document.createElement("button");l.setAttribute("class","searchbar-clear-button sc-ion-searchbar-md"),l.innerHTML=b.b,n.insertAdjacentElement("afterend",l),n.remove(),l.onmouseover=()=>{this.query=""}}}showSuggestions(){return c.a(this,void 0,void 0,(function*(){this.query=this.query.toLowerCase(),this.suggestions=[],yield this.getAllCoins(),this.suggestions=this.allCoins.filter(l=>l.id.toLowerCase().includes(this.query)||l.name.toLowerCase().includes(this.query)||l.symbol.toLowerCase().includes(this.query)),this.suggestions=this.suggestions.sort((l,n)=>l.id.length-n.id.length);const l=this.suggestions.filter(l=>l.symbol.toLowerCase()===this.query||l.id.toLowerCase()===this.query||l.name.toLowerCase()===this.query);l.length&&this.suggestions.unshift(...l),this.suggestions=Array.from(new Set(this.suggestions)),this.suggestions=this.suggestions.slice(0,5),this.suggestions.forEach(l=>{l.thumbnail=b.a,this.apiService.getThumbnail(l.id).then(n=>{n.image.large.includes("missing")||(l.thumbnail=n.image.large)}).catch(l=>{console.error(l)})})}))}removeCoins(l){const n=l.detail.value;n.length&&this.storage.get("watchList").then(l=>c.a(this,void 0,void 0,(function*(){n.forEach(l=>{const n=this.sharedService.watchList.findIndex(n=>n.id===l);this.sharedService.watchList.splice(n,1)}),yield this.storage.set("watchList",l.filter(l=>!n.includes(l)))})))}sortCoins(l,n){return c.a(this,void 0,void 0,(function*(){this.sharedService.statName=l;const t=[...this.sharedService.watchList].sort((n,t)=>Number(n.priceData[l])-Number(t.priceData[l])),u=[...t].reverse(),e=this.sharedService.watchList.map(n=>n.priceData[l]).toString(),i=yield n.srcElement.querySelector("polygon");this.unHighlightWithException(l),document.querySelectorAll(".sorted").length?e.toString()===u.map(n=>n.priceData[l]).toString()?(this.sharedService.watchList=t,this.swapCaret(i,"up"),this.sharedService.order="asc"):(this.swapCaret(i,"down"),this.sharedService.unHighlightColumn(),this.sharedService.watchList.sort((l,n)=>l.priceData.rank-n.priceData.rank)):(this.sharedService.watchList=u,this.sharedService.highlightColumn(l),this.swapCaret(i,"down"),this.sharedService.order="desc")}))}presentModal(l,n){return c.a(this,void 0,void 0,(function*(){const l=yield this.modalController.create({component:w.a,componentProps:n});return this.sharedService.modal=l,yield l.present()}))}presentProfile(l){const n={coinData:this.sharedService.watchList[this.sharedService.watchList.findIndex(n=>n.id===l)]||this.partiallyUndefined(l)};this.isDesktop?this.presentModal(l,n):(this.sharedService.coinData=n.coinData,this.navCtrl.navigateForward(["profile"]))}partiallyUndefined(l){const n=n=>n.id===l,t=this.allCoins.filter(n)[0];return this.sharedService.undefinedCoin.thumbnail=this.suggestions.filter(n)[0].thumbnail,this.sharedService.undefinedCoin.id=l,this.sharedService.undefinedCoin.symbol=t.symbol,this.sharedService.undefinedCoin.name=t.name,this.sharedService.undefinedCoin}unHighlightWithException(l){document.querySelectorAll(".sorted").forEach(n=>{n.classList.contains(l)||n.classList.remove("sorted")})}swapCaret(l,n){l.setAttribute("points","down"===n?"64 144 256 368 448 144 64 144":"448 368 256 144 64 368 448 368")}getAllCoins(){return c.a(this,void 0,void 0,(function*(){this.allCoins.length||(yield this.apiService.getCoins().then(l=>{this.allCoins=l}).catch(l=>{console.error(l),this.sharedService.presentToast("Unable to connect to CoinGecko.")}))}))}}var M=t("xgBC"),I=u.nb({encapsulation:0,styles:[["@media (prefers-color-scheme:light){td.sorted[_ngcontent-%COMP%]{background-color:#f5f5f5}ion-item[_ngcontent-%COMP%]:hover{--background:whitesmoke;cursor:pointer}.rank[_ngcontent-%COMP%]{color:#000}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd){background-color:rgba(0,0,0,.01)!important}}@media (prefers-color-scheme:dark){.calendar[_ngcontent-%COMP%], .sort-arrow[_ngcontent-%COMP%]{fill:#fff}ion-searchbar[_ngcontent-%COMP%]{--background:darkgray;color:#000}.rank[_ngcontent-%COMP%]{color:#f5f5f5}td.sorted[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.5)}table[_ngcontent-%COMP%]{color:#fff}ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:hover{--background:black;cursor:pointer}  .toolTipData{fill:#ff0}.table-striped[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:nth-of-type(odd){background-color:rgba(0,0,0,.25)}td[_ngcontent-%COMP%]{border-top:1px solid rgba(0,0,0,.5)}p[_ngcontent-%COMP%]{color:#f5f5f5}}.header-content[_ngcontent-%COMP%], ion-item[_ngcontent-%COMP%]:hover{cursor:pointer}ion-thumbnail[_ngcontent-%COMP%]{margin-right:.75rem}th[_ngcontent-%COMP%]{border-top:none!important}th[_ngcontent-%COMP%]:hover   .sort-arrow[_ngcontent-%COMP%]{display:inline-block;fill:gray}td[_ngcontent-%COMP%]{vertical-align:middle}.sort-arrow[_ngcontent-%COMP%]:not(.sorted){font-size:xx-small;display:none}.close[_ngcontent-%COMP%]{fill:red;font-size:small}.align-right[_ngcontent-%COMP%]{text-align:end}.ion-padding-top[_ngcontent-%COMP%]{overflow-x:auto}.mobile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:1.5rem;width:1.5rem}.mobile[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]{--size:1;width:2rem;margin-right:100%}.mobile[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{display:none}.mobile[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:.25rem!important}.mobile-padding[_ngcontent-%COMP%]{padding:0}.desktopOnly[_ngcontent-%COMP%]{display:none}#graphContainer[_ngcontent-%COMP%]{padding:.25rem;width:100%;height:35vw}#dotButton[_ngcontent-%COMP%]{margin-top:.7rem}#dotSelect[_ngcontent-%COMP%]{opacity:0;position:absolute}"]],data:{}});function S(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,2,"ion-select-option",[],null,null,null,o.S,o.u)),u.ob(1,49152,null,0,s.jb,[u.h,u.k,u.x],{value:[0,"value"]},null),(l()(),u.Ib(2,0,["",""]))],(function(l,n){l(n,1,0,u.tb(1,"",n.context.$implicit.id,""))}),(function(l,n){l(n,2,0,n.context.$implicit.name)}))}function _(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,9,"ion-item",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.presentProfile(l.context.$implicit.id)&&u),u}),o.J,o.k)),u.ob(1,49152,null,0,s.F,[u.h,u.k,u.x],null,null),(l()(),u.pb(2,0,null,0,2,"ion-avatar",[["slot","start"]],null,null,null,o.A,o.b)),u.ob(3,49152,null,0,s.d,[u.h,u.k,u.x],null,null),(l()(),u.pb(4,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),u.pb(5,0,null,0,4,"ion-label",[],null,null,null,o.K,o.l)),u.ob(6,49152,null,0,s.L,[u.h,u.k,u.x],null,null),(l()(),u.pb(7,0,null,0,2,"h2",[],null,null,null,null,null)),(l()(),u.Ib(8,null,[""," (",")"])),u.Eb(9,1)],null,(function(l,n){l(n,4,0,n.context.$implicit.thumbnail);var t=n.context.$implicit.name,e=u.Jb(n,8,1,l(n,9,0,u.Bb(n.parent.parent,0),n.context.$implicit.symbol));l(n,8,0,t,e)}))}function O(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,3,"ion-list",[["lines","none"]],null,null,null,o.L,o.m)),u.ob(1,49152,null,0,s.M,[u.h,u.k,u.x],{lines:[0,"lines"]},null),(l()(),u.eb(16777216,null,0,1,null,_)),u.ob(3,278528,null,0,r.j,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var t=n.component;l(n,1,0,"none"),l(n,3,0,t.suggestions)}),null)}function P(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,0,"hr",[],null,null,null,null,null))],null,null)}function B(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("week",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Week "])),(l()(),u.pb(3,0,null,null,3,":svg:svg",[["class","sort-arrow week"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(4,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(6,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null))],null,null)}function D(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("month",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Month "])),(l()(),u.pb(3,0,null,null,3,":svg:svg",[["class","sort-arrow month"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(4,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(6,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null))],null,null)}function q(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("year",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Year "])),(l()(),u.pb(3,0,null,null,3,":svg:svg",[["class","sort-arrow year"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(4,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(6,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null))],null,null)}function L(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("volume",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Volume (24hr) "])),(l()(),u.pb(3,0,null,null,3,":svg:svg",[["class","sort-arrow volume"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(4,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(6,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null))],null,null)}function E(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("market_cap_change",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Market Cap "])),(l()(),u.pb(3,0,null,null,3,":svg:svg",[["class","sort-arrow market_cap_change"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(4,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(6,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null))],null,null)}function J(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,4,"td",[["class","align-right stat week"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(2,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),u.Ib(3,null,["","%"])),u.Eb(4,2)],(function(l,n){l(n,2,0,"align-right stat week",n.component.colorStats(n.parent.context.$implicit.priceData.week))}),(function(l,n){var t=u.Jb(n,3,0,l(n,4,0,u.Bb(n.parent.parent,1),n.parent.context.$implicit.priceData.week,"1.1-1"));l(n,3,0,t)}))}function z(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,4,"td",[["class","align-right stat month"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(2,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),u.Ib(3,null,["","%"])),u.Eb(4,2)],(function(l,n){l(n,2,0,"align-right stat month",n.component.colorStats(n.parent.context.$implicit.priceData.month))}),(function(l,n){var t=u.Jb(n,3,0,l(n,4,0,u.Bb(n.parent.parent,1),n.parent.context.$implicit.priceData.month,"1.1-1"));l(n,3,0,t)}))}function $(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,4,"td",[["class","align-right stat year"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(2,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),u.Ib(3,null,["","%"])),u.Eb(4,2)],(function(l,n){l(n,2,0,"align-right stat year",n.component.colorStats(n.parent.context.$implicit.priceData.year))}),(function(l,n){var t=u.Jb(n,3,0,l(n,4,0,u.Bb(n.parent.parent,1),n.parent.context.$implicit.priceData.year,"1.1-1"));l(n,3,0,t)}))}function F(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,2,"td",[["class","align-right stat volume"]],null,null,null,null,null)),(l()(),u.Ib(1,null,["$",""])),u.Eb(2,1)],null,(function(l,n){var t=u.Jb(n,1,0,l(n,2,0,u.Bb(n.parent.parent,1),n.parent.context.$implicit.priceData.volume));l(n,1,0,t)}))}function K(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,10,"td",[["class","align-right market_cap_change"]],null,null,null,null,null)),(l()(),u.pb(1,0,null,null,9,"ion-label",[["class","ion-no-margin"]],null,null,null,o.K,o.l)),u.ob(2,49152,null,0,s.L,[u.h,u.k,u.x],null,null),(l()(),u.pb(3,0,null,0,2,"h3",[["class","stat"]],null,null,null,null,null)),(l()(),u.Ib(4,null,["$",""])),u.Eb(5,1),(l()(),u.pb(6,0,null,0,4,"p",[["class","stat"],["data-toggle","tooltip"],["title","24hr change in market cap"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(8,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),u.Ib(9,null,[" ","% "])),u.Eb(10,2)],(function(l,n){l(n,8,0,"stat",n.component.colorStats(n.parent.context.$implicit.priceData.market_cap_change))}),(function(l,n){var t=u.Jb(n,4,0,l(n,5,0,u.Bb(n.parent.parent,1),n.parent.context.$implicit.priceData.market_cap));l(n,4,0,t);var e=u.Jb(n,9,0,l(n,10,0,u.Bb(n.parent.parent,1),n.parent.context.$implicit.priceData.market_cap_change,"1.2-2"));l(n,9,0,e)}))}function A(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,47,"tr",[],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.presentProfile(l.context.$implicit.id)&&u),u}),null,null)),(l()(),u.pb(1,0,null,null,23,"td",[["class","coinCell"]],null,null,null,null,null)),(l()(),u.pb(2,0,null,null,22,"div",[["class","ion-no-margin"]],null,null,null,null,null)),(l()(),u.pb(3,0,null,null,21,"ion-grid",[["class","ion-no-margin ion-no-padding"]],null,null,null,o.G,o.h)),u.ob(4,49152,null,0,s.y,[u.h,u.k,u.x],null,null),(l()(),u.pb(5,0,null,0,19,"div",[],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(7,278528,null,0,r.i,[r.t],{ngClass:[0,"ngClass"]},null),u.Db(8,{mobile:0}),(l()(),u.pb(9,0,null,null,15,"ion-row",[["size","auto"]],null,null,null,o.O,o.p)),u.ob(10,49152,null,0,s.eb,[u.h,u.k,u.x],null,null),(l()(),u.pb(11,0,null,0,4,"ion-col",[["size","auto"]],null,null,null,o.E,o.f)),u.ob(12,49152,null,0,s.r,[u.h,u.k,u.x],{size:[0,"size"]},null),(l()(),u.pb(13,0,null,0,2,"ion-thumbnail",[],null,null,null,o.V,o.w)),u.ob(14,49152,null,0,s.ub,[u.h,u.k,u.x],null,null),(l()(),u.pb(15,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),u.pb(16,0,null,0,8,"ion-col",[["class","coinColumn"],["size","auto"],["style","vertical-align: middle;"]],null,null,null,o.E,o.f)),u.ob(17,49152,null,0,s.r,[u.h,u.k,u.x],{size:[0,"size"]},null),(l()(),u.pb(18,0,null,0,6,"ion-label",[],null,null,null,o.K,o.l)),u.ob(19,49152,null,0,s.L,[u.h,u.k,u.x],null,null),(l()(),u.pb(20,0,null,0,1,"b",[],null,null,null,null,null)),(l()(),u.Ib(21,null,["",""])),(l()(),u.pb(22,0,null,0,2,"p",[],null,null,null,null,null)),(l()(),u.Ib(23,null,["",""])),u.Eb(24,1),(l()(),u.pb(25,0,null,null,2,"td",[["class","align-right stat price"]],null,null,null,null,null)),(l()(),u.Ib(26,null,["$",""])),u.Eb(27,1),(l()(),u.pb(28,0,null,null,4,"td",[["class","align-right stat hour"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(30,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),u.Ib(31,null,["","%"])),u.Eb(32,2),(l()(),u.pb(33,0,null,null,4,"td",[["class","align-right stat day"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(35,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(l()(),u.Ib(36,null,["","%"])),u.Eb(37,2),(l()(),u.eb(16777216,null,null,1,null,J)),u.ob(39,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,z)),u.ob(41,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,$)),u.ob(43,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,F)),u.ob(45,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,K)),u.ob(47,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component,u=l(n,8,0,t.isMobile);l(n,7,0,u),l(n,12,0,"auto"),l(n,17,0,"auto"),l(n,30,0,"align-right stat hour",t.colorStats(n.context.$implicit.priceData.hour)),l(n,35,0,"align-right stat day",t.colorStats(n.context.$implicit.priceData.day)),l(n,39,0,t.isDesktop),l(n,41,0,t.isDesktop),l(n,43,0,t.isDesktop),l(n,45,0,t.isDesktop),l(n,47,0,t.isDesktop)}),(function(l,n){l(n,15,0,n.context.$implicit.thumbnail),l(n,21,0,n.context.$implicit.name);var t=u.Jb(n,23,0,l(n,24,0,u.Bb(n.parent,0),n.context.$implicit.symbol));l(n,23,0,t);var e=u.Jb(n,26,0,l(n,27,0,u.Bb(n.parent,1),n.context.$implicit.priceData.price));l(n,26,0,e);var i=u.Jb(n,31,0,l(n,32,0,u.Bb(n.parent,1),n.context.$implicit.priceData.hour,"1.1-1"));l(n,31,0,i);var o=u.Jb(n,36,0,l(n,37,0,u.Bb(n.parent,1),n.context.$implicit.priceData.day,"1.1-1"));l(n,36,0,o)}))}function T(l){return u.Kb(0,[u.Cb(0,r.q,[]),u.Cb(0,r.d,[u.s]),(l()(),u.pb(2,0,null,null,81,"ion-content",[["class","ion-padding"]],null,null,null,o.F,o.g)),u.ob(3,49152,null,0,s.s,[u.h,u.k,u.x],null,null),(l()(),u.pb(4,0,null,0,3,"ion-refresher",[["mode","md"],["slot","fixed"]],null,[[null,"ionRefresh"]],(function(l,n,t){var u=!0;return"ionRefresh"===n&&(u=!1!==l.component.sharedService.refreshWatchList(t)&&u),u}),o.N,o.n)),u.ob(5,49152,null,0,s.Y,[u.h,u.k,u.x],null,null),(l()(),u.pb(6,0,null,0,1,"ion-refresher-content",[["refreshing-spinner","bubbles"]],null,null,null,o.M,o.o)),u.ob(7,49152,null,0,s.Z,[u.h,u.k,u.x],null,null),(l()(),u.pb(8,0,null,0,29,"ion-grid",[],null,null,null,o.G,o.h)),u.ob(9,49152,null,0,s.y,[u.h,u.k,u.x],null,null),(l()(),u.pb(10,0,null,0,27,"ion-row",[],null,null,null,o.O,o.p)),u.ob(11,49152,null,0,s.eb,[u.h,u.k,u.x],null,null),(l()(),u.pb(12,0,null,0,8,"ion-col",[],null,null,null,o.E,o.f)),u.ob(13,49152,null,0,s.r,[u.h,u.k,u.x],null,null),(l()(),u.pb(14,0,null,0,6,"ion-searchbar",[["mode","md"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ionChange"],[null,"ngModelChange"],[null,"ionBlur"]],(function(l,n,t){var e=!0,i=l.component;return"ionBlur"===n&&(e=!1!==u.Bb(l,15)._handleBlurEvent(t.target)&&e),"ionChange"===n&&(e=!1!==u.Bb(l,15)._handleInputEvent(t.target)&&e),"ionChange"===n&&(e=!1!==i.showSuggestions()&&e),"ngModelChange"===n&&(e=!1!==(i.query=t)&&e),e}),o.P,o.q)),u.ob(15,16384,null,0,s.Gb,[u.k],null,null),u.Fb(1024,null,a.b,(function(l){return[l]}),[s.Gb]),u.ob(17,671744,null,0,a.e,[[8,null],[8,null],[8,null],[6,a.b]],{model:[0,"model"]},{update:"ngModelChange"}),u.Fb(2048,null,a.c,null,[a.e]),u.ob(19,16384,null,0,a.d,[[4,a.c]],null,null),u.ob(20,49152,null,0,s.fb,[u.h,u.k,u.x],{mode:[0,"mode"]},null),(l()(),u.pb(21,0,null,0,16,"ion-col",[["size","auto"]],null,null,null,o.E,o.f)),u.ob(22,49152,null,0,s.r,[u.h,u.k,u.x],{size:[0,"size"]},null),(l()(),u.pb(23,0,null,0,14,"ion-button",[["color","light"],["id","dotButton"],["mode","md"]],null,null,null,o.C,o.d)),u.ob(24,49152,null,0,s.i,[u.h,u.k,u.x],{color:[0,"color"],mode:[1,"mode"]},null),(l()(),u.pb(25,0,null,0,1,"ion-icon",[["name","ellipsis-horizontal-outline"]],null,null,null,o.I,o.j)),u.ob(26,49152,null,0,s.A,[u.h,u.k,u.x],{name:[0,"name"]},null),(l()(),u.pb(27,0,null,0,10,"ion-item",[["id","dotSelect"]],null,null,null,o.J,o.k)),u.ob(28,49152,null,0,s.F,[u.h,u.k,u.x],null,null),(l()(),u.pb(29,0,null,0,2,"ion-label",[],null,null,null,o.K,o.l)),u.ob(30,49152,null,0,s.L,[u.h,u.k,u.x],null,null),(l()(),u.Ib(-1,0,["Remove Coins"])),(l()(),u.pb(32,0,null,0,5,"ion-select",[["cancelText","Cancel"],["multiple","true"],["okText","OK"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(l,n,t){var e=!0,i=l.component;return"ionBlur"===n&&(e=!1!==u.Bb(l,35)._handleBlurEvent(t.target)&&e),"ionChange"===n&&(e=!1!==u.Bb(l,35)._handleChangeEvent(t.target)&&e),"ionChange"===n&&(e=!1!==i.removeCoins(t)&&e),e}),o.T,o.t)),u.Fb(5120,null,a.b,(function(l){return[l]}),[s.Fb]),u.ob(34,49152,null,0,s.ib,[u.h,u.k,u.x],{cancelText:[0,"cancelText"],multiple:[1,"multiple"],okText:[2,"okText"]},null),u.ob(35,16384,null,0,s.Fb,[u.k],null,null),(l()(),u.eb(16777216,null,0,1,null,S)),u.ob(37,278528,null,0,r.j,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null),(l()(),u.eb(16777216,null,0,1,null,O)),u.ob(39,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,0,1,null,P)),u.ob(41,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.pb(42,0,null,0,41,"div",[["class","ion-padding"]],null,null,null,null,null)),u.Fb(512,null,r.t,r.u,[u.q,u.r,u.k,u.B]),u.ob(44,278528,null,0,r.i,[r.t],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),u.Db(45,{"mobile-padding":0}),(l()(),u.pb(46,0,null,null,37,"table",[["class","table table-sm table-striped"]],null,null,null,null,null)),(l()(),u.pb(47,0,null,null,33,"tr",[],null,null,null,null,null)),(l()(),u.pb(48,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["Coin"])),(l()(),u.pb(50,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(51,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("price",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Price "])),(l()(),u.pb(53,0,null,null,3,":svg:svg",[["class","sort-arrow price"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(54,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(56,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null)),(l()(),u.pb(57,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(58,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("hour",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Hour "])),(l()(),u.pb(60,0,null,null,3,":svg:svg",[["class","sort-arrow hour"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(61,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(63,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null)),(l()(),u.pb(64,0,null,null,6,"th",[["class","align-right"]],null,null,null,null,null)),(l()(),u.pb(65,0,null,null,5,"span",[["class","header-content"]],null,[[null,"click"]],(function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.sortCoins("day",t)&&u),u}),null,null)),(l()(),u.Ib(-1,null,[" Day "])),(l()(),u.pb(67,0,null,null,3,":svg:svg",[["class","sort-arrow day"],["height","8"],["viewBox","0 0 512 512"],["width","8"],["xmlns","http://www.w3.org/2000/svg"]],null,null,null,null,null)),(l()(),u.pb(68,0,null,null,1,":svg:title",[],null,null,null,null,null)),(l()(),u.Ib(-1,null,["ionicons-v5-b"])),(l()(),u.pb(70,0,null,null,0,":svg:polygon",[["points","64 144 256 368 448 144 64 144"]],null,null,null,null,null)),(l()(),u.eb(16777216,null,null,1,null,B)),u.ob(72,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,D)),u.ob(74,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,q)),u.ob(76,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,L)),u.ob(78,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.eb(16777216,null,null,1,null,E)),u.ob(80,16384,null,0,r.k,[u.M,u.J],{ngIf:[0,"ngIf"]},null),(l()(),u.pb(81,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),u.eb(16777216,null,null,1,null,A)),u.ob(83,278528,null,0,r.j,[u.M,u.J,u.q],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var t=n.component;l(n,17,0,t.query),l(n,20,0,"md"),l(n,22,0,"auto"),l(n,24,0,"light","md"),l(n,26,0,"ellipsis-horizontal-outline"),l(n,34,0,"Cancel","true","OK"),l(n,37,0,t.sharedService.watchList),l(n,39,0,t.suggestions.length&&t.query),l(n,41,0,t.suggestions.length&&t.query);var u=l(n,45,0,t.isMobile);l(n,44,0,"ion-padding",u),l(n,72,0,t.isDesktop),l(n,74,0,t.isDesktop),l(n,76,0,t.isDesktop),l(n,78,0,t.isDesktop),l(n,80,0,t.isDesktop),l(n,83,0,t.sharedService.watchList)}),(function(l,n){l(n,14,0,u.Bb(n,19).ngClassUntouched,u.Bb(n,19).ngClassTouched,u.Bb(n,19).ngClassPristine,u.Bb(n,19).ngClassDirty,u.Bb(n,19).ngClassValid,u.Bb(n,19).ngClassInvalid,u.Bb(n,19).ngClassPending)}))}var j=u.lb("app-home",x,(function(l){return u.Kb(0,[(l()(),u.pb(0,0,null,null,1,"app-home",[],null,null,null,T,I)),u.ob(1,114688,null,0,x,[h.a,y.a,M.b,s.Bb,s.Cb],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),H=t("iInd");t.d(n,"HomePageModuleNgFactory",(function(){return W}));var W=u.mb(e,[],(function(l){return u.yb([u.zb(512,u.j,u.X,[[8,[i.a,j]],[3,u.j],u.v]),u.zb(4608,r.m,r.l,[u.s,[2,r.y]]),u.zb(4608,a.g,a.g,[]),u.zb(4608,s.a,s.a,[u.x,u.g]),u.zb(4608,s.Bb,s.Bb,[s.a,u.j,u.p]),u.zb(4608,s.Eb,s.Eb,[s.a,u.j,u.p]),u.zb(1073742336,r.b,r.b,[]),u.zb(1073742336,a.f,a.f,[]),u.zb(1073742336,a.a,a.a,[]),u.zb(1073742336,s.zb,s.zb,[]),u.zb(1073742336,H.n,H.n,[[2,H.s],[2,H.m]]),u.zb(1073742336,e,e,[]),u.zb(1024,H.k,(function(){return[[{path:"",component:x}]]}),[])])}))}}]);