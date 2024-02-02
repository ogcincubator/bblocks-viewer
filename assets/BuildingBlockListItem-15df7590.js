import{s as et,a as ce,b as tt,m as Te,u as Me,c as oe,d as me,e as lt,f as at,g as nt}from"./BuildingBlock-14f93393.js";import{_ as Ce,J as H,M as he,L as S,W as j,P as G,O as Z,p as de,I as ge,X as Ue,n as ut,l as te,x as $,d as xe,c as b,e as Re,Y as st,s as it,t as K,m as n,r as w,Z as ot,$ as rt,a0 as ct,y as O,i as Le,a1 as re,a2 as pe,B as be,a3 as Fe,w as ke,a4 as Ee,F as ye,a5 as dt,a6 as Ie,a7 as vt,E as we,G as Pe,a8 as ft,H as Ke,S as z,K as q,a9 as Ae,Q as mt}from"./index-0c79fc56.js";import{m as ht,i as je,j as gt,k as Be,g as De,l as Se,n as yt,o as Ne,c as ze,d as ee,b as ie,e as Ve}from"./VList-72bc0012.js";import{q as bt,m as He,u as le,R as kt,r as Vt,s as Ct,v as $e,i as _e,w as Ge,p as xt,x as Ft,k as St,l as _t}from"./VContainer-deded9d6.js";const pt={props:{status:String,variant:{type:String,default:"flat"},size:{type:String,default:"small"}},computed:{color(){return et[this.status]||null},label(){return this.status.charAt(0).toUpperCase()+this.status.substring(1).replaceAll("-"," ")}}};function It(e,l,t,i,s,r){return t.status?(H(),he(ce,{key:0,variant:t.variant,color:r.color,size:t.size},{default:S(()=>[j(G(r.label),1)]),_:1},8,["variant","color","size"])):Z("",!0)}const Qe=Ce(pt,[["render",It]]);const We=Symbol.for("vuetify:selection-control-group"),Ye=de({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,falseIcon:ge,trueIcon:ge,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:Ue},...ut(),...bt()},"v-selection-control-group");te()({name:"VSelectionControlGroup",props:{defaultsTarget:{type:String,default:"VSelectionControl"},...He(),...Ye()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const i=$(e,"modelValue"),s=xe(),r=b(()=>e.id||`v-selection-control-group-${s}`),d=b(()=>e.name||r.value),o=new Set;return Re(We,{modelValue:i,forceUpdate:()=>{o.forEach(a=>a())},onForceUpdate:a=>{o.add(a),st(()=>{o.delete(a)})}}),it({[e.defaultsTarget]:{color:K(e,"color"),disabled:K(e,"disabled"),density:K(e,"density"),error:K(e,"error"),inline:K(e,"inline"),modelValue:i,multiple:b(()=>!!e.multiple||e.multiple==null&&Array.isArray(i.value)),name:d,falseIcon:K(e,"falseIcon"),trueIcon:K(e,"trueIcon"),readonly:K(e,"readonly"),ripple:K(e,"ripple"),type:K(e,"type"),valueComparator:K(e,"valueComparator")}}),le(()=>{var a;return n("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(a=t.default)==null?void 0:a.call(t)])}),{}}});const Je=de({label:String,trueValue:null,falseValue:null,value:null,...He(),...Ye()},"v-selection-control");function wt(e){const l=Le(We,void 0),{densityClasses:t}=Ct(e),i=$(e,"modelValue"),s=b(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),r=b(()=>e.falseValue!==void 0?e.falseValue:!1),d=b(()=>!!e.multiple||e.multiple==null&&Array.isArray(i.value)),o=b({get(){const g=l?l.modelValue.value:i.value;return d.value?g.some(v=>e.valueComparator(v,s.value)):e.valueComparator(g,s.value)},set(g){if(e.readonly)return;const v=g?s.value:r.value;let y=v;d.value&&(y=g?[...re(i.value),v]:re(i.value).filter(P=>!e.valueComparator(P,s.value))),l?l.modelValue.value=y:i.value=y}}),{textColorClasses:a,textColorStyles:f}=$e(b(()=>o.value&&!e.error&&!e.disabled?e.color:void 0)),h=b(()=>o.value?e.trueIcon:e.falseIcon);return{group:l,densityClasses:t,trueValue:s,falseValue:r,model:o,textColorClasses:a,textColorStyles:f,icon:h}}const Pt=te()({name:"VSelectionControl",directives:{Ripple:kt},inheritAttrs:!1,props:Je(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:t,slots:i}=l;const{group:s,densityClasses:r,icon:d,model:o,textColorClasses:a,textColorStyles:f,trueValue:h}=wt(e),g=xe(),v=b(()=>e.id||`input-${g}`),y=w(!1),P=w(!1),p=w();s==null||s.onForceUpdate(()=>{p.value&&(p.value.checked=o.value)});function B(_){y.value=!0,(!pe||pe&&_.target.matches(":focus-visible"))&&(P.value=!0)}function C(){y.value=!1,P.value=!1}function I(_){e.readonly&&s&&be(()=>s.forceUpdate()),o.value=_.target.checked}return le(()=>{var T,U;const _=i.label?i.label({label:e.label,props:{for:v.value}}):e.label,[Q,ae]=ot(t);return n("div",O({class:["v-selection-control",{"v-selection-control--dirty":o.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":y.value,"v-selection-control--focus-visible":P.value,"v-selection-control--inline":e.inline},r.value,e.class]},Q,{style:e.style}),[n("div",{class:["v-selection-control__wrapper",a.value],style:f.value},[(T=i.default)==null?void 0:T.call(i),rt(n("div",{class:["v-selection-control__input"]},[d.value&&n(Vt,{key:"icon",icon:d.value},null),n("input",O({ref:p,checked:o.value,disabled:e.disabled,id:v.value,onBlur:C,onFocus:B,onInput:I,"aria-disabled":e.readonly,type:e.type,value:h.value,name:e.name,"aria-checked":e.type==="checkbox"?o.value:void 0},ae),null),(U=i.input)==null?void 0:U.call(i,{model:o,textColorClasses:a,textColorStyles:f,props:{onFocus:B,onBlur:C,id:v.value}})]),[[ct("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),_&&n(tt,{for:v.value,clickable:!0},{default:()=>[_]})])}),{isFocused:y,input:p}}}),At=de({indeterminate:Boolean,indeterminateIcon:{type:ge,default:"$checkboxIndeterminate"},...Je({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"v-checkbox-btn"),Xe=te()({name:"VCheckboxBtn",props:At(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{slots:t}=l;const i=$(e,"indeterminate"),s=$(e,"modelValue");function r(a){i.value&&(i.value=!1)}const d=b(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),o=b(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return le(()=>n(Pt,O(e,{modelValue:s.value,"onUpdate:modelValue":[a=>s.value=a,r],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",inline:!0,falseIcon:d.value,trueIcon:o.value,"aria-checked":e.indeterminate?"mixed":void 0}),t)),{}}});const Ze=te()({name:"VMenu",props:{id:String,...Fe(ht({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:je}}),["absolute"])},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const i=$(e,"modelValue"),{scopeId:s}=gt(),r=xe(),d=b(()=>e.id||`v-menu-${r}`),o=w(),a=Le(Be,null),f=w(0);Re(Be,{register(){++f.value},unregister(){--f.value},closeParents(){setTimeout(()=>{f.value||(i.value=!1,a==null||a.closeParents())},40)}}),ke(i,v=>{v?a==null||a.register():a==null||a.unregister()});function h(){a==null||a.closeParents()}const g=b(()=>O({"aria-haspopup":"menu","aria-expanded":String(i.value),"aria-owns":d.value},e.activatorProps));return le(()=>{const[v]=De.filterProps(e);return n(De,O({ref:o,class:["v-menu",e.class],style:e.style},v,{modelValue:i.value,"onUpdate:modelValue":y=>i.value=y,absolute:!0,activatorProps:g.value,"onClick:outside":h},s),{activator:t.activator,default:function(){for(var y=arguments.length,P=new Array(y),p=0;p<y;p++)P[p]=arguments[p];return n(_e,{root:!0},{default:()=>{var B;return[(B=t.default)==null?void 0:B.call(t,...P)]}})}})}),Se({id:d,ΨopenChildren:f},o)}}),qe=de({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:ge,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,valueComparator:{type:Function,default:Ue},...yt({itemChildren:!1})},"v-select"),Oe=te()({name:"VSelect",props:{...qe(),...Fe(Te({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...Ge({transition:{component:je}})},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:t}=l;const{t:i}=Ee(),s=w(),r=w(),d=$(e,"menu"),o=b({get:()=>d.value,set:c=>{var V;d.value&&!c&&((V=r.value)!=null&&V.ΨopenChildren)||(d.value=c)}}),{items:a,transformIn:f,transformOut:h}=Ne(e),g=$(e,"modelValue",[],c=>f(re(c)),c=>{const V=h(c);return e.multiple?V:V[0]??null}),v=Me(),y=b(()=>g.value.map(c=>a.value.find(V=>e.valueComparator(V.value,c.value))||c)),P=b(()=>y.value.map(c=>c.props.value)),p=w(!1);let B="",C;const I=b(()=>e.hideSelected?a.value.filter(c=>!y.value.some(V=>V===c)):a.value),_=w();function Q(c){e.openOnClear&&(o.value=!0)}function ae(){e.hideNoData&&!a.value.length||e.readonly||v!=null&&v.isReadonly.value||(o.value=!o.value)}function T(c){var k,L,M,A;if(e.readonly||v!=null&&v.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(c.key)&&c.preventDefault(),["Enter","ArrowDown"," "].includes(c.key)&&(o.value=!0),["Escape","Tab"].includes(c.key)&&(o.value=!1),c.key==="ArrowDown"?(k=_.value)==null||k.focus("next"):c.key==="ArrowUp"?(L=_.value)==null||L.focus("prev"):c.key==="Home"?(M=_.value)==null||M.focus("first"):c.key==="End"&&((A=_.value)==null||A.focus("last"));const V=1e3;function R(u){const m=u.key.length===1,D=!u.ctrlKey&&!u.metaKey&&!u.altKey;return m&&D}if(e.multiple||!R(c))return;const Y=performance.now();Y-C>V&&(B=""),B+=c.key.toLowerCase(),C=Y;const J=a.value.find(u=>u.title.toLowerCase().startsWith(B));J!==void 0&&(g.value=[J])}function U(c){if(e.multiple){const V=P.value.findIndex(R=>e.valueComparator(R,c.value));if(V===-1)g.value=[...g.value,c];else{const R=[...g.value];R.splice(V,1),g.value=R}}else g.value=[c],o.value=!1}function ne(c){var V;(V=_.value)!=null&&V.$el.contains(c.relatedTarget)||(o.value=!1)}function ve(c){p.value=!0}function ue(c){var V;c.relatedTarget==null&&((V=s.value)==null||V.focus())}return le(()=>{const c=!!(e.chips||t.chip),V=!!(!e.hideNoData||I.value.length||t.prepend||t.append||t["no-data"]),R=g.value.length>0,[Y]=oe.filterProps(e),J=R||!p.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return n(oe,O({ref:s},Y,{modelValue:g.value.map(k=>k.props.value).join(", "),"onUpdate:modelValue":k=>{k==null&&(g.value=[])},focused:p.value,"onUpdate:focused":k=>p.value=k,validationValue:g.externalValue,dirty:R,class:["v-select",{"v-select--active-menu":o.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":g.value.length},e.class],style:e.style,appendInnerIcon:e.menuIcon,readonly:!0,placeholder:J,"onClick:clear":Q,"onMousedown:control":ae,onBlur:ne,onKeydown:T}),{...t,default:()=>n(ye,null,[n(Ze,O({ref:r,modelValue:o.value,"onUpdate:modelValue":k=>o.value=k,activator:"parent",contentClass:"v-select__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition},e.menuProps),{default:()=>[V&&n(ze,{ref:_,selected:P.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:k=>k.preventDefault(),onFocusin:ve,onFocusout:ue},{default:()=>{var k,L,M;return[!I.value.length&&!e.hideNoData&&(((k=t["no-data"])==null?void 0:k.call(t))??n(ee,{title:i(e.noDataText)},null)),(L=t["prepend-item"])==null?void 0:L.call(t),I.value.map((A,u)=>{var m;return t.item?(m=t.item)==null?void 0:m.call(t,{item:A,index:u,props:O(A.props,{onClick:()=>U(A)})}):n(ee,O({key:u},A.props,{onClick:()=>U(A)}),{prepend:D=>{let{isSelected:X}=D;return e.multiple&&!e.hideSelected?n(Xe,{modelValue:X,ripple:!1,tabindex:"-1"},null):void 0}})}),(M=t["append-item"])==null?void 0:M.call(t)]}})]}),y.value.map((k,L)=>{var u;function M(m){m.stopPropagation(),m.preventDefault(),U(k)}const A={"onClick:close":M,modelValue:!0,"onUpdate:modelValue":void 0};return n("div",{key:k.value,class:"v-select__selection"},[c?t.chip?n(_e,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:k.title}}},{default:()=>{var m;return[(m=t.chip)==null?void 0:m.call(t,{item:k,index:L,props:A})]}}):n(ce,O({key:"chip",closable:e.closableChips,size:"small",text:k.title},A),null):((u=t.selection)==null?void 0:u.call(t,{item:k,index:L}))??n("span",{class:"v-select__selection-text"},[k.title,e.multiple&&L<y.value.length-1&&n("span",{class:"v-select__selection-comma"},[j(",")])])])})])})}),Se({isFocused:p,menu:o,select:U},s)}}),Bt=(e,l,t)=>e==null||l==null?-1:e.toString().toLocaleLowerCase().indexOf(l.toString().toLocaleLowerCase()),Dt=de({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function Ot(e,l,t){var o;const i=[],s=(t==null?void 0:t.default)??Bt,r=t!=null&&t.filterKeys?re(t.filterKeys):!1,d=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return i;e:for(let a=0;a<e.length;a++){const f=e[a],h={},g={};let v=-1;if(l&&!(t!=null&&t.noFilter)){if(typeof f=="object"){const p=r||Object.keys(f);for(const B of p){const C=vt(f,B,f),I=(o=t==null?void 0:t.customKeyFilter)==null?void 0:o[B];if(v=I?I(C,l,f):s(C,l,f),v!==-1&&v!==!1)I?h[B]=v:g[B]=v;else if((t==null?void 0:t.filterMode)==="every")continue e}}else v=s(f,l,f),v!==-1&&v!==!1&&(g.title=v);const y=Object.keys(g).length,P=Object.keys(h).length;if(!y&&!P||(t==null?void 0:t.filterMode)==="union"&&P!==d&&!y||(t==null?void 0:t.filterMode)==="intersection"&&(P!==d||!y))continue}i.push({index:a,matches:{...g,...h}})}return i}function Tt(e,l,t,i){const s=b(()=>typeof(t==null?void 0:t.value)!="string"&&typeof(t==null?void 0:t.value)!="number"?"":String(t.value)),r=w([]),d=w(new Map);dt(()=>{r.value=[],d.value=new Map;const a=Ie(l);Ot(a,s.value,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:Ie(i==null?void 0:i.filterKeys)??e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}).forEach(h=>{let{index:g,matches:v}=h;const y=a[g];r.value.push(y),d.value.set(y.value,v)})});function o(a){return d.value.get(a.value)}return{filteredItems:r,filteredMatches:d,getMatches:o}}function Mt(e,l,t){if(l==null)return e;if(Array.isArray(l))throw new Error("Multiple matches is not implemented");return typeof l=="number"&&~l?n(ye,null,[n("span",{class:"v-autocomplete__unmask"},[e.substr(0,l)]),n("span",{class:"v-autocomplete__mask"},[e.substr(l,t)]),n("span",{class:"v-autocomplete__unmask"},[e.substr(l+t)])]):e}const Ut=te()({name:"VAutocomplete",props:{search:String,...Dt({filterKeys:["title"]}),...qe(),...Fe(Te({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...Ge({transition:!1})},emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:t}=l;const{t:i}=Ee(),s=w(),r=w(!1),d=w(!0),o=w(),a=$(e,"menu"),f=b({get:()=>a.value,set:u=>{var m;a.value&&!u&&((m=o.value)!=null&&m.ΨopenChildren)||(a.value=u)}}),h=w(-1),g=b(()=>{var u;return(u=s.value)==null?void 0:u.color}),{items:v,transformIn:y,transformOut:P}=Ne(e),{textColorClasses:p,textColorStyles:B}=$e(g),C=$(e,"search",""),I=$(e,"modelValue",[],u=>y(re(u)),u=>{const m=P(u);return e.multiple?m:m[0]??null}),_=Me(),{filteredItems:Q,getMatches:ae}=Tt(e,v,b(()=>d.value?void 0:C.value)),T=b(()=>I.value.map(u=>v.value.find(m=>e.valueComparator(m.value,u.value))||u)),U=b(()=>e.hideSelected?Q.value.filter(u=>!T.value.some(m=>m.value===u.value)):Q.value),ne=b(()=>T.value.map(u=>u.props.value)),ve=b(()=>T.value[h.value]),ue=w();function c(u){e.openOnClear&&(f.value=!0),C.value=""}function V(){e.hideNoData&&!v.value.length||e.readonly||_!=null&&_.isReadonly.value||(f.value=!0)}function R(u){var X,x,E,W;if(e.readonly||_!=null&&_.isReadonly.value)return;const m=s.value.selectionStart,D=ne.value.length;if((h.value>-1||["Enter","ArrowDown","ArrowUp"].includes(u.key))&&u.preventDefault(),["Enter","ArrowDown"].includes(u.key)&&(f.value=!0),["Escape"].includes(u.key)&&(f.value=!1),["Enter","Escape","Tab"].includes(u.key)&&(d.value=!0),u.key==="ArrowDown"?(X=ue.value)==null||X.focus("next"):u.key==="ArrowUp"&&((x=ue.value)==null||x.focus("prev")),!!e.multiple){if(["Backspace","Delete"].includes(u.key)){if(h.value<0){u.key==="Backspace"&&!C.value&&(h.value=D-1);return}const F=h.value;ve.value&&A(ve.value),h.value=F>=D-1?D-2:F}if(u.key==="ArrowLeft"){if(h.value<0&&m>0)return;const F=h.value>-1?h.value-1:D-1;T.value[F]?h.value=F:(h.value=-1,s.value.setSelectionRange((E=C.value)==null?void 0:E.length,(W=C.value)==null?void 0:W.length))}if(u.key==="ArrowRight"){if(h.value<0)return;const F=h.value+1;T.value[F]?h.value=F:(h.value=-1,s.value.setSelectionRange(0,0))}}}function Y(u){C.value=u.target.value}function J(){r.value&&(d.value=!0)}function k(u){r.value=!0}function L(u){var m;u.relatedTarget==null&&((m=s.value)==null||m.focus())}const M=w(!1);function A(u){if(e.multiple){const m=ne.value.findIndex(D=>e.valueComparator(D,u.value));if(m===-1)I.value=[...I.value,u];else{const D=[...I.value];D.splice(m,1),I.value=D}}else I.value=[u],M.value=!0,t.selection||(C.value=u.title),f.value=!1,d.value=!0,be(()=>M.value=!1)}return ke(r,u=>{var m;u?(M.value=!0,C.value=e.multiple||t.selection?"":String(((m=T.value.at(-1))==null?void 0:m.props.title)??""),d.value=!0,be(()=>M.value=!1)):(f.value=!1,C.value="")}),ke(C,u=>{!r.value||M.value||(u&&(f.value=!0),d.value=!u)}),le(()=>{const u=!!(e.chips||t.chip),m=!!(!e.hideNoData||U.value.length||t.prepend||t.append||t["no-data"]),D=I.value.length>0,[X]=oe.filterProps(e);return n(oe,O({ref:s},X,{modelValue:C.value,"onUpdate:modelValue":x=>{x==null&&(I.value=[])},focused:r.value,"onUpdate:focused":x=>r.value=x,validationValue:I.externalValue,dirty:D,onInput:Y,class:["v-autocomplete",{"v-autocomplete--active-menu":f.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selecting-index":h.value>-1,[`v-autocomplete--${e.multiple?"multiple":"single"}`]:!0,"v-autocomplete--selection-slot":!!t.selection},e.class],style:e.style,appendInnerIcon:e.menuIcon,readonly:e.readonly,placeholder:D?void 0:e.placeholder,"onClick:clear":c,"onMousedown:control":V,onKeydown:R}),{...t,default:()=>n(ye,null,[n(Ze,O({ref:o,modelValue:f.value,"onUpdate:modelValue":x=>f.value=x,activator:"parent",contentClass:"v-autocomplete__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:J},e.menuProps),{default:()=>[m&&n(ze,{ref:ue,selected:ne.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:x=>x.preventDefault(),onFocusin:k,onFocusout:L},{default:()=>{var x,E,W;return[!U.value.length&&!e.hideNoData&&(((x=t["no-data"])==null?void 0:x.call(t))??n(ee,{title:i(e.noDataText)},null)),(E=t["prepend-item"])==null?void 0:E.call(t),U.value.map(F=>{var se;return((se=t.item)==null?void 0:se.call(t,{item:F,props:O(F.props,{onClick:()=>A(F)})}))??n(ee,O({key:F.value},F.props,{onClick:()=>A(F)}),{prepend:N=>{let{isSelected:fe}=N;return e.multiple&&!e.hideSelected?n(Xe,{modelValue:fe,ripple:!1,tabindex:"-1"},null):void 0},title:()=>{var N,fe;return d.value?F.title:Mt(F.title,(N=ae(F))==null?void 0:N.title,((fe=C.value)==null?void 0:fe.length)??0)}})}),(W=t["append-item"])==null?void 0:W.call(t)]}})]}),T.value.map((x,E)=>{var se;function W(N){N.stopPropagation(),N.preventDefault(),A(x)}const F={"onClick:close":W,modelValue:!0,"onUpdate:modelValue":void 0};return n("div",{key:x.value,class:["v-autocomplete__selection",E===h.value&&["v-autocomplete__selection--selected",p.value]],style:E===h.value?B.value:{}},[u?t.chip?n(_e,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:x.title}}},{default:()=>{var N;return[(N=t.chip)==null?void 0:N.call(t,{item:x,index:E,props:F})]}}):n(ce,O({key:"chip",closable:e.closableChips,size:"small",text:x.title},F),null):((se=t.selection)==null?void 0:se.call(t,{item:x,index:E}))??n("span",{class:"v-autocomplete__selection-text"},[x.title,e.multiple&&E<T.value.length-1&&n("span",{class:"v-autocomplete__selection-comma"},[j(",")])])])})])})}),Se({isFocused:r,isPristine:d,menu:f,search:C,filteredItems:Q,select:A},s)}}),Rt={components:{StatusChip:Qe},props:{defaultStatuses:{type:Array,default:me.map(e=>e.value)}},data(){return{loading:!1,textFilter:"",statuses:me,activeStatuses:null,statusFilter:[],registers:[],registerFilter:[],expanded:!1,noAnimate:!0,tags:null,tagFilter:[]}},mounted(){this.loading=!0,we.config.showImported&&Pe.getRegisters(!0).then(e=>{Object.keys(e).length>1?(this.registers=Object.values(e).sort((l,t)=>l.local!==t.local?l.local?-1:1:l.name.localeCompare(t.name)).map(l=>({name:l.name,url:l.url,color:l.color})),this.registerFilter=this.registers.map(l=>l.url)):(this.registers=[],this.registerFilter=null)}),Pe.getBBlocks(we.config.showImported).then(e=>{const l=new Set,t={};Object.values(e).forEach(i=>{var s;l.add(i.status),(s=i.tags)==null||s.forEach(r=>{r=r.trim().toLowerCase(),t[r]=t[r]?t[r]+1:1})}),this.tags=Object.keys(t).sort(),this.activeStatuses=me.filter(i=>l.has(i.value)),this.defaultStatuses&&(this.statusFilter=this.defaultStatuses.filter(i=>l.has(i)))}).finally(()=>this.loading=!1),this.expanded=this.$vuetify.display.mdAndUp?"expanded":null,setTimeout(()=>this.noAnimate=!1,350),this.debouncedTextFilter=ft(e=>{this.emitFilter()},300),this.emitFilter()},methods:{selectAllStatuses(){this.statusFilter=me.map(e=>e.value)},selectOnlyStable(){this.statusFilter=["stable"]},selectRegisters(e){e?this.registerFilter=this.registers.map(l=>l.url):this.registerFilter.length=0},reset(){this.textFilter="",this.statusFilter=this.defaultStatuses.slice(),this.selectRegisters(!0)},emitFilter(){this.$emit("filter-change",{text:this.textFilter,registers:this.registers.length?this.registerFilter:null,status:this.statusFilter,tags:this.tagFilter})}},watch:{registerFilter(){this.emitFilter()},statusFilter(){this.emitFilter()},textFilter(e){this.debouncedTextFilter(e)},tagFilter(){this.emitFilter()},defaultStatuses(){this.statusFilter=this.defaultStatuses.slice()}}},Lt={class:"flex-grow-1 mx-2 filter-text mb-1"},Et={key:0,class:"mx-2 filter-status mb-1"},Kt={key:1,class:"mx-2 filter-registers mb-1"},jt={key:2,class:"mx-2 filter-tags mb-1"},Nt={class:"mx-2 d-flex align-center filter-reset"};function zt(e,l,t,i,s,r){const d=Ke("status-chip");return H(),he(nt,{modelValue:s.expanded,"onUpdate:modelValue":l[6]||(l[6]=o=>s.expanded=o),class:Ae({"no-animate":s.noAnimate})},{default:S(()=>[n(at,{title:"Filters",value:"expanded",eager:""},{default:S(()=>[n(lt,null,{default:S(()=>{var o;return[z("div",{class:Ae(["d-flex flex-wrap filter-wrapper justify-end",e.$vuetify.display.mdAndUp?"size-md":""])},[z("div",Lt,[n(oe,{label:"Name or identifier",modelValue:s.textFilter,"onUpdate:modelValue":l[0]||(l[0]=a=>s.textFilter=a),"hide-details":"auto",clearable:""},null,8,["modelValue"])]),s.activeStatuses?(H(),q("div",Et,[n(Oe,{label:"Status","item-title":"label",items:s.activeStatuses,multiple:"",modelValue:s.statusFilter,"onUpdate:modelValue":l[1]||(l[1]=a=>s.statusFilter=a),"hide-details":"auto"},{"prepend-item":S(()=>[n(ee,{class:"all-none"},{default:S(()=>[n(ie,{variant:"text",onClick:r.selectAllStatuses},{default:S(()=>[j("All")]),_:1},8,["onClick"]),n(ie,{variant:"text",onClick:r.selectOnlyStable},{default:S(()=>[j("Only stable")]),_:1},8,["onClick"])]),_:1})]),selection:S(({item:a})=>[n(d,{status:a.value,class:"mb-1"},null,8,["status"])]),_:1},8,["items","modelValue"])])):Z("",!0),s.registers.length>1?(H(),q("div",Kt,[n(Oe,{label:"Registers",items:s.registers,multiple:"",modelValue:s.registerFilter,"onUpdate:modelValue":l[4]||(l[4]=a=>s.registerFilter=a),"item-title":"name","item-value":"url","hide-details":"auto"},{"prepend-item":S(()=>[n(ee,{class:"all-none"},{default:S(()=>[n(ie,{variant:"text",onClick:l[2]||(l[2]=a=>r.selectRegisters(!0))},{default:S(()=>[j("All")]),_:1}),n(ie,{variant:"text",onClick:l[3]||(l[3]=a=>r.selectRegisters(!1))},{default:S(()=>[j("None")]),_:1})]),_:1})]),selection:S(({item:a})=>[a.raw?(H(),he(ce,{key:0,size:"small",variant:"flat",color:a.raw.color,class:"mb-1"},{default:S(()=>[j(G(a.title),1)]),_:2},1032,["color"])):Z("",!0)]),_:1},8,["items","modelValue"])])):Z("",!0),(o=s.tags)!=null&&o.length?(H(),q("div",jt,[n(Ut,{label:"Tags",items:s.tags,multiple:"",modelValue:s.tagFilter,"onUpdate:modelValue":l[5]||(l[5]=a=>s.tagFilter=a),"hide-details":"auto",clearable:""},null,8,["items","modelValue"])])):Z("",!0),n(Ve),z("div",Nt,[n(Ve),n(ie,{onClick:r.reset,block:e.$vuetify.display.smAndDown},{default:S(()=>[j("Reset")]),_:1},8,["onClick","block"])])],2)]}),_:1})]),_:1})]),_:1},8,["modelValue","class"])}const tl=Ce(Rt,[["render",zt]]),Ht={components:{StatusChip:Qe},props:{bblock:{type:Object,required:!0}},methods:{trim(e,l,t="…"){return!e||e.length<=l?e:`${e.substr(0,l-1)}${t}`}}},$t={class:"abstract"},Gt={class:"bblock-bottom mb-2 ml-2"},Qt={key:0,class:"tags mb-2 ml-2"},Wt=z("span",{class:"tags-title mr-1 mb-1 text-caption"},"Tags:",-1),Yt=["textContent"];function Jt(e,l,t,i,s,r){const d=Ke("status-chip");return H(),he(_t,{class:"fill-height d-flex flex-column building-block"},{default:S(()=>{var o;return[n(xt,{class:"d-flex pb-0 bblock-name"},{default:S(()=>[z("div",null,[j(G(t.bblock.name)+" ",1),z("small",null,"v"+G(t.bblock.version),1)]),n(Ve),n(d,{status:t.bblock.status},null,8,["status"])]),_:1}),n(Ft,{class:"text-caption"},{default:S(()=>[z("code",null,G(t.bblock.itemIdentifier),1)]),_:1}),n(St,null,{default:S(()=>[z("div",$t,G(r.trim(t.bblock.abstract,200)),1)]),_:1}),z("div",Gt,[(o=t.bblock.tags)!=null&&o.length?(H(),q("div",Qt,[Wt,(H(!0),q(ye,null,mt(t.bblock.tags,a=>(H(),q("span",{class:"tag mr-1 mb-1 text-caption",textContent:G(a)},null,8,Yt))),256))])):Z("",!0),z("div",null,[n(ce,{variant:"flat",color:t.bblock.register.color,title:t.bblock.register.url},{default:S(()=>[j(G(t.bblock.register.name),1)]),_:1},8,["color","title"])])])]}),_:1})}const ll=Ce(Ht,[["render",Jt]]);export{ll as B,tl as a};