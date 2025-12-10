import express from "express";
import Stripe from "stripe";
import protectRoute from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// Initialize Stripe with your Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/intents", protectRoute, async (req, res) => {
  try {
    // 1. Get the amount from the frontend (e.g., "500")
    const { amount } = req.body;
    const userId = req.user._id;

    if (!amount) {
        return res.status(400).json({ message: "Amount is required" });
    }

    // 2. Find the User in DB
    const user = await User.findById(userId);

    // 3. Get or Create Stripe Customer
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      // If user doesn't have a stripe ID yet, create one
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.username,
      });
      customerId = customer.id;

      // Save it to MongoDB so we reuse it next time
      user.stripeCustomerId = customerId;
      await user.save();
    }

    // 4. Create Ephemeral Key
    // This allows the app to temporarily manage the customer's payment methods
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerId },
      { apiVersion: '2022-11-15' } // Use a recent API version
    );

    // 5. Create Payment Intent
    // Note: Stripe uses the smallest currency unit. 
    // For BDT/USD, multiply by 100 (500 taka => 50000 poisha)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100, 
      currency: 'bdt', // Change to 'usd' if you prefer dollars
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // 6. Return the 3 keys to the Frontend
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customerId,
    });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: "Payment initialization failed", error: error.message });
  }
});

export default router;