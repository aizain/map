/**
 * ArcgisMap.Entity类
 * 放置一些实体
 * @author zain
 * 16/12/09
 */
ArcgisMap.Entity = {};

// 范围
ArcgisMap.Entity.Extent;

// 抽象实体
ArcgisMap.Entity.Geometry = function(options) {
    this.type = "Geometry";
    this.datas = options.datas;
    this.style = options.style;
    this.info = options.info;
}

// 点
ArcgisMap.Entity.Point = function(options) {
    ArcgisMap.Entity.Geometry.call(this, options); // 继承Geometry
    this.type = "Point";
    this.layerId = options.layerId;
    this.point = options.point;
}
// 线
ArcgisMap.Entity.Polyline = function(options) {
    ArcgisMap.Entity.Geometry.call(this, options); // 继承Geometry
    this.type = "Polyline";
    this.layerId = options.layerId;
    this.points = options.points;
}
// 箭头
ArcgisMap.Entity.Arrow = function(options) {
    ArcgisMap.Entity.Polyline.call(this, options); // 继承Polyline
    this.type = "Arrow";
    
    var pnts;
    var pnt1, pnt2;
    var distance;
    var len = 0.003;
    var leftPnt, rightPnt;
    
    pnts = this.points[this.points.length-1];
    pnt1 = pnts[0];
    pnt2 = pnts[1];
    distance = ArcgisMap.Utils.distance(pnt1, pnt2);
    leftPnt = ArcgisMap.Utils.getThirdPoint(pnt1, pnt2, Math.PI/6, len, false);
    rightPnt = ArcgisMap.Utils.getThirdPoint(pnt1, pnt2, Math.PI/6, len, true);
    this.points.push([pnt2, leftPnt]);
    this.points.push([pnt2, rightPnt]);
}
//热力点
ArcgisMap.Entity.HeatPoint = function(options) {
    ArcgisMap.Entity.Point.call(this, options); // 继承Geometry
    this.type = "HeatPoint";
}