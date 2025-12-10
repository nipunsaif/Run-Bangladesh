import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionId: { type: String, required: true }, // Stripe Payment Intent ID
    amount: { type: Number, required: true },
    currency: { type: String, default: "bdt" },
    status: { 
      type: String, 
      enum: ["succeeded", "pending", "failed"], 
      default: "pending" 
    },
    paymentMethod: { type: String, default: "card" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;