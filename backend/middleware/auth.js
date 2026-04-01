// Simple header-based admin guard to protect sensitive endpoints.
const requireAdmin = (req, res, next) => {
  const providedToken = req.headers['x-admin-token'];
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken) {
    console.warn('ADMIN_TOKEN is not set. Admin routes are unprotected.');
    return next();
  }

  if (!providedToken || providedToken !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized: admin token missing or invalid.' });
  }

  return next();
};

module.exports = requireAdmin;
