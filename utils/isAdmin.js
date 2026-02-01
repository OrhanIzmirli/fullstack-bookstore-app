const db = require("../models/firebase");

async function isAdmin(req, res, next) {
  try {
    const snapshot = await db.collection("users").where("email", "==", req.user.email).get();

    if (snapshot.empty) {
      return res.status(403).json({ message: "User not found." });
    }

    const user = snapshot.docs[0].data();

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Admin check failed.", error: error.message });
  }
}

module.exports = isAdmin;
