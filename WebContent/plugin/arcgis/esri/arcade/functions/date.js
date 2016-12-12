// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.
//>>built
define("esri/arcade/functions/date",["require","exports","../../moment","../languageUtils"],function(n,m,l,c){function k(c){return null===c?c:isNaN(c.getTime())?null:c}m.registerFunctions=function(g,h){g.today=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,0,0);b=new Date;b.setHours(0,0,0,0);return b})};g.now=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,0,0);return new Date})};g.timestamp=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,0,0);b=new Date;return b=new Date(b.getUTCFullYear(),
b.getUTCMonth(),b.getUTCDate(),b.getUTCHours(),b.getUTCMinutes(),b.getUTCSeconds(),b.getUTCMilliseconds())})};g.toutc=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?null:new Date(b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate(),b.getUTCHours(),b.getUTCMinutes(),b.getUTCSeconds(),b.getUTCMilliseconds())})};g.tolocal=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?null:l.utc([b.getFullYear(),b.getMonth(),b.getDate(),
b.getHours(),b.getMinutes(),b.getSeconds(),b.getMilliseconds()]).toDate()})};g.day=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?NaN:b.getDate()})};g.month=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?NaN:b.getMonth()})};g.year=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?NaN:b.getFullYear()})};g.hour=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,
1,1);b=c.toDate(a[0]);return null===b?NaN:b.getHours()})};g.second=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?NaN:b.getSeconds()})};g.millisecond=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?NaN:b.getMilliseconds()})};g.minute=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,1,1);b=c.toDate(a[0]);return null===b?NaN:b.getMinutes()})};g.weekday=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,
1,1);b=c.toDate(a[0]);return null===b?NaN:b.getDay()})};g.date=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,0,7);if(3===a.length)return k(new Date(c.toNumber(a[0]),c.toNumber(a[1]),c.toNumber(a[2]),0,0,0,0));if(4===a.length)return k(new Date(c.toNumber(a[0]),c.toNumber(a[1]),c.toNumber(a[2]),c.toNumber(a[3]),0,0,0));if(5===a.length)return k(new Date(c.toNumber(a[0]),c.toNumber(a[1]),c.toNumber(a[2]),c.toNumber(a[3]),c.toNumber(a[4]),0,0));if(6===a.length)return k(new Date(c.toNumber(a[0]),
c.toNumber(a[1]),c.toNumber(a[2]),c.toNumber(a[3]),c.toNumber(a[4]),c.toNumber(a[5]),0));if(7===a.length)return k(new Date(c.toNumber(a[0]),c.toNumber(a[1]),c.toNumber(a[2]),c.toNumber(a[3]),c.toNumber(a[4]),c.toNumber(a[5]),c.toNumber(a[6])));if(2===a.length){b=c.toString(a[1]);if(""===b)return null;a=l(c.toString(a[0]),b,!0);return!0===a.isValid()?a.toDate():null}if(1===a.length){if(c.isString(a[0])&&""===a[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""))return null;b=c.toNumber(a[0]);return!1===
isNaN(b)?k(new Date(b)):c.toDate(a[0])}if(0===a.length)return new Date})};g.datediff=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,2,3);b=c.toDateM(a[0]);d=c.toDateM(a[1]);if(null===b||null===d)return NaN;switch(c.toString(a[2]).toLowerCase()){case "days":case "day":case "d":return b.diff(d,"days",!0);case "months":case "month":return b.diff(d,"months",!0);case "minutes":case "minute":case "m":return"M"===a[2]?b.diff(d,"months",!0):b.diff(d,"minutes",!0);case "seconds":case "second":case "s":return b.diff(d,
"seconds",!0);case "milliseconds":case "millisecond":case "ms":return b.diff(d);case "hours":case "hour":case "h":return b.diff(d,"hours",!0);case "years":case "year":case "y":return b.diff(d,"years",!0);default:return b.diff(d)}})};g.dateadd=function(e,f){return h(e,f,function(b,d,a){c.pcCheck(a,2,3);b=c.toDateM(a[0]);if(null===b)return null;d="milliseconds";switch(c.toString(a[2]).toLowerCase()){case "days":case "day":case "d":d="days";break;case "months":case "month":d="months";break;case "minutes":case "minute":case "m":d=
"M"===a[2]?"months":"minutes";break;case "seconds":case "second":case "s":d="seconds";break;case "milliseconds":case "millisecond":case "ms":d="milliseconds";break;case "hours":case "hour":case "h":d="hours";break;case "years":case "year":case "y":d="years"}b.add(c.toNumber(a[1]),d);return b.toDate()})}}});