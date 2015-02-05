var XHR = (function(){

    var module = {};

    module._init = function(){
        return new XMLHttpRequest();
    };

    module._onready = function(xmlthttp, callback) {
        xmlthttp.onreadystatechange = function(){
            if (xmlthttp.status === 200 && xmlthttp.readyState === 4) {
                callback(JSON.parse(xmlthttp.responseText));
            }
        };
    };

    module.get = function(data, callback) {
        var xmlthttp = module._init();
        xmlthttp.open('GET', data.url, true);
        xmlthttp.send();

        module._onready(xmlthttp, callback);
    };

    return {
        get: module.get,
    }

}());
