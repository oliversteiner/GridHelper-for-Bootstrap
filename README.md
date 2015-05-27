# GridHelper for Bootstrap

## Demo
[DEMO](http://mollo.ch/projects/gridhelper/)

## Description
An visual help for developing the bootstrap grid system 

## Setup
Copy the css and js directories to your website.
Include the stylesheet and the script in the head section of your webpage:

    <!-- GridHelper for Bootstrap -->
    <link rel="stylesheet" href="css/gridhelper.css">
    <script src="js/gridhelper.js"></script>

By default the script starts with a button on the top. Click it to activate.
You can customize the behavior of the script by changing the options.

__The script is only intended for development. Remove it when you're done.__


## Options
You find the Options on top of the file _js/griphelper.js_.

	var options = {
	    start: 'auto',
	    position: 'center',
	    popover_trigger: 'click'
	};

###  start:  auto | click | silent 
 * auto	-	Automatically enable all panels
 * click -	only display the "Show button"
 * silent -	Script invisible. To enable: type in Console: gridhelper.go()

### position:  left | center | right
 * position of the  "Show button"

### popover_trigger:  click | hover | focus | manual.
 * as the popover is triggered 


## Browsers
gridhelper has been tested with and supports the following browsers:

### Desktop browsers
* Google Chrome 14.0+
* Apple Safari 4.0+
* Mozilla Firefox 4.0+
* Opera 10.0+
* Microsoft Internet Explorer 7.0+

### Mobile browsers
* Apple Safari on iOS 6.0+
* Google Chrome on iOS 6.0+
* Google Chrome on Android 4.0+
* Default Browser on Android 2.3+
* Opera Mobile 12.0+

##License
Released under the MIT license.

## Credits
Many Thanks to http://stackoverflow.com/


# Deutsche Anleitung
---
###Installation

## Start-Optionen
###  start:  auto | click | silent 
 * auto	-	automatisch alle Panels aktivieren.
 * click -	nur den "Einblenden-Knopf" angezeigen. 
 * silent -	Script unsichtbar. Zum aktivieren in der Console eingeben: `gridhelper.go()`

### position:  left | center | right
 * Position des "Einblenden-Knopfs"

### popover_trigger:  click | hover | focus | manual.
 * Wie das PopOver mit den classennamen  ausgelöst wird 
