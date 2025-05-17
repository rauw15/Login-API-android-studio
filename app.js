const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor corriendo en el puerto ${process.env.PORT}`)
    );
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
  }
};

startServer();
