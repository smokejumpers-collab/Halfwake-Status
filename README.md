
The purpose for this app is to prevent the codec from sleeping, which will in turn keep the camera x 
from going into privacy position and stop capturing the image while in non-call/Idle state.  For this 
application, the camera x input is being route to HDMI X output on the codec. The HDMI cable ouput is then
routed into an 3rd party video recorder device.
This app will provide several features, check for Halfwake status, get the system time Hour (0-23) of the 
endpt, reset the Half Wake delay timer X minutes and set the camera to an active postion so it will continue
capture the image it is set at. 
The checking of the system time Hour is needed to only have the codec "up" during specific time of the day(i.e 7 AM 
to 8 PM), then sleep during the off-hours. 
If you want to comment out the camera position command, you will need to set the privacy postion to "none"
in the Web Gui of the codec. Goto Setup > Configuration>Standby>StandbyAction
If you want to keep this macro going all the time after being enable, make sure Setup>Configuration>
Macro> Autostart is set to "on" (default), else you will need to enable after the device is 
restarted or re-booted.
