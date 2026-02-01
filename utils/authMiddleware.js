function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing token. Please login first." });
  }

  // In this simple version, we treat the token as the user's email
  req.user = { email: token };
  next();
}

module.exports = authenticateToken;
