/**
 * Created by taskaris on 2017-07-13.
 */

var contextmenu_items;
var contextmenu;

function init_contexmenu() {

    contextmenu_items = [];

    contextmenu = new ContextMenu({
        width: 180,
        items: contextmenu_items
    });
    map.addControl(contextmenu);

    map.on('pointermove', function (e) {
        if (e.dragging) return;

        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);

        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

}

var dynamic_BstrapModal = function (title, body, buttons) {
    var title = title || 'Title no defined...';

    var body = body || '<h1>Body no defined...</h1>';

    var buttons = buttons || [{
        Value: 'CLOSE',
        Css: 'btn-primary',
        Callback: function (event){
            dynamic_BstrapModal.Close();
        }
    }];

    var GetModalStructure = function () {
        var that = this;
        that.Id = dynamic_BstrapModal.Id = Math.random();

        var buttonshtml = "";
        for (var i = 0; i < buttons.length; i++) {
            buttonshtml += "<button type='button' class='btn " + (buttons[i].Css||"") + "' name='btn" + that.Id + "'>" + (buttons[i].Value||"CLOSE") + "</button>";
        }

        return "<div class='modal fade' name='layer_dynamiccustommodal' id='" + that.Id + "' tabindex='-1' role='dialog' data-backdrop='static' data-keyboard='false' aria-labelledby='" + that.Id + "Label'>" +
            "<div class='modal-dialog'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<button type='button' class='close modal-white-close' onclick='dynamic_BstrapModal.Close()'>" +
            "<span aria-hidden='true'>&times;</span>" +
            "</button>" +
            "<h4 class='modal-title'>" + title + "</h4></div>" +
            "<div class='modal-body'> " +
            "<div class='row'>" +
            "<div class='col-xs-12 col-md-12 col-sm-12 col-lg-12'>" + body +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='modal-footer bg-default'> " +
            "<div class='col-xs-12 col-sm-12 col-lg-12'>" + buttonshtml + "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    }();

    dynamic_BstrapModal.Delete = function () {
        var modals = document.getElementsByName("layer_dynamiccustommodal");
        if (modals.length > 0) document.body.removeChild(modals[0]);
    };
    dynamic_BstrapModal.Close = function () {
        $(document.getElementById(dynamic_BstrapModal.Id)).modal('hide');
        dynamic_BstrapModal.Delete();
    };
    this.Show = function () {
        dynamic_BstrapModal.Delete();
        document.body.appendChild($(GetModalStructure)[0]);
        var btns = document.querySelectorAll("button[name='btn" + dynamic_BstrapModal.Id + "']");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", buttons[i].Callback || dynamic_BstrapModal.Close);
        }
        $(document.getElementById(dynamic_BstrapModal.Id)).modal('show');
    };
}

init_contexmenu();








