$(function(){!function(){var e=2e3;$("body").on("click",".assemblies-upload-ready-button",function(){console.log("[WGST] Getting ready to upload assemblies and metadata"),window.WGST.geo.map.markers.metadata.setMap(null),window.WGST.exports.removePanel("assembly-upload-navigation"),window.WGST.exports.removePanel("assembly-upload-metadata"),window.WGST.exports.removePanel("assembly-upload-analytics"),window.WGST.exports.removeFullscreen("collection-map"),window.WGST.exports.removeHidable("collection-map"),WGST.dragAndDrop.files=[];window.WGST.exports.showBackground("uploading");var o="";setTimeout(function(){$.ajax({type:"POST",url:"/collection/add/",datatype:"json",data:{collectionId:o,userAssemblyIds:Object.keys(window.WGST.upload.fastaAndMetadata)}}).done(function(e){var o=e.collectionId,s=e.userAssemblyIdToAssemblyIdMap;console.debug("mapAssemblyIdToUserAssemblyId:"),console.dir(s),WGST.upload.collection[o]={},WGST.upload.collection[o].notifications={assembly:{},all:{},tree:!1};var a=[];$.each(s,function(e){var l=s[e];"undefined"!=typeof window.WGST.upload.fastaAndMetadata[l]&&a.push([o,e,window.WGST.upload.fastaAndMetadata[l]]),console.log("=============================================="),console.dir(a),console.log(e)}),a.forEach(function(e){var o=e[0],s=e[1],a=e[2],t={},n=a.name;console.debug("userAssemblyId: "+n),console.dir(WGST.upload),console.debug("assemblyData: "),console.dir(a),t.collectionId=o,t.assemblyId=s,t.userAssemblyId=a.fasta.name,t.sequences=a.fasta.assembly,t.metadata={datetime:a.metadata.datetime,geography:{position:{latitude:a.metadata.geography.position.latitude,longitude:a.metadata.geography.position.longitude},address:a.metadata.geography.address},source:a.metadata.source},l(t)})}).fail(function(e,o,s){console.error("[WGST][Error] Failed to get collection id"),console.error(o),console.error(s),console.error(e)})},e)});var o=0,s=5,a=2e3,l=function(e){s>o?(console.log("[WGST] Uploading "+e.assemblyId+" assembly"),o+=1,e.socketRoomId=WGST.socket.roomId,console.log("About to upload assembly:"),console.dir(e),$.ajax({type:"POST",url:"/assembly/add/",datatype:"json",data:e}).done(function(){}).fail(function(e,o,s){console.log("[WGST][Error] Failed to send FASTA file object to server or received error message"),console.error(o),console.error(s),console.error(e),showNotification(o)})):setTimeout(l,a,e)};window.WGST.socket.connection.on("assemblyUploadNotification",function(e){if(!window.WGST.exports.isFullscreenExists("assembly-upload-progress")){var o=Object.keys(window.WGST.upload.fastaAndMetadata).length;window.WGST.exports.createFullscreen("assembly-upload-progress",{fullscreenId:"assembly-upload-progress",fullscreenType:"assembly-upload-progress",assemblyFileIds:Object.keys(window.WGST.upload.fastaAndMetadata),totalNumberOfAssembliesUploading:o}),window.WGST.exports.showFullscreen("assembly-upload-progress"),window.WGST.exports.hideBackground("uploading")}var s=e.collectionId,a=e.assemblyId,l=e.userAssemblyId,i=e.result,r=s+"__"+a+"__"+i,c=Object.keys(window.WGST.upload.fastaAndMetadata),p=Object.keys(window.WGST.assembly.analysis).length,u=p*c.length,m=Object.keys(window.WGST.collection.analysis).length,y=u+m;console.log("[WGST][Socket.io] Received assembly upload notification:"),console.log("[WGST][Socket.io] Assembly id: "+a),console.log("[WGST][Socket.io] Result: "+i),-1===Object.keys(window.WGST.upload.collection[s].notifications.all).indexOf(r)&&(window.WGST.upload.collection[s].notifications.all[r]="OK",console.debug("[WGST] » Received "+Object.keys(window.WGST.upload.collection[s].notifications.all).length+" out of "+y+" assembly results"),-1!==Object.keys(window.WGST.assembly.analysis).indexOf(i)&&t(a,l,p,i),n(s,l,a,y,i),y===Object.keys(window.WGST.upload.collection[s].notifications.all).length&&(console.log("[WGST] ✔ Finished uploading and processing new collection "+s),setTimeout(function(){window.WGST.exports.removeContainer("assembly-upload-progress"),d(),window.WGST.exports.getCollection(s)},1e3)))});var t=function(e,s,a,l){var t=$('.assembly-list-upload-progress tr[data-assembly-file-id="'+s+'"] '),n=t.find(".progress-bar"),d='<span class="glyphicon glyphicon-ok"></span>',i=parseFloat(t.find(".progress-bar").attr("aria-valuenow")),r=100/a,c=i+r;if(l===window.WGST.assembly.analysis.UPLOAD_OK?t.find(".assembly-upload-uploaded").html(d):l===WGST.assembly.analysis.MLST_RESULT?t.find(".assembly-upload-result-mlst").html(d):l===WGST.assembly.analysis.PAARSNP_RESULT?t.find(".assembly-upload-result-paarsnp").html(d):l===WGST.assembly.analysis.FP_COMP?t.find(".assembly-upload-result-fp-comp").html(d):l===WGST.assembly.analysis.CORE&&t.find(".assembly-upload-result-core").html(d),n.css("width",c+"%").attr("aria-valuenow",c),c>0&&n.text(Math.round(c)+"%"),c>=100){o-=1,t.find(".progress").removeClass("active").removeClass("progress-striped"),n.removeClass("progress-bar-info").addClass("progress-bar-success");var p=t.find(".assembly-upload-name").text();t.find(".assembly-upload-name").html('<a href="#" class="open-assembly-button" data-assembly-id="'+e+'">'+p+"</a>");var u=$(".assemblies-upload-processed");u.text(parseInt(u.text(),10)+1)}},n=function(e,o,s,a){var l=$(".assemblies-upload-progress").find(".progress-bar"),t=parseFloat(l.attr("aria-valuenow")),n=100/a,d=t+n;if(l.css("width",d+"%").attr("aria-valuenow",d),d>0&&l.text(Math.round(d)+"%"),d>=100&&l.addClass("progress-bar-success"),WGST.speak===!0&&d%30===0){var i=new SpeechSynthesisUtterance("Uploaded over "+d+" percent");window.speechSynthesis.speak(i)}},d=function(){window.WGST.upload.fastaAndMetadata={}}}()});