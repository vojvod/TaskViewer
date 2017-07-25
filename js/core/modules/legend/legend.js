/**
 * Created by taskaris on 2017-07-13.
 */

function init_legend() {

    // app.CustomLegend = function(opt_options) {
    //
    //     var options = opt_options || {};
    //
    //     var button = document.createElement('button');
    //     button.innerHTML = 'L';
    //
    //     var handleLegend = function(e) {
    //         console.log('simos');
    //     };
    //
    //     button.addEventListener('click', handleLegend, false);
    //     button.addEventListener('touchstart', handleLegend, false);
    //
    //     var element = document.createElement('div');
    //     element.className = 'ol-unselectable ol-mycontrol';
    //     element.appendChild(button);
    //
    //     ol.control.Control.call(this, {
    //         element: element,
    //         target: options.target
    //     });
    //
    // };
    //
    // ol.inherits(app.CustomLegend, ol.control.Control);
    //
    // map.addControl(new app.CustomLegend());

    var menuitem = {
        text: 'Show Legend',
        icon: './img/legend.png',
        callback: showlegend
    };

    contextmenu_items.push(menuitem);
    contextmenu_items.push('-');

}

function showlegend() {

    waitingDialog.show();

    var j = map.getLayerGroup().getLayers().getArray();

    var d = '<div>';

    for (var i = 0; i < j.length; i++) {
        if (j[i] instanceof ol.layer.Group) {
            var layersFromGroup = j[i].getLayers().getArray();
            for (var k = 0; k < layersFromGroup.length; k++) {

                if (layersFromGroup[k].get('showLegend') === true) {
                    try {
                        var url = layersFromGroup[k].getSource().getUrls()[0];
                    } catch (err) {
                        var url = layersFromGroup[k].getSource().getUrl();
                    }
                    var legendImg = document.createElement('img');
                    legendImg.src = url + '?REQUEST=GetLegendGraphic&sld_version=1.0.0&layer=' + layersFromGroup[k].getSource().getParams().LAYERS + '&format=image/png';

                    d = d + '<img src="' + legendImg.src + '" >' + '<br>';
                }

            }
        } else {

            if (j[i].get('showLegend') === true) {
                try {
                    var url = j[i].getSource().getUrls()[0];
                } catch (err) {
                    var url = j[i].getSource().getUrl();
                }
                var legendImg = document.createElement('img');
                legendImg.src = url + '?REQUEST=GetLegendGraphic&sld_version=1.0.0&layer=' + j[i].getSource().getParams().LAYERS + '&format=image/png';

                d = d + '<img src="' + legendImg.src + '" >' + '<br>';
            }
        }
    }

    var _w = new dynamic_BstrapModal('Legend', d).Show();

    waitingDialog.hide();

}

init_legend();