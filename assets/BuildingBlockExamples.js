const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/BuildingBlock.js","assets/VChip.js","assets/VChip.css","assets/VMenu.js","assets/VMenu.css","assets/VTabs.js","assets/VTooltip.js","assets/VTooltip.css","assets/VTabs.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.js","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as ge,f as M,D as Pe,c as Se,b as be,u as Le,d as Ie}from"./index.js";import{J as xe,_ as Me,q as S,y as Oe,U as we,H as De,a4 as Re,V as Ae,r as je,o as v,n as A,c as E,w as _,av as Be,t as C,F as te,z as ve,x as U,a8 as ye,u as L,v as J,Q as $e,p as _e,j as He,bL as Ne,as as Ge,A as W,ac as Fe,a0 as Ue,E as X,ap as Je}from"./vendor.js";import{k as Q,g as qe}from"./mime-types.js";import{P as Ye}from"./BuildingBlock.js";import{s as Ze,A as We,t as Xe,x as Qe,a as Ke,c as et,d as tt}from"./VList.js";import{m as nt,q as G}from"./VCard.js";import{g as rt}from"./VSelect.js";import{V as ot,a as at}from"./VTabs.js";import{a as lt,c as it,b as st,V as ct}from"./VExpansionPanels.js";const ne=200*1024,dt=10*1024*1024,ut=1024*1024;function ft(e,t=ne){return typeof e=="number"&&e>t}function ke(e){return typeof e=="string"?new Blob([e]).size:0}function en(e,t=ne){return typeof e!="string"||ke(e)<=t?{text:e,truncated:!1}:{text:e.slice(0,t),truncated:!0}}function pt(e,t=ne){return e?ft(e.sizeBytes,t)?!0:ke(e.code)>t:!1}const Ee=Symbol.for("vuetify:v-item-group"),mt=De({...Ae(),...We({selectedClass:"v-item--selected"}),...nt(),...Re()},"VItemGroup"),ht=xe()({name:"VItemGroup",props:mt(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:o}=Me(e),{isSelected:r,select:s,next:i,prev:a,selected:d}=Ze(e,Ee);return()=>S(e.tag,{class:we(["v-item-group",o.value,e.class]),style:Oe(e.style)},{default:()=>[n.default?.({isSelected:r,select:s,next:i,prev:a,selected:d.value})]})}}),gt=xe()({name:"VItem",props:Qe(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:n}=t;const{isSelected:o,select:r,toggle:s,selectedClass:i,value:a,disabled:d}=Xe(e,Ee);return()=>n.default?.({isSelected:o.value,selectedClass:i.value,select:r,toggle:s,value:a.value,disabled:d.value})}}),bt={components:{PluginIcon:Ye},props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:e=>["buttons","dropdown"].includes(e)}},emits:["update:modelValue"]},xt={key:0,class:"language-tabs"},wt={key:0,class:"mr-2"},vt={class:"d-flex align-center"},yt={key:0,class:"mr-1"};function _t(e,t,n,o,r,s){const i=je("PluginIcon");return n.languages?.length?(v(),A("div",xt,[n.variant==="buttons"?(v(),E(ht,{key:0,"model-value":n.modelValue,"onUpdate:modelValue":t[0]||(t[0]=a=>e.$emit("update:modelValue",a)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:_(()=>[e.$slots.preText?(v(),A("div",wt,[Be(e.$slots,"pre-text")])):C("",!0),(v(!0),A(te,null,ve(n.languages,a=>(v(),E(gt,{key:a.id,value:a.id},{default:_(({isSelected:d,toggle:p})=>[S(Ke,{color:d?"primary":"default",onClick:U(p,["stop"]),class:we(["mx-1 mb-1",{"ml-4":a.isTransform}])},ye({default:_(()=>[L(" "+J(a.label),1)]),_:2},[a.isTransform||a.icon||a.hasError?{name:"prepend",fn:_(()=>[a.isTransform?(v(),E(G,{key:0,size:"small",class:"mr-n1"},{default:_(()=>[...t[2]||(t[2]=[L("mdi-arrow-right-thin",-1)])]),_:1})):C("",!0),a.hasError?(v(),E(G,{key:1,color:"error",size:"small"},{default:_(()=>[...t[3]||(t[3]=[L("mdi-alert-circle",-1)])]),_:1})):a.icon?(v(),E(i,{key:2,icon:a.icon,size:"small"},null,8,["icon"])):C("",!0)]),key:"0"}:void 0]),1032,["color","onClick","class"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):C("",!0),n.variant==="dropdown"?(v(),E(rt,{key:1,"model-value":n.modelValue,"onUpdate:modelValue":t[1]||(t[1]=a=>e.$emit("update:modelValue",a)),items:n.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language","menu-props":{maxHeight:500}},{item:_(({props:a,item:d})=>[S(et,$e(a,{class:{"pl-6":d.raw.isTransform}}),{title:_(()=>[_e("span",vt,[d.raw.isTransform?(v(),A("span",yt,"⤷")):C("",!0),d.raw.hasError?(v(),E(G,{key:1,color:"error",size:"small",class:"mr-2"},{default:_(()=>[...t[4]||(t[4]=[L("mdi-alert-circle",-1)])]),_:1})):d.raw.icon?(v(),E(i,{key:2,icon:d.raw.icon,size:"small",class:"mr-2"},null,8,["icon"])):C("",!0),L(" "+J(d.raw.label),1)])]),_:2},1040,["class"])]),selection:_(({item:a})=>[a.raw.hasError?(v(),E(G,{key:0,color:"error",size:"small",class:"mr-2"},{default:_(()=>[...t[5]||(t[5]=[L("mdi-alert-circle",-1)])]),_:1})):a.raw.icon?(v(),E(i,{key:1,icon:a.raw.icon,size:"small",class:"mr-2"},null,8,["icon"])):C("",!0),L(" "+J(a.raw.isTransform?a.raw.selectionLabel:a.raw.label),1)]),_:1},8,["model-value","items"])):C("",!0)])):C("",!0)}const ie=ge(bt,[["render",_t]]);function kt(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[n,o]=e.split("/"),[r,s]=t.split("/");return n===r&&(o==="*"||o===s)}function re(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[n,o]=e.split("/"),[r,s]=t.split("/");return n===r&&(o==="*"||o===s)}function Te(e,t){e.innerHTML="";const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 16px; text-align: center; color: #b00020; font: 14px/1.4 sans-serif;";const o=document.createElement("div");o.textContent=t;const r=document.createElement("div");r.style.cssText="margin-top: 12px;",r.textContent="See the browser console for details.",n.append(o,r),e.appendChild(n)}const Et=`/* required styles */\r
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
`,se=["application/geo+json","application/json","application/ld+json"],Tt=`
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
`;let K=null,ce=!1;function zt(e){if(ce)return;const t=document.createElement("style");t.textContent=e,document.head.appendChild(t),ce=!0}function Ct(){return K||(zt(Et+Tt),K=Promise.all([M(()=>import("./leaflet-src.js").then(e=>e.l),__vite__mapDeps([0,1])),M(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),M(()=>import("./marker-icon.js"),[]),M(()=>import("./marker-icon-2x.js"),[]),M(()=>import("./marker-shadow.js"),[])]).then(([{default:e},{createJsonLDGeoJSONLayer:t},n,o,r])=>(delete e.Icon.Default.prototype._getIconUrl,e.Icon.Default.mergeOptions({iconUrl:n.default,iconRetinaUrl:o.default,shadowUrl:r.default}),{L:e,createJsonLDGeoJSONLayer:t}))),K}function Vt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry:e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry!=null):!1}class Pt{static supportedTypes=se;static viewName="Map view";static icon="mdi-map";constructor(t,n={}){this.candidates=t,this.bblock=n.bblock??null,this.viewerConfig=n.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const t=this.candidates.find(n=>{if(!n.type||!n.content||!se.some(o=>re(o,n.type)))return!1;try{return Vt(JSON.parse(n.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,this._mount(t).catch(n=>{console.error("GeoJsonMapPlugin: init failed",n),this._el===t&&(this.destroy(t),Te(t,`Failed to render this map view (${n.message}).`))})}async _mount(t){const n=this._pickCandidate();if(!n)return;const o=JSON.parse(n.content),{L:r,createJsonLDGeoJSONLayer:s}=await Ct();if(this._el!==t)return;const i=r.map(t,{attributionControl:!1,maxZoom:22});r.control.attribution().addTo(i).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),r.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(i),this._map=i;const d=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:p,bblocksFallbackSparqlEndpoints:m}=this.viewerConfig,x={};p&&(x.fallbackRainbowInstances=p),m&&(x.fallbackSparqlEndpoints=m);try{const V=(await s(r,o,{ldContext:d,augmentOptions:x,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(i);this._layer=V;const O=V.getBounds();O.isValid()?i.fitBounds(O,{padding:[20,20]}):i.setView([0,0],2)}catch(V){console.warn("GeoJsonMapPlugin: error building layer",V),i.setView([0,0],2)}}destroy(t){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===t&&(this._el=null)}}function ze(e){return!Array.isArray(e)||!e.length?!1:typeof e[0]=="number"?e.length>=3:e.some(ze)}function F(e){return!e?.type||!e.coordinates?!1:ze(e.coordinates)}function St(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry&&F(e.geometry):e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry&&F(t.geometry)):e.type==="GeometryCollection"?Array.isArray(e.geometries)&&e.geometries.some(F):e.coordinates?F(e):!1}const de=["application/geo+json","application/json","application/ld+json"],q="0.184.0",ue=()=>M(()=>import(`https://esm.sh/three@${q}`),[]),Lt=()=>M(()=>import(`https://esm.sh/three@${q}/examples/jsm/controls/OrbitControls.js`),[]);function It(e){return e?.depResolver?e.depResolver.resolve({name:"three",range:`^${q}`,version:q,load:ue}):ue()}const fe="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function pe(e){return e?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Mt={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Ot{static supportedTypes=de;static viewName="3D view";static icon="mdi-cube-outline";constructor(t,n={}){this.candidates=t,this._context=n,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(n=>{if(!n.type||!n.content||!de.some(o=>re(o,n.type)))return!1;try{return St(JSON.parse(n.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,t.style.position="relative",this._mount(t).catch(n=>{console.error("ThreeDPlugin: init failed",n),this._el===t&&this._showError(t,`Failed to render this 3D view (${n.message}).`)})}_showError(t,n){this.destroy(t),Te(t,n)}async _mount(t){const n=this._pickCandidate();if(!n)return;const o=JSON.parse(n.content),[r,{OrbitControls:s}]=await Promise.all([It(this._context),Lt()]);if(this._el!==t)return;this._THREE=r;const i=document.createElement("div");i.style.cssText="height: 100%; width: 100%;",t.appendChild(i);const a=i.clientWidth||600,d=i.clientHeight||400,p=new r.Scene;p.background=new r.Color(11383217);const m=new r.PerspectiveCamera(60,a/d,.001,1e4);m.up.set(0,0,1),this._camera=m;const x=new r.WebGLRenderer({antialias:!0});x.setPixelRatio(window.devicePixelRatio),x.setSize(a,d),i.appendChild(x.domElement),this._renderer=x;const V=new s(m,x.domElement);V.enableDamping=!0,V.dampingFactor=.05,this._controls=V,p.add(new r.AmbientLight(16777215,.5));const O=new r.DirectionalLight(16777215,.8);O.position.set(100,100,100),p.add(O);const H=new r.DirectionalLight(16777215,.3);H.position.set(-100,-100,-100),p.add(H);const N=new r.DirectionalLight(16777215,.3);if(N.position.set(0,-100,0),p.add(N),this._gridHelper=new r.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,p.add(this._gridHelper),p.add(new r.AxesHelper(1)),await this._buildGeoJsonScene(p,o),this._el!==t)return;this._fitCamera(r),this._buildControls(t),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!i.isConnected)return;const D=i.clientWidth,B=i.clientHeight;!D||!B||(m.aspect=D/B,m.updateProjectionMatrix(),x.setSize(D,B))}),this._resizeObserver.observe(i),this._animating=!0;const j=()=>{if(this._animating){this._animFrameId=requestAnimationFrame(j);try{V.update(),x.render(p,m)}catch(D){console.error("ThreeDPlugin: render loop failed",D),this._showError(t,`An error occurred while rendering this 3D view (${D.message}).`)}}};j()}async _buildGeoJsonScene(t,n){const{buildGeoJson3DObjects:o}=await M(async()=>{const{buildGeoJson3DObjects:s}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:s}},[]),r=o(n,this._THREE);r.meshes.forEach(s=>{s.material.wireframe=this._wireframe,this._solidMeshes.push(s)}),r.lines.forEach(s=>{s.visible=this._showEdges,this._solidEdges.push(s)}),r.points.forEach(s=>{s.visible=this._showVertices,this._solidVertices.push(s)}),r.objects.forEach(s=>t.add(s))}_fitCamera(t){const n=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!n.length)return;const o=new t.Box3;if(n.forEach(d=>o.expandByObject(d)),o.isEmpty())return;const r=o.getCenter(new t.Vector3),s=o.getSize(new t.Vector3),a=Math.max(s.x,s.y,s.z)*2;this._camera.position.set(r.x-a*.7,r.y-a*.7,r.z+a*.7),this._camera.near=a*.001,this._camera.far=a*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(r),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(t){const n=document.createElement("div");n.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const o=(r,s,i,a)=>{const d=document.createElement("button");return d.type="button",d.title=s,d.innerHTML=Mt[r],d.style.cssText=fe+pe(a?.()),d.addEventListener("click",()=>{i(),d.style.cssText=fe+pe(a?.())}),n.appendChild(d),d};o("reset","Reset camera",()=>this._resetCamera()),o("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),o("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(r=>{r.material.wireframe=this._wireframe})},()=>this._wireframe),o("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(r=>{r.visible=this._showEdges})},()=>this._showEdges),o("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(r=>{r.visible=this._showVertices})},()=>this._showVertices),t.appendChild(n),this._controlsEl=n}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(t){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidEdges.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidVertices.forEach(n=>{n.children?.forEach(o=>{o.geometry?.dispose(),o.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===t&&(this._el=null),t.innerHTML=""}}const me=["text/html","application/xhtml+xml"],Dt=/^https?:\/\//;class Rt{static supportedTypes=me;static viewName="Web view";static icon="mdi-web";constructor(t){this.candidates=t,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(n=>n.type&&n.url&&me.some(o=>re(o,n.type))&&Dt.test(n.url));return this._candidate=t??null,this._candidate}render(t){this._el=t;const n=this._pickCandidate();if(!n)return;t.style.overflow="auto";const o=document.createElement("iframe");o.src=n.url,o.setAttribute("sandbox","allow-same-origin"),o.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const r=o.contentDocument,s=r?.documentElement?.scrollHeight||r?.body?.scrollHeight;s&&(o.style.height=`${s}px`)}catch{}},o.addEventListener("load",this._onLoad),t.appendChild(o),this._iframe=o}destroy(t){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===t&&(this._el=null),t.innerHTML=""}}const At=[Pt,Ot,Rt].map(e=>({PluginClass:e,weight:1/0}));let ee=null;const jt=new Pe;function Bt(){return ee||(ee=be.registerPromises.local.promise.then(async e=>{const t=e?.viewer?.viewPlugins??[],n=await Promise.all(t.map(async o=>{try{const r=await import(o.url);return(Array.isArray(o.export)&&o.export.length?o.export:[o.export||null]).map(i=>{const a=i?r[i]:r.default;return a?{PluginClass:a,weight:o.weight??0}:(console.warn(`View plugin has no export named "${i??"default"}": ${o.url}`),null)})}catch(r){return console.warn(`View plugin failed to load: ${o.url}`,r),[]}}));return[...At,...n.flat().filter(Boolean)]})),ee}function $t(){async function e(t,n={}){if(!t?.length)return[];const o={...n,viewerConfig:Se.config,depResolver:jt},r=await Bt(),s=[];for(const{PluginClass:i,weight:a}of r){const d=i.supportedTypes??[];if(!t.some(m=>m.type&&d.some(x=>kt(x,m.type))))continue;if(typeof i.viewName!="string"||!i.viewName.trim()){console.warn(`View plugin has no static viewName, skipping: ${i.name}`);continue}let p;try{if(p=He(new i(t,o)),!(p.matches?.()??!0))continue}catch(m){console.warn(`View plugin threw while matching: ${i.name}`,m);continue}s.push({instance:p,weight:a,PluginClass:i})}return s}return{matchPlugins:e}}function Ht(e,t=null){return{type:e.language?.mimeType??e.language?.id??null,content:e.code??t?.contents??null,url:e.url??null,label:e.language?.label??e.language?.id??"unknown"}}function tn(e,t,n=null){return{type:e.outputs?.mediaTypes?.[0]?.mimeType??null,content:n?.contents??null,url:t?.url??null,label:e.id}}const he=1500,Nt=15e3,Gt={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(e,{emit:t}){const{matchPlugins:n}=$t(),o=Je(()=>M(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]))),r=e,s=t,i=Le(),a=Ne(),d=Ge(),p=X([]),m=X([]),x=X([]);function V(c){return c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function O(c){return c[0]?.id}function H(c){const l=c.filter(h=>!h.isTransform),u=c.filter(h=>h.isTransform);l.sort((h,w)=>h.order===w.order?h.label.localeCompare(w.label):h.order-w.order);const f=new Map;u.forEach(h=>{const w=h.transformEntry.snippet.language?.id;f.has(w)||f.set(w,[]),f.get(w).push(h)}),f.forEach(h=>h.sort((w,g)=>w.label.localeCompare(g.label)));const y=[];return l.forEach(h=>{y.push(h);const w=f.get(h.id);w&&(y.push(...w),f.delete(h.id))}),f.forEach(h=>y.push(...h)),y}async function N(){const c=r.bblock;if(!r.bblock?.examples?.length){p.value=[],m.value=[],x.value=[];return}const l=[],u=[],f=[];if(r.bblock.examples.forEach(w=>{w.snippets?.forEach(g=>{let k;typeof g.language=="object"?k=g.language:(g.language||(g.language="plaintext"),k=Q[g.language],typeof k=="string"&&(k=Q[k]),k||(k={id:g.language,order:999,label:g.language}),g.language=k),(qe.has(k.id)||k.mimeType||!Q[k.id])&&g.code==null&&g.url&&!pt(g,ut)&&f.push(be.fetchDocumentByUrl(r.bblock,g.url,{maxSize:dt}).then(T=>{g.code=T}).catch(()=>{}))})}),await Promise.all(f),r.bblock!==c||(r.bblock.examples.forEach((w,g)=>{const k=w.snippets?.map(T=>T.language)??[];if(r.bblock.transforms?.length){const T=[];r.bblock.transforms.forEach(b=>{w.snippets?.forEach((I,P)=>{const z=I.transformResults?.[b.id];if(z!=null){const R=typeof z=="string";T.push({transform:b,snippet:I,snippetIdx:P,url:R?z:z.url||null,success:R?!0:z.success??!0,stderr:R?null:z.stderr||null,profilesValidation:R?null:z.profilesValidation||null})}})});const $={};T.forEach(b=>{$[b.transform.id]=($[b.transform.id]||0)+1}),T.sort((b,I)=>{const P=b.transform.id.localeCompare(I.transform.id);return P!==0?P:b.snippetIdx-I.snippetIdx}),T.forEach(b=>{const I=$[b.transform.id]>1;k.push({id:I?`transform:${b.snippetIdx}-${b.transform.id}`:`transform:${b.transform.id}`,label:b.transform.id,selectionLabel:`${b.transform.id} (${b.snippet.language?.label||b.snippetIdx+1})`,icon:"mdi-file-swap",hasError:!b.success,isTransform:!0,transform:b.transform,transformEntry:b})})}const le=(w.snippets??[]).map(T=>Ht(T));u.push(n(le,{bblock:r.bblock}).then(T=>{const $=new Map;T.forEach(({instance:b,weight:I,PluginClass:P})=>{const z=V(P.viewName??P.name??"")||"plugin",R=$.get(z)??0;$.set(z,R+1);const Ve=R===0?z:`${z}-${R+1}`;k.push({id:`plugin:${Ve}`,order:-.5-(I??0)/1e6,label:P.viewName??P.name??"Custom view",icon:P.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:b})})})),l[g]=k}),await Promise.all(u),r.bblock!==c))return;const y=[],h=[];l.forEach((w,g)=>{l[g]=H(w),h.push(g),y[g]=O(l[g])}),p.value=l,m.value=y,x.value=h,ae(),Y()}function j(c){const l=document.getElementById(`example-panel-${c.idx}`);if(!l){console.warn(`scrollToExample: no panel found for example index ${c.idx}`);return}const u=l.getBoundingClientRect().top,f=document.querySelector("header").offsetHeight,y=window.scrollY+u-f;Math.abs(y-window.scrollY)<2||window.scrollTo(0,y)}function D(c){const l=/^example-(\d+)$/.exec(c?.[0]??"");return l?{idx:parseInt(l[1],10)-1,language:c[1]||null}:null}function B(c,l){const u=[`example-${c+1}`];return l&&u.push(l),{name:"BuildingBlock",params:{id:r.bblock.itemIdentifier,section:"examples",rest:u}}}async function Y(){if(!r.active)return;const c=D(a.params.rest);if(!c||!r.bblock?.examples?.[c.idx])return;const{idx:l,language:u}=c;x.value.includes(l)||x.value.push(l),u&&p.value[l]?.some(f=>f.id===u)?m.value[l]=u:m.value[l]=O(p.value[l]??[]),await Ue(),Ce(l)}let Z=null;function Ce(c){Z?.cleanup();let l;const u=()=>{y.disconnect(),clearTimeout(l),clearTimeout(h),window.removeEventListener("wheel",u),window.removeEventListener("touchmove",u),window.removeEventListener("keydown",u),Z=null};window.addEventListener("wheel",u,{passive:!0}),window.addEventListener("touchmove",u,{passive:!0}),window.addEventListener("keydown",u);const f=Ie(()=>j({idx:c}),50),y=new ResizeObserver(()=>{f(),clearTimeout(l),l=setTimeout(u,he)});y.observe(document.body),l=setTimeout(u,he);const h=setTimeout(u,Nt);Z={cleanup:u},j({idx:c})}W(()=>a.params.rest,Y);function oe(c){const l=d.resolve(B(c,m.value[c]));return window.location.origin+l.href}function ae(){r.active&&r.bblock?.examples?.length?i.setItems(r.bblock.examples.map((c,l)=>({title:c.title,idx:l,to:B(l,null)})),j):i.clearItems()}return W(()=>r.bblock,N,{immediate:!0}),W(()=>r.active,c=>{ae(),c&&Y()}),(c,l)=>(v(),A("div",null,[e.bblock.semanticUplift?.additionalSteps?.length?(v(),E(ot,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:_(()=>[l[4]||(l[4]=L(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),_e("a",{href:"#",onClick:l[0]||(l[0]=U(u=>s("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),l[5]||(l[5]=L(" for more information. ",-1))]),_:1})):C("",!0),S(ct,{multiple:"",modelValue:x.value,"onUpdate:modelValue":l[3]||(l[3]=u=>x.value=u)},{default:_(()=>[(v(!0),A(te,null,ve(e.bblock.examples,(u,f)=>(v(),A(te,{key:f},[u.content?.length||u.snippets?.length?(v(),E(lt,{key:0,value:f,id:`example-panel-${f}`},{default:_(()=>[S(it,null,{default:_(()=>[S(at,{class:"example-copy-link",icon:"mdi-link-variant",text:oe(f),href:oe(f),title:"Copy link to this example",size:"small",variant:"text",onClick:l[1]||(l[1]=U(()=>{},["stop"]))},null,8,["text","href"]),L(" "+J(u.title)+" ",1),S(tt),c.$vuetify.display.mdAndUp?(v(),E(ie,{key:0,onClick:l[2]||(l[2]=U(()=>{},["stop"])),variant:c.$vuetify.display.lgAndUp&&p.value[f]?.length<5?"buttons":"dropdown",modelValue:m.value[f],"onUpdate:modelValue":y=>m.value[f]=y,languages:p.value[f]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):C("",!0)]),_:2},1024),S(st,null,{default:_(()=>[S(Fe(o),{bblock:e.bblock,example:u,language:p.value[f]?.find(y=>y.id===m.value[f]),"source-files-url":e.bblock.sourceFiles},ye({_:2},[c.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:_(()=>[S(ie,{modelValue:m.value[f],"onUpdate:modelValue":y=>m.value[f]=y,languages:p.value[f],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):C("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Ft=ge(Gt,[["__scopeId","data-v-b6e6765a"]]),nn=Object.freeze(Object.defineProperty({__proto__:null,default:Ft},Symbol.toStringTag,{value:"Module"}));export{nn as B,ut as M,dt as a,en as b,ft as i,tn as t,$t as u};
