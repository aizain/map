/**
 * ArcgisMap类
 * 用于建立map实体
 * @author zain
 * 16/12/09
 */
var ArcgisMap;

/**
 * 构造方法
 * @param options 配置
 */
function ArcgisMap(options) {
    this.version = "1.0.0";
    this.type = "ArcgisMap";
    this.options = options ? options : ArcgisMap.Default.mapOption;
    this.wkid = this.options.wkid;
    this.resources = {};
    this.task = [];
}

/**
 * map加载完毕后执行
 * TODO 需要被重写
 */
ArcgisMap.prototype.ready = function() {
    console.debug("Parent ready fn, need override !");
}

/**
 * 添加数据图层
 * @param options
 */
ArcgisMap.prototype.addFLayer = function(options) {
    var aMap = this;
    var TimeExtent = aMap.resources.TimeExtent;
    var FeatureLayer = aMap.resources.FeatureLayer;
    console.debug("addFLayer: " + options.layerId);
    
    // 设置时间范围
    var timeExtent = new TimeExtent();
    timeExtent.startTime = new Date(options.timeExtent[0]);
    timeExtent.endTime = new Date(options.timeExtent[1]);
    // 设置特征集合
    var featureCollection = {
        layerDefinition: options.layerDefinition,
        featureSet: options.featureSet,
    }
    // 设置特征图层
    console.debug(featureCollection);
    var featureLayer = new FeatureLayer(
        featureCollection,
        {
            id: options.layerId,
            // infoTemplate: null, // 弹出框内容
            mode: FeatureLayer.MODE_SNAPSHOT, // 查询模式
            // orderByFields: null, // 字段排序规则 [ "POPULATION DESC" ]
            outFields: ["*"], // 输出图层的哪些字段，用于editing features
        }
    );
    featureLayer.setTimeDefinition(timeExtent); // 设置数据的时间范围
    aMap.addLayer({
        layer: featureLayer,
        index: options.index,
    });
    console.debug("addDataLayer: over");
}

/**
 * 增加热力图图层
 * @param options
 */
ArcgisMap.prototype.addHeatFLayer = function(options) {
    var aMap = this;
    var TimeExtent = aMap.resources.TimeExtent;
    var FeatureLayer = aMap.resources.FeatureLayer;
    var HeatmapRenderer = aMap.resources.HeatmapRenderer;
    console.debug("addHeatFLayer: " + options.layerId);
    
    // 设置特征集合
    var featureCollection = {
        layerDefinition: options.layerDefinition,
        featureSet: null,
    };
    var featureLayer = new FeatureLayer(
          featureCollection, 
          {
              id: options.layerId,
              mode: FeatureLayer.MODE_SNAPSHOT, // 查询模式
              outFields: ["*"], // 输出图层的哪些字段，用于editing features
              opacity: 1,
          }
    );
    var heatmapRenderer = new HeatmapRenderer({  
          blurRadius: 10,  
          maxPixelIntensity: 30,  
          minPixelIntensity: 0  
    });  
    heatmapRenderer.setColorStops([  
          { ratio: 0, color: "rgb(255, 219, 0, 0)"},  
          { ratio: 0.6, color: "rgb(250, 146, 0)"},  
          { ratio: 0.85, color: "rgb(250, 73, 0)" },  
          { ratio: 0.95, color: "rgba(250, 0, 0)" }  
    ]);
    featureLayer.setRenderer(heatmapRenderer);
    aMap.addLayer({
        layer: featureLayer,
        index: options.index,
    });
    console.debug("addHeatLayer: over");
}

/**
 * 按格式增加批量数据
 * 到FeatureLayer中
 * @param options
 */
