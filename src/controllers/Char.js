var _ = require('underscore');
var models = require('../models');

var Char = models.Char;

var makerPage = function(req, res) {
  Char.CharModel.findByOwner(req.session.account._id, function(err, docs) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log(docs);
    
    res.render('char', { csrfToken: req.csrfToken(), chars: docs });
  });
}

var makeChar = function(req, res) {
  if(!req.body.name ||
     !req.body.strength || !req.body.dexterity || !req.body.constitution ||
     !req.body.intelligence || !req.body.wisdom || !req.body.charisma) {
    return res.status(400).json({ error: 'All fields are requried' });
  }
  
  var charData = {
    name: req.body.name,
    strength: req.body.strength,
    dexterity: req.body.dexterity,
    constitution: req.body.constitution,
    intelligence: req.body.intelligence,
    wisdom: req.body.wisdom,
    charisma: req.body.charisma,
    owner: req.session.account._id
  };
  
  var newChar = new Char.CharModel(charData);
  
  newChar.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    
    res.json({ redirect: '/charSelect' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeChar;