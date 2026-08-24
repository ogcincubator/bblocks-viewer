const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/CopyToClipboardButton.js","assets/VTooltip.js","assets/VTooltip.css","assets/VDialog.js","assets/VDialog.css","assets/CopyToClipboardButton.css","assets/TransformInfo.js","assets/BuildingBlock.js","assets/VMenu.js","assets/VMenu.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ut,a as Y,c as yt,b as ft,u as _t,d as Rt}from"./index.js";import{H as dt,Y as Tt,n as B,v as It,S as pt,E as $t,a2 as Lt,T as Ot,o as z,k as K,c as q,w as V,aE as kt,p as X,F as ke,x as ht,u as oe,aa as mt,q as M,t as Z,O as Nt,l as gt,j as At,bK as St,bJ as Ct,aA as Pt,y as le,a9 as Dt,_ as zt,C as ce,az as Vt}from"./vendor.js";import{k as ue,g as Gt}from"./mime-types.js";import{r as Ft,A as jt,s as Ut,w as qt,a as Mt,c as Ht,d as Xt}from"./VList.js";import{m as Bt,q as W}from"./VCard.js";import{g as Jt}from"./VSelect.js";import{a as Yt}from"./CopyToClipboardButton.js";import{V as Wt}from"./BuildingBlock.js";import{a as Zt,c as Kt,b as Qt,V as er}from"./VExpansionPanels.js";const Ne=200*1024,tr=10*1024*1024,rr=1024*1024;function nr(t,r=Ne){return typeof t=="number"&&t>r}function Et(t){return typeof t=="string"?new Blob([t]).size:0}function sn(t,r=Ne){return typeof t!="string"||Et(t)<=r?{text:t,truncated:!1}:{text:t.slice(0,r),truncated:!0}}function ir(t,r=Ne){return t?nr(t.sizeBytes,r)?!0:Et(t.code)>r:!1}const bt=Symbol.for("vuetify:v-item-group"),or=$t({...Ot(),...jt({selectedClass:"v-item--selected"}),...Bt(),...Lt()},"VItemGroup"),sr=dt()({name:"VItemGroup",props:or(),emits:{"update:modelValue":t=>!0},setup(t,r){let{slots:n}=r;const{themeClasses:s}=Tt(t),{isSelected:o,select:p,next:a,prev:h,selected:i}=Ft(t,bt);return()=>B(t.tag,{class:pt(["v-item-group",s.value,t.class]),style:It(t.style)},{default:()=>[n.default?.({isSelected:o,select:p,next:a,prev:h,selected:i.value})]})}}),ar=dt()({name:"VItem",props:qt(),emits:{"group:selected":t=>!0},setup(t,r){let{slots:n}=r;const{isSelected:s,select:o,toggle:p,selectedClass:a,value:h,disabled:i}=Ut(t,bt);return()=>n.default?.({isSelected:s.value,selectedClass:a.value,select:o,toggle:p,value:h.value,disabled:i.value})}}),lr={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:t=>["buttons","dropdown"].includes(t)}},emits:["update:modelValue"]},cr={key:0,class:"language-tabs"},ur={key:0,class:"mr-2"},fr={class:"d-flex align-center"},dr={key:0,class:"mr-1"};function pr(t,r,n,s,o,p){return n.languages?.length?(z(),K("div",cr,[n.variant==="buttons"?(z(),q(sr,{key:0,"model-value":n.modelValue,"onUpdate:modelValue":r[0]||(r[0]=a=>t.$emit("update:modelValue",a)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:V(()=>[t.$slots.preText?(z(),K("div",ur,[kt(t.$slots,"pre-text")])):X("",!0),(z(!0),K(ke,null,ht(n.languages,a=>(z(),q(ar,{key:a.id,value:a.id},{default:V(({isSelected:h,toggle:i})=>[B(Mt,{color:h?"primary":"default",onClick:oe(i,["stop"]),class:pt(["mx-1 mb-1",{"ml-4":a.isTransform}])},mt({default:V(()=>[M(" "+Z(a.label),1)]),_:2},[a.isTransform||a.icon||a.hasError?{name:"prepend",fn:V(()=>[a.isTransform?(z(),q(W,{key:0,size:"small",class:"mr-n1"},{default:V(()=>[...r[2]||(r[2]=[M("mdi-arrow-right-thin",-1)])]),_:1})):X("",!0),a.hasError?(z(),q(W,{key:1,color:"error",size:"small"},{default:V(()=>[...r[3]||(r[3]=[M("mdi-alert-circle",-1)])]),_:1})):a.icon?(z(),q(W,{key:2,size:"small"},{default:V(()=>[M(Z(a.icon),1)]),_:2},1024)):X("",!0)]),key:"0"}:void 0]),1032,["color","onClick","class"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):X("",!0),n.variant==="dropdown"?(z(),q(Jt,{key:1,"model-value":n.modelValue,"onUpdate:modelValue":r[1]||(r[1]=a=>t.$emit("update:modelValue",a)),items:n.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language","menu-props":{maxHeight:500}},{item:V(({props:a,item:h})=>[B(Ht,Nt(a,{class:{"pl-6":h.raw.isTransform}}),{title:V(()=>[gt("span",fr,[h.raw.isTransform?(z(),K("span",dr,"⤷")):X("",!0),h.raw.hasError?(z(),q(W,{key:1,color:"error",size:"small",class:"mr-2"},{default:V(()=>[...r[4]||(r[4]=[M("mdi-alert-circle",-1)])]),_:1})):h.raw.icon?(z(),q(W,{key:2,size:"small",class:"mr-2"},{default:V(()=>[M(Z(h.raw.icon),1)]),_:2},1024)):X("",!0),M(" "+Z(h.raw.label),1)])]),_:2},1040,["class"])]),selection:V(({item:a})=>[a.raw.hasError?(z(),q(W,{key:0,color:"error",size:"small",class:"mr-2"},{default:V(()=>[...r[5]||(r[5]=[M("mdi-alert-circle",-1)])]),_:1})):a.raw.icon?(z(),q(W,{key:1,size:"small",class:"mr-2"},{default:V(()=>[M(Z(a.raw.icon),1)]),_:2},1024)):X("",!0),M(" "+Z(a.raw.isTransform?a.raw.selectionLabel:a.raw.label),1)]),_:1},8,["model-value","items"])):X("",!0)])):X("",!0)}const ze=ut(lr,[["render",pr]]);function hr(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[n,s]=t.split("/"),[o,p]=r.split("/");return n===o&&(s==="*"||s===p)}var fe,Ve;function mr(){if(Ve)return fe;Ve=1;class t{constructor(){this.max=1e3,this.map=new Map}get(n){const s=this.map.get(n);if(s!==void 0)return this.map.delete(n),this.map.set(n,s),s}delete(n){return this.map.delete(n)}set(n,s){if(!this.delete(n)&&s!==void 0){if(this.map.size>=this.max){const p=this.map.keys().next().value;this.delete(p)}this.map.set(n,s)}return this}}return fe=t,fe}var de,Ge;function Ae(){if(Ge)return de;Ge=1;const t=Object.freeze({loose:!0}),r=Object.freeze({});return de=s=>s?typeof s!="object"?t:s:r,de}var ne={exports:{}},pe,Fe;function Se(){if(Fe)return pe;Fe=1;const t="2.0.0",r=256,n=Number.MAX_SAFE_INTEGER||9007199254740991,s=16,o=r-6;return pe={MAX_LENGTH:r,MAX_SAFE_COMPONENT_LENGTH:s,MAX_SAFE_BUILD_LENGTH:o,MAX_SAFE_INTEGER:n,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:t,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2},pe}var he,je;function ae(){if(je)return he;je=1;var t={};return he=typeof process=="object"&&t&&t.NODE_DEBUG&&/\bsemver\b/i.test(t.NODE_DEBUG)?(...n)=>console.error("SEMVER",...n):()=>{},he}var Ue;function Ce(){return Ue||(Ue=1,(function(t,r){const{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:s,MAX_LENGTH:o}=Se(),p=ae();r=t.exports={};const a=r.re=[],h=r.safeRe=[],i=r.src=[],v=r.safeSrc=[],e=r.t={};let c=0;const m="[a-zA-Z0-9-]",R=[["\\s",1],["\\d",o],[m,s]],N=F=>{for(const[S,j]of R)F=F.split(`${S}*`).join(`${S}{0,${j}}`).split(`${S}+`).join(`${S}{1,${j}}`);return F},b=(F,S,j)=>{const J=N(S),H=c++;p(F,H,S),e[F]=H,i[H]=S,v[H]=J,a[H]=new RegExp(S,j?"g":void 0),h[H]=new RegExp(J,j?"g":void 0)};b("NUMERICIDENTIFIER","0|[1-9]\\d*"),b("NUMERICIDENTIFIERLOOSE","\\d+"),b("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${m}*`),b("MAINVERSION",`(${i[e.NUMERICIDENTIFIER]})\\.(${i[e.NUMERICIDENTIFIER]})\\.(${i[e.NUMERICIDENTIFIER]})`),b("MAINVERSIONLOOSE",`(${i[e.NUMERICIDENTIFIERLOOSE]})\\.(${i[e.NUMERICIDENTIFIERLOOSE]})\\.(${i[e.NUMERICIDENTIFIERLOOSE]})`),b("PRERELEASEIDENTIFIER",`(?:${i[e.NONNUMERICIDENTIFIER]}|${i[e.NUMERICIDENTIFIER]})`),b("PRERELEASEIDENTIFIERLOOSE",`(?:${i[e.NONNUMERICIDENTIFIER]}|${i[e.NUMERICIDENTIFIERLOOSE]})`),b("PRERELEASE",`(?:-(${i[e.PRERELEASEIDENTIFIER]}(?:\\.${i[e.PRERELEASEIDENTIFIER]})*))`),b("PRERELEASELOOSE",`(?:-?(${i[e.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${i[e.PRERELEASEIDENTIFIERLOOSE]})*))`),b("BUILDIDENTIFIER",`${m}+`),b("BUILD",`(?:\\+(${i[e.BUILDIDENTIFIER]}(?:\\.${i[e.BUILDIDENTIFIER]})*))`),b("FULLPLAIN",`v?${i[e.MAINVERSION]}${i[e.PRERELEASE]}?${i[e.BUILD]}?`),b("FULL",`^${i[e.FULLPLAIN]}$`),b("LOOSEPLAIN",`[v=\\s]*${i[e.MAINVERSIONLOOSE]}${i[e.PRERELEASELOOSE]}?${i[e.BUILD]}?`),b("LOOSE",`^${i[e.LOOSEPLAIN]}$`),b("GTLT","((?:<|>)?=?)"),b("XRANGEIDENTIFIERLOOSE",`${i[e.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),b("XRANGEIDENTIFIER",`${i[e.NUMERICIDENTIFIER]}|x|X|\\*`),b("XRANGEPLAIN",`[v=\\s]*(${i[e.XRANGEIDENTIFIER]})(?:\\.(${i[e.XRANGEIDENTIFIER]})(?:\\.(${i[e.XRANGEIDENTIFIER]})(?:${i[e.PRERELEASE]})?${i[e.BUILD]}?)?)?`),b("XRANGEPLAINLOOSE",`[v=\\s]*(${i[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${i[e.XRANGEIDENTIFIERLOOSE]})(?:${i[e.PRERELEASELOOSE]})?${i[e.BUILD]}?)?)?`),b("XRANGE",`^${i[e.GTLT]}\\s*${i[e.XRANGEPLAIN]}$`),b("XRANGELOOSE",`^${i[e.GTLT]}\\s*${i[e.XRANGEPLAINLOOSE]}$`),b("COERCEPLAIN",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),b("COERCE",`${i[e.COERCEPLAIN]}(?:$|[^\\d])`),b("COERCEFULL",i[e.COERCEPLAIN]+`(?:${i[e.PRERELEASE]})?(?:${i[e.BUILD]})?(?:$|[^\\d])`),b("COERCERTL",i[e.COERCE],!0),b("COERCERTLFULL",i[e.COERCEFULL],!0),b("LONETILDE","(?:~>?)"),b("TILDETRIM",`(\\s*)${i[e.LONETILDE]}\\s+`,!0),r.tildeTrimReplace="$1~",b("TILDE",`^${i[e.LONETILDE]}${i[e.XRANGEPLAIN]}$`),b("TILDELOOSE",`^${i[e.LONETILDE]}${i[e.XRANGEPLAINLOOSE]}$`),b("LONECARET","(?:\\^)"),b("CARETTRIM",`(\\s*)${i[e.LONECARET]}\\s+`,!0),r.caretTrimReplace="$1^",b("CARET",`^${i[e.LONECARET]}${i[e.XRANGEPLAIN]}$`),b("CARETLOOSE",`^${i[e.LONECARET]}${i[e.XRANGEPLAINLOOSE]}$`),b("COMPARATORLOOSE",`^${i[e.GTLT]}\\s*(${i[e.LOOSEPLAIN]})$|^$`),b("COMPARATOR",`^${i[e.GTLT]}\\s*(${i[e.FULLPLAIN]})$|^$`),b("COMPARATORTRIM",`(\\s*)${i[e.GTLT]}\\s*(${i[e.LOOSEPLAIN]}|${i[e.XRANGEPLAIN]})`,!0),r.comparatorTrimReplace="$1$2$3",b("HYPHENRANGE",`^\\s*(${i[e.XRANGEPLAIN]})\\s+-\\s+(${i[e.XRANGEPLAIN]})\\s*$`),b("HYPHENRANGELOOSE",`^\\s*(${i[e.XRANGEPLAINLOOSE]})\\s+-\\s+(${i[e.XRANGEPLAINLOOSE]})\\s*$`),b("STAR","(<|>)?=?\\s*\\*"),b("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),b("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")})(ne,ne.exports)),ne.exports}var me,qe;function gr(){if(qe)return me;qe=1;const t=/^[0-9]+$/,r=(s,o)=>{if(typeof s=="number"&&typeof o=="number")return s===o?0:s<o?-1:1;const p=t.test(s),a=t.test(o);return p&&a&&(s=+s,o=+o),s===o?0:p&&!a?-1:a&&!p?1:s<o?-1:1};return me={compareIdentifiers:r,rcompareIdentifiers:(s,o)=>r(o,s)},me}var ge,Me;function Pe(){if(Me)return ge;Me=1;const t=ae(),{MAX_LENGTH:r,MAX_SAFE_INTEGER:n}=Se(),{safeRe:s,t:o}=Ce(),p=Ae(),{compareIdentifiers:a}=gr(),h=(v,e)=>{const c=e.split(".");if(c.length>v.length)return!1;for(let m=0;m<c.length;m++)if(a(v[m],c[m])!==0)return!1;return!0};class i{constructor(e,c){if(c=p(c),e instanceof i){if(e.loose===!!c.loose&&e.includePrerelease===!!c.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>r)throw new TypeError(`version is longer than ${r} characters`);t("SemVer",e,c),this.options=c,this.loose=!!c.loose,this.includePrerelease=!!c.includePrerelease;const m=e.trim().match(c.loose?s[o.LOOSE]:s[o.FULL]);if(!m)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+m[1],this.minor=+m[2],this.patch=+m[3],this.major>n||this.major<0)throw new TypeError("Invalid major version");if(this.minor>n||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>n||this.patch<0)throw new TypeError("Invalid patch version");m[4]?this.prerelease=m[4].split(".").map(R=>{if(/^[0-9]+$/.test(R)){const N=+R;if(N>=0&&N<n)return N}return R}):this.prerelease=[],this.build=m[5]?m[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(t("SemVer.compare",this.version,this.options,e),!(e instanceof i)){if(typeof e=="string"&&e===this.version)return 0;e=new i(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof i||(e=new i(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof i||(e=new i(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let c=0;do{const m=this.prerelease[c],R=e.prerelease[c];if(t("prerelease compare",c,m,R),m===void 0&&R===void 0)return 0;if(R===void 0)return 1;if(m===void 0)return-1;if(m===R)continue;return a(m,R)}while(++c)}compareBuild(e){e instanceof i||(e=new i(e,this.options));let c=0;do{const m=this.build[c],R=e.build[c];if(t("build compare",c,m,R),m===void 0&&R===void 0)return 0;if(R===void 0)return 1;if(m===void 0)return-1;if(m===R)continue;return a(m,R)}while(++c)}inc(e,c,m){if(e.startsWith("pre")){if(!c&&m===!1)throw new Error("invalid increment argument: identifier is empty");if(c){const R=`-${c}`.match(this.options.loose?s[o.PRERELEASELOOSE]:s[o.PRERELEASE]);if(!R||R[1]!==c)throw new Error(`invalid identifier: ${c}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",c,m);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",c,m);break;case"prepatch":this.prerelease.length=0,this.inc("patch",c,m),this.inc("pre",c,m);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",c,m),this.inc("pre",c,m);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const R=Number(m)?1:0;if(this.prerelease.length===0)this.prerelease=[R];else{let N=this.prerelease.length;for(;--N>=0;)typeof this.prerelease[N]=="number"&&(this.prerelease[N]++,N=-2);if(N===-1){if(c===this.prerelease.join(".")&&m===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(R)}}if(c){let N=[c,R];if(m===!1&&(N=[c]),h(this.prerelease,c)){const b=this.prerelease[c.split(".").length];isNaN(b)&&(this.prerelease=N)}else this.prerelease=N}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}return ge=i,ge}var Ee,He;function Q(){if(He)return Ee;He=1;const t=Pe();return Ee=(n,s,o)=>new t(n,o).compare(new t(s,o)),Ee}var be,Xe;function Er(){if(Xe)return be;Xe=1;const t=Q();return be=(n,s,o)=>t(n,s,o)===0,be}var ve,Be;function br(){if(Be)return ve;Be=1;const t=Q();return ve=(n,s,o)=>t(n,s,o)!==0,ve}var we,Je;function vr(){if(Je)return we;Je=1;const t=Q();return we=(n,s,o)=>t(n,s,o)>0,we}var xe,Ye;function wr(){if(Ye)return xe;Ye=1;const t=Q();return xe=(n,s,o)=>t(n,s,o)>=0,xe}var ye,We;function xr(){if(We)return ye;We=1;const t=Q();return ye=(n,s,o)=>t(n,s,o)<0,ye}var _e,Ze;function yr(){if(Ze)return _e;Ze=1;const t=Q();return _e=(n,s,o)=>t(n,s,o)<=0,_e}var Re,Ke;function _r(){if(Ke)return Re;Ke=1;const t=Er(),r=br(),n=vr(),s=wr(),o=xr(),p=yr();return Re=(h,i,v,e)=>{switch(i){case"===":return typeof h=="object"&&(h=h.version),typeof v=="object"&&(v=v.version),h===v;case"!==":return typeof h=="object"&&(h=h.version),typeof v=="object"&&(v=v.version),h!==v;case"":case"=":case"==":return t(h,v,e);case"!=":return r(h,v,e);case">":return n(h,v,e);case">=":return s(h,v,e);case"<":return o(h,v,e);case"<=":return p(h,v,e);default:throw new TypeError(`Invalid operator: ${i}`)}},Re}var Te,Qe;function Rr(){if(Qe)return Te;Qe=1;const t=Symbol("SemVer ANY");class r{static get ANY(){return t}constructor(e,c){if(c=n(c),e instanceof r){if(e.loose===!!c.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),a("comparator",e,c),this.options=c,this.loose=!!c.loose,this.parse(e),this.semver===t?this.value="":this.value=this.operator+this.semver.version,a("comp",this)}parse(e){const c=this.options.loose?s[o.COMPARATORLOOSE]:s[o.COMPARATOR],m=e.match(c);if(!m)throw new TypeError(`Invalid comparator: ${e}`);this.operator=m[1]!==void 0?m[1]:"",this.operator==="="&&(this.operator=""),m[2]?this.semver=new h(m[2],this.options.loose):this.semver=t}toString(){return this.value}test(e){if(a("Comparator.test",e,this.options.loose),this.semver===t||e===t)return!0;if(typeof e=="string")try{e=new h(e,this.options)}catch{return!1}return p(e,this.operator,this.semver,this.options)}intersects(e,c){if(!(e instanceof r))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new i(e.value,c).test(this.value):e.operator===""?e.value===""?!0:new i(this.value,c).test(e.semver):(c=n(c),c.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!c.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||p(this.semver,"<",e.semver,c)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||p(this.semver,">",e.semver,c)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}}Te=r;const n=Ae(),{safeRe:s,t:o}=Ce(),p=_r(),a=ae(),h=Pe(),i=vt();return Te}var Ie,et;function vt(){if(et)return Ie;et=1;const t=/\s+/g;class r{constructor(l,g){if(g=o(g),l instanceof r)return l.loose===!!g.loose&&l.includePrerelease===!!g.includePrerelease?l:new r(l.raw,g);if(l instanceof p)return this.raw=l.value,this.set=[[l]],this.formatted=void 0,this;if(this.options=g,this.loose=!!g.loose,this.includePrerelease=!!g.includePrerelease,this.raw=l.trim().replace(t," "),this.set=this.raw.split("||").map(u=>this.parseRange(u.trim())).filter(u=>u.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const u=this.set[0];if(this.set=this.set.filter(x=>!S(x[0])),this.set.length===0)this.set=[u];else if(this.set.length>1){for(const x of this.set)if(x.length===1&&j(x[0])){this.set=[x];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let l=0;l<this.set.length;l++){l>0&&(this.formatted+="||");const g=this.set[l];for(let u=0;u<g.length;u++)u>0&&(this.formatted+=" "),this.formatted+=g[u].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(l){l=l.replace(F,"");const u=((this.options.includePrerelease&&N)|(this.options.loose&&b))+":"+l,x=s.get(u);if(x)return x;const d=this.options.loose,E=d?i[e.HYPHENRANGELOOSE]:i[e.HYPHENRANGE];l=l.replace(E,k(this.options.includePrerelease)),a("hyphen replace",l),l=l.replace(i[e.COMPARATORTRIM],c),a("comparator trim",l),l=l.replace(i[e.TILDETRIM],m),a("tilde trim",l),l=l.replace(i[e.CARETTRIM],R),a("caret trim",l);let y=l.split(" ").map(D=>H(D,this.options)).join(" ").split(/\s+/).map(D=>A(D,this.options));d&&(y=y.filter(D=>(a("loose invalid filter",D,this.options),!!D.match(i[e.COMPARATORLOOSE])))),a("range list",y);const T=new Map,L=y.map(D=>new p(D,this.options));for(const D of L){if(S(D))return[D];T.set(D.value,D)}T.size>1&&T.has("")&&T.delete("");const U=[...T.values()];return s.set(u,U),U}intersects(l,g){if(!(l instanceof r))throw new TypeError("a Range is required");return this.set.some(u=>J(u,g)&&l.set.some(x=>J(x,g)&&u.every(d=>x.every(E=>d.intersects(E,g)))))}test(l){if(!l)return!1;if(typeof l=="string")try{l=new h(l,this.options)}catch{return!1}for(let g=0;g<this.set.length;g++)if(G(this.set[g],l,this.options))return!0;return!1}}Ie=r;const n=mr(),s=new n,o=Ae(),p=Rr(),a=ae(),h=Pe(),{safeRe:i,src:v,t:e,comparatorTrimReplace:c,tildeTrimReplace:m,caretTrimReplace:R}=Ce(),{FLAG_INCLUDE_PRERELEASE:N,FLAG_LOOSE:b}=Se(),F=new RegExp(v[e.BUILD],"g"),S=f=>f.value==="<0.0.0-0",j=f=>f.value==="",J=(f,l)=>{let g=!0;const u=f.slice();let x=u.pop();for(;g&&u.length;)g=u.every(d=>x.intersects(d,l)),x=u.pop();return g},H=(f,l)=>(f=f.replace(i[e.BUILD],""),a("comp",f,l),f=w(f,l),a("caret",f),f=re(f,l),a("tildes",f),f=$(f,l),a("xrange",f),f=O(f,l),a("stars",f),f),C=f=>!f||f.toLowerCase()==="x"||f==="*",te=(f,l,g)=>C(f)&&!C(l)||C(l)&&g&&!C(g),re=(f,l)=>f.trim().split(/\s+/).map(g=>_(g,l)).join(" "),_=(f,l)=>{const g=l.loose?i[e.TILDELOOSE]:i[e.TILDE],u=l.includePrerelease?"-0":"";return f.replace(g,(x,d,E,y,T)=>{a("tilde",f,x,d,E,y,T);let L;return C(d)?L="":C(E)?L=`>=${d}.0.0${u} <${+d+1}.0.0-0`:C(y)?L=`>=${d}.${E}.0${u} <${d}.${+E+1}.0-0`:T?(a("replaceTilde pr",T),L=`>=${d}.${E}.${y}-${T} <${d}.${+E+1}.0-0`):L=`>=${d}.${E}.${y} <${d}.${+E+1}.0-0`,a("tilde return",L),L})},w=(f,l)=>f.trim().split(/\s+/).map(g=>I(g,l)).join(" "),I=(f,l)=>{a("caret",f,l);const g=l.loose?i[e.CARETLOOSE]:i[e.CARET],u=l.includePrerelease?"-0":"";return f.replace(g,(x,d,E,y,T)=>{a("caret",f,x,d,E,y,T);let L;return C(d)?L="":C(E)?L=`>=${d}.0.0${u} <${+d+1}.0.0-0`:C(y)?d==="0"?L=`>=${d}.${E}.0${u} <${d}.${+E+1}.0-0`:L=`>=${d}.${E}.0${u} <${+d+1}.0.0-0`:T?(a("replaceCaret pr",T),d==="0"?E==="0"?L=`>=${d}.${E}.${y}-${T} <${d}.${E}.${+y+1}-0`:L=`>=${d}.${E}.${y}-${T} <${d}.${+E+1}.0-0`:L=`>=${d}.${E}.${y}-${T} <${+d+1}.0.0-0`):(a("no pr"),d==="0"?E==="0"?L=`>=${d}.${E}.${y} <${d}.${E}.${+y+1}-0`:L=`>=${d}.${E}.${y} <${d}.${+E+1}.0-0`:L=`>=${d}.${E}.${y} <${+d+1}.0.0-0`),a("caret return",L),L})},$=(f,l)=>(a("replaceXRanges",f,l),f.split(/\s+/).map(g=>P(g,l)).join(" ")),P=(f,l)=>{f=f.trim();const g=l.loose?i[e.XRANGELOOSE]:i[e.XRANGE];return f.replace(g,(u,x,d,E,y,T)=>{if(a("xRange",f,u,x,d,E,y,T),te(d,E,y))return f;const L=C(d),U=L||C(E),D=U||C(y),ee=D;return x==="="&&ee&&(x=""),T=l.includePrerelease?"-0":"",L?x===">"||x==="<"?u="<0.0.0-0":u="*":x&&ee?(U&&(E=0),y=0,x===">"?(x=">=",U?(d=+d+1,E=0,y=0):(E=+E+1,y=0)):x==="<="&&(x="<",U?d=+d+1:E=+E+1),x==="<"&&(T="-0"),u=`${x+d}.${E}.${y}${T}`):U?u=`>=${d}.0.0${T} <${+d+1}.0.0-0`:D&&(u=`>=${d}.${E}.0${T} <${d}.${+E+1}.0-0`),a("xRange return",u),u})},O=(f,l)=>(a("replaceStars",f,l),f.trim().replace(i[e.STAR],"")),A=(f,l)=>(a("replaceGTE0",f,l),f.trim().replace(i[l.includePrerelease?e.GTE0PRE:e.GTE0],"")),k=f=>(l,g,u,x,d,E,y,T,L,U,D,ee)=>(C(u)?g="":C(x)?g=`>=${u}.0.0${f?"-0":""}`:C(d)?g=`>=${u}.${x}.0${f?"-0":""}`:E?g=`>=${g}`:g=`>=${g}${f?"-0":""}`,C(L)?T="":C(U)?T=`<${+L+1}.0.0-0`:C(D)?T=`<${L}.${+U+1}.0-0`:ee?T=`<=${L}.${U}.${D}-${ee}`:f?T=`<${L}.${U}.${+D+1}-0`:T=`<=${T}`,`${g} ${T}`.trim()),G=(f,l,g)=>{for(let u=0;u<f.length;u++)if(!f[u].test(l))return!1;if(l.prerelease.length&&!g.includePrerelease){for(let u=0;u<f.length;u++)if(a(f[u].semver),f[u].semver!==p.ANY&&f[u].semver.prerelease.length>0){const x=f[u].semver;if(x.major===l.major&&x.minor===l.minor&&x.patch===l.patch)return!0}return!1}return!0};return Ie}var $e,tt;function Tr(){if(tt)return $e;tt=1;const t=vt();return $e=(n,s,o)=>{try{s=new t(s,o)}catch{return!1}return s.test(n)},$e}var Ir=Tr();const $r=At(Ir);class Lr{constructor(){this._cache=new Map}resolve({name:r,range:n,version:s,load:o}){const p=this._cache.get(r)??[],a=p.find(i=>$r(i.version,n));if(a)return a.promise;const h={version:s,promise:null};return h.promise=Promise.resolve().then(o).catch(i=>{const v=this._cache.get(r),e=v?.indexOf(h)??-1;throw e!==-1&&v.splice(e,1),i}),p.push(h),this._cache.set(r,p),h.promise}}function De(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[n,s]=t.split("/"),[o,p]=r.split("/");return n===o&&(s==="*"||s===p)}function wt(t,r){t.innerHTML="";const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 16px; text-align: center; color: #b00020; font: 14px/1.4 sans-serif;";const s=document.createElement("div");s.textContent=r;const o=document.createElement("div");o.style.cssText="margin-top: 12px;",o.textContent="See the browser console for details.",n.append(s,o),t.appendChild(n)}const Or=`/* required styles */\r
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
`,rt=["application/geo+json","application/json","application/ld+json"],kr=`
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
`;let Le=null,nt=!1;function Nr(t){if(nt)return;const r=document.createElement("style");r.textContent=t,document.head.appendChild(r),nt=!0}function Ar(){return Le||(Nr(Or+kr),Le=Promise.all([Y(()=>import("./leaflet-src.js").then(t=>t.l),__vite__mapDeps([0,1])),Y(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),Y(()=>import("./marker-icon.js"),[]),Y(()=>import("./marker-icon-2x.js"),[]),Y(()=>import("./marker-shadow.js"),[])]).then(([{default:t},{createJsonLDGeoJSONLayer:r},n,s,o])=>(delete t.Icon.Default.prototype._getIconUrl,t.Icon.Default.mergeOptions({iconUrl:n.default,iconRetinaUrl:s.default,shadowUrl:o.default}),{L:t,createJsonLDGeoJSONLayer:r}))),Le}function Sr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry:t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry!=null):!1}class Cr{static supportedTypes=rt;static viewName="Map view";static icon="mdi-map";constructor(r,n={}){this.candidates=r,this.bblock=n.bblock??null,this.viewerConfig=n.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const r=this.candidates.find(n=>{if(!n.type||!n.content||!rt.some(s=>De(s,n.type)))return!1;try{return Sr(JSON.parse(n.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,this._mount(r).catch(n=>{console.error("GeoJsonMapPlugin: init failed",n),this._el===r&&(this.destroy(r),wt(r,`Failed to render this map view (${n.message}).`))})}async _mount(r){const n=this._pickCandidate();if(!n)return;const s=JSON.parse(n.content),{L:o,createJsonLDGeoJSONLayer:p}=await Ar();if(this._el!==r)return;const a=o.map(r,{attributionControl:!1,maxZoom:22});o.control.attribution().addTo(a).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),o.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(a),this._map=a;const i=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:v,bblocksFallbackSparqlEndpoints:e}=this.viewerConfig,c={};v&&(c.fallbackRainbowInstances=v),e&&(c.fallbackSparqlEndpoints=e);try{const m=(await p(o,s,{ldContext:i,augmentOptions:c,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(a);this._layer=m;const R=m.getBounds();R.isValid()?a.fitBounds(R,{padding:[20,20]}):a.setView([0,0],2)}catch(m){console.warn("GeoJsonMapPlugin: error building layer",m),a.setView([0,0],2)}}destroy(r){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===r&&(this._el=null)}}function xt(t){return!Array.isArray(t)||!t.length?!1:typeof t[0]=="number"?t.length>=3:t.some(xt)}function ie(t){return!t?.type||!t.coordinates?!1:xt(t.coordinates)}function Pr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry&&ie(t.geometry):t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry&&ie(r.geometry)):t.type==="GeometryCollection"?Array.isArray(t.geometries)&&t.geometries.some(ie):t.coordinates?ie(t):!1}const it=["application/geo+json","application/json","application/ld+json"],se="0.184.0",ot=()=>Y(()=>import(`https://esm.sh/three@${se}`),[]),Dr=()=>Y(()=>import(`https://esm.sh/three@${se}/examples/jsm/controls/OrbitControls.js`),[]);function zr(t){return t?.depResolver?t.depResolver.resolve({name:"three",range:`^${se}`,version:se,load:ot}):ot()}const st="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function at(t){return t?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Vr={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Gr{static supportedTypes=it;static viewName="3D view";static icon="mdi-cube-outline";constructor(r,n={}){this.candidates=r,this._context=n,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(n=>{if(!n.type||!n.content||!it.some(s=>De(s,n.type)))return!1;try{return Pr(JSON.parse(n.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,r.style.position="relative",this._mount(r).catch(n=>{console.error("ThreeDPlugin: init failed",n),this._el===r&&this._showError(r,`Failed to render this 3D view (${n.message}).`)})}_showError(r,n){this.destroy(r),wt(r,n)}async _mount(r){const n=this._pickCandidate();if(!n)return;const s=JSON.parse(n.content),[o,{OrbitControls:p}]=await Promise.all([zr(this._context),Dr()]);if(this._el!==r)return;this._THREE=o;const a=document.createElement("div");a.style.cssText="height: 100%; width: 100%;",r.appendChild(a);const h=a.clientWidth||600,i=a.clientHeight||400,v=new o.Scene;v.background=new o.Color(11383217);const e=new o.PerspectiveCamera(60,h/i,.001,1e4);e.up.set(0,0,1),this._camera=e;const c=new o.WebGLRenderer({antialias:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(h,i),a.appendChild(c.domElement),this._renderer=c;const m=new p(e,c.domElement);m.enableDamping=!0,m.dampingFactor=.05,this._controls=m,v.add(new o.AmbientLight(16777215,.5));const R=new o.DirectionalLight(16777215,.8);R.position.set(100,100,100),v.add(R);const N=new o.DirectionalLight(16777215,.3);N.position.set(-100,-100,-100),v.add(N);const b=new o.DirectionalLight(16777215,.3);if(b.position.set(0,-100,0),v.add(b),this._gridHelper=new o.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,v.add(this._gridHelper),v.add(new o.AxesHelper(1)),await this._buildGeoJsonScene(v,s),this._el!==r)return;this._fitCamera(o),this._buildControls(r),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!a.isConnected)return;const S=a.clientWidth,j=a.clientHeight;!S||!j||(e.aspect=S/j,e.updateProjectionMatrix(),c.setSize(S,j))}),this._resizeObserver.observe(a),this._animating=!0;const F=()=>{if(this._animating){this._animFrameId=requestAnimationFrame(F);try{m.update(),c.render(v,e)}catch(S){console.error("ThreeDPlugin: render loop failed",S),this._showError(r,`An error occurred while rendering this 3D view (${S.message}).`)}}};F()}async _buildGeoJsonScene(r,n){const{buildGeoJson3DObjects:s}=await Y(async()=>{const{buildGeoJson3DObjects:p}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:p}},[]),o=s(n,this._THREE);o.meshes.forEach(p=>{p.material.wireframe=this._wireframe,this._solidMeshes.push(p)}),o.lines.forEach(p=>{p.visible=this._showEdges,this._solidEdges.push(p)}),o.points.forEach(p=>{p.visible=this._showVertices,this._solidVertices.push(p)}),o.objects.forEach(p=>r.add(p))}_fitCamera(r){const n=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!n.length)return;const s=new r.Box3;if(n.forEach(i=>s.expandByObject(i)),s.isEmpty())return;const o=s.getCenter(new r.Vector3),p=s.getSize(new r.Vector3),h=Math.max(p.x,p.y,p.z)*2;this._camera.position.set(o.x-h*.7,o.y-h*.7,o.z+h*.7),this._camera.near=h*.001,this._camera.far=h*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(o),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(r){const n=document.createElement("div");n.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const s=(o,p,a,h)=>{const i=document.createElement("button");return i.type="button",i.title=p,i.innerHTML=Vr[o],i.style.cssText=st+at(h?.()),i.addEventListener("click",()=>{a(),i.style.cssText=st+at(h?.())}),n.appendChild(i),i};s("reset","Reset camera",()=>this._resetCamera()),s("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),s("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(o=>{o.material.wireframe=this._wireframe})},()=>this._wireframe),s("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(o=>{o.visible=this._showEdges})},()=>this._showEdges),s("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(o=>{o.visible=this._showVertices})},()=>this._showVertices),r.appendChild(n),this._controlsEl=n}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(r){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidEdges.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidVertices.forEach(n=>{n.children?.forEach(s=>{s.geometry?.dispose(),s.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===r&&(this._el=null),r.innerHTML=""}}const lt=["text/html","application/xhtml+xml"],Fr=/^https?:\/\//;class jr{static supportedTypes=lt;static viewName="Web view";static icon="mdi-web";constructor(r){this.candidates=r,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(n=>n.type&&n.url&&lt.some(s=>De(s,n.type))&&Fr.test(n.url));return this._candidate=r??null,this._candidate}render(r){this._el=r;const n=this._pickCandidate();if(!n)return;r.style.overflow="auto";const s=document.createElement("iframe");s.src=n.url,s.setAttribute("sandbox","allow-same-origin"),s.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const o=s.contentDocument,p=o?.documentElement?.scrollHeight||o?.body?.scrollHeight;p&&(s.style.height=`${p}px`)}catch{}},s.addEventListener("load",this._onLoad),r.appendChild(s),this._iframe=s}destroy(r){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===r&&(this._el=null),r.innerHTML=""}}const Ur=[Cr,Gr,jr].map(t=>({PluginClass:t,weight:1/0}));let Oe=null;const qr=new Lr;function Mr(){return Oe||(Oe=ft.registerPromises.local.promise.then(async t=>{const r=t?.viewer?.viewPlugins??[],n=await Promise.all(r.map(async s=>{try{const o=await import(s.url);return(Array.isArray(s.export)&&s.export.length?s.export:[s.export||null]).map(a=>{const h=a?o[a]:o.default;return h?{PluginClass:h,weight:s.weight??0}:(console.warn(`View plugin has no export named "${a??"default"}": ${s.url}`),null)})}catch(o){return console.warn(`View plugin failed to load: ${s.url}`,o),[]}}));return[...Ur,...n.flat().filter(Boolean)]})),Oe}function Hr(){async function t(r,n={}){if(!r?.length)return[];const s={...n,viewerConfig:yt.config,depResolver:qr},o=await Mr(),p=[];for(const{PluginClass:a,weight:h}of o){const i=a.supportedTypes??[];if(!r.some(e=>e.type&&i.some(c=>hr(c,e.type))))continue;if(typeof a.viewName!="string"||!a.viewName.trim()){console.warn(`View plugin has no static viewName, skipping: ${a.name}`);continue}let v;try{if(v=St(new a(r,s)),!(v.matches?.()??!0))continue}catch(e){console.warn(`View plugin threw while matching: ${a.name}`,e);continue}p.push({instance:v,weight:h,PluginClass:a})}return p}return{matchPlugins:t}}function Xr(t,r=null){return{type:t.language?.mimeType??t.language?.id??null,content:t.code??r?.contents??null,url:t.url??null,label:t.language?.label??t.language?.id??"unknown"}}function an(t,r,n=null){return{type:t.outputs?.mediaTypes?.[0]?.mimeType??null,content:n?.contents??null,url:r?.url??null,label:t.id}}const ct=1500,Br=15e3,Jr={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(t,{emit:r}){const{matchPlugins:n}=Hr(),s=Vt(()=>Y(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]))),o=t,p=r,a=_t(),h=Ct(),i=Pt(),v=ce([]),e=ce([]),c=ce([]);function m(_){return _.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function R(_){return _[0]?.id}function N(_){const w=_.filter(O=>!O.isTransform),I=_.filter(O=>O.isTransform);w.sort((O,A)=>O.order===A.order?O.label.localeCompare(A.label):O.order-A.order);const $=new Map;I.forEach(O=>{const A=O.transformEntry.snippet.language?.id;$.has(A)||$.set(A,[]),$.get(A).push(O)}),$.forEach(O=>O.sort((A,k)=>A.label.localeCompare(k.label)));const P=[];return w.forEach(O=>{P.push(O);const A=$.get(O.id);A&&(P.push(...A),$.delete(O.id))}),$.forEach(O=>P.push(...O)),P}async function b(){const _=o.bblock;if(!o.bblock?.examples?.length){v.value=[],e.value=[],c.value=[];return}const w=[],I=[],$=[];if(o.bblock.examples.forEach(A=>{A.snippets?.forEach(k=>{let G;typeof k.language=="object"?G=k.language:(k.language||(k.language="plaintext"),G=ue[k.language],typeof G=="string"&&(G=ue[G]),G||(G={id:k.language,order:999,label:k.language}),k.language=G),(Gt.has(G.id)||G.mimeType||!ue[G.id])&&k.code==null&&k.url&&!ir(k,rr)&&$.push(ft.fetchDocumentByUrl(o.bblock,k.url,{maxSize:tr}).then(l=>{k.code=l}).catch(()=>{}))})}),await Promise.all($),o.bblock!==_||(o.bblock.examples.forEach((A,k)=>{const G=A.snippets?.map(l=>l.language)??[];if(o.bblock.transforms?.length){const l=[];o.bblock.transforms.forEach(u=>{A.snippets?.forEach((x,d)=>{const E=x.transformResults?.[u.id];if(E!=null){const y=typeof E=="string";l.push({transform:u,snippet:x,snippetIdx:d,url:y?E:E.url||null,success:y?!0:E.success??!0,stderr:y?null:E.stderr||null,profilesValidation:y?null:E.profilesValidation||null})}})});const g={};l.forEach(u=>{g[u.transform.id]=(g[u.transform.id]||0)+1}),l.sort((u,x)=>{const d=u.transform.id.localeCompare(x.transform.id);return d!==0?d:u.snippetIdx-x.snippetIdx}),l.forEach(u=>{const x=g[u.transform.id]>1;G.push({id:x?`transform:${u.snippetIdx}-${u.transform.id}`:`transform:${u.transform.id}`,label:u.transform.id,selectionLabel:`${u.transform.id} (${u.snippet.language?.label||u.snippetIdx+1})`,icon:"mdi-file-swap",hasError:!u.success,isTransform:!0,transform:u.transform,transformEntry:u})})}const f=(A.snippets??[]).map(l=>Xr(l));I.push(n(f,{bblock:o.bblock}).then(l=>{const g=new Map;l.forEach(({instance:u,weight:x,PluginClass:d})=>{const E=m(d.viewName??d.name??"")||"plugin",y=g.get(E)??0;g.set(E,y+1);const T=y===0?E:`${E}-${y+1}`;G.push({id:`plugin:${T}`,order:-.5-(x??0)/1e6,label:d.viewName??d.name??"Custom view",icon:d.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:u})})})),w[k]=G}),await Promise.all(I),o.bblock!==_))return;const P=[],O=[];w.forEach((A,k)=>{w[k]=N(A),O.push(k),P[k]=R(w[k])}),v.value=w,e.value=P,c.value=O,re(),J()}function F(_){const w=document.getElementById(`example-panel-${_.idx}`);if(!w){console.warn(`scrollToExample: no panel found for example index ${_.idx}`);return}const I=w.getBoundingClientRect().top,$=document.querySelector("header").offsetHeight,P=window.scrollY+I-$;Math.abs(P-window.scrollY)<2||window.scrollTo(0,P)}function S(_){const w=/^example-(\d+)$/.exec(_?.[0]??"");return w?{idx:parseInt(w[1],10)-1,language:_[1]||null}:null}function j(_,w){const I=[`example-${_+1}`];return w&&I.push(w),{name:"BuildingBlock",params:{id:o.bblock.itemIdentifier,section:"examples",rest:I}}}async function J(){if(!o.active)return;const _=S(h.params.rest);if(!_||!o.bblock?.examples?.[_.idx])return;const{idx:w,language:I}=_;c.value.includes(w)||c.value.push(w),I&&v.value[w]?.some($=>$.id===I)?e.value[w]=I:e.value[w]=R(v.value[w]??[]),await zt(),C(w)}let H=null;function C(_){H?.cleanup();let w;const I=()=>{P.disconnect(),clearTimeout(w),clearTimeout(O),window.removeEventListener("wheel",I),window.removeEventListener("touchmove",I),window.removeEventListener("keydown",I),H=null};window.addEventListener("wheel",I,{passive:!0}),window.addEventListener("touchmove",I,{passive:!0}),window.addEventListener("keydown",I);const $=Rt(()=>F({idx:_}),50),P=new ResizeObserver(()=>{$(),clearTimeout(w),w=setTimeout(I,ct)});P.observe(document.body),w=setTimeout(I,ct);const O=setTimeout(I,Br);H={cleanup:I},F({idx:_})}le(()=>h.params.rest,J);function te(_){const w=i.resolve(j(_,e.value[_]));return window.location.origin+w.href}function re(){o.active&&o.bblock?.examples?.length?a.setItems(o.bblock.examples.map((_,w)=>({title:_.title,idx:w,to:j(w,null)})),F):a.clearItems()}return le(()=>o.bblock,b,{immediate:!0}),le(()=>o.active,_=>{re(),_&&J()}),(_,w)=>(z(),K("div",null,[t.bblock.semanticUplift?.additionalSteps?.length?(z(),q(Wt,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:V(()=>[w[4]||(w[4]=M(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),gt("a",{href:"#",onClick:w[0]||(w[0]=oe(I=>p("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),w[5]||(w[5]=M(" for more information. ",-1))]),_:1})):X("",!0),B(er,{multiple:"",modelValue:c.value,"onUpdate:modelValue":w[3]||(w[3]=I=>c.value=I)},{default:V(()=>[(z(!0),K(ke,null,ht(t.bblock.examples,(I,$)=>(z(),K(ke,{key:$},[I.content?.length||I.snippets?.length?(z(),q(Zt,{key:0,value:$,id:`example-panel-${$}`},{default:V(()=>[B(Kt,null,{default:V(()=>[B(Yt,{class:"example-copy-link",icon:"mdi-link-variant",text:te($),href:te($),title:"Copy link to this example",size:"small",variant:"text",onClick:w[1]||(w[1]=oe(()=>{},["stop"]))},null,8,["text","href"]),M(" "+Z(I.title)+" ",1),B(Xt),_.$vuetify.display.mdAndUp?(z(),q(ze,{key:0,onClick:w[2]||(w[2]=oe(()=>{},["stop"])),variant:_.$vuetify.display.lgAndUp&&v.value[$]?.length<5?"buttons":"dropdown",modelValue:e.value[$],"onUpdate:modelValue":P=>e.value[$]=P,languages:v.value[$]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):X("",!0)]),_:2},1024),B(Qt,null,{default:V(()=>[B(Dt(s),{bblock:t.bblock,example:I,language:v.value[$]?.find(P=>P.id===e.value[$]),"source-files-url":t.bblock.sourceFiles},mt({_:2},[_.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:V(()=>[B(ze,{modelValue:e.value[$],"onUpdate:modelValue":P=>e.value[$]=P,languages:v.value[$],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):X("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Yr=ut(Jr,[["__scopeId","data-v-b6e6765a"]]),ln=Object.freeze(Object.defineProperty({__proto__:null,default:Yr},Symbol.toStringTag,{value:"Module"}));export{ln as B,rr as M,tr as a,sn as b,nr as i,an as t,Hr as u};
