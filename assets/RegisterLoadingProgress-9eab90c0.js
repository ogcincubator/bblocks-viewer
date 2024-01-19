import{_ as k,C as a,D as g,a0 as m,m as e,G as n,I as d,L as u,F as x,E as r,a3 as p,a4 as V,J as w,a2 as C}from"./index-25e2ab18.js";import{w as v,k as _,j as E,v as y}from"./VContainer-dfc8461f.js";import{k as c,i as b,l as D,p as L,o as N,j as S}from"./VList-86ef4b71.js";const j={props:{completed:Number,total:Number,failed:Object},data(){return{showErrorsDialog:!1}},methods:{openUrl(h){window.open(h)}},computed:{finished(){return this.completed+Object.keys(this.failed).length===this.total},hasErrors(){return this.failed&&Object.keys(this.failed).length},textColor(){return this.hasErrors?"error":this.total>0&&this.completed==this.total?"success":"primary"},textStyle(){return this.hasErrors?"color: rgb(var(--v-theme-error))":""}}},B={key:0,class:"d-flex align-center"},z={class:"flex-grow-1 flex-shrink-1"},O=m("p",null,"The following errors were encountered while loading the list of building block registers:",-1);function P(h,t,l,R,i,o){return l.total?(a(),g("div",B,[m("div",z,[e(v,{"model-value":100*l.completed/l.total,color:o.textColor},null,8,["model-value","color"])]),m("div",{class:"text-caption text-no-wrap pl-3",style:V(o.textStyle)},[o.finished?d("",!0):(a(),n(N,{key:0,size:"10",indeterminate:"",class:"mr-1"})),u(" Loaded "+x(l.completed)+" / "+x(l.total)+" registers ",1),o.hasErrors?(a(),n(c,{key:1,class:"mx-2",size:"x-small",color:"error","prepend-icon":"mdi-alert-octagon",onClick:t[0]||(t[0]=s=>i.showErrorsDialog=!0)},{default:r(()=>[u(" Errors ")]),_:1})):d("",!0),e(c,{size:"x-small",onClick:t[1]||(t[1]=p(s=>this.$emit("hide"),["prevent"])),class:"mx-2"},{default:r(()=>[u("Hide")]),_:1})],4),e(L,{modelValue:i.showErrorsDialog,"onUpdate:modelValue":t[3]||(t[3]=s=>i.showErrorsDialog=s),"max-width":"800"},{default:r(()=>[e(_,{title:"Register load errors"},{default:r(()=>[e(E,null,{default:r(()=>[O,e(b,null,{default:r(()=>[(a(!0),g(w,null,C(this.failed,(s,f)=>(a(),n(S,{title:f,subtitle:s.error.toString(),onClick:p(T=>o.openUrl(f),["prevent"])},null,8,["title","subtitle","onClick"]))),256))]),_:1})]),_:1}),e(y,null,{default:r(()=>[e(D),e(c,{text:"Close",onClick:t[2]||(t[2]=s=>i.showErrorsDialog=!1)})]),_:1})]),_:1})]),_:1},8,["modelValue"])])):d("",!0)}const A=k(j,[["render",P]]);export{A as R};