const { db } = require("../models/firebase");
const { collection, getDocs, doc, deleteDoc } = require("firebase/firestore");

// Tüm kullanıcıları getir
exports.getAllUsers = async (req, res) => {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json({ users });
  } catch (error) {
    console.error("Admin kullanıcıları çekerken hata:", error.message);
    res.status(500).json({ message: "Kullanıcılar alınamadı." });
  }
};

// Belirli bir kullanıcıyı sil
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
    res.status(200).json({ message: "Kullanıcı silindi." });
  } catch (error) {
    console.error("Kullanıcı silme hatası:", error.message);
    res.status(500).json({ message: "Kullanıcı silinemedi." });
  }
};
