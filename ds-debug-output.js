// Script to prints sharedState, transientState object attributes, request cookies, request parameters and request headers

/**
 * IMPORTANT
 * Be mindful that as transientState attributes are retrieved and displayed onscreen they will be deleted after this node
 */

// Initialise the ds-node-logger-lib library script
XLogger = require("ds-node-logger-lib").XLogger;
logger = new XLogger(this);

/**
 * Node outcomes
 */
var nodeOutcomes = {
    NEXT: "next"
};

/**
 * Main function
 */

(function () {
    logger.error("Node execution started");
    if (callbacks.isEmpty()) {

        //Get nodeState
        nodeState.keys().toArray().forEach(
            function (key) {
                var value = nodeState.get(key);
                callbacksBuilder.stringAttributeInputCallback(key, "nodeState.".concat(key), value, false);
            }
        );

        //Get objectAttributes
        var oa = nodeState.getObject("objectAttributes");
        if (!!oa) {
            Object.keys(oa).forEach(
                function (key) {
                    callbacksBuilder.stringAttributeInputCallback(key, "objectAttributes.".concat(key), oa.get(key), false);
                }
            );
        }

        // Get Cookies
        var cookieHeader = requestHeaders.get("cookie");
        if (!!cookieHeader) {
            var cookies = cookieHeader.get(0).split(";");
            cookies.forEach(
                function (key) {
                    var cookieSpec = key.split("=");
                    callbacksBuilder.stringAttributeInputCallback(cookieSpec[0].trim(), "Cookies.".concat(cookieSpec[0].trim()), cookieSpec[1].trim(), false);
                }
            );
        }

        //Get requestParameters 
        var requestParamKeys = Object.keys(requestParameters);
        requestParamKeys.forEach(
            function (key) {
                var value = requestParameters.get(key).get(0);
                callbacksBuilder.stringAttributeInputCallback(key, "requestParameters.".concat(key), value, false);
            }
        );

        //Get requestHeaders
        var requestHeaderKeys = Object.keys(requestHeaders);
        requestHeaderKeys.forEach(
            function (key) {
                var value = requestHeaders.get(key).get(0);
                callbacksBuilder.stringAttributeInputCallback(key, "requestHeaders.".concat(key), value, false);
            }
        );
    } else {
        logger.error("Node execution completed");
        action.goTo(nodeOutcomes.NEXT);
    }
})();