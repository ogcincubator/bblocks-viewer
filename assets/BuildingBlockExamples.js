const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/three.module.js","assets/three.core.js","assets/OrbitControls.js","assets/topo-geometry.js","assets/earcut.js","assets/geojson-3d.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/CopyToClipboardButton.js","assets/VChip.js","assets/VChip.css","assets/CopyToClipboardButton.css","assets/TransformInfo.js","assets/BuildingBlock.js","assets/VMenu.js","assets/dialog-transition.js","assets/VMenu.css","assets/VDialog.js","assets/VDialog.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ct,a as J,c as vt,b as ut,u as wt,e as xt,d as yt}from"./index.js";import{H as ft,Y as _t,n as H,v as Rt,S as It,E as Tt,a2 as $t,T as Lt,o as V,k as Q,c as q,w as D,aE as Ot,p as B,F as Oe,x as dt,u as oe,aa as pt,q as U,t as W,aj as kt,ak as At,l as ke,j as Nt,bJ as St,bI as Ct,ao as Pt,y as se,a9 as Dt,_ as zt,C as le,aA as Vt}from"./vendor.js";import{k as ce,g as Gt}from"./mime-types.js";import{r as Ft,z as jt,s as Mt,w as Ut,a as qt,c as Xt,d as Ht}from"./VList.js";import{m as Bt,q as Z}from"./VCard.js";import{g as Jt}from"./VSelect.js";import{V as Yt}from"./BuildingBlock.js";import{a as Wt,c as Zt,b as Kt,V as Qt}from"./VExpansionPanels.js";const Ae=200*1024,er=10*1024*1024,tr=1024*1024;function rr(t,r=Ae){return typeof t=="number"&&t>r}function ht(t){return typeof t=="string"?new Blob([t]).size:0}function rn(t,r=Ae){return typeof t!="string"||ht(t)<=r?{text:t,truncated:!1}:{text:t.slice(0,r),truncated:!0}}function nr(t,r=Ae){return t?rr(t.sizeBytes,r)?!0:ht(t.code)>r:!1}const mt=Symbol.for("vuetify:v-item-group"),ir=Tt({...Lt(),...jt({selectedClass:"v-item--selected"}),...Bt(),...$t()},"VItemGroup"),or=ft()({name:"VItemGroup",props:ir(),emits:{"update:modelValue":t=>!0},setup(t,r){let{slots:o}=r;const{themeClasses:i}=_t(t),{isSelected:a,select:d,next:s,prev:g,selected:n}=Ft(t,mt);return()=>H(t.tag,{class:It(["v-item-group",i.value,t.class]),style:Rt(t.style)},{default:()=>[o.default?.({isSelected:a,select:d,next:s,prev:g,selected:n.value})]})}}),ar=ft()({name:"VItem",props:Ut(),emits:{"group:selected":t=>!0},setup(t,r){let{slots:o}=r;const{isSelected:i,select:a,toggle:d,selectedClass:s,value:g,disabled:n}=Mt(t,mt);return()=>o.default?.({isSelected:i.value,selectedClass:s.value,select:a,toggle:d,value:g.value,disabled:n.value})}}),sr={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:t=>["buttons","dropdown"].includes(t)}},emits:["update:modelValue"]},lr={key:0,class:"language-tabs"},cr={key:0,class:"mr-2"},ur={class:"d-flex align-center"};function fr(t,r,o,i,a,d){return o.languages?.length?(V(),Q("div",lr,[o.variant==="buttons"?(V(),q(or,{key:0,"model-value":o.modelValue,"onUpdate:modelValue":r[0]||(r[0]=s=>t.$emit("update:modelValue",s)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:D(()=>[t.$slots.preText?(V(),Q("div",cr,[Ot(t.$slots,"pre-text")])):B("",!0),(V(!0),Q(Oe,null,dt(o.languages,s=>(V(),q(ar,{key:s.id,value:s.id},{default:D(({isSelected:g,toggle:n})=>[H(qt,{color:g?"primary":"default",onClick:oe(n,["stop"]),class:"mx-1 mb-1"},pt({default:D(()=>[U(" "+W(s.label),1)]),_:2},[s.icon||s.hasError?{name:"prepend",fn:D(()=>[s.hasError?(V(),q(Z,{key:0,color:"error",size:"small"},{default:D(()=>[...r[2]||(r[2]=[U("mdi-alert-circle",-1)])]),_:1})):s.icon?(V(),q(Z,{key:1,size:"small"},{default:D(()=>[U(W(s.icon),1)]),_:2},1024)):B("",!0)]),key:"0"}:void 0]),1032,["color","onClick"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):B("",!0),o.variant==="dropdown"?(V(),q(Jt,{key:1,"model-value":o.modelValue,"onUpdate:modelValue":r[1]||(r[1]=s=>t.$emit("update:modelValue",s)),items:o.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language"},{item:D(({props:s,item:g})=>[H(Xt,kt(At(s)),{title:D(()=>[ke("span",ur,[g.raw.hasError?(V(),q(Z,{key:0,color:"error",size:"small",class:"mr-2"},{default:D(()=>[...r[3]||(r[3]=[U("mdi-alert-circle",-1)])]),_:1})):g.raw.icon?(V(),q(Z,{key:1,size:"small",class:"mr-2"},{default:D(()=>[U(W(g.raw.icon),1)]),_:2},1024)):B("",!0),U(" "+W(g.raw.label),1)])]),_:2},1040)]),selection:D(({item:s})=>[s.raw.hasError?(V(),q(Z,{key:0,color:"error",size:"small",class:"mr-2"},{default:D(()=>[...r[4]||(r[4]=[U("mdi-alert-circle",-1)])]),_:1})):s.raw.icon?(V(),q(Z,{key:1,size:"small",class:"mr-2"},{default:D(()=>[U(W(s.raw.icon),1)]),_:2},1024)):B("",!0),U(" "+W(s.raw.label),1)]),_:1},8,["model-value","items"])):B("",!0)])):B("",!0)}const ze=ct(sr,[["render",fr]]);function dr(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[o,i]=t.split("/"),[a,d]=r.split("/");return o===a&&(i==="*"||i===d)}var ue,Ve;function pr(){if(Ve)return ue;Ve=1;class t{constructor(){this.max=1e3,this.map=new Map}get(o){const i=this.map.get(o);if(i!==void 0)return this.map.delete(o),this.map.set(o,i),i}delete(o){return this.map.delete(o)}set(o,i){if(!this.delete(o)&&i!==void 0){if(this.map.size>=this.max){const d=this.map.keys().next().value;this.delete(d)}this.map.set(o,i)}return this}}return ue=t,ue}var fe,Ge;function Ne(){if(Ge)return fe;Ge=1;const t=Object.freeze({loose:!0}),r=Object.freeze({});return fe=i=>i?typeof i!="object"?t:i:r,fe}var ne={exports:{}},de,Fe;function Se(){if(Fe)return de;Fe=1;const t="2.0.0",r=256,o=Number.MAX_SAFE_INTEGER||9007199254740991,i=16,a=r-6;return de={MAX_LENGTH:r,MAX_SAFE_COMPONENT_LENGTH:i,MAX_SAFE_BUILD_LENGTH:a,MAX_SAFE_INTEGER:o,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:t,FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2},de}var pe,je;function ae(){if(je)return pe;je=1;var t={};return pe=typeof process=="object"&&t&&t.NODE_DEBUG&&/\bsemver\b/i.test(t.NODE_DEBUG)?(...o)=>console.error("SEMVER",...o):()=>{},pe}var Me;function Ce(){return Me||(Me=1,(function(t,r){const{MAX_SAFE_COMPONENT_LENGTH:o,MAX_SAFE_BUILD_LENGTH:i,MAX_LENGTH:a}=Se(),d=ae();r=t.exports={};const s=r.re=[],g=r.safeRe=[],n=r.src=[],b=r.safeSrc=[],e=r.t={};let l=0;const m="[a-zA-Z0-9-]",y=[["\\s",1],["\\d",a],[m,i]],$=z=>{for(const[O,A]of y)z=z.split(`${O}*`).join(`${O}{0,${A}}`).split(`${O}+`).join(`${O}{1,${A}}`);return z},E=(z,O,A)=>{const F=$(O),j=l++;d(z,j,O),e[z]=j,n[j]=O,b[j]=F,s[j]=new RegExp(O,A?"g":void 0),g[j]=new RegExp(F,A?"g":void 0)};E("NUMERICIDENTIFIER","0|[1-9]\\d*"),E("NUMERICIDENTIFIERLOOSE","\\d+"),E("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${m}*`),E("MAINVERSION",`(${n[e.NUMERICIDENTIFIER]})\\.(${n[e.NUMERICIDENTIFIER]})\\.(${n[e.NUMERICIDENTIFIER]})`),E("MAINVERSIONLOOSE",`(${n[e.NUMERICIDENTIFIERLOOSE]})\\.(${n[e.NUMERICIDENTIFIERLOOSE]})\\.(${n[e.NUMERICIDENTIFIERLOOSE]})`),E("PRERELEASEIDENTIFIER",`(?:${n[e.NONNUMERICIDENTIFIER]}|${n[e.NUMERICIDENTIFIER]})`),E("PRERELEASEIDENTIFIERLOOSE",`(?:${n[e.NONNUMERICIDENTIFIER]}|${n[e.NUMERICIDENTIFIERLOOSE]})`),E("PRERELEASE",`(?:-(${n[e.PRERELEASEIDENTIFIER]}(?:\\.${n[e.PRERELEASEIDENTIFIER]})*))`),E("PRERELEASELOOSE",`(?:-?(${n[e.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[e.PRERELEASEIDENTIFIERLOOSE]})*))`),E("BUILDIDENTIFIER",`${m}+`),E("BUILD",`(?:\\+(${n[e.BUILDIDENTIFIER]}(?:\\.${n[e.BUILDIDENTIFIER]})*))`),E("FULLPLAIN",`v?${n[e.MAINVERSION]}${n[e.PRERELEASE]}?${n[e.BUILD]}?`),E("FULL",`^${n[e.FULLPLAIN]}$`),E("LOOSEPLAIN",`[v=\\s]*${n[e.MAINVERSIONLOOSE]}${n[e.PRERELEASELOOSE]}?${n[e.BUILD]}?`),E("LOOSE",`^${n[e.LOOSEPLAIN]}$`),E("GTLT","((?:<|>)?=?)"),E("XRANGEIDENTIFIERLOOSE",`${n[e.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),E("XRANGEIDENTIFIER",`${n[e.NUMERICIDENTIFIER]}|x|X|\\*`),E("XRANGEPLAIN",`[v=\\s]*(${n[e.XRANGEIDENTIFIER]})(?:\\.(${n[e.XRANGEIDENTIFIER]})(?:\\.(${n[e.XRANGEIDENTIFIER]})(?:${n[e.PRERELEASE]})?${n[e.BUILD]}?)?)?`),E("XRANGEPLAINLOOSE",`[v=\\s]*(${n[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[e.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[e.XRANGEIDENTIFIERLOOSE]})(?:${n[e.PRERELEASELOOSE]})?${n[e.BUILD]}?)?)?`),E("XRANGE",`^${n[e.GTLT]}\\s*${n[e.XRANGEPLAIN]}$`),E("XRANGELOOSE",`^${n[e.GTLT]}\\s*${n[e.XRANGEPLAINLOOSE]}$`),E("COERCEPLAIN",`(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`),E("COERCE",`${n[e.COERCEPLAIN]}(?:$|[^\\d])`),E("COERCEFULL",n[e.COERCEPLAIN]+`(?:${n[e.PRERELEASE]})?(?:${n[e.BUILD]})?(?:$|[^\\d])`),E("COERCERTL",n[e.COERCE],!0),E("COERCERTLFULL",n[e.COERCEFULL],!0),E("LONETILDE","(?:~>?)"),E("TILDETRIM",`(\\s*)${n[e.LONETILDE]}\\s+`,!0),r.tildeTrimReplace="$1~",E("TILDE",`^${n[e.LONETILDE]}${n[e.XRANGEPLAIN]}$`),E("TILDELOOSE",`^${n[e.LONETILDE]}${n[e.XRANGEPLAINLOOSE]}$`),E("LONECARET","(?:\\^)"),E("CARETTRIM",`(\\s*)${n[e.LONECARET]}\\s+`,!0),r.caretTrimReplace="$1^",E("CARET",`^${n[e.LONECARET]}${n[e.XRANGEPLAIN]}$`),E("CARETLOOSE",`^${n[e.LONECARET]}${n[e.XRANGEPLAINLOOSE]}$`),E("COMPARATORLOOSE",`^${n[e.GTLT]}\\s*(${n[e.LOOSEPLAIN]})$|^$`),E("COMPARATOR",`^${n[e.GTLT]}\\s*(${n[e.FULLPLAIN]})$|^$`),E("COMPARATORTRIM",`(\\s*)${n[e.GTLT]}\\s*(${n[e.LOOSEPLAIN]}|${n[e.XRANGEPLAIN]})`,!0),r.comparatorTrimReplace="$1$2$3",E("HYPHENRANGE",`^\\s*(${n[e.XRANGEPLAIN]})\\s+-\\s+(${n[e.XRANGEPLAIN]})\\s*$`),E("HYPHENRANGELOOSE",`^\\s*(${n[e.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[e.XRANGEPLAINLOOSE]})\\s*$`),E("STAR","(<|>)?=?\\s*\\*"),E("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),E("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")})(ne,ne.exports)),ne.exports}var he,Ue;function hr(){if(Ue)return he;Ue=1;const t=/^[0-9]+$/,r=(i,a)=>{if(typeof i=="number"&&typeof a=="number")return i===a?0:i<a?-1:1;const d=t.test(i),s=t.test(a);return d&&s&&(i=+i,a=+a),i===a?0:d&&!s?-1:s&&!d?1:i<a?-1:1};return he={compareIdentifiers:r,rcompareIdentifiers:(i,a)=>r(a,i)},he}var me,qe;function Pe(){if(qe)return me;qe=1;const t=ae(),{MAX_LENGTH:r,MAX_SAFE_INTEGER:o}=Se(),{safeRe:i,t:a}=Ce(),d=Ne(),{compareIdentifiers:s}=hr(),g=(b,e)=>{const l=e.split(".");if(l.length>b.length)return!1;for(let m=0;m<l.length;m++)if(s(b[m],l[m])!==0)return!1;return!0};class n{constructor(e,l){if(l=d(l),e instanceof n){if(e.loose===!!l.loose&&e.includePrerelease===!!l.includePrerelease)return e;e=e.version}else if(typeof e!="string")throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>r)throw new TypeError(`version is longer than ${r} characters`);t("SemVer",e,l),this.options=l,this.loose=!!l.loose,this.includePrerelease=!!l.includePrerelease;const m=e.trim().match(l.loose?i[a.LOOSE]:i[a.FULL]);if(!m)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+m[1],this.minor=+m[2],this.patch=+m[3],this.major>o||this.major<0)throw new TypeError("Invalid major version");if(this.minor>o||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>o||this.patch<0)throw new TypeError("Invalid patch version");m[4]?this.prerelease=m[4].split(".").map(y=>{if(/^[0-9]+$/.test(y)){const $=+y;if($>=0&&$<o)return $}return y}):this.prerelease=[],this.build=m[5]?m[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(t("SemVer.compare",this.version,this.options,e),!(e instanceof n)){if(typeof e=="string"&&e===this.version)return 0;e=new n(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof n||(e=new n(e,this.options)),this.major<e.major?-1:this.major>e.major?1:this.minor<e.minor?-1:this.minor>e.minor?1:this.patch<e.patch?-1:this.patch>e.patch?1:0}comparePre(e){if(e instanceof n||(e=new n(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let l=0;do{const m=this.prerelease[l],y=e.prerelease[l];if(t("prerelease compare",l,m,y),m===void 0&&y===void 0)return 0;if(y===void 0)return 1;if(m===void 0)return-1;if(m===y)continue;return s(m,y)}while(++l)}compareBuild(e){e instanceof n||(e=new n(e,this.options));let l=0;do{const m=this.build[l],y=e.build[l];if(t("build compare",l,m,y),m===void 0&&y===void 0)return 0;if(y===void 0)return 1;if(m===void 0)return-1;if(m===y)continue;return s(m,y)}while(++l)}inc(e,l,m){if(e.startsWith("pre")){if(!l&&m===!1)throw new Error("invalid increment argument: identifier is empty");if(l){const y=`-${l}`.match(this.options.loose?i[a.PRERELEASELOOSE]:i[a.PRERELEASE]);if(!y||y[1]!==l)throw new Error(`invalid identifier: ${l}`)}}switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",l,m);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",l,m);break;case"prepatch":this.prerelease.length=0,this.inc("patch",l,m),this.inc("pre",l,m);break;case"prerelease":this.prerelease.length===0&&this.inc("patch",l,m),this.inc("pre",l,m);break;case"release":if(this.prerelease.length===0)throw new Error(`version ${this.raw} is not a prerelease`);this.prerelease.length=0;break;case"major":(this.minor!==0||this.patch!==0||this.prerelease.length===0)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(this.patch!==0||this.prerelease.length===0)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":this.prerelease.length===0&&this.patch++,this.prerelease=[];break;case"pre":{const y=Number(m)?1:0;if(this.prerelease.length===0)this.prerelease=[y];else{let $=this.prerelease.length;for(;--$>=0;)typeof this.prerelease[$]=="number"&&(this.prerelease[$]++,$=-2);if($===-1){if(l===this.prerelease.join(".")&&m===!1)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(y)}}if(l){let $=[l,y];if(m===!1&&($=[l]),g(this.prerelease,l)){const E=this.prerelease[l.split(".").length];isNaN(E)&&(this.prerelease=$)}else this.prerelease=$}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}return me=n,me}var ge,Xe;function ee(){if(Xe)return ge;Xe=1;const t=Pe();return ge=(o,i,a)=>new t(o,a).compare(new t(i,a)),ge}var Ee,He;function mr(){if(He)return Ee;He=1;const t=ee();return Ee=(o,i,a)=>t(o,i,a)===0,Ee}var be,Be;function gr(){if(Be)return be;Be=1;const t=ee();return be=(o,i,a)=>t(o,i,a)!==0,be}var ve,Je;function Er(){if(Je)return ve;Je=1;const t=ee();return ve=(o,i,a)=>t(o,i,a)>0,ve}var we,Ye;function br(){if(Ye)return we;Ye=1;const t=ee();return we=(o,i,a)=>t(o,i,a)>=0,we}var xe,We;function vr(){if(We)return xe;We=1;const t=ee();return xe=(o,i,a)=>t(o,i,a)<0,xe}var ye,Ze;function wr(){if(Ze)return ye;Ze=1;const t=ee();return ye=(o,i,a)=>t(o,i,a)<=0,ye}var _e,Ke;function xr(){if(Ke)return _e;Ke=1;const t=mr(),r=gr(),o=Er(),i=br(),a=vr(),d=wr();return _e=(g,n,b,e)=>{switch(n){case"===":return typeof g=="object"&&(g=g.version),typeof b=="object"&&(b=b.version),g===b;case"!==":return typeof g=="object"&&(g=g.version),typeof b=="object"&&(b=b.version),g!==b;case"":case"=":case"==":return t(g,b,e);case"!=":return r(g,b,e);case">":return o(g,b,e);case">=":return i(g,b,e);case"<":return a(g,b,e);case"<=":return d(g,b,e);default:throw new TypeError(`Invalid operator: ${n}`)}},_e}var Re,Qe;function yr(){if(Qe)return Re;Qe=1;const t=Symbol("SemVer ANY");class r{static get ANY(){return t}constructor(e,l){if(l=o(l),e instanceof r){if(e.loose===!!l.loose)return e;e=e.value}e=e.trim().split(/\s+/).join(" "),s("comparator",e,l),this.options=l,this.loose=!!l.loose,this.parse(e),this.semver===t?this.value="":this.value=this.operator+this.semver.version,s("comp",this)}parse(e){const l=this.options.loose?i[a.COMPARATORLOOSE]:i[a.COMPARATOR],m=e.match(l);if(!m)throw new TypeError(`Invalid comparator: ${e}`);this.operator=m[1]!==void 0?m[1]:"",this.operator==="="&&(this.operator=""),m[2]?this.semver=new g(m[2],this.options.loose):this.semver=t}toString(){return this.value}test(e){if(s("Comparator.test",e,this.options.loose),this.semver===t||e===t)return!0;if(typeof e=="string")try{e=new g(e,this.options)}catch{return!1}return d(e,this.operator,this.semver,this.options)}intersects(e,l){if(!(e instanceof r))throw new TypeError("a Comparator is required");return this.operator===""?this.value===""?!0:new n(e.value,l).test(this.value):e.operator===""?e.value===""?!0:new n(this.value,l).test(e.semver):(l=o(l),l.includePrerelease&&(this.value==="<0.0.0-0"||e.value==="<0.0.0-0")||!l.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0"))?!1:!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||d(this.semver,"<",e.semver,l)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||d(this.semver,">",e.semver,l)&&this.operator.startsWith("<")&&e.operator.startsWith(">")))}}Re=r;const o=Ne(),{safeRe:i,t:a}=Ce(),d=xr(),s=ae(),g=Pe(),n=gt();return Re}var Ie,et;function gt(){if(et)return Ie;et=1;const t=/\s+/g;class r{constructor(c,f){if(f=a(f),c instanceof r)return c.loose===!!f.loose&&c.includePrerelease===!!f.includePrerelease?c:new r(c.raw,f);if(c instanceof d)return this.raw=c.value,this.set=[[c]],this.formatted=void 0,this;if(this.options=f,this.loose=!!f.loose,this.includePrerelease=!!f.includePrerelease,this.raw=c.trim().replace(t," "),this.set=this.raw.split("||").map(p=>this.parseRange(p.trim())).filter(p=>p.length),!this.set.length)throw new TypeError(`Invalid SemVer Range: ${this.raw}`);if(this.set.length>1){const p=this.set[0];if(this.set=this.set.filter(x=>!O(x[0])),this.set.length===0)this.set=[p];else if(this.set.length>1){for(const x of this.set)if(x.length===1&&A(x[0])){this.set=[x];break}}}this.formatted=void 0}get range(){if(this.formatted===void 0){this.formatted="";for(let c=0;c<this.set.length;c++){c>0&&(this.formatted+="||");const f=this.set[c];for(let p=0;p<f.length;p++)p>0&&(this.formatted+=" "),this.formatted+=f[p].toString().trim()}}return this.formatted}format(){return this.range}toString(){return this.range}parseRange(c){c=c.replace(z,"");const p=((this.options.includePrerelease&&$)|(this.options.loose&&E))+":"+c,x=i.get(p);if(x)return x;const h=this.options.loose,v=h?n[e.HYPHENRANGELOOSE]:n[e.HYPHENRANGE];c=c.replace(v,C(this.options.includePrerelease)),s("hyphen replace",c),c=c.replace(n[e.COMPARATORTRIM],l),s("comparator trim",c),c=c.replace(n[e.TILDETRIM],m),s("tilde trim",c),c=c.replace(n[e.CARETTRIM],y),s("caret trim",c);let L=c.split(" ").map(P=>j(P,this.options)).join(" ").split(/\s+/).map(P=>S(P,this.options));h&&(L=L.filter(P=>(s("loose invalid filter",P,this.options),!!P.match(n[e.COMPARATORLOOSE])))),s("range list",L);const R=new Map,T=L.map(P=>new d(P,this.options));for(const P of T){if(O(P))return[P];R.set(P.value,P)}R.size>1&&R.has("")&&R.delete("");const M=[...R.values()];return i.set(p,M),M}intersects(c,f){if(!(c instanceof r))throw new TypeError("a Range is required");return this.set.some(p=>F(p,f)&&c.set.some(x=>F(x,f)&&p.every(h=>x.every(v=>h.intersects(v,f)))))}test(c){if(!c)return!1;if(typeof c=="string")try{c=new g(c,this.options)}catch{return!1}for(let f=0;f<this.set.length;f++)if(Y(this.set[f],c,this.options))return!0;return!1}}Ie=r;const o=pr(),i=new o,a=Ne(),d=yr(),s=ae(),g=Pe(),{safeRe:n,src:b,t:e,comparatorTrimReplace:l,tildeTrimReplace:m,caretTrimReplace:y}=Ce(),{FLAG_INCLUDE_PRERELEASE:$,FLAG_LOOSE:E}=Se(),z=new RegExp(b[e.BUILD],"g"),O=u=>u.value==="<0.0.0-0",A=u=>u.value==="",F=(u,c)=>{let f=!0;const p=u.slice();let x=p.pop();for(;f&&p.length;)f=p.every(h=>x.intersects(h,c)),x=p.pop();return f},j=(u,c)=>(u=u.replace(n[e.BUILD],""),s("comp",u,c),u=I(u,c),s("caret",u),u=_(u,c),s("tildes",u),u=G(u,c),s("xrange",u),u=X(u,c),s("stars",u),u),N=u=>!u||u.toLowerCase()==="x"||u==="*",re=(u,c,f)=>N(u)&&!N(c)||N(c)&&f&&!N(f),_=(u,c)=>u.trim().split(/\s+/).map(f=>w(f,c)).join(" "),w=(u,c)=>{const f=c.loose?n[e.TILDELOOSE]:n[e.TILDE],p=c.includePrerelease?"-0":"";return u.replace(f,(x,h,v,L,R)=>{s("tilde",u,x,h,v,L,R);let T;return N(h)?T="":N(v)?T=`>=${h}.0.0${p} <${+h+1}.0.0-0`:N(L)?T=`>=${h}.${v}.0${p} <${h}.${+v+1}.0-0`:R?(s("replaceTilde pr",R),T=`>=${h}.${v}.${L}-${R} <${h}.${+v+1}.0-0`):T=`>=${h}.${v}.${L} <${h}.${+v+1}.0-0`,s("tilde return",T),T})},I=(u,c)=>u.trim().split(/\s+/).map(f=>k(f,c)).join(" "),k=(u,c)=>{s("caret",u,c);const f=c.loose?n[e.CARETLOOSE]:n[e.CARET],p=c.includePrerelease?"-0":"";return u.replace(f,(x,h,v,L,R)=>{s("caret",u,x,h,v,L,R);let T;return N(h)?T="":N(v)?T=`>=${h}.0.0${p} <${+h+1}.0.0-0`:N(L)?h==="0"?T=`>=${h}.${v}.0${p} <${h}.${+v+1}.0-0`:T=`>=${h}.${v}.0${p} <${+h+1}.0.0-0`:R?(s("replaceCaret pr",R),h==="0"?v==="0"?T=`>=${h}.${v}.${L}-${R} <${h}.${v}.${+L+1}-0`:T=`>=${h}.${v}.${L}-${R} <${h}.${+v+1}.0-0`:T=`>=${h}.${v}.${L}-${R} <${+h+1}.0.0-0`):(s("no pr"),h==="0"?v==="0"?T=`>=${h}.${v}.${L} <${h}.${v}.${+L+1}-0`:T=`>=${h}.${v}.${L} <${h}.${+v+1}.0-0`:T=`>=${h}.${v}.${L} <${+h+1}.0.0-0`),s("caret return",T),T})},G=(u,c)=>(s("replaceXRanges",u,c),u.split(/\s+/).map(f=>K(f,c)).join(" ")),K=(u,c)=>{u=u.trim();const f=c.loose?n[e.XRANGELOOSE]:n[e.XRANGE];return u.replace(f,(p,x,h,v,L,R)=>{if(s("xRange",u,p,x,h,v,L,R),re(h,v,L))return u;const T=N(h),M=T||N(v),P=M||N(L),te=P;return x==="="&&te&&(x=""),R=c.includePrerelease?"-0":"",T?x===">"||x==="<"?p="<0.0.0-0":p="*":x&&te?(M&&(v=0),L=0,x===">"?(x=">=",M?(h=+h+1,v=0,L=0):(v=+v+1,L=0)):x==="<="&&(x="<",M?h=+h+1:v=+v+1),x==="<"&&(R="-0"),p=`${x+h}.${v}.${L}${R}`):M?p=`>=${h}.0.0${R} <${+h+1}.0.0-0`:P&&(p=`>=${h}.${v}.0${R} <${h}.${+v+1}.0-0`),s("xRange return",p),p})},X=(u,c)=>(s("replaceStars",u,c),u.trim().replace(n[e.STAR],"")),S=(u,c)=>(s("replaceGTE0",u,c),u.trim().replace(n[c.includePrerelease?e.GTE0PRE:e.GTE0],"")),C=u=>(c,f,p,x,h,v,L,R,T,M,P,te)=>(N(p)?f="":N(x)?f=`>=${p}.0.0${u?"-0":""}`:N(h)?f=`>=${p}.${x}.0${u?"-0":""}`:v?f=`>=${f}`:f=`>=${f}${u?"-0":""}`,N(T)?R="":N(M)?R=`<${+T+1}.0.0-0`:N(P)?R=`<${T}.${+M+1}.0-0`:te?R=`<=${T}.${M}.${P}-${te}`:u?R=`<${T}.${M}.${+P+1}-0`:R=`<=${R}`,`${f} ${R}`.trim()),Y=(u,c,f)=>{for(let p=0;p<u.length;p++)if(!u[p].test(c))return!1;if(c.prerelease.length&&!f.includePrerelease){for(let p=0;p<u.length;p++)if(s(u[p].semver),u[p].semver!==d.ANY&&u[p].semver.prerelease.length>0){const x=u[p].semver;if(x.major===c.major&&x.minor===c.minor&&x.patch===c.patch)return!0}return!1}return!0};return Ie}var Te,tt;function _r(){if(tt)return Te;tt=1;const t=gt();return Te=(o,i,a)=>{try{i=new t(i,a)}catch{return!1}return i.test(o)},Te}var Rr=_r();const Ir=Nt(Rr);class Tr{constructor(){this._cache=new Map}resolve({name:r,range:o,version:i,load:a}){const d=this._cache.get(r)??[],s=d.find(n=>Ir(n.version,o));if(s)return s.promise;const g={version:i,promise:null};return g.promise=Promise.resolve().then(a).catch(n=>{const b=this._cache.get(r),e=b?.indexOf(g)??-1;throw e!==-1&&b.splice(e,1),n}),d.push(g),this._cache.set(r,d),g.promise}}function De(t,r){if(!t||!r)return!1;if(t==="*/*"||t===r)return!0;const[o,i]=t.split("/"),[a,d]=r.split("/");return o===a&&(i==="*"||i===d)}const $r=`/* required styles */\r
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
`,rt=["application/geo+json","application/json","application/ld+json"],Lr=`
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
`;let $e=null,nt=!1;function Or(t){if(nt)return;const r=document.createElement("style");r.textContent=t,document.head.appendChild(r),nt=!0}function kr(){return $e||(Or($r+Lr),$e=Promise.all([J(()=>import("./leaflet-src.js").then(t=>t.l),__vite__mapDeps([0,1])),J(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),J(()=>import("./marker-icon.js"),[]),J(()=>import("./marker-icon-2x.js"),[]),J(()=>import("./marker-shadow.js"),[])]).then(([{default:t},{createJsonLDGeoJSONLayer:r},o,i,a])=>(delete t.Icon.Default.prototype._getIconUrl,t.Icon.Default.mergeOptions({iconUrl:o.default,iconRetinaUrl:i.default,shadowUrl:a.default}),{L:t,createJsonLDGeoJSONLayer:r}))),$e}function Ar(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry:t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry!=null):!1}class Nr{static supportedTypes=rt;static viewName="Map view";static icon="mdi-map";constructor(r,o={}){this.candidates=r,this.bblock=o.bblock??null,this.viewerConfig=o.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const r=this.candidates.find(o=>{if(!o.type||!o.content||!rt.some(i=>De(i,o.type)))return!1;try{return Ar(JSON.parse(o.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,this._mount(r)}async _mount(r){const o=this._pickCandidate();if(!o)return;const i=JSON.parse(o.content),{L:a,createJsonLDGeoJSONLayer:d}=await kr();if(this._el!==r)return;const s=a.map(r,{attributionControl:!1,maxZoom:22});a.control.attribution().addTo(s).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(s),this._map=s;const n=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:b,bblocksFallbackSparqlEndpoints:e}=this.viewerConfig,l={};b&&(l.fallbackRainbowInstances=b),e&&(l.fallbackSparqlEndpoints=e);try{const m=(await d(a,i,{ldContext:n,augmentOptions:l,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(s);this._layer=m;const y=m.getBounds();y.isValid()?s.fitBounds(y,{padding:[20,20]}):s.setView([0,0],2)}catch(m){console.warn("GeoJsonMapPlugin: error building layer",m),s.setView([0,0],2)}}destroy(r){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===r&&(this._el=null)}}function Et(t){return!t||typeof t!="object"||Array.isArray(t)?!1:["points","edges","rings","faces","shells","solids"].some(o=>Array.isArray(t[o])&&t[o].some(i=>Array.isArray(i?.features)))}function bt(t){return!Array.isArray(t)||!t.length?!1:typeof t[0]=="number"?t.length>=3:t.some(bt)}function ie(t){return!t?.type||!t.coordinates?!1:bt(t.coordinates)}function Sr(t){return!t||typeof t!="object"?!1:t.type==="Feature"?!!t.geometry&&ie(t.geometry):t.type==="FeatureCollection"?Array.isArray(t.features)&&t.features.some(r=>r?.geometry&&ie(r.geometry)):t.type==="GeometryCollection"?Array.isArray(t.geometries)&&t.geometries.some(ie):t.coordinates?ie(t):!1}function Cr(t){return Et(t)||Sr(t)}const it=["application/geo+json","application/json","application/ld+json"],ot="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function at(t){return t?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Pr={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Dr{static supportedTypes=it;static viewName="3D view";static icon="mdi-cube-outline";constructor(r){this.candidates=r,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._isTopoFormat=!1,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!1}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(o=>{if(!o.type||!o.content||!it.some(i=>De(i,o.type)))return!1;try{return Cr(JSON.parse(o.content))}catch{return!1}});return this._candidate=r??null,this._candidate}render(r){this._el=r,r.style.position="relative",this._mount(r).catch(o=>console.error("ThreeDPlugin: init failed",o))}async _mount(r){const o=this._pickCandidate();if(!o)return;const i=JSON.parse(o.content),[a,{OrbitControls:d}]=await Promise.all([J(()=>import("./three.module.js"),__vite__mapDeps([7,8])),J(()=>import("./OrbitControls.js"),__vite__mapDeps([9,7,8]))]);if(this._el!==r)return;this._THREE=a;const s=document.createElement("div");s.style.cssText="height: 100%; width: 100%;",r.appendChild(s),this._isTopoFormat=Et(i);const g=s.clientWidth||600,n=s.clientHeight||400,b=new a.Scene;b.background=new a.Color(11383217);const e=new a.PerspectiveCamera(60,g/n,.001,1e4);e.up.set(0,0,1),this._camera=e;const l=new a.WebGLRenderer({antialias:!0});l.setPixelRatio(window.devicePixelRatio),l.setSize(g,n),s.appendChild(l.domElement),this._renderer=l;const m=new d(e,l.domElement);m.enableDamping=!0,m.dampingFactor=.05,this._controls=m,b.add(new a.AmbientLight(16777215,.5));const y=new a.DirectionalLight(16777215,.8);y.position.set(100,100,100),b.add(y);const $=new a.DirectionalLight(16777215,.3);$.position.set(-100,-100,-100),b.add($);const E=new a.DirectionalLight(16777215,.3);if(E.position.set(0,-100,0),b.add(E),this._gridHelper=new a.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,b.add(this._gridHelper),b.add(new a.AxesHelper(1)),this._isTopoFormat?await this._buildTopoScene(b,a,i):await this._buildGeoJsonScene(b,i),this._el!==r)return;this._fitCamera(a),this._buildControls(r),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!s.isConnected)return;const O=s.clientWidth,A=s.clientHeight;!O||!A||(e.aspect=O/A,e.updateProjectionMatrix(),l.setSize(O,A))}),this._resizeObserver.observe(s),this._animating=!0;const z=()=>{this._animating&&(this._animFrameId=requestAnimationFrame(z),m.update(),l.render(b,e))};z()}async _buildTopoScene(r,o,i){const{buildMaps:a,buildSolidGeometry:d,buildSolidEdgeLines:s,createSolidMesh:g,createVertexMarkers:n,getFeatures:b,needsTransparency:e}=await J(async()=>{const{buildMaps:$,buildSolidGeometry:E,buildSolidEdgeLines:z,createSolidMesh:O,createVertexMarkers:A,getFeatures:F,needsTransparency:j}=await import("./topo-geometry.js");return{buildMaps:$,buildSolidGeometry:E,buildSolidEdgeLines:z,createSolidMesh:O,createVertexMarkers:A,getFeatures:F,needsTransparency:j}},__vite__mapDeps([10,11,8])),l=a(i),m=b(i.solids||[]),y=e(i)?.85:1;m.forEach(($,E)=>{const{geometry:z}=d($,l.shellMap,l.faceMap,l.ringMap,l.edgeMap,l.pointMap),O=g($,E,z,y),A=s($,l.shellMap,l.faceMap,l.ringMap,l.edgeMap,l.pointMap),F=n(z);O.material.wireframe=this._wireframe,A.visible=this._showEdges,F.visible=this._showVertices,r.add(O,A,F),this._solidMeshes.push(O),this._solidEdges.push(A),this._solidVertices.push(F)})}async _buildGeoJsonScene(r,o){const{buildGeoJson3DObjects:i}=await J(async()=>{const{buildGeoJson3DObjects:d}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:d}},__vite__mapDeps([12,11,8])),a=i(o);a.meshes.forEach(d=>{d.material.wireframe=this._wireframe,this._solidMeshes.push(d)}),a.lines.forEach(d=>this._solidEdges.push(d)),a.points.forEach(d=>this._solidVertices.push(d)),a.objects.forEach(d=>r.add(d))}_fitCamera(r){const o=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!o.length)return;const i=new r.Box3;if(o.forEach(n=>i.expandByObject(n)),i.isEmpty())return;const a=i.getCenter(new r.Vector3),d=i.getSize(new r.Vector3),g=Math.max(d.x,d.y,d.z)*2;this._camera.position.set(a.x-g*.7,a.y-g*.7,a.z+g*.7),this._camera.near=g*.001,this._camera.far=g*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(a),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(r){const o=document.createElement("div");o.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const i=(a,d,s,g)=>{const n=document.createElement("button");return n.type="button",n.title=d,n.innerHTML=Pr[a],n.style.cssText=ot+at(g?.()),n.addEventListener("click",()=>{s(),n.style.cssText=ot+at(g?.())}),o.appendChild(n),n};i("reset","Reset camera",()=>this._resetCamera()),i("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),i("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(a=>{a.material.wireframe=this._wireframe})},()=>this._wireframe),this._isTopoFormat&&(i("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(a=>{a.visible=this._showEdges})},()=>this._showEdges),i("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(a=>{a.visible=this._showVertices})},()=>this._showVertices)),r.appendChild(o),this._controlsEl=o}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(r){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(o=>{o.geometry?.dispose(),o.material?.dispose()}),this._solidEdges.forEach(o=>{o.geometry?.dispose(),o.material?.dispose()}),this._solidVertices.forEach(o=>{o.children?.forEach(i=>{i.geometry?.dispose(),i.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===r&&(this._el=null),r.innerHTML=""}}const st=["text/html","application/xhtml+xml"],zr=/^https?:\/\//;class Vr{static supportedTypes=st;static viewName="Web view";static icon="mdi-web";constructor(r){this.candidates=r,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const r=this.candidates.find(o=>o.type&&o.url&&st.some(i=>De(i,o.type))&&zr.test(o.url));return this._candidate=r??null,this._candidate}render(r){this._el=r;const o=this._pickCandidate();if(!o)return;r.style.overflow="auto";const i=document.createElement("iframe");i.src=o.url,i.setAttribute("sandbox","allow-same-origin"),i.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const a=i.contentDocument,d=a?.documentElement?.scrollHeight||a?.body?.scrollHeight;d&&(i.style.height=`${d}px`)}catch{}},i.addEventListener("load",this._onLoad),r.appendChild(i),this._iframe=i}destroy(r){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===r&&(this._el=null),r.innerHTML=""}}const Gr=[Nr,Dr,Vr].map(t=>({PluginClass:t,weight:1/0}));let Le=null;const Fr=new Tr;function jr(){return Le||(Le=ut.registerPromises.local.promise.then(async t=>{const r=t?.viewer?.viewPlugins??[],o=await Promise.all(r.map(async i=>{try{const a=await import(i.url);return(Array.isArray(i.export)&&i.export.length?i.export:[i.export||null]).map(s=>{const g=s?a[s]:a.default;return g?{PluginClass:g,weight:i.weight??0}:(console.warn(`View plugin has no export named "${s??"default"}": ${i.url}`),null)})}catch(a){return console.warn(`View plugin failed to load: ${i.url}`,a),[]}}));return[...Gr,...o.flat().filter(Boolean)]})),Le}function Mr(){async function t(r,o={}){if(!r?.length)return[];const i={...o,viewerConfig:vt.config,depResolver:Fr},a=await jr(),d=[];for(const{PluginClass:s,weight:g}of a){const n=s.supportedTypes??[];if(!r.some(e=>e.type&&n.some(l=>dr(l,e.type))))continue;let b;try{if(b=St(new s(r,i)),!(b.matches?.()??!0))continue}catch(e){console.warn(`View plugin threw while matching: ${s.name}`,e);continue}d.push({instance:b,weight:g,PluginClass:s})}return d}return{matchPlugins:t}}function Ur(t,r=null){return{type:t.language?.mimeType??t.language?.id??null,content:t.code??r?.contents??null,url:t.url??null,label:t.language?.label??t.language?.id??"unknown"}}function nn(t,r,o=null){return{type:t.outputs?.mediaTypes?.[0]?.mimeType??null,content:o?.contents??null,url:r?.url??null,label:t.id}}const qr=["href","onClick"],lt=1500,Xr=15e3,Hr={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(t,{emit:r}){const{matchPlugins:o}=Mr(),i=Vt(()=>J(()=>import("./ExampleViewer.js"),__vite__mapDeps([13,1,14,3,4,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]))),a=t,d=r,s=wt(),g=Ct(),n=Pt(),b=le([]),e=le([]),l=le([]);function m(_){return _.find(w=>!w.isViewPlugin)?.id}async function y(){const _=a.bblock;if(!a.bblock?.examples?.length){b.value=[],e.value=[],l.value=[];return}const w=[],I=[],k=[];if(a.bblock.examples.forEach(X=>{X.snippets?.forEach(S=>{let C;typeof S.language=="object"?C=S.language:(S.language||(S.language="plaintext"),C=ce[S.language],typeof C=="string"&&(C=ce[C]),C||(C={id:S.language,order:999,label:S.language}),S.language=C),(Gt.has(C.id)||C.mimeType||!ce[C.id])&&S.code==null&&S.url&&!nr(S,tr)&&k.push(ut.fetchDocumentByUrl(a.bblock,S.url,{maxSize:er}).then(u=>{S.code=u}).catch(()=>{}))})}),await Promise.all(k),a.bblock!==_||(a.bblock.examples.forEach((X,S)=>{const C=X.snippets?.map(u=>u.language)??[];if(a.bblock.transforms?.length){const u=[];a.bblock.transforms.forEach(f=>{X.snippets?.forEach((p,x)=>{const h=p.transformResults?.[f.id];if(h!=null){const v=typeof h=="string";u.push({transform:f,snippet:p,snippetIdx:x,url:v?h:h.url||null,success:v?!0:h.success??!0,stderr:v?null:h.stderr||null,profilesValidation:v?null:h.profilesValidation||null})}})});const c={};u.forEach(f=>{c[f.transform.id]=(c[f.transform.id]||0)+1}),u.sort((f,p)=>{const x=f.transform.id.localeCompare(p.transform.id);return x!==0?x:f.snippetIdx-p.snippetIdx}),u.forEach(f=>{const x=c[f.transform.id]>1?`${f.transform.id} (${f.snippet.language?.label||f.snippetIdx+1})`:f.transform.id;C.push({id:`transform:${f.snippetIdx}-${f.transform.id}`,order:9999,label:x,icon:"mdi-file-swap",hasError:!f.success,isTransform:!0,transform:f.transform,transformEntry:f})})}const Y=(X.snippets??[]).map(u=>Ur(u));I.push(o(Y,{bblock:a.bblock}).then(u=>{u.forEach(({instance:c,weight:f,PluginClass:p},x)=>{C.push({id:`plugin:${S}:${p.name||"plugin"}:${x}`,order:-.5-(f??0)/1e6,label:p.viewName??p.name??"Custom view",icon:p.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:c})})})),w[S]=C}),await Promise.all(I),a.bblock!==_))return;const G=[],K=[];w.forEach((X,S)=>{X.sort((C,Y)=>C.order===Y.order?C.label.localeCompare(Y.label):C.order-Y.order),K.push(S),G[S]=m(X)}),b.value=w,e.value=G,l.value=K,re(),O()}function $(_){const w=document.getElementById(`example-panel-${_.idx}`);if(!w){console.warn(`scrollToExample: no panel found for example index ${_.idx}`);return}const I=w.getBoundingClientRect().top,k=document.querySelector("header").offsetHeight,G=window.scrollY+I-k;Math.abs(G-window.scrollY)<2||window.scrollTo(0,G)}function E(_){const w=/^example-(\d+)$/.exec(_?.[0]??"");return w?{idx:parseInt(w[1],10)-1,language:_[1]||null}:null}function z(_,w){const I=[`example-${_+1}`];return w&&I.push(w),{name:"BuildingBlock",params:{id:a.bblock.itemIdentifier,section:"examples",rest:I}}}async function O(){if(!a.active)return;const _=E(g.params.rest);if(!_||!a.bblock?.examples?.[_.idx])return;const{idx:w,language:I}=_;l.value.includes(w)||l.value.push(w),I&&b.value[w]?.some(k=>k.id===I)?e.value[w]=I:e.value[w]=m(b.value[w]??[]),await zt(),F(w)}let A=null;function F(_){A?.cleanup();let w;const I=()=>{G.disconnect(),clearTimeout(w),clearTimeout(K),window.removeEventListener("wheel",I),window.removeEventListener("touchmove",I),window.removeEventListener("keydown",I),A=null};window.addEventListener("wheel",I,{passive:!0}),window.addEventListener("touchmove",I,{passive:!0}),window.addEventListener("keydown",I);const k=yt(()=>$({idx:_}),50),G=new ResizeObserver(()=>{k(),clearTimeout(w),w=setTimeout(I,lt)});G.observe(document.body),w=setTimeout(I,lt);const K=setTimeout(I,Xr);A={cleanup:I},$({idx:_})}se(()=>g.params.rest,O);function j(_){const w=n.resolve(z(_,e.value[_]));return window.location.origin+w.href}function N(_){xt(j(_))}function re(){a.active&&a.bblock?.examples?.length?s.setItems(a.bblock.examples.map((_,w)=>({title:_.title,idx:w,to:z(w,null)})),$):s.clearItems()}return se(()=>a.bblock,y,{immediate:!0}),se(()=>a.active,_=>{re(),_&&O()}),(_,w)=>(V(),Q("div",null,[t.bblock.semanticUplift?.additionalSteps?.length?(V(),q(Yt,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:D(()=>[w[3]||(w[3]=U(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),ke("a",{href:"#",onClick:w[0]||(w[0]=oe(I=>d("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),w[4]||(w[4]=U(" for more information. ",-1))]),_:1})):B("",!0),H(Qt,{multiple:"",modelValue:l.value,"onUpdate:modelValue":w[2]||(w[2]=I=>l.value=I)},{default:D(()=>[(V(!0),Q(Oe,null,dt(t.bblock.examples,(I,k)=>(V(),Q(Oe,{key:k},[I.content?.length||I.snippets?.length?(V(),q(Wt,{key:0,value:k,id:`example-panel-${k}`},{default:D(()=>[H(Zt,null,{default:D(()=>[ke("a",{class:"example-copy-link",href:j(k),title:"Copy link to this example",onClick:oe(G=>N(k),["stop","prevent"])},[H(Z,null,{default:D(()=>[...w[5]||(w[5]=[U("mdi-link-variant",-1)])]),_:1})],8,qr),U(" "+W(I.title)+" ",1),H(Ht),_.$vuetify.display.mdAndUp?(V(),q(ze,{key:0,onClick:w[1]||(w[1]=oe(()=>{},["stop"])),variant:_.$vuetify.display.lgAndUp&&b.value[k]?.length<5?"buttons":"dropdown",modelValue:e.value[k],"onUpdate:modelValue":G=>e.value[k]=G,languages:b.value[k]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):B("",!0)]),_:2},1024),H(Kt,null,{default:D(()=>[H(Dt(i),{bblock:t.bblock,example:I,language:b.value[k]?.find(G=>G.id===e.value[k]),"source-files-url":t.bblock.sourceFiles},pt({_:2},[_.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:D(()=>[H(ze,{modelValue:e.value[k],"onUpdate:modelValue":G=>e.value[k]=G,languages:b.value[k],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):B("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Br=ct(Hr,[["__scopeId","data-v-0deedcbd"]]),on=Object.freeze(Object.defineProperty({__proto__:null,default:Br},Symbol.toStringTag,{value:"Module"}));export{on as B,tr as M,er as a,rn as b,rr as i,nn as t,Mr as u};
