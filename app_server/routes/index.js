module.exports = function(app) {
  require('./clues')(app);
  require('./main')(app);
};
