$(document).ready(function(){init={};cached={};fetchview_path=null;fetchview_time=0;path="api/";console.log("Starting hybridd-connect...");fetchview("login",{})});function fetchview(viewpath,args){if(fetchview_path!=viewpath){if(typeof args=="undefined"){args=false}initialize=function(data,accessor){var keys=accessor.split(".");var result=data;while(keys.length>0){var key=keys.shift();if(typeof result[key]!=="undefined"){result=result[key]}}return result};var cacheIdx="view:"+viewpath;var data=cacheGet(cacheIdx,6e5);if(!data){$.ajax({url:path+"v/"+viewpath,dataType:"json"}).done(function(data){cacheAdd(cacheIdx,data);activateview(viewpath,args,data);fetchview_path=viewpath})}else{if(fetchview_time<Date.now()-2e3){fetchview_time=Date.now();activateview(viewpath,args,data);fetchview_path=viewpath}}}}function activateview(viewpath,args,data){console.log("Activating view: "+viewpath);var hy_target=data["target"];var hy_view=LZString.decompressFromEncodedURIComponent(data["pack"]);$(hy_target).html(hy_view);if(typeof initialize!=="undefined"&&JSON.stringify(initialize)!="{}"){initialize(init,viewpath)(args)}}cacheAdd=function(index,data){cached[index]=[Date.now(),data]};cacheGet=function(index,millisecs){if(millisecs<100){millisecs=100}if(typeof cached[index]!="undefined"&&typeof cached[index][0]!="undefined"){if(cached[index][0]>Date.now()-millisecs){return cached[index][1]}else{delete cached[index];return null}}else{return null}};