const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/BuildingBlock.js","assets/VChip.js","assets/VChip.css","assets/VMenu.js","assets/VMenu.css","assets/VTabs.js","assets/VTooltip.js","assets/VTooltip.css","assets/VTabs.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.js","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as be,f as M,D as Se,c as Le,b as xe,u as Ie,d as Me}from"./index.js";import{J as we,_ as Oe,q as S,y as De,U as ve,H as Re,a4 as Ae,V as je,r as Be,o as v,n as A,c as T,w as _,av as $e,t as C,F as te,z as ye,x as U,a8 as _e,u as L,v as J,Q as He,p as ke,j as Ne,bL as Ge,as as Fe,A as W,ac as Ue,a0 as Je,E as X,ap as qe}from"./vendor.js";import{k as Q,g as Ye}from"./mime-types.js";import{P as Ze}from"./BuildingBlock.js";import{s as We,A as Xe,t as Qe,x as Ke,a as et,c as tt,d as rt}from"./VList.js";import{m as nt,q as G}from"./VCard.js";import{g as ot}from"./VSelect.js";import{V as at,a as lt}from"./VTabs.js";import{a as it,c as st,b as ct,V as dt}from"./VExpansionPanels.js";const re=200*1024,ut=10*1024*1024,ft=1024*1024;function pt(e,t=re){return typeof e=="number"&&e>t}function Ee(e){return typeof e=="string"?new Blob([e]).size:0}function tr(e,t=re){return typeof e!="string"||Ee(e)<=t?{text:e,truncated:!1}:{text:e.slice(0,t),truncated:!0}}function mt(e,t=re){return e?pt(e.sizeBytes,t)?!0:Ee(e.code)>t:!1}const Te=Symbol.for("vuetify:v-item-group"),ht=Re({...je(),...Xe({selectedClass:"v-item--selected"}),...nt(),...Ae()},"VItemGroup"),gt=we()({name:"VItemGroup",props:ht(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:r}=t;const{themeClasses:o}=Oe(e),{isSelected:n,select:s,next:i,prev:l,selected:d}=We(e,Te);return()=>S(e.tag,{class:ve(["v-item-group",o.value,e.class]),style:De(e.style)},{default:()=>[r.default?.({isSelected:n,select:s,next:i,prev:l,selected:d.value})]})}}),bt=we()({name:"VItem",props:Ke(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:r}=t;const{isSelected:o,select:n,toggle:s,selectedClass:i,value:l,disabled:d}=Qe(e,Te);return()=>r.default?.({isSelected:o.value,selectedClass:i.value,select:n,toggle:s,value:l.value,disabled:d.value})}}),xt={components:{PluginIcon:Ze},props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:e=>["buttons","dropdown"].includes(e)}},emits:["update:modelValue"]},wt={key:0,class:"language-tabs"},vt={key:0,class:"mr-2"},yt={class:"d-flex align-center"},_t={key:0,class:"mr-1"};function kt(e,t,r,o,n,s){const i=Be("PluginIcon");return r.languages?.length?(v(),A("div",wt,[r.variant==="buttons"?(v(),T(gt,{key:0,"model-value":r.modelValue,"onUpdate:modelValue":t[0]||(t[0]=l=>e.$emit("update:modelValue",l)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:_(()=>[e.$slots.preText?(v(),A("div",vt,[$e(e.$slots,"pre-text")])):C("",!0),(v(!0),A(te,null,ye(r.languages,l=>(v(),T(bt,{key:l.id,value:l.id},{default:_(({isSelected:d,toggle:p})=>[S(et,{color:d?"primary":"default",onClick:U(p,["stop"]),class:ve(["mx-1 mb-1",{"ml-4":l.isTransform}])},_e({default:_(()=>[L(" "+J(l.label),1)]),_:2},[l.isTransform||l.icon||l.hasError?{name:"prepend",fn:_(()=>[l.isTransform?(v(),T(G,{key:0,size:"small",class:"mr-n1"},{default:_(()=>[...t[2]||(t[2]=[L("mdi-arrow-right-thin",-1)])]),_:1})):C("",!0),l.hasError?(v(),T(G,{key:1,color:"error",size:"small"},{default:_(()=>[...t[3]||(t[3]=[L("mdi-alert-circle",-1)])]),_:1})):l.icon?(v(),T(i,{key:2,icon:l.icon,size:"small"},null,8,["icon"])):C("",!0)]),key:"0"}:void 0]),1032,["color","onClick","class"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):C("",!0),r.variant==="dropdown"?(v(),T(ot,{key:1,"model-value":r.modelValue,"onUpdate:modelValue":t[1]||(t[1]=l=>e.$emit("update:modelValue",l)),items:r.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language","menu-props":{maxHeight:500}},{item:_(({props:l,item:d})=>[S(tt,He(l,{class:{"pl-6":d.raw.isTransform}}),{title:_(()=>[ke("span",yt,[d.raw.isTransform?(v(),A("span",_t,"⤷")):C("",!0),d.raw.hasError?(v(),T(G,{key:1,color:"error",size:"small",class:"mr-2"},{default:_(()=>[...t[4]||(t[4]=[L("mdi-alert-circle",-1)])]),_:1})):d.raw.icon?(v(),T(i,{key:2,icon:d.raw.icon,size:"small",class:"mr-2"},null,8,["icon"])):C("",!0),L(" "+J(d.raw.label),1)])]),_:2},1040,["class"])]),selection:_(({item:l})=>[l.raw.hasError?(v(),T(G,{key:0,color:"error",size:"small",class:"mr-2"},{default:_(()=>[...t[5]||(t[5]=[L("mdi-alert-circle",-1)])]),_:1})):l.raw.icon?(v(),T(i,{key:1,icon:l.raw.icon,size:"small",class:"mr-2"},null,8,["icon"])):C("",!0),L(" "+J(l.raw.isTransform?l.raw.selectionLabel:l.raw.label),1)]),_:1},8,["model-value","items"])):C("",!0)])):C("",!0)}const se=be(xt,[["render",kt]]);function Et(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[r,o]=e.split("/"),[n,s]=t.split("/");return r===n&&(o==="*"||o===s)}function ne(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[r,o]=e.split("/"),[n,s]=t.split("/");return r===n&&(o==="*"||o===s)}function ze(e,t){e.innerHTML="";const r=document.createElement("div");r.style.cssText="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 16px; text-align: center; color: #b00020; font: 14px/1.4 sans-serif;";const o=document.createElement("div");o.textContent=t;const n=document.createElement("div");n.style.cssText="margin-top: 12px;",n.textContent="See the browser console for details.",r.append(o,n),e.appendChild(r)}const Tt=`/* required styles */\r
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
`,ce=["application/geo+json","application/json","application/ld+json"],zt=`
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
`;let K=null,de=!1;function Ct(e){if(de)return;const t=document.createElement("style");t.textContent=e,document.head.appendChild(t),de=!0}function Vt(){return K||(Ct(Tt+zt),K=Promise.all([M(()=>import("./leaflet-src.js").then(e=>e.l),__vite__mapDeps([0,1])),M(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),M(()=>import("./marker-icon.js"),[]),M(()=>import("./marker-icon-2x.js"),[]),M(()=>import("./marker-shadow.js"),[])]).then(([{default:e},{createJsonLDGeoJSONLayer:t},r,o,n])=>(delete e.Icon.Default.prototype._getIconUrl,e.Icon.Default.mergeOptions({iconUrl:r.default,iconRetinaUrl:o.default,shadowUrl:n.default}),{L:e,createJsonLDGeoJSONLayer:t}))),K}function Pt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry:e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry!=null):!1}class St{static supportedTypes=ce;static viewName="Map view";static icon="mdi-map";constructor(t,r={}){this.candidates=t,this.bblock=r.bblock??null,this.viewerConfig=r.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const t=this.candidates.find(r=>{if(!r.type||!r.content||!ce.some(o=>ne(o,r.type)))return!1;try{return Pt(JSON.parse(r.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,this._mount(t).catch(r=>{console.error("GeoJsonMapPlugin: init failed",r),this._el===t&&(this.destroy(t),ze(t,`Failed to render this map view (${r.message}).`))})}async _mount(t){const r=this._pickCandidate();if(!r)return;const o=JSON.parse(r.content),{L:n,createJsonLDGeoJSONLayer:s}=await Vt();if(this._el!==t)return;const i=n.map(t,{attributionControl:!1,maxZoom:22});n.control.attribution().addTo(i).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),n.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(i),this._map=i;const d=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:p,bblocksFallbackSparqlEndpoints:m}=this.viewerConfig,x={};p&&(x.fallbackRainbowInstances=p),m&&(x.fallbackSparqlEndpoints=m);try{const V=(await s(n,o,{ldContext:d,augmentOptions:x,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(i);this._layer=V;const O=V.getBounds();O.isValid()?i.fitBounds(O,{padding:[20,20]}):i.setView([0,0],2)}catch(V){console.warn("GeoJsonMapPlugin: error building layer",V),i.setView([0,0],2)}}destroy(t){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===t&&(this._el=null)}}function Ce(e){return!Array.isArray(e)||!e.length?!1:typeof e[0]=="number"?e.length>=3:e.some(Ce)}function F(e){return!e?.type||!e.coordinates?!1:Ce(e.coordinates)}function Lt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry&&F(e.geometry):e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry&&F(t.geometry)):e.type==="GeometryCollection"?Array.isArray(e.geometries)&&e.geometries.some(F):e.coordinates?F(e):!1}const ue=["application/geo+json","application/json","application/ld+json"],q="0.184.0",fe=()=>M(()=>import(`https://esm.sh/three@${q}`),[]),It=()=>M(()=>import(`https://esm.sh/three@${q}/examples/jsm/controls/OrbitControls.js`),[]);function Mt(e){return e?.depResolver?e.depResolver.resolve({name:"three",range:`^${q}`,version:q,load:fe}):fe()}const pe="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function me(e){return e?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Ot={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class Dt{static supportedTypes=ue;static viewName="3D view";static icon="mdi-cube-outline";constructor(t,r={}){this.candidates=t,this._context=r,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!0}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(r=>{if(!r.type||!r.content||!ue.some(o=>ne(o,r.type)))return!1;try{return Lt(JSON.parse(r.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,t.style.position="relative",this._mount(t).catch(r=>{console.error("ThreeDPlugin: init failed",r),this._el===t&&this._showError(t,`Failed to render this 3D view (${r.message}).`)})}_showError(t,r){this.destroy(t),ze(t,r)}async _mount(t){const r=this._pickCandidate();if(!r)return;const o=JSON.parse(r.content),[n,{OrbitControls:s}]=await Promise.all([Mt(this._context),It()]);if(this._el!==t)return;this._THREE=n;const i=document.createElement("div");i.style.cssText="height: 100%; width: 100%;",t.appendChild(i);const l=i.clientWidth||600,d=i.clientHeight||400,p=new n.Scene;p.background=new n.Color(11383217);const m=new n.PerspectiveCamera(60,l/d,.001,1e4);m.up.set(0,0,1),this._camera=m;const x=new n.WebGLRenderer({antialias:!0});x.setPixelRatio(window.devicePixelRatio),x.setSize(l,d),i.appendChild(x.domElement),this._renderer=x;const V=new s(m,x.domElement);V.enableDamping=!0,V.dampingFactor=.05,this._controls=V,p.add(new n.AmbientLight(16777215,.5));const O=new n.DirectionalLight(16777215,.8);O.position.set(100,100,100),p.add(O);const H=new n.DirectionalLight(16777215,.3);H.position.set(-100,-100,-100),p.add(H);const N=new n.DirectionalLight(16777215,.3);if(N.position.set(0,-100,0),p.add(N),this._gridHelper=new n.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,p.add(this._gridHelper),p.add(new n.AxesHelper(1)),await this._buildGeoJsonScene(p,o),this._el!==t)return;this._fitCamera(n),this._buildControls(t),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!i.isConnected)return;const D=i.clientWidth,B=i.clientHeight;!D||!B||(m.aspect=D/B,m.updateProjectionMatrix(),x.setSize(D,B))}),this._resizeObserver.observe(i),this._animating=!0;const j=()=>{if(this._animating){this._animFrameId=requestAnimationFrame(j);try{V.update(),x.render(p,m)}catch(D){console.error("ThreeDPlugin: render loop failed",D),this._showError(t,`An error occurred while rendering this 3D view (${D.message}).`)}}};j()}async _buildGeoJsonScene(t,r){const{buildGeoJson3DObjects:o}=await M(async()=>{const{buildGeoJson3DObjects:s}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:s}},[]),n=o(r,this._THREE);n.meshes.forEach(s=>{s.material.wireframe=this._wireframe,this._solidMeshes.push(s)}),n.lines.forEach(s=>{s.visible=this._showEdges,this._solidEdges.push(s)}),n.points.forEach(s=>{s.visible=this._showVertices,this._solidVertices.push(s)}),n.objects.forEach(s=>t.add(s))}_fitCamera(t){const r=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!r.length)return;const o=new t.Box3;if(r.forEach(d=>o.expandByObject(d)),o.isEmpty())return;const n=o.getCenter(new t.Vector3),s=o.getSize(new t.Vector3),l=Math.max(s.x,s.y,s.z)*2;this._camera.position.set(n.x-l*.7,n.y-l*.7,n.z+l*.7),this._camera.near=l*.001,this._camera.far=l*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(n),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(t){const r=document.createElement("div");r.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const o=(n,s,i,l)=>{const d=document.createElement("button");return d.type="button",d.title=s,d.innerHTML=Ot[n],d.style.cssText=pe+me(l?.()),d.addEventListener("click",()=>{i(),d.style.cssText=pe+me(l?.())}),r.appendChild(d),d};o("reset","Reset camera",()=>this._resetCamera()),o("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),o("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(n=>{n.material.wireframe=this._wireframe})},()=>this._wireframe),o("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(n=>{n.visible=this._showEdges})},()=>this._showEdges),o("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(n=>{n.visible=this._showVertices})},()=>this._showVertices),t.appendChild(r),this._controlsEl=r}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(t){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(r=>{r.geometry?.dispose(),r.material?.dispose()}),this._solidEdges.forEach(r=>{r.geometry?.dispose(),r.material?.dispose()}),this._solidVertices.forEach(r=>{r.children?.forEach(o=>{o.geometry?.dispose(),o.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===t&&(this._el=null),t.innerHTML=""}}const he=["text/html","application/xhtml+xml"],Rt=/^https?:\/\//;class At{static supportedTypes=he;static viewName="Web view";static icon="mdi-web";constructor(t){this.candidates=t,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(r=>r.type&&r.url&&he.some(o=>ne(o,r.type))&&Rt.test(r.url));return this._candidate=t??null,this._candidate}render(t){this._el=t;const r=this._pickCandidate();if(!r)return;t.style.overflow="auto";const o=document.createElement("iframe");o.src=r.url,o.setAttribute("sandbox","allow-same-origin"),o.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const n=o.contentDocument,s=n?.documentElement?.scrollHeight||n?.body?.scrollHeight;s&&(o.style.height=`${s}px`)}catch{}},o.addEventListener("load",this._onLoad),t.appendChild(o),this._iframe=o}destroy(t){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===t&&(this._el=null),t.innerHTML=""}}const jt=[St,Dt,At].map(e=>({PluginClass:e,weight:1/0}));let ee=null;const Bt=new Se;function $t(){return ee||(ee=xe.registerPromises.local.promise.then(async e=>{const t=e?.viewer?.viewPlugins??[],r=await Promise.all(t.map(async o=>{try{const n=await import(o.url);return(Array.isArray(o.export)&&o.export.length?o.export:[o.export||null]).map(i=>{const l=i?n[i]:n.default;return l?{PluginClass:l,weight:o.weight??0}:(console.warn(`View plugin has no export named "${i??"default"}": ${o.url}`),null)})}catch(n){return console.warn(`View plugin failed to load: ${o.url}`,n),[]}}));return[...jt,...r.flat().filter(Boolean)]})),ee}function Ht(){async function e(t,r={}){if(!t?.length)return[];const o={...r,viewerConfig:Le.config,depResolver:Bt},n=await $t(),s=[];for(const{PluginClass:i,weight:l}of n){const d=i.supportedTypes??[];if(!t.some(m=>m.type&&d.some(x=>Et(x,m.type))))continue;if(typeof i.viewName!="string"||!i.viewName.trim()){console.warn(`View plugin has no static viewName, skipping: ${i.name}`);continue}let p;try{if(p=Ne(new i(t,o)),!(p.matches?.()??!0))continue}catch(m){console.warn(`View plugin threw while matching: ${i.name}`,m);continue}s.push({instance:p,weight:l,PluginClass:i})}return s}return{matchPlugins:e}}function Nt(e,t=null){return{type:e.language?.mimeType??e.language?.id??null,content:e.code??t?.contents??null,url:e.url??null,label:e.language?.label??e.language?.id??"unknown"}}function rr(e,t,r=null){return{type:e.outputs?.mediaTypes?.[0]?.mimeType??null,content:r?.contents??null,url:t?.url??null,label:e.id}}const ge=1500,Gt=15e3,Ft={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(e,{emit:t}){const{matchPlugins:r}=Ht(),o=qe(()=>M(()=>import("./ExampleViewer.js"),__vite__mapDeps([7,1,8,3,4,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]))),n=e,s=t,i=Ie(),l=Ge(),d=Fe(),p=X([]),m=X([]),x=X([]);function V(c){return c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function O(c){return c[0]?.id}function H(c){const a=c.filter(h=>!h.isTransform),u=c.filter(h=>h.isTransform);a.sort((h,w)=>h.order===w.order?h.label.localeCompare(w.label):h.order-w.order);const f=new Map;u.forEach(h=>{const w=h.transformEntry.snippet.language?.id;f.has(w)||f.set(w,[]),f.get(w).push(h)}),f.forEach(h=>h.sort((w,g)=>w.label.localeCompare(g.label)));const y=[];return a.forEach(h=>{y.push(h);const w=f.get(h.id);w&&(y.push(...w),f.delete(h.id))}),f.forEach(h=>y.push(...h)),y}async function N(){const c=n.bblock;if(!n.bblock?.examples?.length){p.value=[],m.value=[],x.value=[];return}const a=[],u=[],f=[];if(n.bblock.examples.forEach(w=>{w.snippets?.forEach(g=>{let k;typeof g.language=="object"?k=g.language:(g.language||(g.language="plaintext"),k=Q[g.language],typeof k=="string"&&(k=Q[k]),k||(k={id:g.language,order:999,label:g.language}),g.language=k),(Ye.has(k.id)||k.mimeType||!Q[k.id])&&g.code==null&&g.url&&!mt(g,ft)&&f.push(xe.fetchDocumentByUrl(n.bblock,g.url,{maxSize:ut}).then(E=>{g.code=E}).catch(()=>{}))})}),await Promise.all(f),n.bblock!==c||(n.bblock.examples.forEach((w,g)=>{const k=w.snippets?.map(E=>E.error?{...E.language,hasError:!0}:E.language)??[];if(n.bblock.transforms?.length){const E=[];n.bblock.transforms.forEach(b=>{w.snippets?.forEach((I,P)=>{const z=I.transformResults?.[b.id];if(z!=null){const R=typeof z=="string";E.push({transform:b,snippet:I,snippetIdx:P,url:R?z:z.url||null,success:R?!0:z.success??!0,stderr:R?null:z.stderr||null,profilesValidation:R?null:z.profilesValidation||null})}})});const $={};E.forEach(b=>{$[b.transform.id]=($[b.transform.id]||0)+1}),E.sort((b,I)=>{const P=b.transform.id.localeCompare(I.transform.id);return P!==0?P:b.snippetIdx-I.snippetIdx}),E.forEach(b=>{const I=$[b.transform.id]>1;k.push({id:I?`transform:${b.snippetIdx}-${b.transform.id}`:`transform:${b.transform.id}`,label:b.transform.id,selectionLabel:`${b.transform.id} (${b.snippet.language?.label||b.snippetIdx+1})`,icon:"mdi-file-swap",hasError:!b.success,isTransform:!0,transform:b.transform,transformEntry:b})})}const ie=(w.snippets??[]).map(E=>Nt(E));u.push(r(ie,{bblock:n.bblock}).then(E=>{const $=new Map;E.forEach(({instance:b,weight:I,PluginClass:P})=>{const z=V(P.viewName??P.name??"")||"plugin",R=$.get(z)??0;$.set(z,R+1);const Pe=R===0?z:`${z}-${R+1}`;k.push({id:`plugin:${Pe}`,order:-.5-(I??0)/1e6,label:P.viewName??P.name??"Custom view",icon:P.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:b})})})),a[g]=k}),await Promise.all(u),n.bblock!==c))return;const y=[],h=[];a.forEach((w,g)=>{a[g]=H(w),h.push(g),y[g]=O(a[g])}),p.value=a,m.value=y,x.value=h,le(),Y()}function j(c){const a=document.getElementById(`example-panel-${c.idx}`);if(!a){console.warn(`scrollToExample: no panel found for example index ${c.idx}`);return}const u=a.getBoundingClientRect().top,f=document.querySelector("header").offsetHeight,y=window.scrollY+u-f;Math.abs(y-window.scrollY)<2||window.scrollTo(0,y)}function D(c){const a=/^example-(\d+)$/.exec(c?.[0]??"");return a?{idx:parseInt(a[1],10)-1,language:c[1]||null}:null}function B(c,a){const u=[`example-${c+1}`];return a&&u.push(a),{name:"BuildingBlock",params:{id:n.bblock.itemIdentifier,section:"examples",rest:u}}}async function Y(){if(!n.active)return;const c=D(l.params.rest);if(!c||!n.bblock?.examples?.[c.idx])return;const{idx:a,language:u}=c;x.value.includes(a)||x.value.push(a),u&&p.value[a]?.some(f=>f.id===u)?m.value[a]=u:m.value[a]=O(p.value[a]??[]),await Je(),Ve(a)}let Z=null;function Ve(c){Z?.cleanup();let a;const u=()=>{y.disconnect(),clearTimeout(a),clearTimeout(h),window.removeEventListener("wheel",u),window.removeEventListener("touchmove",u),window.removeEventListener("keydown",u),Z=null};window.addEventListener("wheel",u,{passive:!0}),window.addEventListener("touchmove",u,{passive:!0}),window.addEventListener("keydown",u);const f=Me(()=>j({idx:c}),50),y=new ResizeObserver(()=>{f(),clearTimeout(a),a=setTimeout(u,ge)});y.observe(document.body),a=setTimeout(u,ge);const h=setTimeout(u,Gt);Z={cleanup:u},j({idx:c})}W(()=>l.params.rest,Y);function oe(c){const a=d.resolve(B(c,m.value[c]));return window.location.origin+a.href}function ae(c){return!!(c.content?.length||c.snippets?.length)}function le(){n.active&&n.bblock?.examples?.some(ae)?i.setItems(n.bblock.examples.map((c,a)=>({title:c.title,idx:a,to:B(a,null)})).filter((c,a)=>ae(n.bblock.examples[a])),j):i.clearItems()}return W(()=>n.bblock,N,{immediate:!0}),W(()=>n.active,c=>{le(),c&&Y()}),(c,a)=>(v(),A("div",null,[e.bblock.semanticUplift?.additionalSteps?.length?(v(),T(at,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:_(()=>[a[4]||(a[4]=L(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),ke("a",{href:"#",onClick:a[0]||(a[0]=U(u=>s("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),a[5]||(a[5]=L(" for more information. ",-1))]),_:1})):C("",!0),S(dt,{multiple:"",modelValue:x.value,"onUpdate:modelValue":a[3]||(a[3]=u=>x.value=u)},{default:_(()=>[(v(!0),A(te,null,ye(e.bblock.examples,(u,f)=>(v(),A(te,{key:f},[u.content?.length||u.snippets?.length?(v(),T(it,{key:0,value:f,id:`example-panel-${f}`},{default:_(()=>[S(st,null,{default:_(()=>[S(lt,{class:"example-copy-link",icon:"mdi-link-variant",text:oe(f),href:oe(f),title:"Copy link to this example",size:"small",variant:"text",onClick:a[1]||(a[1]=U(()=>{},["stop"]))},null,8,["text","href"]),L(" "+J(u.title)+" ",1),S(rt),c.$vuetify.display.mdAndUp?(v(),T(se,{key:0,onClick:a[2]||(a[2]=U(()=>{},["stop"])),variant:c.$vuetify.display.lgAndUp&&p.value[f]?.length<5?"buttons":"dropdown",modelValue:m.value[f],"onUpdate:modelValue":y=>m.value[f]=y,languages:p.value[f]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):C("",!0)]),_:2},1024),S(ct,null,{default:_(()=>[S(Ue(o),{bblock:e.bblock,example:u,language:p.value[f]?.find(y=>y.id===m.value[f]),"source-files-url":e.bblock.sourceFiles},_e({_:2},[c.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:_(()=>[S(se,{modelValue:m.value[f],"onUpdate:modelValue":y=>m.value[f]=y,languages:p.value[f],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):C("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Ut=be(Ft,[["__scopeId","data-v-40abca36"]]),nr=Object.freeze(Object.defineProperty({__proto__:null,default:Ut},Symbol.toStringTag,{value:"Module"}));export{nr as B,ft as M,ut as a,tr as b,pt as i,rr as t,Ht as u};
