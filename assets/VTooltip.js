import{_ as V}from"./index.js";import{o as w,j as x,k as P,y as b,a8 as C,J as S,K as O,aG as k,A as o,z as B,N,l as T,O as g}from"./vendor.js";import{v as A,w as $,g as f,i as G}from"./VList.js";const I={props:{width:{type:Number,default:22},height:{type:Number,default:22},color:{required:!0,type:String}}},R=["width","height"],U=["fill"];function j(t,n,e,a,l,s){return w(),x("svg",{class:"color-circle",xmlns:"http://www.w3.org/2000/svg",width:e.width,height:e.height,viewBox:"0 0 30 30"},[P("circle",{r:"12",cx:"15",cy:"15",fill:e.color},null,8,U)],8,R)}const H=V(I,[["render",j]]);const q=b({id:String,text:String,...C(A({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"v-tooltip"),J=S()({name:"VTooltip",props:q(),emits:{"update:modelValue":t=>!0},setup(t,n){let{slots:e}=n;const a=O(t,"modelValue"),{scopeId:l}=$(),s=k(),c=o(()=>t.id||`v-tooltip-${s}`),u=B(),m=o(()=>t.location.split(" ").length>1?t.location:t.location+" center"),h=o(()=>t.origin==="auto"||t.origin==="overlap"||t.origin.split(" ").length>1||t.location.split(" ").length>1?t.origin:t.origin+" center"),_=o(()=>t.transition?t.transition:a.value?"scale-transition":"fade-transition"),y=o(()=>g({"aria-describedby":c.value},t.activatorProps));return N(()=>{const[p]=f.filterProps(t);return T(f,g({ref:u,class:["v-tooltip",t.class],style:t.style,id:c.value},p,{modelValue:a.value,"onUpdate:modelValue":i=>a.value=i,transition:_.value,absolute:!0,location:m.value,origin:h.value,persistent:!0,role:"tooltip",activatorProps:y.value,_disableGlobalStack:!0},l),{activator:e.activator,default:function(){var v;for(var i=arguments.length,d=new Array(i),r=0;r<i;r++)d[r]=arguments[r];return((v=e.default)==null?void 0:v.call(e,...d))??t.text}})}),G({},u)}});export{H as C,J as V};
