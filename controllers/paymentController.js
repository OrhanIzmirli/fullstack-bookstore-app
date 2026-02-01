const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  try {
    const items = req.body.items;
    console.log("🛒 Items from client:", items);

    // Eksik alanları kontrol et
    items.forEach(item => {
      if (!item.title || !item.price || !item.qty) {
        throw new Error("Missing required fields (title, price, quantity)");
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100), // Örneğin 10.99 → 1099
        },
        quantity: item.qty,
      })),
      success_url: "http://localhost:3000/shop.html?success=true",
      cancel_url: "http://localhost:3000/shop.html?canceled=true",
    });

    console.log("✅ Stripe session created:", session.id);
    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe session error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
