import{r as P,o as B,c as k,a as v,m as C,b as S,F as L,s as A,d as O,e as T,f as D,g as U,h as j}from"./vendor.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const V=(s,e)=>{const t=s.__vccOpts||s;for(const[i,r]of e)t[i]=r;return t},x={};function M(s,e){const t=P("router-view");return B(),k(t)}const F=V(x,[["render",M]]),N="modulepreload",q=function(s){return"/@BASE_URL@/"+s},y={},f=function(e,t,i){if(!t||t.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(t.map(o=>{if(o=q(o),o in y)return;y[o]=!0;const n=o.endsWith(".css"),u=n?'[rel="stylesheet"]':"";if(!!i)for(let m=r.length-1;m>=0;m--){const d=r[m];if(d.href===o&&(!n||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${u}`))return;const l=document.createElement("link");if(l.rel=n?"stylesheet":N,n||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),n)return new Promise((m,d)=>{l.addEventListener("load",m),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())};async function $(){(await f(()=>import("./webfontloader.js").then(e=>e.w),["assets/webfontloader.js","assets/vendor.js"])).load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}const K=v({theme:{themes:{light:{colors:{primary:"#1867C0",secondary:"#5CBBF6"}}}}}),c=window.bblocksViewer||{},I=new URLSearchParams(window.location.search);let a;const g=I.getAll("register");g!=null&&g.length&&(a=g.pop());a||(a=window.bblocksRegister||window.bblocksRegisters,Array.isArray(a)&&(a=a[0]));!a&&{}.VITE_BBLOCK_REGISTER&&(a={}.VITE_BBLOCK_REGISTER);a||(a="https://opengeospatial.github.io/bblocks/register.json");let h=I.get("showImported");h||(h={}.VITE_SHOW_IMPORTED);if(h)if(typeof h=="number"||!isNaN(parseInt(h))){const s=parseInt(h);c.showImported=s<0?!0:s}else c.showImported=["true","on","all"].includes(h);(typeof c.showImported>"u"||c.showImported===!1)&&(c.showImported=0);c.title||(c.title="OGC Location Building Blocks");document.title=c.title;c.baseUrl||(c.baseUrl="/@BASE_URL@/");const _={config:c,register:a},G=["#4363d8","#e6194b","#297a32","#75670b","#f58231","#911eb4","#30a5a5","#f032e6","#85ab08","#997474","#008080","#e6beff","#9a6324","#fffac8","#800000","#aaffc3","#808000","#ffd8b1","#000075","#808080","#000000"],H=(s=G)=>{const e={},t=new Set;return i=>(t.has(i)||(e[i]=s[t.size%s.length],t.add(i)),e[i])};function le(s,e){let t;return function(...i){t&&clearTimeout(t);const r=this;t=setTimeout(()=>{s.apply(r,i)},e)}}function fe(s,e=null){let t=C(s);if(e){const i=new DOMParser().parseFromString(t,"text/html");t=W(i,e).body.innerHTML}return t}function W(s,e){return e&&(e.endsWith("/")||(e+="/"),s.querySelectorAll("[src],[href]").forEach(t=>{for(let i of["src","href"])if(t[i])try{const r=t.getAttribute(i),o=new URL(r,e);t.setAttribute(i,o.toString())}catch{}})),s}function he(s){var t;s.preventDefault();let e=null;(t=s.target)!=null&&t.href?e=s.target.href:s.target.tagName.toLowerCase()==="img"&&(e=s.target.src),e&&window.open(e)}function ue(s){navigator!=null&&navigator.clipboard&&navigator.clipboard.writeText(s)}function p(){const s={resolve:null,reject:null};return s.promise=new Promise((e,t)=>Object.assign(s,{resolve:e,reject:t})),s}const Q=S.create({timeout:3e3}),z=L(Q,{cacheTakeover:!1}),Y={client:z},J="https://opengeospatial.github.io/bblocks/register.json",X="default",Z=["local","register","importLevel"],ee=H(),b=Y.client;class te{constructor(){this._registerLoadCallbacks=[],this.localRegister=null,this.registers={},this.registerPromises={local:p(),all:p()},this.errorRegisters={},this.loadedRegistersCount=0,this.bblocks={local:{},all:{}},this.bblockPromises={local:p(),all:p()},this.resourceMappings={},this._loadRegister(_.register,!0)}async _loadRegister(e,t,i=0){return e===X&&(e=J),this.registers[e]?new Promise(()=>!0):(this.registers[e]={},b.get(e).then(r=>(Array.isArray(r.data)?this.registers[e]={local:t,url:e,importLevel:i,bblocks:r.data}:(this.registers[e]={...r.data,local:t,url:e,importLevel:i},Array.isArray(r.data.imports)&&r.data.imports.filter(o=>!this.registers[o]).forEach(o=>this._loadRegister(o,!1,i+1))),this.registers[e].color=ee(e),this.registers[e].name||(this.registers[e].name=e.replace(/(\/build)?\/[^/]+\.json$/,"").replace(/^.*\//,"")),t&&(this.localRegister=this.registers[e]),e)).then(r=>{const o=this.registers[r].bblocks;for(let n of o){if(n.local=t,n.importLevel=i,n.register={url:r,name:this.registers[r].name,color:this.registers[r].color},this.bblocks.all[n.itemIdentifier]=n,t&&(this.bblocks.local[n.itemIdentifier]=n),n.schema){for(let u of Object.values(n.schema))this.resourceMappings[u]=n.itemIdentifier;n.sourceSchema&&(this.resourceMappings[n.sourceSchema]=n.itemIdentifier)}n.openAPIDocument&&(console.log("adding",n.openAPIDocument),this.resourceMappings[n.openAPIDocument]=n.itemIdentifier,n.sourceOpenAPIDocument&&(this.resourceMappings[n.sourceOpenAPIDocument]=n.itemIdentifier))}return this.loadedRegistersCount++,t&&(this.bblockPromises.local.resolve(this.bblocks.local),this.registerPromises.local.resolve(this.localRegister)),this.loadedRegistersCount===Object.keys(this.registers).length&&(this.bblockPromises.all.resolve(this.bblocks.all),this.registerPromises.all.resolve(this.registers)),o}).catch(r=>{console.log("Error loading register",r),this.errorRegisters[e]={error:r}}).finally(()=>{this._onRegisterLoad()}))}getBBlocks(e=!1){return e?this.bblockPromises.all.promise:this.bblockPromises.local.promise}_onRegisterLoad(){this._registerLoadCallbacks.length&&this._registerLoadCallbacks.forEach(e=>e(this.registers,this.loadedRegistersCount,this.errorRegisters))}onRegisterLoad(e){e&&(this._registerLoadCallbacks.push(e),Object.keys(this.registers).length&&e(this.registers,this.loadedRegistersCount,this.errorRegisters))}async fetchBBlock(e){let t=await this.bblockPromises.local.promise;t[e]||(t=await this.bblockPromises.all.promise);const i=t[e],r=i.documentation["json-full"].url,n=(await b.get(r)).data;return Z.forEach(u=>n[u]=i[u]),n}getRegisters(e=!1){return e?this.registerPromises.all.promise:this.registerPromises.local.promise}async fetchLdContext(e){return this.fetchDocument(e,"ldContext")}async fetchSourceLdContext(e){return this.fetchDocument(e,"sourceLdContext")}async fetchSourceSchema(e){return this.fetchDocument(e,"sourceSchema")}fetchDocument(e,t){let i;if(t=t.slice(),Array.isArray(t))for(i=e[t.shift()];i&&t.length;)i=i[t.shift()];else i=e[t];return i?this.fetchDocumentByUrl(e,i):Promise.resolve(null)}fetchDocumentByUrl(e,t){return b.get(t,{responseType:"text"}).catch(i=>{if(e.remoteCacheDir){const r=A.sha256(t);let o=e.remoteCacheDir;return o.slice(-1)!=="/"&&(o+="/"),b.get(o+r)}throw i}).then(i=>i.data)}isShown(e){const t=_.config.showImported;return t===!0||e===0||e.importLevel===0||e.local?!0:t?typeof e=="number"?t>=e:e.local||t>=e.importLevel:!1}async findResource(e){if(await this.registerPromises.all.promise,this.resourceMappings[e])return this.bblocks.all[this.resourceMappings[e]]}}const R=new te,se=O("navigation",{state:()=>({items:[],handler:null}),actions:{clearItems(){this.items=[],this.handler=null},setItems(s,e){console.log("setting new items"),this.items=s,this.handler=e}}}),re=[{path:"/",component:()=>f(()=>import("./Default.js"),["assets/Default.js","assets/vendor.js","assets/VContainer.js","assets/VContainer.css","assets/VList.js","assets/VList.css","assets/VToolbar.js","assets/dialog-transition.js","assets/VToolbar.css","assets/Default.css"]),children:[{path:"",name:"Home",component:()=>f(()=>import("./Home.js"),["assets/Home.js","assets/VTooltip.js","assets/vendor.js","assets/VList.js","assets/VContainer.js","assets/VContainer.css","assets/VList.css","assets/VTooltip.css","assets/VRow.js","assets/Home.css"])},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>f(()=>import("./NotFound.js"),["assets/NotFound.js","assets/VContainer.js","assets/vendor.js","assets/VContainer.css","assets/VRow.js"])}]},{path:"/bblock",component:()=>f(()=>import("./Default.js"),["assets/Default.js","assets/vendor.js","assets/VContainer.js","assets/VContainer.css","assets/VList.js","assets/VList.css","assets/VToolbar.js","assets/dialog-transition.js","assets/VToolbar.css","assets/Default.css"]),children:[{path:"",name:"BuildingBlockList",component:()=>f(()=>import("./BuildingBlockList.js"),["assets/BuildingBlockList.js","assets/VExpansionPanel.js","assets/vendor.js","assets/VList.js","assets/VContainer.js","assets/VContainer.css","assets/VList.css","assets/dialog-transition.js","assets/VExpansionPanel.css","assets/VRow.js","assets/BuildingBlockList.css"])},{path:":id/:section?",name:"BuildingBlock",component:()=>f(()=>import("./BuildingBlock.js"),["assets/BuildingBlock.js","assets/vendor.js","assets/VExpansionPanel.js","assets/VList.js","assets/VContainer.js","assets/VContainer.css","assets/VList.css","assets/dialog-transition.js","assets/VExpansionPanel.css","assets/VRow.js","assets/VToolbar.js","assets/VToolbar.css","assets/VTooltip.js","assets/VTooltip.css","assets/BuildingBlock.css"]),beforeEnter:async s=>{const e=await R.getBBlocks(_.config.showImported);if(!e[s.params.id]||!R.isShown(e[s.params.id]))return"404";if(s.params.section==="json-ld")return{name:"BuildingBlock",params:{id:s.params.id,section:"semantic-uplift"}}}}]}],ie=(s,e,t)=>{const i=Object.entries(e.query).filter(r=>!s.query.hasOwnProperty(r[0]));if(!i.length)t();else{const r=Object.assign(Object.fromEntries(i),s.query);t({...s,query:r})}},oe=(s,e)=>{if(s.name==="BuildingBlock"&&e.name==="BuildingBlock"&&s.params.id===e.params.id)return;se().clearItems()},w=T({history:D(_.config.baseUrl),routes:re});w.beforeEach(ie);w.beforeEach(oe);function ne(s){$(),s.use(U()).use(K).use(w)}const E=j(F);ne(E);console.log("BBlocks Viewer revision 5fa96d9 (updated 2024-08-01T12:26:01+02:00)");E.mount("#app");export{V as _,f as a,R as b,_ as c,le as d,ue as e,Y as h,he as i,fe as m,W as s,se as u};
