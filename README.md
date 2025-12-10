
# Run Bangladesh

\<div align="center"\>

\<img src="mobile/run-bangladesh/assets/images/run_bangladesh.jpg" width="150" height="150" style="border-radius: 20px;"\>

\<br /\>

**Simplifying Marathon Management in Bangladesh.**

[](https://reactnative.dev/)
[](https://nodejs.org/)
[](https://www.mongodb.com/)
[](https://stripe.com/)
[](https://jestjs.io/)

\</div\>

-----

## 📖 Project Overview

**Run Bangladesh** is a full-stack mobile application designed to simplify marathon management in Bangladesh. It creates a seamless and engaging experience for all stakeholders by bridging the gap between runners and event organizers.

It enables participants to register, make secure payments, track their runs in real time using GPS, and access multimedia updates. Simultaneously, it provides organizers with tools to manage registrations, routes, leaderboards, payments, volunteers, and analytics through a modern dashboard.

### ✨ Key Features

  * **📍 Real-Time GPS Tracking:** Track runs accurately in real-time.
  * **💳 Secure Payments:** Integrated Stripe API for safe and easy registration payments.
  * **📝 Seamless Registration:** Quick sign-up process for marathon events.
  * **📊 Organizer Dashboard:** Tools for managing routes, leaderboards, volunteers, and analytics.
  * **🎥 Multimedia Updates:** Access photos and videos from the event.

-----

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Mobile Framework** | React Native (Expo Router) |
| **Backend Runtime** | Node.js |
| **Database** | MongoDB |
| **Payment Gateway** | Stripe API |
| **Testing** | Jest |

-----

## 📂 App Folder Structure

This project follows a Client-Server architecture with a clean separation of concerns.

```bash
Run-Bangladesh/
├── backend/                  # Server-Side Logic
│   ├── src/                  # Source Code
│   │   ├── lib/              # Helper functions & Utilities
│   │   ├── middleware/       # Custom middleware (auth, error handling)
│   │   ├── models/           # Mongoose Database Models
│   │   ├── routes/           # API Route Definitions
│   │   └── index.js          # Entry point for the server
│   ├── .env                  # Environment Variables
│   └── package.json          # Backend Dependencies
│
├── mobile/                   # Client-Side Application
│   └── run-bangladesh/
│       ├── app/              # Expo Router (Screens & Routes)
│       │   ├── (auth)/       # Authentication Group
│       │   ├── (tabs)/       # Main Tab Navigation
│       │   ├── _layout.jsx   # Root Layout Config
│       │   └── register.jsx  # Registration Screen
│       │
│       ├── assets/           # Static Assets
│       │   ├── fonts/
│       │   ├── images/
│       │   └── styles/
│       │
│       ├── components/       # Reusable UI Components
│       ├── constants/        # App Constants (Colors, URLs)
│       ├── lib/              # Helper Libraries
│       ├── store/            # State Management (Redux/Zustand/Context)
│       ├── app.json          # Expo Configuration
│       ├── eas.json          # EAS Build Configuration
│       └── package.json      # Mobile Dependencies
│
├── .gitignore
└── README.md
```

-----

## 👥 Meet the Team

| Name | Role | Email |
| :--- | :--- | :--- |
| **Saif Mohammed** | Project Manager & Team Lead | saif.mohammed@northsouth.edu |
| **Humayra Rahman Nipa** | Designer & Tester | humayra.nipa@northsouth.edu |
| **Sinthia Ahmed Rachona** | Software Developer | ahmed.rachona@northsouth.edu |

-----

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

  * Node.js (v18+)
  * MongoDB (Local or Atlas URL)
  * Expo Go app on your mobile device

### Installation

1.  **Clone the Repo**

    ```bash
    git clone https://github.com/nipunsaif/Run-Bangladesh.git
    cd Run-Bangladesh
    ```

2.  **Setup Backend**

    ```bash
    cd backend
    npm install
    # Create a .env file with your MONGO_URI and STRIPE_KEYS
    npm start
    ```

3.  **Setup Mobile App**
    Open a new terminal:

    ```bash
    cd mobile/run-bangladesh
    npm install
    npx expo start
    ```

-----

## 🤝 Contributors

\<a href="[https://github.com/nipunsaif/Run-Bangladesh/graphs/contributors](https://www.google.com/search?q=https://github.com/nipunsaif/Run-Bangladesh/graphs/contributors)"\>
\<img src="[https://contrib.rocks/image?repo=nipunsaif/Run-Bangladesh](https://www.google.com/search?q=https://contrib.rocks/image%3Frepo%3Dnipunsaif/Run-Bangladesh)" /\>
\</a\>

Made with ❤️ by the Run Bangladesh Team.