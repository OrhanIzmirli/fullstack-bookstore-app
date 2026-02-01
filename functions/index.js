const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors")({ origin: true });

// Stripe Checkout Function
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { items } = req.body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: items.map(item => ({
          price_data: {
            currency: "usd",
            product_data: { name: item.name },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        success_url: "https://bookstore-app-orhan14.web.app/success.html",
        cancel_url: "https://bookstore-app-orhan14.web.app/cancel.html",
      });

      res.json({ id: session.id });
    } catch (err) {
      console.error("Checkout Error:", err);
      res.status(500).send("Checkout failed");
    }
  });
});
