/**** (function) fn_host:get host name of the application****/

/**
 * Define a namespace for the application.
 */
window.app = {};
var app = window.app;

function fn_host()
{
    var _scheme=window.location.protocol;

    var _host=window.location.host;

    var _path=window.location.pathname;

    var host=_scheme+"//"+_host+_path;

    host=host.replace(/[^\/]*$/, '');

    return host;

}

var host=fn_host();

/***(var) loader_script_urls: stores all the external js script urls to be included*****/
var loader_script_urls=[
    "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
];

/***(var) loader_css_files: stores all the external css (styles) urls to be included*****/
var loader_css_urls=[
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
];

/***(var) loader_script_files: stores all the internal js script urls to be included*****/
var loader_script_files=[
    "lib/ol3/v4.2.0/build/ol.js",
    "lib/ol3-contextmenu-master/build/ol3-contextmenu.js",
    "lib/bootstrap-waitingfor-master/build/bootstrap-waitingfor.js",
    "js/config.js",
    "js/core/map.js",
    "js/core/contextmenu.js",
    "js/core/modules/wms/wms.js",
    "js/core/modules/basemap/basemap.js",
    "js/core/modules/layers/layers.js",
    "js/core/modules/legend/legend.js",
    "js/core/modules/mapcenter/mapcenter.js",
    "js/core/modules/addmarker/addmarker.js",
    "js/core/modules/measure/measure.js",
    "js/core/modules/info/info.js"
];

/***(var) loader_css_files: stores all the internal css (styles) urls to be included*****/
var loader_css_files=[
    "lib/ol3/v4.2.0/css/ol.css",
    "lib/ol3-contextmenu-master/build/ol3-contextmenu.min.css",
    "css/main.css"
];

/***(function) init_loader_files: appends all the script and css files to the header****/
/*** of the application: loader_script_urls, loader_script_files, loader_css_files *****/
function init_loader_files()
{

    var URLscriptTags = new Array(loader_script_urls.length);

    for (var i=0, len=loader_script_urls.length; i<len; i++)
    {
        URLscriptTags[i] = "<script src='"+loader_script_urls[i]+"'></script>";
    }

    if (URLscriptTags.length > 0)
    {
        document.write(URLscriptTags.join(""));
    }

    var cssTags = new Array(loader_css_urls.length);

    for (var i=0, len=loader_css_urls.length; i<len; i++)
    {
        cssTags[i] = "<link rel='stylesheet' type='text/css' href='" + loader_css_urls[i] +"' />";
    }

    if (cssTags.length > 0)
    {
        document.write(cssTags.join(""));
    }

    var cssTags = new Array(loader_css_files.length);

    for (var i=0, len=loader_css_files.length; i<len; i++)
    {
        cssTags[i] = "<link rel='stylesheet' type='text/css' href='" + host + loader_css_files[i] +"' />";
    }

    if (cssTags.length > 0)
    {
        document.write(cssTags.join(""));
    }

    var scriptTags = new Array(loader_script_files.length);

    for (var i=0, len=loader_script_files.length; i<len; i++)
    {
        scriptTags[i] = "<script type='text/javascript' src='" + host + loader_script_files[i] +"'></script>";
    }

    if (scriptTags.length > 0)
    {
        document.write(scriptTags.join(""));
    }

}

/**executes the init_loader_files function**/
init_loader_files();

