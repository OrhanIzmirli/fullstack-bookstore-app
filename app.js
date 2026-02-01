require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Middleware
const authenticateToken = require("./utils/authMiddleware");
const isAdmin = require("./utils/isAdmin");

const app = express();
const port = 3000;

/* =========================
   HELMET + CSP (FIXLİ)
========================= */
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],

        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdnjs.cloudflare.com",
          "https://js.stripe.com",
          "https://www.gstatic.com",
          "https://apis.google.com",
          "https://connect.facebook.net",
          "https://firebase.googleapis.com"
        ],

        "script-src-attr": ["'self'", "'unsafe-inline'"],

        // ✅ ASIL FIX BURASI
        "connect-src": [
          "'self'",
          "https://openlibrary.org",
          "https://api.stripe.com",
          "https://firestore.googleapis.com",
          "https://identitytoolkit.googleapis.com",
          "https://securetoken.googleapis.com",
          "https://firebase.googleapis.com",
          "https://www.gstatic.com"
        ],

        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com"
        ],

        "img-src": ["*", "data:"],

        "frame-src": [
          "'self'",
          "https://js.stripe.com",
          "https://www.facebook.com"
        ],

        "font-src": [
          "'self'",
          "https://fonts.gstatic.com"
        ]
      }
    }
  })
);

/* =========================
   RATE LIMIT
========================= */
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests. Please try again later." }
});
app.use(limiter);

/* =========================
   CORS
========================= */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

/* =========================
   BODY PARSERS
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================
   STATIC FILES
========================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", authenticateToken, isAdmin, adminRoutes);
app.use("/api/payment", paymentRoutes);

/* =========================
   OPENLIBRARY API (BACKEND)
========================= */
app.get("/api/books", async (req, res) => {
  const { limit = 24, offset = 0 } = req.query;
  try {
    const response = await axios.get(
      `https://openlibrary.org/subjects/fiction.json?limit=${limit}&offset=${offset}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

/* =========================
   PAGE ROUTES
========================= */
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "public/login.html"))
);

app.get("/shop", (req, res) =>
  res.sendFile(path.join(__dirname, "public/shop.html"))
);

app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname, "public/contact.html"))
);

app.get("/forgot", (req, res) =>
  res.sendFile(path.join(__dirname, "public/forgot.html"))
);

app.get("/member", (req, res) =>
  res.sendFile(path.join(__dirname, "public/member.html"))
);

app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "public/admin.html"))
);

app.get("/checkout", (req, res) =>
  res.sendFile(path.join(__dirname, "public/checkout.html"))
);

/* =========================
   PROTECTED TEST ROUTE
========================= */
app.get("/profile", authenticateToken, (req, res) => {
  res.send(`Welcome, ${req.user.email}!`);
});

/* =========================
   SERVER START
========================= */
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
