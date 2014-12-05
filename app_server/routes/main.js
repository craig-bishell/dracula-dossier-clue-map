var ctrl = require('../controllers/main');

module.exports = function(app) {
  app.get('/about', ctrl.about);
};
