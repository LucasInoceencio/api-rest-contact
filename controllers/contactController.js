
let Contact = require('../models/contactModel.js');

module.exports={
  getAllContacts: (req, res, next) => {
    Contact.find().then(contacts => {
      res.status(200).json(contacts);
    }).catch(error => {
      res.status(500).json(error);
    });
  },
  getContactById: (req, res, next) => {
    Contact.findOne({
      _id: req.params.id
    })
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  },
  addContact: (req, res, next) => {
    let newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      userLogged: req.body.userLogged
    })

    newContact.save()
    .then(contact => {
      res.status(200).json({msg: "Usuário cadastrado com sucesso", contato: contact});
    })
    .catch(error => {
      res.status(500).json({msg: "Erro ao cadastrar contato.", error: error});
    })
  },
  updateContact: (req, res, next) => {
    Contact.updateOne(
      {_id: req.params.id},
      {name: req.body.name, 
      email: req.body.email, 
      phone: req.body.phone, 
      userLogged: req.body.userLogged}
      )
      .then(contact => {
        res.status(200).json({msg: "Usuário editado com sucesso."});
      })
      .catch(error => {
        res.status(500).json({msg: "Erro ao editar contato.", error: error});
      })
  },
  deleteContact: (req, res, next) => {
    Contact.deleteOne({
      _id: req.params.id
    })
    .then(contact => {
      res.status(200).json({msg: "Usuário excluído com sucesso."});
    })
    .catch(error => {
      res.status(500).json({msg: "Erro ao excluir contato.", error: error});
    })
  }
}