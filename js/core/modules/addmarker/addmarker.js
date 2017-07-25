/**
 * Created by taskaris on 2017-07-13.
 */

var vectorLayer_marker;

function init_addmarker() {

    vectorLayer_marker = new ol.layer.Vector({
        title: 'mapmarker',
        source: new ol.source.Vector()
    });

    map.addLayer(vectorLayer_marker);

    var menuitem = {
        text: 'Add a Marker',
        icon: 'img/pin_drop.png',
        callback: marker
    };

    var removeMarkerItem = {
        text: 'Remove this Marker',
        classname: 'marker',
        callback: removeMarker
    };

    contextmenu_items.push(menuitem);

    contextmenu.on('open', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (ft, l) {
            return ft;
        });
        if (feature && feature.get('type') === 'removable') {
            contextmenu.clear();
            removeMarkerItem.data = {marker: feature};
            contextmenu.push(removeMarkerItem);
        } else {
            contextmenu.clear();
            contextmenu.extend(contextmenu_items);
            contextmenu.extend(contextmenu.getDefaultItems());
        }
    });

}

function marker(obj) {
    var coord4326 = ol.proj.transform(obj.coordinate, map.getView().getProjection().getCode(), 'EPSG:4326'),
        template = 'Coordinate is ({x} | {y})',
        iconStyle = new ol.style.Style({
            image: new ol.style.Icon({scale: .6, src: 'img/pin_drop.png'}),
            text: new ol.style.Text({
                offsetY: 25,
                text: ol.coordinate.format(coord4326, template, 2),
                font: '15px Open Sans,sans-serif',
                fill: new ol.style.Fill({color: '#111'}),
                stroke: new ol.style.Stroke({color: '#eee', width: 2})
            })
        }),
        feature = new ol.Feature({
            type: 'removable',
            geometry: new ol.geom.Point(obj.coordinate)
        });

    feature.setStyle(iconStyle);
    vectorLayer_marker.getSource().addFeature(feature);
}

function removeMarker(obj) {
    vectorLayer_marker.getSource().removeFeature(obj.data.marker);
}


init_addmarker();