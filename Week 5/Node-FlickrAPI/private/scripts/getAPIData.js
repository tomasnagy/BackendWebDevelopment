/**
 * Created by tomasnagy on 24/10/14.
 */
var getAPIData = function() {
    var http = require('http'),
        options = {
        method: 'GET',
        port: 80,
        host: 'api.flickr.com',
        path: '/services/feeds/photos_public.gne?format=json&tags=NMCT&jsoncallback=?'
        },
        clean = function(data) {
            var result;
            result = data.substring(1, data.length - 1);
            result = result.replace(/\\\'/g, '');
            return result;
        },
        callAPI = function(search, callback) {
            options.path = '/services/feeds/photos_public.gne?format=json&tags=' + search + '&jsoncallback=?';
            console.log(options);
            http.request(options, function(response) {
                var json = '';

                response.on('data', function(chunk) {
                   json += chunk;
                });

                response.on('end', function() {
                    callback(JSON.parse(clean(json)));
                });
            }).end();

        };

    return {
        callAPI: callAPI,
        options: options
    };
}();

module.exports = getAPIData;