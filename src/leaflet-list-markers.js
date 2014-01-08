
(function() {

L.Control.ListMarkers = L.Control.extend({

	includes: L.Mixin.Events,

	options: {		
		layer: false,
		label: 'title',
		maxZoom: 9,
		position: 'bottomleft'
	},

	initialize: function(options) {
		L.Util.setOptions(this, options);

	},
	
    onAdd: function (map) {
    
    	this._map = map;
        	
        var container = L.DomUtil.create('div', 'leaflet-list-markers');

        this._button = L.DomUtil.create('a', 'list-button', container);
        this._button.href = '#';
		L.DomEvent
			.on(this._button, 'click', L.DomEvent.stop, this);

        return container;
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
