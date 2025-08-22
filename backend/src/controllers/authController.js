const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const hashed = await bcrypt.hash(senha, 10);
    const newUser = await User.create({ email, senha: hashed });
    res.status(201).json({ message: "Usuário criado", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
