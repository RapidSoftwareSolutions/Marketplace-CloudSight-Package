# CloudSight Package
Visual cognition
* Credentials: apiKey

## How to get credentials: 
0. Login to [CloudSight dashboard](https://cloudsight.ai/dashboard)
1. Create new project
2. Copy and save your **API Key**

## CloudSight.sendImage
Sending an Image.

The focus parameters accept the point, using North-West gravity (0,0 corresponds to the upper-left corner), for which to place a highlight of attention on the image. In the event there are many identifiable objects in the image, this attempts to place importance on the ones closest to the focal point. You may specify a focal point in terms of relative coordinates (0.0 through 1.0) or absolute coordinates (i.e. a 400x400 image would have 0 through 400 for each axis).

Once the image request has been received, a response will be returned containing either a success or error message. If the request is successful, you will receive a url parameter containing a URL to the image as stored on our service, and a token for the image, which you can use to retrieve the resulting annotation data in the `getImageRecognationResult` endpoint.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Api Key provided for your account.
| image     | File       | Image file or image url to analyze.
| locale    | String     | The locale of the request. Example: `en-US`.
| language  | String     | The language of the request. Return the response in this language.
| deviceId  | String     | A unique ID generated for the device sending the request.
| latitude  | Double     | Geolocation information for additional context
| longitude | Double     | Geolocation information for additional context
| altitude  | Double     | Geolocation information for additional context
| ttl       | Number     | Deadline in seconds before expired state is set. Set `max` for maximum deadline
| focusX    | Double     | Focal point on image (x-coordinate) for specificity
| focusY    | Double     | Focal point on image (y-coordinate) for specificity

## CloudSight.getImageRecognationResult
This endpoint retrieves the result of the image you identified. Supply the token received from the `sendImage` endpoint. CloudSight will return one of several responses depending on the status of the identification.

| Status      | Description        
|-------------|------------
|not completed| Recognition has not yet been completed for this image. Continue polling until response has been marked completed.
|completed    | Recognition has been completed. Annotation can be found in `name` element of the JSON response.
|not found    | Token supplied on URL does not match an image.
|skipped      | Image couldn't be recognized because of a specific `reason`. Check the reason element of the JSON response.
|timeout      | Recognition process exceeded the allowed TTL setting.

If a response has a status of `skipped`, one of the following reason types will be populated in the reason field.

| Reason      | Description        
|-------------|------------
|offensive    |	Offensive image content
|blurry       | Too blurry to identify
|close        | Too close to identify
|dark         | Too dark to identify
|bright       | Too bright to identify
|unsure       | Content could not be identified

Request params

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Api Key provided for your account.
| token     | String     | Specify a single token or comma separated list of tokens (`token1,

## CloudSight.repostImage
If an image request has timed out `{ "status" : "timeout" }`, then you may re-post the request by indicating the original token and the /repost path. For example, if an image request was received successfully and a token example_token was given, and had subsequently timed out, you can repost the image by sending the following request.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Api Key provided for your account.
| token     | String     | Specify a single token.

