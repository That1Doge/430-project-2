const requiresLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  return next();
};

const requiresLoginAPI = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      error: 'You must be logged in to access this resource.',
    });
  }

  return next();
};

module.exports = {
  requiresLogin,
  requiresLogout,
  requiresLoginAPI,
};
