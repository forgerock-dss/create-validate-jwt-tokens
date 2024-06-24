// Example script to validate a JWT token signed using a HMAC signing key

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
var assertionJwt = nodeState.get("jwt");

logger.debug("Secret = " + secret + ", assertionJwt = " + assertionJwt);

var jwtClaims;
var jwtData = {
  jwtType: "SIGNED",
  jwt: assertionJwt,
  issuer: config.issuer,
  audience: config.audience,
  signingKey: secret
};

try {
  if (assertionJwt === null) {
    logger.error("JWT assertion not found");
    action.goTo(nodeOutcome.ERROR);
  } else if (typeof secret === "undefined" || secret === null) {
    logger.error("Signing key not configured: " + config.signingKey);
    action.goTo(nodeOutcome.ERROR);
  } else {
    //Validate JWT
    jwtClaims = jwtValidator.validateJwtClaims(jwtData);
  }
} catch (e) {
  logger.error("Invalid JWT signing key, exception = " + e);
}

if (jwtClaims === null) {
  logger.error("Invalid JWT Claims");
  action.goTo(nodeOutcome.ERROR);
} else {
  //Extract UID from JWT and insert into sharedState
  var uid = jwtClaims.get("uid");
  logger.debug("uid = " + uid);
  nodeState.putShared("claimAttribute", uid);
  logger.error("Node execution completed");
  action.goTo(nodeOutcome.SUCCESS);
}
})();