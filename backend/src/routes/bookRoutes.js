// import express from "express";
// import cloudinary from "../lib/cloudinary.js";
// import Book from "../models/Book.js";
// import protectRoute from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/", protectRoute, async (req, res) => {
//   try {
//     const { title, caption, rating, image } = req.body;

//     // 👇 ADD THESE DEBUG LINES 👇
//     console.log("--- DEBUGGING CLOUDINARY ---");
//     console.log("1. Env API Key:", process.env.CLOUDINARY_API_KEY);
//     console.log("2. Cloudinary Config:", cloudinary.config().api_key); 
//     console.log("----------------------------");

//     if (!image || !title || !caption ||!startLocation || !endLocation ) {
//       return res.status(400).json({ message: "Please provide all fields" });
//     }

//     // upload the image to cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(image);
//     const imageUrl = uploadResponse.secure_url;

//     // save to the database
//     const newBook = new Book({
//       title,
//       caption,
//       image: imageUrl,
//       startLocation, 
//       endLocation,  
//       user: req.user._id,
//     });

//     await newBook.save();

//     res.status(201).json(newBook);
//   } catch (error) {
//     console.log("Error creating book", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // pagination => infinite loading
// router.get("/", protectRoute, async (req, res) => {
//   // example call from react native - frontend
//   // const response = await fetch("http://localhost:3000/api/books?page=1&limit=5");
//   try {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 2;
//     const skip = (page - 1) * limit;

//     const books = await Book.find()
//       .sort({ createdAt: -1 }) // desc
//       .skip(skip)
//       .limit(limit)
//       .populate("user", "username profileImage");

//     const totalBooks = await Book.countDocuments();

//     res.send({
//       books,
//       currentPage: page,
//       totalBooks,
//       totalPages: Math.ceil(totalBooks / limit),
//     });
//   } catch (error) {
//     console.log("Error in get all books route", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // get recommended books by the logged in user
// router.get("/user", protectRoute, async (req, res) => {
//   try {
//     const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(books);
//   } catch (error) {
//     console.error("Get user books error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.delete("/:id", protectRoute, async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: "Book not found" });

//     // check if user is the creator of the book
//     if (book.user.toString() !== req.user._id.toString())
//       return res.status(401).json({ message: "Unauthorized" });

//     // https://res.cloudinary.com/de1rm4uto/image/upload/v1741568358/qyup61vejflxxw8igvi0.png
//     // delete image from cloduinary as well
//     if (book.image && book.image.includes("cloudinary")) {
//       try {
//         const publicId = book.image.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(publicId);
//       } catch (deleteError) {
//         console.log("Error deleting image from cloudinary", deleteError);
//       }
//     }

//     await book.deleteOne();

//     res.json({ message: "Book deleted successfully" });
//   } catch (error) {
//     console.log("Error deleting book", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// export default router;



import express from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    // ✅ FIX: Extract startLocation and endLocation from req.body
    const { title, caption, rating, image, startLocation, endLocation } = req.body;

    // 👇 ADD THESE DEBUG LINES 👇
    console.log("--- DEBUGGING CLOUDINARY ---");
    console.log("1. Env API Key:", process.env.CLOUDINARY_API_KEY);
    console.log("2. Cloudinary Config:", cloudinary.config().api_key); 
    console.log("----------------------------");

    // ✅ FIX: Now checking these variables works because they are defined
    if (!image || !title || !caption || !startLocation || !endLocation) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    // save to the database
    const newBook = new Book({
      title,
      caption,
      // rating: rating || 0, // Ensure rating is saved
      image: imageUrl,
      startLocation,
      endLocation,   
      user: req.user._id,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

// pagination => infinite loading
router.get("/", protectRoute, async (req, res) => {
  // example call from react native - frontend
  // const response = await fetch("http://localhost:3000/api/books?page=1&limit=5");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 }) // desc
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Book.countDocuments();

    res.send({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.log("Error in get all books route", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get recommended books by the logged in user
router.get("/user", protectRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error("Get user books error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // check if user is the creator of the book
    if (book.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    // delete image from cloudinary as well
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.log("Error deleting image from cloudinary", deleteError);
      }
    }

    await book.deleteOne();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;