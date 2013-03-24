commonInfo = null
function getTime(){
	if(!commonInfo)
		return (new Date());
	now = new Date();
	now.setTime(now.getTime() + commonInfo.offsetMS);
	return now;
}
//should be called right after commonInfo is updated
function checkTime(){
	if(!commonInfo)
		return;
	console.log("Checktime");
	now = new Date();
	server = new Date(commonInfo.serverTime)
	if(server.getTime() < now.getTime()-1000 || 
	   server.getTime() > now.getTime()+10000 ){
		$("#warning").text("Warning: Server time was " + ((server - now)/1000.0) + " seconds before client time while sending the page, all clocks may be incorrect.");
		console.log("SetW" + now+  commonInfo.serverTime+ server+ "Warning: Server time " + ((server - now)/1000.0) + " seconds off, all clocks will be incorrect." );
	}else{
		$("#warning").text("");
	}
		//$("#warning").text("Warning: Server time " + ((server - now)/1000.0) + " seconds off, all clocks will be incorrect.");

}
function pad (str, max) {
  return str.length < max ? pad("0" + str, max) : str;
}
function formatTime(time){
 	return pad(""+time.getHours(), 2)+":" + pad(""+time.getMinutes(), 2) + ":" + pad(""+time.getSeconds(), 2);
}
function splitms(ms){
 	msa = Math.abs(ms);
 	h = Math.floor(msa / 3600000);
 	m = Math.floor((msa-h*3600000)/60000);
	s = Math.round((msa-(h*3600000)-(m*60000))/1000);
 	return new Array(ms<0,h,m,s);
}
function formatms(ms){
 	hms = splitms(ms);
 	return (hms[0]?"-":"") + pad("" + hms[1], 2) + ":"+pad(""+  hms[2], 2)+ ":" +pad("" + hms[3], 2);
}
function parsetime(timestr){
 	time = new Date()
 	splitted = timestr.split(":")
 	time.setHours(splitted[0]);
 	time.setMinutes(splitted[1]);	
 	time.setSeconds(splitted[2]);
 	//console.log((new Date())+"--"+time+ ";;"+(Math.abs((new Date())-time))/60000+";;;"+splitms(Math.abs((new Date())-time)));//Math.abs((new Date())-time));
	return time;
};
