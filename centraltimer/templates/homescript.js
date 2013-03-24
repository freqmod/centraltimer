ajaxInfo = null;
function clearOutside(){
	sublockcountdown = $(".subblockcountdown")	
	sublocktarget = $(".subblocktarget")		
	sublockmessage = $(".subblockmessage")
	//Reset out of bounds messages - not working
	for(var i=Math.max(0,ajaxInfo.length-1);i<sublocktarget.length;i++){
		//console.log("Clear",i, sublockcountdown[i].innerHTML)
		sublockcountdown[i].innerHTML = sublocktarget[i].innerHTML = sublockmessage[i].innerHTML = "";
	}
}
function updateTimes(){
 	//console.log("updateTimes", ajaxInfo)
	var currentTime = getTime();
	sublockcountdown = $(".subblockcountdown")	
	sublocktarget = $(".subblocktarget")		
	$(".mainclock").text(formatTime(currentTime))
	if(ajaxInfo){
		if(typeof ajaxInfo[0] != 'undefined'){
			newms = (new Date(ajaxInfo[0].fields.target)) - currentTime;
			//console.log("InsideUpdatetime", newms)
			if(newms<0){
				for(var i=0;i<ajaxInfo.length-1;i++){
					ajaxInfo[i] = ajaxInfo[i+1];
				}
				ajaxInfo.splice(ajaxInfo.length - 1, 1);
				ajaxUpdate();
			}
			$(".maincountdown").text(formatms(newms));
		}
		
 		for(var i=0; i<Math.min(ajaxInfo.length-1, sublocktarget.length); i++){
			sublockcountdown[i].innerHTML = formatms((new Date(ajaxInfo[i+1].fields.target)) - currentTime);
		}
	}
	else{
		$(".maincountdown").text(formatms(parsetime($(".maintarget").text()) - currentTime));
		sublocktarget = $(".subblocktarget")
		for(var i = 0;i < sublockcountdown.length; i++){
			sublockcountdown[i].innerHTML = formatms(parsetime(sublocktarget[i].innerHTML) - currentTime);
		}
	}
}
timeoutInterval = null;
function resyncTimeout(){
 	setTimeout(function (){ 
		timeoutIntervalOld = timeoutInterval
		timeoutInterval = setInterval(function () { 
			if(timeoutIntervalOld != null){
				clearInterval(timeoutIntervalOld);
				timeoutIntervalOld = null;
			}
			updateTimes();
	 	}, 1000);
	 	
	}, 1003 - getTime().getMilliseconds());
}
 
function ajaxUpdate(){
 	curSec = getTime().getSeconds();
 	if(curSec < 5 || (curSec > 30 && curSec < 35)){
 		resyncTimeout();
 	}
 	//console.log("Tryajax")
	$.ajax({
	  url: "{%url centraltimer.views.homeajax %}",
	}).done(function ( data ) {
		$("#ajaxWarning").text("");
	  /*if( console && console.log ) {
	    console.log("Sample of data:", data.slice(0, 100));
	  }*/
        ajaxInfo = data.targets;
        commonInfo = data.commonInfo;
		//console.log("Homeajax", ajaxInfo)
		if(typeof ajaxInfo[0] != 'undefined'){
			$(".maintarget").text(formatTime(new Date(ajaxInfo[0].fields.target)));
			$(".mainmessage").text(ajaxInfo[0].fields.name);
		}
   		sublockmessage = $(".subblockmessage")
   		sublocktarget = $(".subblocktarget")
		for(var i=1; i<Math.min(ajaxInfo.length, sublockmessage.length+1); i++){
			sublockmessage[i-1].innerHTML = ajaxInfo[i].fields.name;
			sublocktarget[i-1].innerHTML = formatTime(new Date(ajaxInfo[i].fields.target));
		}
		ajaxInfo = ajaxInfo;
		checkTime();
		updateTimes();
		clearOutside();
	}).error(function (data){
		$("#ajaxWarning").text("Warning: Error while getting update from server. Deadlines may be outdated.");
	});
}
function updateTime() {
 	var currentTime = getTime();
	var targetTime = new Date(parsetime($(".maintarget").text()));
	$(".maincountdown").text(formatTime(new Date(targetTime - currentTime)));	
	$(".mainclock").text(formatTime(currentTime))
}
