import{y as V,J as T,K as H,z as R,ay as F,C as _,A as x,N as P,l as a,O as I,Y as O,az as z,P as D,T as A,M as U,V as $,U as L,_ as M,R as f}from"./vendor.js";import{v as J,w as K,g as N,i as W,x as Y}from"./VList.js";import{V as j}from"./dialog-transition.js";import{s as b,m as w,d as q,e as G,f as Q,g as X,u as Z,h as p,i as ee,k as te}from"./VContainer.js";const ae=V({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...J({origin:"center center",scrollStrategy:"block",transition:{component:j},zIndex:2400})},"v-dialog"),de=T()({name:"VDialog",props:ae(),emits:{"update:modelValue":e=>!0},setup(e,v){let{slots:t}=v;const r=H(e,"modelValue"),{scopeId:d}=K(),n=R();function m(i){var s,u;const o=i.relatedTarget,l=i.target;if(o!==l&&((s=n.value)!=null&&s.contentEl)&&((u=n.value)!=null&&u.globalTop)&&![document,n.value.contentEl].includes(l)&&!n.value.contentEl.contains(l)){const c=z(n.value.contentEl);if(!c.length)return;const g=c[0],y=c[c.length-1];o===g?y.focus():g.focus()}}F&&_(()=>r.value&&e.retainFocus,i=>{i?document.addEventListener("focusin",m):document.removeEventListener("focusin",m)},{immediate:!0}),_(r,async i=>{var o,l;await O(),i?(o=n.value.contentEl)==null||o.focus({preventScroll:!0}):(l=n.value.activatorEl)==null||l.focus({preventScroll:!0})});const h=x(()=>I({"aria-haspopup":"dialog","aria-expanded":String(r.value)},e.activatorProps));return P(()=>{const[i]=N.filterProps(e);return a(N,I({ref:n,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},i,{modelValue:r.value,"onUpdate:modelValue":o=>r.value=o,"aria-modal":"true",activatorProps:h.value,role:"dialog"},d),{activator:t.activator,default:function(){for(var o=arguments.length,l=new Array(o),s=0;s<o;s++)l[s]=arguments[s];return a(b,{root:!0},{default:()=>{var u;return[(u=t.default)==null?void 0:u.call(t,...l)]}})}})}),W({},n)}});const le=V({text:String,...D(),...w()},"v-toolbar-title"),oe=T()({name:"VToolbarTitle",props:le(),setup(e,v){let{slots:t}=v;return P(()=>{const r=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var d;return[r&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(d=t.default)==null?void 0:d.call(t)])]}})}),{}}}),ne=[null,"prominent","default","comfortable","compact"],se=V({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>ne.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...q(),...D(),...G(),...Q(),...w({tag:"header"}),...A()},"v-toolbar"),ve=T()({name:"VToolbar",props:se(),setup(e,v){var c;let{slots:t}=v;const{backgroundColorClasses:r,backgroundColorStyles:d}=X(U(e,"color")),{borderClasses:n}=Z(e),{elevationClasses:m}=p(e),{roundedClasses:h}=ee(e),{themeClasses:i}=$(e),{rtlClasses:o}=L(),l=R(!!(e.extended||(c=t.extension)!=null&&c.call(t))),s=x(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),u=x(()=>l.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return M({VBtn:{variant:"text"}}),P(()=>{var E;const g=!!(e.title||t.title),y=!!(t.image||e.image),k=(E=t.extension)==null?void 0:E.call(t);return l.value=!!(e.extended||k),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},r.value,n.value,m.value,h.value,i.value,o.value,e.class],style:[d.value,e.style]},{default:()=>[y&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(b,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(te,{key:"image-img",cover:!0,src:e.image},null)]),a(b,{defaults:{VTabs:{height:f(s.value)}}},{default:()=>{var S,B,C;return[a("div",{class:"v-toolbar__content",style:{height:f(s.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(S=t.prepend)==null?void 0:S.call(t)]),g&&a(oe,{key:"title",text:e.title},{text:t.title}),(B=t.default)==null?void 0:B.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(C=t.append)==null?void 0:C.call(t)])])]}}),a(b,{defaults:{VTabs:{height:f(u.value)}}},{default:()=>[a(Y,null,{default:()=>[l.value&&a("div",{class:"v-toolbar__extension",style:{height:f(u.value)}},[k])]})]})]})}),{contentHeight:s,extensionHeight:u}}});export{de as V,ve as a,le as b,oe as c,se as m};
