const app = require("../bin/www");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const base_url = "http://localhost:3000"

describe("Test login on API", () => {
  let contact = {
      name: "Lucas Pires",
      email: "l@gmail.com",
      password: "testeAutomatizado"
    }
  
  it("Create new contact", (done) => {
    chai.request(base_url)
    .post('/signup')
    .send(contact)
    .end((error, response) => {
      expect(response).to.have.status(200)
      expect(response.body).to.be.a('object')
      expect(response.body).to.have.property('contact')
      expect(response.body.contact).to.not.be.null
    });
  });
});