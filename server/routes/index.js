const Account = require('../controllers/Account.js');
const middleware = require('../middleware');

const router = (app) => {
  app.post('/api/signup', middleware.requiresLogout, Account.signup);
  
  app.post('/api/login', middleware.requiresLogout, Account.login);
  
  app.post('/api/logout', middleware.requiresLoginAPI, Account.logout);

  app.get('/api/account', middleware.requiresLoginAPI, (req, res) => {
    res.json({
      user: req.session.user,
    });
  });
};

module.exports = router;