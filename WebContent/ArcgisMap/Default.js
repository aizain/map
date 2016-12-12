/**
 * ArcgisMap.Default类
 * 放置一些静态的、默认的资源
 * @author zain
 * 16/12/09
 */
ArcgisMap.Default = {}

/**
 * ArcgisMap.Default.MapOption
 * 默认Map配置
 */
ArcgisMap.Default.mapOption = {
        id: "map", // 用户放置map的div标签的id
        wkid: 4326, // 用户使用的坐标系（支持4326/102100）
        center: [106.1, 38.1], // 地图显示的中心坐标
        mapLayer: "google", // 用户打算用的地图图层资源（支持"google"/"yinchuan"）
        zoom: 2, // 加载后显示层级
        maxZoom: 14, // 最大显示层级
        minZoom: 1, // 最小显示层级
        enHome: true, // 是否启用回中心点按钮
}

ArcgisMap.Default.googleUrl = "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{level}!2i{col}!3i{row}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0";
ArcgisMap.Default.yinchuanUrl = "http://localhost:6080/arcgis/rest/services/yinchuan/yinchuan2/MapServer";
ArcgisMap.Default.deUrl = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer"

