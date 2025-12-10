// import mongoose from "mongoose";

// const registrationSchema = new mongoose.Schema(
//   {
//     eventId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Book", // Assuming your Event model is named 'Book' based on previous context
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // Link to the logged-in user account
//       required: true,
//     },
//     participantName: { type: String, required: true },
//     participantEmail: { type: String, required: true },
//     participantPhone: { type: String, required: true },
//     participantAge: { type: String, required: true },
//     participantGender: { type: String, required: true },
    
//     // Payment Details
//     paymentStatus: { 
//       type: String, 
//       enum: ["paid", "pending", "failed"], 
//       default: "pending" 
//     },
//     amountPaid: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Registration = mongoose.model("Registration", registrationSchema);

// export default Registration;



import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", 
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    // Participant Details Only
    participantName: { type: String, required: true },
    participantEmail: { type: String, required: true },
    participantPhone: { type: String, required: true },
    participantAge: { type: String, required: true },
    participantGender: { type: String, required: true },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;