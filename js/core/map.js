/**
 * Created by taskaris on 2017-07-13.
 */

var view;
var map;

function init_map() {

    view = new ol.View({
        center: ol.proj.fromLonLat(_config._initCenter),
        zoom: _config._initZoom
    });
    
    map = new ol.Map({
        target: 'map',
        view: view,
        layers: []
    });

    for(var key in _config._mapControls)
    {
        map.addControl(_config._mapControls[key]);
    }

}

init_map();