// // import express from "express";
// // import cors from "cors";
// // import "dotenv/config";
// // import job from "./lib/cron.js";

// // import authRoutes from "./routes/authRoutes.js";
// // import bookRoutes from "./routes/bookRoutes.js";
// // import { connectDB } from "./lib/db.js";

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // app.use(express.json({ limit: "50mb" })); 
// // app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // job.start();
// // app.use(express.json());
// // app.use(cors());

// // app.use("/api/auth", authRoutes);
// // app.use("/api/books", bookRoutes);

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// //   connectDB();
// // });


// // import express from "express";
// // import cors from "cors";
// // import "dotenv/config";
// // import job from "./lib/cron.js";

// // import authRoutes from "./routes/authRoutes.js";
// // import bookRoutes from "./routes/bookRoutes.js";
// // // 👇 Import the Payment Routes
// // import paymentRoutes from "./routes/paymentRoutes.js";
// // import { connectDB } from "./lib/db.js";

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // app.use(express.json({ limit: "50mb" })); 
// // app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // job.start();
// // app.use(express.json());
// // app.use(cors());

// // // --- Register Routes ---
// // app.use("/api/auth", authRoutes);
// // app.use("/api/books", bookRoutes);
// // // 👇 Register the Payment Route here
// // app.use("/api/payments", paymentRoutes);

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// //   connectDB();
// // });




// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import job from "./lib/cron.js";

// import authRoutes from "./routes/authRoutes.js";
// import bookRoutes from "./routes/bookRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// // 👇 Import the new Registration Routes
// import registrationRoutes from "./routes/registrationRoutes.js";

// import { connectDB } from "./lib/db.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json({ limit: "50mb" })); 
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// job.start();
// app.use(express.json());
// app.use(cors());

// // --- Register Routes ---
// app.use("/api/auth", authRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/payments", paymentRoutes);

// // 👇 Add this line to enable the registration endpoint
// app.use("/api/registrations", registrationRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectDB();
// });


import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
// 👇 Import Volunteer Routes
import volunteerRoutes from "./routes/volunteerRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

job.start();
app.use(express.json());
app.use(cors());

// --- Register Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/registrations", registrationRoutes);
// 👇 Add this line
app.use("/api/volunteers", volunteerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});