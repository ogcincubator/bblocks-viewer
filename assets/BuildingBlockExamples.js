const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/CopyToClipboardButton.js","assets/VChip.js","assets/VChip.css","assets/CopyToClipboardButton.css","assets/TransformInfo.js","assets/BuildingBlock.js","assets/VMenu.js","assets/dialog-transition.js","assets/VMenu.css","assets/VDialog.js","assets/VDialog.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ft,a as J,c as xt,b as dt,u as yt,e as _t,d as Rt}from"./index.js";import{H as pt,Y as It,n as H,v as $t,S as Tt,E as Lt,a2 as Ot,T as kt,o as D,k as K,c as U,w as P,aE as Nt,p as X,F as ke,x as ht,u as ie,aa as mt,q as j,t as Y,aj as At,ak as St,l as Ne,j as Ct,bJ as Pt,bI as Dt,ao as zt,y as le,a9 as Vt,_ as Gt,C as ce,aA as Ft}from"./vendor.js";import{k as ue,g as jt}from"./mime-types.js";import{r as Ut,z as qt,s as Mt,w as Ht,a as Xt,c as Bt,d as Jt}from"./VList.js";import{m as Yt,q as W}from"./VCard.js";import{g as Wt}from"./VSelect.js";import{V as Zt}from"./BuildingBlock.js";import{a as Kt,c as Qt,b as er,V as tr}from"./VExpansionPanels.js";const Ae=200*1024,rr=10*1024*1024,nr=1024*1024;function ir(t,r=Ae){return typeof t=="number"&&t>r}function gt(t){return typeof t=="string"?new Blob([t]).size:0}function an(t,r=Ae){return typeof t!="string"||gt(t)<=r?{text:t,truncated:!1}:{text:t.slice(0,r),truncated:!0}}function or(t,r=Ae){return t?ir(t.sizeBytes,r)?!0:gt(t.code)>r:!1}const Et=Symbol.for("vuetify:v-item-group"),ar=Lt({...kt(),...qt({selectedClass:"v-item--selected"}),...Yt(),...Ot()},"VItemGroup"),sr=pt()({name:"VItemGroup",props:ar(),emits:{"update:modelValue":t=>!0},setup(t,r){let{slots:n}=r;const{themeClasses:a}=It(t),{isSelected:o,select:p,next:s,prev:h,selected:i}=Ut(t,Et);return()=>H(t.tag,{class:Tt(["v-item-group",a.value,t.class]),style:$t(t.style)},{default:()=>[n.default?.({isSelected:o,select:p,next:s,prev:h,selected:i.value})]})}}),lr=pt()({name:"VItem",props:Ht(),emits:{"group:selected":t=>!0},setup(t,r){let{slots:n}=r;const{isSelected:a,select:o,toggle:p,selectedClass:s,value:h,disabled:i}=Mt(t,Et);return()=>n.default?.({isSelected:a.value,selectedClass:s.value,select:o,toggle:p,value:h.value,disabled:i.value})}}),cr={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:t=>["buttons","dropdown"].includes(t)}},emits:["update:modelValue"]},ur={key:0,class:"language-tabs"},fr={key:0,class:"mr-2"},dr={class:"d-flex align-center"};function pr(t,r,n,a,o,p){return n.languages?.length?(D(),K("div",ur,[n.variant==="buttons"?(D(),U(sr,{key:0,"model-value":n.modelValue,"onUpdate:modelValue":r[0]||(r[0]=s=>t.$emit("update:modelValue",s)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:P(()=>[t.$slots.preText?(D(),K("div",fr,[Nt(t.$slots,"pre-text")])):X("",!0),(D(!0),K(ke,null,ht(n.languages,s=>(D(),U(lr,{key:s.id,value:s.id},{default:P(({isSelected:h,toggle:i})=>[H(Xt,{color:h?"primary":"default",onClick:ie(i,["stop"]),class:"mx-1 mb-1"},mt({default:P(()=>[j(" "+Y(s.label),1)]),_:2},[s.icon||s.hasError?{name:"prepend",fn:P(()=>[s.hasError?(D(),U(W,{key:0,color:"error",size:"small"},{default:P(()=>[...r[2]||(r[2]=[j("mdi-alert-circle",-1)])]),_:1})):s.icon?(D(),U(W,{key:1,size:"small"},{default:P(()=>[j(Y(s.icon),1)]),_:2},1024)):X("",!0)]),key:"0"}:void 0]),1032,["color","onClick"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):X("",!0),n.variant==="dropdown"?(D(),U(Wt,{key:1,"model-value":n.modelValue,"onUpdate:modelValue":r[1]||(r[1]=s=>t.$emit("update:modelValue",s)),items:n.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language"},{item:P(({props:s,item:h})=>[H(Bt,At(St(s)),{title:P(()=>[Ne("span",dr,[h.raw.hasError?(D(),U(W,{key:0,color:"error",size:"small",class:"mr-2"},{default:P(()=>[...r[3]||(r[3]=[j("mdi-alert-circle",-1)])]),_:1})):h.raw.icon?(D(),U(W,{key:1,size:"small",class:"mr-2"},{default:P(()=>[j(Y(h.raw.icon),1)]),_:2},1024)):X("",!0),j(" "+Y(h.raw.label),1)])]),_:2},1040)]),selection:P(({item:s})=>[s.raw.hasError?(D(),U(W,{key:0,color:"error",size:"small",class:"mr-2"},{default:P(()=>[...r[4]||(r[4]=[j("mdi-alert-circle",-1)])]),_:1})):s.raw.icon?(D(),U(W,{key:1,size:"small",class:"mr-2"},{default:P(()=>[j(Y(s.raw.icon),1)]),_:2},1024)):X("",!0),j(" "+Y(s.raw.label),1)]),_:1},8,["model-value","items"])):X("",!0)])):X("",!0)}const Ve=ft(cr,[["render",pr]]);function hr(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[n,a]=t.split("/"),[o,p]=r.split("/");return n===o&&(a==="*"||a===p)}var fe,Ge;function mr(){if(Ge)return fe;Ge=1;class t{constructor(){this.max=1e3,this.map=new Map}get(n){const a=this.map.get(n);if(a!==void 0)return this.map.delete(n),this.map.set(n,a),a}delete(n){return this.map.delete(n)}set(n,a){if(!this.delete(n)&&a!==void 0){if(this.map.size>=this.max){const p=this.map.keys().next().value;this.delete(p)}this.map.set(n,a)}return this}}return fe=t,fe}var de,Fe;function Se(){if(Fe)return de;Fe=1;const t=Object.freeze({loose:!0}),r=Object.freeze({});return de=a=>a?typeof a!="object"?t:a:r,de}var re={exports:{}},pe,je;function Ce(){if(je)return pe;je=1;const t="2.0.0",r=256,n=Number.MAX_SAFE_INTEGER||9007199254740991,a=16,o=r-6;return pe={MAX_LENGTH:r,MAX_SAFE_COMPONENT_LENGTH:a,MAX_SAFE_BUILD_LENGTH:o,MAX_SAFE_INTEGER:n,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:t,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2},pe}var he,Ue;function ae(){if(Ue)return he;Ue=1;var t={};return he=typeof process=="object"&&t&&t.NODE_DEBUG&&/\bsemver\b/i.test(t.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{},he}var qe;function Pe(){return qe||(qe=1,(function(t,r){const{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:a,MAX_LENGTH:o}=Ce(),p=ae();r=t.exports={};const s=r.re=[],h=r.safeRe=[],i=r.src=[],v=r.safeSrc=[],e=r.t={};let c=0;const m="[a-zA-Z0-9-]",R=[["\\s",1],["\\d",o],[m,a]],O=G=>{for(const[k,V]of R)G=G.split(`${k}*`).join(`${k}{0,${V}}`).split(`${k}+`).join(`${k}{1,${V}}`);return G},b=(G,k,V)=>{const B=O(k),q=c++;p(G,q,k),e[G]=q,i[q]=k,v[q]=B,s[q]=new RegExp(k,V?"g":void 0),h[q]=new RegExp(B,V?"g":void 0)};b("NUMERICIDENTIFIER","0|[1-9]\\d*"),b("NUMERICIDENTIFIERLOOSE","\\d+"),b("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${m}*`),b("MAINVERSION",`(${i[e.NUMERICIDENTIFIER]})\\.(${i[e.NUMERICIDENTIFIER]})\\.(${i[e.NUMERICIDENTIFIER]})`),b("MAINVERSIONLOOSE",`(${i[e.NUMERICIDENTIFIERLOOSE]})\\.(${i[e.NUMERICIDENTIFIERLOOSE]})\\.(${i[e.NUMERICIDENTIFIERLOOSE]})`),b("PRERELEASEIDENTIFIER",`(?:${i[e.NONNUMERICIDENTIFIER]}|${i[e.NUMERICIDENTIFIER]})`),b("PRERELEASEIDENTIFIERLOOSE",`(?:${i[e.NONNUMERICIDENTIFIER]}|${i[e.NUMERICIDENTIFIERLOOSE]})`),b("PRERELEASE",`(?:-(${i[e.PRERELEASEIDENTIFIER]}(?:\\.${i[e.PRERELEASEIDENTIFIER]})*))`),b("PRERELEASELOOSE",`(?:-?(${i[e.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[e.PRERELEASEIDENTIFIERLOOSE]})*))`),b("BUILDIDENTIFIER",`${m}+`),b("BUILD",`(?:\\+(${i[e.BUILDIDENTIFIER]}(?:\\.${i[e.BUILDIDENTIFIER]})*))`),b("FULLPLAIN",`v?${i[e.MAINVERSION]}${i[e.PRERELEASE]}?${i[e.BUILD]}?`),b("FULL",`^${i[e.FULLPLAIN]}$`),b("LOOSEPLAIN",`[v=\\s]*${i[e.MAINVERSIONLOOSE]}${i[e.PRERELEASELOOSE]}?${i[e.BUILD]}?`),b("LOOSE",`^${i[e.LOOSEPLAIN]}$`),b("GTLT","((?:<|>)?=?)"),b("XRANGEIDENTIFIERLOOSE",`${i[e.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),b("XRANGEIDENTIFIER",`${i[e.NUMERICIDENTIFIER]}|x|X|\\*`),b("XRANGEPLAIN",`[v=\\s]*(${i[e.XRANGEIDENTIFIER]})(?:\\.(${i[e.XRANGEIDENTIFIER]})(?:\\.(${i[e.XRANGEIDENTIFIER]})(?:${i[e.PRERELEASE]})?${i[e.BUILD]}?)?)?`),b("XRANGEPLAINLOOSE",`[v=\\s]*(${i[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[e.XRANGEIDENTIFIERLOOSE]})(?:${i[e.PRERELEASELOOSE]})?${i[e.BUILD]}?)?)?`),b("XRANGE",`^${i[e.GTLT]}\\s*${i[e.XRANGEPLAIN]}$`),b("XRANGELOOSE",`^${i[e.GTLT]}\\s*${i[e.XRANGEPLAINLOOSE]}$`),b("COERCEPLAIN",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),b("COERCE",`${i[e.COERCEPLAIN]}(?:$|[^\\d])`),b("COERCEFULL",i[e.COERCEPLAIN]+`(?:${i[e.PRERELEASE]})?(?:${i[e.BUILD]})?(?:$|[^\\d])`),b("COERCERTL",i[e.COERCE],!0),b("COERCERTLFULL",i[e.COERCEFULL],!0),b("LONETILDE","(?:~>?)"),b("TILDETRIM",`(\\s*)${i[e.LONETILDE]}\\s+`,!0),r.tildeTrimReplace="$1~",b("TILDE",`^${i[e.LONETILDE]}${i[e.XRANGEPLAIN]}$`),b("TILDELOOSE",`^${i[e.LONETILDE]}${i[e.XRANGEPLAINLOOSE]}$`),b("LONECARET","(?:\\^)"),b("CARETTRIM",`(\\s*)${i[e.LONECARET]}\\s+`,!0),r.caretTrimReplace="$1^",b("CARET",`^${i[e.LONECARET]}${i[e.XRANGEPLAIN]}$`),b("CARETLOOSE",`^${i[e.LONECARET]}${i[e.XRANGEPLAINLOOSE]}$`),b("COMPARATORLOOSE",`^${i[e.GTLT]}\\s*(${i[e.LOOSEPLAIN]})$|^$`),b("COMPARATOR",`^${i[e.GTLT]}\\s*(${i[e.FULLPLAIN]})$|^$`),b("COMPARATORTRIM",`(\\s*)${i[e.GTLT]}\\s*(${i[e.LOOSEPLAIN]}|${i[e.XRANGEPLAIN]})`,!0),r.comparatorTrimReplace="$1$2$3",b("HYPHENRANGE",`^\\s*(${i[e.XRANGEPLAIN]})\\s+-\\s+(${i[e.XRANGEPLAIN]})\\s*$`),b("HYPHENRANGELOOSE",`^\\s*(${i[e.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[e.XRANGEPLAINLOOSE]})\\s*$`),b("STAR","(<|>)?=?\\s*\\*"),b("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),b("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")})(re,re.exports)),re.exports}var me,Me;function gr(){if(Me)return me;Me=1;const t=/^[0-9]+$/,r=(a,o)=>{if(typeof a=="number"&&typeof o=="number")return a===o?0:a<o?-1:1;const p=t.test(a),s=t.test(o);return p&&s&&(a=+a,o=+o),a===o?0:p&&!s?-1:s&&!p?1:a<o?-1:1};return me={compareIdentifiers:r,rcompareIdentifiers:(a,o)=>r(o,a)},me}var ge,He;function De(){if(He)return ge;He=1;const t=ae(),{MAX_LENGTH:r,MAX_SAFE_INTEGER:n}=Ce(),{safeRe:a,t:o}=Pe(),p=Se(),{compareIdentifiers:s}=gr(),h=(v,e)=>{const c=e.split(".");if(c.length>v.length)return!1;for(let m=0;m<c.length;m++)if(s(v[m],c[m])!==0)return!1;return!0};class i{constructor(e,c){if(c=p(c),e instanceof i){if(e.loose===!!c.loose&&e.includePrerelease===!!c.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>r)throw new TypeError(`version is longer than ${r} characters`);t("SemVer",e,c),this.options=c,this.loose=!!c.loose,this.includePrerelease=!!c.includePrerelease;const m=e.trim().match(c.loose?a[o.LOOSE]:a[o.FULL]);if(!m)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+m[1],this.minor=+m[2],this.patch=+m[3],this.major>n||this.major<0)throw new TypeError("Invalid major version");if(this.minor>n||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>n||this.patch<0)throw new TypeError("Invalid patch version");m[4]?this.prerelease=m[4].split(".").map(R=>{if(/^[0-9]+$/.test(R)){const O=+R;if(O>=0&&O<n)return O}return R}):this.prerelease=[],this.build=m[5]?m[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(t("SemVer.compare",this.version,this.options,e),!(e instanceof i)){if(typeof e=="string"&&e===this.version)return 0;e=new i(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof i||(e=new i(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof i||(e=new i(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let c=0;do{const m=this.prerelease[c],R=e.prerelease[c];if(t("prerelease compare",c,m,R),m===void 0&&R===void 0)return 0;if(R===void 0)return 1;if(m===void 0)return-1;if(m===R)continue;return s(m,R)}while(++c)}compareBuild(e){e instanceof i||(e=new i(e,this.options));let c=0;do{const m=this.build[c],R=e.build[c];if(t("build compare",c,m,R),m===void 0&&R===void 0)return 0;if(R===void 0)return 1;if(m===void 0)return-1;if(m===R)continue;return s(m,R)}while(++c)}inc(e,c,m){if(e.startsWith("pre")){if(!c&&m===!1)throw new Error("invalid increment argument: identifier is empty");if(c){const R=`-${c}`.match(this.options.loose?a[o.PRERELEASELOOSE]:a[o.PRERELEASE]);if(!R||R[1]!==c)throw new Error(`invalid identifier: ${c}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",c,m);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",c,m);break;case"prepatch":this.prerelease.length=0,this.inc("patch",c,m),this.inc("pre",c,m);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",c,m),this.inc("pre",c,m);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const R=Number(m)?1:0;if(this.prerelease.length===0)this.prerelease=[R];else{let O=this.prerelease.length;for(;--O>=0;)typeof this.prerelease[O]=="number"&&(this.prerelease[O]++,O=-2);if(O===-1){if(c===this.prerelease.join(".")&&m===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(R)}}if(c){let O=[c,R];if(m===!1&&(O=[c]),h(this.prerelease,c)){const b=this.prerelease[c.split(".").length];isNaN(b)&&(this.prerelease=O)}else this.prerelease=O}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}return ge=i,ge}var Ee,Xe;function Q(){if(Xe)return Ee;Xe=1;const t=De();return Ee=(n,a,o)=>new t(n,o).compare(new t(a,o)),Ee}var be,Be;function Er(){if(Be)return be;Be=1;const t=Q();return be=(n,a,o)=>t(n,a,o)===0,be}var ve,Je;function br(){if(Je)return ve;Je=1;const t=Q();return ve=(n,a,o)=>t(n,a,o)!==0,ve}var we,Ye;function vr(){if(Ye)return we;Ye=1;const t=Q();return we=(n,a,o)=>t(n,a,o)>0,we}var xe,We;function wr(){if(We)return xe;We=1;const t=Q();return xe=(n,a,o)=>t(n,a,o)>=0,xe}var ye,Ze;function xr(){if(Ze)return ye;Ze=1;const t=Q();return ye=(n,a,o)=>t(n,a,o)<0,ye}var _e,Ke;function yr(){if(Ke)return _e;Ke=1;const t=Q();return _e=(n,a,o)=>t(n,a,o)<=0,_e}var Re,Qe;function _r(){if(Qe)return Re;Qe=1;const t=Er(),r=br(),n=vr(),a=wr(),o=xr(),p=yr();return Re=(h,i,v,e)=>{switch(i){case"===":return typeof h=="object"&&(h=h.version),typeof v=="object"&&(v=v.version),h===v;case"!==":return typeof h=="object"&&(h=h.version),typeof v=="object"&&(v=v.version),h!==v;case"":case"=":case"==":return t(h,v,e);case"!=":return r(h,v,e);case">":return n(h,v,e);case">=":return a(h,v,e);case"<":return o(h,v,e);case"<=":return p(h,v,e);default:throw new TypeError(`Invalid operator: ${i}`)}},Re}var Ie,et;function Rr(){if(et)return Ie;et=1;const t=Symbol("SemVer ANY");class r{static get ANY(){return t}constructor(e,c){if(c=n(c),e instanceof r){if(e.loose===!!c.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),s("comparator",e,c),this.options=c,this.loose=!!c.loose,this.parse(e),this.semver===t?this.value="":this.value=this.operator+this.semver.version,s("comp",this)}parse(e){const c=this.options.loose?a[o.COMPARATORLOOSE]:a[o.COMPARATOR],m=e.match(c);if(!m)throw new TypeError(`Invalid comparator: ${e}`);this.operator=m[1]!==void 0?m[1]:"",this.operator==="="&&(this.operator=""),m[2]?this.semver=new h(m[2],this.options.loose):this.semver=t}toString(){return this.value}test(e){if(s("Comparator.test",e,this.options.loose),this.semver===t||e===t)return!0;if(typeof e=="string")try{e=new h(e,this.options)}catch{return!1}return p(e,this.operator,this.semver,this.options)}intersects(e,c){if(!(e instanceof r))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new i(e.value,c).test(this.value):e.operator===""?e.value===""?!0:new i(this.value,c).test(e.semver):(c=n(c),c.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!c.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||p(this.semver,"<",e.semver,c)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||p(this.semver,">",e.semver,c)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}}Ie=r;const n=Se(),{safeRe:a,t:o}=Pe(),p=_r(),s=ae(),h=De(),i=bt();return Ie}var $e,tt;function bt(){if(tt)return $e;tt=1;const t=/\s+/g;class r{constructor(l,g){if(g=o(g),l instanceof r)return l.loose===!!g.loose&&l.includePrerelease===!!g.includePrerelease?l:new r(l.raw,g);if(l instanceof p)return this.raw=l.value,this.set=[[l]],this.formatted=void 0,this;if(this.options=g,this.loose=!!g.loose,this.includePrerelease=!!g.includePrerelease,this.raw=l.trim().replace(t," "),this.set=this.raw.split("||").map(f=>this.parseRange(f.trim())).filter(f=>f.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const f=this.set[0];if(this.set=this.set.filter(x=>!k(x[0])),this.set.length===0)this.set=[f];else if(this.set.length>1){for(const x of this.set)if(x.length===1&&V(x[0])){this.set=[x];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let l=0;l<this.set.length;l++){l>0&&(this.formatted+="||");const g=this.set[l];for(let f=0;f<g.length;f++)f>0&&(this.formatted+=" "),this.formatted+=g[f].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(l){l=l.replace(G,"");const f=((this.options.includePrerelease&&O)|(this.options.loose&&b))+":"+l,x=a.get(f);if(x)return x;const d=this.options.loose,E=d?i[e.HYPHENRANGELOOSE]:i[e.HYPHENRANGE];l=l.replace(E,S(this.options.includePrerelease)),s("hyphen replace",l),l=l.replace(i[e.COMPARATORTRIM],c),s("comparator trim",l),l=l.replace(i[e.TILDETRIM],m),s("tilde trim",l),l=l.replace(i[e.CARETTRIM],R),s("caret trim",l);let y=l.split(" ").map(C=>q(C,this.options)).join(" ").split(/\s+/).map(C=>M(C,this.options));d&&(y=y.filter(C=>(s("loose invalid filter",C,this.options),!!C.match(i[e.COMPARATORLOOSE])))),s("range list",y);const I=new Map,T=y.map(C=>new p(C,this.options));for(const C of T){if(k(C))return[C];I.set(C.value,C)}I.size>1&&I.has("")&&I.delete("");const F=[...I.values()];return a.set(f,F),F}intersects(l,g){if(!(l instanceof r))throw new TypeError("a Range is required");return this.set.some(f=>B(f,g)&&l.set.some(x=>B(x,g)&&f.every(d=>x.every(E=>d.intersects(E,g)))))}test(l){if(!l)return!1;if(typeof l=="string")try{l=new h(l,this.options)}catch{return!1}for(let g=0;g<this.set.length;g++)if(A(this.set[g],l,this.options))return!0;return!1}}$e=r;const n=mr(),a=new n,o=Se(),p=Rr(),s=ae(),h=De(),{safeRe:i,src:v,t:e,comparatorTrimReplace:c,tildeTrimReplace:m,caretTrimReplace:R}=Pe(),{FLAG_INCLUDE_PRERELEASE:O,FLAG_LOOSE:b}=Ce(),G=new RegExp(v[e.BUILD],"g"),k=u=>u.value==="<0.0.0-0",V=u=>u.value==="",B=(u,l)=>{let g=!0;const f=u.slice();let x=f.pop();for(;g&&f.length;)g=f.every(d=>x.intersects(d,l)),x=f.pop();return g},q=(u,l)=>(u=u.replace(i[e.BUILD],""),s("comp",u,l),u=w(u,l),s("caret",u),u=te(u,l),s("tildes",u),u=L(u,l),s("xrange",u),u=Z(u,l),s("stars",u),u),N=u=>!u||u.toLowerCase()==="x"||u==="*",se=(u,l,g)=>N(u)&&!N(l)||N(l)&&g&&!N(g),te=(u,l)=>u.trim().split(/\s+/).map(g=>_(g,l)).join(" "),_=(u,l)=>{const g=l.loose?i[e.TILDELOOSE]:i[e.TILDE],f=l.includePrerelease?"-0":"";return u.replace(g,(x,d,E,y,I)=>{s("tilde",u,x,d,E,y,I);let T;return N(d)?T="":N(E)?T=`>=${d}.0.0${f} <${+d+1}.0.0-0`:N(y)?T=`>=${d}.${E}.0${f} <${d}.${+E+1}.0-0`:I?(s("replaceTilde pr",I),T=`>=${d}.${E}.${y}-${I} <${d}.${+E+1}.0-0`):T=`>=${d}.${E}.${y} <${d}.${+E+1}.0-0`,s("tilde return",T),T})},w=(u,l)=>u.trim().split(/\s+/).map(g=>$(g,l)).join(" "),$=(u,l)=>{s("caret",u,l);const g=l.loose?i[e.CARETLOOSE]:i[e.CARET],f=l.includePrerelease?"-0":"";return u.replace(g,(x,d,E,y,I)=>{s("caret",u,x,d,E,y,I);let T;return N(d)?T="":N(E)?T=`>=${d}.0.0${f} <${+d+1}.0.0-0`:N(y)?d==="0"?T=`>=${d}.${E}.0${f} <${d}.${+E+1}.0-0`:T=`>=${d}.${E}.0${f} <${+d+1}.0.0-0`:I?(s("replaceCaret pr",I),d==="0"?E==="0"?T=`>=${d}.${E}.${y}-${I} <${d}.${E}.${+y+1}-0`:T=`>=${d}.${E}.${y}-${I} <${d}.${+E+1}.0-0`:T=`>=${d}.${E}.${y}-${I} <${+d+1}.0.0-0`):(s("no pr"),d==="0"?E==="0"?T=`>=${d}.${E}.${y} <${d}.${E}.${+y+1}-0`:T=`>=${d}.${E}.${y} <${d}.${+E+1}.0-0`:T=`>=${d}.${E}.${y} <${+d+1}.0.0-0`),s("caret return",T),T})},L=(u,l)=>(s("replaceXRanges",u,l),u.split(/\s+/).map(g=>z(g,l)).join(" ")),z=(u,l)=>{u=u.trim();const g=l.loose?i[e.XRANGELOOSE]:i[e.XRANGE];return u.replace(g,(f,x,d,E,y,I)=>{if(s("xRange",u,f,x,d,E,y,I),se(d,E,y))return u;const T=N(d),F=T||N(E),C=F||N(y),ee=C;return x==="="&&ee&&(x=""),I=l.includePrerelease?"-0":"",T?x===">"||x==="<"?f="<0.0.0-0":f="*":x&&ee?(F&&(E=0),y=0,x===">"?(x=">=",F?(d=+d+1,E=0,y=0):(E=+E+1,y=0)):x==="<="&&(x="<",F?d=+d+1:E=+E+1),x==="<"&&(I="-0"),f=`${x+d}.${E}.${y}${I}`):F?f=`>=${d}.0.0${I} <${+d+1}.0.0-0`:C&&(f=`>=${d}.${E}.0${I} <${d}.${+E+1}.0-0`),s("xRange return",f),f})},Z=(u,l)=>(s("replaceStars",u,l),u.trim().replace(i[e.STAR],"")),M=(u,l)=>(s("replaceGTE0",u,l),u.trim().replace(i[l.includePrerelease?e.GTE0PRE:e.GTE0],"")),S=u=>(l,g,f,x,d,E,y,I,T,F,C,ee)=>(N(f)?g="":N(x)?g=`>=${f}.0.0${u?"-0":""}`:N(d)?g=`>=${f}.${x}.0${u?"-0":""}`:E?g=`>=${g}`:g=`>=${g}${u?"-0":""}`,N(T)?I="":N(F)?I=`<${+T+1}.0.0-0`:N(C)?I=`<${T}.${+F+1}.0-0`:ee?I=`<=${T}.${F}.${C}-${ee}`:u?I=`<${T}.${F}.${+C+1}-0`:I=`<=${I}`,`${g} ${I}`.trim()),A=(u,l,g)=>{for(let f=0;f<u.length;f++)if(!u[f].test(l))return!1;if(l.prerelease.length&&!g.includePrerelease){for(let f=0;f<u.length;f++)if(s(u[f].semver),u[f].semver!==p.ANY&&u[f].semver.prerelease.length>0){const x=u[f].semver;if(x.major===l.major&&x.minor===l.minor&&x.patch===l.patch)return!0}return!1}return!0};return $e}var Te,rt;function Ir(){if(rt)return Te;rt=1;const t=bt();return Te=(n,a,o)=>{try{a=new t(a,o)}catch{return!1}return a.test(n)},Te}var $r=Ir();const Tr=Ct($r);class Lr{constructor(){this._cache=new Map}resolve({name:r,range:n,version:a,load:o}){const p=this._cache.get(r)??[],s=p.find(i=>Tr(i.version,n));if(s)return s.promise;const h={version:a,promise:null};return h.promise=Promise.resolve().then(o).catch(i=>{const v=this._cache.get(r),e=v?.indexOf(h)??-1;throw e!==-1&&v.splice(e,1),i}),p.push(h),this._cache.set(r,p),h.promise}}function ze(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[n,a]=t.split("/"),[o,p]=r.split("/");return n===o&&(a==="*"||a===p)}function vt(t,r){t.innerHTML="";const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 16px; text-align: center; color: #b00020; font: 14px/1.4 sans-serif;";const a=document.createElement("div");a.textContent=r;const o=document.createElement("div");o.style.cssText="margin-top: 12px;",o.textContent="See the browser console for details.",n.append(a,o),t.appendChild(n)}const Or=`/* required styles */\r
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
`;let Le=null,it=!1;function Nr(t){if(it)return;const r=document.createElement("style");r.textContent=t,document.head.appendChild(r),it=!0}function Ar(){return Le||(Nr(Or+kr),Le=Promise.all([J(()=>import("./leaflet-src.js").then(t=>t.l),__vite__mapDeps([0,1])),J(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),J(()=>import("./marker-icon.js"),[]),J(()=>import("./marker-icon-2x.js"),[]),J(()=>import("./marker-shadow.js"),[])]).then(([{default:t},{createJsonLDGeoJSONLayer:r},n,a,o])=>(delete t.Icon.Default.prototype._getIconUrl,t.Icon.Default.mergeOptions({iconUrl:n.default,iconRetinaUrl:a.default,shadowUrl:o.default}),{L:t,createJsonLDGeoJSONLayer:r}))),Le}function Sr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry:t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry!=null):!1}class Cr{static supportedTypes=nt;static viewName="Map view";static icon="mdi-map";constructor(r,n={}){this.candidates=r,this.bblock=n.bblock??null,this.viewerConfig=n.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const r=this.candidates.find(n=>{if(!n.type||!n.content||!nt.some(a=>ze(a,n.type)))return!1;try{return Sr(JSON.parse(n.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,this._mount(r).catch(n=>{console.error("GeoJsonMapPlugin: init failed",n),this._el===r&&(this.destroy(r),vt(r,`Failed to render this map view (${n.message}).`))})}async _mount(r){const n=this._pickCandidate();if(!n)return;const a=JSON.parse(n.content),{L:o,createJsonLDGeoJSONLayer:p}=await Ar();if(this._el!==r)return;const s=o.map(r,{attributionControl:!1,maxZoom:22});o.control.attribution().addTo(s).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(s),this._map=s;const i=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:v,bblocksFallbackSparqlEndpoints:e}=this.viewerConfig,c={};v&&(c.fallbackRainbowInstances=v),e&&(c.fallbackSparqlEndpoints=e);try{const m=(await p(o,a,{ldContext:i,augmentOptions:c,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(s);this._layer=m;const R=m.getBounds();R.isValid()?s.fitBounds(R,{padding:[20,20]}):s.setView([0,0],2)}catch(m){console.warn("GeoJsonMapPlugin: error building layer",m),s.setView([0,0],2)}}destroy(r){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===r&&(this._el=null)}}function wt(t){return!Array.isArray(t)||!t.length?!1:typeof t[0]=="number"?t.length>=3:t.some(wt)}function ne(t){return!t?.type||!t.coordinates?!1:wt(t.coordinates)}function Pr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry&&ne(t.geometry):t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry&&ne(r.geometry)):t.type==="GeometryCollection"?Array.isArray(t.geometries)&&t.geometries.some(ne):t.coordinates?ne(t):!1}const ot=["application/geo+json","application/json","application/ld+json"],oe="0.184.0",at=()=>J(()=>import(`https://esm.sh/three@${oe}`),[]),Dr=()=>J(()=>import(`https://esm.sh/three@${oe}/examples/jsm/controls/OrbitControls.js`),[]);function zr(t){return t?.depResolver?t.depResolver.resolve({name:"three",range:`^${oe}`,version:oe,load:at}):at()}const st="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function lt(t){return t?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Vr={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Gr{static supportedTypes=ot;static viewName="3D view";static icon="mdi-cube-outline";constructor(r,n={}){this.candidates=r,this._context=n,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(n=>{if(!n.type||!n.content||!ot.some(a=>ze(a,n.type)))return!1;try{return Pr(JSON.parse(n.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,r.style.position="relative",this._mount(r).catch(n=>{console.error("ThreeDPlugin: init failed",n),this._el===r&&this._showError(r,`Failed to render this 3D view (${n.message}).`)})}_showError(r,n){this.destroy(r),vt(r,n)}async _mount(r){const n=this._pickCandidate();if(!n)return;const a=JSON.parse(n.content),[o,{OrbitControls:p}]=await Promise.all([zr(this._context),Dr()]);if(this._el!==r)return;this._THREE=o;const s=document.createElement("div");s.style.cssText="height: 100%; width: 100%;",r.appendChild(s);const h=s.clientWidth||600,i=s.clientHeight||400,v=new o.Scene;v.background=new o.Color(11383217);const e=new o.PerspectiveCamera(60,h/i,.001,1e4);e.up.set(0,0,1),this._camera=e;const c=new o.WebGLRenderer({antialias:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(h,i),s.appendChild(c.domElement),this._renderer=c;const m=new p(e,c.domElement);m.enableDamping=!0,m.dampingFactor=.05,this._controls=m,v.add(new o.AmbientLight(16777215,.5));const R=new o.DirectionalLight(16777215,.8);R.position.set(100,100,100),v.add(R);const O=new o.DirectionalLight(16777215,.3);O.position.set(-100,-100,-100),v.add(O);const b=new o.DirectionalLight(16777215,.3);if(b.position.set(0,-100,0),v.add(b),this._gridHelper=new o.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,v.add(this._gridHelper),v.add(new o.AxesHelper(1)),await this._buildGeoJsonScene(v,a),this._el!==r)return;this._fitCamera(o),this._buildControls(r),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!s.isConnected)return;const k=s.clientWidth,V=s.clientHeight;!k||!V||(e.aspect=k/V,e.updateProjectionMatrix(),c.setSize(k,V))}),this._resizeObserver.observe(s),this._animating=!0;const G=()=>{if(this._animating){this._animFrameId=requestAnimationFrame(G);try{m.update(),c.render(v,e)}catch(k){console.error("ThreeDPlugin: render loop failed",k),this._showError(r,`An error occurred while rendering this 3D view (${k.message}).`)}}};G()}async _buildGeoJsonScene(r,n){const{buildGeoJson3DObjects:a}=await J(async()=>{const{buildGeoJson3DObjects:p}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:p}},[]),o=a(n,this._THREE);o.meshes.forEach(p=>{p.material.wireframe=this._wireframe,this._solidMeshes.push(p)}),o.lines.forEach(p=>{p.visible=this._showEdges,this._solidEdges.push(p)}),o.points.forEach(p=>{p.visible=this._showVertices,this._solidVertices.push(p)}),o.objects.forEach(p=>r.add(p))}_fitCamera(r){const n=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!n.length)return;const a=new r.Box3;if(n.forEach(i=>a.expandByObject(i)),a.isEmpty())return;const o=a.getCenter(new r.Vector3),p=a.getSize(new r.Vector3),h=Math.max(p.x,p.y,p.z)*2;this._camera.position.set(o.x-h*.7,o.y-h*.7,o.z+h*.7),this._camera.near=h*.001,this._camera.far=h*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(o),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(r){const n=document.createElement("div");n.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const a=(o,p,s,h)=>{const i=document.createElement("button");return i.type="button",i.title=p,i.innerHTML=Vr[o],i.style.cssText=st+lt(h?.()),i.addEventListener("click",()=>{s(),i.style.cssText=st+lt(h?.())}),n.appendChild(i),i};a("reset","Reset camera",()=>this._resetCamera()),a("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),a("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(o=>{o.material.wireframe=this._wireframe})},()=>this._wireframe),a("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(o=>{o.visible=this._showEdges})},()=>this._showEdges),a("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(o=>{o.visible=this._showVertices})},()=>this._showVertices),r.appendChild(n),this._controlsEl=n}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(r){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidEdges.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidVertices.forEach(n=>{n.children?.forEach(a=>{a.geometry?.dispose(),a.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===r&&(this._el=null),r.innerHTML=""}}const ct=["text/html","application/xhtml+xml"],Fr=/^https?:\/\//;class jr{static supportedTypes=ct;static viewName="Web view";static icon="mdi-web";constructor(r){this.candidates=r,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(n=>n.type&&n.url&&ct.some(a=>ze(a,n.type))&&Fr.test(n.url));return this._candidate=r??null,this._candidate}render(r){this._el=r;const n=this._pickCandidate();if(!n)return;r.style.overflow="auto";const a=document.createElement("iframe");a.src=n.url,a.setAttribute("sandbox","allow-same-origin"),a.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const o=a.contentDocument,p=o?.documentElement?.scrollHeight||o?.body?.scrollHeight;p&&(a.style.height=`${p}px`)}catch{}},a.addEventListener("load",this._onLoad),r.appendChild(a),this._iframe=a}destroy(r){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===r&&(this._el=null),r.innerHTML=""}}const Ur=[Cr,Gr,jr].map(t=>({PluginClass:t,weight:1/0}));let Oe=null;const qr=new Lr;function Mr(){return Oe||(Oe=dt.registerPromises.local.promise.then(async t=>{const r=t?.viewer?.viewPlugins??[],n=await Promise.all(r.map(async a=>{try{const o=await import(a.url);return(Array.isArray(a.export)&&a.export.length?a.export:[a.export||null]).map(s=>{const h=s?o[s]:o.default;return h?{PluginClass:h,weight:a.weight??0}:(console.warn(`View plugin has no export named "${s??"default"}": ${a.url}`),null)})}catch(o){return console.warn(`View plugin failed to load: ${a.url}`,o),[]}}));return[...Ur,...n.flat().filter(Boolean)]})),Oe}function Hr(){async function t(r,n={}){if(!r?.length)return[];const a={...n,viewerConfig:xt.config,depResolver:qr},o=await Mr(),p=[];for(const{PluginClass:s,weight:h}of o){const i=s.supportedTypes??[];if(!r.some(e=>e.type&&i.some(c=>hr(c,e.type))))continue;if(typeof s.viewName!="string"||!s.viewName.trim()){console.warn(`View plugin has no static viewName, skipping: ${s.name}`);continue}let v;try{if(v=Pt(new s(r,a)),!(v.matches?.()??!0))continue}catch(e){console.warn(`View plugin threw while matching: ${s.name}`,e);continue}p.push({instance:v,weight:h,PluginClass:s})}return p}return{matchPlugins:t}}function Xr(t,r=null){return{type:t.language?.mimeType??t.language?.id??null,content:t.code??r?.contents??null,url:t.url??null,label:t.language?.label??t.language?.id??"unknown"}}function sn(t,r,n=null){return{type:t.outputs?.mediaTypes?.[0]?.mimeType??null,content:n?.contents??null,url:r?.url??null,label:t.id}}const Br=["href","onClick"],ut=1500,Jr=15e3,Yr={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(t,{emit:r}){const{matchPlugins:n}=Hr(),a=Ft(()=>J(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]))),o=t,p=r,s=yt(),h=Dt(),i=zt(),v=ce([]),e=ce([]),c=ce([]);function m(_){return _.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function R(_){return _.find(w=>!w.isViewPlugin)?.id}async function O(){const _=o.bblock;if(!o.bblock?.examples?.length){v.value=[],e.value=[],c.value=[];return}const w=[],$=[],L=[];if(o.bblock.examples.forEach(M=>{M.snippets?.forEach(S=>{let A;typeof S.language=="object"?A=S.language:(S.language||(S.language="plaintext"),A=ue[S.language],typeof A=="string"&&(A=ue[A]),A||(A={id:S.language,order:999,label:S.language}),S.language=A),(jt.has(A.id)||A.mimeType||!ue[A.id])&&S.code==null&&S.url&&!or(S,nr)&&L.push(dt.fetchDocumentByUrl(o.bblock,S.url,{maxSize:rr}).then(l=>{S.code=l}).catch(()=>{}))})}),await Promise.all(L),o.bblock!==_||(o.bblock.examples.forEach((M,S)=>{const A=M.snippets?.map(l=>l.language)??[];if(o.bblock.transforms?.length){const l=[];o.bblock.transforms.forEach(f=>{M.snippets?.forEach((x,d)=>{const E=x.transformResults?.[f.id];if(E!=null){const y=typeof E=="string";l.push({transform:f,snippet:x,snippetIdx:d,url:y?E:E.url||null,success:y?!0:E.success??!0,stderr:y?null:E.stderr||null,profilesValidation:y?null:E.profilesValidation||null})}})});const g={};l.forEach(f=>{g[f.transform.id]=(g[f.transform.id]||0)+1}),l.sort((f,x)=>{const d=f.transform.id.localeCompare(x.transform.id);return d!==0?d:f.snippetIdx-x.snippetIdx}),l.forEach(f=>{const d=g[f.transform.id]>1?`${f.transform.id} (${f.snippet.language?.label||f.snippetIdx+1})`:f.transform.id;A.push({id:`transform:${f.snippetIdx}-${f.transform.id}`,order:9999,label:d,icon:"mdi-file-swap",hasError:!f.success,isTransform:!0,transform:f.transform,transformEntry:f})})}const u=(M.snippets??[]).map(l=>Xr(l));$.push(n(u,{bblock:o.bblock}).then(l=>{const g=new Map;l.forEach(({instance:f,weight:x,PluginClass:d})=>{const E=m(d.viewName??d.name??"")||"plugin",y=g.get(E)??0;g.set(E,y+1);const I=y===0?E:`${E}-${y+1}`;A.push({id:`plugin:${I}`,order:-.5-(x??0)/1e6,label:d.viewName??d.name??"Custom view",icon:d.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:f})})})),w[S]=A}),await Promise.all($),o.bblock!==_))return;const z=[],Z=[];w.forEach((M,S)=>{M.sort((A,u)=>A.order===u.order?A.label.localeCompare(u.label):A.order-u.order),Z.push(S),z[S]=R(M)}),v.value=w,e.value=z,c.value=Z,te(),V()}function b(_){const w=document.getElementById(`example-panel-${_.idx}`);if(!w){console.warn(`scrollToExample: no panel found for example index ${_.idx}`);return}const $=w.getBoundingClientRect().top,L=document.querySelector("header").offsetHeight,z=window.scrollY+$-L;Math.abs(z-window.scrollY)<2||window.scrollTo(0,z)}function G(_){const w=/^example-(\d+)$/.exec(_?.[0]??"");return w?{idx:parseInt(w[1],10)-1,language:_[1]||null}:null}function k(_,w){const $=[`example-${_+1}`];return w&&$.push(w),{name:"BuildingBlock",params:{id:o.bblock.itemIdentifier,section:"examples",rest:$}}}async function V(){if(!o.active)return;const _=G(h.params.rest);if(!_||!o.bblock?.examples?.[_.idx])return;const{idx:w,language:$}=_;c.value.includes(w)||c.value.push(w),$&&v.value[w]?.some(L=>L.id===$)?e.value[w]=$:e.value[w]=R(v.value[w]??[]),await Gt(),q(w)}let B=null;function q(_){B?.cleanup();let w;const $=()=>{z.disconnect(),clearTimeout(w),clearTimeout(Z),window.removeEventListener("wheel",$),window.removeEventListener("touchmove",$),window.removeEventListener("keydown",$),B=null};window.addEventListener("wheel",$,{passive:!0}),window.addEventListener("touchmove",$,{passive:!0}),window.addEventListener("keydown",$);const L=Rt(()=>b({idx:_}),50),z=new ResizeObserver(()=>{L(),clearTimeout(w),w=setTimeout($,ut)});z.observe(document.body),w=setTimeout($,ut);const Z=setTimeout($,Jr);B={cleanup:$},b({idx:_})}le(()=>h.params.rest,V);function N(_){const w=i.resolve(k(_,e.value[_]));return window.location.origin+w.href}function se(_){_t(N(_))}function te(){o.active&&o.bblock?.examples?.length?s.setItems(o.bblock.examples.map((_,w)=>({title:_.title,idx:w,to:k(w,null)})),b):s.clearItems()}return le(()=>o.bblock,O,{immediate:!0}),le(()=>o.active,_=>{te(),_&&V()}),(_,w)=>(D(),K("div",null,[t.bblock.semanticUplift?.additionalSteps?.length?(D(),U(Zt,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:P(()=>[w[3]||(w[3]=j(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),Ne("a",{href:"#",onClick:w[0]||(w[0]=ie($=>p("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),w[4]||(w[4]=j(" for more information. ",-1))]),_:1})):X("",!0),H(tr,{multiple:"",modelValue:c.value,"onUpdate:modelValue":w[2]||(w[2]=$=>c.value=$)},{default:P(()=>[(D(!0),K(ke,null,ht(t.bblock.examples,($,L)=>(D(),K(ke,{key:L},[$.content?.length||$.snippets?.length?(D(),U(Kt,{key:0,value:L,id:`example-panel-${L}`},{default:P(()=>[H(Qt,null,{default:P(()=>[Ne("a",{class:"example-copy-link",href:N(L),title:"Copy link to this example",onClick:ie(z=>se(L),["stop","prevent"])},[H(W,null,{default:P(()=>[...w[5]||(w[5]=[j("mdi-link-variant",-1)])]),_:1})],8,Br),j(" "+Y($.title)+" ",1),H(Jt),_.$vuetify.display.mdAndUp?(D(),U(Ve,{key:0,onClick:w[1]||(w[1]=ie(()=>{},["stop"])),variant:_.$vuetify.display.lgAndUp&&v.value[L]?.length<5?"buttons":"dropdown",modelValue:e.value[L],"onUpdate:modelValue":z=>e.value[L]=z,languages:v.value[L]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):X("",!0)]),_:2},1024),H(er,null,{default:P(()=>[H(Vt(a),{bblock:t.bblock,example:$,language:v.value[L]?.find(z=>z.id===e.value[L]),"source-files-url":t.bblock.sourceFiles},mt({_:2},[_.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:P(()=>[H(Ve,{modelValue:e.value[L],"onUpdate:modelValue":z=>e.value[L]=z,languages:v.value[L],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):X("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Wr=ft(Yr,[["__scopeId","data-v-ffce95d8"]]),ln=Object.freeze(Object.defineProperty({__proto__:null,default:Wr},Symbol.toStringTag,{value:"Module"}));export{ln as B,nr as M,rr as a,an as b,ir as i,sn as t,Hr as u};
