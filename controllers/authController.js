const { addUser, findUserByEmail } = require("../models/userModel");

// Kayıt ol
exports.registerUser = async (req, res) => {
  const { name, surname, username, phone, dob, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı." });
    }

    const newUser = await addUser({
      name,
      surname,
      username,
      phone,
      dob,
      email,
      password,
      role: "user",
      createdAt: new Date()
    });

    res.status(201).json({ message: "Kayıt başarılı!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Giriş yap
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Geçersiz email veya şifre." });
    }
    res.status(200).json({ message: "Giriş başarılı!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
