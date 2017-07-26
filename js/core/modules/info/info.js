/**
 * Created by taskaris on 2017-07-17.
 */

var callbacksimpleclickmouseinfo = function simpleclickmouseinfo (evt) {

    waitingDialog.show();

    var j = map.getLayerGroup().getLayers();
    var promises = [];
    var s = [];
    var inforesults = [];

    var coord4326 = ol.proj.transform(evt.coordinate, map.getView().getProjection().getCode(), 'EPSG:4326');

    var pointinfo_coords = ol.coordinate.format(coord4326, '{x}, {y}', 4);

    j.forEach(function (item) {
        if (item.get('title') != 'basemaps') {
            s.push({
                name: item.get('name'),
                source: item.getSource()
            });
        }
    });

    var viewResolution = /** @type {number} */ (view.getResolution());

    s.forEach(function (item) {
        try {
            var url = item.source.getGetFeatureInfoUrl(
                evt.coordinate,
                viewResolution,
                map.getView().getProjection().getCode(),
                {
                    'INFO_FORMAT': 'application/json'
                }
            );

            if (url) {
                promises.push($.getJSON('proxy/proxy.php?url=' + url.replace("?", "&")));
            }
        } catch (err) {
        }

    });

    $.when.apply($, promises).then(function () {

        var k = 0;

        for (var i = 0; i < arguments.length; i++) {
            inforesults.push(arguments[i][0]);
        }

        inforesults.forEach(function (item) {
            try {
                k = k + item.features.length;
            }
            catch (err) {
            }
        });

        if (k > 0) {


            var model = '<div><ul class="nav nav-tabs" role="tablist">';

            var s_i = true;

            var s_k = 0;

            inforesults.forEach(function (item) {

                if (s_i) {
                    s_i = false;
                    model = model + '<li role="presentation" class="active"><a href="#' + item.features[0].id.replace('.', '') + '" aria-controls="' + item.features[0].id.replace('.', '') + '" role="tab" data-toggle="tab">' + s[s_k].name + '</a></li>';
                }
                else {
                    model = model + '<li role="presentation" ><a href="#' + item.features[0].id.replace('.', '') + '" aria-controls="' + item.features[0].id.replace('.', '') + '" role="tab" data-toggle="tab">' + s[s_k].name + '</a></li>';
                }

                s_k++;

            });

            model = model + '</ul><div class="tab-content">';

            var s_j = true;

            inforesults.forEach(function (item) {

                var prop = item.features[0].properties;
                var tprop = '<div><table class="table"><tbody>';

                for (var key in prop) {
                    var value = prop[key];
                    tprop = tprop + '<tr><td><b>' + key + '</b></td><td>' + value + '</td></tr>';

                }

                tprop = tprop + '</tbody></table></div>';

                if (s_j) {
                    s_j = false;
                    model = model + '<div role="tabpanel" class="tab-pane active infowindow" id="' + item.features[0].id.replace('.', '') + '">' + tprop + '</div>';
                }
                else {
                    model = model + '<div role="tabpanel" class="tab-pane infowindow" id="' + item.features[0].id.replace('.', '') + '">' + tprop + '</div>';
                }

            });

            model = model + '</div></div>';

            waitingDialog.hide();

            var _w = new dynamic_BstrapModal('<b>Point Info Results: </b>' + pointinfo_coords, model).Show();

        }
        else {
            waitingDialog.hide();
        }
    });

};

map.on('singleclick',callbacksimpleclickmouseinfo);
