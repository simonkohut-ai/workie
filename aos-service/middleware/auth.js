/**
 * Middleware to simulate user authentication
 * Adds a temporary userId to the request object derived from headers
 */
module.exports = function authenticate(req, res, next) {
  // Simulate an authenticated user from headers or default
  const userId = req.headers['x-user-id'] || 'temp-user-123';
  
  req.user = {
    userId: userId,
    email: 'test@example.com'
  };
  console.log(`[Auth Middleware] Request authenticated for user: ${req.user.userId}`);
  next();
};
