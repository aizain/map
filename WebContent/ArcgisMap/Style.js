/**
 * ArcgisMap.Style类
 * 放置一些样式
 * @author zain
 * 16/12/09
 */
ArcgisMap.Style = {};

// Symbol类型
ArcgisMap.Style.Symbol = {}
// Renderer类型
ArcgisMap.Style.Renderer = {}
ArcgisMap.Style.ColorStops = {}

// 测试用点样式
ArcgisMap.Style.Symbol.testPointSymbol = {
        color: [76,115,0,255],
        size: 8,
        angle: 0,
        xoffset: 0,
        yoffset: 0,
        type: "esriSMS",
        style: "esriSMSCircle",
        outline: {
          color: [152,230,0,255],
          width: 1,
          type: "esriSLS",
          style: "esriSLSSolid"
        }
}
ArcgisMap.Style.Symbol.testPictureSymbol = {
        type : "esriPMS", 
        url : "/map/imgs/fix/fix-blue-deep.png", 
        imageData : "", 
        contentType : "image/png", 
        color : null, 
        width : 19.5, 
        height : 19.5, 
        angle : 0, 
        xoffset : 0, 
        yoffset : 0
}
ArcgisMap.Style.Symbol.testPolySymbol = {
        type: "esriSLS",
        style: SimpleLineSymbol.STYLE_SOLID,
        color: [115,76,0,255],
        width: 1,
}
ArcgisMap.Style.Renderer.heatPoint = {
        blurRadius: 10,  
        maxPixelIntensity: 30,  
        minPixelIntensity: 0 
}
ArcgisMap.Style.ColorStops.heatPoint = [  
    { ratio: 0, color: "rgb(255, 219, 0, 0)"},  
    { ratio: 0.6, color: "rgb(250, 146, 0)"},  
    { ratio: 0.85, color: "rgb(250, 73, 0)" },  
    { ratio: 0.95, color: "rgba(250, 0, 0)" }  
];
ArcgisMap.Style.ColorStops.heatSlider = [
               {"ratio":0,"color":{
                 "r":133,"g":193,"b":200,"a":0}
               },
               {"ratio":0.01,"color":{
                 "r":133,"g":193,"b":200,"a":0}
               },
               {"ratio":0.01,"color":{
                 "r":133,"g":193,"b":200,"a":0.7}
               },
               {"ratio":0.01,"color":{
                 "r":133,"g":193,"b":200,"a":0.7}
               },
               {"ratio":0.0925,"color":{
                 "r":144,"g":161,"b":190,"a":0.7}
               }, 
               {"ratio":0.17500000000000002,"color":{
                 "r":156,"g":129,"b":132,"a":0.7}
               },
               {"ratio":0.2575,"color":{
                 "r":167,"g":97,"b":170,"a":0.7}
               },
               {"ratio":0.34,"color":{
                 "r":175,"g":73,"b":128,"a":0.7}
               },
               {"ratio":0.42250000000000004,"color":{
                 "r":184,"g":48,"b":85,"a":0.7}
               },
               {"ratio":0.505,"color":{
                 "r":192,"g":24,"b":42,"a":0.7}
               },
               {"ratio":0.5875,"color":{
                 "r":200,"g":0,"b":0,"a":0.7}
               },
               {"ratio":0.67,"color":{
                 "r":211,"g":51,"b":0,"a":0.7}
               },
               {"ratio":0.7525000000000001,"color":{
                 "r":222,"g":102,"b":0,"a":0.7}
               },
               {"ratio":0.8350000000000001,"color":{
                 "r":233,"g":153,"b":0,"a":0.7}
               },
               {"ratio":0.9175000000000001,"color":{
                 "r":244,"g":204,"b":0,"a":0.7}
               },
               {"ratio":1,"color":{
                 "r":255,"g":255,"b":0,"a":0.7}
               }
];


