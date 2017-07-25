/**
 * Created by taskaris on 2017-07-13.
 */

var _config = {

    _initCenter: [22.91885375657, 40.627112485552],
    _initZoom: 12,

    _mapControls: {
        attribution: new ol.control.Attribution(),
        mouseposition: new ol.control.MousePosition({
            undefinedHTML: 'outside',
            projection: 'EPSG:4326',
            coordinateFormat: function (coordinate) {
                return ol.coordinate.format(coordinate, '{x}, {y}', 4);
            }
        }),
        overviewmap: new ol.control.OverviewMap({
            collapsed: false
        }),
        rotate: new ol.control.Rotate({
            autoHide: false
        }),
        scalelune: new ol.control.ScaleLine(),
        zoom: new ol.control.Zoom(),
        zoomslider: new ol.control.ZoomSlider(),
        zoomtoextent: new ol.control.ZoomToExtent({
            tipLabel: 'Full Extent'
            // extent: [minx, miny, maxx, maxy]
        }),
        // fullscreen: new ol.control.FullScreen()
    },

    _basemapLayers: [
        {
            _layer: new ol.layer.Tile({
                id: 'osm',
                name: 'Openstreetmap',
                showLegend: false,
                icon: 'img/earth.png',
                opacity: 1,
                preload: Infinity,
                source: new ol.source.OSM({
                    crossOrigin: 'anonymous'
                }),
                visible: true
            })
        },
        {
            _layer: new ol.layer.Tile({
                id: 'BingMapRoad',
                name: 'Bing Road',
                showLegend: false,
                visible: false,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'AnnNf-a6hyii2J5HD-rusp0BccjsFUPgMVDvmt-CRs2n2Zaja8GMzlybRTnv0DkW',
                    imagerySet: 'Road',
                    crossOrigin: 'anonymous'
                }),
                icon: 'img/earth.png',
                opacity: 1
            })
        },
        {
            _layer: new ol.layer.Tile({
                id: 'BingMapAerial',
                name: 'Bing Aerial',
                showLegend: false,
                visible: false,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'AnnNf-a6hyii2J5HD-rusp0BccjsFUPgMVDvmt-CRs2n2Zaja8GMzlybRTnv0DkW',
                    imagerySet: 'Aerial',
                    crossOrigin: 'anonymous'
                }),
                icon: 'img/earth.png',
                opacity: 1
            })
        },
        {
            _layer: new ol.layer.Tile({
                id: 'BingMapAerialWithLabels',
                name: 'Bing hybrid',
                showLegend: false,
                visible: false,
                preload: Infinity,
                source: new ol.source.BingMaps({
                    key: 'AnnNf-a6hyii2J5HD-rusp0BccjsFUPgMVDvmt-CRs2n2Zaja8GMzlybRTnv0DkW',
                    imagerySet: 'AerialWithLabels',
                    crossOrigin: 'anonymous'
                }),
                isBaseLayer: true,
                icon: 'img/earth.png',
                opacity: 1
            })
        },
        {
            _layer: new ol.layer.Vector({
                id: 'blank',
                name: 'blank',
                showLegend: false,
                icon: 'img/earth.png',
                opacity: 1,
                preload: Infinity,
                visible: false
            })
        }
    ],

    _maplayers: [
        {
            _layer: new ol.layer.Tile({
                id: 'layer_1',
                name: 'layer 1',
                showLegend: true,
                source: new ol.source.TileWMS({
                    url: 'http://dev2.getmap.gr:18093/geoserver/wms',
                    params: {
                        'LAYERS': 'WFD_geodata_50K:dimotikes_topikes_koinotites',
                        'TILED': true
                    },
                    serverType: 'geoserver'
                })
            })
        },
        {
            _layer: new ol.layer.Tile({
                id: 'layer_2',
                name: 'layer 2',
                showLegend: true,
                source: new ol.source.TileWMS({
                    url: 'http://dev2.getmap.gr:18093/geoserver/wms',
                    params: {
                        'LAYERS': 'WFD_geodata_50K:apokentromenes_dioikiseis',
                        'TILED': true
                    },
                    serverType: 'geoserver'
                })
            })
        },
        {
            _layer: new ol.layer.Tile({
                id: 'layer_3',
                name: 'layer 3',
                showLegend: true,
                source: new ol.source.TileWMS({
                    url: 'http://dev2.getmap.gr:18093/geoserver/wms',
                    params: {
                        'LAYERS': 'WFD_geodata_50K:egy_rb_new_2014',
                        'TILED': true
                    },
                    serverType: 'geoserver'
                })
            })
        }

    ]

};
