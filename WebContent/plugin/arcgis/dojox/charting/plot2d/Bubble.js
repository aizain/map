//>>built
define("dojox/charting/plot2d/Bubble","dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/has ./CartesianBase ./_PlotEvents ./common dojox/lang/functional dojox/lang/functional/reversed dojox/lang/utils dojox/gfx/fx".split(" "),function(q,t,f,y,z,A,B,C,D,s,E){var F=D.lambda("item.purgeGroup()");return t("dojox.charting.plot2d.Bubble",[z,A],{defaultParams:{animate:null},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},filter:{},styleFunc:null,font:"",fontColor:"",labelFunc:null},constructor:function(g,
e){this.opt=q.clone(q.mixin(this.opt,this.defaultParams));s.updateWithObject(this.opt,e);s.updateWithPattern(this.opt,e,this.optionalParams);this.opt.labelFunc||(this.opt.labelFunc=function(e,g,f){return this._getLabel(e.size,g,f)});this.animate=this.opt.animate},render:function(g,e){var k;if(this.zoom&&!this.isDataDirty())return this.performZoom(g,e);this.resetEvents();if(this.dirty=this.isDirty())f.forEach(this.series,F),this._eventSeries={},this.cleanGroup(),k=this.getGroup(),C.forEachRev(this.series,
function(a){a.cleanGroup(k)});for(var r=this.chart.theme,q=this._hScaler.scaler.getTransformerFromModel(this._hScaler),s=this._vScaler.scaler.getTransformerFromModel(this._vScaler),t=this.events(),u=0;u<this.series.length;u++){var b=this.series[u];if(!this.dirty&&!b.dirty)r.skip(),this._reconnectEvents(b.name);else if(b.cleanGroup(),b.data.length)if("number"==typeof b.data[0])console.warn("dojox.charting.plot2d.Bubble: the data in the following series cannot be rendered as a bubble chart; ",b);else{var c=
r.next("circle",[this.opt,b]),l=f.map(b.data,function(a){return a?{x:q(a.x)+e.l,y:g.height-e.b-s(a.y),radius:this._vScaler.bounds.scale*(a.size/2)}:null},this);if(b.hidden)b.dyn.fill=c.series.fill,b.dyn.stroke=c.series.stroke;else{k=b.group;var h=null,m=null,n=null,w=this.opt.styleFunc,v=function(a){return w?r.addMixin(c,"circle",[a,w(a)],!0):r.addMixin(c,"circle",a,!0)};c.series.shadow&&(n=f.map(l,function(a,p){if(!this.isNullValue(a)){var d=v(b.data[p]).series.shadow,d=k.createCircle({cx:a.x+d.dx,
cy:a.y+d.dy,r:a.radius}).setStroke(d).setFill(d.color);this.animate&&this._animateBubble(d,g.height-e.b,a.radius);return d}return null},this),n.length&&(b.dyn.shadow=n[n.length-1].getStroke()));c.series.outline&&(m=f.map(l,function(a,p){if(!this.isNullValue(a)){var d=v(b.data[p]),d=B.makeStroke(d.series.outline);d.width=2*d.width+(c.series.stroke&&c.series.stroke.width||0);d=k.createCircle({cx:a.x,cy:a.y,r:a.radius}).setStroke(d);this.animate&&this._animateBubble(d,g.height-e.b,a.radius);return d}return null},
this),m.length&&(b.dyn.outline=m[m.length-1].getStroke()));h=f.map(l,function(a,p){if(!this.isNullValue(a)){var d=v(b.data[p]),f={x:a.x-a.radius,y:a.y-a.radius,width:2*a.radius,height:2*a.radius},c=this._plotFill(d.series.fill,g,e),c=this._shapeFill(c,f),c=k.createCircle({cx:a.x,cy:a.y,r:a.radius}).setFill(c).setStroke(d.series.stroke);c.setFilter&&d.series.filter&&c.setFilter(d.series.filter);this.animate&&this._animateBubble(c,g.height-e.b,a.radius);this.createLabel(k,b.data[p],f,d);return c}return null},
this);h.length&&(b.dyn.fill=h[h.length-1].getFill(),b.dyn.stroke=h[h.length-1].getStroke());if(t){var x=Array(h.length);f.forEach(h,function(a,c){if(null!==a){var d={element:"circle",index:c,run:b,shape:a,outline:m&&m[c]||null,shadow:n&&n[c]||null,x:b.data[c].x,y:b.data[c].y,r:b.data[c].size/2,cx:l[c].x,cy:l[c].y,cr:l[c].radius};this._connectEvents(d);x[c]=d}},this);this._eventSeries[b.name]=x}else delete this._eventSeries[b.name];b.dirty=!1}}else b.dirty=!1,r.skip()}this.dirty=!1;y("dojo-bidi")&&
this._checkOrientation(this.group,g,e);return this},_animateBubble:function(g,e,f){E.animateTransform(q.delegate({shape:g,duration:1200,transform:[{name:"translate",start:[0,e],end:[0,0]},{name:"scale",start:[0,1/f],end:[1,1]},{name:"original"}]},this.animate)).play()}})});