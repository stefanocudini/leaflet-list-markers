Leaflet List Markers
============

#What
A Leaflet Control for listing visible markers/features in the map

Tested in Leaflet 0.7.1


#Where

**Demos:**  
[labs.easyblog.it/maps/leaflet-list-markers](http://labs.easyblog.it/maps/leaflet-list-markers/)

**Source code:**  
[Github](https://github.com/stefanocudini/leaflet-list-markers)

![Image](https://raw.githubusercontent.com/stefanocudini/leaflet-list-markers/master/images/list-markers.jpg)

#How
Include leaflet-list-markers.css to page

Adding the List control to the map:

```
map.addControl( new L.Control.ListMarkers({layer: markersLayer}) );
//markersLayer is a L.LayerGroup contains listing markers
```
short way:
```
var map = new L.Map('map', { listMarkersControl: {layer: markersLayer} });
```

#Build

Since Version 1.4.7 this plugin support [Grunt](http://gruntjs.com/) for building process.
Therefore the deployment require [NPM](https://npmjs.org/) installed in your system.
After you've made sure to have npm working, run this in command line:
```
npm install
grunt
```
