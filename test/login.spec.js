const app = require('../bin/www');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const base_url = 'http://localhost:3000'

chai.use(chaiHttp);

describe('Test login on API', () => {
  let contact = {
      name: 'Lucas Pires',
      email: 'l@gmail.com',
      password: 'testeAutomatizado',
      phone: '642589367'
    }

    let token = '';
  
  it('Should create new contact', (done) => {
    chai.request(base_url)
    .post('/signup')
    .send(contact)
    .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('contact')
      expect(res.body.contact).to.not.be.null
      done()
    });
  });

  it('You must not create contact with the post method', (done) => {
    chai.request(base_url)
    .get('/signup')
    .send(contact)
    .end((err, res) => {
      expect(res).to.have.status(404)
      done()
    });
  });

  it('Dont should create new contact', (done) => {
    chai.request(base_url)
    .post('/signup')
    .send(contact)
    .end((err, res) => {
      expect(res).to.have.status(500)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('error')
      done()
    });
  });

  it('Do not login non-existing user', (done) => {
    chai.request(base_url)
    .post('/login')
    .send({email: 'teste@lkdjalsdj.c.br', senha: 'naoImportaQualSenha'})
    .end((err, res) => {
      expect(res).to.have.status(401)
      expect(res.body).to.be.a('object')
      done()
    })
  });

  it('Login in existing user', (done) => {
    chai.request(base_url)
    .post('/login')
    .send({email: contact.email, password: contact.password})
    .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('token')
      expect(res.body.token).to.be.a('string')
      expect(res.body.contact).to.not.be.null
      token = res.body.token;
      done()
    })
  });

  it('Do not logout without token', (done) => {
    chai.request(base_url)
    .post('/logout')
    .end((err, res) => {
      expect(res).to.have.status(401)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('msg')
      done()
    })
  });

  it('Logout with token', (done) => {
    chai.request(base_url)
    .post('/logout')
    .set('authorization', 'Bearer ' + token)
    .end((err, res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('msg')
      done()
    })
  });

  after(done => {
    let Contact = require('../models/contactModel');
    Contact.remove({email: contact.email})
    .then(ok => {
      console.log('Apagou todos os usuários');
      done();
    })
    .catch(err => {
      console.log('Não apagou os contatos.');
      done(err);
    })
  });

});