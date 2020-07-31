let Contact = require('../models/contactModel');

module.exports={
  signup: (req, res, next) => {
    let newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    })

    newContact.save()
    .then(contact => {
      res.status(200).json({msg: "Usuário cadastrado com sucesso", contato: contact});
    })
    .catch(error => {
      res.status(500).json({msg: "Erro ao cadastrar contato.", error: error});
    })
  },
  login:(req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;

    Contact.findOne({'email': email})
    .then(contact=>{
      if(contact == null){
        return res.status(401).json({
          msg: "Usuário não encontrado. Faça o cadastro!",
          token: null
        })
      } else {
        contact.comparePassword(password, (error, isMatch)=>{
          if(isMatch && error == null){
            contact.generateTokenJwt()
            .then(sucess => {
              return res.status(200).json(sucess);
            })
            .catch(error => {
              return res.status(401).json(error);
            })
          } else {
            return res.status(401).json({
              msg: "Senha incorreta. Tente novamente!",
              token: null
            })
          }
        });
      }
    })
    .catch(error => {
      return res.status(401).json({
        msg: "Erro ao buscar o usuário. Tente novamente!",
        error: error,
        token: null
      })
    })
  },
  logout: (req, res, next) => {
    const idContact = req.Contact._id;
    Contact.update(
      {_id: idContact},
      {
        $set: {token: null}
      }
    )
    .then(contact => {
      res.status(200).json({
        msg: "Logout realizado com sucesso!"
      })
    })
    .catch(error => {
      res.status(500).json({
        msg: "Erro ao realizar o logout!",
        error: error
      })
    })
  }
}