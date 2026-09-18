const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/VTabs.js","assets/VChip.js","assets/VChip.css","assets/VTooltip.js","assets/VTooltip.css","assets/VTabs.css","assets/TransformInfo.js","assets/VRow.js","assets/VRow.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VMenu.js","assets/VMenu.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ge,f as I,D as Pe,c as Se,b as be,u as Le,d as Me}from"./index.js";import{J as xe,_ as Ie,q as L,y as Oe,U as we,H as De,a4 as Re,V as Ae,o as v,n as B,c as E,w as y,av as je,t as V,F as te,z as ve,x as J,a8 as ye,u as T,v as j,Q as Be,p as _e,j as $e,bL as He,as as Ne,A as W,ac as Ge,a0 as Fe,E as X,ap as Ue}from"./vendor.js";import{k as Q,g as Je}from"./mime-types.js";import{s as qe,A as Ye,t as Ze,x as We,a as Xe,c as Qe,d as Ke}from"./VList.js";import{m as et,q as A}from"./VCard.js";import{g as tt}from"./VSelect.js";import{V as rt,a as nt}from"./VTabs.js";import{a as ot,c as at,b as lt,V as it}from"./VExpansionPanels.js";const re=200*1024,st=10*1024*1024,ct=1024*1024;function dt(e,t=re){return typeof e=="number"&&e>t}function ke(e){return typeof e=="string"?new Blob([e]).size:0}function Xt(e,t=re){return typeof e!="string"||ke(e)<=t?{text:e,truncated:!1}:{text:e.slice(0,t),truncated:!0}}function ut(e,t=re){return e?dt(e.sizeBytes,t)?!0:ke(e.code)>t:!1}const Ee=Symbol.for("vuetify:v-item-group"),ft=De({...Ae(),...Ye({selectedClass:"v-item--selected"}),...et(),...Re()},"VItemGroup"),pt=xe()({name:"VItemGroup",props:ft(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:r}=t;const{themeClasses:a}=Ie(e),{isSelected:n,select:i,next:o,prev:c,selected:f}=qe(e,Ee);return()=>L(e.tag,{class:we(["v-item-group",a.value,e.class]),style:Oe(e.style)},{default:()=>[r.default?.({isSelected:n,select:i,next:o,prev:c,selected:f.value})]})}}),mt=xe()({name:"VItem",props:We(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:r}=t;const{isSelected:a,select:n,toggle:i,selectedClass:o,value:c,disabled:f}=Ze(e,Ee);return()=>r.default?.({isSelected:a.value,selectedClass:o.value,select:n,toggle:i,value:c.value,disabled:f.value})}}),ht={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:e=>["buttons","dropdown"].includes(e)}},emits:["update:modelValue"]},gt={key:0,class:"language-tabs"},bt={key:0,class:"mr-2"},xt={class:"d-flex align-center"},wt={key:0,class:"mr-1"};function vt(e,t,r,a,n,i){return r.languages?.length?(v(),B("div",gt,[r.variant==="buttons"?(v(),E(pt,{key:0,"model-value":r.modelValue,"onUpdate:modelValue":t[0]||(t[0]=o=>e.$emit("update:modelValue",o)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:y(()=>[e.$slots.preText?(v(),B("div",bt,[je(e.$slots,"pre-text")])):V("",!0),(v(!0),B(te,null,ve(r.languages,o=>(v(),E(mt,{key:o.id,value:o.id},{default:y(({isSelected:c,toggle:f})=>[L(Xe,{color:c?"primary":"default",onClick:J(f,["stop"]),class:we(["mx-1 mb-1",{"ml-4":o.isTransform}])},ye({default:y(()=>[T(" "+j(o.label),1)]),_:2},[o.isTransform||o.icon||o.hasError?{name:"prepend",fn:y(()=>[o.isTransform?(v(),E(A,{key:0,size:"small",class:"mr-n1"},{default:y(()=>[...t[2]||(t[2]=[T("mdi-arrow-right-thin",-1)])]),_:1})):V("",!0),o.hasError?(v(),E(A,{key:1,color:"error",size:"small"},{default:y(()=>[...t[3]||(t[3]=[T("mdi-alert-circle",-1)])]),_:1})):o.icon?(v(),E(A,{key:2,size:"small"},{default:y(()=>[T(j(o.icon),1)]),_:2},1024)):V("",!0)]),key:"0"}:void 0]),1032,["color","onClick","class"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):V("",!0),r.variant==="dropdown"?(v(),E(tt,{key:1,"model-value":r.modelValue,"onUpdate:modelValue":t[1]||(t[1]=o=>e.$emit("update:modelValue",o)),items:r.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language","menu-props":{maxHeight:500}},{item:y(({props:o,item:c})=>[L(Qe,Be(o,{class:{"pl-6":c.raw.isTransform}}),{title:y(()=>[_e("span",xt,[c.raw.isTransform?(v(),B("span",wt,"⤷")):V("",!0),c.raw.hasError?(v(),E(A,{key:1,color:"error",size:"small",class:"mr-2"},{default:y(()=>[...t[4]||(t[4]=[T("mdi-alert-circle",-1)])]),_:1})):c.raw.icon?(v(),E(A,{key:2,size:"small",class:"mr-2"},{default:y(()=>[T(j(c.raw.icon),1)]),_:2},1024)):V("",!0),T(" "+j(c.raw.label),1)])]),_:2},1040,["class"])]),selection:y(({item:o})=>[o.raw.hasError?(v(),E(A,{key:0,color:"error",size:"small",class:"mr-2"},{default:y(()=>[...t[5]||(t[5]=[T("mdi-alert-circle",-1)])]),_:1})):o.raw.icon?(v(),E(A,{key:1,size:"small",class:"mr-2"},{default:y(()=>[T(j(o.raw.icon),1)]),_:2},1024)):V("",!0),T(" "+j(o.raw.isTransform?o.raw.selectionLabel:o.raw.label),1)]),_:1},8,["model-value","items"])):V("",!0)])):V("",!0)}const ie=ge(ht,[["render",vt]]);function yt(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[r,a]=e.split("/"),[n,i]=t.split("/");return r===n&&(a==="*"||a===i)}function ne(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[r,a]=e.split("/"),[n,i]=t.split("/");return r===n&&(a==="*"||a===i)}function Te(e,t){e.innerHTML="";const r=document.createElement("div");r.style.cssText="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 16px; text-align: center; color: #b00020; font: 14px/1.4 sans-serif;";const a=document.createElement("div");a.textContent=t;const n=document.createElement("div");n.style.cssText="margin-top: 12px;",n.textContent="See the browser console for details.",r.append(a,n),e.appendChild(r)}const _t=`/* required styles */\r
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
`,se=["application/geo+json","application/json","application/ld+json"],kt=`
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
`;let K=null,ce=!1;function Et(e){if(ce)return;const t=document.createElement("style");t.textContent=e,document.head.appendChild(t),ce=!0}function Tt(){return K||(Et(_t+kt),K=Promise.all([I(()=>import("./leaflet-src.js").then(e=>e.l),__vite__mapDeps([0,1])),I(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),I(()=>import("./marker-icon.js"),[]),I(()=>import("./marker-icon-2x.js"),[]),I(()=>import("./marker-shadow.js"),[])]).then(([{default:e},{createJsonLDGeoJSONLayer:t},r,a,n])=>(delete e.Icon.Default.prototype._getIconUrl,e.Icon.Default.mergeOptions({iconUrl:r.default,iconRetinaUrl:a.default,shadowUrl:n.default}),{L:e,createJsonLDGeoJSONLayer:t}))),K}function zt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry:e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry!=null):!1}class Ct{static supportedTypes=se;static viewName="Map view";static icon="mdi-map";constructor(t,r={}){this.candidates=t,this.bblock=r.bblock??null,this.viewerConfig=r.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const t=this.candidates.find(r=>{if(!r.type||!r.content||!se.some(a=>ne(a,r.type)))return!1;try{return zt(JSON.parse(r.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,this._mount(t).catch(r=>{console.error("GeoJsonMapPlugin: init failed",r),this._el===t&&(this.destroy(t),Te(t,`Failed to render this map view (${r.message}).`))})}async _mount(t){const r=this._pickCandidate();if(!r)return;const a=JSON.parse(r.content),{L:n,createJsonLDGeoJSONLayer:i}=await Tt();if(this._el!==t)return;const o=n.map(t,{attributionControl:!1,maxZoom:22});n.control.attribution().addTo(o).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),n.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(o),this._map=o;const f=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:p,bblocksFallbackSparqlEndpoints:m}=this.viewerConfig,x={};p&&(x.fallbackRainbowInstances=p),m&&(x.fallbackSparqlEndpoints=m);try{const P=(await i(n,a,{ldContext:f,augmentOptions:x,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(o);this._layer=P;const O=P.getBounds();O.isValid()?o.fitBounds(O,{padding:[20,20]}):o.setView([0,0],2)}catch(P){console.warn("GeoJsonMapPlugin: error building layer",P),o.setView([0,0],2)}}destroy(t){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===t&&(this._el=null)}}function ze(e){return!Array.isArray(e)||!e.length?!1:typeof e[0]=="number"?e.length>=3:e.some(ze)}function U(e){return!e?.type||!e.coordinates?!1:ze(e.coordinates)}function Vt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry&&U(e.geometry):e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry&&U(t.geometry)):e.type==="GeometryCollection"?Array.isArray(e.geometries)&&e.geometries.some(U):e.coordinates?U(e):!1}const de=["application/geo+json","application/json","application/ld+json"],q="0.184.0",ue=()=>I(()=>import(`https://esm.sh/three@${q}`),[]),Pt=()=>I(()=>import(`https://esm.sh/three@${q}/examples/jsm/controls/OrbitControls.js`),[]);function St(e){return e?.depResolver?e.depResolver.resolve({name:"three",range:`^${q}`,version:q,load:ue}):ue()}const fe="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function pe(e){return e?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Lt={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Mt{static supportedTypes=de;static viewName="3D view";static icon="mdi-cube-outline";constructor(t,r={}){this.candidates=t,this._context=r,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(r=>{if(!r.type||!r.content||!de.some(a=>ne(a,r.type)))return!1;try{return Vt(JSON.parse(r.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,t.style.position="relative",this._mount(t).catch(r=>{console.error("ThreeDPlugin: init failed",r),this._el===t&&this._showError(t,`Failed to render this 3D view (${r.message}).`)})}_showError(t,r){this.destroy(t),Te(t,r)}async _mount(t){const r=this._pickCandidate();if(!r)return;const a=JSON.parse(r.content),[n,{OrbitControls:i}]=await Promise.all([St(this._context),Pt()]);if(this._el!==t)return;this._THREE=n;const o=document.createElement("div");o.style.cssText="height: 100%; width: 100%;",t.appendChild(o);const c=o.clientWidth||600,f=o.clientHeight||400,p=new n.Scene;p.background=new n.Color(11383217);const m=new n.PerspectiveCamera(60,c/f,.001,1e4);m.up.set(0,0,1),this._camera=m;const x=new n.WebGLRenderer({antialias:!0});x.setPixelRatio(window.devicePixelRatio),x.setSize(c,f),o.appendChild(x.domElement),this._renderer=x;const P=new i(m,x.domElement);P.enableDamping=!0,P.dampingFactor=.05,this._controls=P,p.add(new n.AmbientLight(16777215,.5));const O=new n.DirectionalLight(16777215,.8);O.position.set(100,100,100),p.add(O);const G=new n.DirectionalLight(16777215,.3);G.position.set(-100,-100,-100),p.add(G);const F=new n.DirectionalLight(16777215,.3);if(F.position.set(0,-100,0),p.add(F),this._gridHelper=new n.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,p.add(this._gridHelper),p.add(new n.AxesHelper(1)),await this._buildGeoJsonScene(p,a),this._el!==t)return;this._fitCamera(n),this._buildControls(t),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!o.isConnected)return;const D=o.clientWidth,H=o.clientHeight;!D||!H||(m.aspect=D/H,m.updateProjectionMatrix(),x.setSize(D,H))}),this._resizeObserver.observe(o),this._animating=!0;const $=()=>{if(this._animating){this._animFrameId=requestAnimationFrame($);try{P.update(),x.render(p,m)}catch(D){console.error("ThreeDPlugin: render loop failed",D),this._showError(t,`An error occurred while rendering this 3D view (${D.message}).`)}}};$()}async _buildGeoJsonScene(t,r){const{buildGeoJson3DObjects:a}=await I(async()=>{const{buildGeoJson3DObjects:i}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:i}},[]),n=a(r,this._THREE);n.meshes.forEach(i=>{i.material.wireframe=this._wireframe,this._solidMeshes.push(i)}),n.lines.forEach(i=>{i.visible=this._showEdges,this._solidEdges.push(i)}),n.points.forEach(i=>{i.visible=this._showVertices,this._solidVertices.push(i)}),n.objects.forEach(i=>t.add(i))}_fitCamera(t){const r=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!r.length)return;const a=new t.Box3;if(r.forEach(f=>a.expandByObject(f)),a.isEmpty())return;const n=a.getCenter(new t.Vector3),i=a.getSize(new t.Vector3),c=Math.max(i.x,i.y,i.z)*2;this._camera.position.set(n.x-c*.7,n.y-c*.7,n.z+c*.7),this._camera.near=c*.001,this._camera.far=c*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(n),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(t){const r=document.createElement("div");r.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const a=(n,i,o,c)=>{const f=document.createElement("button");return f.type="button",f.title=i,f.innerHTML=Lt[n],f.style.cssText=fe+pe(c?.()),f.addEventListener("click",()=>{o(),f.style.cssText=fe+pe(c?.())}),r.appendChild(f),f};a("reset","Reset camera",()=>this._resetCamera()),a("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),a("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(n=>{n.material.wireframe=this._wireframe})},()=>this._wireframe),a("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(n=>{n.visible=this._showEdges})},()=>this._showEdges),a("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(n=>{n.visible=this._showVertices})},()=>this._showVertices),t.appendChild(r),this._controlsEl=r}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(t){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(r=>{r.geometry?.dispose(),r.material?.dispose()}),this._solidEdges.forEach(r=>{r.geometry?.dispose(),r.material?.dispose()}),this._solidVertices.forEach(r=>{r.children?.forEach(a=>{a.geometry?.dispose(),a.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===t&&(this._el=null),t.innerHTML=""}}const me=["text/html","application/xhtml+xml"],It=/^https?:\/\//;class Ot{static supportedTypes=me;static viewName="Web view";static icon="mdi-web";constructor(t){this.candidates=t,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(r=>r.type&&r.url&&me.some(a=>ne(a,r.type))&&It.test(r.url));return this._candidate=t??null,this._candidate}render(t){this._el=t;const r=this._pickCandidate();if(!r)return;t.style.overflow="auto";const a=document.createElement("iframe");a.src=r.url,a.setAttribute("sandbox","allow-same-origin"),a.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const n=a.contentDocument,i=n?.documentElement?.scrollHeight||n?.body?.scrollHeight;i&&(a.style.height=`${i}px`)}catch{}},a.addEventListener("load",this._onLoad),t.appendChild(a),this._iframe=a}destroy(t){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===t&&(this._el=null),t.innerHTML=""}}const Dt=[Ct,Mt,Ot].map(e=>({PluginClass:e,weight:1/0}));let ee=null;const Rt=new Pe;function At(){return ee||(ee=be.registerPromises.local.promise.then(async e=>{const t=e?.viewer?.viewPlugins??[],r=await Promise.all(t.map(async a=>{try{const n=await import(a.url);return(Array.isArray(a.export)&&a.export.length?a.export:[a.export||null]).map(o=>{const c=o?n[o]:n.default;return c?{PluginClass:c,weight:a.weight??0}:(console.warn(`View plugin has no export named "${o??"default"}": ${a.url}`),null)})}catch(n){return console.warn(`View plugin failed to load: ${a.url}`,n),[]}}));return[...Dt,...r.flat().filter(Boolean)]})),ee}function jt(){async function e(t,r={}){if(!t?.length)return[];const a={...r,viewerConfig:Se.config,depResolver:Rt},n=await At(),i=[];for(const{PluginClass:o,weight:c}of n){const f=o.supportedTypes??[];if(!t.some(m=>m.type&&f.some(x=>yt(x,m.type))))continue;if(typeof o.viewName!="string"||!o.viewName.trim()){console.warn(`View plugin has no static viewName, skipping: ${o.name}`);continue}let p;try{if(p=$e(new o(t,a)),!(p.matches?.()??!0))continue}catch(m){console.warn(`View plugin threw while matching: ${o.name}`,m);continue}i.push({instance:p,weight:c,PluginClass:o})}return i}return{matchPlugins:e}}function Bt(e,t=null){return{type:e.language?.mimeType??e.language?.id??null,content:e.code??t?.contents??null,url:e.url??null,label:e.language?.label??e.language?.id??"unknown"}}function Qt(e,t,r=null){return{type:e.outputs?.mediaTypes?.[0]?.mimeType??null,content:r?.contents??null,url:t?.url??null,label:e.id}}const he=1500,$t=15e3,Ht={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(e,{emit:t}){const{matchPlugins:r}=jt(),a=Ue(()=>I(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]))),n=e,i=t,o=Le(),c=He(),f=Ne(),p=X([]),m=X([]),x=X([]);function P(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function O(s){return s[0]?.id}function G(s){const l=s.filter(h=>!h.isTransform),d=s.filter(h=>h.isTransform);l.sort((h,w)=>h.order===w.order?h.label.localeCompare(w.label):h.order-w.order);const u=new Map;d.forEach(h=>{const w=h.transformEntry.snippet.language?.id;u.has(w)||u.set(w,[]),u.get(w).push(h)}),u.forEach(h=>h.sort((w,g)=>w.label.localeCompare(g.label)));const _=[];return l.forEach(h=>{_.push(h);const w=u.get(h.id);w&&(_.push(...w),u.delete(h.id))}),u.forEach(h=>_.push(...h)),_}async function F(){const s=n.bblock;if(!n.bblock?.examples?.length){p.value=[],m.value=[],x.value=[];return}const l=[],d=[],u=[];if(n.bblock.examples.forEach(w=>{w.snippets?.forEach(g=>{let k;typeof g.language=="object"?k=g.language:(g.language||(g.language="plaintext"),k=Q[g.language],typeof k=="string"&&(k=Q[k]),k||(k={id:g.language,order:999,label:g.language}),g.language=k),(Je.has(k.id)||k.mimeType||!Q[k.id])&&g.code==null&&g.url&&!ut(g,ct)&&u.push(be.fetchDocumentByUrl(n.bblock,g.url,{maxSize:st}).then(z=>{g.code=z}).catch(()=>{}))})}),await Promise.all(u),n.bblock!==s||(n.bblock.examples.forEach((w,g)=>{const k=w.snippets?.map(z=>z.language)??[];if(n.bblock.transforms?.length){const z=[];n.bblock.transforms.forEach(b=>{w.snippets?.forEach((M,S)=>{const C=M.transformResults?.[b.id];if(C!=null){const R=typeof C=="string";z.push({transform:b,snippet:M,snippetIdx:S,url:R?C:C.url||null,success:R?!0:C.success??!0,stderr:R?null:C.stderr||null,profilesValidation:R?null:C.profilesValidation||null})}})});const N={};z.forEach(b=>{N[b.transform.id]=(N[b.transform.id]||0)+1}),z.sort((b,M)=>{const S=b.transform.id.localeCompare(M.transform.id);return S!==0?S:b.snippetIdx-M.snippetIdx}),z.forEach(b=>{const M=N[b.transform.id]>1;k.push({id:M?`transform:${b.snippetIdx}-${b.transform.id}`:`transform:${b.transform.id}`,label:b.transform.id,selectionLabel:`${b.transform.id} (${b.snippet.language?.label||b.snippetIdx+1})`,icon:"mdi-file-swap",hasError:!b.success,isTransform:!0,transform:b.transform,transformEntry:b})})}const le=(w.snippets??[]).map(z=>Bt(z));d.push(r(le,{bblock:n.bblock}).then(z=>{const N=new Map;z.forEach(({instance:b,weight:M,PluginClass:S})=>{const C=P(S.viewName??S.name??"")||"plugin",R=N.get(C)??0;N.set(C,R+1);const Ve=R===0?C:`${C}-${R+1}`;k.push({id:`plugin:${Ve}`,order:-.5-(M??0)/1e6,label:S.viewName??S.name??"Custom view",icon:S.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:b})})})),l[g]=k}),await Promise.all(d),n.bblock!==s))return;const _=[],h=[];l.forEach((w,g)=>{l[g]=G(w),h.push(g),_[g]=O(l[g])}),p.value=l,m.value=_,x.value=h,ae(),Y()}function $(s){const l=document.getElementById(`example-panel-${s.idx}`);if(!l){console.warn(`scrollToExample: no panel found for example index ${s.idx}`);return}const d=l.getBoundingClientRect().top,u=document.querySelector("header").offsetHeight,_=window.scrollY+d-u;Math.abs(_-window.scrollY)<2||window.scrollTo(0,_)}function D(s){const l=/^example-(\d+)$/.exec(s?.[0]??"");return l?{idx:parseInt(l[1],10)-1,language:s[1]||null}:null}function H(s,l){const d=[`example-${s+1}`];return l&&d.push(l),{name:"BuildingBlock",params:{id:n.bblock.itemIdentifier,section:"examples",rest:d}}}async function Y(){if(!n.active)return;const s=D(c.params.rest);if(!s||!n.bblock?.examples?.[s.idx])return;const{idx:l,language:d}=s;x.value.includes(l)||x.value.push(l),d&&p.value[l]?.some(u=>u.id===d)?m.value[l]=d:m.value[l]=O(p.value[l]??[]),await Fe(),Ce(l)}let Z=null;function Ce(s){Z?.cleanup();let l;const d=()=>{_.disconnect(),clearTimeout(l),clearTimeout(h),window.removeEventListener("wheel",d),window.removeEventListener("touchmove",d),window.removeEventListener("keydown",d),Z=null};window.addEventListener("wheel",d,{passive:!0}),window.addEventListener("touchmove",d,{passive:!0}),window.addEventListener("keydown",d);const u=Me(()=>$({idx:s}),50),_=new ResizeObserver(()=>{u(),clearTimeout(l),l=setTimeout(d,he)});_.observe(document.body),l=setTimeout(d,he);const h=setTimeout(d,$t);Z={cleanup:d},$({idx:s})}W(()=>c.params.rest,Y);function oe(s){const l=f.resolve(H(s,m.value[s]));return window.location.origin+l.href}function ae(){n.active&&n.bblock?.examples?.length?o.setItems(n.bblock.examples.map((s,l)=>({title:s.title,idx:l,to:H(l,null)})),$):o.clearItems()}return W(()=>n.bblock,F,{immediate:!0}),W(()=>n.active,s=>{ae(),s&&Y()}),(s,l)=>(v(),B("div",null,[e.bblock.semanticUplift?.additionalSteps?.length?(v(),E(rt,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:y(()=>[l[4]||(l[4]=T(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),_e("a",{href:"#",onClick:l[0]||(l[0]=J(d=>i("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),l[5]||(l[5]=T(" for more information. ",-1))]),_:1})):V("",!0),L(it,{multiple:"",modelValue:x.value,"onUpdate:modelValue":l[3]||(l[3]=d=>x.value=d)},{default:y(()=>[(v(!0),B(te,null,ve(e.bblock.examples,(d,u)=>(v(),B(te,{key:u},[d.content?.length||d.snippets?.length?(v(),E(ot,{key:0,value:u,id:`example-panel-${u}`},{default:y(()=>[L(at,null,{default:y(()=>[L(nt,{class:"example-copy-link",icon:"mdi-link-variant",text:oe(u),href:oe(u),title:"Copy link to this example",size:"small",variant:"text",onClick:l[1]||(l[1]=J(()=>{},["stop"]))},null,8,["text","href"]),T(" "+j(d.title)+" ",1),L(Ke),s.$vuetify.display.mdAndUp?(v(),E(ie,{key:0,onClick:l[2]||(l[2]=J(()=>{},["stop"])),variant:s.$vuetify.display.lgAndUp&&p.value[u]?.length<5?"buttons":"dropdown",modelValue:m.value[u],"onUpdate:modelValue":_=>m.value[u]=_,languages:p.value[u]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):V("",!0)]),_:2},1024),L(lt,null,{default:y(()=>[L(Ge(a),{bblock:e.bblock,example:d,language:p.value[u]?.find(_=>_.id===m.value[u]),"source-files-url":e.bblock.sourceFiles},ye({_:2},[s.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:y(()=>[L(ie,{modelValue:m.value[u],"onUpdate:modelValue":_=>m.value[u]=_,languages:p.value[u],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):V("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Nt=ge(Ht,[["__scopeId","data-v-b6e6765a"]]),Kt=Object.freeze(Object.defineProperty({__proto__:null,default:Nt},Symbol.toStringTag,{value:"Module"}));export{Kt as B,ct as M,st as a,Xt as b,dt as i,Qt as t,jt as u};
