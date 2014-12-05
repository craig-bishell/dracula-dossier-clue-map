var ctrl = require('../controllers/clues');

module.exports = function(app) {
  // locations
  app.get('/api/clues', ctrl.cluesListAll);
  app.post('/api/clues', ctrl.cluesCreate);
};
