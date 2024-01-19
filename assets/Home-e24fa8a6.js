import{s as ot,V as Ve,a as rt,m as Ne,u as ze,b as ke,c as xe,d as ct,e as dt,f as ft,g as vt,B as mt,h as Me,i as ht}from"./BuildingBlock-12f21506.js";import{_ as Ie,C as k,G as S,E as c,L as P,F as G,I as M,p as Ce,M as Fe,N as Ge,n as gt,l as se,x as J,d as De,c as V,e as Qe,O as yt,s as kt,t as z,m as a,r as R,P as bt,Q as Vt,R as Ct,y as T,i as We,S as be,U as Ue,V as Pe,W as Le,w as Re,X as Ye,J as X,Y as _t,Z as Ee,$ as pt,z as ye,A as Se,B as we,a0 as Q,D as W,a1 as Ke,a2 as ve,a3 as xt}from"./index-25e2ab18.js";import{R as Ft}from"./RegisterLoadingProgress-9eab90c0.js";import{m as St,b as Je,c as wt,d as je,e as Ae,f as Oe,g as It,h as Xe,i as Ze,j as ue,k as Z,l as ie,n as Bt,o as Pt,p as Rt}from"./VList-86ef4b71.js";import{n as At,m as $e,u as oe,R as Dt,o as Lt,p as Ot,q as qe,i as Te,r as et,s as me,t as Tt,j as he,k as ge,l as Mt,v as Be}from"./VContainer-dfc8461f.js";import{V as ne,a as ee}from"./VBreadcrumbs-601a708b.js";import"./_commonjsHelpers-725317a4.js";const Ut={props:{status:String,variant:{type:String,default:"flat"},size:{type:String,default:"small"}},computed:{color(){return ot[this.status]||null},label(){return this.status.charAt(0).toUpperCase()+this.status.substring(1).replaceAll("-"," ")}}};function Et(e,l,t,s,n,r){return t.status?(k(),S(Ve,{key:0,variant:t.variant,color:r.color,size:t.size},{default:c(()=>[P(G(r.label),1)]),_:1},8,["variant","color","size"])):M("",!0)}const tt=Ie(Ut,[["render",Et]]);const lt=Symbol.for("vuetify:selection-control-group"),at=Ce({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,falseIcon:Fe,trueIcon:Fe,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:Ge},...gt(),...At()},"v-selection-control-group");se()({name:"VSelectionControlGroup",props:{defaultsTarget:{type:String,default:"VSelectionControl"},...$e(),...at()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const s=J(e,"modelValue"),n=De(),r=V(()=>e.id||`v-selection-control-group-${n}`),f=V(()=>e.name||r.value),d=new Set;return Qe(lt,{modelValue:s,forceUpdate:()=>{d.forEach(i=>i())},onForceUpdate:i=>{d.add(i),yt(()=>{d.delete(i)})}}),kt({[e.defaultsTarget]:{color:z(e,"color"),disabled:z(e,"disabled"),density:z(e,"density"),error:z(e,"error"),inline:z(e,"inline"),modelValue:s,multiple:V(()=>!!e.multiple||e.multiple==null&&Array.isArray(s.value)),name:f,falseIcon:z(e,"falseIcon"),trueIcon:z(e,"trueIcon"),readonly:z(e,"readonly"),ripple:z(e,"ripple"),type:z(e,"type"),valueComparator:z(e,"valueComparator")}}),oe(()=>{var i;return a("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(i=t.default)==null?void 0:i.call(t)])}),{}}});const nt=Ce({label:String,trueValue:null,falseValue:null,value:null,...$e(),...at()},"v-selection-control");function Kt(e){const l=We(lt,void 0),{densityClasses:t}=Ot(e),s=J(e,"modelValue"),n=V(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),r=V(()=>e.falseValue!==void 0?e.falseValue:!1),f=V(()=>!!e.multiple||e.multiple==null&&Array.isArray(s.value)),d=V({get(){const o=l?l.modelValue.value:s.value;return f.value?o.some(v=>e.valueComparator(v,n.value)):e.valueComparator(o,n.value)},set(o){if(e.readonly)return;const v=o?n.value:r.value;let b=v;f.value&&(b=o?[...be(s.value),v]:be(s.value).filter(A=>!e.valueComparator(A,n.value))),l?l.modelValue.value=b:s.value=b}}),{textColorClasses:i,textColorStyles:h}=qe(V(()=>d.value&&!e.error&&!e.disabled?e.color:void 0)),g=V(()=>d.value?e.trueIcon:e.falseIcon);return{group:l,densityClasses:t,trueValue:n,falseValue:r,model:d,textColorClasses:i,textColorStyles:h,icon:g}}const jt=se()({name:"VSelectionControl",directives:{Ripple:Dt},inheritAttrs:!1,props:nt(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:t,slots:s}=l;const{group:n,densityClasses:r,icon:f,model:d,textColorClasses:i,textColorStyles:h,trueValue:g}=Kt(e),o=De(),v=V(()=>e.id||`input-${o}`),b=R(!1),A=R(!1),I=R();n==null||n.onForceUpdate(()=>{I.value&&(I.value.checked=d.value)});function L(w){b.value=!0,(!Ue||Ue&&w.target.matches(":focus-visible"))&&(A.value=!0)}function p(){b.value=!1,A.value=!1}function B(w){e.readonly&&n&&Pe(()=>n.forceUpdate()),d.value=w.target.checked}return oe(()=>{var U,K;const w=s.label?s.label({label:e.label,props:{for:v.value}}):e.label,[$,re]=bt(t);return a("div",T({class:["v-selection-control",{"v-selection-control--dirty":d.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":b.value,"v-selection-control--focus-visible":A.value,"v-selection-control--inline":e.inline},r.value,e.class]},$,{style:e.style}),[a("div",{class:["v-selection-control__wrapper",i.value],style:h.value},[(U=s.default)==null?void 0:U.call(s),Vt(a("div",{class:["v-selection-control__input"]},[f.value&&a(Lt,{key:"icon",icon:f.value},null),a("input",T({ref:I,checked:d.value,disabled:e.disabled,id:v.value,onBlur:p,onFocus:L,onInput:B,"aria-disabled":e.readonly,type:e.type,value:g.value,name:e.name,"aria-checked":e.type==="checkbox"?d.value:void 0},re),null),(K=s.input)==null?void 0:K.call(s,{model:d,textColorClasses:i,textColorStyles:h,props:{onFocus:L,onBlur:p,id:v.value}})]),[[Ct("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),w&&a(rt,{for:v.value,clickable:!0},{default:()=>[w]})])}),{isFocused:b,input:I}}}),Ht=Ce({indeterminate:Boolean,indeterminateIcon:{type:Fe,default:"$checkboxIndeterminate"},...nt({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"v-checkbox-btn"),it=se()({name:"VCheckboxBtn",props:Ht(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{slots:t}=l;const s=J(e,"indeterminate"),n=J(e,"modelValue");function r(i){s.value&&(s.value=!1)}const f=V(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),d=V(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return oe(()=>a(jt,T(e,{modelValue:n.value,"onUpdate:modelValue":[i=>n.value=i,r],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",inline:!0,falseIcon:f.value,trueIcon:d.value,"aria-checked":e.indeterminate?"mixed":void 0}),t)),{}}});const ut=se()({name:"VMenu",props:{id:String,...Le(St({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Je}}),["absolute"])},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const s=J(e,"modelValue"),{scopeId:n}=wt(),r=De(),f=V(()=>e.id||`v-menu-${r}`),d=R(),i=We(je,null),h=R(0);Qe(je,{register(){++h.value},unregister(){--h.value},closeParents(){setTimeout(()=>{h.value||(s.value=!1,i==null||i.closeParents())},40)}}),Re(s,v=>{v?i==null||i.register():i==null||i.unregister()});function g(){i==null||i.closeParents()}const o=V(()=>T({"aria-haspopup":"menu","aria-expanded":String(s.value),"aria-owns":f.value},e.activatorProps));return oe(()=>{const[v]=Ae.filterProps(e);return a(Ae,T({ref:d,class:["v-menu",e.class],style:e.style},v,{modelValue:s.value,"onUpdate:modelValue":b=>s.value=b,absolute:!0,activatorProps:o.value,"onClick:outside":g},n),{activator:t.activator,default:function(){for(var b=arguments.length,A=new Array(b),I=0;I<b;I++)A[I]=arguments[I];return a(Te,{root:!0},{default:()=>{var L;return[(L=t.default)==null?void 0:L.call(t,...A)]}})}})}),Oe({id:f,ΨopenChildren:h},d)}}),st=Ce({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:Fe,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,valueComparator:{type:Function,default:Ge},...It({itemChildren:!1})},"v-select"),He=se()({name:"VSelect",props:{...st(),...Le(Ne({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...et({transition:{component:Je}})},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:t}=l;const{t:s}=Ye(),n=R(),r=R(),f=J(e,"menu"),d=V({get:()=>f.value,set:m=>{var _;f.value&&!m&&((_=r.value)!=null&&_.ΨopenChildren)||(f.value=m)}}),{items:i,transformIn:h,transformOut:g}=Xe(e),o=J(e,"modelValue",[],m=>h(be(m)),m=>{const _=g(m);return e.multiple?_:_[0]??null}),v=ze(),b=V(()=>o.value.map(m=>i.value.find(_=>e.valueComparator(_.value,m.value))||m)),A=V(()=>b.value.map(m=>m.props.value)),I=R(!1);let L="",p;const B=V(()=>e.hideSelected?i.value.filter(m=>!b.value.some(_=>_===m)):i.value),w=R();function $(m){e.openOnClear&&(d.value=!0)}function re(){e.hideNoData&&!i.value.length||e.readonly||v!=null&&v.isReadonly.value||(d.value=!d.value)}function U(m){var C,H,E,D;if(e.readonly||v!=null&&v.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(m.key)&&m.preventDefault(),["Enter","ArrowDown"," "].includes(m.key)&&(d.value=!0),["Escape","Tab"].includes(m.key)&&(d.value=!1),m.key==="ArrowDown"?(C=w.value)==null||C.focus("next"):m.key==="ArrowUp"?(H=w.value)==null||H.focus("prev"):m.key==="Home"?(E=w.value)==null||E.focus("first"):m.key==="End"&&((D=w.value)==null||D.focus("last"));const _=1e3;function j(u){const y=u.key.length===1,O=!u.ctrlKey&&!u.metaKey&&!u.altKey;return y&&O}if(e.multiple||!j(m))return;const te=performance.now();te-p>_&&(L=""),L+=m.key.toLowerCase(),p=te;const le=i.value.find(u=>u.title.toLowerCase().startsWith(L));le!==void 0&&(o.value=[le])}function K(m){if(e.multiple){const _=A.value.findIndex(j=>e.valueComparator(j,m.value));if(_===-1)o.value=[...o.value,m];else{const j=[...o.value];j.splice(_,1),o.value=j}}else o.value=[m],d.value=!1}function ce(m){var _;(_=w.value)!=null&&_.$el.contains(m.relatedTarget)||(d.value=!1)}function _e(m){I.value=!0}function de(m){var _;m.relatedTarget==null&&((_=n.value)==null||_.focus())}return oe(()=>{const m=!!(e.chips||t.chip),_=!!(!e.hideNoData||B.value.length||t.prepend||t.append||t["no-data"]),j=o.value.length>0,[te]=ke.filterProps(e),le=j||!I.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder;return a(ke,T({ref:n},te,{modelValue:o.value.map(C=>C.props.value).join(", "),"onUpdate:modelValue":C=>{C==null&&(o.value=[])},focused:I.value,"onUpdate:focused":C=>I.value=C,validationValue:o.externalValue,dirty:j,class:["v-select",{"v-select--active-menu":d.value,"v-select--chips":!!e.chips,[`v-select--${e.multiple?"multiple":"single"}`]:!0,"v-select--selected":o.value.length},e.class],style:e.style,appendInnerIcon:e.menuIcon,readonly:!0,placeholder:le,"onClick:clear":$,"onMousedown:control":re,onBlur:ce,onKeydown:U}),{...t,default:()=>a(X,null,[a(ut,T({ref:r,modelValue:d.value,"onUpdate:modelValue":C=>d.value=C,activator:"parent",contentClass:"v-select__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition},e.menuProps),{default:()=>[_&&a(Ze,{ref:w,selected:A.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:C=>C.preventDefault(),onFocusin:_e,onFocusout:de},{default:()=>{var C,H,E;return[!B.value.length&&!e.hideNoData&&(((C=t["no-data"])==null?void 0:C.call(t))??a(ue,{title:s(e.noDataText)},null)),(H=t["prepend-item"])==null?void 0:H.call(t),B.value.map((D,u)=>{var y;return t.item?(y=t.item)==null?void 0:y.call(t,{item:D,index:u,props:T(D.props,{onClick:()=>K(D)})}):a(ue,T({key:u},D.props,{onClick:()=>K(D)}),{prepend:O=>{let{isSelected:ae}=O;return e.multiple&&!e.hideSelected?a(it,{modelValue:ae,ripple:!1,tabindex:"-1"},null):void 0}})}),(E=t["append-item"])==null?void 0:E.call(t)]}})]}),b.value.map((C,H)=>{var u;function E(y){y.stopPropagation(),y.preventDefault(),K(C)}const D={"onClick:close":E,modelValue:!0,"onUpdate:modelValue":void 0};return a("div",{key:C.value,class:"v-select__selection"},[m?t.chip?a(Te,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:C.title}}},{default:()=>{var y;return[(y=t.chip)==null?void 0:y.call(t,{item:C,index:H,props:D})]}}):a(Ve,T({key:"chip",closable:e.closableChips,size:"small",text:C.title},D),null):((u=t.selection)==null?void 0:u.call(t,{item:C,index:H}))??a("span",{class:"v-select__selection-text"},[C.title,e.multiple&&H<b.value.length-1&&a("span",{class:"v-select__selection-comma"},[P(",")])])])})])})}),Oe({isFocused:I,menu:d,select:K},n)}}),Nt=(e,l,t)=>e==null||l==null?-1:e.toString().toLocaleLowerCase().indexOf(l.toString().toLocaleLowerCase()),zt=Ce({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function Gt(e,l,t){var d;const s=[],n=(t==null?void 0:t.default)??Nt,r=t!=null&&t.filterKeys?be(t.filterKeys):!1,f=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return s;e:for(let i=0;i<e.length;i++){const h=e[i],g={},o={};let v=-1;if(l&&!(t!=null&&t.noFilter)){if(typeof h=="object"){const I=r||Object.keys(h);for(const L of I){const p=pt(h,L,h),B=(d=t==null?void 0:t.customKeyFilter)==null?void 0:d[L];if(v=B?B(p,l,h):n(p,l,h),v!==-1&&v!==!1)B?g[L]=v:o[L]=v;else if((t==null?void 0:t.filterMode)==="every")continue e}}else v=n(h,l,h),v!==-1&&v!==!1&&(o.title=v);const b=Object.keys(o).length,A=Object.keys(g).length;if(!b&&!A||(t==null?void 0:t.filterMode)==="union"&&A!==f&&!b||(t==null?void 0:t.filterMode)==="intersection"&&(A!==f||!b))continue}s.push({index:i,matches:{...o,...g}})}return s}function Qt(e,l,t,s){const n=V(()=>typeof(t==null?void 0:t.value)!="string"&&typeof(t==null?void 0:t.value)!="number"?"":String(t.value)),r=R([]),f=R(new Map);_t(()=>{r.value=[],f.value=new Map;const i=Ee(l);Gt(i,n.value,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:Ee(s==null?void 0:s.filterKeys)??e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}).forEach(g=>{let{index:o,matches:v}=g;const b=i[o];r.value.push(b),f.value.set(b.value,v)})});function d(i){return f.value.get(i.value)}return{filteredItems:r,filteredMatches:f,getMatches:d}}function Wt(e,l,t){if(l==null)return e;if(Array.isArray(l))throw new Error("Multiple matches is not implemented");return typeof l=="number"&&~l?a(X,null,[a("span",{class:"v-autocomplete__unmask"},[e.substr(0,l)]),a("span",{class:"v-autocomplete__mask"},[e.substr(l,t)]),a("span",{class:"v-autocomplete__unmask"},[e.substr(l+t)])]):e}const Yt=se()({name:"VAutocomplete",props:{search:String,...zt({filterKeys:["title"]}),...st(),...Le(Ne({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...et({transition:!1})},emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:t}=l;const{t:s}=Ye(),n=R(),r=R(!1),f=R(!0),d=R(),i=J(e,"menu"),h=V({get:()=>i.value,set:u=>{var y;i.value&&!u&&((y=d.value)!=null&&y.ΨopenChildren)||(i.value=u)}}),g=R(-1),o=V(()=>{var u;return(u=n.value)==null?void 0:u.color}),{items:v,transformIn:b,transformOut:A}=Xe(e),{textColorClasses:I,textColorStyles:L}=qe(o),p=J(e,"search",""),B=J(e,"modelValue",[],u=>b(be(u)),u=>{const y=A(u);return e.multiple?y:y[0]??null}),w=ze(),{filteredItems:$,getMatches:re}=Qt(e,v,V(()=>f.value?void 0:p.value)),U=V(()=>B.value.map(u=>v.value.find(y=>e.valueComparator(y.value,u.value))||u)),K=V(()=>e.hideSelected?$.value.filter(u=>!U.value.some(y=>y.value===u.value)):$.value),ce=V(()=>U.value.map(u=>u.props.value)),_e=V(()=>U.value[g.value]),de=R();function m(u){e.openOnClear&&(h.value=!0),p.value=""}function _(){e.hideNoData&&!v.value.length||e.readonly||w!=null&&w.isReadonly.value||(h.value=!0)}function j(u){var ae,x,N,q;if(e.readonly||w!=null&&w.isReadonly.value)return;const y=n.value.selectionStart,O=ce.value.length;if((g.value>-1||["Enter","ArrowDown","ArrowUp"].includes(u.key))&&u.preventDefault(),["Enter","ArrowDown"].includes(u.key)&&(h.value=!0),["Escape"].includes(u.key)&&(h.value=!1),["Enter","Escape","Tab"].includes(u.key)&&(f.value=!0),u.key==="ArrowDown"?(ae=de.value)==null||ae.focus("next"):u.key==="ArrowUp"&&((x=de.value)==null||x.focus("prev")),!!e.multiple){if(["Backspace","Delete"].includes(u.key)){if(g.value<0){u.key==="Backspace"&&!p.value&&(g.value=O-1);return}const F=g.value;_e.value&&D(_e.value),g.value=F>=O-1?O-2:F}if(u.key==="ArrowLeft"){if(g.value<0&&y>0)return;const F=g.value>-1?g.value-1:O-1;U.value[F]?g.value=F:(g.value=-1,n.value.setSelectionRange((N=p.value)==null?void 0:N.length,(q=p.value)==null?void 0:q.length))}if(u.key==="ArrowRight"){if(g.value<0)return;const F=g.value+1;U.value[F]?g.value=F:(g.value=-1,n.value.setSelectionRange(0,0))}}}function te(u){p.value=u.target.value}function le(){r.value&&(f.value=!0)}function C(u){r.value=!0}function H(u){var y;u.relatedTarget==null&&((y=n.value)==null||y.focus())}const E=R(!1);function D(u){if(e.multiple){const y=ce.value.findIndex(O=>e.valueComparator(O,u.value));if(y===-1)B.value=[...B.value,u];else{const O=[...B.value];O.splice(y,1),B.value=O}}else B.value=[u],E.value=!0,t.selection||(p.value=u.title),h.value=!1,f.value=!0,Pe(()=>E.value=!1)}return Re(r,u=>{var y;u?(E.value=!0,p.value=e.multiple||t.selection?"":String(((y=U.value.at(-1))==null?void 0:y.props.title)??""),f.value=!0,Pe(()=>E.value=!1)):(h.value=!1,p.value="")}),Re(p,u=>{!r.value||E.value||(u&&(h.value=!0),f.value=!u)}),oe(()=>{const u=!!(e.chips||t.chip),y=!!(!e.hideNoData||K.value.length||t.prepend||t.append||t["no-data"]),O=B.value.length>0,[ae]=ke.filterProps(e);return a(ke,T({ref:n},ae,{modelValue:p.value,"onUpdate:modelValue":x=>{x==null&&(B.value=[])},focused:r.value,"onUpdate:focused":x=>r.value=x,validationValue:B.externalValue,dirty:O,onInput:te,class:["v-autocomplete",{"v-autocomplete--active-menu":h.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selecting-index":g.value>-1,[`v-autocomplete--${e.multiple?"multiple":"single"}`]:!0,"v-autocomplete--selection-slot":!!t.selection},e.class],style:e.style,appendInnerIcon:e.menuIcon,readonly:e.readonly,placeholder:O?void 0:e.placeholder,"onClick:clear":m,"onMousedown:control":_,onKeydown:j}),{...t,default:()=>a(X,null,[a(ut,T({ref:d,modelValue:h.value,"onUpdate:modelValue":x=>h.value=x,activator:"parent",contentClass:"v-autocomplete__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:le},e.menuProps),{default:()=>[y&&a(Ze,{ref:de,selected:ce.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:x=>x.preventDefault(),onFocusin:C,onFocusout:H},{default:()=>{var x,N,q;return[!K.value.length&&!e.hideNoData&&(((x=t["no-data"])==null?void 0:x.call(t))??a(ue,{title:s(e.noDataText)},null)),(N=t["prepend-item"])==null?void 0:N.call(t),K.value.map(F=>{var fe;return((fe=t.item)==null?void 0:fe.call(t,{item:F,props:T(F.props,{onClick:()=>D(F)})}))??a(ue,T({key:F.value},F.props,{onClick:()=>D(F)}),{prepend:Y=>{let{isSelected:pe}=Y;return e.multiple&&!e.hideSelected?a(it,{modelValue:pe,ripple:!1,tabindex:"-1"},null):void 0},title:()=>{var Y,pe;return f.value?F.title:Wt(F.title,(Y=re(F))==null?void 0:Y.title,((pe=p.value)==null?void 0:pe.length)??0)}})}),(q=t["append-item"])==null?void 0:q.call(t)]}})]}),U.value.map((x,N)=>{var fe;function q(Y){Y.stopPropagation(),Y.preventDefault(),D(x)}const F={"onClick:close":q,modelValue:!0,"onUpdate:modelValue":void 0};return a("div",{key:x.value,class:["v-autocomplete__selection",N===g.value&&["v-autocomplete__selection--selected",I.value]],style:N===g.value?L.value:{}},[u?t.chip?a(Te,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:x.title}}},{default:()=>{var Y;return[(Y=t.chip)==null?void 0:Y.call(t,{item:x,index:N,props:F})]}}):a(Ve,T({key:"chip",closable:e.closableChips,size:"small",text:x.title},F),null):((fe=t.selection)==null?void 0:fe.call(t,{item:x,index:N}))??a("span",{class:"v-autocomplete__selection-text"},[x.title,e.multiple&&N<U.value.length-1&&a("span",{class:"v-autocomplete__selection-comma"},[P(",")])])])})])})}),Oe({isFocused:r,isPristine:f,menu:h,search:p,filteredItems:$,select:D},n)}}),Jt={components:{StatusChip:tt},props:{defaultStatuses:{type:Array,default:xe.map(e=>e.value)}},data(){return{loading:!1,textFilter:"",statuses:xe,activeStatuses:null,statusFilter:[],registers:[],registerFilter:[],expanded:!1,noAnimate:!0,tags:null,tagFilter:[]}},mounted(){this.loading=!0,ye.config.showImported&&Se.getRegisters(!0).then(e=>{Object.keys(e).length>1?(this.registers=Object.values(e).sort((l,t)=>l.local!==t.local?l.local?-1:1:l.name.localeCompare(t.name)).map(l=>({name:l.name,url:l.url,color:l.color})),this.registerFilter=this.registers.map(l=>l.url)):(this.registers=[],this.registerFilter=null)}),Se.getBBlocks(ye.config.showImported).then(e=>{const l=new Set,t={};Object.values(e).forEach(s=>{var n;l.add(s.status),(n=s.tags)==null||n.forEach(r=>{r=r.trim().toLowerCase(),t[r]=t[r]?t[r]+1:1})}),this.tags=Object.keys(t).sort(),this.activeStatuses=xe.filter(s=>l.has(s.value)),this.defaultStatuses&&(this.statusFilter=this.defaultStatuses.filter(s=>l.has(s)))}).finally(()=>this.loading=!1),this.expanded=this.$vuetify.display.mdAndUp?"expanded":null,setTimeout(()=>this.noAnimate=!1,350),this.debouncedTextFilter=ct(e=>{this.emitFilter()},300),this.emitFilter()},methods:{selectAllStatuses(){this.statusFilter=xe.map(e=>e.value)},selectOnlyStable(){this.statusFilter=["stable"]},selectRegisters(e){e?this.registerFilter=this.registers.map(l=>l.url):this.registerFilter.length=0},reset(){this.textFilter="",this.statusFilter=this.defaultStatuses.slice(),this.selectRegisters(!0)},emitFilter(){this.$emit("filter-change",{text:this.textFilter,registers:this.registers.length?this.registerFilter:null,status:this.statusFilter,tags:this.tagFilter})}},watch:{registerFilter(){this.emitFilter()},statusFilter(){this.emitFilter()},textFilter(e){this.debouncedTextFilter(e)},tagFilter(){this.emitFilter()},defaultStatuses(){this.statusFilter=this.defaultStatuses.slice()}}},Xt={class:"flex-grow-1 mx-2 filter-text mb-1"},Zt={key:0,class:"mx-2 filter-status mb-1"},$t={key:1,class:"mx-2 filter-registers mb-1"},qt={key:2,class:"mx-2 filter-tags mb-1"},el={class:"mx-2 d-flex align-center filter-reset"};function tl(e,l,t,s,n,r){const f=we("status-chip");return k(),S(vt,{modelValue:n.expanded,"onUpdate:modelValue":l[6]||(l[6]=d=>n.expanded=d),class:Ke({"no-animate":n.noAnimate})},{default:c(()=>[a(ft,{title:"Filters",value:"expanded",eager:""},{default:c(()=>[a(dt,null,{default:c(()=>{var d;return[Q("div",{class:Ke(["d-flex flex-wrap filter-wrapper justify-end",e.$vuetify.display.mdAndUp?"size-md":""])},[Q("div",Xt,[a(ke,{label:"Name or identifier",modelValue:n.textFilter,"onUpdate:modelValue":l[0]||(l[0]=i=>n.textFilter=i),"hide-details":"auto",clearable:""},null,8,["modelValue"])]),n.activeStatuses?(k(),W("div",Zt,[a(He,{label:"Status","item-title":"label",items:n.activeStatuses,multiple:"",modelValue:n.statusFilter,"onUpdate:modelValue":l[1]||(l[1]=i=>n.statusFilter=i),"hide-details":"auto"},{"prepend-item":c(()=>[a(ue,{class:"all-none"},{default:c(()=>[a(Z,{variant:"text",onClick:r.selectAllStatuses},{default:c(()=>[P("All")]),_:1},8,["onClick"]),a(Z,{variant:"text",onClick:r.selectOnlyStable},{default:c(()=>[P("Only stable")]),_:1},8,["onClick"])]),_:1})]),selection:c(({item:i})=>[a(f,{status:i.value,class:"mb-1"},null,8,["status"])]),_:1},8,["items","modelValue"])])):M("",!0),n.registers.length>1?(k(),W("div",$t,[a(He,{label:"Registers",items:n.registers,multiple:"",modelValue:n.registerFilter,"onUpdate:modelValue":l[4]||(l[4]=i=>n.registerFilter=i),"item-title":"name","item-value":"url","hide-details":"auto"},{"prepend-item":c(()=>[a(ue,{class:"all-none"},{default:c(()=>[a(Z,{variant:"text",onClick:l[2]||(l[2]=i=>r.selectRegisters(!0))},{default:c(()=>[P("All")]),_:1}),a(Z,{variant:"text",onClick:l[3]||(l[3]=i=>r.selectRegisters(!1))},{default:c(()=>[P("None")]),_:1})]),_:1})]),selection:c(({item:i})=>[i.raw?(k(),S(Ve,{key:0,size:"small",variant:"flat",color:i.raw.color,class:"mb-1"},{default:c(()=>[P(G(i.title),1)]),_:2},1032,["color"])):M("",!0)]),_:1},8,["items","modelValue"])])):M("",!0),(d=n.tags)!=null&&d.length?(k(),W("div",qt,[a(Yt,{label:"Tags",items:n.tags,multiple:"",modelValue:n.tagFilter,"onUpdate:modelValue":l[5]||(l[5]=i=>n.tagFilter=i),"hide-details":"auto",clearable:""},null,8,["items","modelValue"])])):M("",!0),a(ie),Q("div",el,[a(ie),a(Z,{onClick:r.reset,block:e.$vuetify.display.smAndDown},{default:c(()=>[P("Reset")]),_:1},8,["onClick","block"])])],2)]}),_:1})]),_:1})]),_:1},8,["modelValue","class"])}const ll=Ie(Jt,[["render",tl]]),al={components:{StatusChip:tt},props:{bblock:{type:Object,required:!0}},methods:{trim(e,l,t="…"){return!e||e.length<=l?e:`${e.substr(0,l-1)}${t}`}}},nl={class:"abstract"},il={class:"bblock-bottom mb-2 ml-2"},ul={key:0,class:"tags mb-2 ml-2"},sl=Q("span",{class:"tags-title mr-1 mb-1 text-caption"},"Tags:",-1),ol=["textContent"];function rl(e,l,t,s,n,r){const f=we("status-chip");return k(),S(ge,{class:"fill-height d-flex flex-column building-block"},{default:c(()=>{var d;return[a(me,{class:"d-flex pb-0 bblock-name"},{default:c(()=>[Q("div",null,[P(G(t.bblock.name)+" ",1),Q("small",null,"v"+G(t.bblock.version),1)]),a(ie),a(f,{status:t.bblock.status},null,8,["status"])]),_:1}),a(Tt,{class:"text-caption"},{default:c(()=>[Q("code",null,G(t.bblock.itemIdentifier),1)]),_:1}),a(he,null,{default:c(()=>[Q("div",nl,G(r.trim(t.bblock.abstract,200)),1)]),_:1}),Q("div",il,[(d=t.bblock.tags)!=null&&d.length?(k(),W("div",ul,[sl,(k(!0),W(X,null,ve(t.bblock.tags,i=>(k(),W("span",{class:"tag mr-1 mb-1 text-caption",textContent:G(i)},null,8,ol))),256))])):M("",!0),Q("div",null,[a(Ve,{variant:"flat",color:t.bblock.register.color,title:t.bblock.register.url},{default:c(()=>[P(G(t.bblock.register.name),1)]),_:1},8,["color","title"])])])]}),_:1})}const cl=Ie(al,[["render",rl]]);const dl={components:{BuildingBlockListItem:cl,BuildingBlockFilters:ll,RegisterLoadingProgress:Ft,BuildingBlock:mt},data(){return{loading:!1,buildingBlocks:null,bblockDialog:!1,bblockView:null,registerProgress:{completed:0,total:0},showRegisterLoadingProgress:!1,filterValues:null,moreInfoPopup:{show:!1,title:ye.config.title,contents:null},validationReports:[],localRegisters:null}},mounted(){this.loading=!0,Se.getBBlocks(ye.config.showImported).then(e=>{this.buildingBlocks=Object.values(e).sort((l,t)=>{const s=l.itemIdentifier.toLowerCase(),n=t.itemIdentifier.toLowerCase();return s<n?-1:s>n?1:0})}).finally(()=>{this.loading=!1}),Se.getRegisters(ye.config.showImported).then(e=>{this.validationReports=Object.values(e).filter(l=>!!l.validationReport).map(l=>({name:l.name,url:l.validationReport})),this.localRegisters=Object.values(e).filter(l=>l.local)})},methods:{md2html:Me,interceptLinks:ht,openUrl(e){window.open(e)},isVisible(e){var l,t;if(this.filterValues.text){const s=this.filterValues.text.trim().toLowerCase();if(e.itemIdentifier.toLowerCase().indexOf(s)<0&&e.name.toLowerCase().indexOf(s)<0)return!1}return!(!this.filterValues.status.includes(e.status)||this.filterValues.registers!==null&&!this.filterValues.registers.includes(e.register.url)||(l=this.filterValues.tags)!=null&&l.length&&!((t=e.tags)!=null&&t.some(s=>this.filterValues.tags.includes(s))))},showRegisterDescription(e){this.moreInfoPopup.contents=Me(e.description),this.moreInfoPopup.show=!0}},computed:{filteredBuildingBlocks(){if(!this.filterValues||!this.buildingBlocks)return[];const e=[],l=[];return this.buildingBlocks.forEach(t=>{this.isVisible(t)&&(t.highlighted?e:l).push(t)}),{highlighted:e,nonHighlighted:l}}}},fl=Q("h2",null,"Highlighted Building Blocks",-1);function vl(e,l,t,s,n,r){const f=we("building-block-filters"),d=we("building-block-list-item");return k(),S(Mt,{class:"bblock-list"},{default:c(()=>{var i,h,g;return[n.localRegisters?(k(),S(ne,{key:0},{default:c(()=>[a(ee,null,{default:c(()=>[(k(!0),W(X,null,ve(n.localRegisters,o=>(k(),S(ge,{elevation:"10"},{default:c(()=>[o.abstract||o.description?(k(),W(X,{key:0},[n.localRegisters.length>1?(k(),S(me,{key:0,textContent:G(o.name)},null,8,["textContent"])):M("",!0),o.abstract?(k(),S(he,{key:1,innerHTML:r.md2html(o.abstract),onClick:r.interceptLinks,class:"markdown-text"},null,8,["innerHTML","onClick"])):M("",!0),o.description?(k(),S(Be,{key:2},{default:c(()=>[a(ie),a(Z,{color:"primary",onClick:xt(v=>r.showRegisterDescription(o),["prevent"])},{default:c(()=>[P(" Tell me more ")]),_:2},1032,["onClick"])]),_:2},1024)):M("",!0)],64)):M("",!0)]),_:2},1024))),256))]),_:1})]),_:1})):M("",!0),(i=n.validationReports)!=null&&i.length?(k(),S(ne,{key:1},{default:c(()=>[a(ee,null,{default:c(()=>[a(ge,null,{default:c(()=>[n.validationReports.length>1?(k(),S(he,{key:0},{default:c(()=>[P(" There are validation reports available for the following registers. ")]),_:1})):(k(),S(he,{key:1},{default:c(()=>[P(" There is a validation report available for this register. ")]),_:1})),a(Be,null,{default:c(()=>[a(ie),n.validationReports.length>1?(k(!0),W(X,{key:0},ve(n.validationReports,o=>(k(),S(Z,{onClick:v=>r.openUrl(o.url)},{default:c(()=>[P(G(o.name),1)]),_:2},1032,["onClick"]))),256)):(k(),S(Z,{key:1,onClick:l[0]||(l[0]=o=>r.openUrl(n.validationReports[0].url))},{default:c(()=>[P(" See report ")]),_:1}))]),_:1})]),_:1})]),_:1})]),_:1})):M("",!0),a(ne,null,{default:c(()=>[a(ee,null,{default:c(()=>[a(f,{onFilterChange:l[1]||(l[1]=o=>this.filterValues=o)})]),_:1})]),_:1}),(g=(h=r.filteredBuildingBlocks)==null?void 0:h.highlighted)!=null&&g.length?(k(),S(ne,{key:2,align:"stretch"},{default:c(()=>[a(ee,{cols:"12"},{default:c(()=>[fl]),_:1}),(k(!0),W(X,null,ve(r.filteredBuildingBlocks.highlighted,o=>(k(),S(ee,{key:o.itemIdentifier,md:"6"},{default:c(()=>[a(d,{bblock:o,to:{name:"BuildingBlock",params:{id:o.itemIdentifier}},class:"highlighted-bblock"},null,8,["bblock","to"])]),_:2},1024))),128)),a(Bt)]),_:1})):M("",!0),a(ne,{align:"stretch"},{default:c(()=>[(k(!0),W(X,null,ve(r.filteredBuildingBlocks.nonHighlighted,o=>(k(),S(ee,{key:o.itemIdentifier,md:"6"},{default:c(()=>[a(d,{bblock:o,to:{name:"BuildingBlock",params:{id:o.itemIdentifier}}},null,8,["bblock","to"])]),_:2},1024))),128))]),_:1}),n.buildingBlocks&&!r.filteredBuildingBlocks.nonHighlighted.length&&!r.filteredBuildingBlocks.highlighted.length?(k(),S(ne,{key:3},{default:c(()=>[a(ee,null,{default:c(()=>[a(ge,null,{default:c(()=>[n.buildingBlocks.length?(k(),S(me,{key:0},{default:c(()=>[P("No building blocks match the current filters")]),_:1})):(k(),S(me,{key:1},{default:c(()=>[P("No building blocks were found in the register.")]),_:1}))]),_:1})]),_:1})]),_:1})):M("",!0),a(Ae,{"model-value":n.loading,class:"align-center justify-center"},{default:c(()=>[a(Pt,{color:"primary",indeterminate:"",size:"64"})]),_:1},8,["model-value"]),a(Rt,{modelValue:n.moreInfoPopup.show,"onUpdate:modelValue":l[2]||(l[2]=o=>n.moreInfoPopup.show=o),"max-width":"750"},{default:c(({isActive:o})=>[a(ge,null,{default:c(()=>[a(me,null,{default:c(()=>[P("About "+G(n.moreInfoPopup.title),1)]),_:1}),a(he,{class:"more-info markdown-text",innerHTML:n.moreInfoPopup.contents,onClick:r.interceptLinks},null,8,["innerHTML","onClick"]),a(Be,null,{default:c(()=>[a(ie),a(Z,{text:"Close",onClick:v=>o.value=!1},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:1},8,["modelValue"])]}),_:1})}const Cl=Ie(dl,[["render",vl]]);export{Cl as default};