const Account = require('../controllers/Account.js');
const middleware = require('../middleware');
const Game = require('../controllers/Game');

const router = (app) => {
  app.post('/api/signup', middleware.requiresLogout, Account.signup);
  
  app.post('/api/login', middleware.requiresLogout, Account.login);
  
  app.post('/api/logout', middleware.requiresLoginAPI, Account.logout);

  app.get('/api/account', middleware.requiresLoginAPI, (req, res) => {
    res.json({
      user: req.session.user,
    });
  });

  app.post('/api/games', middleware.requiresLoginAPI, Game.createGame);
  app.get('/api/games', middleware.requiresLoginAPI, Game.getGames);

  app.put('/api/games/:id', middleware.requiresLoginAPI, Game.updateGame);
  app.delete('/api/games/:id', middleware.requiresLoginAPI, Game.deleteGame);
};

module.exports = router;