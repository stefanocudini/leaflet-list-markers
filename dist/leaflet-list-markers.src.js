/* 
 * Leaflet List Markers v0.0.1 - 2014-01-08 
 * 
 * Copyright 2014 Stefano Cudini 
 * stefano.cudini@gmail.com 
 * http://labs.easyblog.it/ 
 * 
 * Licensed under the MIT license. 
 * 
 * Demo: 
 * http://labs.easyblog.it/maps/leaflet-list-markers/ 
 * 
 * Source: 
 * git@github.com:stefanocudini/leaflet-list-markers.git 
 * 
 */

(function() {

L.Control.ListMarkers = L.Control.extend({

	includes: L.Mixin.Events,

	options: {		
		layer: false,
		maxItems: 20,
		collapsed: false,		
		label: 'title',
		iconUrl: L.Icon.Default.imagePath+'/marker-icon.png',
		itemArrow: '&#10148;',	//visit: http://character-code.com/arrows-html-codes.php
		maxZoom: 9,
		position: 'bottomleft'
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);
		this._container = null;
		this._list = null;
		this._layer = this.options.layer || new L.LayerGroup();
	},

	onAdd: function (map) {

		this._map = map;
	
		var container = this._container = L.DomUtil.create('div', 'list-markers');

		this._list = L.DomUtil.create('ul', 'list-markers-ul', container);

		this._initToggle();

		map.on('moveend', this._updateList, this);
			
		this._updateList();

		return container;
	},
	
	onRemove: function(map) {
		map.off('moveend', this._updateList, this);
		this._container = null;
		this._list = null;		
	},

	_createItem: function(layer) {

		var li = L.DomUtil.create('li', 'list-markers-li'),
			a = L.DomUtil.create('a', '', li);

		a.href = '#';
		L.DomEvent
			.disableClickPropagation(a)
			.on(a, 'click', L.DomEvent.stop, this)
			.on(a, 'click', function(e) {
				this._moveTo( layer.getLatLng() );
			}, this);
		
		//console.log('_createItem',layer.options);

		if( layer.options.hasOwnProperty(this.options.label) )
		{
			a.innerHTML = '<img src="'+this.options.iconUrl+'" />'+
					'<span>'+layer.options[this.options.label]+'</span> <b>'+this.options.itemArrow+'</b>';
			//TODO use related marker icon!
			//TODO use template for item
		}
		else
			console.log("propertyName '"+this.options.label+"' not found in marker");

		return li;
	},

	_updateList: function() {
	
		var that = this,
			n = 0;

		this._list.innerHTML = '';
		this._layer.eachLayer(function(layer) {
			if(layer instanceof L.Marker)
				if( that._map.getBounds().contains(layer.getLatLng()) )
					if(++n < that.options.maxItems)
						that._list.appendChild( that._createItem(layer) );
		});
	},

	_initToggle: function () {

		/* inspired by L.Control.Layers */

		var container = this._container;

		//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		if (!L.Browser.touch) {
			L.DomEvent
				.disableClickPropagation(container);
				//.disableScrollPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		if (this.options.collapsed)
		{
			this._collapse();

			if (!L.Browser.android) {
				L.DomEvent
					.on(container, 'mouseover', this._expand, this)
					.on(container, 'mouseout', this._collapse, this);
			}
			var link = this._button = L.DomUtil.create('a', 'list-markers-toggle', container);
			link.href = '#';
			link.title = 'List Markers';

			if (L.Browser.touch) {
				L.DomEvent
					.on(link, 'click', L.DomEvent.stop)
					.on(link, 'click', this._expand, this);
			}
			else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		}
	},

	_expand: function () {
		this._container.className = this._container.className.replace(' list-markers-collapsed', '');
	},

	_collapse: function () {
		L.DomUtil.addClass(this._container, 'list-markers-collapsed');
	},

    _moveTo: function(latlng) {
		if(this.options.maxZoom)
			this._map.setView(latlng, Math.min(this._map.getZoom(), this.options.maxZoom) );
		else
			this._map.panTo(latlng);    
    }
});

L.control.listMarkers = function (options) {
    return new L.Control.ListMarkers(options);
};

L.Map.addInitHook(function () {
    if (this.options.listMarkersControl) {
        this.listMarkersControl = L.control.listMarkers(this.options.listMarkersControl);
        this.addControl(this.listMarkersControl);
    }
});

}).call(this);
