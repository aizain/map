/**
 * MapManager类
 * 地图管理器
 * 用来加载地图及地图上的控件
 * @author zain
 * 16/12/09
 */
var MapManager = {
        version: "1.0.0"
}

/**
 * 获取地图
 */
MapManager.getMap = function(type, options) {
    var map;
    
    if(!MapManager.Utils.isExists(type)) {
        type = "ArcgisMap";
    }
    if(MapManager.Type.ArcgisMap == type) {
        console.debug("getMap: " + type);
        map = MapManager.createArcgisMap(options);
    } else {
        console.warn("getMap: no '" + type + "' type in MapManager.Type");
    }
    
    return map;
}

/**
 * 添加时间滑动条控件
 */
MapManager.addTimeSlider = function(map, options) {
    var T = MapManager.Default.TYPE;
    if(map.type && map.type == T.ArcgisMap) {
        console.debug("addTimeSlider: " + map.type);
        map.addTimeSlider(options);
    } else {
        console.warn("addTimeSlider: no '" + type + "' type in MapManager.Type");
    }
    
}

/**
 * 添加查询应用
 */
MapManager.addSearchApp = function(map, options) {
    var T = MapManager.Default.TYPE;
    if(map.type && map.type == T.ArcgisMap) {
        console.debug("addSearchApp: " + map.type);
        map.addSearchApp(options);
    } else {
        console.warn("addSearchApp: no '" + type + "' type in MapManager.Type");
    }
}


//创建ArcgisMap
MapManager.createArcgisMap = function(options) {
    console.debug("init: createArcgisMap");
    var map;
    var D = MapManager.Default.AM;
    var js_urls = [D.mapUrl, 
                   D.defaultUrl, D.entityUrl, D.styleUrl, D.utilsUrl,
                   D.initUrl];
    var css_urls = [D.cssEsriUrl, D.cssClaro];
    
    MapManager.Utils.loadJs(js_urls);
    MapManager.Utils.loadCss(css_urls);
    
    map = new ArcgisMap(options);
    map.Utils = ArcgisMap.Utils;
    map.start();
    
    return map;
}

//默认参数包
MapManager.Default = {};
MapManager.Default.AM = {};

MapManager.Default.AM.mapUrl = "/map/ArcgisMap/ArcgisMap.js";
MapManager.Default.AM.defaultUrl = "/map/ArcgisMap/Default.js";
MapManager.Default.AM.entityUrl = "/map/ArcgisMap/Entity.js";
MapManager.Default.AM.styleUrl = "/map/ArcgisMap/Style.js";
MapManager.Default.AM.utilsUrl = "/map/ArcgisMap/Utils.js";

MapManager.Default.AM.initUrl2 = "http://plugin/arcgis/init.js";
MapManager.Default.AM.dojoUrl2 = "http://plugin/arcgis/dojo/dojo.js";
MapManager.Default.AM.cssEsriUrl2 = "http://plugin/arcgis/esri/css/esri.css";
MapManager.Default.AM.cssClaro2 = "http://plugin/arcgis/dijit/themes/claro/claro.css";

MapManager.Default.AM.initUrl = "/map/plugin/arcgis/init.js";
MapManager.Default.AM.dojoUrl = "/map/plugin/arcgis/dojo/dojo.js";
MapManager.Default.AM.cssEsriUrl = "/map/plugin/arcgis/esri/css/esri.css";
MapManager.Default.AM.cssClaro = "/map/plugin/arcgis/dijit/themes/claro/claro.css";

MapManager.Type = {};
MapManager.Type.ArcgisMap = "ArcgisMap";

//工具包
MapManager.Utils = {}
MapManager.Utils.isExists = function(obj) {
    if(undefined == obj || null == obj) {
        return false;
    }
    return true;
}
/**
 * 动态引入js
 * @param url
 */
MapManager.Utils.loadJs = function(urls) {
    if(!urls.length) {
        urls = [urls];
    }
    for(var i in urls) {
        MapManager.Utils.loadHtml(urls[i]);  
    }
}
/**
 * 动态引入css
 * @param url
 */
MapManager.Utils.loadCss = function(urls) {
    var head = document.getElementsByTagName("head")[0];
    var oLink;
    if(!urls.length) {
        urls = [urls];
    }
    for(var i in urls) {
        oLink = document.createElement("link");
        oLink.type = "text/css";  
        oLink.rel = "stylesheet";  
        oLink.href = urls[i];  
        head.appendChild(oLink);  
    }
}
/**
 * 加载html页面
 * @param url
 */
MapManager.Utils.loadHtml = function(url) {
    var html;
    $.ajax({ 
        async:false, 
        url : url, 
        success : function(result){ 
            html = result;
        } 
    });
    return html;
}