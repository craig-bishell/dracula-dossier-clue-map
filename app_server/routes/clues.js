var ctrl = require('../controllers/clues');

module.exports = function(app) {
  app.get('/', ctrl.homelist);
  app.get('/clue/new', ctrl.addClue);
  app.post('/clue/new', ctrl.doAddClue);  
};
