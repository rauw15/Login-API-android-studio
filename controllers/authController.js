const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
