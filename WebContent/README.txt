MapManager.js
V1.1
1.1：重构js代码，进行结构化配置

参考测试页面：/test.html
使用模块：/ArcgisMap/

一、map创建方法：
1.引入js文件
<script type="text/javascript" src="/map/MapManager.js"></script>

2.创建map生成位置
<div id="map"></div>

3.创建map
var map1 = MapManager.getMap(MapManager.Type.ArcgisMap, options);

3-1.map的options
options = {
  id: "map", // 用户放置map的div标签的id
  wkid: 4326, // 用户使用的坐标系（支持4326/102100）
  center: [106.1, 38.1], // 地图显示的中心坐标
  mapLayer: "google", // 用户打算用的地图图层资源（支持"google"/"yinchuan"）
  zoom: 10, // 加载后显示层级
  maxZoom: 14, // 最大显示层级
  minZoom: 9, // 最小显示层级
  enHome: true, // 是否启用回中心点按钮
}

二、map方法使用说明
*注：map采用异步加载，需在map.ready()方法中写后续逻辑(重写ready方法)
1.使用示例
var map1 = MapManager.getMap(MapManager.Type.ArcgisMap);
map1.ready = function() {
  map1.addPoint({
    datas: "aaaa",
    layerId: "featureLayer",
    point: map1.getEventPoint(e),
    style: ArcgisMap.Style.Symbol.testPictureSymbol,
    info: {
      title: "aaa",
      content: "bbb"
    }
  });
}

2.重写方法示例
map.click = function(e) { /* TODO */}

三、可用方法清单
1-1.对象控制-常用
map.addPoint(options)
map.addHeatPoint(options)
map.addPolyline(options)
map.addArrow(options)
map.addDatasInFLayer(options) // 添加数据集到特征图层，未完成

1-2.对象控制-偏底层
map.addGraphic(obj, type)

2-1.图层控制-常用
map.getLayer(layerId) // 获取图层
map.addGLayer(layerId, index) // 增加绘图层
map.addHeatFLayer(layerId, index) // 增加热力图-特征图层
map.addFLayer(layerId, index) // 增加特征层

map.clearLayers(layerIds) // 清空图层，根据ids
map.clearLayer(layerId) // 清空图层，根据id

2-2.图层控制-偏底层
map.addLayer(options) // 增加图层

3.map事件-可重写（自动转换坐标系）
map.click(e) 
map.mouseMove(e) 
map.zoomStart(e) // 层级变化事件-变化前图层
map.zoomEnd(e) // 层级变化事件-变化后图层
map.layerAdd(layer) // 层级变化事件-变化后图层

4.组件工具
map.addTimeSlider(options) // 添加时间滑动条控件

5.map工具
map.changeEventByWkid(e) // 转换事件坐标系,返回e
map.toScreen(mapPoint) // 坐标转换
map.toMap(screenPoint) // 坐标转换

6.静态工具
map.Utils.getEventPoint(e) // 获取事件中的坐标,返回point
map.Utils.isExists(obj) // 该对象是否存在
map.Utils.getThirdPoint(startPnt, endPnt, angle, distance, clockWise) // 获取第三个点坐标 根据两点
map.Utils.getAzimuth(startPnt, endPnt) // 计算方位角
map.Utils.distance(pnt1, pnt2) // 计算两点间距离

7.其他 
map.start() // 启动地图
map.initEvent() // 初始化绑定地图事件
map.ready() // 地图启动完毕后调用该函数

四.对象
1.现有对象
ArcgisMap.Entity.Geometry 对象父类
ArcgisMap.Entity.Point 点
ArcgisMap.Entity.Polyline 线
ArcgisMap.Entity.Arrow 箭头
ArcgisMap.Entity.HeatPoint 热力点

2、添加对象的options属性说明
2-1.Geometry 父类
options = {
  style: ArcgisMap.Style.Symbol.testPictureSymbol, // 样式
  datas: "", // 数据
  info: { // 弹出框内容
    title: "",
    content: ""
  }, 
}

2-2.Point 点
options = {
  layerId: "featureLayer", // 所属图层id
  point: [1,1], // 放置坐标
  // 父类属性
}

2-3.Polyline 折线
options = {
  layerId: "featureLayer", // 所属图层id
  points: [[[xx, xx], [xx, xx]], [[xx, xx], [xx, xx]]], // 放置坐标
}

2-4.Arrow 箭头
options = {
  layerId: "", // 所属图层id
  points: [[[xx, xx], [xx, xx]], [[xx, xx], [xx, xx]]], // 放置坐标
}

2-5.HeatPoint 热力点
options = {
  layerId: "featureLayer", // 所属图层id
  point: [1,1], // 图片放置坐标
}


五、stye参数说明
1.color
[ <red>, <green>, <blue>, <alpha> ]
[ 67, 0, 255, 40 ]

2.Simple Marker Symbol
{
    "type" : "esriSMS",
    "style" : "< esriSMSCircle | esriSMSCross | esriSMSDiamond | esriSMSSquare | esriSMSX >",
    "color" : <color>,
    "size" : <size>,
    "angle" : <angle>,
    "xoffset" : <xoffset>,
    "yoffset" : <yoffset>,
    "outline" : { //if outline has been specified
      "color" : <color>,
      "width" : <width>
    }
}
{
    "type": "esriSMS",
     "style": "esriSMSSquare",
     "color": [76,115,0,255],
     "size": 8,
     "angle": 0,
     "xoffset": 0,
     "yoffset": 0,
     "outline": 
      {
      "color": [152,230,0,255],
       "width": 1
      }
}

3.Simple Line Symbol
{
    "type" : "esriSLS",
    "style" : "< esriSLSDash | esriSLSDashDotDot | esriSLSDot | esriSLSNull | esriSLSSolid >",
    "color" : <color>,
    "width" : <width>
}
{
    "type": "esriSLS",
    "style": "esriSLSDot",
    "color": [115,76,0,255],
    "width": 1
}

4.Picture Marker Symbol
{
    "type" : "esriPMS",
    "url" : "<imageUrl>", //relative URL
    "imageData" : "<base64EncodedImageData>",
    "contentType" : "<imageContentType>",
    "color" : <color>,
    "width" : <width>,
    "height" : <height>,
    "angle" : <angle>,
    "xoffset" : <xoffset>,
    "yoffset" : <yoffset>
}
{
    "type" : "esriPMS", 
    "url" : "471E7E31", 
    "imageData" : "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==", 
    "contentType" : "image/png", 
    "color" : null, 
    "width" : 19.5, 
    "height" : 19.5, 
    "angle" : 0, 
    "xoffset" : 0, 
    "yoffset" : 0
}

六、默认参数
ArcgisMap.Default.mapOption // 默认map选项
ArcgisMap.Default.googleUrl // google地图url
ArcgisMap.Default.yinchuanUrl // 银川地图url
ArcgisMap.Style.Symbol.testPointSymbol // 测试点样式
ArcgisMap.Style.Symbol.testPictureSymbol // 测试图片样式
ArcgisMap.Style.Symbol.testPolySymbol // 测试折线样式
ArcgisMap.Style.Renderer.heatPoint // 热力点渲染器样式
ArcgisMap.Style.ColorStops.heatPoint // 热力点颜色阶梯样式