ArcgisMap.prototype.addDatasInFLayer = function(options) {
    console.debug("addDatasInFLayer: HeatLayer datas");
    var aMap = this;
    
    require(["esri/geometry/Point", "esri/graphic"],
    function(Point, Graphic) {
        var hLayer = aMap.map.getLayer(options.layerId);
        var features = [];
        var item;
        var geometry;
        var graphic;
        var attr = {};
        var data
        $.ajax({
            async: false, 
            url: options.url, 
            success: function(result){ 
                data = result;
            } 
        });
        
        for(var i in data.items) {
            item = data.items[i];
            attr["description"] = item.description;
            attr["title"] = item.title ? item.title : "Flickr Photo";
            geometry = new Point(item);
            graphic = new Graphic(geometry);
            graphic.setAttributes(attr);
            features.push(graphic);
        }
        
        hLayer.applyEdits(features, null, null);
    });
}

/**
 * 增加点
 * @param options
 */
ArcgisMap.prototype.addPoint = function(options) {
    var aMap = this;
    var point = new ArcgisMap.Entity.Point(options);
    if(!ArcgisMap.Utils.isExists(point.layerId)) {
        console.error("addPoint: layerId must be existed");
    }
    aMap.addGraphic(point);
}

/**
 * 增加热力点
 * @param options
 */
ArcgisMap.prototype.addHeatPoint = function(options) {
    var aMap = this;
    var point = new ArcgisMap.Entity.HeatPoint(options);
    if(!ArcgisMap.Utils.isExists(point.layerId)) {
        console.error("addHeatPoint: layerId must be existed");
    }
    aMap.addGraphic(point);
}

/**
 * 增加折线，支持单条、多条
 * @param options
 * points [[[xx, xx], [xx, xx]], [[xx, xx], [xx, xx]]]
 */
ArcgisMap.prototype.addPolyline = function(options) {
    var aMap = this;
    var polyLine = new ArcgisMap.Entity.Polyline(options);
    if(!ArcgisMap.Utils.isExists(polyLine.layerId)) {
        console.error("addPolyLine: layerId must be existed");
    }
    aMap.addGraphic(polyLine);
}

/**
 * 增加箭头，支持多点转折，最后一点为箭头
 * @param options
 * points [[[xx, xx], [xx, xx]], [[xx, xx], [xx, xx]]]
 */
ArcgisMap.prototype.addArrow = function(options) {
    var aMap = this;
    var arrow = new ArcgisMap.Entity.Arrow(options);
    if(!ArcgisMap.Utils.isExists(arrow.layerId)) {
        console.error("addArrow: layerId must be existed");
    }
    aMap.addGraphic(arrow);
}

/**
 * 增加绘图层
 * 根据id
 * @param layerId
 * @param index
 */
ArcgisMap.prototype.addGLayer = function(layerId, index) {
    var aMap = this;
    
    require(["esri/layers/GraphicsLayer"], 
    function(GraphicsLayer) {
        console.debug("addGLayer: " + layerId);
        var gLayer = new GraphicsLayer({
            id: layerId,
        }); 
        aMap.addLayer({
            layer: gLayer, 
            index: index
        });
    });
}

/**
 * 获取图层
 * 根据id
 * @param layerId
 * @returns layer
 */
ArcgisMap.prototype.getLayer = function(layerId) {
    console.debug("getLayer: " + layerId);
    var aMap = this;
    var layer = aMap.map.getLayer(layerId);
    console.debug(layer);
    return layer;
}

/**
 * 清空图层
 * 根据ids
 * 多个
 */
ArcgisMap.prototype.clearLayers = function(layerIds) {
    console.debug("clear: clearLayers");
    var aMap = this;
    for (var i in layerIds) {
        aMap.clearLayer(layerIds[i]);
    }
}

/**
 * 清空图层
 * 根据id
 * 单个
 */
ArcgisMap.prototype.clearLayer = function(layerId) {
    var aMap = this;
    if(!ArcgisMap.Utils.isExists(layerId)) {
        console.error("clear: layerId must be existed");
        return;
    }
    console.debug("clear: clearLayer --- " + layerId);
    aMap.getLayer(layerId).clear();
}

/**
 * 增加时间滑动条
 * @param options
 */
