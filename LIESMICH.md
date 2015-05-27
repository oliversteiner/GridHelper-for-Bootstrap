_Deutsch_
# GridHelper für Bootstrap
[DEMO](http://mollo.ch/projects/gridhelper/)

## Beschreibung
Mit Clicki-Bunti das Bootstrap Grid-System testen und ausprobieren.

## Installation
Kopiere das css- und js-Verzeichnis in deine Webseite.
Verlinke das CSS und das Script im __HEAD__.

    <!-- GridHelper for Bootstrap -->
    <link rel="stylesheet" href="css/gridhelper.css">
    <script src="js/gridhelper.js"></script>

Beim Aufrufen deiner Seite siehst du nun einen Start-Knopf oben in der Mitte.
Click auf ihn um das GridHelper-System zu aktivieren.
Du kannst das Startverhalten des Scripts ändern, indem du die _optionen_ anpasst.

__Das Script ist nur zum Entwicklen und Testen von Webseiten gedacht. Entferne es, wenn du mit der Webseite fertig bist.__


## Optionen
Die Optionen findest du in der Datei _js/griphelper.js_.

	var options = {
	    start: 'auto',
	    position: 'center',
	    popover_trigger: 'click'
	};


## Start-Optionen
###  start:  auto | click | silent 
 * auto	-	automatisch alle Panels aktivieren.
 * click -	nur den "Einblenden-Knopf" angezeigen. 
 * silent -	Script unsichtbar. Zum aktivieren in der Console eingeben: `gridhelper.go()`

### position:  left | center | right
 * Position des "Einblenden-Knopfs"

### popover_trigger:  click | hover | focus | manual.
 * Wie das PopOver erscheint und verschwindet

## Browsers
GridHelper wurde auf diesen Browsern erfolgreich getestet.

### Desktop Browsers
* Google Chrome 14.0+
* Apple Safari 4.0+
* Mozilla Firefox 4.0+
* Opera 10.0+
* Microsoft Internet Explorer 7.0+

### Mobile Browsers
* Apple Safari on iOS 6.0+
* Google Chrome on iOS 6.0+
* Google Chrome on Android 4.0+
* Default Browser on Android 2.3+
* Opera Mobile 12.0+

##Lizenz
Die Software ist Open Source und steht unter der MIT Lizenz.
Verwendung unter eigener Gefahr. 
Für Kinder unter 5 Jahren nicht geeignet, enthält schwerverdauliche Codestücke.

## Credits
Ein grosser Dank geht an: http://stackoverflow.com/
