// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.
//>>built
define("esri/tasks/geoenrichment/GeometryStudyArea",["../../declare","../../geometry/jsonUtils","../../geometry/Geometry","./StudyArea"],function(b,c,d,e){return b("esri.tasks.geoenrichment.GeometryStudyArea",[e],{geometry:null,constructor:function(a){a&&a.geometry&&(this.geometry=a.geometry instanceof d?a.geometry:c.fromJson(a.geometry))},toJson:function(){var a=this.inherited(arguments);a.geometry=this.geometry.toJson();return a},getGeomType:function(){return this.geometry.type}})});