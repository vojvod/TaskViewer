/**
 * Created by taskaris on 2017-07-13.
 */

function init_basemap() {

    var menuitem = {
        text: 'Change Basemap',
        icon: './img/change_basemap.png',
        items: []
    };

    var basemapgrouplayers = new ol.layer.Group({
        title: 'basemaps',
        layers: []
    });


    for(var key in _config._basemapLayers)
    {

        basemapgrouplayers.get('layers').push(_config._basemapLayers[key]._layer);

        menuitem.items.push({
            text: _config._basemapLayers[key]._layer.get('name'),
            icon: 'img/earth.png',
            data: _config._basemapLayers[key]._layer.get('id'),
            callback: change_basemap
        })

    }

    map.addLayer(basemapgrouplayers);

    contextmenu_items.push(menuitem);

}

function change_basemap(obj){

    var j = map.getLayerGroup().getLayers();

    j.forEach(function (item) {

        if(item.get('title') == 'basemaps'){

            var basemap_layers = item.getLayers();

            basemap_layers.forEach(function (l) {

                if(l.get('id') == obj.data){
                    l.setVisible(true);
                }
                else{
                    l.setVisible(false);
                }

            });

        }

    })
}

init_basemap();