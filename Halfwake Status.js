
// The purpose for this app is to prevent the codec from sleeping, which will in turn keep the camera x 
// from going into privacy position and stop capturing the image while in non-call/Idle state.  For this 
// application, the camera x input is being route to HDMI X output on the codec. The HDMI cable ouput is then
// routed into an 3rd party video recorder device.
// This app will provide several features, check for Halfwake status, get the system time Hour (0-23) of the 
// endpt, reset the Half Wake delay timer X minutes and set the camera to an active postion so it will continue
// capture the image it is set at. 
// The checking of the system time Hour is needed to only have the codec "up" during specific time of the day(i.e 7 AM 
// to 8 PM), then sleep during the off-hours. 
// If you want to comment out the camera position command, you will need to set the privacy postion to "none"
// in the Web Gui of the codec. Goto Setup > Configuration>Standby>StandbyAction
// If you want to keep this macro going all the time after being enable, make sure Setup>Configuration>
// Macro> Autostart is set to "on" (default), else you will need to enable after the device is 
// restarted or re-booted.
   

const xapi = require('xapi');

function log(entry) {
    console.log(entry);
}
log ('Half Wake State');

xapi.status.on('standby', status => {
    log ('checking standby state');
	  if (status.State == "Halfwake") {
			log ('The State is HalfWake!!!');
			var d = new Date();  // Getting System Date and Time
			console.log('the hour is =',d.getHours()); // logging the System Time Hour
			   if(d.getHours() >= 7 && d.getHours() <= 20) {	
					console.log('the HHHhour is =',d.getHours());	// double checking the hour 
	    log ('System going to HalfWake Status...Reset Timer Delay'); // the delay value max is 480 minutes or 8 hrs
				xapi.command ('standby resethalfwaketimer', {
          delay: 2
        });
				log('Set HDMI Input to HDMI Output on the codec');	// Logging HDMI connections
				xapi.command('Video Matrix Assign', {
              mode: 'replace',
              output: '1',  // HDMI Out # (TO EXTERNAL DEVICE)
              sourceId: '2'  // HDMI In # (CAMERA)
             });
        log ('Set Camera 2 to these index values');	
	     xapi.command ('Camera PositionSet',{    // code not needed if Privacy Postion set to none
	        CameraId: 2,
	        Focus: 4242,  // these values can be attained by running xstatus cameras, then set to what is needed
	        Lens: 'Wide',
	        Pan: 0,
	        Tilt: 0,
	        Zoom: '8000'
	        });   
	    xapi.status
       .get('Cameras Camera 2 position') // logging camera postion values
       .then((status) => {
        console.log(`Current HW Camera Position is Focus:${status.Focus}, Pan:${status.Pan}, Tilt:${status.Tilt}, Zoom: ${status.Zoom}`);
       });
	} else {
	    log ('System not in Halfwake state....');
	    xapi.status
       .get('Standby')  // log curent codec state if not in Half Wake 
       .then((status) => {
           console.log(`Current Standby status: ${status.State}`);
       });
	 }
	}
});

// Code created by Jerry Gavin Aug 19 2020