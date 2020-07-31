const jwt = require('jsonwebtoken');
const Contact = require('../models/contactModel');

module.exports={
  verifyLoggedUser: (req, res, next)=>{
    if(req.headers.authorization != undefined){
      let token = req.headers['authorization'].replace("Bearer ", "");
      if(token){
        jwt.verify(token, 'ChaveQueCriptografaDescriptografaToken', function(error, decode){
          if(error){
            return res.status(401).json({
              msg: "Falha ao verificar o token. Tente novamente"
            })
          }
          let contactId = decode._id;
          console.log(contactId);

          Contact.findOne({
            _id: contactId,
            token : token
          }, {name: 1, email: 1, group: 1, _id: 1})
          .then(contact => {
            if(!contact)
              return res.status(401).json({
                msg: "Token inválido, faça o login novamente!"
              })

              req.Contact = contact;
              next();
          })
          .catch(error => {
            return res.status(401).json({
              msg: "Erro ao buscar usuário!",
              error: error
            })
          })
        })
      } else {
        return res.status(401).json({
          msg: "O envio do token é obrigatório."
        })
      }
    } else {
      return res.status(401).json({
        msg: "Não foi informado um token."
      })
    }
  },
  verifyGroupUser: (role) => {
    return function(req, res, next){
      if(role != null && role.includes(req.Contact.group)){
        next();
      } else {
        return res.status(403).json({
          msg: "O usuário não tem acesso a essa rota!"
        })
      }
    }
  }
}