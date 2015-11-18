var _ = require('underscore');
var models = require('../models');

var Char = models.Char;

var charPage = function(req, res) {
  Char.CharModel.findByOwner(req.session.account._id, function(err, docs) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    res.render('app', { csrfToken: req.csrfToken(), chars: docs });
  });
};

var makeChar = function(req, res) {
  if(!req.body.name ||
     !req.body.strength || !req.body.dexterity || !req.body.constitution ||
     !req.body.intelligence || !req.body.wisdom || !req.body.charisma) {
    res.status(400).json({ error: 'All fields are required!' });
  }
  
  var charData = {
    name: req.body.name,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intelligence: req.body.intelligence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma
  }
  
  var newChar = new Char.CharModel(charData);
  
  newChar.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    res.json({ redirect: '/char' });
  });
};

module.exports.charPage = charPage;
module.exports.make = makeChar;