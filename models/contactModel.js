
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Schema = mongoose.Schema;

var contactSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  password: {type: String, required: true},
  token: {type: String, default: null},
  group: {type: String, required: true, enum: ['user', 'admin'], default: 'user'}
}, {versionKey: false});

contactSchema.pre('save', function(next){
  const contact = this;

  if(contact.isModified('password') || contact.isNew){
    bcrypt.hash(contact.password, 8)
    .then(hash => {
      contact.password = hash;
      next();
    })
    .catch(error => {
      next(error);
    })
  } else {
    return next();
  }
});

contactSchema.methods.comparePassword = function(password, callback){
  bcrypt.compare(password, this.password, function(error, isMatch){
    if(error){
      return callback(error);
    }
    callback(null, isMatch);
  })
}

contactSchema.methods.generateTokenJwt = function(){
  return new Promise((sucess, reject) => {
    const contact = this;
    const token = jwt.sign(
      {_id: contact._id, nome: contact.name, group: contact.group},
      'ChaveQueCriptografaDescriptografaToken',
      {expiresIn: '7d'}
    )

    contact.token = token;
    contact.save()
    .then(contact => {
      sucess({
        msg: "Usuário logado com sucesso!",
        token: token
      })
    })
    .catch(error => {
      reject({
        token: null,
        error: error.message
      })
    })
  })
}

module.exports = mongoose.model('Contact', contactSchema);
