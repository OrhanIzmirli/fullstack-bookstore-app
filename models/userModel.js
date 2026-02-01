// /models/userModel.js

const { db } = require("./firebase");
const { collection, addDoc, getDocs, query, where } = require("firebase/firestore");

const usersRef = collection(db, "users");

// Yeni kullanıcı ekle
async function addUser(userData) {
  try {
    const docRef = await addDoc(usersRef, userData);
    return { id: docRef.id, ...userData };
  } catch (error) {
    throw new Error("Kullanıcı eklenemedi: " + error.message);
  }
}

// Email ile kullanıcı ara
async function findUserByEmail(email) {
  try {
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    throw new Error("Kullanıcı aranırken hata oluştu: " + error.message);
  }
}

module.exports = {
  addUser,
  findUserByEmail,
};
