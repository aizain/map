/**
 * ArcgisMap.Utils类
 * 放置一些静态的工具
 * @author zain
 * 16/12/09
 */
ArcgisMap.Utils = {}

//坐标转换工具
ArcgisMap.Utils.WebMercator;

/**
 * 获取事件中的坐标
 * @param e
 * @returns
 */
ArcgisMap.Utils.getEventPoint = function(e) {
    var point = [];
    
    point.push(e.mapPoint.x);
    point.push(e.mapPoint.y);
    
    return point;
}

/**
 * 校验对象是否存在
 * null undefined
 * @param obj
 */
ArcgisMap.Utils.isExists = function(obj) {
    if(undefined == obj || null == obj) {
        return false;
    }
    return true;
}

/**
 * 获取第三个点坐标
 * 根据两点
 * @param startPnt
 * @param endPnt
 * @param angle
 * @param distance
 * @param clockWise
 * @returns {Array}
 */
ArcgisMap.Utils.getThirdPoint = function(startPnt, endPnt, angle, distance, clockWise) {
    var azimuth = ArcgisMap.Utils.getAzimuth(startPnt, endPnt);
    var alpha = clockWise ? azimuth + angle : azimuth-angle;
    var dx=distance * Math.cos(alpha);
    var dy=distance * Math.sin(alpha);
    return [endPnt[0] + dx, endPnt[1] + dy]; 
};

/**
 * 计算方位角
 * @param startPnt
 * @param endPnt
 * @returns {Number}
 */
ArcgisMap.Utils.getAzimuth = function(startPnt, endPnt) {
    var azimuth;
    var angle = Math.asin(Math.abs(endPnt[1] - startPnt[1]) / ArcgisMap.Utils.distance(startPnt, endPnt));
    if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0])
        azimuth = angle + Math.PI;
    else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0])
        azimuth = Math.PI * 2 - angle;
    else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0])
        azimuth = angle;
    else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0])
        azimuth = Math.PI - angle;
    return azimuth;
};

/**
 * 计算两点间距离
 * @param pnt1
 * @param pnt2
 * @returns
 */
ArcgisMap.Utils.distance = function(pnt1, pnt2) {
    return Math.sqrt(Math.pow((pnt1[0] - pnt2[0]), 2) + Math.pow((pnt1[1] - pnt2[1]), 2));
};
