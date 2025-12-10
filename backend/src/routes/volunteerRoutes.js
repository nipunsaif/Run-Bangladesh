import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// 1. ADD a Volunteer (POST /api/volunteers)
router.post("/", protectRoute, async (req, res) => {
  try {
    const { eventId, name, role } = req.body;

    if (!eventId || !name || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newVolunteer = new Volunteer({
      eventId,
      name,
      role,
      addedBy: req.user._id,
    });

    await newVolunteer.save();

    res.status(201).json({ message: "Volunteer added", volunteer: newVolunteer });
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. GET Volunteers for an Event (GET /api/volunteers/:eventId)
router.get("/:eventId", protectRoute, async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ eventId: req.params.eventId })
      .sort({ createdAt: -1 }); // Newest first

    res.json(volunteers);
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 3. REMOVE a Volunteer (DELETE /api/volunteers/:id)
router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Optional: Check if the user deleting is the one who added them
    // if (volunteer.addedBy.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    await volunteer.deleteOne();

    res.json({ message: "Volunteer removed successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;