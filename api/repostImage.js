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
        token
    } = req.body.args;

    let required = lib.parseReq({apiKey, token});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required);

    request({
        method: 'POST',
        uri: `https://api.cloudsightapi.com/image_requests/${token}/repost`,
        headers: {
            'Authorization': 'CloudSight ' + apiKey
        },
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode)) {
            defered.resolve(lib.safeParse(reslut));
        } else { 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));
        }
    });

    return defered.promise;
}