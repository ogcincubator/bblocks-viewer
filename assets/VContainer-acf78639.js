import{aQ as Y,p,l as w,aP as Ge,aF as Qe,aE as be,g as pe,ab as z,c as m,aR as j,aI as Se,aS as oe,m as l,F as _e,a6 as ue,aT as Ze,s as Ce,b as g,I as O,n as U,q as K,aU as Je,t as ke,aV as et,r as E,aW as te,j as tt,w as X,aX as nt,aY as ce,z as we,x as at,T as xe,R as st,aZ as de,ay as it,B as Te,Y as rt,y as lt,D as ot,$ as Q,a0 as Ie,ad as ut}from"./index-e1f0c07e.js";const $e=["top","bottom"],ct=["start","end","left","right"];function dt(e,t){let[n,a]=e.split(" ");return a||(a=Y($e,n)?"start":Y(ct,n)?"top":"center"),{side:ve(n,t),align:ve(a,t)}}function ve(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function Gt(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function Qt(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function Zt(e){return{side:e.align,align:e.side}}function Jt(e){return Y($e,e.side)?"y":"x"}const T=p({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component");function ne(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",n=arguments.length>2?arguments[2]:void 0;return w()({name:n??Ge(Qe(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...T()},setup(a,i){let{slots:s}=i;return()=>{var r;return be(a.tag,{class:[e,a.class],style:a.style},(r=s.default)==null?void 0:r.call(s))}}})}function I(e){const t=pe("useRender");t.render=e}const vt=p({border:[Boolean,Number,String]},"border");function mt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();return{borderClasses:m(()=>{const a=j(e)?e.value:e.border,i=[];if(a===!0||a==="")i.push(`${t}--border`);else if(typeof a=="string"||a===0)for(const s of String(a).split(" "))i.push(`border-${s}`);return i})}}const ft=[null,"default","comfortable","compact"],ae=p({density:{type:String,default:"default",validator:e=>ft.includes(e)}},"density");function Le(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();return{densityClasses:m(()=>`${t}--density-${e.density}`)}}const gt=p({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function ht(e){return{elevationClasses:m(()=>{const n=j(e)?e.value:e.elevation,a=[];return n==null||a.push(`elevation-${n}`),a})}}const se=p({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded");function ie(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();return{roundedClasses:m(()=>{const a=j(e)?e.value:e.rounded,i=[];if(a===!0||a==="")i.push(`${t}--rounded`);else if(typeof a=="string"||a===0)for(const s of String(a).split(" "))i.push(`rounded-${s}`);return i})}}const F=p({tag:{type:String,default:"div"}},"tag");function re(e){return Se(()=>{const t=[],n={};return e.value.background&&(oe(e.value.background)?n.backgroundColor=e.value.background:t.push(`bg-${e.value.background}`)),e.value.text&&(oe(e.value.text)?(n.color=e.value.text,n.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:n}})}function Ve(e,t){const n=m(()=>({text:j(e)?e.value:t?e[t]:null})),{colorClasses:a,colorStyles:i}=re(n);return{textColorClasses:a,textColorStyles:i}}function me(e,t){const n=m(()=>({background:j(e)?e.value:t?e[t]:null})),{colorClasses:a,colorStyles:i}=re(n);return{backgroundColorClasses:a,backgroundColorStyles:i}}const yt=["elevated","flat","tonal","outlined","text","plain"];function Ee(e,t){return l(_e,null,[e&&l("span",{key:"overlay",class:`${t}__overlay`},null),l("span",{key:"underlay",class:`${t}__underlay`},null)])}const Be=p({color:String,variant:{type:String,default:"elevated",validator:e=>yt.includes(e)}},"variant");function Re(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();const n=m(()=>{const{variant:s}=ue(e);return`${t}--variant-${s}`}),{colorClasses:a,colorStyles:i}=re(m(()=>{const{variant:s,color:r}=ue(e);return{[["elevated","flat"].includes(s)?"background":"text"]:r}}));return{colorClasses:a,colorStyles:i,variantClasses:n}}const Z=w(!1)({name:"VDefaultsProvider",props:{defaults:Object,disabled:Boolean,reset:[Number,String],root:Boolean,scoped:Boolean},setup(e,t){let{slots:n}=t;const{defaults:a,disabled:i,reset:s,root:r,scoped:o}=Ze(e);return Ce(a,{reset:s,root:r,scoped:o,disabled:i}),()=>{var u;return(u=n.default)==null?void 0:u.call(n)}}});const bt=["x-small","small","default","large","x-large"],ze=p({size:{type:[String,Number],default:"default"}},"size");function Pe(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();return Se(()=>{let n,a;return Y(bt,e.size)?n=`${t}--size-${e.size}`:e.size&&(a={width:g(e.size),height:g(e.size)}),{sizeClasses:n,sizeStyles:a}})}const pt=p({color:String,start:Boolean,end:Boolean,icon:O,...T(),...ze(),...F({tag:"i"}),...U()},"v-icon"),St=w()({name:"VIcon",props:pt(),setup(e,t){let{attrs:n,slots:a}=t,i;a.default&&(i=m(()=>{var f,y;const v=(f=a.default)==null?void 0:f.call(a);if(v)return(y=v.filter(b=>b.type===et&&b.children&&typeof b.children=="string")[0])==null?void 0:y.children}));const{themeClasses:s}=K(e),{iconData:r}=Je(i||e),{sizeClasses:o}=Pe(e),{textColorClasses:u,textColorStyles:c}=Ve(ke(e,"color"));return I(()=>l(r.value.component,{tag:e.tag,icon:r.value.icon,class:["v-icon","notranslate",s.value,o.value,u.value,{"v-icon--clickable":!!n.onClick,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[o.value?void 0:{fontSize:g(e.size),height:g(e.size),width:g(e.size)},c.value,e.style],role:n.onClick?"button":void 0,"aria-hidden":!n.onClick},{default:()=>{var v;return[(v=a.default)==null?void 0:v.call(a)]}})),{}}});function _t(e,t){const n=E(),a=E(!1);if(te){const i=new IntersectionObserver(s=>{e==null||e(s,i),a.value=!!s.find(r=>r.isIntersecting)},t);tt(()=>{i.disconnect()}),X(n,(s,r)=>{r&&(i.unobserve(r),a.value=!1),s&&i.observe(s)},{flush:"post"})}return{intersectionRef:n,isIntersecting:a}}const J=Symbol("rippleStop"),Ct=80;function fe(e,t){e.style.transform=t,e.style.webkitTransform=t}function ee(e){return e.constructor.name==="TouchEvent"}function Ae(e){return e.constructor.name==="KeyboardEvent"}const kt=function(e,t){var f;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=0,i=0;if(!Ae(e)){const y=t.getBoundingClientRect(),b=ee(e)?e.touches[e.touches.length-1]:e;a=b.clientX-y.left,i=b.clientY-y.top}let s=0,r=.3;(f=t._ripple)!=null&&f.circle?(r=.15,s=t.clientWidth/2,s=n.center?s:s+Math.sqrt((a-s)**2+(i-s)**2)/4):s=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const o=`${(t.clientWidth-s*2)/2}px`,u=`${(t.clientHeight-s*2)/2}px`,c=n.center?o:`${a-s}px`,v=n.center?u:`${i-s}px`;return{radius:s,scale:r,x:c,y:v,centerX:o,centerY:u}},q={show(e,t){var b;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((b=t==null?void 0:t._ripple)!=null&&b.enabled))return;const a=document.createElement("span"),i=document.createElement("span");a.appendChild(i),a.className="v-ripple__container",n.class&&(a.className+=` ${n.class}`);const{radius:s,scale:r,x:o,y:u,centerX:c,centerY:v}=kt(e,t,n),f=`${s*2}px`;i.className="v-ripple__animation",i.style.width=f,i.style.height=f,t.appendChild(a);const y=window.getComputedStyle(t);y&&y.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),i.classList.add("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--visible"),fe(i,`translate(${o}, ${u}) scale3d(${r},${r},${r})`),i.dataset.activated=String(performance.now()),setTimeout(()=>{i.classList.remove("v-ripple__animation--enter"),i.classList.add("v-ripple__animation--in"),fe(i,`translate(${c}, ${v}) scale3d(1,1,1)`)},0)},hide(e){var s;if(!((s=e==null?void 0:e._ripple)!=null&&s.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const n=t[t.length-1];if(n.dataset.isHiding)return;n.dataset.isHiding="true";const a=performance.now()-Number(n.dataset.activated),i=Math.max(250-a,0);setTimeout(()=>{n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),setTimeout(()=>{var o;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((o=n.parentNode)==null?void 0:o.parentNode)===e&&e.removeChild(n.parentNode)},300)},i)}};function Ne(e){return typeof e>"u"||!!e}function W(e){const t={},n=e.currentTarget;if(!(!(n!=null&&n._ripple)||n._ripple.touched||e[J])){if(e[J]=!0,ee(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;if(t.center=n._ripple.centered||Ae(e),n._ripple.class&&(t.class=n._ripple.class),ee(e)){if(n._ripple.showTimerCommit)return;n._ripple.showTimerCommit=()=>{q.show(e,n,t)},n._ripple.showTimer=window.setTimeout(()=>{var a;(a=n==null?void 0:n._ripple)!=null&&a.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null)},Ct)}else q.show(e,n,t)}}function ge(e){e[J]=!0}function _(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{_(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),q.hide(t)}}function Oe(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let D=!1;function He(e){!D&&(e.keyCode===ce.enter||e.keyCode===ce.space)&&(D=!0,W(e))}function We(e){D=!1,_(e)}function De(e){D&&(D=!1,_(e))}function je(e,t,n){const{value:a,modifiers:i}=t,s=Ne(a);if(s||q.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=s,e._ripple.centered=i.center,e._ripple.circle=i.circle,nt(a)&&a.class&&(e._ripple.class=a.class),s&&!n){if(i.stop){e.addEventListener("touchstart",ge,{passive:!0}),e.addEventListener("mousedown",ge);return}e.addEventListener("touchstart",W,{passive:!0}),e.addEventListener("touchend",_,{passive:!0}),e.addEventListener("touchmove",Oe,{passive:!0}),e.addEventListener("touchcancel",_),e.addEventListener("mousedown",W),e.addEventListener("mouseup",_),e.addEventListener("mouseleave",_),e.addEventListener("keydown",He),e.addEventListener("keyup",We),e.addEventListener("blur",De),e.addEventListener("dragstart",_,{passive:!0})}else!s&&n&&Fe(e)}function Fe(e){e.removeEventListener("mousedown",W),e.removeEventListener("touchstart",W),e.removeEventListener("touchend",_),e.removeEventListener("touchmove",Oe),e.removeEventListener("touchcancel",_),e.removeEventListener("mouseup",_),e.removeEventListener("mouseleave",_),e.removeEventListener("keydown",He),e.removeEventListener("keyup",We),e.removeEventListener("dragstart",_),e.removeEventListener("blur",De)}function wt(e,t){je(e,t,!1)}function xt(e){delete e._ripple,Fe(e)}function Tt(e,t){if(t.value===t.oldValue)return;const n=Ne(t.oldValue);je(e,t,n)}const It={mounted:wt,unmounted:xt,updated:Tt},Me=p({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function Xe(e){return{dimensionStyles:m(()=>({height:g(e.height),maxHeight:g(e.maxHeight),maxWidth:g(e.maxWidth),minHeight:g(e.minHeight),minWidth:g(e.minWidth),width:g(e.width)}))}}const he={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},Ye=p({location:String},"location");function qe(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2?arguments[2]:void 0;const{isRtl:a}=we();return{locationStyles:m(()=>{if(!e.location)return{};const{side:s,align:r}=dt(e.location.split(" ").length>1?e.location:`${e.location} center`,a.value);function o(c){return n?n(c):0}const u={};return s!=="center"&&(t?u[he[s]]=`calc(100% - ${o(s)}px)`:u[s]=0),r!=="center"?t?u[he[r]]=`calc(100% - ${o(r)}px)`:u[r]=0:(s==="center"?u.top=u.left="50%":u[{top:"left",bottom:"left",left:"top",right:"top"}[s]]="50%",u.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[s]),u})}}const $t=w()({name:"VProgressLinear",props:{absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...T(),...Ye({location:"top"}),...se(),...F(),...U()},emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const a=at(e,"modelValue"),{isRtl:i}=we(),{themeClasses:s}=K(e),{locationStyles:r}=qe(e),{textColorClasses:o,textColorStyles:u}=Ve(e,"color"),{backgroundColorClasses:c,backgroundColorStyles:v}=me(m(()=>e.bgColor||e.color)),{backgroundColorClasses:f,backgroundColorStyles:y}=me(e,"color"),{roundedClasses:b}=ie(e),{intersectionRef:$,isIntersecting:P}=_t(),S=m(()=>parseInt(e.max,10)),k=m(()=>parseInt(e.height,10)),x=m(()=>parseFloat(e.bufferValue)/S.value*100),B=m(()=>parseFloat(a.value)/S.value*100),L=m(()=>i.value!==e.reverse),H=m(()=>e.indeterminate?"fade-transition":"slide-x-transition"),A=m(()=>e.bgOpacity==null?e.bgOpacity:parseFloat(e.bgOpacity));function N(d){if(!$.value)return;const{left:h,right:C,width:V}=$.value.getBoundingClientRect(),R=L.value?V-d.clientX+(C-V):d.clientX-h;a.value=Math.round(R/V*S.value)}return I(()=>l(e.tag,{ref:$,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&P.value,"v-progress-linear--reverse":L.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},b.value,s.value,e.class],style:[{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?g(k.value):0,"--v-progress-linear-height":g(k.value),...r.value},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:B.value,onClick:e.clickable&&N},{default:()=>[e.stream&&l("div",{key:"stream",class:["v-progress-linear__stream",o.value],style:{...u.value,[L.value?"left":"right"]:g(-k.value),borderTop:`${g(k.value/2)} dotted`,opacity:A.value,top:`calc(50% - ${g(k.value/4)})`,width:g(100-x.value,"%"),"--v-progress-linear-stream-to":g(k.value*(L.value?1:-1))}},null),l("div",{class:["v-progress-linear__background",c.value],style:[v.value,{opacity:A.value,width:g(e.stream?x.value:100,"%")}]},null),l(xe,{name:H.value},{default:()=>[e.indeterminate?l("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(d=>l("div",{key:d,class:["v-progress-linear__indeterminate",d,f.value],style:y.value},null))]):l("div",{class:["v-progress-linear__determinate",f.value],style:[y.value,{width:g(B.value,"%")}]},null)]}),n.default&&l("div",{class:"v-progress-linear__content"},[n.default({value:B.value,buffer:x.value})])]})),{}}}),Lt=p({loading:[Boolean,String]},"loader");function Vt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();return{loaderClasses:m(()=>({[`${t}--loading`]:e.loading}))}}function Et(e,t){var a;let{slots:n}=t;return l("div",{class:`${e.name}__loader`},[((a=n.default)==null?void 0:a.call(n,{color:e.color,isActive:e.active}))||l($t,{active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const Bt=["static","relative","fixed","absolute","sticky"],Rt=p({position:{type:String,validator:e=>Bt.includes(e)}},"position");function zt(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:z();return{positionClasses:m(()=>e.position?`${t}--${e.position}`:void 0)}}function en(){var e,t;return(t=(e=pe("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function Pt(e,t){const n=st("RouterLink"),a=m(()=>!!(e.href||e.to)),i=m(()=>(a==null?void 0:a.value)||de(t,"click")||de(e,"click"));if(typeof n=="string")return{isLink:a,isClickable:i,href:ke(e,"href")};const s=e.to?n.useLink(e):void 0;return{isLink:a,isClickable:i,route:s==null?void 0:s.route,navigate:s==null?void 0:s.navigate,isActive:s&&m(()=>{var r,o;return e.exact?(r=s.isExactActive)==null?void 0:r.value:(o=s.isActive)==null?void 0:o.value}),href:m(()=>e.to?s==null?void 0:s.route.value.href:e.href)}}const At=p({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let G=!1;function tn(e,t){let n=!1,a,i;it&&(Te(()=>{window.addEventListener("popstate",s),a=e==null?void 0:e.beforeEach((r,o,u)=>{G?n?t(u):u():setTimeout(()=>n?t(u):u()),G=!0}),i=e==null?void 0:e.afterEach(()=>{G=!1})}),rt(()=>{window.removeEventListener("popstate",s),a==null||a(),i==null||i()}));function s(r){var o;(o=r.state)!=null&&o.replaced||(n=!0,setTimeout(()=>n=!1))}}const Nt=w()({name:"VCardActions",props:T(),setup(e,t){let{slots:n}=t;return Ce({VBtn:{variant:"text"}}),I(()=>{var a;return l("div",{class:["v-card-actions",e.class],style:e.style},[(a=n.default)==null?void 0:a.call(n)])}),{}}});function Ot(e){return{aspectStyles:m(()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0})}}const Ht=w()({name:"VResponsive",props:{aspectRatio:[String,Number],contentClass:String,...T(),...Me()},setup(e,t){let{slots:n}=t;const{aspectStyles:a}=Ot(e),{dimensionStyles:i}=Xe(e);return I(()=>{var s;return l("div",{class:["v-responsive",e.class],style:[i.value,e.style]},[l("div",{class:"v-responsive__sizer",style:a.value},null),(s=n.additional)==null?void 0:s.call(n),n.default&&l("div",{class:["v-responsive__content",e.contentClass]},[n.default()])])}),{}}});function Wt(e,t){if(!te)return;const n=t.modifiers||{},a=t.value,{handler:i,options:s}=typeof a=="object"?a:{handler:a,options:{}},r=new IntersectionObserver(function(){var f;let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],u=arguments.length>1?arguments[1]:void 0;const c=(f=e._observe)==null?void 0:f[t.instance.$.uid];if(!c)return;const v=o.some(y=>y.isIntersecting);i&&(!n.quiet||c.init)&&(!n.once||v||c.init)&&i(v,o,u),v&&n.once?Ue(e,t):c.init=!0},s);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:r},r.observe(e)}function Ue(e,t){var a;const n=(a=e._observe)==null?void 0:a[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const Dt={mounted:Wt,unmounted:Ue},jt=Dt,Ft=p({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),M=(e,t)=>{let{slots:n}=t;const{transition:a,...i}=e,{component:s=xe,...r}=typeof a=="object"?a:{};return be(s,lt(typeof a=="string"?{name:a}:r,i),n)},Ke=w()({name:"VImg",directives:{intersect:jt},props:{aspectRatio:[String,Number],alt:String,cover:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},srcset:String,width:[String,Number],...T(),...Ft()},emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:n,slots:a}=t;const i=E(""),s=E(),r=E(e.eager?"loading":"idle"),o=E(),u=E(),c=m(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),v=m(()=>c.value.aspect||o.value/u.value||0);X(()=>e.src,()=>{f(r.value!=="idle")}),X(v,(d,h)=>{!d&&h&&s.value&&S(s.value)}),ot(()=>f());function f(d){if(!(e.eager&&d)&&!(te&&!d&&!e.eager)){if(r.value="loading",c.value.lazySrc){const h=new Image;h.src=c.value.lazySrc,S(h,null)}c.value.src&&Te(()=>{var h,C;if(n("loadstart",((h=s.value)==null?void 0:h.currentSrc)||c.value.src),(C=s.value)!=null&&C.complete){if(s.value.naturalWidth||b(),r.value==="error")return;v.value||S(s.value,null),y()}else v.value||S(s.value),$()})}}function y(){var d;$(),r.value="loaded",n("load",((d=s.value)==null?void 0:d.currentSrc)||c.value.src)}function b(){var d;r.value="error",n("error",((d=s.value)==null?void 0:d.currentSrc)||c.value.src)}function $(){const d=s.value;d&&(i.value=d.currentSrc||d.src)}let P=-1;function S(d){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const C=()=>{clearTimeout(P);const{naturalHeight:V,naturalWidth:R}=d;V||R?(o.value=R,u.value=V):!d.complete&&r.value==="loading"&&h!=null?P=window.setTimeout(C,h):(d.currentSrc.endsWith(".svg")||d.currentSrc.startsWith("data:image/svg+xml"))&&(o.value=1,u.value=1)};C()}const k=m(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),x=()=>{var C;if(!c.value.src||r.value==="idle")return null;const d=l("img",{class:["v-img__img",k.value],src:c.value.src,srcset:c.value.srcset,alt:e.alt,sizes:e.sizes,ref:s,onLoad:y,onError:b},null),h=(C=a.sources)==null?void 0:C.call(a);return l(M,{transition:e.transition,appear:!0},{default:()=>[Q(h?l("picture",{class:"v-img__picture"},[h,d]):d,[[ut,r.value==="loaded"]])]})},B=()=>l(M,{transition:e.transition},{default:()=>[c.value.lazySrc&&r.value!=="loaded"&&l("img",{class:["v-img__img","v-img__img--preload",k.value],src:c.value.lazySrc,alt:e.alt},null)]}),L=()=>a.placeholder?l(M,{transition:e.transition,appear:!0},{default:()=>[(r.value==="loading"||r.value==="error"&&!a.error)&&l("div",{class:"v-img__placeholder"},[a.placeholder()])]}):null,H=()=>a.error?l(M,{transition:e.transition,appear:!0},{default:()=>[r.value==="error"&&l("div",{class:"v-img__error"},[a.error()])]}):null,A=()=>e.gradient?l("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,N=E(!1);{const d=X(v,h=>{h&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{N.value=!0})}),d())})}return I(()=>Q(l(Ht,{class:["v-img",{"v-img--booting":!N.value},e.class],style:[{width:g(e.width==="auto"?o.value:e.width)},e.style],aspectRatio:v.value,"aria-label":e.alt,role:e.alt?"img":void 0},{additional:()=>l(_e,null,[l(x,null,null),l(B,null,null),l(A,null,null),l(L,null,null),l(H,null,null)]),default:a.default}),[[Ie("intersect"),{handler:f,options:e.options},null,{once:!0}]])),{currentSrc:i,image:s,state:r,naturalWidth:o,naturalHeight:u}}}),Mt=p({start:Boolean,end:Boolean,icon:O,image:String,...T(),...ae(),...se(),...ze(),...F(),...U(),...Be({variant:"flat"})},"v-avatar"),ye=w()({name:"VAvatar",props:Mt(),setup(e,t){let{slots:n}=t;const{themeClasses:a}=K(e),{colorClasses:i,colorStyles:s,variantClasses:r}=Re(e),{densityClasses:o}=Le(e),{roundedClasses:u}=ie(e),{sizeClasses:c,sizeStyles:v}=Pe(e);return I(()=>l(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,i.value,o.value,u.value,c.value,r.value,e.class],style:[s.value,v.value,e.style]},{default:()=>{var f;return[e.image?l(Ke,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?l(St,{key:"icon",icon:e.icon},null):(f=n.default)==null?void 0:f.call(n),Ee(!1,"v-avatar")]}})),{}}}),Xt=ne("v-card-subtitle"),Yt=ne("v-card-title"),qt=w()({name:"VCardItem",props:{appendAvatar:String,appendIcon:O,prependAvatar:String,prependIcon:O,subtitle:String,title:String,...T(),...ae()},setup(e,t){let{slots:n}=t;return I(()=>{var c;const a=!!(e.prependAvatar||e.prependIcon),i=!!(a||n.prepend),s=!!(e.appendAvatar||e.appendIcon),r=!!(s||n.append),o=!!(e.title||n.title),u=!!(e.subtitle||n.subtitle);return l("div",{class:["v-card-item",e.class],style:e.style},[i&&l("div",{key:"prepend",class:"v-card-item__prepend"},[n.prepend?l(Z,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},n.prepend):a&&l(ye,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),l("div",{class:"v-card-item__content"},[o&&l(Yt,{key:"title"},{default:()=>{var v;return[((v=n.title)==null?void 0:v.call(n))??e.title]}}),u&&l(Xt,{key:"subtitle"},{default:()=>{var v;return[((v=n.subtitle)==null?void 0:v.call(n))??e.subtitle]}}),(c=n.default)==null?void 0:c.call(n)]),r&&l("div",{key:"append",class:"v-card-item__append"},[n.append?l(Z,{key:"append-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},n.append):s&&l(ye,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])}),{}}}),Ut=ne("v-card-text"),nn=w()({name:"VCard",directives:{Ripple:It},props:{appendAvatar:String,appendIcon:O,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:O,ripple:{type:Boolean,default:!0},subtitle:String,text:String,title:String,...vt(),...T(),...ae(),...Me(),...gt(),...Lt(),...Ye(),...Rt(),...se(),...At(),...F(),...U(),...Be({variant:"elevated"})},setup(e,t){let{attrs:n,slots:a}=t;const{themeClasses:i}=K(e),{borderClasses:s}=mt(e),{colorClasses:r,colorStyles:o,variantClasses:u}=Re(e),{densityClasses:c}=Le(e),{dimensionStyles:v}=Xe(e),{elevationClasses:f}=ht(e),{loaderClasses:y}=Vt(e),{locationStyles:b}=qe(e),{positionClasses:$}=zt(e),{roundedClasses:P}=ie(e),S=Pt(e,n),k=m(()=>e.link!==!1&&S.isLink.value),x=m(()=>!e.disabled&&e.link!==!1&&(e.link||S.isClickable.value));return I(()=>{const B=k.value?"a":e.tag,L=!!(a.title||e.title),H=!!(a.subtitle||e.subtitle),A=L||H,N=!!(a.append||e.appendAvatar||e.appendIcon),d=!!(a.prepend||e.prependAvatar||e.prependIcon),h=!!(a.image||e.image),C=A||d||N,V=!!(a.text||e.text);return Q(l(B,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":x.value},i.value,s.value,r.value,c.value,f.value,y.value,$.value,P.value,u.value,e.class],style:[o.value,v.value,b.value,e.style],href:S.href.value,onClick:x.value&&S.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var R;return[h&&l("div",{key:"image",class:"v-card__image"},[a.image?l(Z,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):l(Ke,{key:"image-img",cover:!0,src:e.image},null)]),l(Et,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),C&&l(qt,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),V&&l(Ut,{key:"text"},{default:()=>{var le;return[((le=a.text)==null?void 0:le.call(a))??e.text]}}),(R=a.default)==null?void 0:R.call(a),a.actions&&l(Nt,null,{default:a.actions}),Ee(x.value,"v-card")]}}),[[Ie("ripple"),x.value&&e.ripple]])}),{}}});const an=w()({name:"VContainer",props:{fluid:{type:Boolean,default:!1},...T(),...F()},setup(e,t){let{slots:n}=t;return I(()=>l(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},e.class],style:e.style},n)),{}}});export{tn as $,Vt as A,ne as B,Me as C,Ye as D,Rt as E,Be as F,Re as G,Xe as H,jt as I,qe as J,zt as K,Et as L,M,Ee as N,At as O,ze as P,Pe as Q,It as R,Pt as S,ye as T,_t as U,Ke as V,dt as W,Gt as X,Qt as Y,Zt as Z,Jt as _,F as a,vt as b,gt as c,se as d,me as e,mt as f,ht as g,ie as h,Z as i,en as j,Ut as k,nn as l,T as m,an as n,Nt as o,Yt as p,ae as q,St as r,Le as s,ve as t,I as u,Ve as v,Ft as w,Xt as x,$t as y,Lt as z};
