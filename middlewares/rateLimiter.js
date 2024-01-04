const logger = require('../logger');

const createRateLimiter = (limit, windowMs) => {
    logger.info(`Inside rateLimiter....`)
    const tokens = {};
    return (req, res, next) => {
      const ipAddress = req.ip;
  
      tokens[ipAddress] = tokens[ipAddress] || {
        lastRequestTime: Date.now(),
        tokens: limit,
      };
  
      const now = Date.now();
      const elapsedTime = now - tokens[ipAddress].lastRequestTime;
  
      tokens[ipAddress].tokens += (elapsedTime / windowMs) * limit;
  
      tokens[ipAddress].lastRequestTime = now;
  
      tokens[ipAddress].tokens = Math.min(tokens[ipAddress].tokens, limit);
      logger.info(tokens[ipAddress].tokens)
  
      if (tokens[ipAddress].tokens >= 1) {
        tokens[ipAddress].tokens -= 1;
        next();
      } else {
        res.status(429).send('Rate limit exceeded');
      }
    };
  };
  
  module.exports = createRateLimiter;
