let mongoose = require('mongoose');

module.exports = () => {
  let url = process.env.DB || 'mongodb://127.0.0.1:27017/appRest';
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10
  }
  mongoose.connect(url, options);

  mongoose.connection.once('open', () => {
    console.log("[Mongoose] Conectado em " + url);
  });

  mongoose.connection.on('error', (error) => {
    console.log("[Mongoose] Erro na conexão " + erro);
  });
}