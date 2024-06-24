// Example script to create a JWT token using a HMAC signing key

/**
 * Script configuration
*/

// Initialise the ds-node-logger-lib library script
XLogger = require("ds-node-logger-lib").XLogger;
logger = new XLogger(this);

var config = {
  /**
   * @property {string} issuer - Sets the JWT iss claim 
   * @property {string} audience - Sets the JWT aud claim
   * @property {integer} validityMinutes - Sets the JWT token validity
   * @property {string} signingKey - Defines the JWT signing key
   * 
   */

  issuer: "myissuer",
  audience: "myaudience",
  validityMinutes: 5,
  signingKey: "dm9vz3sSIJDwZhQM4/YPS4iGeOqYm1qm8pNKKkhAYQc="
};

/**
 * Node outcomes
*/
var nodeOutcome = {
  SUCCESS: "Success",
  ERROR: "Failure"
};

/**
 * Main function
 */

(function () {
  logger.error("Node execution started");

  var secret = config.signingKey;
  logger.debug('secret = ' + secret);

  if (typeof secret !== 'undefined' && secret !== null) {
    var jwtClaims = {
      jwtType: "SIGNED",
      jwsAlgorithm: "HS256",
      issuer: config.issuer,
      audience: config.audience,
      subject: nodeState.get("_id"),
      validityMinutes: config.validityMinutes,
      signingKey: secret,
      claims: {
        uid: nodeState.get("_id"),
        test_claim: "test_value"
      }
    }

    logger.debug("claims = " + JSON.stringify(jwtClaims));

    //Generated JWT token
    var jwt = jwtAssertion.generateJwt(jwtClaims);

    logger.debug("Generated JWT = " + jwt);

    nodeState.putShared("jwt", jwt);
    logger.error("Node execution completed");
    action.goTo(nodeOutcome.SUCCESS);

  } else {
    logger.error("Signing key not configured: " + config.signingKeyEsv);
    action.goTo(nodeOutcome.ERROR);
  }
})();