ArcgisMap.prototype.addTimeSlider = function(options) {
    console.debug("addTimeSlider: begin");
    var aMap = this;
    var TimeSlider = aMap.resources.TimeSlider;
    var TimeExtent = aMap.resources.TimeExtent;
    var TimeInfo = aMap.resources.TimeInfo;
    var dom = aMap.resources.dom;
    var array = aMap.resources.array;
    
    var timeSlider = new TimeSlider(
            {
                style: "width: 100%;"
            }, 
            dom.byId(options.id)
    );
    var timeExtent = new TimeExtent();
    timeExtent.startTime = new Date(options.timeExtent[0]);
    timeExtent.endTime = new Date(options.timeExtent[1]);
    timeSlider.setThumbCount(options.thumbCount); // 设置滑调的数量 
    timeSlider.setThumbIndexes([0,30]); // 设置滑调位置
    timeSlider.createTimeStopsByTimeInterval(
            timeExtent, // 设置时间范围
            1, // 
            TimeInfo.UNIT_WEEKS);
    timeSlider.setThumbMovingRate(2000);
    timeSlider.startup();
    
    var labels = array.map(timeSlider.timeStops, function(timeStop, i) { 
      if ( i % 2 === 0 ) {
        return timeStop.getDate(); 
      } else {
        return "";
      }
    }); 
    timeSlider.setLabels(labels);
    
    dom.byId("timeInfo").innerHTML = "<i>1日 到 8日<\/i>";
    
    timeSlider.on("time-extent-change", function(evt) {
      var startValString = evt.startTime.toUTCString();
      var endValString = evt.endTime.toUTCString();
      dom.byId("timeInfo").innerHTML = "<i>" + endValString  + "日<\/i>";
    });
    aMap.map.setTimeSlider(timeSlider);
    console.debug("addTimeSlider: over");
}

/**
 * 坐标转换
 * map转Screen
 */
ArcgisMap.prototype.toScreen = function(mapPoint) {
    console.debug("trans: toScreen");
    var aMap = this;
    if(!ArcgisMap.Utils.isExists(mapPoint)) {
        console.debug("mapPoint is empty");
        return;
    }
    aMap.map.toScreen(mapPoint);
}

/**
 * 坐标转换
 * Screen转map
 */
ArcgisMap.prototype.toMap = function(screenPoint) {
    console.debug("trans: toMap");
    var aMap = this;
    if(!ArcgisMap.Utils.isExists(screenPoint)) {
        console.debug("screenPoint is empty");
        return;
    }
    aMap.map.toMap(screenPoint);
}

/**
 * 默认点击事件
 * TODO 可重写
 * map.click = function() {}
 */
ArcgisMap.prototype.click = function(e) {
}
/**
 * 鼠标移动事件
 * @param e
 */
ArcgisMap.prototype.mouseMove = function(e) {
}
/**
 * 层级变化事件-变化前图层
 * @param e
 */
ArcgisMap.prototype.zoomStart = function(e) {
}
/**
 * 层级变化事件-变化后图层
 * @param e
 */
ArcgisMap.prototype.zoomEnd = function(e) {
}
/**
 * 层级增加事件
 * @param e
 */
ArcgisMap.prototype.layerAdd = function(layer) {
}

/**
 * 增加图层
 * 根据id和图层
 * @param options
 */
ArcgisMap.prototype.addLayer = function(options) {
    var aMap = this;
    
    if(!ArcgisMap.Utils.isExists(options.layer)) {
        console.error("addLayer: arcgisMap's layer must exists");
        return;
    }
    console.debug("addLayer: " + options.layer.id);
    aMap.map.addLayer(options.layer, options.index);
}

/**
 * 转换事件坐标系
 * 根据wkid
 * @param e
 * @returns {___anonymous3684_3684}
 */
ArcgisMap.prototype.changeEventByWkid = function(e) {
    var aMap = this;
    var eWkid = e.mapPoint.spatialReference.wkid;
    var normalizedVal = [];
    
    if(!ArcgisMap.Utils.isExists(eWkid)) {
        eWkid = aMap.wkid;
    }
    if(eWkid != aMap.wkid) {
        if(eWkid == 102100 && aMap.wkid == 4326) { // 102100 转 4326
            normalizedVal = aMap.resources.WebMercatorUtils.xyToLngLat(e.mapPoint.x, e.mapPoint.y);
        } else if(eWkid == 4326 && aMap.wkid == 102100) { // 4326 转 102100
            normalizedVal = aMap.resources.WebMercatorUtils.lngLatToXY(e.mapPoint.x, e.mapPoint.y);
        }
        e.mapPoint.x = normalizedVal[0];
        e.mapPoint.y = normalizedVal[1];
    } 
    
    return e;
}

