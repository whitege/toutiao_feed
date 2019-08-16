define('src/utils/index', function () {

    function request(params, callback) {
        var requestParams = {
                method: params.method || 'GET',
            };

        if (requestParams.method.toUpperCase() === 'POST') {
            requestParams['body'] = JSON.stringify(params.data || {});
        }

        return fetch(
                params.url,
                requestParams
            )
            .then(res => res.json())
            .then(res => {
                callback && callback(res);
            });
    }

    return {
        request: request
    };
});
