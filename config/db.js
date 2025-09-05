const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro na conexão ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