/**
 * 获取版本号
 * @returns {String}
 */
ArcgisMap.prototype.getVersion = function() {
    return this.version;
}

/**
 * 地图启动方法
 */
ArcgisMap.prototype.start = function() {
    var aMap = this;
    var options = aMap.options;
    require([
             "esri/map", // 引入map
             "esri/layers/WebTiledLayer", // 引入网络图层，作为底图 
             "esri/layers/ArcGISTiledMapServiceLayer", // 引入瓦片图层，作为底图 
             
             "esri/geometry/webMercatorUtils", // 引入坐标转换工具
             "esri/layers/FeatureLayer", // 引入特征图层资源
             "esri/TimeExtent",  // 引入时间范围资源
             "esri/renderers/HeatmapRenderer",  // 引入热力图渲染器
             "esri/dijit/TimeSlider", // 引入时间滑动条资源
             "esri/layers/TimeInfo", // 引入时间信息资源
             
             "dojo/dom",
             "dojo/_base/array", // 引入数组工具
             
             "dojo/domReady!" // 等待html加载完毕后执行方法
    ], 
    function(Map, WebTiledLayer, ArcGISTiledMapServiceLayer, 
            WebMercatorUtils, FeatureLayer, TimeExtent, HeatmapRenderer, TimeSlider, TimeInfo,
            dom, array) {
        console.debug("start: arcgisMap begin");
        
        // 添加一些资源组件
        aMap.resources.WebMercatorUtils = WebMercatorUtils; // 坐标系转换工具
        aMap.resources.FeatureLayer = FeatureLayer;
        aMap.resources.TimeExtent = TimeExtent;
        aMap.resources.HeatmapRenderer = HeatmapRenderer;
        aMap.resources.TimeSlider = TimeSlider;
        aMap.resources.TimeInfo = TimeInfo;
        aMap.resources.dom = dom;
        aMap.resources.array = array;
        
        // 创建地图 
        aMap.map = new Map(options.id, {
            center: options.center,
            zoom: options.zoom,
            maxZoom: options.maxZoom,
            minZoom: options.minZoom,
            logo: false,
        });
        
        var mapLayer;
        if(options.mapLayer && options.mapLayer == "google") {
            options.mapLayer = new WebTiledLayer(ArcgisMap.Default.googleUrl, {id: "mapLayer"});
        } else if(options.mapLayer && options.mapLayer == "deUrl") {
            options.mapLayer = new ArcGISTiledMapServiceLayer(ArcgisMap.Default.deUrl, {id: "mapLayer"});
        } else {
            console.warn("TODO: no '" + options.mapLayer + "' mapLayer in ArcgisMap.options.mapLayer");
        }
        // 添加主图层（底图）
        var layerOptions = {
                layer: options.mapLayer,
                index: 0,
        }
        aMap.addLayer(layerOptions);
        aMap.initEvent();
        console.debug("start: arcgisMap over");
        console.debug(aMap);
        
        aMap.ready();
    });
}

/**
 * 初始化地图事件
 */
