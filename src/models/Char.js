var mongoose = require('mongoose');
var _ = require('underscore');

var CharModel;

var setName = function(name) {
  return _.escape(name).trim();
};

var CharSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName
  },
  strength: {
    type: Number,
    required: true,
    min: 0
  },
  dexterity: {
    type: Number,
    required: true,
    min: 0
  },
  constitution: {
    type: Number,
    required: true,
    min: 0
  },
  intelligence: {
    type: Number,
    required: true,
    min: 0
  },
  wisdom: {
    type: Number,
    required: true,
    min: 0
  },
  charisma: {
    type: Number,
    required: true,
    min: 0
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

CharSchema.methods.toAPI = function() {
  return {
    name: this.name,
    
  };
};

CharSchema.statics.findByOwner = function(ownerID, callback) {
  var search = { owner: mongoose.Types.OnjectId(ownerID) };
  return CharModel.find(search).select('name strength dexterity constitution intelligence wisdom charisma').exec(callback);
};

CharModel = mongoose.model('Char', CharSchema);

module.exports.CharModel = CharModel;
module.exports.CharSchema = CharSchema;