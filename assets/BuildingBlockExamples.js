const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/CopyToClipboardButton.js","assets/VChip.js","assets/VChip.css","assets/CopyToClipboardButton.css","assets/TransformInfo.js","assets/BuildingBlock.js","assets/VMenu.js","assets/dialog-transition.js","assets/VMenu.css","assets/VDialog.js","assets/VDialog.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ft,a as B,c as wt,b as dt,u as xt,e as _t,d as yt}from"./index.js";import{H as pt,Y as Rt,n as X,v as It,S as $t,E as Tt,a2 as Lt,T as Ot,o as D,k as Q,c as U,w as P,aE as kt,p as H,F as ke,x as ht,u as oe,aa as mt,q as F,t as W,aj as Nt,ak as At,l as Ne,j as St,bJ as Ct,bI as Pt,ao as Dt,y as le,a9 as zt,_ as Vt,C as ce,aA as Gt}from"./vendor.js";import{k as ue,g as jt}from"./mime-types.js";import{r as Ft,z as Ut,s as qt,w as Mt,a as Xt,c as Ht,d as Bt}from"./VList.js";import{m as Jt,q as Z}from"./VCard.js";import{g as Yt}from"./VSelect.js";import{V as Wt}from"./BuildingBlock.js";import{a as Zt,c as Kt,b as Qt,V as er}from"./VExpansionPanels.js";const Ae=200*1024,tr=10*1024*1024,rr=1024*1024;function nr(t,r=Ae){return typeof t=="number"&&t>r}function gt(t){return typeof t=="string"?new Blob([t]).size:0}function on(t,r=Ae){return typeof t!="string"||gt(t)<=r?{text:t,truncated:!1}:{text:t.slice(0,r),truncated:!0}}function ir(t,r=Ae){return t?nr(t.sizeBytes,r)?!0:gt(t.code)>r:!1}const Et=Symbol.for("vuetify:v-item-group"),or=Tt({...Ot(),...Ut({selectedClass:"v-item--selected"}),...Jt(),...Lt()},"VItemGroup"),ar=pt()({name:"VItemGroup",props:or(),emits:{"update:modelValue":t=>!0},setup(t,r){let{slots:i}=r;const{themeClasses:a}=Rt(t),{isSelected:o,select:d,next:s,prev:g,selected:n}=Ft(t,Et);return()=>X(t.tag,{class:$t(["v-item-group",a.value,t.class]),style:It(t.style)},{default:()=>[i.default?.({isSelected:o,select:d,next:s,prev:g,selected:n.value})]})}}),sr=pt()({name:"VItem",props:Mt(),emits:{"group:selected":t=>!0},setup(t,r){let{slots:i}=r;const{isSelected:a,select:o,toggle:d,selectedClass:s,value:g,disabled:n}=qt(t,Et);return()=>i.default?.({isSelected:a.value,selectedClass:s.value,select:o,toggle:d,value:g.value,disabled:n.value})}}),lr={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:t=>["buttons","dropdown"].includes(t)}},emits:["update:modelValue"]},cr={key:0,class:"language-tabs"},ur={key:0,class:"mr-2"},fr={class:"d-flex align-center"};function dr(t,r,i,a,o,d){return i.languages?.length?(D(),Q("div",cr,[i.variant==="buttons"?(D(),U(ar,{key:0,"model-value":i.modelValue,"onUpdate:modelValue":r[0]||(r[0]=s=>t.$emit("update:modelValue",s)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:P(()=>[t.$slots.preText?(D(),Q("div",ur,[kt(t.$slots,"pre-text")])):H("",!0),(D(!0),Q(ke,null,ht(i.languages,s=>(D(),U(sr,{key:s.id,value:s.id},{default:P(({isSelected:g,toggle:n})=>[X(Xt,{color:g?"primary":"default",onClick:oe(n,["stop"]),class:"mx-1 mb-1"},mt({default:P(()=>[F(" "+W(s.label),1)]),_:2},[s.icon||s.hasError?{name:"prepend",fn:P(()=>[s.hasError?(D(),U(Z,{key:0,color:"error",size:"small"},{default:P(()=>[...r[2]||(r[2]=[F("mdi-alert-circle",-1)])]),_:1})):s.icon?(D(),U(Z,{key:1,size:"small"},{default:P(()=>[F(W(s.icon),1)]),_:2},1024)):H("",!0)]),key:"0"}:void 0]),1032,["color","onClick"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):H("",!0),i.variant==="dropdown"?(D(),U(Yt,{key:1,"model-value":i.modelValue,"onUpdate:modelValue":r[1]||(r[1]=s=>t.$emit("update:modelValue",s)),items:i.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language"},{item:P(({props:s,item:g})=>[X(Ht,Nt(At(s)),{title:P(()=>[Ne("span",fr,[g.raw.hasError?(D(),U(Z,{key:0,color:"error",size:"small",class:"mr-2"},{default:P(()=>[...r[3]||(r[3]=[F("mdi-alert-circle",-1)])]),_:1})):g.raw.icon?(D(),U(Z,{key:1,size:"small",class:"mr-2"},{default:P(()=>[F(W(g.raw.icon),1)]),_:2},1024)):H("",!0),F(" "+W(g.raw.label),1)])]),_:2},1040)]),selection:P(({item:s})=>[s.raw.hasError?(D(),U(Z,{key:0,color:"error",size:"small",class:"mr-2"},{default:P(()=>[...r[4]||(r[4]=[F("mdi-alert-circle",-1)])]),_:1})):s.raw.icon?(D(),U(Z,{key:1,size:"small",class:"mr-2"},{default:P(()=>[F(W(s.raw.icon),1)]),_:2},1024)):H("",!0),F(" "+W(s.raw.label),1)]),_:1},8,["model-value","items"])):H("",!0)])):H("",!0)}const Ve=ft(lr,[["render",dr]]);function pr(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[i,a]=t.split("/"),[o,d]=r.split("/");return i===o&&(a==="*"||a===d)}var fe,Ge;function hr(){if(Ge)return fe;Ge=1;class t{constructor(){this.max=1e3,this.map=new Map}get(i){const a=this.map.get(i);if(a!==void 0)return this.map.delete(i),this.map.set(i,a),a}delete(i){return this.map.delete(i)}set(i,a){if(!this.delete(i)&&a!==void 0){if(this.map.size>=this.max){const d=this.map.keys().next().value;this.delete(d)}this.map.set(i,a)}return this}}return fe=t,fe}var de,je;function Se(){if(je)return de;je=1;const t=Object.freeze({loose:!0}),r=Object.freeze({});return de=a=>a?typeof a!="object"?t:a:r,de}var ne={exports:{}},pe,Fe;function Ce(){if(Fe)return pe;Fe=1;const t="2.0.0",r=256,i=Number.MAX_SAFE_INTEGER||9007199254740991,a=16,o=r-6;return pe={MAX_LENGTH:r,MAX_SAFE_COMPONENT_LENGTH:a,MAX_SAFE_BUILD_LENGTH:o,MAX_SAFE_INTEGER:i,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:t,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2},pe}var he,Ue;function se(){if(Ue)return he;Ue=1;var t={};return he=typeof process=="object"&&t&&t.NODE_DEBUG&&/\bsemver\b/i.test(t.NODE_DEBUG)?(...i)=>console.error("SEMVER",...i):()=>{},he}var qe;function Pe(){return qe||(qe=1,(function(t,r){const{MAX_SAFE_COMPONENT_LENGTH:i,MAX_SAFE_BUILD_LENGTH:a,MAX_LENGTH:o}=Ce(),d=se();r=t.exports={};const s=r.re=[],g=r.safeRe=[],n=r.src=[],b=r.safeSrc=[],e=r.t={};let c=0;const m="[a-zA-Z0-9-]",_=[["\\s",1],["\\d",o],[m,a]],O=G=>{for(const[S,V]of _)G=G.split(`${S}*`).join(`${S}{0,${V}}`).split(`${S}+`).join(`${S}{1,${V}}`);return G},E=(G,S,V)=>{const Y=O(S),q=c++;d(G,q,S),e[G]=q,n[q]=S,b[q]=Y,s[q]=new RegExp(S,V?"g":void 0),g[q]=new RegExp(Y,V?"g":void 0)};E("NUMERICIDENTIFIER","0|[1-9]\\d*"),E("NUMERICIDENTIFIERLOOSE","\\d+"),E("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${m}*`),E("MAINVERSION",`(${n[e.NUMERICIDENTIFIER]})\\.(${n[e.NUMERICIDENTIFIER]})\\.(${n[e.NUMERICIDENTIFIER]})`),E("MAINVERSIONLOOSE",`(${n[e.NUMERICIDENTIFIERLOOSE]})\\.(${n[e.NUMERICIDENTIFIERLOOSE]})\\.(${n[e.NUMERICIDENTIFIERLOOSE]})`),E("PRERELEASEIDENTIFIER",`(?:${n[e.NONNUMERICIDENTIFIER]}|${n[e.NUMERICIDENTIFIER]})`),E("PRERELEASEIDENTIFIERLOOSE",`(?:${n[e.NONNUMERICIDENTIFIER]}|${n[e.NUMERICIDENTIFIERLOOSE]})`),E("PRERELEASE",`(?:-(${n[e.PRERELEASEIDENTIFIER]}(?:\\.${n[e.PRERELEASEIDENTIFIER]})*))`),E("PRERELEASELOOSE",`(?:-?(${n[e.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[e.PRERELEASEIDENTIFIERLOOSE]})*))`),E("BUILDIDENTIFIER",`${m}+`),E("BUILD",`(?:\\+(${n[e.BUILDIDENTIFIER]}(?:\\.${n[e.BUILDIDENTIFIER]})*))`),E("FULLPLAIN",`v?${n[e.MAINVERSION]}${n[e.PRERELEASE]}?${n[e.BUILD]}?`),E("FULL",`^${n[e.FULLPLAIN]}$`),E("LOOSEPLAIN",`[v=\\s]*${n[e.MAINVERSIONLOOSE]}${n[e.PRERELEASELOOSE]}?${n[e.BUILD]}?`),E("LOOSE",`^${n[e.LOOSEPLAIN]}$`),E("GTLT","((?:<|>)?=?)"),E("XRANGEIDENTIFIERLOOSE",`${n[e.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),E("XRANGEIDENTIFIER",`${n[e.NUMERICIDENTIFIER]}|x|X|\\*`),E("XRANGEPLAIN",`[v=\\s]*(${n[e.XRANGEIDENTIFIER]})(?:\\.(${n[e.XRANGEIDENTIFIER]})(?:\\.(${n[e.XRANGEIDENTIFIER]})(?:${n[e.PRERELEASE]})?${n[e.BUILD]}?)?)?`),E("XRANGEPLAINLOOSE",`[v=\\s]*(${n[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[e.XRANGEIDENTIFIERLOOSE]})(?:${n[e.PRERELEASELOOSE]})?${n[e.BUILD]}?)?)?`),E("XRANGE",`^${n[e.GTLT]}\\s*${n[e.XRANGEPLAIN]}$`),E("XRANGELOOSE",`^${n[e.GTLT]}\\s*${n[e.XRANGEPLAINLOOSE]}$`),E("COERCEPLAIN",`(^|[^\\d])(\\d{1,${i}})(?:\\.(\\d{1,${i}}))?(?:\\.(\\d{1,${i}}))?`),E("COERCE",`${n[e.COERCEPLAIN]}(?:$|[^\\d])`),E("COERCEFULL",n[e.COERCEPLAIN]+`(?:${n[e.PRERELEASE]})?(?:${n[e.BUILD]})?(?:$|[^\\d])`),E("COERCERTL",n[e.COERCE],!0),E("COERCERTLFULL",n[e.COERCEFULL],!0),E("LONETILDE","(?:~>?)"),E("TILDETRIM",`(\\s*)${n[e.LONETILDE]}\\s+`,!0),r.tildeTrimReplace="$1~",E("TILDE",`^${n[e.LONETILDE]}${n[e.XRANGEPLAIN]}$`),E("TILDELOOSE",`^${n[e.LONETILDE]}${n[e.XRANGEPLAINLOOSE]}$`),E("LONECARET","(?:\\^)"),E("CARETTRIM",`(\\s*)${n[e.LONECARET]}\\s+`,!0),r.caretTrimReplace="$1^",E("CARET",`^${n[e.LONECARET]}${n[e.XRANGEPLAIN]}$`),E("CARETLOOSE",`^${n[e.LONECARET]}${n[e.XRANGEPLAINLOOSE]}$`),E("COMPARATORLOOSE",`^${n[e.GTLT]}\\s*(${n[e.LOOSEPLAIN]})$|^$`),E("COMPARATOR",`^${n[e.GTLT]}\\s*(${n[e.FULLPLAIN]})$|^$`),E("COMPARATORTRIM",`(\\s*)${n[e.GTLT]}\\s*(${n[e.LOOSEPLAIN]}|${n[e.XRANGEPLAIN]})`,!0),r.comparatorTrimReplace="$1$2$3",E("HYPHENRANGE",`^\\s*(${n[e.XRANGEPLAIN]})\\s+-\\s+(${n[e.XRANGEPLAIN]})\\s*$`),E("HYPHENRANGELOOSE",`^\\s*(${n[e.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[e.XRANGEPLAINLOOSE]})\\s*$`),E("STAR","(<|>)?=?\\s*\\*"),E("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),E("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")})(ne,ne.exports)),ne.exports}var me,Me;function mr(){if(Me)return me;Me=1;const t=/^[0-9]+$/,r=(a,o)=>{if(typeof a=="number"&&typeof o=="number")return a===o?0:a<o?-1:1;const d=t.test(a),s=t.test(o);return d&&s&&(a=+a,o=+o),a===o?0:d&&!s?-1:s&&!d?1:a<o?-1:1};return me={compareIdentifiers:r,rcompareIdentifiers:(a,o)=>r(o,a)},me}var ge,Xe;function De(){if(Xe)return ge;Xe=1;const t=se(),{MAX_LENGTH:r,MAX_SAFE_INTEGER:i}=Ce(),{safeRe:a,t:o}=Pe(),d=Se(),{compareIdentifiers:s}=mr(),g=(b,e)=>{const c=e.split(".");if(c.length>b.length)return!1;for(let m=0;m<c.length;m++)if(s(b[m],c[m])!==0)return!1;return!0};class n{constructor(e,c){if(c=d(c),e instanceof n){if(e.loose===!!c.loose&&e.includePrerelease===!!c.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>r)throw new TypeError(`version is longer than ${r} characters`);t("SemVer",e,c),this.options=c,this.loose=!!c.loose,this.includePrerelease=!!c.includePrerelease;const m=e.trim().match(c.loose?a[o.LOOSE]:a[o.FULL]);if(!m)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+m[1],this.minor=+m[2],this.patch=+m[3],this.major>i||this.major<0)throw new TypeError("Invalid major version");if(this.minor>i||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>i||this.patch<0)throw new TypeError("Invalid patch version");m[4]?this.prerelease=m[4].split(".").map(_=>{if(/^[0-9]+$/.test(_)){const O=+_;if(O>=0&&O<i)return O}return _}):this.prerelease=[],this.build=m[5]?m[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(t("SemVer.compare",this.version,this.options,e),!(e instanceof n)){if(typeof e=="string"&&e===this.version)return 0;e=new n(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof n||(e=new n(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof n||(e=new n(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let c=0;do{const m=this.prerelease[c],_=e.prerelease[c];if(t("prerelease compare",c,m,_),m===void 0&&_===void 0)return 0;if(_===void 0)return 1;if(m===void 0)return-1;if(m===_)continue;return s(m,_)}while(++c)}compareBuild(e){e instanceof n||(e=new n(e,this.options));let c=0;do{const m=this.build[c],_=e.build[c];if(t("build compare",c,m,_),m===void 0&&_===void 0)return 0;if(_===void 0)return 1;if(m===void 0)return-1;if(m===_)continue;return s(m,_)}while(++c)}inc(e,c,m){if(e.startsWith("pre")){if(!c&&m===!1)throw new Error("invalid increment argument: identifier is empty");if(c){const _=`-${c}`.match(this.options.loose?a[o.PRERELEASELOOSE]:a[o.PRERELEASE]);if(!_||_[1]!==c)throw new Error(`invalid identifier: ${c}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",c,m);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",c,m);break;case"prepatch":this.prerelease.length=0,this.inc("patch",c,m),this.inc("pre",c,m);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",c,m),this.inc("pre",c,m);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const _=Number(m)?1:0;if(this.prerelease.length===0)this.prerelease=[_];else{let O=this.prerelease.length;for(;--O>=0;)typeof this.prerelease[O]=="number"&&(this.prerelease[O]++,O=-2);if(O===-1){if(c===this.prerelease.join(".")&&m===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(_)}}if(c){let O=[c,_];if(m===!1&&(O=[c]),g(this.prerelease,c)){const E=this.prerelease[c.split(".").length];isNaN(E)&&(this.prerelease=O)}else this.prerelease=O}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}return ge=n,ge}var Ee,He;function ee(){if(He)return Ee;He=1;const t=De();return Ee=(i,a,o)=>new t(i,o).compare(new t(a,o)),Ee}var be,Be;function gr(){if(Be)return be;Be=1;const t=ee();return be=(i,a,o)=>t(i,a,o)===0,be}var ve,Je;function Er(){if(Je)return ve;Je=1;const t=ee();return ve=(i,a,o)=>t(i,a,o)!==0,ve}var we,Ye;function br(){if(Ye)return we;Ye=1;const t=ee();return we=(i,a,o)=>t(i,a,o)>0,we}var xe,We;function vr(){if(We)return xe;We=1;const t=ee();return xe=(i,a,o)=>t(i,a,o)>=0,xe}var _e,Ze;function wr(){if(Ze)return _e;Ze=1;const t=ee();return _e=(i,a,o)=>t(i,a,o)<0,_e}var ye,Ke;function xr(){if(Ke)return ye;Ke=1;const t=ee();return ye=(i,a,o)=>t(i,a,o)<=0,ye}var Re,Qe;function _r(){if(Qe)return Re;Qe=1;const t=gr(),r=Er(),i=br(),a=vr(),o=wr(),d=xr();return Re=(g,n,b,e)=>{switch(n){case"===":return typeof g=="object"&&(g=g.version),typeof b=="object"&&(b=b.version),g===b;case"!==":return typeof g=="object"&&(g=g.version),typeof b=="object"&&(b=b.version),g!==b;case"":case"=":case"==":return t(g,b,e);case"!=":return r(g,b,e);case">":return i(g,b,e);case">=":return a(g,b,e);case"<":return o(g,b,e);case"<=":return d(g,b,e);default:throw new TypeError(`Invalid operator: ${n}`)}},Re}var Ie,et;function yr(){if(et)return Ie;et=1;const t=Symbol("SemVer ANY");class r{static get ANY(){return t}constructor(e,c){if(c=i(c),e instanceof r){if(e.loose===!!c.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),s("comparator",e,c),this.options=c,this.loose=!!c.loose,this.parse(e),this.semver===t?this.value="":this.value=this.operator+this.semver.version,s("comp",this)}parse(e){const c=this.options.loose?a[o.COMPARATORLOOSE]:a[o.COMPARATOR],m=e.match(c);if(!m)throw new TypeError(`Invalid comparator: ${e}`);this.operator=m[1]!==void 0?m[1]:"",this.operator==="="&&(this.operator=""),m[2]?this.semver=new g(m[2],this.options.loose):this.semver=t}toString(){return this.value}test(e){if(s("Comparator.test",e,this.options.loose),this.semver===t||e===t)return!0;if(typeof e=="string")try{e=new g(e,this.options)}catch{return!1}return d(e,this.operator,this.semver,this.options)}intersects(e,c){if(!(e instanceof r))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new n(e.value,c).test(this.value):e.operator===""?e.value===""?!0:new n(this.value,c).test(e.semver):(c=i(c),c.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!c.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||d(this.semver,"<",e.semver,c)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||d(this.semver,">",e.semver,c)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}}Ie=r;const i=Se(),{safeRe:a,t:o}=Pe(),d=_r(),s=se(),g=De(),n=bt();return Ie}var $e,tt;function bt(){if(tt)return $e;tt=1;const t=/\s+/g;class r{constructor(l,f){if(f=o(f),l instanceof r)return l.loose===!!f.loose&&l.includePrerelease===!!f.includePrerelease?l:new r(l.raw,f);if(l instanceof d)return this.raw=l.value,this.set=[[l]],this.formatted=void 0,this;if(this.options=f,this.loose=!!f.loose,this.includePrerelease=!!f.includePrerelease,this.raw=l.trim().replace(t," "),this.set=this.raw.split("||").map(p=>this.parseRange(p.trim())).filter(p=>p.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const p=this.set[0];if(this.set=this.set.filter(x=>!S(x[0])),this.set.length===0)this.set=[p];else if(this.set.length>1){for(const x of this.set)if(x.length===1&&V(x[0])){this.set=[x];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let l=0;l<this.set.length;l++){l>0&&(this.formatted+="||");const f=this.set[l];for(let p=0;p<f.length;p++)p>0&&(this.formatted+=" "),this.formatted+=f[p].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(l){l=l.replace(G,"");const p=((this.options.includePrerelease&&O)|(this.options.loose&&E))+":"+l,x=a.get(p);if(x)return x;const h=this.options.loose,v=h?n[e.HYPHENRANGELOOSE]:n[e.HYPHENRANGE];l=l.replace(v,A(this.options.includePrerelease)),s("hyphen replace",l),l=l.replace(n[e.COMPARATORTRIM],c),s("comparator trim",l),l=l.replace(n[e.TILDETRIM],m),s("tilde trim",l),l=l.replace(n[e.CARETTRIM],_),s("caret trim",l);let T=l.split(" ").map(C=>q(C,this.options)).join(" ").split(/\s+/).map(C=>N(C,this.options));h&&(T=T.filter(C=>(s("loose invalid filter",C,this.options),!!C.match(n[e.COMPARATORLOOSE])))),s("range list",T);const R=new Map,$=T.map(C=>new d(C,this.options));for(const C of $){if(S(C))return[C];R.set(C.value,C)}R.size>1&&R.has("")&&R.delete("");const j=[...R.values()];return a.set(p,j),j}intersects(l,f){if(!(l instanceof r))throw new TypeError("a Range is required");return this.set.some(p=>Y(p,f)&&l.set.some(x=>Y(x,f)&&p.every(h=>x.every(v=>h.intersects(v,f)))))}test(l){if(!l)return!1;if(typeof l=="string")try{l=new g(l,this.options)}catch{return!1}for(let f=0;f<this.set.length;f++)if(J(this.set[f],l,this.options))return!0;return!1}}$e=r;const i=hr(),a=new i,o=Se(),d=yr(),s=se(),g=De(),{safeRe:n,src:b,t:e,comparatorTrimReplace:c,tildeTrimReplace:m,caretTrimReplace:_}=Pe(),{FLAG_INCLUDE_PRERELEASE:O,FLAG_LOOSE:E}=Ce(),G=new RegExp(b[e.BUILD],"g"),S=u=>u.value==="<0.0.0-0",V=u=>u.value==="",Y=(u,l)=>{let f=!0;const p=u.slice();let x=p.pop();for(;f&&p.length;)f=p.every(h=>x.intersects(h,l)),x=p.pop();return f},q=(u,l)=>(u=u.replace(n[e.BUILD],""),s("comp",u,l),u=I(u,l),s("caret",u),u=y(u,l),s("tildes",u),u=z(u,l),s("xrange",u),u=M(u,l),s("stars",u),u),k=u=>!u||u.toLowerCase()==="x"||u==="*",re=(u,l,f)=>k(u)&&!k(l)||k(l)&&f&&!k(f),y=(u,l)=>u.trim().split(/\s+/).map(f=>w(f,l)).join(" "),w=(u,l)=>{const f=l.loose?n[e.TILDELOOSE]:n[e.TILDE],p=l.includePrerelease?"-0":"";return u.replace(f,(x,h,v,T,R)=>{s("tilde",u,x,h,v,T,R);let $;return k(h)?$="":k(v)?$=`>=${h}.0.0${p} <${+h+1}.0.0-0`:k(T)?$=`>=${h}.${v}.0${p} <${h}.${+v+1}.0-0`:R?(s("replaceTilde pr",R),$=`>=${h}.${v}.${T}-${R} <${h}.${+v+1}.0-0`):$=`>=${h}.${v}.${T} <${h}.${+v+1}.0-0`,s("tilde return",$),$})},I=(u,l)=>u.trim().split(/\s+/).map(f=>L(f,l)).join(" "),L=(u,l)=>{s("caret",u,l);const f=l.loose?n[e.CARETLOOSE]:n[e.CARET],p=l.includePrerelease?"-0":"";return u.replace(f,(x,h,v,T,R)=>{s("caret",u,x,h,v,T,R);let $;return k(h)?$="":k(v)?$=`>=${h}.0.0${p} <${+h+1}.0.0-0`:k(T)?h==="0"?$=`>=${h}.${v}.0${p} <${h}.${+v+1}.0-0`:$=`>=${h}.${v}.0${p} <${+h+1}.0.0-0`:R?(s("replaceCaret pr",R),h==="0"?v==="0"?$=`>=${h}.${v}.${T}-${R} <${h}.${v}.${+T+1}-0`:$=`>=${h}.${v}.${T}-${R} <${h}.${+v+1}.0-0`:$=`>=${h}.${v}.${T}-${R} <${+h+1}.0.0-0`):(s("no pr"),h==="0"?v==="0"?$=`>=${h}.${v}.${T} <${h}.${v}.${+T+1}-0`:$=`>=${h}.${v}.${T} <${h}.${+v+1}.0-0`:$=`>=${h}.${v}.${T} <${+h+1}.0.0-0`),s("caret return",$),$})},z=(u,l)=>(s("replaceXRanges",u,l),u.split(/\s+/).map(f=>K(f,l)).join(" ")),K=(u,l)=>{u=u.trim();const f=l.loose?n[e.XRANGELOOSE]:n[e.XRANGE];return u.replace(f,(p,x,h,v,T,R)=>{if(s("xRange",u,p,x,h,v,T,R),re(h,v,T))return u;const $=k(h),j=$||k(v),C=j||k(T),te=C;return x==="="&&te&&(x=""),R=l.includePrerelease?"-0":"",$?x===">"||x==="<"?p="<0.0.0-0":p="*":x&&te?(j&&(v=0),T=0,x===">"?(x=">=",j?(h=+h+1,v=0,T=0):(v=+v+1,T=0)):x==="<="&&(x="<",j?h=+h+1:v=+v+1),x==="<"&&(R="-0"),p=`${x+h}.${v}.${T}${R}`):j?p=`>=${h}.0.0${R} <${+h+1}.0.0-0`:C&&(p=`>=${h}.${v}.0${R} <${h}.${+v+1}.0-0`),s("xRange return",p),p})},M=(u,l)=>(s("replaceStars",u,l),u.trim().replace(n[e.STAR],"")),N=(u,l)=>(s("replaceGTE0",u,l),u.trim().replace(n[l.includePrerelease?e.GTE0PRE:e.GTE0],"")),A=u=>(l,f,p,x,h,v,T,R,$,j,C,te)=>(k(p)?f="":k(x)?f=`>=${p}.0.0${u?"-0":""}`:k(h)?f=`>=${p}.${x}.0${u?"-0":""}`:v?f=`>=${f}`:f=`>=${f}${u?"-0":""}`,k($)?R="":k(j)?R=`<${+$+1}.0.0-0`:k(C)?R=`<${$}.${+j+1}.0-0`:te?R=`<=${$}.${j}.${C}-${te}`:u?R=`<${$}.${j}.${+C+1}-0`:R=`<=${R}`,`${f} ${R}`.trim()),J=(u,l,f)=>{for(let p=0;p<u.length;p++)if(!u[p].test(l))return!1;if(l.prerelease.length&&!f.includePrerelease){for(let p=0;p<u.length;p++)if(s(u[p].semver),u[p].semver!==d.ANY&&u[p].semver.prerelease.length>0){const x=u[p].semver;if(x.major===l.major&&x.minor===l.minor&&x.patch===l.patch)return!0}return!1}return!0};return $e}var Te,rt;function Rr(){if(rt)return Te;rt=1;const t=bt();return Te=(i,a,o)=>{try{a=new t(a,o)}catch{return!1}return a.test(i)},Te}var Ir=Rr();const $r=St(Ir);class Tr{constructor(){this._cache=new Map}resolve({name:r,range:i,version:a,load:o}){const d=this._cache.get(r)??[],s=d.find(n=>$r(n.version,i));if(s)return s.promise;const g={version:a,promise:null};return g.promise=Promise.resolve().then(o).catch(n=>{const b=this._cache.get(r),e=b?.indexOf(g)??-1;throw e!==-1&&b.splice(e,1),n}),d.push(g),this._cache.set(r,d),g.promise}}function ze(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[i,a]=t.split("/"),[o,d]=r.split("/");return i===o&&(a==="*"||a===d)}const Lr=`/* required styles */\r
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
`,nt=["application/geo+json","application/json","application/ld+json"],Or=`
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
`;let Le=null,it=!1;function kr(t){if(it)return;const r=document.createElement("style");r.textContent=t,document.head.appendChild(r),it=!0}function Nr(){return Le||(kr(Lr+Or),Le=Promise.all([B(()=>import("./leaflet-src.js").then(t=>t.l),__vite__mapDeps([0,1])),B(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),B(()=>import("./marker-icon.js"),[]),B(()=>import("./marker-icon-2x.js"),[]),B(()=>import("./marker-shadow.js"),[])]).then(([{default:t},{createJsonLDGeoJSONLayer:r},i,a,o])=>(delete t.Icon.Default.prototype._getIconUrl,t.Icon.Default.mergeOptions({iconUrl:i.default,iconRetinaUrl:a.default,shadowUrl:o.default}),{L:t,createJsonLDGeoJSONLayer:r}))),Le}function Ar(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry:t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry!=null):!1}class Sr{static supportedTypes=nt;static viewName="Map view";static icon="mdi-map";constructor(r,i={}){this.candidates=r,this.bblock=i.bblock??null,this.viewerConfig=i.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const r=this.candidates.find(i=>{if(!i.type||!i.content||!nt.some(a=>ze(a,i.type)))return!1;try{return Ar(JSON.parse(i.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,this._mount(r)}async _mount(r){const i=this._pickCandidate();if(!i)return;const a=JSON.parse(i.content),{L:o,createJsonLDGeoJSONLayer:d}=await Nr();if(this._el!==r)return;const s=o.map(r,{attributionControl:!1,maxZoom:22});o.control.attribution().addTo(s).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(s),this._map=s;const n=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:b,bblocksFallbackSparqlEndpoints:e}=this.viewerConfig,c={};b&&(c.fallbackRainbowInstances=b),e&&(c.fallbackSparqlEndpoints=e);try{const m=(await d(o,a,{ldContext:n,augmentOptions:c,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(s);this._layer=m;const _=m.getBounds();_.isValid()?s.fitBounds(_,{padding:[20,20]}):s.setView([0,0],2)}catch(m){console.warn("GeoJsonMapPlugin: error building layer",m),s.setView([0,0],2)}}destroy(r){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===r&&(this._el=null)}}function vt(t){return!Array.isArray(t)||!t.length?!1:typeof t[0]=="number"?t.length>=3:t.some(vt)}function ie(t){return!t?.type||!t.coordinates?!1:vt(t.coordinates)}function Cr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry&&ie(t.geometry):t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry&&ie(r.geometry)):t.type==="GeometryCollection"?Array.isArray(t.geometries)&&t.geometries.some(ie):t.coordinates?ie(t):!1}const ot=["application/geo+json","application/json","application/ld+json"],ae="0.184.0",at=()=>B(()=>import(`https://esm.sh/three@${ae}`),[]),Pr=()=>B(()=>import(`https://esm.sh/three@${ae}/examples/jsm/controls/OrbitControls.js`),[]);function Dr(t){return t?.depResolver?t.depResolver.resolve({name:"three",range:`^${ae}`,version:ae,load:at}):at()}const st="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function lt(t){return t?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const zr={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Vr{static supportedTypes=ot;static viewName="3D view";static icon="mdi-cube-outline";constructor(r,i={}){this.candidates=r,this._context=i,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(i=>{if(!i.type||!i.content||!ot.some(a=>ze(a,i.type)))return!1;try{return Cr(JSON.parse(i.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,r.style.position="relative",this._mount(r).catch(i=>console.error("ThreeDPlugin: init failed",i))}async _mount(r){const i=this._pickCandidate();if(!i)return;const a=JSON.parse(i.content),[o,{OrbitControls:d}]=await Promise.all([Dr(this._context),Pr()]);if(this._el!==r)return;this._THREE=o;const s=document.createElement("div");s.style.cssText="height: 100%; width: 100%;",r.appendChild(s);const g=s.clientWidth||600,n=s.clientHeight||400,b=new o.Scene;b.background=new o.Color(11383217);const e=new o.PerspectiveCamera(60,g/n,.001,1e4);e.up.set(0,0,1),this._camera=e;const c=new o.WebGLRenderer({antialias:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(g,n),s.appendChild(c.domElement),this._renderer=c;const m=new d(e,c.domElement);m.enableDamping=!0,m.dampingFactor=.05,this._controls=m,b.add(new o.AmbientLight(16777215,.5));const _=new o.DirectionalLight(16777215,.8);_.position.set(100,100,100),b.add(_);const O=new o.DirectionalLight(16777215,.3);O.position.set(-100,-100,-100),b.add(O);const E=new o.DirectionalLight(16777215,.3);if(E.position.set(0,-100,0),b.add(E),this._gridHelper=new o.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,b.add(this._gridHelper),b.add(new o.AxesHelper(1)),await this._buildGeoJsonScene(b,a),this._el!==r)return;this._fitCamera(o),this._buildControls(r),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!s.isConnected)return;const S=s.clientWidth,V=s.clientHeight;!S||!V||(e.aspect=S/V,e.updateProjectionMatrix(),c.setSize(S,V))}),this._resizeObserver.observe(s),this._animating=!0;const G=()=>{this._animating&&(this._animFrameId=requestAnimationFrame(G),m.update(),c.render(b,e))};G()}async _buildGeoJsonScene(r,i){const{buildGeoJson3DObjects:a}=await B(async()=>{const{buildGeoJson3DObjects:d}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:d}},[]),o=a(i,this._THREE);o.meshes.forEach(d=>{d.material.wireframe=this._wireframe,this._solidMeshes.push(d)}),o.lines.forEach(d=>{d.visible=this._showEdges,this._solidEdges.push(d)}),o.points.forEach(d=>{d.visible=this._showVertices,this._solidVertices.push(d)}),o.objects.forEach(d=>r.add(d))}_fitCamera(r){const i=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!i.length)return;const a=new r.Box3;if(i.forEach(n=>a.expandByObject(n)),a.isEmpty())return;const o=a.getCenter(new r.Vector3),d=a.getSize(new r.Vector3),g=Math.max(d.x,d.y,d.z)*2;this._camera.position.set(o.x-g*.7,o.y-g*.7,o.z+g*.7),this._camera.near=g*.001,this._camera.far=g*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(o),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(r){const i=document.createElement("div");i.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const a=(o,d,s,g)=>{const n=document.createElement("button");return n.type="button",n.title=d,n.innerHTML=zr[o],n.style.cssText=st+lt(g?.()),n.addEventListener("click",()=>{s(),n.style.cssText=st+lt(g?.())}),i.appendChild(n),n};a("reset","Reset camera",()=>this._resetCamera()),a("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),a("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(o=>{o.material.wireframe=this._wireframe})},()=>this._wireframe),a("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(o=>{o.visible=this._showEdges})},()=>this._showEdges),a("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(o=>{o.visible=this._showVertices})},()=>this._showVertices),r.appendChild(i),this._controlsEl=i}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(r){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(i=>{i.geometry?.dispose(),i.material?.dispose()}),this._solidEdges.forEach(i=>{i.geometry?.dispose(),i.material?.dispose()}),this._solidVertices.forEach(i=>{i.children?.forEach(a=>{a.geometry?.dispose(),a.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===r&&(this._el=null),r.innerHTML=""}}const ct=["text/html","application/xhtml+xml"],Gr=/^https?:\/\//;class jr{static supportedTypes=ct;static viewName="Web view";static icon="mdi-web";constructor(r){this.candidates=r,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(i=>i.type&&i.url&&ct.some(a=>ze(a,i.type))&&Gr.test(i.url));return this._candidate=r??null,this._candidate}render(r){this._el=r;const i=this._pickCandidate();if(!i)return;r.style.overflow="auto";const a=document.createElement("iframe");a.src=i.url,a.setAttribute("sandbox","allow-same-origin"),a.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const o=a.contentDocument,d=o?.documentElement?.scrollHeight||o?.body?.scrollHeight;d&&(a.style.height=`${d}px`)}catch{}},a.addEventListener("load",this._onLoad),r.appendChild(a),this._iframe=a}destroy(r){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===r&&(this._el=null),r.innerHTML=""}}const Fr=[Sr,Vr,jr].map(t=>({PluginClass:t,weight:1/0}));let Oe=null;const Ur=new Tr;function qr(){return Oe||(Oe=dt.registerPromises.local.promise.then(async t=>{const r=t?.viewer?.viewPlugins??[],i=await Promise.all(r.map(async a=>{try{const o=await import(a.url);return(Array.isArray(a.export)&&a.export.length?a.export:[a.export||null]).map(s=>{const g=s?o[s]:o.default;return g?{PluginClass:g,weight:a.weight??0}:(console.warn(`View plugin has no export named "${s??"default"}": ${a.url}`),null)})}catch(o){return console.warn(`View plugin failed to load: ${a.url}`,o),[]}}));return[...Fr,...i.flat().filter(Boolean)]})),Oe}function Mr(){async function t(r,i={}){if(!r?.length)return[];const a={...i,viewerConfig:wt.config,depResolver:Ur},o=await qr(),d=[];for(const{PluginClass:s,weight:g}of o){const n=s.supportedTypes??[];if(!r.some(e=>e.type&&n.some(c=>pr(c,e.type))))continue;let b;try{if(b=Ct(new s(r,a)),!(b.matches?.()??!0))continue}catch(e){console.warn(`View plugin threw while matching: ${s.name}`,e);continue}d.push({instance:b,weight:g,PluginClass:s})}return d}return{matchPlugins:t}}function Xr(t,r=null){return{type:t.language?.mimeType??t.language?.id??null,content:t.code??r?.contents??null,url:t.url??null,label:t.language?.label??t.language?.id??"unknown"}}function an(t,r,i=null){return{type:t.outputs?.mediaTypes?.[0]?.mimeType??null,content:i?.contents??null,url:r?.url??null,label:t.id}}const Hr=["href","onClick"],ut=1500,Br=15e3,Jr={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(t,{emit:r}){const{matchPlugins:i}=Mr(),a=Gt(()=>B(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]))),o=t,d=r,s=xt(),g=Pt(),n=Dt(),b=ce([]),e=ce([]),c=ce([]);function m(y){return y.find(w=>!w.isViewPlugin)?.id}async function _(){const y=o.bblock;if(!o.bblock?.examples?.length){b.value=[],e.value=[],c.value=[];return}const w=[],I=[],L=[];if(o.bblock.examples.forEach(M=>{M.snippets?.forEach(N=>{let A;typeof N.language=="object"?A=N.language:(N.language||(N.language="plaintext"),A=ue[N.language],typeof A=="string"&&(A=ue[A]),A||(A={id:N.language,order:999,label:N.language}),N.language=A),(jt.has(A.id)||A.mimeType||!ue[A.id])&&N.code==null&&N.url&&!ir(N,rr)&&L.push(dt.fetchDocumentByUrl(o.bblock,N.url,{maxSize:tr}).then(u=>{N.code=u}).catch(()=>{}))})}),await Promise.all(L),o.bblock!==y||(o.bblock.examples.forEach((M,N)=>{const A=M.snippets?.map(u=>u.language)??[];if(o.bblock.transforms?.length){const u=[];o.bblock.transforms.forEach(f=>{M.snippets?.forEach((p,x)=>{const h=p.transformResults?.[f.id];if(h!=null){const v=typeof h=="string";u.push({transform:f,snippet:p,snippetIdx:x,url:v?h:h.url||null,success:v?!0:h.success??!0,stderr:v?null:h.stderr||null,profilesValidation:v?null:h.profilesValidation||null})}})});const l={};u.forEach(f=>{l[f.transform.id]=(l[f.transform.id]||0)+1}),u.sort((f,p)=>{const x=f.transform.id.localeCompare(p.transform.id);return x!==0?x:f.snippetIdx-p.snippetIdx}),u.forEach(f=>{const x=l[f.transform.id]>1?`${f.transform.id} (${f.snippet.language?.label||f.snippetIdx+1})`:f.transform.id;A.push({id:`transform:${f.snippetIdx}-${f.transform.id}`,order:9999,label:x,icon:"mdi-file-swap",hasError:!f.success,isTransform:!0,transform:f.transform,transformEntry:f})})}const J=(M.snippets??[]).map(u=>Xr(u));I.push(i(J,{bblock:o.bblock}).then(u=>{u.forEach(({instance:l,weight:f,PluginClass:p},x)=>{A.push({id:`plugin:${N}:${p.name||"plugin"}:${x}`,order:-.5-(f??0)/1e6,label:p.viewName??p.name??"Custom view",icon:p.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:l})})})),w[N]=A}),await Promise.all(I),o.bblock!==y))return;const z=[],K=[];w.forEach((M,N)=>{M.sort((A,J)=>A.order===J.order?A.label.localeCompare(J.label):A.order-J.order),K.push(N),z[N]=m(M)}),b.value=w,e.value=z,c.value=K,re(),S()}function O(y){const w=document.getElementById(`example-panel-${y.idx}`);if(!w){console.warn(`scrollToExample: no panel found for example index ${y.idx}`);return}const I=w.getBoundingClientRect().top,L=document.querySelector("header").offsetHeight,z=window.scrollY+I-L;Math.abs(z-window.scrollY)<2||window.scrollTo(0,z)}function E(y){const w=/^example-(\d+)$/.exec(y?.[0]??"");return w?{idx:parseInt(w[1],10)-1,language:y[1]||null}:null}function G(y,w){const I=[`example-${y+1}`];return w&&I.push(w),{name:"BuildingBlock",params:{id:o.bblock.itemIdentifier,section:"examples",rest:I}}}async function S(){if(!o.active)return;const y=E(g.params.rest);if(!y||!o.bblock?.examples?.[y.idx])return;const{idx:w,language:I}=y;c.value.includes(w)||c.value.push(w),I&&b.value[w]?.some(L=>L.id===I)?e.value[w]=I:e.value[w]=m(b.value[w]??[]),await Vt(),Y(w)}let V=null;function Y(y){V?.cleanup();let w;const I=()=>{z.disconnect(),clearTimeout(w),clearTimeout(K),window.removeEventListener("wheel",I),window.removeEventListener("touchmove",I),window.removeEventListener("keydown",I),V=null};window.addEventListener("wheel",I,{passive:!0}),window.addEventListener("touchmove",I,{passive:!0}),window.addEventListener("keydown",I);const L=yt(()=>O({idx:y}),50),z=new ResizeObserver(()=>{L(),clearTimeout(w),w=setTimeout(I,ut)});z.observe(document.body),w=setTimeout(I,ut);const K=setTimeout(I,Br);V={cleanup:I},O({idx:y})}le(()=>g.params.rest,S);function q(y){const w=n.resolve(G(y,e.value[y]));return window.location.origin+w.href}function k(y){_t(q(y))}function re(){o.active&&o.bblock?.examples?.length?s.setItems(o.bblock.examples.map((y,w)=>({title:y.title,idx:w,to:G(w,null)})),O):s.clearItems()}return le(()=>o.bblock,_,{immediate:!0}),le(()=>o.active,y=>{re(),y&&S()}),(y,w)=>(D(),Q("div",null,[t.bblock.semanticUplift?.additionalSteps?.length?(D(),U(Wt,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:P(()=>[w[3]||(w[3]=F(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),Ne("a",{href:"#",onClick:w[0]||(w[0]=oe(I=>d("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),w[4]||(w[4]=F(" for more information. ",-1))]),_:1})):H("",!0),X(er,{multiple:"",modelValue:c.value,"onUpdate:modelValue":w[2]||(w[2]=I=>c.value=I)},{default:P(()=>[(D(!0),Q(ke,null,ht(t.bblock.examples,(I,L)=>(D(),Q(ke,{key:L},[I.content?.length||I.snippets?.length?(D(),U(Zt,{key:0,value:L,id:`example-panel-${L}`},{default:P(()=>[X(Kt,null,{default:P(()=>[Ne("a",{class:"example-copy-link",href:q(L),title:"Copy link to this example",onClick:oe(z=>k(L),["stop","prevent"])},[X(Z,null,{default:P(()=>[...w[5]||(w[5]=[F("mdi-link-variant",-1)])]),_:1})],8,Hr),F(" "+W(I.title)+" ",1),X(Bt),y.$vuetify.display.mdAndUp?(D(),U(Ve,{key:0,onClick:w[1]||(w[1]=oe(()=>{},["stop"])),variant:y.$vuetify.display.lgAndUp&&b.value[L]?.length<5?"buttons":"dropdown",modelValue:e.value[L],"onUpdate:modelValue":z=>e.value[L]=z,languages:b.value[L]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):H("",!0)]),_:2},1024),X(Qt,null,{default:P(()=>[X(zt(a),{bblock:t.bblock,example:I,language:b.value[L]?.find(z=>z.id===e.value[L]),"source-files-url":t.bblock.sourceFiles},mt({_:2},[y.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:P(()=>[X(Ve,{modelValue:e.value[L],"onUpdate:modelValue":z=>e.value[L]=z,languages:b.value[L],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):H("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Yr=ft(Jr,[["__scopeId","data-v-0deedcbd"]]),sn=Object.freeze(Object.defineProperty({__proto__:null,default:Yr},Symbol.toStringTag,{value:"Module"}));export{sn as B,rr as M,tr as a,on as b,nr as i,an as t,Mr as u};
