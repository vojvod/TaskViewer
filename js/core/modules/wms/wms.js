/**
 * Created by taskaris on 2017-07-13.
 */


function init_wms() {

    var menuitem = {
        text: 'Add WMS Layer',
        classname: 'bold',
        icon: './img/add_layers.png',
        // callback: center
    };

    contextmenu_items.push(menuitem);
    contextmenu_items.push('-');

}

init_wms();