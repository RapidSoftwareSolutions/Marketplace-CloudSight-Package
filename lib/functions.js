const Q    = require('q');
const fs   = require('fs');
const path = require('path');

module.exports.callback = (gen) => {
    return function() {
        return Q.async(gen).apply(null, arguments).done();
    };
}

module.exports.encode = (str) => 
    encodeURIComponent(str).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));

module.exports.safeParse = (str) => {
    try {
        return JSON.parse(str)
    } catch(e) {
        return str;
    }
};

module.exports.json = (fields) => {
    for(let key in fields) {
        try {
            if(fields[key] && typeof fields[key] == 'string') fields[key] = JSON.parse(fields[key]);
        } catch(e) {
            throw new RapidError('JSON_VALIDATION');
        }
    }

    return fields;
}

module.exports.parseReq = (obj) => {
    let arr = [];
    for(let key in obj)
        if(!obj[key]) arr.push(key);

    return arr;
}

module.exports.uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});

module.exports.randomString = () => Math.random().toString(36).substring(10);

module.exports.init = () => {
    let apiObject = new Object(null);

    fs.readdirSync(path.join(process.env.PWD, 'api')).forEach((file) => {
        try {
            var type    = file.substring(file.lastIndexOf('.') + 1),
                route   = file.substring(0, file.length - type.length - 1);

            if(!type == 'js' || route == 'metadata.js') return;

            apiObject[route] = require(`../api/${file}`);
        } catch(e) { 
            console.log(e);
            return;
        }
    });

    return apiObject;
}

module.exports.clearArgs = function fn(obj, recurse) {
    for (var i in obj) {
        if (obj[i] == undefined || obj[i] == '') {
            delete obj[i];
        } else if (recurse && typeof obj[i] === 'object') {
            if(JSON.stringify(obj[i]) == '{}') {
                delete obj[i];
            }

            fn(obj[i], true);
        }
    }

    return obj;
}
