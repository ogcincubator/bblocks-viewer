import{r as I,o as k,c as C,a as B,m as L,b as S,F as v,d as T,e as O,f as A}from"./vendor.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const x=(r,e)=>{const t=r.__vccOpts||r;for(const[i,s]of e)t[i]=s;return t},j={};function U(r,e){const t=I("router-view");return k(),C(t)}const V=x(j,[["render",U]]),D="modulepreload",F=function(r){return"/@BASE_URL@/"+r},y={},u=function(e,t,i){if(!t||t.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(t.map(o=>{if(o=F(o),o in y)return;y[o]=!0;const n=o.endsWith(".css"),h=n?'[rel="stylesheet"]':"";if(!!i)for(let d=s.length-1;d>=0;d--){const g=s[d];if(g.href===o&&(!n||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${h}`))return;const l=document.createElement("link");if(l.rel=n?"stylesheet":D,n||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),n)return new Promise((d,g)=>{l.addEventListener("load",d),l.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())};async function M(){(await u(()=>import("./webfontloader.js").then(e=>e.w),["assets/webfontloader.js","assets/_commonjsHelpers.js"])).load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}const N=B({theme:{themes:{light:{colors:{primary:"#1867C0",secondary:"#5CBBF6"}}}}}),c=window.bblocksViewer||{},R=new URLSearchParams(window.location.search);let a;const p=R.getAll("register");p!=null&&p.length&&(a=p.pop());a||(a=window.bblocksRegister||window.bblocksRegisters,Array.isArray(a)&&(a=a[0]));!a&&{}.VITE_BBLOCK_REGISTER&&(a={}.VITE_BBLOCK_REGISTER);a||(a="https://opengeospatial.github.io/bblocks/register.json");let f=R.get("showImported");f||(f={}.VITE_SHOW_IMPORTED);if(f)if(typeof f=="number"||!isNaN(parseInt(f))){const r=parseInt(f);c.showImported=r<0?!0:r}else c.showImported=["true","on","all"].includes(f);(typeof c.showImported>"u"||c.showImported===!1)&&(c.showImported=0);c.title||(c.title="OGC Location Building Blocks");document.title=c.title;c.baseUrl||(c.baseUrl="/@BASE_URL@/");const _={config:c,register:a},q=["#4363d8","#e6194b","#297a32","#75670b","#f58231","#911eb4","#30a5a5","#f032e6","#85ab08","#997474","#008080","#e6beff","#9a6324","#fffac8","#800000","#aaffc3","#808000","#ffd8b1","#000075","#808080","#000000"],K=(r=q)=>{const e={},t=new Set;return i=>(t.has(i)||(e[i]=r[t.size%r.length],t.add(i)),e[i])};function se(r,e){let t;return function(...i){t&&clearTimeout(t);const s=this;t=setTimeout(()=>{r.apply(s,i)},e)}}function re(r,e=null){let t=L(r);if(e){const i=new DOMParser().parseFromString(t,"text/html");t=$(i,e).body.innerHTML}return t}function $(r,e){return e&&(e.endsWith("/")||(e+="/"),r.querySelectorAll("[src],[href]").forEach(t=>{for(let i of["src","href"])if(t[i])try{const s=t.getAttribute(i),o=new URL(s,e);t.setAttribute(i,o.toString())}catch{}})),r}function oe(r){var t;r.preventDefault();let e=null;(t=r.target)!=null&&t.href?e=r.target.href:r.target.tagName.toLowerCase()==="img"&&(e=r.target.src),e&&window.open(e)}function ie(r){navigator!=null&&navigator.clipboard&&navigator.clipboard.writeText(r)}function b(){const r={resolve:null,reject:null};return r.promise=new Promise((e,t)=>Object.assign(r,{resolve:e,reject:t})),r}const G=S.create({timeout:3e3}),m=v(G,{cacheTakeover:!1}),H="https://opengeospatial.github.io/bblocks/register.json",W="default",Q=["local","register","importLevel"],z=K();class Y{constructor(){this._registerLoadCallbacks=[],this.localRegister=null,this.registers={},this.registerPromises={local:b(),all:b()},this.errorRegisters={},this.loadedRegistersCount=0,this.bblocks={local:{},all:{}},this.bblockPromises={local:b(),all:b()},this.resourceMappings={},this._loadRegister(_.register,!0)}async _loadRegister(e,t,i=0){return e===W&&(e=H),this.registers[e]?new Promise(()=>!0):(this.registers[e]={},m.get(e).then(s=>(Array.isArray(s.data)?this.registers[e]={local:t,url:e,importLevel:i,bblocks:s.data}:(this.registers[e]={...s.data,local:t,url:e,importLevel:i},Array.isArray(s.data.imports)&&s.data.imports.filter(o=>!this.registers[o]).forEach(o=>this._loadRegister(o,!1,i+1))),this.registers[e].color=z(e),this.registers[e].name||(this.registers[e].name=e.replace(/(\/build)?\/[^\/]+\.json$/,"").replace(/^.*\//,"")),t&&(this.localRegister=this.registers[e]),e)).then(s=>{const o=this.registers[s].bblocks;for(let n of o)if(n.local=t,n.importLevel=i,n.register={url:s,name:this.registers[s].name,color:this.registers[s].color},this.bblocks.all[n.itemIdentifier]=n,t&&(this.bblocks.local[n.itemIdentifier]=n),n.schema){for(let h of Object.values(n.schema))this.resourceMappings[h]=n.itemIdentifier;n.sourceSchema&&(this.resourceMappings[n.sourceSchema]=n.itemIdentifier)}return this.loadedRegistersCount++,t&&(this.bblockPromises.local.resolve(this.bblocks.local),this.registerPromises.local.resolve(this.localRegister)),this.loadedRegistersCount===Object.keys(this.registers).length&&(this.bblockPromises.all.resolve(this.bblocks.all),this.registerPromises.all.resolve(this.registers)),o}).catch(s=>{console.log("Error loading register",s),this.errorRegisters[e]={error:s}}).finally(()=>{this._onRegisterLoad()}))}getBBlocks(e=!1){return e?this.bblockPromises.all.promise:this.bblockPromises.local.promise}_onRegisterLoad(){this._registerLoadCallbacks.length&&this._registerLoadCallbacks.forEach(e=>e(this.registers,this.loadedRegistersCount,this.errorRegisters))}onRegisterLoad(e){e&&(this._registerLoadCallbacks.push(e),Object.keys(this.registers).length&&e(this.registers,this.loadedRegistersCount,this.errorRegisters))}async fetchBBlock(e){let t=await this.bblockPromises.local.promise;t[e]||(t=await this.bblockPromises.all.promise);const i=t[e],s=i.documentation["json-full"].url,n=(await m.get(s)).data;return Q.forEach(h=>n[h]=i[h]),n}getRegisters(e=!1){return e?this.registerPromises.all.promise:this.registerPromises.local.promise}async fetchLdContext(e){return e.ldContext?(await m.get(e.ldContext,{responseType:"text"})).data:null}async fetchSourceLdContext(e){return e.sourceLdContext?(await m.get(e.sourceLdContext,{responseType:"text"})).data:null}async fetchSourceSchema(e){return e.sourceSchema?(await m.get(e.sourceSchema,{responseType:"text"})).data:null}isShown(e){const t=_.config.showImported;return t===!0||e===0||e.importLevel===0||e.local?!0:t?typeof e=="number"?t>=e:e.local||t>=e.importLevel:!1}async findResource(e){if(await this.registerPromises.all.promise,this.resourceMappings[e])return this.bblocks.all[this.resourceMappings[e]]}}const w=new Y,J=[{path:"/",component:()=>u(()=>import("./Default.js"),["assets/Default.js","assets/vendor.js","assets/VContainer.js","assets/VContainer.css","assets/VList.js","assets/VList.css","assets/VToolbar.js","assets/dialog-transition.js","assets/VToolbar.css","assets/Default.css"]),children:[{path:"",name:"Home",component:()=>u(()=>import("./Home.js"),["assets/Home.js","assets/VTooltip.js","assets/vendor.js","assets/VList.js","assets/VContainer.js","assets/VContainer.css","assets/VList.css","assets/VTooltip.css","assets/VRow.js","assets/Home.css"])},{path:"bblock",name:"BuildingBlockList",component:()=>u(()=>import("./BuildingBlockList.js"),["assets/BuildingBlockList.js","assets/VExpansionPanel.js","assets/vendor.js","assets/VList.js","assets/VContainer.js","assets/VContainer.css","assets/VList.css","assets/dialog-transition.js","assets/VExpansionPanel.css","assets/VRow.js","assets/BuildingBlockList.css"])},{path:"bblock/:id/:section?",name:"BuildingBlock",component:()=>u(()=>import("./BuildingBlock.js"),["assets/BuildingBlock.js","assets/vendor.js","assets/VExpansionPanel.js","assets/VList.js","assets/VContainer.js","assets/VContainer.css","assets/VList.css","assets/dialog-transition.js","assets/VExpansionPanel.css","assets/_commonjsHelpers.js","assets/VRow.js","assets/VToolbar.js","assets/VToolbar.css","assets/VTooltip.js","assets/VTooltip.css","assets/BuildingBlock.css"]),beforeEnter:async r=>{const e=await w.getBBlocks(_.config.showImported);if(!e[r.params.id]||!w.isShown(e[r.params.id]))return"404"}},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>u(()=>import("./NotFound.js"),["assets/NotFound.js","assets/VContainer.js","assets/vendor.js","assets/VContainer.css","assets/VRow.js"])}]}],X=(r,e,t)=>{const i=Object.entries(e.query).filter(s=>!r.query.hasOwnProperty(s[0]));if(!i.length)t();else{const s=Object.assign(Object.fromEntries(i),r.query);t({...r,query:s})}},E=T({history:O(_.config.baseUrl),routes:J});E.beforeEach(X);function Z(r){M(),r.use(N).use(E)}const P=A(V);Z(P);console.log("BBlocks Viewer revision 840e121 (updated 2024-03-21T21:17:53+01:00)");P.mount("#app");export{x as _,ie as a,w as b,_ as c,se as d,oe as i,re as m,$ as s};
