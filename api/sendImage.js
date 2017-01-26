const Q       = require('q');
const fs      = require('fs');
const lib     = require('../lib/functions.js');
const path    = require('path');
const spawn   = require('child_process').spawnSync;
const request = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        apiKey,
        image,
        locale,
        language,
        deviceId,
        latitude,
        longitude,
        altitude,
        ttl,
        focusX,
        focusY
    } = req.body.args;

    let required = lib.parseReq({apiKey, image, locale});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required);

    let params = lib.clearArgs({
        'image_request[remote_image_url]': image,
        'image_request[locale]': locale,
        'image_request[language]': language,
        'image_request[device_id]': deviceId || lib.uuid(),
        'image_request[latitude]': latitude,
        'image_request[longitude]': longitude,
        'image_request[altitude]': altitude,
        'image_request[ttl]': ttl,
        'focus[x]': focusX,
        'focus[y]': focusY
    });

    let bodyString = '';

    for(let p in params) bodyString += `&${p}=${lib.encode(params[p])}`;

    request({
        method: 'POST',
        uri: 'http://api.cloudsight.ai/image_requests',
        headers: {
            'Authorization': 'CloudSight ' + apiKey
        },
        body: bodyString
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode)) {
            defered.resolve(lib.safeParse(reslut));
        } else { 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));
        }
    });

    return defered.promise;
}