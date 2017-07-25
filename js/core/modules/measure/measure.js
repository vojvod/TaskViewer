/**
 * Created by taskaris on 2017-07-13.
 */

var measuredistancearea_vector;

var measuredistancearea_sketch;

var measuredistancearea_helpTooltipElement;

var measuredistancearea_helpTooltip;

var measuredistancearea_measureTooltipElement;

var measuredistancearea_measureTooltip;

var measuredistancearea_continuePolygonMsg ='Click to continue drawing the polygon';

var measuredistancearea_continueLineMsg = 'Click to continue drawing the line';

var measuredistancearea_pointerMoveHandler;

var measuredistancearea_formatLength;

var measuredistancearea_formatArea;

var measuredistancearea_draw;

var measuredistancearea_source;

function init_measure() {

    var wgs84Sphere = new ol.Sphere(6378137);

    measuredistancearea_source = new ol.source.Vector();

    measuredistancearea_vector = new ol.layer.Vector({
        source: measuredistancearea_source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });

    map.addLayer(measuredistancearea_vector);

    measuredistancearea_pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = 'Click to start drawing';

        if (measuredistancearea_sketch) {
            var geom = (measuredistancearea_sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = measuredistancearea_continuePolygonMsg;
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = measuredistancearea_continueLineMsg;
            }
        }

        measuredistancearea_helpTooltipElement.innerHTML = helpMsg;
        measuredistancearea_helpTooltip.setPosition(evt.coordinate);

        measuredistancearea_helpTooltipElement.classList.remove('hidden');
    };

    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    measuredistancearea_formatLength = function (line) {
        var length;
        var coordinates = line.getCoordinates();
        length = 0;
        var sourceProj = map.getView().getProjection();
        for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += wgs84Sphere.haversineDistance(c1, c2);
        }
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };

    /**
     * Format area output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    measuredistancearea_formatArea = function (polygon) {
        var area;
        var sourceProj = map.getView().getProjection();
        var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(sourceProj, 'EPSG:4326'));
        var coordinates = geom.getLinearRing(0).getCoordinates();
        area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    var menuitem = {
        text: 'Measurements',
        icon: './img/measure.png',
        items: [
            {
                text: 'Measure Distance',
                icon: './img/measure_distance.png',
                data: 'distance',
                callback: measure_distance_area
            },
            {
                text: 'Measure Area',
                icon: './img/measure_area.png',
                data: 'area',
                callback: measure_distance_area
            },
            '-',
            {
                text: 'Delete',
                icon: './img/delete.png',
                callback: delete_measurments
            }

        ]
    };

    contextmenu_items.push(menuitem);
    contextmenu_items.push('-');

}

function measure_distance_area(obj){

    var type = (obj.data == 'area' ? 'Polygon' : 'LineString');
    measuredistancearea_draw = new ol.interaction.Draw({
        source: measuredistancearea_source,
        type: /** @type {ol.geom.GeometryType} */ (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    map.addInteraction(measuredistancearea_draw);

    measuredistancearea_createMeasureTooltip();
    measuredistancearea_createHelpTooltip();

    var listener;
    measuredistancearea_draw.on('drawstart',
        function (evt) {
            // set sketch
            measuredistancearea_sketch = evt.feature;

            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = measuredistancearea_sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = measuredistancearea_formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = measuredistancearea_formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measuredistancearea_measureTooltipElement.innerHTML = output;
                measuredistancearea_measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    measuredistancearea_draw.on('drawend',
        function () {
            measuredistancearea_measureTooltipElement.className = 'tooltip tooltip-static';
            measuredistancearea_measureTooltip.setOffset([0, -7]);
            // unset sketch
            measuredistancearea_sketch = null;
            // unset tooltip so that a new one can be created
            measuredistancearea_measureTooltipElement = null;
            measuredistancearea_createMeasureTooltip();
            ol.Observable.unByKey(listener);

            map.removeInteraction(measuredistancearea_draw);
            map.getViewport().removeEventListener('mouseout', function () {
                measuredistancearea_helpTooltipElement.classList.add('hidden');
            });
            map.un('pointermove', measuredistancearea_pointerMoveHandler);
            map.removeOverlay(measuredistancearea_helpTooltip);
            map.removeOverlay(measuredistancearea_measureTooltip);

        }, this);

}

/**
 * Creates a new help tooltip
 */
function measuredistancearea_createHelpTooltip() {
    if (measuredistancearea_helpTooltipElement) {
        measuredistancearea_helpTooltipElement.parentNode.removeChild(measuredistancearea_helpTooltipElement);
    }
    measuredistancearea_helpTooltipElement = document.createElement('div');
    measuredistancearea_helpTooltipElement.className = 'tooltip hidden';
    measuredistancearea_helpTooltip = new ol.Overlay({
        element: measuredistancearea_helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(measuredistancearea_helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function measuredistancearea_createMeasureTooltip() {
    if (measuredistancearea_measureTooltipElement) {
        measuredistancearea_measureTooltipElement.parentNode.removeChild(measuredistancearea_measureTooltipElement);
    }
    measuredistancearea_measureTooltipElement = document.createElement('div');
    measuredistancearea_measureTooltipElement.className = 'tooltip tooltip-measure';
    measuredistancearea_measureTooltip = new ol.Overlay({
        element: measuredistancearea_measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measuredistancearea_measureTooltip);
}

function delete_measurments(){
    measuredistancearea_source.clear();
    var paras = document.getElementsByClassName('tooltip tooltip-static');
    while (paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
}



init_measure();