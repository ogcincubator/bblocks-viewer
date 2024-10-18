import{_ as te,c as oe,b as Q,d as Ie,i as Ae}from"./index.js";import{s as Le,V as G,m as Me,a as Oe,u as Pe,b as ce,c as Re,d as De,e as Z,i as Te,f as je,g as ue,h as Ke,j as Ue,k as Ee}from"./VExpansionPanel.js";import{o as f,c as F,w as r,p as y,t as w,n as x,y as ke,A as P,z as A,a4 as Ne,a5 as ve,a6 as be,a7 as ze,a8 as He,J as Je,a9 as Qe,K as re,C as ge,N as Ye,l as s,v as K,O as H,Y as he,r as $,k as B,j as S,aa as _e,x as de}from"./vendor.js";import{h as Ge,a as We,d as Y,i as Xe,V as D,b as ee,j as Ze,c as qe,g as $e}from"./VList.js";import{q as et,r as tt,o as lt,s as st,p as fe,n as at,b as it,a as pe,l as nt}from"./VContainer.js";import{a as J,V as q}from"./VRow.js";import"./dialog-transition.js";const ut={props:{status:String,variant:{type:String,default:"flat"},size:{type:String,default:"small"}},computed:{color(){return Le[this.status]||null},label(){return this.status.charAt(0).toUpperCase()+this.status.substring(1).replaceAll("-"," ")}}};function rt(e,l,t,d,a,o){return t.status?(f(),F(G,{key:0,variant:t.variant,color:o.color,size:t.size},{default:r(()=>[y(w(o.label),1)]),_:1},8,["variant","color","size"])):x("",!0)}const ye=te(ut,[["render",rt]]);const ot=(e,l,t)=>e==null||l==null?-1:e.toString().toLocaleLowerCase().indexOf(l.toString().toLocaleLowerCase()),ct=ke({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function dt(e,l,t){var _;const d=[],a=(t==null?void 0:t.default)??ot,o=t!=null&&t.filterKeys?be(t.filterKeys):!1,c=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return d;e:for(let v=0;v<e.length;v++){const n=e[v],u={},L={};let b=-1;if(l&&!(t!=null&&t.noFilter)){if(typeof n=="object"){const le=o||Object.keys(n);for(const T of le){const k=ze(n,T,n),p=(_=t==null?void 0:t.customKeyFilter)==null?void 0:_[T];if(b=p?p(k,l,n):a(k,l,n),b!==-1&&b!==!1)p?u[T]=b:L[T]=b;else if((t==null?void 0:t.filterMode)==="every")continue e}}else b=a(n,l,n),b!==-1&&b!==!1&&(L.title=b);const M=Object.keys(L).length,U=Object.keys(u).length;if(!M&&!U||(t==null?void 0:t.filterMode)==="union"&&U!==c&&!M||(t==null?void 0:t.filterMode)==="intersection"&&(U!==c||!M))continue}d.push({index:v,matches:{...L,...u}})}return d}function ft(e,l,t,d){const a=P(()=>typeof(t==null?void 0:t.value)!="string"&&typeof(t==null?void 0:t.value)!="number"?"":String(t.value)),o=A([]),c=A(new Map);Ne(()=>{o.value=[],c.value=new Map;const v=ve(l);dt(v,a.value,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:ve(d==null?void 0:d.filterKeys)??e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}).forEach(u=>{let{index:L,matches:b}=u;const M=v[L];o.value.push(M),c.value.set(M.value,b)})});function _(v){return c.value.get(v.value)}return{filteredItems:o,filteredMatches:c,getMatches:_}}function mt(e,l,t){if(l==null)return e;if(Array.isArray(l))throw new Error("Multiple matches is not implemented");return typeof l=="number"&&~l?s(K,null,[s("span",{class:"v-autocomplete__unmask"},[e.substr(0,l)]),s("span",{class:"v-autocomplete__mask"},[e.substr(l,t)]),s("span",{class:"v-autocomplete__unmask"},[e.substr(l+t)])]):e}const vt=ke({search:String,...ct({filterKeys:["title"]}),...Me(),...He(Oe({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...et({transition:!1})},"v-autocomplete"),gt=Je()({name:"VAutocomplete",props:vt(),emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:t}=l;const{t:d}=Qe(),a=A(),o=A(!1),c=A(!0),_=A(),v=re(e,"menu"),n=P({get:()=>v.value,set:i=>{var h;v.value&&!i&&((h=_.value)!=null&&h.ΨopenChildren)||(v.value=i)}}),u=A(-1),L=P(()=>{var i;return(i=a.value)==null?void 0:i.color}),{items:b,transformIn:M,transformOut:U}=Ge(e),{textColorClasses:le,textColorStyles:T}=tt(L),k=re(e,"search",""),p=re(e,"modelValue",[],i=>M(be(i)),i=>{const h=U(i);return e.multiple?h:h[0]??null}),j=Pe(),{filteredItems:se,getMatches:Ce}=ft(e,b,P(()=>c.value?void 0:k.value)),O=P(()=>p.value.map(i=>b.value.find(h=>e.valueComparator(h.value,i.value))||i)),ae=P(()=>e.hideSelected?se.value.filter(i=>!O.value.some(h=>h.value===i.value)):se.value),ie=P(()=>O.value.map(i=>i.props.value)),me=P(()=>O.value[u.value]),ne=A();function xe(i){e.openOnClear&&(n.value=!0),k.value=""}function Ve(){e.hideNoData&&!b.value.length||e.readonly||j!=null&&j.isReadonly.value||(n.value=!0)}function Fe(i){var W,g,I,R;if(e.readonly||j!=null&&j.isReadonly.value)return;const h=a.value.selectionStart,V=ie.value.length;if((u.value>-1||["Enter","ArrowDown","ArrowUp"].includes(i.key))&&i.preventDefault(),["Enter","ArrowDown"].includes(i.key)&&(n.value=!0),["Escape"].includes(i.key)&&(n.value=!1),["Enter","Escape","Tab"].includes(i.key)&&(c.value=!0),i.key==="ArrowDown"?(W=ne.value)==null||W.focus("next"):i.key==="ArrowUp"&&((g=ne.value)==null||g.focus("prev")),!!e.multiple){if(["Backspace","Delete"].includes(i.key)){if(u.value<0){i.key==="Backspace"&&!k.value&&(u.value=V-1);return}const m=u.value;me.value&&N(me.value),u.value=m>=V-1?V-2:m}if(i.key==="ArrowLeft"){if(u.value<0&&h>0)return;const m=u.value>-1?u.value-1:V-1;O.value[m]?u.value=m:(u.value=-1,a.value.setSelectionRange((I=k.value)==null?void 0:I.length,(R=k.value)==null?void 0:R.length))}if(i.key==="ArrowRight"){if(u.value<0)return;const m=u.value+1;O.value[m]?u.value=m:(u.value=-1,a.value.setSelectionRange(0,0))}}}function we(i){k.value=i.target.value}function Be(){var i;o.value&&(c.value=!0,(i=a.value)==null||i.focus())}function Se(i){o.value=!0}const E=A(!1);function N(i){if(e.multiple){const h=ie.value.findIndex(V=>e.valueComparator(V,i.value));if(h===-1)p.value=[...p.value,i];else{const V=[...p.value];V.splice(h,1),p.value=V}}else p.value=[i],E.value=!0,k.value=i.title,n.value=!1,c.value=!0,he(()=>E.value=!1)}return ge(o,i=>{var h;i?(E.value=!0,k.value=e.multiple?"":String(((h=O.value.at(-1))==null?void 0:h.props.title)??""),c.value=!0,he(()=>E.value=!1)):(!e.multiple&&!k.value&&(p.value=[]),n.value=!1,k.value="",u.value=-1)}),ge(k,i=>{!o.value||E.value||(i&&(n.value=!0),c.value=!i)}),Ye(()=>{const i=!!(e.chips||t.chip),h=!!(!e.hideNoData||ae.value.length||t.prepend||t.append||t["no-data"]),V=p.value.length>0,[W]=ce.filterProps(e);return s(ce,H({ref:a},W,{modelValue:k.value,"onUpdate:modelValue":g=>{g==null&&(p.value=[])},focused:o.value,"onUpdate:focused":g=>o.value=g,validationValue:p.externalValue,dirty:V,onInput:we,class:["v-autocomplete",`v-autocomplete--${e.multiple?"multiple":"single"}`,{"v-autocomplete--active-menu":n.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selecting-index":u.value>-1},e.class],style:e.style,appendInnerIcon:e.menuIcon,readonly:e.readonly,placeholder:V?void 0:e.placeholder,"onClick:clear":xe,"onMousedown:control":Ve,onKeydown:Fe}),{...t,default:()=>s(K,null,[s(Re,H({ref:_,modelValue:n.value,"onUpdate:modelValue":g=>n.value=g,activator:"parent",contentClass:"v-autocomplete__content",eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:Be},e.menuProps),{default:()=>[h&&s(We,{ref:ne,selected:ie.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:g=>g.preventDefault(),onFocusin:Se},{default:()=>{var g,I,R;return[!ae.value.length&&!e.hideNoData&&(((g=t["no-data"])==null?void 0:g.call(t))??s(Y,{title:d(e.noDataText)},null)),(I=t["prepend-item"])==null?void 0:I.call(t),ae.value.map(m=>{var z;return((z=t.item)==null?void 0:z.call(t,{item:m,props:H(m.props,{onClick:()=>N(m)})}))??s(Y,H({key:m.value},m.props,{onClick:()=>N(m)}),{prepend:C=>{let{isSelected:X}=C;return s(K,null,[e.multiple&&!e.hideSelected?s(De,{modelValue:X,ripple:!1,tabindex:"-1"},null):void 0,m.props.prependIcon&&s(lt,{icon:m.props.prependIcon},null)])},title:()=>{var C,X;return c.value?m.title:mt(m.title,(C=Ce(m))==null?void 0:C.title,((X=k.value)==null?void 0:X.length)??0)}})}),(R=t["append-item"])==null?void 0:R.call(t)]}})]}),O.value.map((g,I)=>{var z;function R(C){C.stopPropagation(),C.preventDefault(),N(g)}const m={"onClick:close":R,onMousedown(C){C.preventDefault(),C.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0};return s("div",{key:g.value,class:["v-autocomplete__selection",I===u.value&&["v-autocomplete__selection--selected",le.value]],style:I===u.value?T.value:{}},[i?t.chip?s(st,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:g.title}}},{default:()=>{var C;return[(C=t.chip)==null?void 0:C.call(t,{item:g,index:I,props:m})]}}):s(G,H({key:"chip",closable:e.closableChips,size:"small",text:g.title},m),null):((z=t.selection)==null?void 0:z.call(t,{item:g,index:I}))??s("span",{class:"v-autocomplete__selection-text"},[g.title,e.multiple&&I<O.value.length-1&&s("span",{class:"v-autocomplete__selection-comma"},[y(",")])])])})])})}),Xe({isFocused:o,isPristine:c,menu:n,search:k,filteredItems:se,select:N},a)}}),ht={components:{StatusChip:ye},props:{defaultStatuses:{type:Array,default:Z.map(e=>e.value)}},data(){return{loading:!1,textFilter:"",statuses:Z,activeStatuses:null,statusFilter:[],registers:[],registerFilter:[],expanded:!1,noAnimate:!0,tags:null,tagFilter:[],itemClasses:[],itemClassFilter:[]}},mounted(){this.loading=!0,oe.config.showImported&&Q.getRegisters(!0).then(e=>{Object.keys(e).length>1?(this.registers=Object.values(e).filter(Q.isShown).sort((l,t)=>l.local!==t.local?l.local?-1:1:l.name.localeCompare(t.name)).map(l=>({name:l.name,url:l.url,color:l.color})),this.registerFilter=this.registers.map(l=>l.url)):(this.registers=[],this.registerFilter=null)}),Q.getBBlocks(oe.config.showImported).then(e=>{const l=new Set,t={},d=new Set;Object.values(e).forEach(a=>{var o;l.add(a.status),d.add(a.itemClass),(o=a.tags)==null||o.forEach(c=>{c=c.trim().toLowerCase(),t[c]=t[c]?t[c]+1:1})}),this.tags=Object.keys(t).sort(),this.activeStatuses=Z.filter(a=>l.has(a.value)),this.defaultStatuses&&(this.statusFilter=this.defaultStatuses.filter(a=>l.has(a))),this.itemClasses=Te.filter(a=>d.has(a.value)),this.selectItemClasses(!0)}).finally(()=>this.loading=!1),this.expanded=this.$vuetify.display.mdAndUp?"expanded":null,setTimeout(()=>this.noAnimate=!1,350),this.debouncedTextFilter=Ie(e=>{this.emitFilter()},300),this.emitFilter()},methods:{selectAllStatuses(){this.statusFilter=Z.map(e=>e.value)},selectOnlyStable(){this.statusFilter=["stable"]},selectRegisters(e){e?this.registerFilter=this.registers.map(l=>l.url):this.registerFilter.length=0},selectItemClasses(e){e?this.itemClassFilter=this.itemClasses.map(l=>l.value):this.itemClassFilter.length=0},reset(){this.textFilter="",this.statusFilter=this.defaultStatuses.slice(),this.selectRegisters(!0)},emitFilter(){this.$emit("filter-change",{text:this.textFilter,registers:this.registers.length?this.registerFilter:null,status:this.statusFilter,tags:this.tagFilter,itemClasses:this.itemClassFilter})}},computed:{immediateFilters(){return[this.registerFilter,this.statusFilter,this.tagFilter,this.itemClassFilter]}},watch:{immediateFilters(){this.emitFilter()},textFilter(e){this.debouncedTextFilter(e)}}},_t={class:"flex-grow-1 mx-1 filter-text mb-1"},kt={key:0,class:"mx-1 filter-status mb-1"},bt={key:1,class:"text-grey text-caption align-self-center"},pt={key:1,class:"mx-1 filter-registers mb-1"},yt={key:0},Ct={key:2,class:"mx-1 filter-item-classes mb-1"},xt={key:1,class:"text-grey text-caption align-self-center"},Vt={key:3,class:"mx-1 filter-tags mb-1"},Ft={class:"mx-2 d-flex align-center filter-reset"};function wt(e,l,t,d,a,o){const c=$("status-chip");return f(),F(Ue,{modelValue:a.expanded,"onUpdate:modelValue":l[9]||(l[9]=_=>a.expanded=_),class:_e([{"no-animate":a.noAnimate},"building-block-filters"])},{default:r(()=>[s(Ke,{title:"Filters",value:"expanded",eager:""},{default:r(()=>[s(je,null,{default:r(()=>{var _,v;return[B("div",{class:_e(["d-flex flex-wrap filter-wrapper",e.$vuetify.display.mdAndUp?"size-md":""])},[B("div",_t,[s(ce,{label:"Name or identifier",modelValue:a.textFilter,"onUpdate:modelValue":l[0]||(l[0]=n=>a.textFilter=n),"hide-details":"auto",clearable:""},null,8,["modelValue"])]),a.activeStatuses?(f(),S("div",kt,[s(ue,{label:"Status","item-title":"label",items:a.activeStatuses,multiple:"",modelValue:a.statusFilter,"onUpdate:modelValue":l[1]||(l[1]=n=>a.statusFilter=n),"hide-details":"auto"},{"prepend-item":r(()=>[s(Y,{class:"all-none"},{default:r(()=>[s(D,{variant:"text",onClick:o.selectAllStatuses},{default:r(()=>[y("All")]),_:1},8,["onClick"]),s(D,{variant:"text",onClick:o.selectOnlyStable},{default:r(()=>[y("Only stable")]),_:1},8,["onClick"])]),_:1})]),selection:r(({item:n,index:u})=>[u<2?(f(),F(c,{key:0,status:n.value,class:""},null,8,["status"])):x("",!0),u===2?(f(),S("span",bt," (+ "+w(a.statusFilter.length-2)+" others) ",1)):x("",!0)]),_:1},8,["items","modelValue"])])):x("",!0),a.registers.length>1?(f(),S("div",pt,[s(ue,{label:"Registers",items:a.registers,multiple:"",modelValue:a.registerFilter,"onUpdate:modelValue":l[4]||(l[4]=n=>a.registerFilter=n),"item-title":"name","item-value":"url","hide-details":"auto"},{"prepend-item":r(()=>[s(Y,{class:"all-none"},{default:r(()=>[s(D,{variant:"text",onClick:l[2]||(l[2]=n=>o.selectRegisters(!0))},{default:r(()=>[y("All")]),_:1}),s(D,{variant:"text",onClick:l[3]||(l[3]=n=>o.selectRegisters(!1))},{default:r(()=>[y("None")]),_:1})]),_:1})]),selection:r(({index:n})=>[n===0?(f(),S("span",yt,w(a.registerFilter.length)+" registers",1)):x("",!0)]),_:1},8,["items","modelValue"])])):x("",!0),((_=a.itemClasses)==null?void 0:_.length)>1?(f(),S("div",Ct,[s(ue,{label:"Item classes",items:a.itemClasses,multiple:"",modelValue:a.itemClassFilter,"onUpdate:modelValue":l[7]||(l[7]=n=>a.itemClassFilter=n),"hide-details":"auto","item-title":"label","item-value":"value"},{"prepend-item":r(()=>[s(Y,{class:"all-none"},{default:r(()=>[s(D,{variant:"text",onClick:l[5]||(l[5]=n=>o.selectItemClasses(!0))},{default:r(()=>[y("All")]),_:1}),s(D,{variant:"text",onClick:l[6]||(l[6]=n=>o.selectItemClasses(!1))},{default:r(()=>[y("None")]),_:1})]),_:1})]),selection:r(({item:n,index:u})=>[u<3?(f(),F(G,{key:0,size:"small",variant:"flat"},{default:r(()=>[y(w(n.title),1)]),_:2},1024)):x("",!0),u===3?(f(),S("span",xt," (+ "+w(a.statusFilter.length-3)+" others) ",1)):x("",!0)]),_:1},8,["items","modelValue"])])):x("",!0),(v=a.tags)!=null&&v.length?(f(),S("div",Vt,[s(gt,{label:"Tags",items:a.tags,multiple:"",modelValue:a.tagFilter,"onUpdate:modelValue":l[8]||(l[8]=n=>a.tagFilter=n),"hide-details":"auto",clearable:""},null,8,["items","modelValue"])])):x("",!0),s(ee),B("div",Ft,[s(ee),s(D,{onClick:o.reset,block:e.$vuetify.display.smAndDown},{default:r(()=>[y("Reset")]),_:1},8,["onClick","block"])])],2)]}),_:1})]),_:1})]),_:1},8,["modelValue","class"])}const Bt=te(ht,[["render",wt]]),St={components:{StatusChip:ye},props:{bblock:{type:Object,required:!0}},methods:{getItemClassLabel:Ee,trim(e,l,t="…"){return!e||e.length<=l?e:`${e.substr(0,l-1)}${t}`}}},It={class:"abstract"},At={class:"bblock-bottom mb-2 mx-2"},Lt={key:0,class:"tags mb-2 ml-2"},Mt=B("span",{class:"tags-title mr-1 mb-1 text-caption"},"Tags:",-1),Ot=["textContent"],Pt={class:"d-flex flex-column flex-sm-row align-start"},Rt={class:"text-truncate"};function Dt(e,l,t,d,a,o){const c=$("status-chip");return f(),F(pe,{class:"fill-height d-flex flex-column building-block"},{default:r(()=>{var _;return[s(fe,{class:"d-flex pb-0 bblock-name flex-column flex-sm-row align-start"},{default:r(()=>[B("div",null,[y(w(t.bblock.name)+" ",1),B("small",null,"v"+w(t.bblock.version),1)]),s(ee),s(c,{class:"my-1 mt-sm-0",status:t.bblock.status},null,8,["status"])]),_:1}),s(at,{class:"text-caption",title:t.bblock.itemIdentifier},{default:r(()=>[B("code",null,w(t.bblock.itemIdentifier),1)]),_:1},8,["title"]),s(it,null,{default:r(()=>[B("div",It,w(o.trim(t.bblock.abstract,200)),1)]),_:1}),B("div",At,[(_=t.bblock.tags)!=null&&_.length?(f(),S("div",Lt,[Mt,(f(!0),S(K,null,de(t.bblock.tags,v=>(f(),S("span",{class:"tag mr-1 mb-1 text-caption",textContent:w(v),key:v},null,8,Ot))),128))])):x("",!0),B("div",Pt,[s(G,{variant:"flat",color:t.bblock.register.color,title:`${t.bblock.register.name}
${t.bblock.register.url}`},{default:r(()=>[B("span",Rt,w(t.bblock.register.name),1)]),_:1},8,["color","title"]),s(ee),s(G,{color:"default",variant:"flat",class:"mt-2 mt-sm-0"},{default:r(()=>[y(w(o.getItemClassLabel(t.bblock.itemClass)),1)]),_:1})])])]}),_:1})}const Tt=te(St,[["render",Dt]]);const jt={components:{BuildingBlockListItem:Tt,BuildingBlockFilters:Bt},data(){return{loading:!1,buildingBlocks:null,bblockDialog:!1,bblockView:null,registerProgress:{completed:0,total:0},showRegisterLoadingProgress:!1,filterValues:null}},mounted(){this.loading=!0,Q.getBBlocks(oe.config.showImported).then(e=>{this.buildingBlocks=Object.values(e).filter(Q.isShown).sort((l,t)=>{const d=l.itemIdentifier.toLowerCase(),a=t.itemIdentifier.toLowerCase();return d<a?-1:d>a?1:0})}).finally(()=>{this.loading=!1})},methods:{interceptLinks:Ae,openUrl(e){window.open(e)},isVisible(e){var l,t;if(this.filterValues.text){const d=this.filterValues.text.trim().toLowerCase();if(e.itemIdentifier.toLowerCase().indexOf(d)<0&&e.name.toLowerCase().indexOf(d)<0)return!1}return!(!this.filterValues.status.includes(e.status)||this.filterValues.registers!==null&&!this.filterValues.registers.includes(e.register.url)||(l=this.filterValues.tags)!=null&&l.length&&!((t=e.tags)!=null&&t.some(d=>this.filterValues.tags.includes(d.toLowerCase())))||!this.filterValues.itemClasses.includes(e.itemClass))}},computed:{filteredBuildingBlocks(){if(!this.filterValues||!this.buildingBlocks)return[];const e=[],l=[];return this.buildingBlocks.forEach(t=>{this.isVisible(t)&&(t.highlighted?e:l).push(t)}),{highlighted:e,nonHighlighted:l}}}},Kt=B("h2",null,"Highlighted Building Blocks",-1);function Ut(e,l,t,d,a,o){const c=$("building-block-filters"),_=$("building-block-list-item");return f(),F(nt,{class:"bblock-list"},{default:r(()=>{var v,n;return[s(q,null,{default:r(()=>[s(J,null,{default:r(()=>[s(c,{onFilterChange:l[0]||(l[0]=u=>this.filterValues=u)})]),_:1})]),_:1}),(n=(v=o.filteredBuildingBlocks)==null?void 0:v.highlighted)!=null&&n.length?(f(),F(q,{key:0,align:"stretch"},{default:r(()=>[s(J,{cols:"12"},{default:r(()=>[Kt]),_:1}),(f(!0),S(K,null,de(o.filteredBuildingBlocks.highlighted,u=>(f(),F(J,{key:u.itemIdentifier,md:"6"},{default:r(()=>[s(_,{bblock:u,to:{name:"BuildingBlock",params:{id:u.itemIdentifier}},class:"highlighted-bblock"},null,8,["bblock","to"])]),_:2},1024))),128)),s(Ze)]),_:1})):x("",!0),s(q,{align:"stretch"},{default:r(()=>[(f(!0),S(K,null,de(o.filteredBuildingBlocks.nonHighlighted,u=>(f(),F(J,{key:u.itemIdentifier,md:"6"},{default:r(()=>[s(_,{bblock:u,to:{name:"BuildingBlock",params:{id:u.itemIdentifier}}},null,8,["bblock","to"])]),_:2},1024))),128))]),_:1}),a.buildingBlocks&&!o.filteredBuildingBlocks.nonHighlighted.length&&!o.filteredBuildingBlocks.highlighted.length?(f(),F(q,{key:1},{default:r(()=>[s(J,null,{default:r(()=>[s(pe,null,{default:r(()=>[a.buildingBlocks.length?(f(),F(fe,{key:0},{default:r(()=>[y("No building blocks match the current filters")]),_:1})):(f(),F(fe,{key:1},{default:r(()=>[y("No building blocks were found in the register.")]),_:1}))]),_:1})]),_:1})]),_:1})):x("",!0),s($e,{"model-value":a.loading,class:"align-center justify-center"},{default:r(()=>[s(qe,{color:"primary",indeterminate:"",size:"64"})]),_:1},8,["model-value"])]}),_:1})}const Gt=te(jt,[["render",Ut]]);export{Gt as default};
