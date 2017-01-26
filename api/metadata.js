module.exports.do = function(req, res){
    res.status(200).send({
        'package': 'CloudSight',
        "tagline": "CloudSight API Package",
        "keywords": ["API"],
        "description": "Visual cognition",
        'image': 'http://logo.clearbit.com/google.com',
        'repo': 'https://github.com/RapidSoftwareSolutions/Marketplace-CloudSight-Package',
        'accounts': {
            'domain': 'cloudsight.ai',
            'credentials': [
                'apiKey'
            ]
        },
        'blocks': [{
            "name":"sendImage",
            "description": "Sending an Image",
            "args":[
                {
                    name: "apiKey",
                    type: "credentials",
                    info: "Api Key provided for your account.",
                    required: true
                },
                {
                    name: "image",
                    type: "File",
                    info: "Image file or image url to analyze.",
                    required: true
                },
                {
                    name: "locale",
                    type: "String",
                    info: "The locale of the request. Example: `en-US`.",
                    required: true
                },
                {
                    name: "language",
                    type: "String",
                    info: "The language of the request. Return the response in this language.",
                    required: false
                },
                {
                    name: "deviceId",
                    type: "String",
                    info: "A unique ID generated for the device sending the request.",
                    required: false
                },
                {
                    name: "latitude",
                    type: "Double",
                    info: "Geolocation information for additional context",
                    required: false
                },
                {
                    name: "longitude",
                    type: "Double",
                    info: "Geolocation information for additional context",
                    required: false
                },
                {
                    name: "altitude",
                    type: "Double",
                    info: "Geolocation information for additional context",
                    required: false
                },
                {
                    name: "ttl",
                    type: "Number",
                    info: "Deadline in seconds before expired state is set. Set `max` for maximum deadline",
                    required: false
                },
                {
                    name: "focusX",
                    type: "Double",
                    info: "Focal point on image (x-coordinate) for specificity",
                    required: false
                },
                {
                    name: "focusY",
                    type: "Double",
                    info: "Focal point on image (y-coordinate) for specificity",
                    required: false
                }
            ], 
            'callbacks':[{'name':'error','info':'Error'}, {'name':'success','info':'Success'}]
        }, {
            "name":"getImageRecognationResult",
            "description": "This endpoint retrieves the result of the image you identified.",
            "args":[
                {
                    name: "apiKey",
                    type: "credentials",
                    info: "Api Key provided for your account.",
                    required: true
                },
                {
                    name: "token",
                    type: "String",
                    info: "Specify a single token or comma separated list of tokens (`token1,token2`) for which to retrieve response detail.",
                    required: true
                }
            ], 
            'callbacks':[{'name':'error','info':'Error'}, {'name':'success','info':'Success'}]
        }, {
            "name":"repostImage",
            "description": "If an image request has timed out `{ \"status\" : \"timeout\" }`, then you may re-post the request by indicating the original token and the /repost path. For example, if an image request was received successfully and a token example_token was given, and had subsequently timed out, you can repost the image by sending the following request.",
            "args":[
                {
                    name: "apiKey",
                    type: "credentials",
                    info: "Api Key provided for your account.",
                    required: true
                },
                {
                    name: "token",
                    type: "String",
                    info: "Specify a single token.",
                    required: true
                }
            ], 
            'callbacks':[{'name':'error','info':'Error'}, {'name':'success','info':'Success'}]
        }]
    })
};
