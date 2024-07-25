import{E as V,H as w,x as N,ar as H,z as B,y as x,K as T,j as a,L as C,W as F,as as L,v as _,N as R,R as O,J as $,T as z,Y as A,P as b}from"./vendor.js";import{t as U,v as W,e as I,g as j,w as J}from"./VList.js";import{V as K}from"./dialog-transition.js";import{s as h,m as D,d as M,e as Y,f as q,g as G,u as Q,h as X,i as Z,k as p}from"./VContainer.js";const ie=V()({name:"VDialog",props:{fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...U({origin:"center center",scrollStrategy:"block",transition:{component:K},zIndex:2400})},emits:{"update:modelValue":e=>!0},setup(e,v){let{slots:t}=v;const i=w(e,"modelValue"),{scopeId:c}=W(),n=N();function m(r){var s,u;const l=r.relatedTarget,o=r.target;if(l!==o&&((s=n.value)!=null&&s.contentEl)&&((u=n.value)!=null&&u.globalTop)&&![document,n.value.contentEl].includes(o)&&!n.value.contentEl.contains(o)){const d=L(n.value.contentEl);if(!d.length)return;const g=d[0],f=d[d.length-1];l===g?f.focus():g.focus()}}H&&B(()=>i.value&&e.retainFocus,r=>{r?document.addEventListener("focusin",m):document.removeEventListener("focusin",m)},{immediate:!0}),B(i,async r=>{var l,o;await F(),r?(l=n.value.contentEl)==null||l.focus({preventScroll:!0}):(o=n.value.activatorEl)==null||o.focus({preventScroll:!0})});const y=x(()=>C({"aria-haspopup":"dialog","aria-expanded":String(i.value)},e.activatorProps));return T(()=>{const[r]=I.filterProps(e);return a(I,C({ref:n,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},r,{modelValue:i.value,"onUpdate:modelValue":l=>i.value=l,"aria-modal":"true",activatorProps:y.value,role:"dialog"},c),{activator:t.activator,default:function(){for(var l=arguments.length,o=new Array(l),s=0;s<l;s++)o[s]=arguments[s];return a(h,{root:!0},{default:()=>{var u;return[(u=t.default)==null?void 0:u.call(t,...o)]}})}})}),j({},n)}});const ee=_({text:String,...R(),...D()},"v-toolbar-title"),te=V()({name:"VToolbarTitle",props:ee(),setup(e,v){let{slots:t}=v;return T(()=>{const i=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var c;return[i&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(c=t.default)==null?void 0:c.call(t)])]}})}),{}}}),ae=[null,"prominent","default","comfortable","compact"],le=_({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>ae.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...M(),...R(),...Y(),...q(),...D({tag:"header"}),...O()},"v-toolbar"),ue=V()({name:"VToolbar",props:le(),setup(e,v){var u;let{slots:t}=v;const{backgroundColorClasses:i,backgroundColorStyles:c}=G($(e,"color")),{borderClasses:n}=Q(e),{elevationClasses:m}=X(e),{roundedClasses:y}=Z(e),{themeClasses:r}=z(e),l=N(!!(e.extended||(u=t.extension)!=null&&u.call(t))),o=x(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),s=x(()=>l.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return A({VBtn:{variant:"text"}}),T(()=>{var P;const d=!!(e.title||t.title),g=!!(t.image||e.image),f=(P=t.extension)==null?void 0:P.call(t);return l.value=!!(e.extended||f),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},i.value,n.value,m.value,y.value,r.value,e.class],style:[c.value,e.style]},{default:()=>[g&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(h,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(p,{key:"image-img",cover:!0,src:e.image},null)]),a(h,{defaults:{VTabs:{height:b(o.value)}}},{default:()=>{var k,E,S;return[a("div",{class:"v-toolbar__content",style:{height:b(o.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(k=t.prepend)==null?void 0:k.call(t)]),d&&a(te,{key:"title",text:e.title},{text:t.title}),(E=t.default)==null?void 0:E.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(S=t.append)==null?void 0:S.call(t)])])]}}),a(h,{defaults:{VTabs:{height:b(s.value)}}},{default:()=>[a(J,null,{default:()=>[l.value&&a("div",{class:"v-toolbar__extension",style:{height:b(s.value)}},[f])]})]})]})}),{contentHeight:o,extensionHeight:s}}});export{ie as V,ue as a,ee as b,te as c,le as m};
