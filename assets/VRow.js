import{m as b}from"./VContainer.js";import{bg as c,bh as u,H as S,P as C,A as N,aW as j}from"./vendor.js";const k=(()=>c.reduce((e,a)=>(e[a]={type:[Boolean,String,Number],default:!1},e),{}))(),v=(()=>c.reduce((e,a)=>{const t="offset"+u(a);return e[t]={type:[String,Number],default:null},e},{}))(),L=(()=>c.reduce((e,a)=>{const t="order"+u(a);return e[t]={type:[String,Number],default:null},e},{}))(),y={col:Object.keys(k),offset:Object.keys(v),order:Object.keys(L)};function O(e,a,t){let l=e;if(!(t==null||t===!1)){if(a){const n=a.replace(e,"");l+=`-${n}`}return e==="col"&&(l="v-"+l),e==="col"&&(t===""||t===!0)||(l+=`-${t}`),l.toLowerCase()}}const G=["auto","start","end","center","baseline","stretch"],R=S()({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...k,offset:{type:[String,Number],default:null},...v,order:{type:[String,Number],default:null},...L,alignSelf:{type:String,default:null,validator:e=>G.includes(e)},...C(),...b()},setup(e,a){let{slots:t}=a;const l=N(()=>{const n=[];let s;for(s in y)y[s].forEach(o=>{const i=e[o],g=O(s,o,i);g&&n.push(g)});const r=n.some(o=>o.startsWith("v-col-"));return n.push({"v-col":!r||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),n});return()=>{var n;return j(e.tag,{class:[l.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}}),f=["start","end","center"],h=["space-between","space-around","space-evenly"];function d(e,a){return c.reduce((t,l)=>{const n=e+u(l);return t[n]=a(),t},{})}const _=[...f,"baseline","stretch"],$=e=>_.includes(e),V=d("align",()=>({type:String,default:null,validator:$})),I=[...f,...h],P=e=>I.includes(e),w=d("justify",()=>({type:String,default:null,validator:P})),T=[...f,...h,"stretch"],A=e=>T.includes(e),E=d("alignContent",()=>({type:String,default:null,validator:A})),m={align:Object.keys(V),justify:Object.keys(w),alignContent:Object.keys(E)},U={align:"align",justify:"justify",alignContent:"align-content"};function B(e,a,t){let l=U[e];if(t!=null){if(a){const n=a.replace(e,"");l+=`-${n}`}return l+=`-${t}`,l.toLowerCase()}}const x=S()({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:$},...V,justify:{type:String,default:null,validator:P},...w,alignContent:{type:String,default:null,validator:A},...E,...C(),...b()},setup(e,a){let{slots:t}=a;const l=N(()=>{const n=[];let s;for(s in m)m[s].forEach(r=>{const o=e[r],i=B(s,r,o);i&&n.push(i)});return n.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),n});return()=>{var n;return j(e.tag,{class:["v-row",l.value,e.class],style:e.style},(n=t.default)==null?void 0:n.call(t))}}});export{x as V,R as a};