ArcgisMap.prototype.initEvent = function() {
    console.debug("start: initEvent");
    var aMap = this;
    
    // 点击事件
    aMap.map.on("click", function(e) {
        e = aMap.changeEventByWkid(e); // 自动转换坐标
        console.debug("click: x " + e.mapPoint.x 
                      + " --- y " + e.mapPoint.x 
                      + " --- lastWkid " + e.mapPoint.spatialReference.wkid);
        aMap.click(e);
    });
    // 鼠标移动事件
    aMap.map.on("mouse-move", function(e) {
        e = aMap.changeEventByWkid(e); // 自动转换坐标
        aMap.mouseMove(e);
    });
    // 层级变化事件-变化前图层
    aMap.map.on("zoom-start", function(e) {
        console.debug("zoom-start: level " + e.level);
        aMap.zoomStart(e);
    });
    // 层级变化事件-变化后图层
    aMap.map.on("zoom-end", function(e) {
        console.debug("zoom-end: level " + e.level);
        aMap.zoomEnd(e);
    });
    // 图层增加事件
    aMap.map.on("layer-add", function(obj) {
        console.debug("layer-add: " + obj.layer.id);
        aMap.layerAdd(obj.layer);
    });
    // 图层移除事件
    aMap.map.on("layer-removed", function(layer) {
        console.debug("layer-removed");
    });
    // 鼠标拖拽事件
    aMap.map.on("mouse-drag", function(e) {
        e = aMap.changeEventByWkid(e); // 自动转换坐标
        console.debug("mouse-drag");
    });
    // 鼠标拖拽事件-拖拽结束
    aMap.map.on("mouse-drag-start", function(e) {
        e = aMap.changeEventByWkid(e); // 自动转换坐标
        console.debug("mouse-drag-start");
    });
    // 鼠标拖拽事件-拖拽开始
    aMap.map.on("mouse-drag-end", function(e) {
        e = aMap.changeEventByWkid(e); // 自动转换坐标
        console.debug("mouse-drag-end");
    });
}

/**
 * 增加图层
 * 根据id和图层
 * @param options
 */
ArcgisMap.prototype.addGraphic = function(entity) {
    var aMap = this;
    var layer;
    
    var modul, symbol, info;
    var color;
    
    if(!ArcgisMap.Utils.isExists(entity) || entity == "") {
        console.debug("add" + entity.type + ": entity is empty");
        return;
    }
    
    require([
             "esri/graphic", "esri/SpatialReference", 
             "esri/Color", "esri/InfoTemplate",
             "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", 
             "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Circle", "esri/geometry/Multipoint"
    ], 
    function(Graphic, SpatialReference,
            Color, InfoTemplate,
            SimpleMarkerSymbol, SimpleLineSymbol,
            Point, Polyline, Circle, Multipoint) {
        console.debug("addGraphic: " + "layerId " + entity.layerId 
                + " --- entity " + JSON.stringify(entity));
        layer = aMap.getLayer(entity.layerId);
        
        switch(entity.type) {
            case "Point":
                modul = new Point({
                    x: entity.point[0], 
                    y: entity.point[1], 
                    spatialReference: {wkid: aMap.wkid}
                }); 
                symbol = new SimpleMarkerSymbol(entity.style);
            break;
            case "Multipoint":
                modul = new Multipoint({
                    points: entity.points, 
                    spatialReference: {wkid: aMap.wkid}
                }); 
                symbol = new SimpleMarkerSymbol(entity.style);
                break;
            case "Polyline":
                modul = new Polyline({
                    paths: entity.points,
                    spatialReference: {wkid: aMap.wkid}
                });
                symbol = new SimpleLineSymbol(entity.style);
                break;
            case "Arrow":
                modul = new Polyline({
                    paths: entity.points,
                    spatialReference: {wkid: aMap.wkid}
                });
                symbol = new SimpleLineSymbol(entity.style);
                break;
            case "Circle":
                modul = new Circle({
                    center: entity.point, 
                    radius: entity.radius, 
                    geodesic: entity.geodesic
                }); 
                symbol = new SimpleMarkerSymbol(entity.style);
                break;
            case "HeatPoint":
                modul = new Point({
                    x: entity.point[0], 
                    y: entity.point[1], 
                    spatialReference: {wkid: aMap.wkid}
                }); 
                symbol = new SimpleMarkerSymbol();
                break;
            default:
                break;
        }
        if(!ArcgisMap.Utils.isExists(entity.info)) {
            info = undefined;
        } else {
            info = new InfoTemplate({
                title: entity.info.title,
                content: entity.info.content,
            }); 
        }
        graphic = new Graphic(modul, symbol, entity.datas, info);
        console.debug(graphic);
        layer.add(graphic);
    });
}