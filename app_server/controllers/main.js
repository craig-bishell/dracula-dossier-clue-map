/* GET 'about us' page */
module.exports.about = function(req, res){
  res.render('generic-text', { 
    title: 'About Dracula Dossier clue map',
    content: 'Clues were sent via postcard - the original thread about these can be seen at: https://www.kickstarter.com/projects/1721105501/the-dracula-dossier/posts/1071378'
  });
};