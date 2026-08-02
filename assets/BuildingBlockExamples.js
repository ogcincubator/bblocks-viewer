const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/CopyToClipboardButton.js","assets/VChip.js","assets/VChip.css","assets/CopyToClipboardButton.css","assets/TransformInfo.js","assets/BuildingBlock.js","assets/VMenu.js","assets/dialog-transition.js","assets/VMenu.css","assets/VDialog.js","assets/VDialog.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ft,a as J,c as yt,b as dt,u as _t,e as Rt,d as Tt}from"./index.js";import{H as pt,Y as It,n as X,v as $t,S as ht,E as Lt,a2 as Ot,T as kt,o as V,k as Z,c as q,w as D,aE as Nt,p as H,F as ke,x as mt,u as ie,aa as gt,q as j,t as W,O as At,l as Ne,j as St,bJ as Ct,bI as Pt,ao as Dt,y as le,a9 as zt,_ as Vt,C as ce,aA as Gt}from"./vendor.js";import{k as ue,g as Ft}from"./mime-types.js";import{r as jt,z as Ut,s as qt,w as Mt,a as Ht,c as Xt,d as Bt}from"./VList.js";import{m as Jt,q as Y}from"./VCard.js";import{g as Yt}from"./VSelect.js";import{V as Wt}from"./BuildingBlock.js";import{a as Zt,c as Kt,b as Qt,V as er}from"./VExpansionPanels.js";const Ae=200*1024,tr=10*1024*1024,rr=1024*1024;function nr(t,r=Ae){return typeof t=="number"&&t>r}function Et(t){return typeof t=="string"?new Blob([t]).size:0}function sn(t,r=Ae){return typeof t!="string"||Et(t)<=r?{text:t,truncated:!1}:{text:t.slice(0,r),truncated:!0}}function ir(t,r=Ae){return t?nr(t.sizeBytes,r)?!0:Et(t.code)>r:!1}const bt=Symbol.for("vuetify:v-item-group"),or=Lt({...kt(),...Ut({selectedClass:"v-item--selected"}),...Jt(),...Ot()},"VItemGroup"),sr=pt()({name:"VItemGroup",props:or(),emits:{"update:modelValue":t=>!0},setup(t,r){let{slots:n}=r;const{themeClasses:s}=It(t),{isSelected:o,select:f,next:a,prev:h,selected:i}=jt(t,bt);return()=>X(t.tag,{class:ht(["v-item-group",s.value,t.class]),style:$t(t.style)},{default:()=>[n.default?.({isSelected:o,select:f,next:a,prev:h,selected:i.value})]})}}),ar=pt()({name:"VItem",props:Mt(),emits:{"group:selected":t=>!0},setup(t,r){let{slots:n}=r;const{isSelected:s,select:o,toggle:f,selectedClass:a,value:h,disabled:i}=qt(t,bt);return()=>n.default?.({isSelected:s.value,selectedClass:a.value,select:o,toggle:f,value:h.value,disabled:i.value})}}),lr={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:t=>["buttons","dropdown"].includes(t)}},emits:["update:modelValue"]},cr={key:0,class:"language-tabs"},ur={key:0,class:"mr-2"},fr={class:"d-flex align-center"},dr={key:0,class:"mr-1"};function pr(t,r,n,s,o,f){return n.languages?.length?(V(),Z("div",cr,[n.variant==="buttons"?(V(),q(sr,{key:0,"model-value":n.modelValue,"onUpdate:modelValue":r[0]||(r[0]=a=>t.$emit("update:modelValue",a)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:D(()=>[t.$slots.preText?(V(),Z("div",ur,[Nt(t.$slots,"pre-text")])):H("",!0),(V(!0),Z(ke,null,mt(n.languages,a=>(V(),q(ar,{key:a.id,value:a.id},{default:D(({isSelected:h,toggle:i})=>[X(Ht,{color:h?"primary":"default",onClick:ie(i,["stop"]),class:ht(["mx-1 mb-1",{"ml-4":a.isTransform}])},gt({default:D(()=>[j(" "+W(a.label),1)]),_:2},[a.isTransform||a.icon||a.hasError?{name:"prepend",fn:D(()=>[a.isTransform?(V(),q(Y,{key:0,size:"small",class:"mr-n1"},{default:D(()=>[...r[2]||(r[2]=[j("mdi-arrow-right-thin",-1)])]),_:1})):H("",!0),a.hasError?(V(),q(Y,{key:1,color:"error",size:"small"},{default:D(()=>[...r[3]||(r[3]=[j("mdi-alert-circle",-1)])]),_:1})):a.icon?(V(),q(Y,{key:2,size:"small"},{default:D(()=>[j(W(a.icon),1)]),_:2},1024)):H("",!0)]),key:"0"}:void 0]),1032,["color","onClick","class"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):H("",!0),n.variant==="dropdown"?(V(),q(Yt,{key:1,"model-value":n.modelValue,"onUpdate:modelValue":r[1]||(r[1]=a=>t.$emit("update:modelValue",a)),items:n.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language"},{item:D(({props:a,item:h})=>[X(Xt,At(a,{class:{"pl-6":h.raw.isTransform}}),{title:D(()=>[Ne("span",fr,[h.raw.isTransform?(V(),Z("span",dr,"⤷")):H("",!0),h.raw.hasError?(V(),q(Y,{key:1,color:"error",size:"small",class:"mr-2"},{default:D(()=>[...r[4]||(r[4]=[j("mdi-alert-circle",-1)])]),_:1})):h.raw.icon?(V(),q(Y,{key:2,size:"small",class:"mr-2"},{default:D(()=>[j(W(h.raw.icon),1)]),_:2},1024)):H("",!0),j(" "+W(h.raw.label),1)])]),_:2},1040,["class"])]),selection:D(({item:a})=>[a.raw.hasError?(V(),q(Y,{key:0,color:"error",size:"small",class:"mr-2"},{default:D(()=>[...r[5]||(r[5]=[j("mdi-alert-circle",-1)])]),_:1})):a.raw.icon?(V(),q(Y,{key:1,size:"small",class:"mr-2"},{default:D(()=>[j(W(a.raw.icon),1)]),_:2},1024)):H("",!0),j(" "+W(a.raw.isTransform?a.raw.selectionLabel:a.raw.label),1)]),_:1},8,["model-value","items"])):H("",!0)])):H("",!0)}const Ve=ft(lr,[["render",pr]]);function hr(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[n,s]=t.split("/"),[o,f]=r.split("/");return n===o&&(s==="*"||s===f)}var fe,Ge;function mr(){if(Ge)return fe;Ge=1;class t{constructor(){this.max=1e3,this.map=new Map}get(n){const s=this.map.get(n);if(s!==void 0)return this.map.delete(n),this.map.set(n,s),s}delete(n){return this.map.delete(n)}set(n,s){if(!this.delete(n)&&s!==void 0){if(this.map.size>=this.max){const f=this.map.keys().next().value;this.delete(f)}this.map.set(n,s)}return this}}return fe=t,fe}var de,Fe;function Se(){if(Fe)return de;Fe=1;const t=Object.freeze({loose:!0}),r=Object.freeze({});return de=s=>s?typeof s!="object"?t:s:r,de}var re={exports:{}},pe,je;function Ce(){if(je)return pe;je=1;const t="2.0.0",r=256,n=Number.MAX_SAFE_INTEGER||9007199254740991,s=16,o=r-6;return pe={MAX_LENGTH:r,MAX_SAFE_COMPONENT_LENGTH:s,MAX_SAFE_BUILD_LENGTH:o,MAX_SAFE_INTEGER:n,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:t,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2},pe}var he,Ue;function se(){if(Ue)return he;Ue=1;var t={};return he=typeof process=="object"&&t&&t.NODE_DEBUG&&/\bsemver\b/i.test(t.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{},he}var qe;function Pe(){return qe||(qe=1,(function(t,r){const{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:s,MAX_LENGTH:o}=Ce(),f=se();r=t.exports={};const a=r.re=[],h=r.safeRe=[],i=r.src=[],x=r.safeSrc=[],e=r.t={};let l=0;const g="[a-zA-Z0-9-]",T=[["\\s",1],["\\d",o],[g,s]],N=G=>{for(const[C,F]of T)G=G.split(`${C}*`).join(`${C}{0,${F}}`).split(`${C}+`).join(`${C}{1,${F}}`);return G},v=(G,C,F)=>{const B=N(C),M=l++;f(G,M,C),e[G]=M,i[M]=C,x[M]=B,a[M]=new RegExp(C,F?"g":void 0),h[M]=new RegExp(B,F?"g":void 0)};v("NUMERICIDENTIFIER","0|[1-9]\\d*"),v("NUMERICIDENTIFIERLOOSE","\\d+"),v("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${g}*`),v("MAINVERSION",`(${i[e.NUMERICIDENTIFIER]})\\.(${i[e.NUMERICIDENTIFIER]})\\.(${i[e.NUMERICIDENTIFIER]})`),v("MAINVERSIONLOOSE",`(${i[e.NUMERICIDENTIFIERLOOSE]})\\.(${i[e.NUMERICIDENTIFIERLOOSE]})\\.(${i[e.NUMERICIDENTIFIERLOOSE]})`),v("PRERELEASEIDENTIFIER",`(?:${i[e.NONNUMERICIDENTIFIER]}|${i[e.NUMERICIDENTIFIER]})`),v("PRERELEASEIDENTIFIERLOOSE",`(?:${i[e.NONNUMERICIDENTIFIER]}|${i[e.NUMERICIDENTIFIERLOOSE]})`),v("PRERELEASE",`(?:-(${i[e.PRERELEASEIDENTIFIER]}(?:\\.${i[e.PRERELEASEIDENTIFIER]})*))`),v("PRERELEASELOOSE",`(?:-?(${i[e.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[e.PRERELEASEIDENTIFIERLOOSE]})*))`),v("BUILDIDENTIFIER",`${g}+`),v("BUILD",`(?:\\+(${i[e.BUILDIDENTIFIER]}(?:\\.${i[e.BUILDIDENTIFIER]})*))`),v("FULLPLAIN",`v?${i[e.MAINVERSION]}${i[e.PRERELEASE]}?${i[e.BUILD]}?`),v("FULL",`^${i[e.FULLPLAIN]}$`),v("LOOSEPLAIN",`[v=\\s]*${i[e.MAINVERSIONLOOSE]}${i[e.PRERELEASELOOSE]}?${i[e.BUILD]}?`),v("LOOSE",`^${i[e.LOOSEPLAIN]}$`),v("GTLT","((?:<|>)?=?)"),v("XRANGEIDENTIFIERLOOSE",`${i[e.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),v("XRANGEIDENTIFIER",`${i[e.NUMERICIDENTIFIER]}|x|X|\\*`),v("XRANGEPLAIN",`[v=\\s]*(${i[e.XRANGEIDENTIFIER]})(?:\\.(${i[e.XRANGEIDENTIFIER]})(?:\\.(${i[e.XRANGEIDENTIFIER]})(?:${i[e.PRERELEASE]})?${i[e.BUILD]}?)?)?`),v("XRANGEPLAINLOOSE",`[v=\\s]*(${i[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[e.XRANGEIDENTIFIERLOOSE]})(?:${i[e.PRERELEASELOOSE]})?${i[e.BUILD]}?)?)?`),v("XRANGE",`^${i[e.GTLT]}\\s*${i[e.XRANGEPLAIN]}$`),v("XRANGELOOSE",`^${i[e.GTLT]}\\s*${i[e.XRANGEPLAINLOOSE]}$`),v("COERCEPLAIN",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),v("COERCE",`${i[e.COERCEPLAIN]}(?:$|[^\\d])`),v("COERCEFULL",i[e.COERCEPLAIN]+`(?:${i[e.PRERELEASE]})?(?:${i[e.BUILD]})?(?:$|[^\\d])`),v("COERCERTL",i[e.COERCE],!0),v("COERCERTLFULL",i[e.COERCEFULL],!0),v("LONETILDE","(?:~>?)"),v("TILDETRIM",`(\\s*)${i[e.LONETILDE]}\\s+`,!0),r.tildeTrimReplace="$1~",v("TILDE",`^${i[e.LONETILDE]}${i[e.XRANGEPLAIN]}$`),v("TILDELOOSE",`^${i[e.LONETILDE]}${i[e.XRANGEPLAINLOOSE]}$`),v("LONECARET","(?:\\^)"),v("CARETTRIM",`(\\s*)${i[e.LONECARET]}\\s+`,!0),r.caretTrimReplace="$1^",v("CARET",`^${i[e.LONECARET]}${i[e.XRANGEPLAIN]}$`),v("CARETLOOSE",`^${i[e.LONECARET]}${i[e.XRANGEPLAINLOOSE]}$`),v("COMPARATORLOOSE",`^${i[e.GTLT]}\\s*(${i[e.LOOSEPLAIN]})$|^$`),v("COMPARATOR",`^${i[e.GTLT]}\\s*(${i[e.FULLPLAIN]})$|^$`),v("COMPARATORTRIM",`(\\s*)${i[e.GTLT]}\\s*(${i[e.LOOSEPLAIN]}|${i[e.XRANGEPLAIN]})`,!0),r.comparatorTrimReplace="$1$2$3",v("HYPHENRANGE",`^\\s*(${i[e.XRANGEPLAIN]})\\s+-\\s+(${i[e.XRANGEPLAIN]})\\s*$`),v("HYPHENRANGELOOSE",`^\\s*(${i[e.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[e.XRANGEPLAINLOOSE]})\\s*$`),v("STAR","(<|>)?=?\\s*\\*"),v("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),v("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")})(re,re.exports)),re.exports}var me,Me;function gr(){if(Me)return me;Me=1;const t=/^[0-9]+$/,r=(s,o)=>{if(typeof s=="number"&&typeof o=="number")return s===o?0:s<o?-1:1;const f=t.test(s),a=t.test(o);return f&&a&&(s=+s,o=+o),s===o?0:f&&!a?-1:a&&!f?1:s<o?-1:1};return me={compareIdentifiers:r,rcompareIdentifiers:(s,o)=>r(o,s)},me}var ge,He;function De(){if(He)return ge;He=1;const t=se(),{MAX_LENGTH:r,MAX_SAFE_INTEGER:n}=Ce(),{safeRe:s,t:o}=Pe(),f=Se(),{compareIdentifiers:a}=gr(),h=(x,e)=>{const l=e.split(".");if(l.length>x.length)return!1;for(let g=0;g<l.length;g++)if(a(x[g],l[g])!==0)return!1;return!0};class i{constructor(e,l){if(l=f(l),e instanceof i){if(e.loose===!!l.loose&&e.includePrerelease===!!l.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>r)throw new TypeError(`version is longer than ${r} characters`);t("SemVer",e,l),this.options=l,this.loose=!!l.loose,this.includePrerelease=!!l.includePrerelease;const g=e.trim().match(l.loose?s[o.LOOSE]:s[o.FULL]);if(!g)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+g[1],this.minor=+g[2],this.patch=+g[3],this.major>n||this.major<0)throw new TypeError("Invalid major version");if(this.minor>n||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>n||this.patch<0)throw new TypeError("Invalid patch version");g[4]?this.prerelease=g[4].split(".").map(T=>{if(/^[0-9]+$/.test(T)){const N=+T;if(N>=0&&N<n)return N}return T}):this.prerelease=[],this.build=g[5]?g[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(t("SemVer.compare",this.version,this.options,e),!(e instanceof i)){if(typeof e=="string"&&e===this.version)return 0;e=new i(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof i||(e=new i(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof i||(e=new i(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let l=0;do{const g=this.prerelease[l],T=e.prerelease[l];if(t("prerelease compare",l,g,T),g===void 0&&T===void 0)return 0;if(T===void 0)return 1;if(g===void 0)return-1;if(g===T)continue;return a(g,T)}while(++l)}compareBuild(e){e instanceof i||(e=new i(e,this.options));let l=0;do{const g=this.build[l],T=e.build[l];if(t("build compare",l,g,T),g===void 0&&T===void 0)return 0;if(T===void 0)return 1;if(g===void 0)return-1;if(g===T)continue;return a(g,T)}while(++l)}inc(e,l,g){if(e.startsWith("pre")){if(!l&&g===!1)throw new Error("invalid increment argument: identifier is empty");if(l){const T=`-${l}`.match(this.options.loose?s[o.PRERELEASELOOSE]:s[o.PRERELEASE]);if(!T||T[1]!==l)throw new Error(`invalid identifier: ${l}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",l,g);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",l,g);break;case"prepatch":this.prerelease.length=0,this.inc("patch",l,g),this.inc("pre",l,g);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",l,g),this.inc("pre",l,g);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const T=Number(g)?1:0;if(this.prerelease.length===0)this.prerelease=[T];else{let N=this.prerelease.length;for(;--N>=0;)typeof this.prerelease[N]=="number"&&(this.prerelease[N]++,N=-2);if(N===-1){if(l===this.prerelease.join(".")&&g===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(T)}}if(l){let N=[l,T];if(g===!1&&(N=[l]),h(this.prerelease,l)){const v=this.prerelease[l.split(".").length];isNaN(v)&&(this.prerelease=N)}else this.prerelease=N}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}return ge=i,ge}var Ee,Xe;function K(){if(Xe)return Ee;Xe=1;const t=De();return Ee=(n,s,o)=>new t(n,o).compare(new t(s,o)),Ee}var be,Be;function Er(){if(Be)return be;Be=1;const t=K();return be=(n,s,o)=>t(n,s,o)===0,be}var ve,Je;function br(){if(Je)return ve;Je=1;const t=K();return ve=(n,s,o)=>t(n,s,o)!==0,ve}var we,Ye;function vr(){if(Ye)return we;Ye=1;const t=K();return we=(n,s,o)=>t(n,s,o)>0,we}var xe,We;function wr(){if(We)return xe;We=1;const t=K();return xe=(n,s,o)=>t(n,s,o)>=0,xe}var ye,Ze;function xr(){if(Ze)return ye;Ze=1;const t=K();return ye=(n,s,o)=>t(n,s,o)<0,ye}var _e,Ke;function yr(){if(Ke)return _e;Ke=1;const t=K();return _e=(n,s,o)=>t(n,s,o)<=0,_e}var Re,Qe;function _r(){if(Qe)return Re;Qe=1;const t=Er(),r=br(),n=vr(),s=wr(),o=xr(),f=yr();return Re=(h,i,x,e)=>{switch(i){case"===":return typeof h=="object"&&(h=h.version),typeof x=="object"&&(x=x.version),h===x;case"!==":return typeof h=="object"&&(h=h.version),typeof x=="object"&&(x=x.version),h!==x;case"":case"=":case"==":return t(h,x,e);case"!=":return r(h,x,e);case">":return n(h,x,e);case">=":return s(h,x,e);case"<":return o(h,x,e);case"<=":return f(h,x,e);default:throw new TypeError(`Invalid operator: ${i}`)}},Re}var Te,et;function Rr(){if(et)return Te;et=1;const t=Symbol("SemVer ANY");class r{static get ANY(){return t}constructor(e,l){if(l=n(l),e instanceof r){if(e.loose===!!l.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),a("comparator",e,l),this.options=l,this.loose=!!l.loose,this.parse(e),this.semver===t?this.value="":this.value=this.operator+this.semver.version,a("comp",this)}parse(e){const l=this.options.loose?s[o.COMPARATORLOOSE]:s[o.COMPARATOR],g=e.match(l);if(!g)throw new TypeError(`Invalid comparator: ${e}`);this.operator=g[1]!==void 0?g[1]:"",this.operator==="="&&(this.operator=""),g[2]?this.semver=new h(g[2],this.options.loose):this.semver=t}toString(){return this.value}test(e){if(a("Comparator.test",e,this.options.loose),this.semver===t||e===t)return!0;if(typeof e=="string")try{e=new h(e,this.options)}catch{return!1}return f(e,this.operator,this.semver,this.options)}intersects(e,l){if(!(e instanceof r))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new i(e.value,l).test(this.value):e.operator===""?e.value===""?!0:new i(this.value,l).test(e.semver):(l=n(l),l.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!l.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||f(this.semver,"<",e.semver,l)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||f(this.semver,">",e.semver,l)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}}Te=r;const n=Se(),{safeRe:s,t:o}=Pe(),f=_r(),a=se(),h=De(),i=vt();return Te}var Ie,tt;function vt(){if(tt)return Ie;tt=1;const t=/\s+/g;class r{constructor(u,p){if(p=o(p),u instanceof r)return u.loose===!!p.loose&&u.includePrerelease===!!p.includePrerelease?u:new r(u.raw,p);if(u instanceof f)return this.raw=u.value,this.set=[[u]],this.formatted=void 0,this;if(this.options=p,this.loose=!!p.loose,this.includePrerelease=!!p.includePrerelease,this.raw=u.trim().replace(t," "),this.set=this.raw.split("||").map(E=>this.parseRange(E.trim())).filter(E=>E.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const E=this.set[0];if(this.set=this.set.filter(m=>!C(m[0])),this.set.length===0)this.set=[E];else if(this.set.length>1){for(const m of this.set)if(m.length===1&&F(m[0])){this.set=[m];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let u=0;u<this.set.length;u++){u>0&&(this.formatted+="||");const p=this.set[u];for(let E=0;E<p.length;E++)E>0&&(this.formatted+=" "),this.formatted+=p[E].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(u){u=u.replace(G,"");const E=((this.options.includePrerelease&&N)|(this.options.loose&&v))+":"+u,m=s.get(E);if(m)return m;const d=this.options.loose,b=d?i[e.HYPHENRANGELOOSE]:i[e.HYPHENRANGE];u=u.replace(b,S(this.options.includePrerelease)),a("hyphen replace",u),u=u.replace(i[e.COMPARATORTRIM],l),a("comparator trim",u),u=u.replace(i[e.TILDETRIM],g),a("tilde trim",u),u=u.replace(i[e.CARETTRIM],T),a("caret trim",u);let y=u.split(" ").map(z=>M(z,this.options)).join(" ").split(/\s+/).map(z=>O(z,this.options));d&&(y=y.filter(z=>(a("loose invalid filter",z,this.options),!!z.match(i[e.COMPARATORLOOSE])))),a("range list",y);const _=new Map,L=y.map(z=>new f(z,this.options));for(const z of L){if(C(z))return[z];_.set(z.value,z)}_.size>1&&_.has("")&&_.delete("");const U=[..._.values()];return s.set(E,U),U}intersects(u,p){if(!(u instanceof r))throw new TypeError("a Range is required");return this.set.some(E=>B(E,p)&&u.set.some(m=>B(m,p)&&E.every(d=>m.every(b=>d.intersects(b,p)))))}test(u){if(!u)return!1;if(typeof u=="string")try{u=new h(u,this.options)}catch{return!1}for(let p=0;p<this.set.length;p++)if(k(this.set[p],u,this.options))return!0;return!1}}Ie=r;const n=mr(),s=new n,o=Se(),f=Rr(),a=se(),h=De(),{safeRe:i,src:x,t:e,comparatorTrimReplace:l,tildeTrimReplace:g,caretTrimReplace:T}=Pe(),{FLAG_INCLUDE_PRERELEASE:N,FLAG_LOOSE:v}=Ce(),G=new RegExp(x[e.BUILD],"g"),C=c=>c.value==="<0.0.0-0",F=c=>c.value==="",B=(c,u)=>{let p=!0;const E=c.slice();let m=E.pop();for(;p&&E.length;)p=E.every(d=>m.intersects(d,u)),m=E.pop();return p},M=(c,u)=>(c=c.replace(i[e.BUILD],""),a("comp",c,u),c=R(c,u),a("caret",c),c=ae(c,u),a("tildes",c),c=I(c,u),a("xrange",c),c=A(c,u),a("stars",c),c),P=c=>!c||c.toLowerCase()==="x"||c==="*",ee=(c,u,p)=>P(c)&&!P(u)||P(u)&&p&&!P(p),ae=(c,u)=>c.trim().split(/\s+/).map(p=>te(p,u)).join(" "),te=(c,u)=>{const p=u.loose?i[e.TILDELOOSE]:i[e.TILDE],E=u.includePrerelease?"-0":"";return c.replace(p,(m,d,b,y,_)=>{a("tilde",c,m,d,b,y,_);let L;return P(d)?L="":P(b)?L=`>=${d}.0.0${E} <${+d+1}.0.0-0`:P(y)?L=`>=${d}.${b}.0${E} <${d}.${+b+1}.0-0`:_?(a("replaceTilde pr",_),L=`>=${d}.${b}.${y}-${_} <${d}.${+b+1}.0-0`):L=`>=${d}.${b}.${y} <${d}.${+b+1}.0-0`,a("tilde return",L),L})},R=(c,u)=>c.trim().split(/\s+/).map(p=>w(p,u)).join(" "),w=(c,u)=>{a("caret",c,u);const p=u.loose?i[e.CARETLOOSE]:i[e.CARET],E=u.includePrerelease?"-0":"";return c.replace(p,(m,d,b,y,_)=>{a("caret",c,m,d,b,y,_);let L;return P(d)?L="":P(b)?L=`>=${d}.0.0${E} <${+d+1}.0.0-0`:P(y)?d==="0"?L=`>=${d}.${b}.0${E} <${d}.${+b+1}.0-0`:L=`>=${d}.${b}.0${E} <${+d+1}.0.0-0`:_?(a("replaceCaret pr",_),d==="0"?b==="0"?L=`>=${d}.${b}.${y}-${_} <${d}.${b}.${+y+1}-0`:L=`>=${d}.${b}.${y}-${_} <${d}.${+b+1}.0-0`:L=`>=${d}.${b}.${y}-${_} <${+d+1}.0.0-0`):(a("no pr"),d==="0"?b==="0"?L=`>=${d}.${b}.${y} <${d}.${b}.${+y+1}-0`:L=`>=${d}.${b}.${y} <${d}.${+b+1}.0-0`:L=`>=${d}.${b}.${y} <${+d+1}.0.0-0`),a("caret return",L),L})},I=(c,u)=>(a("replaceXRanges",c,u),c.split(/\s+/).map(p=>$(p,u)).join(" ")),$=(c,u)=>{c=c.trim();const p=u.loose?i[e.XRANGELOOSE]:i[e.XRANGE];return c.replace(p,(E,m,d,b,y,_)=>{if(a("xRange",c,E,m,d,b,y,_),ee(d,b,y))return c;const L=P(d),U=L||P(b),z=U||P(y),Q=z;return m==="="&&Q&&(m=""),_=u.includePrerelease?"-0":"",L?m===">"||m==="<"?E="<0.0.0-0":E="*":m&&Q?(U&&(b=0),y=0,m===">"?(m=">=",U?(d=+d+1,b=0,y=0):(b=+b+1,y=0)):m==="<="&&(m="<",U?d=+d+1:b=+b+1),m==="<"&&(_="-0"),E=`${m+d}.${b}.${y}${_}`):U?E=`>=${d}.0.0${_} <${+d+1}.0.0-0`:z&&(E=`>=${d}.${b}.0${_} <${d}.${+b+1}.0-0`),a("xRange return",E),E})},A=(c,u)=>(a("replaceStars",c,u),c.trim().replace(i[e.STAR],"")),O=(c,u)=>(a("replaceGTE0",c,u),c.trim().replace(i[u.includePrerelease?e.GTE0PRE:e.GTE0],"")),S=c=>(u,p,E,m,d,b,y,_,L,U,z,Q)=>(P(E)?p="":P(m)?p=`>=${E}.0.0${c?"-0":""}`:P(d)?p=`>=${E}.${m}.0${c?"-0":""}`:b?p=`>=${p}`:p=`>=${p}${c?"-0":""}`,P(L)?_="":P(U)?_=`<${+L+1}.0.0-0`:P(z)?_=`<${L}.${+U+1}.0-0`:Q?_=`<=${L}.${U}.${z}-${Q}`:c?_=`<${L}.${U}.${+z+1}-0`:_=`<=${_}`,`${p} ${_}`.trim()),k=(c,u,p)=>{for(let E=0;E<c.length;E++)if(!c[E].test(u))return!1;if(u.prerelease.length&&!p.includePrerelease){for(let E=0;E<c.length;E++)if(a(c[E].semver),c[E].semver!==f.ANY&&c[E].semver.prerelease.length>0){const m=c[E].semver;if(m.major===u.major&&m.minor===u.minor&&m.patch===u.patch)return!0}return!1}return!0};return Ie}var $e,rt;function Tr(){if(rt)return $e;rt=1;const t=vt();return $e=(n,s,o)=>{try{s=new t(s,o)}catch{return!1}return s.test(n)},$e}var Ir=Tr();const $r=St(Ir);class Lr{constructor(){this._cache=new Map}resolve({name:r,range:n,version:s,load:o}){const f=this._cache.get(r)??[],a=f.find(i=>$r(i.version,n));if(a)return a.promise;const h={version:s,promise:null};return h.promise=Promise.resolve().then(o).catch(i=>{const x=this._cache.get(r),e=x?.indexOf(h)??-1;throw e!==-1&&x.splice(e,1),i}),f.push(h),this._cache.set(r,f),h.promise}}function ze(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[n,s]=t.split("/"),[o,f]=r.split("/");return n===o&&(s==="*"||s===f)}function wt(t,r){t.innerHTML="";const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 16px; text-align: center; color: #b00020; font: 14px/1.4 sans-serif;";const s=document.createElement("div");s.textContent=r;const o=document.createElement("div");o.style.cssText="margin-top: 12px;",o.textContent="See the browser console for details.",n.append(s,o),t.appendChild(n)}const Or=`/* required styles */\r
\r
.leaflet-pane,\r
.leaflet-tile,\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow,\r
.leaflet-tile-container,\r
.leaflet-pane > svg,\r
.leaflet-pane > canvas,\r
.leaflet-zoom-box,\r
.leaflet-image-layer,\r
.leaflet-layer {\r
	position: absolute;\r
	left: 0;\r
	top: 0;\r
	}\r
.leaflet-container {\r
	overflow: hidden;\r
	}\r
.leaflet-tile,\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow {\r
	-webkit-user-select: none;\r
	   -moz-user-select: none;\r
	        user-select: none;\r
	  -webkit-user-drag: none;\r
	}\r
/* Prevents IE11 from highlighting tiles in blue */\r
.leaflet-tile::selection {\r
	background: transparent;\r
}\r
/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\r
.leaflet-safari .leaflet-tile {\r
	image-rendering: -webkit-optimize-contrast;\r
	}\r
/* hack that prevents hw layers "stretching" when loading new tiles */\r
.leaflet-safari .leaflet-tile-container {\r
	width: 1600px;\r
	height: 1600px;\r
	-webkit-transform-origin: 0 0;\r
	}\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow {\r
	display: block;\r
	}\r
/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\r
/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\r
.leaflet-container .leaflet-overlay-pane svg {\r
	max-width: none !important;\r
	max-height: none !important;\r
	}\r
.leaflet-container .leaflet-marker-pane img,\r
.leaflet-container .leaflet-shadow-pane img,\r
.leaflet-container .leaflet-tile-pane img,\r
.leaflet-container img.leaflet-image-layer,\r
.leaflet-container .leaflet-tile {\r
	max-width: none !important;\r
	max-height: none !important;\r
	width: auto;\r
	padding: 0;\r
	}\r
\r
.leaflet-container img.leaflet-tile {\r
	/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\r
	mix-blend-mode: plus-lighter;\r
}\r
\r
.leaflet-container.leaflet-touch-zoom {\r
	-ms-touch-action: pan-x pan-y;\r
	touch-action: pan-x pan-y;\r
	}\r
.leaflet-container.leaflet-touch-drag {\r
	-ms-touch-action: pinch-zoom;\r
	/* Fallback for FF which doesn't support pinch-zoom */\r
	touch-action: none;\r
	touch-action: pinch-zoom;\r
}\r
.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\r
	-ms-touch-action: none;\r
	touch-action: none;\r
}\r
.leaflet-container {\r
	-webkit-tap-highlight-color: transparent;\r
}\r
.leaflet-container a {\r
	-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\r
}\r
.leaflet-tile {\r
	filter: inherit;\r
	visibility: hidden;\r
	}\r
.leaflet-tile-loaded {\r
	visibility: inherit;\r
	}\r
.leaflet-zoom-box {\r
	width: 0;\r
	height: 0;\r
	-moz-box-sizing: border-box;\r
	     box-sizing: border-box;\r
	z-index: 800;\r
	}\r
/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\r
.leaflet-overlay-pane svg {\r
	-moz-user-select: none;\r
	}\r
\r
.leaflet-pane         { z-index: 400; }\r
\r
.leaflet-tile-pane    { z-index: 200; }\r
.leaflet-overlay-pane { z-index: 400; }\r
.leaflet-shadow-pane  { z-index: 500; }\r
.leaflet-marker-pane  { z-index: 600; }\r
.leaflet-tooltip-pane   { z-index: 650; }\r
.leaflet-popup-pane   { z-index: 700; }\r
\r
.leaflet-map-pane canvas { z-index: 100; }\r
.leaflet-map-pane svg    { z-index: 200; }\r
\r
.leaflet-vml-shape {\r
	width: 1px;\r
	height: 1px;\r
	}\r
.lvml {\r
	behavior: url(#default#VML);\r
	display: inline-block;\r
	position: absolute;\r
	}\r
\r
\r
/* control positioning */\r
\r
.leaflet-control {\r
	position: relative;\r
	z-index: 800;\r
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r
	pointer-events: auto;\r
	}\r
.leaflet-top,\r
.leaflet-bottom {\r
	position: absolute;\r
	z-index: 1000;\r
	pointer-events: none;\r
	}\r
.leaflet-top {\r
	top: 0;\r
	}\r
.leaflet-right {\r
	right: 0;\r
	}\r
.leaflet-bottom {\r
	bottom: 0;\r
	}\r
.leaflet-left {\r
	left: 0;\r
	}\r
.leaflet-control {\r
	float: left;\r
	clear: both;\r
	}\r
.leaflet-right .leaflet-control {\r
	float: right;\r
	}\r
.leaflet-top .leaflet-control {\r
	margin-top: 10px;\r
	}\r
.leaflet-bottom .leaflet-control {\r
	margin-bottom: 10px;\r
	}\r
.leaflet-left .leaflet-control {\r
	margin-left: 10px;\r
	}\r
.leaflet-right .leaflet-control {\r
	margin-right: 10px;\r
	}\r
\r
\r
/* zoom and fade animations */\r
\r
.leaflet-fade-anim .leaflet-popup {\r
	opacity: 0;\r
	-webkit-transition: opacity 0.2s linear;\r
	   -moz-transition: opacity 0.2s linear;\r
	        transition: opacity 0.2s linear;\r
	}\r
.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\r
	opacity: 1;\r
	}\r
.leaflet-zoom-animated {\r
	-webkit-transform-origin: 0 0;\r
	    -ms-transform-origin: 0 0;\r
	        transform-origin: 0 0;\r
	}\r
svg.leaflet-zoom-animated {\r
	will-change: transform;\r
}\r
\r
.leaflet-zoom-anim .leaflet-zoom-animated {\r
	-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\r
	   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\r
	        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\r
	}\r
.leaflet-zoom-anim .leaflet-tile,\r
.leaflet-pan-anim .leaflet-tile {\r
	-webkit-transition: none;\r
	   -moz-transition: none;\r
	        transition: none;\r
	}\r
\r
.leaflet-zoom-anim .leaflet-zoom-hide {\r
	visibility: hidden;\r
	}\r
\r
\r
/* cursors */\r
\r
.leaflet-interactive {\r
	cursor: pointer;\r
	}\r
.leaflet-grab {\r
	cursor: -webkit-grab;\r
	cursor:    -moz-grab;\r
	cursor:         grab;\r
	}\r
.leaflet-crosshair,\r
.leaflet-crosshair .leaflet-interactive {\r
	cursor: crosshair;\r
	}\r
.leaflet-popup-pane,\r
.leaflet-control {\r
	cursor: auto;\r
	}\r
.leaflet-dragging .leaflet-grab,\r
.leaflet-dragging .leaflet-grab .leaflet-interactive,\r
.leaflet-dragging .leaflet-marker-draggable {\r
	cursor: move;\r
	cursor: -webkit-grabbing;\r
	cursor:    -moz-grabbing;\r
	cursor:         grabbing;\r
	}\r
\r
/* marker & overlays interactivity */\r
.leaflet-marker-icon,\r
.leaflet-marker-shadow,\r
.leaflet-image-layer,\r
.leaflet-pane > svg path,\r
.leaflet-tile-container {\r
	pointer-events: none;\r
	}\r
\r
.leaflet-marker-icon.leaflet-interactive,\r
.leaflet-image-layer.leaflet-interactive,\r
.leaflet-pane > svg path.leaflet-interactive,\r
svg.leaflet-image-layer.leaflet-interactive path {\r
	pointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\r
	pointer-events: auto;\r
	}\r
\r
/* visual tweaks */\r
\r
.leaflet-container {\r
	background: #ddd;\r
	outline-offset: 1px;\r
	}\r
.leaflet-container a {\r
	color: #0078A8;\r
	}\r
.leaflet-zoom-box {\r
	border: 2px dotted #38f;\r
	background: rgba(255,255,255,0.5);\r
	}\r
\r
\r
/* general typography */\r
.leaflet-container {\r
	font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;\r
	font-size: 12px;\r
	font-size: 0.75rem;\r
	line-height: 1.5;\r
	}\r
\r
\r
/* general toolbar styles */\r
\r
.leaflet-bar {\r
	box-shadow: 0 1px 5px rgba(0,0,0,0.65);\r
	border-radius: 4px;\r
	}\r
.leaflet-bar a {\r
	background-color: #fff;\r
	border-bottom: 1px solid #ccc;\r
	width: 26px;\r
	height: 26px;\r
	line-height: 26px;\r
	display: block;\r
	text-align: center;\r
	text-decoration: none;\r
	color: black;\r
	}\r
.leaflet-bar a,\r
.leaflet-control-layers-toggle {\r
	background-position: 50% 50%;\r
	background-repeat: no-repeat;\r
	display: block;\r
	}\r
.leaflet-bar a:hover,\r
.leaflet-bar a:focus {\r
	background-color: #f4f4f4;\r
	}\r
.leaflet-bar a:first-child {\r
	border-top-left-radius: 4px;\r
	border-top-right-radius: 4px;\r
	}\r
.leaflet-bar a:last-child {\r
	border-bottom-left-radius: 4px;\r
	border-bottom-right-radius: 4px;\r
	border-bottom: none;\r
	}\r
.leaflet-bar a.leaflet-disabled {\r
	cursor: default;\r
	background-color: #f4f4f4;\r
	color: #bbb;\r
	}\r
\r
.leaflet-touch .leaflet-bar a {\r
	width: 30px;\r
	height: 30px;\r
	line-height: 30px;\r
	}\r
.leaflet-touch .leaflet-bar a:first-child {\r
	border-top-left-radius: 2px;\r
	border-top-right-radius: 2px;\r
	}\r
.leaflet-touch .leaflet-bar a:last-child {\r
	border-bottom-left-radius: 2px;\r
	border-bottom-right-radius: 2px;\r
	}\r
\r
/* zoom control */\r
\r
.leaflet-control-zoom-in,\r
.leaflet-control-zoom-out {\r
	font: bold 18px 'Lucida Console', Monaco, monospace;\r
	text-indent: 1px;\r
	}\r
\r
.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\r
	font-size: 22px;\r
	}\r
\r
\r
/* layers control */\r
\r
.leaflet-control-layers {\r
	box-shadow: 0 1px 5px rgba(0,0,0,0.4);\r
	background: #fff;\r
	border-radius: 5px;\r
	}\r
.leaflet-control-layers-toggle {\r
	background-image: url(images/layers.png);\r
	width: 36px;\r
	height: 36px;\r
	}\r
.leaflet-retina .leaflet-control-layers-toggle {\r
	background-image: url(images/layers-2x.png);\r
	background-size: 26px 26px;\r
	}\r
.leaflet-touch .leaflet-control-layers-toggle {\r
	width: 44px;\r
	height: 44px;\r
	}\r
.leaflet-control-layers .leaflet-control-layers-list,\r
.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\r
	display: none;\r
	}\r
.leaflet-control-layers-expanded .leaflet-control-layers-list {\r
	display: block;\r
	position: relative;\r
	}\r
.leaflet-control-layers-expanded {\r
	padding: 6px 10px 6px 6px;\r
	color: #333;\r
	background: #fff;\r
	}\r
.leaflet-control-layers-scrollbar {\r
	overflow-y: scroll;\r
	overflow-x: hidden;\r
	padding-right: 5px;\r
	}\r
.leaflet-control-layers-selector {\r
	margin-top: 2px;\r
	position: relative;\r
	top: 1px;\r
	}\r
.leaflet-control-layers label {\r
	display: block;\r
	font-size: 13px;\r
	font-size: 1.08333em;\r
	}\r
.leaflet-control-layers-separator {\r
	height: 0;\r
	border-top: 1px solid #ddd;\r
	margin: 5px -10px 5px -6px;\r
	}\r
\r
/* Default icon URLs */\r
.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\r
	background-image: url(images/marker-icon.png);\r
	}\r
\r
\r
/* attribution and scale controls */\r
\r
.leaflet-container .leaflet-control-attribution {\r
	background: #fff;\r
	background: rgba(255, 255, 255, 0.8);\r
	margin: 0;\r
	}\r
.leaflet-control-attribution,\r
.leaflet-control-scale-line {\r
	padding: 0 5px;\r
	color: #333;\r
	line-height: 1.4;\r
	}\r
.leaflet-control-attribution a {\r
	text-decoration: none;\r
	}\r
.leaflet-control-attribution a:hover,\r
.leaflet-control-attribution a:focus {\r
	text-decoration: underline;\r
	}\r
.leaflet-attribution-flag {\r
	display: inline !important;\r
	vertical-align: baseline !important;\r
	width: 1em;\r
	height: 0.6669em;\r
	}\r
.leaflet-left .leaflet-control-scale {\r
	margin-left: 5px;\r
	}\r
.leaflet-bottom .leaflet-control-scale {\r
	margin-bottom: 5px;\r
	}\r
.leaflet-control-scale-line {\r
	border: 2px solid #777;\r
	border-top: none;\r
	line-height: 1.1;\r
	padding: 2px 5px 1px;\r
	white-space: nowrap;\r
	-moz-box-sizing: border-box;\r
	     box-sizing: border-box;\r
	background: rgba(255, 255, 255, 0.8);\r
	text-shadow: 1px 1px #fff;\r
	}\r
.leaflet-control-scale-line:not(:first-child) {\r
	border-top: 2px solid #777;\r
	border-bottom: none;\r
	margin-top: -2px;\r
	}\r
.leaflet-control-scale-line:not(:first-child):not(:last-child) {\r
	border-bottom: 2px solid #777;\r
	}\r
\r
.leaflet-touch .leaflet-control-attribution,\r
.leaflet-touch .leaflet-control-layers,\r
.leaflet-touch .leaflet-bar {\r
	box-shadow: none;\r
	}\r
.leaflet-touch .leaflet-control-layers,\r
.leaflet-touch .leaflet-bar {\r
	border: 2px solid rgba(0,0,0,0.2);\r
	background-clip: padding-box;\r
	}\r
\r
\r
/* popup */\r
\r
.leaflet-popup {\r
	position: absolute;\r
	text-align: center;\r
	margin-bottom: 20px;\r
	}\r
.leaflet-popup-content-wrapper {\r
	padding: 1px;\r
	text-align: left;\r
	border-radius: 12px;\r
	}\r
.leaflet-popup-content {\r
	margin: 13px 24px 13px 20px;\r
	line-height: 1.3;\r
	font-size: 13px;\r
	font-size: 1.08333em;\r
	min-height: 1px;\r
	}\r
.leaflet-popup-content p {\r
	margin: 17px 0;\r
	margin: 1.3em 0;\r
	}\r
.leaflet-popup-tip-container {\r
	width: 40px;\r
	height: 20px;\r
	position: absolute;\r
	left: 50%;\r
	margin-top: -1px;\r
	margin-left: -20px;\r
	overflow: hidden;\r
	pointer-events: none;\r
	}\r
.leaflet-popup-tip {\r
	width: 17px;\r
	height: 17px;\r
	padding: 1px;\r
\r
	margin: -10px auto 0;\r
	pointer-events: auto;\r
\r
	-webkit-transform: rotate(45deg);\r
	   -moz-transform: rotate(45deg);\r
	    -ms-transform: rotate(45deg);\r
	        transform: rotate(45deg);\r
	}\r
.leaflet-popup-content-wrapper,\r
.leaflet-popup-tip {\r
	background: white;\r
	color: #333;\r
	box-shadow: 0 3px 14px rgba(0,0,0,0.4);\r
	}\r
.leaflet-container a.leaflet-popup-close-button {\r
	position: absolute;\r
	top: 0;\r
	right: 0;\r
	border: none;\r
	text-align: center;\r
	width: 24px;\r
	height: 24px;\r
	font: 16px/24px Tahoma, Verdana, sans-serif;\r
	color: #757575;\r
	text-decoration: none;\r
	background: transparent;\r
	}\r
.leaflet-container a.leaflet-popup-close-button:hover,\r
.leaflet-container a.leaflet-popup-close-button:focus {\r
	color: #585858;\r
	}\r
.leaflet-popup-scrolled {\r
	overflow: auto;\r
	}\r
\r
.leaflet-oldie .leaflet-popup-content-wrapper {\r
	-ms-zoom: 1;\r
	}\r
.leaflet-oldie .leaflet-popup-tip {\r
	width: 24px;\r
	margin: 0 auto;\r
\r
	-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";\r
	filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\r
	}\r
\r
.leaflet-oldie .leaflet-control-zoom,\r
.leaflet-oldie .leaflet-control-layers,\r
.leaflet-oldie .leaflet-popup-content-wrapper,\r
.leaflet-oldie .leaflet-popup-tip {\r
	border: 1px solid #999;\r
	}\r
\r
\r
/* div icon */\r
\r
.leaflet-div-icon {\r
	background: #fff;\r
	border: 1px solid #666;\r
	}\r
\r
\r
/* Tooltip */\r
/* Base styles for the element that has a tooltip */\r
.leaflet-tooltip {\r
	position: absolute;\r
	padding: 6px;\r
	background-color: #fff;\r
	border: 1px solid #fff;\r
	border-radius: 3px;\r
	color: #222;\r
	white-space: nowrap;\r
	-webkit-user-select: none;\r
	-moz-user-select: none;\r
	-ms-user-select: none;\r
	user-select: none;\r
	pointer-events: none;\r
	box-shadow: 0 1px 3px rgba(0,0,0,0.4);\r
	}\r
.leaflet-tooltip.leaflet-interactive {\r
	cursor: pointer;\r
	pointer-events: auto;\r
	}\r
.leaflet-tooltip-top:before,\r
.leaflet-tooltip-bottom:before,\r
.leaflet-tooltip-left:before,\r
.leaflet-tooltip-right:before {\r
	position: absolute;\r
	pointer-events: none;\r
	border: 6px solid transparent;\r
	background: transparent;\r
	content: "";\r
	}\r
\r
/* Directions */\r
\r
.leaflet-tooltip-bottom {\r
	margin-top: 6px;\r
}\r
.leaflet-tooltip-top {\r
	margin-top: -6px;\r
}\r
.leaflet-tooltip-bottom:before,\r
.leaflet-tooltip-top:before {\r
	left: 50%;\r
	margin-left: -6px;\r
	}\r
.leaflet-tooltip-top:before {\r
	bottom: 0;\r
	margin-bottom: -12px;\r
	border-top-color: #fff;\r
	}\r
.leaflet-tooltip-bottom:before {\r
	top: 0;\r
	margin-top: -12px;\r
	margin-left: -6px;\r
	border-bottom-color: #fff;\r
	}\r
.leaflet-tooltip-left {\r
	margin-left: -6px;\r
}\r
.leaflet-tooltip-right {\r
	margin-left: 6px;\r
}\r
.leaflet-tooltip-left:before,\r
.leaflet-tooltip-right:before {\r
	top: 50%;\r
	margin-top: -6px;\r
	}\r
.leaflet-tooltip-left:before {\r
	right: 0;\r
	margin-right: -12px;\r
	border-left-color: #fff;\r
	}\r
.leaflet-tooltip-right:before {\r
	left: 0;\r
	margin-left: -12px;\r
	border-right-color: #fff;\r
	}\r
\r
/* Printing */\r
\r
@media print {\r
	/* Prevent printers from removing background-images of controls. */\r
	.leaflet-control {\r
		-webkit-print-color-adjust: exact;\r
		print-color-adjust: exact;\r
		}\r
	}\r
`,nt=["application/geo+json","application/json","application/ld+json"],kr=`
.leaflet-popup-content .object-table {
  border-collapse: collapse;
  font-size: 0.75rem;
  width: 100%;
}
.leaflet-popup-content .object-table th {
  text-align: left;
  padding: 4px 8px;
  border-bottom: 2px solid #ccc;
  white-space: nowrap;
}
.leaflet-popup-content .object-property,
.leaflet-popup-content .object-value {
  padding: 3px 8px;
  vertical-align: top;
}
.leaflet-popup-content .object-value {
  max-width: 260px;
  overflow-wrap: break-word;
  word-break: break-all;
}
.leaflet-popup-content .object-property {
  font-weight: 500;
  color: #555;
}
.leaflet-popup-content tr:nth-child(odd) > td {
  background-color: rgba(0, 0, 0, 0.05);
}
`;let Le=null,it=!1;function Nr(t){if(it)return;const r=document.createElement("style");r.textContent=t,document.head.appendChild(r),it=!0}function Ar(){return Le||(Nr(Or+kr),Le=Promise.all([J(()=>import("./leaflet-src.js").then(t=>t.l),__vite__mapDeps([0,1])),J(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),J(()=>import("./marker-icon.js"),[]),J(()=>import("./marker-icon-2x.js"),[]),J(()=>import("./marker-shadow.js"),[])]).then(([{default:t},{createJsonLDGeoJSONLayer:r},n,s,o])=>(delete t.Icon.Default.prototype._getIconUrl,t.Icon.Default.mergeOptions({iconUrl:n.default,iconRetinaUrl:s.default,shadowUrl:o.default}),{L:t,createJsonLDGeoJSONLayer:r}))),Le}function Sr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry:t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry!=null):!1}class Cr{static supportedTypes=nt;static viewName="Map view";static icon="mdi-map";constructor(r,n={}){this.candidates=r,this.bblock=n.bblock??null,this.viewerConfig=n.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const r=this.candidates.find(n=>{if(!n.type||!n.content||!nt.some(s=>ze(s,n.type)))return!1;try{return Sr(JSON.parse(n.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,this._mount(r).catch(n=>{console.error("GeoJsonMapPlugin: init failed",n),this._el===r&&(this.destroy(r),wt(r,`Failed to render this map view (${n.message}).`))})}async _mount(r){const n=this._pickCandidate();if(!n)return;const s=JSON.parse(n.content),{L:o,createJsonLDGeoJSONLayer:f}=await Ar();if(this._el!==r)return;const a=o.map(r,{attributionControl:!1,maxZoom:22});o.control.attribution().addTo(a).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(a),this._map=a;const i=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:x,bblocksFallbackSparqlEndpoints:e}=this.viewerConfig,l={};x&&(l.fallbackRainbowInstances=x),e&&(l.fallbackSparqlEndpoints=e);try{const g=(await f(o,s,{ldContext:i,augmentOptions:l,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(a);this._layer=g;const T=g.getBounds();T.isValid()?a.fitBounds(T,{padding:[20,20]}):a.setView([0,0],2)}catch(g){console.warn("GeoJsonMapPlugin: error building layer",g),a.setView([0,0],2)}}destroy(r){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===r&&(this._el=null)}}function xt(t){return!Array.isArray(t)||!t.length?!1:typeof t[0]=="number"?t.length>=3:t.some(xt)}function ne(t){return!t?.type||!t.coordinates?!1:xt(t.coordinates)}function Pr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry&&ne(t.geometry):t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry&&ne(r.geometry)):t.type==="GeometryCollection"?Array.isArray(t.geometries)&&t.geometries.some(ne):t.coordinates?ne(t):!1}const ot=["application/geo+json","application/json","application/ld+json"],oe="0.184.0",st=()=>J(()=>import(`https://esm.sh/three@${oe}`),[]),Dr=()=>J(()=>import(`https://esm.sh/three@${oe}/examples/jsm/controls/OrbitControls.js`),[]);function zr(t){return t?.depResolver?t.depResolver.resolve({name:"three",range:`^${oe}`,version:oe,load:st}):st()}const at="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function lt(t){return t?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Vr={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Gr{static supportedTypes=ot;static viewName="3D view";static icon="mdi-cube-outline";constructor(r,n={}){this.candidates=r,this._context=n,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(n=>{if(!n.type||!n.content||!ot.some(s=>ze(s,n.type)))return!1;try{return Pr(JSON.parse(n.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,r.style.position="relative",this._mount(r).catch(n=>{console.error("ThreeDPlugin: init failed",n),this._el===r&&this._showError(r,`Failed to render this 3D view (${n.message}).`)})}_showError(r,n){this.destroy(r),wt(r,n)}async _mount(r){const n=this._pickCandidate();if(!n)return;const s=JSON.parse(n.content),[o,{OrbitControls:f}]=await Promise.all([zr(this._context),Dr()]);if(this._el!==r)return;this._THREE=o;const a=document.createElement("div");a.style.cssText="height: 100%; width: 100%;",r.appendChild(a);const h=a.clientWidth||600,i=a.clientHeight||400,x=new o.Scene;x.background=new o.Color(11383217);const e=new o.PerspectiveCamera(60,h/i,.001,1e4);e.up.set(0,0,1),this._camera=e;const l=new o.WebGLRenderer({antialias:!0});l.setPixelRatio(window.devicePixelRatio),l.setSize(h,i),a.appendChild(l.domElement),this._renderer=l;const g=new f(e,l.domElement);g.enableDamping=!0,g.dampingFactor=.05,this._controls=g,x.add(new o.AmbientLight(16777215,.5));const T=new o.DirectionalLight(16777215,.8);T.position.set(100,100,100),x.add(T);const N=new o.DirectionalLight(16777215,.3);N.position.set(-100,-100,-100),x.add(N);const v=new o.DirectionalLight(16777215,.3);if(v.position.set(0,-100,0),x.add(v),this._gridHelper=new o.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,x.add(this._gridHelper),x.add(new o.AxesHelper(1)),await this._buildGeoJsonScene(x,s),this._el!==r)return;this._fitCamera(o),this._buildControls(r),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!a.isConnected)return;const C=a.clientWidth,F=a.clientHeight;!C||!F||(e.aspect=C/F,e.updateProjectionMatrix(),l.setSize(C,F))}),this._resizeObserver.observe(a),this._animating=!0;const G=()=>{if(this._animating){this._animFrameId=requestAnimationFrame(G);try{g.update(),l.render(x,e)}catch(C){console.error("ThreeDPlugin: render loop failed",C),this._showError(r,`An error occurred while rendering this 3D view (${C.message}).`)}}};G()}async _buildGeoJsonScene(r,n){const{buildGeoJson3DObjects:s}=await J(async()=>{const{buildGeoJson3DObjects:f}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:f}},[]),o=s(n,this._THREE);o.meshes.forEach(f=>{f.material.wireframe=this._wireframe,this._solidMeshes.push(f)}),o.lines.forEach(f=>{f.visible=this._showEdges,this._solidEdges.push(f)}),o.points.forEach(f=>{f.visible=this._showVertices,this._solidVertices.push(f)}),o.objects.forEach(f=>r.add(f))}_fitCamera(r){const n=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!n.length)return;const s=new r.Box3;if(n.forEach(i=>s.expandByObject(i)),s.isEmpty())return;const o=s.getCenter(new r.Vector3),f=s.getSize(new r.Vector3),h=Math.max(f.x,f.y,f.z)*2;this._camera.position.set(o.x-h*.7,o.y-h*.7,o.z+h*.7),this._camera.near=h*.001,this._camera.far=h*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(o),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(r){const n=document.createElement("div");n.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const s=(o,f,a,h)=>{const i=document.createElement("button");return i.type="button",i.title=f,i.innerHTML=Vr[o],i.style.cssText=at+lt(h?.()),i.addEventListener("click",()=>{a(),i.style.cssText=at+lt(h?.())}),n.appendChild(i),i};s("reset","Reset camera",()=>this._resetCamera()),s("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),s("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(o=>{o.material.wireframe=this._wireframe})},()=>this._wireframe),s("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(o=>{o.visible=this._showEdges})},()=>this._showEdges),s("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(o=>{o.visible=this._showVertices})},()=>this._showVertices),r.appendChild(n),this._controlsEl=n}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(r){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidEdges.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidVertices.forEach(n=>{n.children?.forEach(s=>{s.geometry?.dispose(),s.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===r&&(this._el=null),r.innerHTML=""}}const ct=["text/html","application/xhtml+xml"],Fr=/^https?:\/\//;class jr{static supportedTypes=ct;static viewName="Web view";static icon="mdi-web";constructor(r){this.candidates=r,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(n=>n.type&&n.url&&ct.some(s=>ze(s,n.type))&&Fr.test(n.url));return this._candidate=r??null,this._candidate}render(r){this._el=r;const n=this._pickCandidate();if(!n)return;r.style.overflow="auto";const s=document.createElement("iframe");s.src=n.url,s.setAttribute("sandbox","allow-same-origin"),s.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const o=s.contentDocument,f=o?.documentElement?.scrollHeight||o?.body?.scrollHeight;f&&(s.style.height=`${f}px`)}catch{}},s.addEventListener("load",this._onLoad),r.appendChild(s),this._iframe=s}destroy(r){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===r&&(this._el=null),r.innerHTML=""}}const Ur=[Cr,Gr,jr].map(t=>({PluginClass:t,weight:1/0}));let Oe=null;const qr=new Lr;function Mr(){return Oe||(Oe=dt.registerPromises.local.promise.then(async t=>{const r=t?.viewer?.viewPlugins??[],n=await Promise.all(r.map(async s=>{try{const o=await import(s.url);return(Array.isArray(s.export)&&s.export.length?s.export:[s.export||null]).map(a=>{const h=a?o[a]:o.default;return h?{PluginClass:h,weight:s.weight??0}:(console.warn(`View plugin has no export named "${a??"default"}": ${s.url}`),null)})}catch(o){return console.warn(`View plugin failed to load: ${s.url}`,o),[]}}));return[...Ur,...n.flat().filter(Boolean)]})),Oe}function Hr(){async function t(r,n={}){if(!r?.length)return[];const s={...n,viewerConfig:yt.config,depResolver:qr},o=await Mr(),f=[];for(const{PluginClass:a,weight:h}of o){const i=a.supportedTypes??[];if(!r.some(e=>e.type&&i.some(l=>hr(l,e.type))))continue;if(typeof a.viewName!="string"||!a.viewName.trim()){console.warn(`View plugin has no static viewName, skipping: ${a.name}`);continue}let x;try{if(x=Ct(new a(r,s)),!(x.matches?.()??!0))continue}catch(e){console.warn(`View plugin threw while matching: ${a.name}`,e);continue}f.push({instance:x,weight:h,PluginClass:a})}return f}return{matchPlugins:t}}function Xr(t,r=null){return{type:t.language?.mimeType??t.language?.id??null,content:t.code??r?.contents??null,url:t.url??null,label:t.language?.label??t.language?.id??"unknown"}}function an(t,r,n=null){return{type:t.outputs?.mediaTypes?.[0]?.mimeType??null,content:n?.contents??null,url:r?.url??null,label:t.id}}const Br=["href","onClick"],ut=1500,Jr=15e3,Yr={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(t,{emit:r}){const{matchPlugins:n}=Hr(),s=Gt(()=>J(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]))),o=t,f=r,a=_t(),h=Pt(),i=Dt(),x=ce([]),e=ce([]),l=ce([]);function g(R){return R.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function T(R){return R.find(w=>!w.isViewPlugin)?.id}function N(R){const w=R.filter(O=>!O.isTransform),I=R.filter(O=>O.isTransform);w.sort((O,S)=>O.order===S.order?O.label.localeCompare(S.label):O.order-S.order);const $=new Map;I.forEach(O=>{const S=O.transformEntry.snippet.language?.id;$.has(S)||$.set(S,[]),$.get(S).push(O)}),$.forEach(O=>O.sort((S,k)=>S.label.localeCompare(k.label)));const A=[];return w.forEach(O=>{A.push(O);const S=$.get(O.id);S&&(A.push(...S),$.delete(O.id))}),$.forEach(O=>A.push(...O)),A}async function v(){const R=o.bblock;if(!o.bblock?.examples?.length){x.value=[],e.value=[],l.value=[];return}const w=[],I=[],$=[];if(o.bblock.examples.forEach(S=>{S.snippets?.forEach(k=>{let c;typeof k.language=="object"?c=k.language:(k.language||(k.language="plaintext"),c=ue[k.language],typeof c=="string"&&(c=ue[c]),c||(c={id:k.language,order:999,label:k.language}),k.language=c),(Ft.has(c.id)||c.mimeType||!ue[c.id])&&k.code==null&&k.url&&!ir(k,rr)&&$.push(dt.fetchDocumentByUrl(o.bblock,k.url,{maxSize:tr}).then(p=>{k.code=p}).catch(()=>{}))})}),await Promise.all($),o.bblock!==R||(o.bblock.examples.forEach((S,k)=>{const c=S.snippets?.map(p=>p.language)??[];if(o.bblock.transforms?.length){const p=[];o.bblock.transforms.forEach(m=>{S.snippets?.forEach((d,b)=>{const y=d.transformResults?.[m.id];if(y!=null){const _=typeof y=="string";p.push({transform:m,snippet:d,snippetIdx:b,url:_?y:y.url||null,success:_?!0:y.success??!0,stderr:_?null:y.stderr||null,profilesValidation:_?null:y.profilesValidation||null})}})});const E={};p.forEach(m=>{E[m.transform.id]=(E[m.transform.id]||0)+1}),p.sort((m,d)=>{const b=m.transform.id.localeCompare(d.transform.id);return b!==0?b:m.snippetIdx-d.snippetIdx}),p.forEach(m=>{const d=E[m.transform.id]>1;c.push({id:d?`transform:${m.snippetIdx}-${m.transform.id}`:`transform:${m.transform.id}`,label:m.transform.id,selectionLabel:`${m.transform.id} (${m.snippet.language?.label||m.snippetIdx+1})`,icon:"mdi-file-swap",hasError:!m.success,isTransform:!0,transform:m.transform,transformEntry:m})})}const u=(S.snippets??[]).map(p=>Xr(p));I.push(n(u,{bblock:o.bblock}).then(p=>{const E=new Map;p.forEach(({instance:m,weight:d,PluginClass:b})=>{const y=g(b.viewName??b.name??"")||"plugin",_=E.get(y)??0;E.set(y,_+1);const L=_===0?y:`${y}-${_+1}`;c.push({id:`plugin:${L}`,order:-.5-(d??0)/1e6,label:b.viewName??b.name??"Custom view",icon:b.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:m})})})),w[k]=c}),await Promise.all(I),o.bblock!==R))return;const A=[],O=[];w.forEach((S,k)=>{w[k]=N(S),O.push(k),A[k]=T(w[k])}),x.value=w,e.value=A,l.value=O,te(),B()}function G(R){const w=document.getElementById(`example-panel-${R.idx}`);if(!w){console.warn(`scrollToExample: no panel found for example index ${R.idx}`);return}const I=w.getBoundingClientRect().top,$=document.querySelector("header").offsetHeight,A=window.scrollY+I-$;Math.abs(A-window.scrollY)<2||window.scrollTo(0,A)}function C(R){const w=/^example-(\d+)$/.exec(R?.[0]??"");return w?{idx:parseInt(w[1],10)-1,language:R[1]||null}:null}function F(R,w){const I=[`example-${R+1}`];return w&&I.push(w),{name:"BuildingBlock",params:{id:o.bblock.itemIdentifier,section:"examples",rest:I}}}async function B(){if(!o.active)return;const R=C(h.params.rest);if(!R||!o.bblock?.examples?.[R.idx])return;const{idx:w,language:I}=R;l.value.includes(w)||l.value.push(w),I&&x.value[w]?.some($=>$.id===I)?e.value[w]=I:e.value[w]=T(x.value[w]??[]),await Vt(),P(w)}let M=null;function P(R){M?.cleanup();let w;const I=()=>{A.disconnect(),clearTimeout(w),clearTimeout(O),window.removeEventListener("wheel",I),window.removeEventListener("touchmove",I),window.removeEventListener("keydown",I),M=null};window.addEventListener("wheel",I,{passive:!0}),window.addEventListener("touchmove",I,{passive:!0}),window.addEventListener("keydown",I);const $=Tt(()=>G({idx:R}),50),A=new ResizeObserver(()=>{$(),clearTimeout(w),w=setTimeout(I,ut)});A.observe(document.body),w=setTimeout(I,ut);const O=setTimeout(I,Jr);M={cleanup:I},G({idx:R})}le(()=>h.params.rest,B);function ee(R){const w=i.resolve(F(R,e.value[R]));return window.location.origin+w.href}function ae(R){Rt(ee(R))}function te(){o.active&&o.bblock?.examples?.length?a.setItems(o.bblock.examples.map((R,w)=>({title:R.title,idx:w,to:F(w,null)})),G):a.clearItems()}return le(()=>o.bblock,v,{immediate:!0}),le(()=>o.active,R=>{te(),R&&B()}),(R,w)=>(V(),Z("div",null,[t.bblock.semanticUplift?.additionalSteps?.length?(V(),q(Wt,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:D(()=>[w[3]||(w[3]=j(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),Ne("a",{href:"#",onClick:w[0]||(w[0]=ie(I=>f("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),w[4]||(w[4]=j(" for more information. ",-1))]),_:1})):H("",!0),X(er,{multiple:"",modelValue:l.value,"onUpdate:modelValue":w[2]||(w[2]=I=>l.value=I)},{default:D(()=>[(V(!0),Z(ke,null,mt(t.bblock.examples,(I,$)=>(V(),Z(ke,{key:$},[I.content?.length||I.snippets?.length?(V(),q(Zt,{key:0,value:$,id:`example-panel-${$}`},{default:D(()=>[X(Kt,null,{default:D(()=>[Ne("a",{class:"example-copy-link",href:ee($),title:"Copy link to this example",onClick:ie(A=>ae($),["stop","prevent"])},[X(Y,null,{default:D(()=>[...w[5]||(w[5]=[j("mdi-link-variant",-1)])]),_:1})],8,Br),j(" "+W(I.title)+" ",1),X(Bt),R.$vuetify.display.mdAndUp?(V(),q(Ve,{key:0,onClick:w[1]||(w[1]=ie(()=>{},["stop"])),variant:R.$vuetify.display.lgAndUp&&x.value[$]?.length<5?"buttons":"dropdown",modelValue:e.value[$],"onUpdate:modelValue":A=>e.value[$]=A,languages:x.value[$]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):H("",!0)]),_:2},1024),X(Qt,null,{default:D(()=>[X(zt(s),{bblock:t.bblock,example:I,language:x.value[$]?.find(A=>A.id===e.value[$]),"source-files-url":t.bblock.sourceFiles},gt({_:2},[R.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:D(()=>[X(Ve,{modelValue:e.value[$],"onUpdate:modelValue":A=>e.value[$]=A,languages:x.value[$],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):H("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Wr=ft(Yr,[["__scopeId","data-v-d9220253"]]),ln=Object.freeze(Object.defineProperty({__proto__:null,default:Wr},Symbol.toStringTag,{value:"Module"}));export{ln as B,rr as M,tr as a,sn as b,nr as i,an as t,Hr as u};
