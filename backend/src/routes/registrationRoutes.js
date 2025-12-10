// import express from "express";
// import protectRoute from "../middleware/auth.middleware.js";
// import Registration from "../models/Registration.js";
// import Book from "../models/Book.js"; // Import your Event/Book model

// const router = express.Router();

// // POST /api/registrations - Save a new registration
// router.post("/", protectRoute, async (req, res) => {
//   try {
//     const { 
//       eventId, 
//       participantName, 
//       participantEmail, 
//       participantPhone, 
//       participantAge, 
//       participantGender,
//       paymentStatus,
//       amountPaid
//     } = req.body;

//     // 1. Validate Event Exists
//     const event = await Book.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     // 2. Create the Registration Record
//     const newRegistration = new Registration({
//       eventId,
//       user: req.user._id, // From protectRoute
//       participantName,
//       participantEmail,
//       participantPhone,
//       participantAge,
//       participantGender,
//       paymentStatus: paymentStatus || "paid",
//       amountPaid,
//     });

//     // 3. Save to Database
//     await newRegistration.save();

//     res.status(201).json({ 
//       message: "Registration successful", 
//       registration: newRegistration 
//     });

//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ message: "Failed to save registration" });
//   }
// });

// // GET /api/registrations/user - Get all registrations for the logged-in user
// router.get("/user", protectRoute, async (req, res) => {
//   try {
//     const registrations = await Registration.find({ user: req.user._id })
//       .populate("eventId", "title image startLocation") // Populate event details
//       .sort({ createdAt: -1 });

//     res.json(registrations);
//   } catch (error) {
//     console.error("Error fetching user registrations:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;



import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import Registration from "../models/Registration.js";
import Book from "../models/Book.js";

const router = express.Router();

// POST /api/registrations - Save ONLY registration details
router.post("/", protectRoute, async (req, res) => {
  try {
    const { 
      eventId, 
      participantName, 
      participantEmail, 
      participantPhone, 
      participantAge, 
      participantGender
    } = req.body;

    // 1. Validate Event Exists
    const event = await Book.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2. Create the Registration Record (No payment info here)
    const newRegistration = new Registration({
      eventId,
      user: req.user._id,
      participantName,
      participantEmail,
      participantPhone,
      participantAge,
      participantGender,
    });

    // 3. Save to Database
    await newRegistration.save();

    res.status(201).json({ 
      message: "Registration details saved successfully", 
      registration: newRegistration 
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Failed to save registration" });
  }
});

// GET /api/registrations/user
router.get("/user", protectRoute, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate("eventId", "title image startLocation")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;