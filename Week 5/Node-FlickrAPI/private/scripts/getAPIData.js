/**
 * Created by tomasnagy on 24/10/14.
 */
var getAPIData = function(search) {
    var options = {
        method: 'GET',
        port: 80,
        host: 'api.flickr.com',
        path: '/services/feeds/photos_public.gne?format=json&tags=' + search + '&jsoncallback=?'
        },
        callAPI = function(search, req, res) {
            http.request(options, function(response) {
                var json = '';

                response.on('data', function(chunk) {
                   json += data;
                });

                response.on('end', function() {
                    console.log('data: ', json);
                });
            }).end();
        };

    return {
        callAPI: callAPI,
        options: options
    };
}();

module.exports = getAPIData;