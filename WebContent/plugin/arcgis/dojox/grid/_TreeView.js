//>>built
require({cache:{"url:dojox/grid/resources/Expando.html":'\x3cdiv class\x3d"dojoxGridExpando"\r\n\t\x3e\x3cdiv class\x3d"dojoxGridExpandoNode" dojoAttachEvent\x3d"onclick:onToggle"\r\n\t\t\x3e\x3cdiv class\x3d"dojoxGridExpandoNodeInner" dojoAttachPoint\x3d"expandoInner"\x3e\x3c/div\r\n\t\x3e\x3c/div\r\n\x3e\x3c/div\x3e\r\n'}});
define("dojox/grid/_TreeView","dijit/registry ../main dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/event dojo/dom-attr dojo/dom-class dojo/dom-style dojo/dom-construct dojo/query dojo/parser dojo/text!./resources/Expando.html dijit/_Widget dijit/_TemplatedMixin ./_View ./_Builder ./util".split(" "),function(s,C,l,w,x,E,h,f,D,F,g,G,q,H,I,J,K,L){l("dojox.grid._Expando",[H,I],{open:!1,toggleClass:"",itemId:"",cellIdx:-1,view:null,rowNode:null,rowIdx:-1,expandoCell:null,level:0,templateString:q,
_toggleRows:function(a,c){if(a&&this.rowNode)if(g("table.dojoxGridRowTableNeedsRowUpdate").length)this._initialized&&this.view.grid.updateRow(this.rowIdx);else{var b=this;if(this.view.grid.treeModel){var e=this._tableRow?h.get(this._tableRow,"dojoxTreeGridPath"):"";e&&g('tr[dojoxTreeGridPath^\x3d"'+e+'/"]',this.rowNode).forEach(function(b){var d=g(".dojoxGridExpando",b)[0];d&&d.parentNode&&d.parentNode.parentNode&&!f.contains(d.parentNode.parentNode,"dojoxGridNoChildren")&&(d=s.byNode(d))&&d._toggleRows(a,
d.open&&c);b.style.display=c?"":"none"})}else g("tr."+a,this.rowNode).forEach(function(a){if(f.contains(a,"dojoxGridExpandoRow")){var d=g(".dojoxGridExpando",a)[0];if(d){var e=s.byNode(d),r=e?e.toggleClass:d.getAttribute("toggleClass"),d=e?e.open:b.expandoCell.getOpenState(d.getAttribute("itemId"));b._toggleRows(r,d&&c)}}a.style.display=c?"":"none"})}},setOpen:function(a){a&&f.contains(this.domNode,"dojoxGridExpandoLoading")&&(a=!1);var c=this.view.grid,b=c.store,e=c.treeModel,t=this;if(c._by_idx[this.rowIdx])if(e&&
!this._loadedChildren)if(a){var d=c.getItem(h.get(this._tableRow,"dojoxTreeGridPath"));d?(this.expandoInner.innerHTML="o",f.add(this.domNode,"dojoxGridExpandoLoading"),e.getChildren(d,function(b){t._loadedChildren=!0;t._setOpen(a)})):this._setOpen(a)}else this._setOpen(a);else!e&&b?a?(e=c._by_idx[this.rowIdx])&&!b.isItemLoaded(e.item)?(this.expandoInner.innerHTML="o",f.add(this.domNode,"dojoxGridExpandoLoading"),b.loadItem({item:e.item,onItem:x.hitch(this,function(e){var d=b.getIdentity(e);c._by_idty[d]=
c._by_idx[this.rowIdx]={idty:d,item:e};this._setOpen(a)})})):this._setOpen(a):this._setOpen(a):this._setOpen(a)},_setOpen:function(a){if(a&&this._tableRow&&f.contains(this._tableRow,"dojoxGridNoChildren"))this._setOpen(!1);else{this.expandoInner.innerHTML=a?"-":"+";f.remove(this.domNode,"dojoxGridExpandoLoading");f.toggle(this.domNode,"dojoxGridExpandoOpened",a);if(this._tableRow){f.toggle(this._tableRow,"dojoxGridRowCollapsed",!a);var c=h.get(this._tableRow,"dojoxTreeGridBaseClasses"),b="",b=a?x.trim((" "+
c+" ").replace(" dojoxGridRowCollapsed "," ")):0>(" "+c+" ").indexOf(" dojoxGridRowCollapsed ")?c+(c?" ":"")+"dojoxGridRowCollapsed":c;h.set(this._tableRow,"dojoxTreeGridBaseClasses",b)}c=this.open!==a;this.open=a;this.expandoCell&&this.itemId&&(this.expandoCell.openStates[this.itemId]=a);var b=this.view,e=b.grid;this.toggleClass&&c&&(!this._tableRow||!this._tableRow.style.display)&&this._toggleRows(this.toggleClass,a);b&&(this._initialized&&0<=this.rowIdx)&&(e.rowHeightChanged(this.rowIdx),e.postresize(),
b.hasVScrollbar(!0));this._initialized=!0}},onToggle:function(a){this.setOpen(!this.open);E.stop(a)},setRowNode:function(a,c,b){if(0>this.cellIdx||!this.itemId)return!1;this._initialized=!1;this.view=b;this.rowNode=c;this.rowIdx=a;this.expandoCell=b.structure.cells[0][this.cellIdx];if((a=this.domNode)&&a.parentNode&&a.parentNode.parentNode)this._tableRow=a.parentNode.parentNode;this.open=this.expandoCell.getOpenState(this.itemId);b.grid.treeModel&&(D.set(this.domNode,"marginLeft",18*this.level+"px"),
this.domNode.parentNode&&D.set(this.domNode.parentNode,"backgroundPosition",18*this.level+3+"px"));this.setOpen(this.open);return!0}});q=l("dojox.grid._TreeContentBuilder",K._ContentBuilder,{generateHtml:function(a,c){var b=this.getTableArray(),e=this.view,t=e.structure.cells[0],d=this.grid.getItem(c),m=this.grid,r=this.grid.store;L.fire(this.view,"onBeforeRow",[c,[t]]);var B=function(a,c,d,f,g,h){if(h){var y=b.length;f=f||[];var l=f.join("|"),z=f[f.length-1],k=z+(d?" dojoxGridSummaryRow":"");m.treeModel&&
(c&&!m.treeModel.mayHaveChildren(c))&&(k+=" dojoxGridNoChildren");b.push('\x3ctr style\x3d"" class\x3d"'+k+'" dojoxTreeGridPath\x3d"'+g.join("/")+'" dojoxTreeGridBaseClasses\x3d"'+k+'"\x3e');for(var q=a+1,k=null,u=0,n;n=t[u];u++){var A=n.markup,s=n.customClasses=[],x=n.customStyles=[];A[5]=n.formatAtLevel(g,c,a,d,z,s);A[1]=s.join(" ");A[3]=x.join(";");b.push.apply(b,A);!k&&(n.level===q&&n.parentCell)&&(k=n.parentCell)}b.push("\x3c/tr\x3e");c&&(r&&r.isItem(c))&&(u=r.getIdentity(c),"undefined"==typeof m._by_idty_paths[u]&&
(m._by_idty_paths[u]=g.join("/")));var v,p=g.concat([]);m.treeModel&&c?m.treeModel.mayHaveChildren(c)&&(d=e.structure.cells[0][m.expandoCell||0],v=d.getOpenState(c)&&h,d=new C.grid.TreePath(g.join("/"),m),d=d.children(!0)||[],w.forEach(d,function(a,b){var d=l.split("|");d.push(d[d.length-1]+"-"+b);p.push(b);B(q,a,!1,d,p,v);p.pop()})):c&&k&&!d?(d=e.structure.cells[0][k.level],v=d.getOpenState(c)&&h,r.hasAttribute(c,k.field)?(h=l.split("|"),h.pop(),d=new C.grid.TreePath(g.join("/"),m),d=d.children(!0)||
[],d.length?(b[y]='\x3ctr class\x3d"'+h.join(" ")+' dojoxGridExpandoRow" dojoxTreeGridPath\x3d"'+g.join("/")+'"\x3e',w.forEach(d,function(a,b){var d=l.split("|");d.push(d[d.length-1]+"-"+b);p.push(b);B(q,a,!1,d,p,v);p.pop()}),p.push(d.length),B(a,c,!0,f,p,v)):b[y]='\x3ctr class\x3d"'+z+' dojoxGridNoChildren" dojoxTreeGridPath\x3d"'+g.join("/")+'"\x3e'):r.isItemLoaded(c)?b[y]='\x3ctr class\x3d"'+z+' dojoxGridNoChildren" dojoxTreeGridPath\x3d"'+g.join("/")+'"\x3e':b[0]=b[0].replace("dojoxGridRowTable",
"dojoxGridRowTable dojoxGridRowTableNeedsRowUpdate")):c&&(!d&&1<f.length)&&(b[y]='\x3ctr class\x3d"'+f[f.length-2]+'" dojoxTreeGridPath\x3d"'+g.join("/")+'"\x3e')}else-1==b[0].indexOf("dojoxGridRowTableNeedsRowUpdate")&&(b[0]=b[0].replace("dojoxGridRowTable","dojoxGridRowTable dojoxGridRowTableNeedsRowUpdate"))};B(0,d,!1,["dojoxGridRowToggle-"+c],[c],!0);b.push("\x3c/table\x3e");return b.join("")},findTarget:function(a,c){for(var b=a;b&&b!=this.domNode&&!(b.tagName&&"tr"==b.tagName.toLowerCase());)b=
b.parentNode;return b!=this.domNode?b:null},getCellNode:function(a,c){var b=g("td[idx\x3d'"+c+"']",a)[0];if(b&&b.parentNode&&!f.contains(b.parentNode,"dojoxGridSummaryRow"))return b},decorateEvent:function(a){a.rowNode=this.findRowTarget(a.target);if(!a.rowNode)return!1;a.rowIndex=h.get(a.rowNode,"dojoxTreeGridPath");this.baseDecorateEvent(a);a.cell=this.grid.getCell(a.cellIndex);return!0}});return l("dojox.grid._TreeView",J,{_contentBuilderClass:q,_onDndDrop:function(a,c,b){this.grid&&this.grid.aggregator&&
this.grid.aggregator.clearSubtotalCache();this.inherited(arguments)},postCreate:function(){this.inherited(arguments);this.connect(this.grid,"_cleanupExpandoCache","_cleanupExpandoCache")},_cleanupExpandoCache:function(a,c,b){if(-1!=a)if(w.forEach(this.grid.layout.cells,function(a){"undefined"!=typeof a.openStates&&c in a.openStates&&delete a.openStates[c]}),"string"==typeof a&&-1<a.indexOf("/")){var e=new C.grid.TreePath(a,this.grid);for(a=e.parent();a;)e=a,a=e.parent();if(e=e.item())if(e=this.grid.store.getIdentity(e),
"undefined"!=typeof this._expandos[e]){for(var f in this._expandos[e])(a=this._expandos[e][f])&&a.destroy(),delete this._expandos[e][f];delete this._expandos[e]}}else{for(f in this._expandos)if("undefined"!=typeof this._expandos[f])for(e in this._expandos[f])(a=this._expandos[f][e])&&a.destroy();this._expandos={}}},postMixInProperties:function(){this.inherited(arguments);this._expandos={}},onBeforeRow:function(a,c){var b=this.grid;b._by_idx&&(b._by_idx[a]&&b._by_idx[a].idty)&&(b=b._by_idx[a].idty,
this._expandos[b]=this._expandos[b]||{});this.inherited(arguments)},onAfterRow:function(a,c,b){w.forEach(g("span.dojoxGridExpando",b),function(d){if(d&&d.parentNode){var c=d.getAttribute("toggleClass"),e,f,g=this.grid;g._by_idx&&(g._by_idx[a]&&g._by_idx[a].idty)&&(e=g._by_idx[a].idty,f=this._expandos[e][c]);f?(F.place(f.domNode,d,"replace"),f.itemId=d.getAttribute("itemId"),f.cellIdx=parseInt(d.getAttribute("cellIdx"),10),isNaN(f.cellIdx)&&(f.cellIdx=-1)):e&&(f=G.parse(d.parentNode)[0],this._expandos[e][c]=
f);f&&!f.setRowNode(a,b,this)&&f.domNode.parentNode.removeChild(f.domNode)}},this);var e=!1,l=this;g("tr[dojoxTreeGridPath]",b).forEach(function(a){f.toggle(a,"dojoxGridSubRowAlt",e);h.set(a,"dojoxTreeGridBaseClasses",a.className);e=!e;l.grid.rows.styleRowNode(h.get(a,"dojoxTreeGridPath"),a)});this.inherited(arguments)},updateRowStyles:function(a){var c=g("tr[dojoxTreeGridPath\x3d'"+a+"']",this.domNode);c.length&&this.styleRowNode(a,c[0])},getCellNode:function(a,c){var b=g("tr[dojoxTreeGridPath\x3d'"+
a+"']",this.domNode)[0];if(b)return this.content.getCellNode(b,c)},destroy:function(){this._cleanupExpandoCache();this.inherited(arguments)}})});