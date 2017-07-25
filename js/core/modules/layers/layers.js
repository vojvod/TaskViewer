/**
 * Created by taskaris on 2017-07-13.
 */

function init_layers() {

    var menuitem = {
        text: 'Layers',
        icon: './img/layers.png',
        items: []
    };

    for (var key in _config._maplayers) {

        var ly = _config._maplayers[key]._layer;
        map.addLayer(ly);

        menuitem.items.push({
            text: _config._maplayers[key]._layer.get('name'),
            icon: 'img/layer.png',
            data: ly,
            callback: layer_options
        })

    }
    contextmenu_items.push(menuitem);

}

function layer_options(obj) {

    waitingDialog.show();

    var wms_service_url = obj.data.getSource().getUrls()[0];

    var parser = new ol.format.WMSCapabilities();

    fetch('proxy/proxy.php?url=' + wms_service_url + '&service=wms&version=1.3.0&request=GetCapabilities').then(function (response) {
        return response.text();
    }).then(function (text) {
        var result = parser.read(text);

        console.log(result);

        var d = '<div class="infowindow"><div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div>';

        d = d + '<div class="panel panel-default"><div class="panel-body">Basic panel example</div></div></div>';

        var _w = new dynamic_BstrapModal(obj.data.get('name'), d).Show();

        waitingDialog.hide();

    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        waitingDialog.hide();
    });


}

init_layers();