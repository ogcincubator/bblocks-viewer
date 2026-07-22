const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src.js","assets/vendor.js","assets/leaflet.esm.js","assets/index.js","assets/index.css","assets/index4.js","assets/N3Store.js","assets/three.module.js","assets/three.core.js","assets/OrbitControls.js","assets/topo-geometry.js","assets/earcut.js","assets/geojson-3d.js","assets/ExampleViewer.js","assets/CodeViewer.js","assets/mime-types.js","assets/VList.js","assets/VCard.js","assets/VCard.css","assets/VList.css","assets/CodeViewer.css","assets/CopyToClipboardButton.js","assets/VChip.js","assets/VChip.css","assets/CopyToClipboardButton.css","assets/TransformInfo.js","assets/BuildingBlock.js","assets/VMenu.js","assets/dialog-transition.js","assets/VMenu.css","assets/VDialog.js","assets/VDialog.css","assets/VRow.js","assets/VRow.css","assets/BuildingBlock.css","assets/TransformInfo.css","assets/VToolbar.js","assets/VToolbar.css","assets/VContainer.js","assets/VContainer.css","assets/VSelect.js","assets/VTextField.js","assets/VTextField.css","assets/VSelect.css","assets/VExpansionPanels.js","assets/VExpansionPanels.css","assets/ExampleViewer.css"])))=>i.map(i=>d[i]);
import{_ as me,a as I,c as Ee,b as he,u as Te,e as ze,d as Ce}from"./index.js";import{H as ge,Y as Ve,n as L,v as Pe,S as Se,E as Le,a2 as Me,T as Ie,o as _,k as $,c as V,w as b,aE as Ae,p as M,F as te,x as be,u as Z,aa as xe,q as T,t as F,aj as Oe,ak as De,l as re,bJ as Re,bI as je,ao as Be,y as W,a9 as Fe,_ as Ge,C as X,aA as He}from"./vendor.js";import{k as K,g as $e}from"./mime-types.js";import{r as Ne,z as Ue,s as Je,w as qe,a as Ye,c as Ze,d as We}from"./VList.js";import{m as Xe,q as G}from"./VCard.js";import{g as Ke}from"./VSelect.js";import{V as Qe}from"./BuildingBlock.js";import{a as et,c as tt,b as rt,V as nt}from"./VExpansionPanels.js";const ne=200*1024,ot=10*1024*1024,at=1024*1024;function lt(e,t=ne){return typeof e=="number"&&e>t}function ye(e){return typeof e=="string"?new Blob([e]).size:0}function Ut(e,t=ne){return typeof e!="string"||ye(e)<=t?{text:e,truncated:!1}:{text:e.slice(0,t),truncated:!0}}function it(e,t=ne){return e?lt(e.sizeBytes,t)?!0:ye(e.code)>t:!1}const _e=Symbol.for("vuetify:v-item-group"),st=Le({...Ie(),...Ue({selectedClass:"v-item--selected"}),...Xe(),...Me()},"VItemGroup"),ct=ge()({name:"VItemGroup",props:st(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:o}=Ve(e),{isSelected:r,select:i,next:a,prev:s,selected:f}=Ne(e,_e);return()=>L(e.tag,{class:Se(["v-item-group",o.value,e.class]),style:Pe(e.style)},{default:()=>[n.default?.({isSelected:r,select:i,next:a,prev:s,selected:f.value})]})}}),dt=ge()({name:"VItem",props:qe(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:n}=t;const{isSelected:o,select:r,toggle:i,selectedClass:a,value:s,disabled:f}=Je(e,_e);return()=>n.default?.({isSelected:o.value,selectedClass:a.value,select:r,toggle:i,value:s.value,disabled:f.value})}}),ut={props:{modelValue:{},languages:{type:Array},variant:{type:String,default:"buttons",validator:e=>["buttons","dropdown"].includes(e)}},emits:["update:modelValue"]},pt={key:0,class:"language-tabs"},ft={key:0,class:"mr-2"},mt={class:"d-flex align-center"};function ht(e,t,n,o,r,i){return n.languages?.length?(_(),$("div",pt,[n.variant==="buttons"?(_(),V(ct,{key:0,"model-value":n.modelValue,"onUpdate:modelValue":t[0]||(t[0]=a=>e.$emit("update:modelValue",a)),mandatory:"",class:"d-flex justify-center align-center language-tabs flex-md-row flex-wrap"},{default:b(()=>[e.$slots.preText?(_(),$("div",ft,[Ae(e.$slots,"pre-text")])):M("",!0),(_(!0),$(te,null,be(n.languages,a=>(_(),V(dt,{key:a.id,value:a.id},{default:b(({isSelected:s,toggle:f})=>[L(Ye,{color:s?"primary":"default",onClick:Z(f,["stop"]),class:"mx-1 mb-1"},xe({default:b(()=>[T(" "+F(a.label),1)]),_:2},[a.icon||a.hasError?{name:"prepend",fn:b(()=>[a.hasError?(_(),V(G,{key:0,color:"error",size:"small"},{default:b(()=>[...t[2]||(t[2]=[T("mdi-alert-circle",-1)])]),_:1})):a.icon?(_(),V(G,{key:1,size:"small"},{default:b(()=>[T(F(a.icon),1)]),_:2},1024)):M("",!0)]),key:"0"}:void 0]),1032,["color","onClick"])]),_:2},1032,["value"]))),128))]),_:3},8,["model-value"])):M("",!0),n.variant==="dropdown"?(_(),V(Ke,{key:1,"model-value":n.modelValue,"onUpdate:modelValue":t[1]||(t[1]=a=>e.$emit("update:modelValue",a)),items:n.languages,"item-value":"id","item-title":"label",density:"compact","hide-details":"",label:"Language"},{item:b(({props:a,item:s})=>[L(Ze,Oe(De(a)),{title:b(()=>[re("span",mt,[s.raw.hasError?(_(),V(G,{key:0,color:"error",size:"small",class:"mr-2"},{default:b(()=>[...t[3]||(t[3]=[T("mdi-alert-circle",-1)])]),_:1})):s.raw.icon?(_(),V(G,{key:1,size:"small",class:"mr-2"},{default:b(()=>[T(F(s.raw.icon),1)]),_:2},1024)):M("",!0),T(" "+F(s.raw.label),1)])]),_:2},1040)]),selection:b(({item:a})=>[a.raw.hasError?(_(),V(G,{key:0,color:"error",size:"small",class:"mr-2"},{default:b(()=>[...t[4]||(t[4]=[T("mdi-alert-circle",-1)])]),_:1})):a.raw.icon?(_(),V(G,{key:1,size:"small",class:"mr-2"},{default:b(()=>[T(F(a.raw.icon),1)]),_:2},1024)):M("",!0),T(" "+F(a.raw.label),1)]),_:1},8,["model-value","items"])):M("",!0)])):M("",!0)}const le=me(ut,[["render",ht]]);function gt(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[n,o]=e.split("/"),[r,i]=t.split("/");return n===r&&(o==="*"||o===i)}function oe(e,t){if(!e||!t)return!1;if(e==="*/*"||e===t)return!0;const[n,o]=e.split("/"),[r,i]=t.split("/");return n===r&&(o==="*"||o===i)}const bt=`/* required styles */\r
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
`,ie=["application/geo+json","application/json","application/ld+json"],xt=`
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
`;let Q=null,se=!1;function yt(e){if(se)return;const t=document.createElement("style");t.textContent=e,document.head.appendChild(t),se=!0}function _t(){return Q||(yt(bt+xt),Q=Promise.all([I(()=>import("./leaflet-src.js").then(e=>e.l),__vite__mapDeps([0,1])),I(()=>import("./leaflet.esm.js"),__vite__mapDeps([2,3,1,4,5,6])),I(()=>import("./marker-icon.js"),[]),I(()=>import("./marker-icon-2x.js"),[]),I(()=>import("./marker-shadow.js"),[])]).then(([{default:e},{createJsonLDGeoJSONLayer:t},n,o,r])=>(delete e.Icon.Default.prototype._getIconUrl,e.Icon.Default.mergeOptions({iconUrl:n.default,iconRetinaUrl:o.default,shadowUrl:r.default}),{L:e,createJsonLDGeoJSONLayer:t}))),Q}function wt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry:e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry!=null):!1}class vt{static supportedTypes=ie;static viewName="Map view";static icon="mdi-map";constructor(t,n={}){this.candidates=t,this.bblock=n.bblock??null,this.viewerConfig=n.viewerConfig??{},this._map=null,this._layer=null,this._el=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate)return this._candidate;const t=this.candidates.find(n=>{if(!n.type||!n.content||!ie.some(o=>oe(o,n.type)))return!1;try{return wt(JSON.parse(n.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,this._mount(t)}async _mount(t){const n=this._pickCandidate();if(!n)return;const o=JSON.parse(n.content),{L:r,createJsonLDGeoJSONLayer:i}=await _t();if(this._el!==t)return;const a=r.map(t,{attributionControl:!1,maxZoom:22});r.control.attribution().addTo(a).setPrefix('<a href="https://leafletjs.com/">Leaflet</a> | Semantic map rendering by <a href="https://ogcincubator.github.io/jsonld-ui-utils/#leaflet-plugin">OGC Leaflet-LD</a>'),r.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:22,maxNativeZoom:19}).addTo(a),this._map=a;const f=this.bblock?.ldContext||void 0,{bblocksFallbackRainbowInstances:p,bblocksFallbackSparqlEndpoints:m}=this.viewerConfig,d={};p&&(d.fallbackRainbowInstances=p),m&&(d.fallbackSparqlEndpoints=m);try{const v=(await i(r,o,{ldContext:f,augmentOptions:d,popupOptions:{maxWidth:400,maxHeight:300}})).addTo(a);this._layer=v;const A=v.getBounds();A.isValid()?a.fitBounds(A,{padding:[20,20]}):a.setView([0,0],2)}catch(v){console.warn("GeoJsonMapPlugin: error building layer",v),a.setView([0,0],2)}}destroy(t){this._map&&(this._map.remove(),this._map=null,this._layer=null),this._el===t&&(this._el=null)}}function we(e){return!e||typeof e!="object"||Array.isArray(e)?!1:["points","edges","rings","faces","shells","solids"].some(n=>Array.isArray(e[n])&&e[n].some(o=>Array.isArray(o?.features)))}function ve(e){return!Array.isArray(e)||!e.length?!1:typeof e[0]=="number"?e.length>=3:e.some(ve)}function Y(e){return!e?.type||!e.coordinates?!1:ve(e.coordinates)}function kt(e){return!e||typeof e!="object"?!1:e.type==="Feature"?!!e.geometry&&Y(e.geometry):e.type==="FeatureCollection"?Array.isArray(e.features)&&e.features.some(t=>t?.geometry&&Y(t.geometry)):e.type==="GeometryCollection"?Array.isArray(e.geometries)&&e.geometries.some(Y):e.coordinates?Y(e):!1}function Et(e){return we(e)||kt(e)}const ce=["application/geo+json","application/json","application/ld+json"],de="width: 26px; height: 26px; border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.4);";function ue(e){return e?"background: #1976d2; color: #fff;":"background: #fff; color: #333;"}const Tt={reset:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>',grid:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',wireframe:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',edges:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="19" r="2" fill="currentColor" stroke="none"/><circle cx="19" cy="5" r="2" fill="currentColor" stroke="none"/><line x1="6.5" y1="17.5" x2="17.5" y2="6.5"/></svg>',vertices:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" stroke="none"><circle cx="5" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="19" cy="5" r="1.6"/><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/><circle cx="5" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><circle cx="19" cy="19" r="1.6"/></svg>'};class zt{static supportedTypes=ce;static viewName="3D view";static icon="mdi-cube-outline";constructor(t){this.candidates=t,this._candidate=void 0,this._el=null,this._THREE=null,this._renderer=null,this._camera=null,this._controls=null,this._gridHelper=null,this._resizeObserver=null,this._animating=!1,this._animFrameId=null,this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._initialCameraPosition=null,this._initialCameraTarget=null,this._isTopoFormat=!1,this._wireframe=!1,this._showGrid=!1,this._showEdges=!0,this._showVertices=!1}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(n=>{if(!n.type||!n.content||!ce.some(o=>oe(o,n.type)))return!1;try{return Et(JSON.parse(n.content))}catch{return!1}});return this._candidate=t??null,this._candidate}render(t){this._el=t,t.style.position="relative",this._mount(t).catch(n=>console.error("ThreeDPlugin: init failed",n))}async _mount(t){const n=this._pickCandidate();if(!n)return;const o=JSON.parse(n.content),[r,{OrbitControls:i}]=await Promise.all([I(()=>import("./three.module.js"),__vite__mapDeps([7,8])),I(()=>import("./OrbitControls.js"),__vite__mapDeps([9,7,8]))]);if(this._el!==t)return;this._THREE=r;const a=document.createElement("div");a.style.cssText="height: 100%; width: 100%;",t.appendChild(a),this._isTopoFormat=we(o);const s=a.clientWidth||600,f=a.clientHeight||400,p=new r.Scene;p.background=new r.Color(11383217);const m=new r.PerspectiveCamera(60,s/f,.001,1e4);m.up.set(0,0,1),this._camera=m;const d=new r.WebGLRenderer({antialias:!0});d.setPixelRatio(window.devicePixelRatio),d.setSize(s,f),a.appendChild(d.domElement),this._renderer=d;const v=new i(m,d.domElement);v.enableDamping=!0,v.dampingFactor=.05,this._controls=v,p.add(new r.AmbientLight(16777215,.5));const A=new r.DirectionalLight(16777215,.8);A.position.set(100,100,100),p.add(A);const z=new r.DirectionalLight(16777215,.3);z.position.set(-100,-100,-100),p.add(z);const O=new r.DirectionalLight(16777215,.3);if(O.position.set(0,-100,0),p.add(O),this._gridHelper=new r.GridHelper(100,20,4473924,2236962),this._gridHelper.rotation.x=Math.PI/2,this._gridHelper.visible=this._showGrid,p.add(this._gridHelper),p.add(new r.AxesHelper(1)),this._isTopoFormat?await this._buildTopoScene(p,r,o):await this._buildGeoJsonScene(p,o),this._el!==t)return;this._fitCamera(r),this._buildControls(t),this._resizeObserver=new ResizeObserver(()=>{if(!this._renderer||!a.isConnected)return;const k=a.clientWidth,E=a.clientHeight;!k||!E||(m.aspect=k/E,m.updateProjectionMatrix(),d.setSize(k,E))}),this._resizeObserver.observe(a),this._animating=!0;const S=()=>{this._animating&&(this._animFrameId=requestAnimationFrame(S),v.update(),d.render(p,m))};S()}async _buildTopoScene(t,n,o){const{buildMaps:r,buildSolidGeometry:i,buildSolidEdgeLines:a,createSolidMesh:s,createVertexMarkers:f,getFeatures:p,needsTransparency:m}=await I(async()=>{const{buildMaps:z,buildSolidGeometry:O,buildSolidEdgeLines:S,createSolidMesh:k,createVertexMarkers:E,getFeatures:j,needsTransparency:U}=await import("./topo-geometry.js");return{buildMaps:z,buildSolidGeometry:O,buildSolidEdgeLines:S,createSolidMesh:k,createVertexMarkers:E,getFeatures:j,needsTransparency:U}},__vite__mapDeps([10,11,8])),d=r(o),v=p(o.solids||[]),A=m(o)?.85:1;v.forEach((z,O)=>{const{geometry:S}=i(z,d.shellMap,d.faceMap,d.ringMap,d.edgeMap,d.pointMap),k=s(z,O,S,A),E=a(z,d.shellMap,d.faceMap,d.ringMap,d.edgeMap,d.pointMap),j=f(S);k.material.wireframe=this._wireframe,E.visible=this._showEdges,j.visible=this._showVertices,t.add(k,E,j),this._solidMeshes.push(k),this._solidEdges.push(E),this._solidVertices.push(j)})}async _buildGeoJsonScene(t,n){const{buildGeoJson3DObjects:o}=await I(async()=>{const{buildGeoJson3DObjects:i}=await import("./geojson-3d.js");return{buildGeoJson3DObjects:i}},__vite__mapDeps([12,11,8])),r=o(n);r.meshes.forEach(i=>{i.material.wireframe=this._wireframe,this._solidMeshes.push(i)}),r.lines.forEach(i=>this._solidEdges.push(i)),r.points.forEach(i=>this._solidVertices.push(i)),r.objects.forEach(i=>t.add(i))}_fitCamera(t){const n=[...this._solidMeshes,...this._solidEdges,...this._solidVertices];if(!n.length)return;const o=new t.Box3;if(n.forEach(f=>o.expandByObject(f)),o.isEmpty())return;const r=o.getCenter(new t.Vector3),i=o.getSize(new t.Vector3),s=Math.max(i.x,i.y,i.z)*2;this._camera.position.set(r.x-s*.7,r.y-s*.7,r.z+s*.7),this._camera.near=s*.001,this._camera.far=s*100,this._camera.updateProjectionMatrix(),this._controls.target.copy(r),this._controls.update(),this._initialCameraPosition=this._camera.position.clone(),this._initialCameraTarget=this._controls.target.clone()}_buildControls(t){const n=document.createElement("div");n.style.cssText="position: absolute; bottom: 8px; left: 8px; display: flex; flex-direction: column; gap: 4px; z-index: 10;";const o=(r,i,a,s)=>{const f=document.createElement("button");return f.type="button",f.title=i,f.innerHTML=Tt[r],f.style.cssText=de+ue(s?.()),f.addEventListener("click",()=>{a(),f.style.cssText=de+ue(s?.())}),n.appendChild(f),f};o("reset","Reset camera",()=>this._resetCamera()),o("grid","Toggle grid",()=>{this._showGrid=!this._showGrid,this._gridHelper.visible=this._showGrid},()=>this._showGrid),o("wireframe","Toggle wireframe",()=>{this._wireframe=!this._wireframe,this._solidMeshes.forEach(r=>{r.material.wireframe=this._wireframe})},()=>this._wireframe),this._isTopoFormat&&(o("edges","Toggle edges",()=>{this._showEdges=!this._showEdges,this._solidEdges.forEach(r=>{r.visible=this._showEdges})},()=>this._showEdges),o("vertices","Toggle vertices",()=>{this._showVertices=!this._showVertices,this._solidVertices.forEach(r=>{r.visible=this._showVertices})},()=>this._showVertices)),t.appendChild(n),this._controlsEl=n}_resetCamera(){!this._initialCameraPosition||!this._camera||!this._controls||(this._camera.position.copy(this._initialCameraPosition),this._controls.target.copy(this._initialCameraTarget),this._controls.update())}destroy(t){this._animating=!1,this._animFrameId&&cancelAnimationFrame(this._animFrameId),this._animFrameId=null,this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._renderer&&(this._renderer.dispose(),this._renderer.domElement.remove(),this._renderer=null),this._solidMeshes.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidEdges.forEach(n=>{n.geometry?.dispose(),n.material?.dispose()}),this._solidVertices.forEach(n=>{n.children?.forEach(o=>{o.geometry?.dispose(),o.material?.dispose()})}),this._solidMeshes=[],this._solidEdges=[],this._solidVertices=[],this._camera=null,this._controls=null,this._gridHelper=null,this._THREE=null,this._el===t&&(this._el=null),t.innerHTML=""}}const pe=["text/html","application/xhtml+xml"],Ct=/^https?:\/\//;class Vt{static supportedTypes=pe;static viewName="Web view";static icon="mdi-web";constructor(t){this.candidates=t,this._candidate=void 0,this._el=null,this._iframe=null,this._onLoad=null}matches(){return!!this._pickCandidate()}_pickCandidate(){if(this._candidate!==void 0)return this._candidate;const t=this.candidates.find(n=>n.type&&n.url&&pe.some(o=>oe(o,n.type))&&Ct.test(n.url));return this._candidate=t??null,this._candidate}render(t){this._el=t;const n=this._pickCandidate();if(!n)return;t.style.overflow="auto";const o=document.createElement("iframe");o.src=n.url,o.setAttribute("sandbox","allow-same-origin"),o.style.cssText="width: 100%; height: 100%; min-height: 300px; border: none; display: block;",this._onLoad=()=>{try{const r=o.contentDocument,i=r?.documentElement?.scrollHeight||r?.body?.scrollHeight;i&&(o.style.height=`${i}px`)}catch{}},o.addEventListener("load",this._onLoad),t.appendChild(o),this._iframe=o}destroy(t){this._iframe&&(this._onLoad&&this._iframe.removeEventListener("load",this._onLoad),this._iframe.remove(),this._iframe=null,this._onLoad=null),this._el===t&&(this._el=null),t.innerHTML=""}}const Pt=[vt,zt,Vt].map(e=>({PluginClass:e,weight:1/0}));let ee=null;function St(){return ee||(ee=he.registerPromises.local.promise.then(async e=>{const t=e?.viewer?.viewPlugins??[],n=await Promise.all(t.map(async o=>{try{const r=await import(o.url);return(Array.isArray(o.export)&&o.export.length?o.export:[o.export||null]).map(a=>{const s=a?r[a]:r.default;return s?{PluginClass:s,weight:o.weight??0}:(console.warn(`View plugin has no export named "${a??"default"}": ${o.url}`),null)})}catch(r){return console.warn(`View plugin failed to load: ${o.url}`,r),[]}}));return[...Pt,...n.flat().filter(Boolean)]})),ee}function Lt(){async function e(t,n={}){if(!t?.length)return[];const o={...n,viewerConfig:Ee.config},r=await St(),i=[];for(const{PluginClass:a,weight:s}of r){const f=a.supportedTypes??[];if(!t.some(m=>m.type&&f.some(d=>gt(d,m.type))))continue;let p;try{if(p=Re(new a(t,o)),!(p.matches?.()??!0))continue}catch(m){console.warn(`View plugin threw while matching: ${a.name}`,m);continue}i.push({instance:p,weight:s,PluginClass:a})}return i}return{matchPlugins:e}}function Mt(e,t=null){return{type:e.language?.mimeType??e.language?.id??null,content:e.code??t?.contents??null,url:e.url??null,label:e.language?.label??e.language?.id??"unknown"}}function Jt(e,t,n=null){return{type:e.outputs?.mediaTypes?.[0]?.mimeType??null,content:n?.contents??null,url:t?.url??null,label:e.id}}const It=["href","onClick"],fe=1500,At=15e3,Ot={__name:"BuildingBlockExamples",props:{bblock:Object,active:Boolean},emits:["switch-tab"],setup(e,{emit:t}){const{matchPlugins:n}=Lt(),o=He(()=>I(()=>import("./ExampleViewer.js"),__vite__mapDeps([13,1,14,3,4,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46]))),r=e,i=t,a=Te(),s=je(),f=Be(),p=X([]),m=X([]),d=X([]);function v(c){return c.find(l=>!l.isViewPlugin)?.id}async function A(){const c=r.bblock;if(!r.bblock?.examples?.length){p.value=[],m.value=[],d.value=[];return}const l=[],u=[],h=[];if(r.bblock.examples.forEach(D=>{D.snippets?.forEach(x=>{let y;typeof x.language=="object"?y=x.language:(x.language||(x.language="plaintext"),y=K[x.language],typeof y=="string"&&(y=K[y]),y||(y={id:x.language,order:999,label:x.language}),x.language=y),($e.has(y.id)||y.mimeType||!K[y.id])&&x.code==null&&x.url&&!it(x,at)&&h.push(he.fetchDocumentByUrl(r.bblock,x.url,{maxSize:ot}).then(C=>{x.code=C}).catch(()=>{}))})}),await Promise.all(h),r.bblock!==c||(r.bblock.examples.forEach((D,x)=>{const y=D.snippets?.map(C=>C.language)??[];if(r.bblock.transforms?.length){const C=[];r.bblock.transforms.forEach(g=>{D.snippets?.forEach((P,R)=>{const B=P.transformResults?.[g.id];if(B!=null){const q=typeof B=="string";C.push({transform:g,snippet:P,snippetIdx:R,url:q?B:B.url||null,success:q?!0:B.success??!0,stderr:q?null:B.stderr||null,profilesValidation:q?null:B.profilesValidation||null})}})});const N={};C.forEach(g=>{N[g.transform.id]=(N[g.transform.id]||0)+1}),C.sort((g,P)=>{const R=g.transform.id.localeCompare(P.transform.id);return R!==0?R:g.snippetIdx-P.snippetIdx}),C.forEach(g=>{const R=N[g.transform.id]>1?`${g.transform.id} (${g.snippet.language?.label||g.snippetIdx+1})`:g.transform.id;y.push({id:`transform:${g.snippetIdx}-${g.transform.id}`,order:9999,label:R,icon:"mdi-file-swap",hasError:!g.success,isTransform:!0,transform:g.transform,transformEntry:g})})}const H=(D.snippets??[]).map(C=>Mt(C));u.push(n(H,{bblock:r.bblock}).then(C=>{C.forEach(({instance:N,weight:g,PluginClass:P},R)=>{y.push({id:`plugin:${x}:${P.name||"plugin"}:${R}`,order:-.5-(g??0)/1e6,label:P.viewName??P.name??"Custom view",icon:P.icon??"mdi-puzzle-outline",isViewPlugin:!0,pluginInstance:N})})})),l[x]=y}),await Promise.all(u),r.bblock!==c))return;const w=[],J=[];l.forEach((D,x)=>{D.sort((y,H)=>y.order===H.order?y.label.localeCompare(H.label):y.order-H.order),J.push(x),w[x]=v(D)}),p.value=l,m.value=w,d.value=J,ae(),k()}function z(c){const l=document.getElementById(`example-panel-${c.idx}`);if(!l){console.warn(`scrollToExample: no panel found for example index ${c.idx}`);return}const u=l.getBoundingClientRect().top,h=document.querySelector("header").offsetHeight,w=window.scrollY+u-h;Math.abs(w-window.scrollY)<2||window.scrollTo(0,w)}function O(c){const l=/^example-(\d+)$/.exec(c?.[0]??"");return l?{idx:parseInt(l[1],10)-1,language:c[1]||null}:null}function S(c,l){const u=[`example-${c+1}`];return l&&u.push(l),{name:"BuildingBlock",params:{id:r.bblock.itemIdentifier,section:"examples",rest:u}}}async function k(){if(!r.active)return;const c=O(s.params.rest);if(!c||!r.bblock?.examples?.[c.idx])return;const{idx:l,language:u}=c;d.value.includes(l)||d.value.push(l),u&&p.value[l]?.some(h=>h.id===u)?m.value[l]=u:m.value[l]=v(p.value[l]??[]),await Ge(),j(l)}let E=null;function j(c){E?.cleanup();let l;const u=()=>{w.disconnect(),clearTimeout(l),clearTimeout(J),window.removeEventListener("wheel",u),window.removeEventListener("touchmove",u),window.removeEventListener("keydown",u),E=null};window.addEventListener("wheel",u,{passive:!0}),window.addEventListener("touchmove",u,{passive:!0}),window.addEventListener("keydown",u);const h=Ce(()=>z({idx:c}),50),w=new ResizeObserver(()=>{h(),clearTimeout(l),l=setTimeout(u,fe)});w.observe(document.body),l=setTimeout(u,fe);const J=setTimeout(u,At);E={cleanup:u},z({idx:c})}W(()=>s.params.rest,k);function U(c){const l=f.resolve(S(c,m.value[c]));return window.location.origin+l.href}function ke(c){ze(U(c))}function ae(){r.active&&r.bblock?.examples?.length?a.setItems(r.bblock.examples.map((c,l)=>({title:c.title,idx:l,to:S(l,null)})),z):a.clearItems()}return W(()=>r.bblock,A,{immediate:!0}),W(()=>r.active,c=>{ae(),c&&k()}),(c,l)=>(_(),$("div",null,[e.bblock.semanticUplift?.additionalSteps?.length?(_(),V(Qe,{key:0,type:"info",variant:"tonal",class:"my-2"},{default:b(()=>[l[3]||(l[3]=T(" The RDF version of some or all of these examples may have require additional steps other than simply using a JSON-LD context. View ",-1)),re("a",{href:"#",onClick:l[0]||(l[0]=Z(u=>i("switch-tab","semantic-uplift"),["prevent"])),class:"text-primary"},"Semantic uplift"),l[4]||(l[4]=T(" for more information. ",-1))]),_:1})):M("",!0),L(nt,{multiple:"",modelValue:d.value,"onUpdate:modelValue":l[2]||(l[2]=u=>d.value=u)},{default:b(()=>[(_(!0),$(te,null,be(e.bblock.examples,(u,h)=>(_(),$(te,{key:h},[u.content?.length||u.snippets?.length?(_(),V(et,{key:0,value:h,id:`example-panel-${h}`},{default:b(()=>[L(tt,null,{default:b(()=>[re("a",{class:"example-copy-link",href:U(h),title:"Copy link to this example",onClick:Z(w=>ke(h),["stop","prevent"])},[L(G,null,{default:b(()=>[...l[5]||(l[5]=[T("mdi-link-variant",-1)])]),_:1})],8,It),T(" "+F(u.title)+" ",1),L(We),c.$vuetify.display.mdAndUp?(_(),V(le,{key:0,onClick:l[1]||(l[1]=Z(()=>{},["stop"])),variant:c.$vuetify.display.lgAndUp&&p.value[h]?.length<5?"buttons":"dropdown",modelValue:m.value[h],"onUpdate:modelValue":w=>m.value[h]=w,languages:p.value[h]},null,8,["variant","modelValue","onUpdate:modelValue","languages"])):M("",!0)]),_:2},1024),L(rt,null,{default:b(()=>[L(Fe(o),{bblock:e.bblock,example:u,language:p.value[h]?.find(w=>w.id===m.value[h]),"source-files-url":e.bblock.sourceFiles},xe({_:2},[c.$vuetify.display.mdAndUp?void 0:{name:"before-code",fn:b(()=>[L(le,{modelValue:m.value[h],"onUpdate:modelValue":w=>m.value[h]=w,languages:p.value[h],variant:"dropdown"},null,8,["modelValue","onUpdate:modelValue","languages"])]),key:"0"}]),1032,["bblock","example","language","source-files-url"])]),_:2},1024)]),_:2},1032,["value","id"])):M("",!0)],64))),128))]),_:1},8,["modelValue"])]))}},Dt=me(Ot,[["__scopeId","data-v-0deedcbd"]]),qt=Object.freeze(Object.defineProperty({__proto__:null,default:Dt},Symbol.toStringTag,{value:"Module"}));export{qt as B,at as M,ot as a,Ut as b,lt as i,Jt as t,Lt as u};
