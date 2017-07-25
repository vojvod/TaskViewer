/**
 * Created by taskaris on 2017-07-13.
 */

function init_mapcenter() {

    var menuitem = {
        text: 'Center map here',
        classname: 'bold',
        icon: 'img/center.png',
        callback: center
    };

    contextmenu_items.push(menuitem);

}

// from https://github.com/DmitryBaranovskiy/raphael
function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}

function center(obj) {
    view.animate({
        duration: 700,
        easing: elastic,
        center: obj.coordinate
    });
}

init_mapcenter();