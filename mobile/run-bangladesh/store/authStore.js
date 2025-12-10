import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

// // File name: authStore.js

// import { create } from "zustand";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "../constants/api";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isLoading: false,
//   isCheckingAuth: true,

//   // Register is typically only for Users (Admins usually pre-created)
//   register: async (username, email, password) => {
//     set({ isLoading: true });
//     try {
//       const response = await fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       // Save user data
//       await AsyncStorage.setItem("user", JSON.stringify(data.user));
//       await AsyncStorage.setItem("token", data.token);

//       set({ token: data.token, user: data.user, isLoading: false });

//       return { success: true };
//     } catch (error) {
//       set({ isLoading: false });
//       return { success: false, error: error.message };
//     }
//   },

//   // UPDATED: Now accepts 'role' to choose the correct backend route
//   login: async (email, password, role = "user") => {
//     set({ isLoading: true });

//     try {
//       // Determine which endpoint to hit based on the selected role
//       // Users -> /auth/login (or /users/login)
//       // Admins -> /admin/login
//       const endpoint = role === "admin" ? "/admin/login" : "/auth/login";

//       const response = await fetch(`${API_URL}${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       // Save user data (Ensure your backend returns a 'user' object for both admins and users)
//       await AsyncStorage.setItem("user", JSON.stringify(data.user));
//       await AsyncStorage.setItem("token", data.token);

//       set({ token: data.token, user: data.user, isLoading: false });

//       return { success: true };
//     } catch (error) {
//       set({ isLoading: false });
//       return { success: false, error: error.message };
//     }
//   },

//   checkAuth: async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const userJson = await AsyncStorage.getItem("user");
//       const user = userJson ? JSON.parse(userJson) : null;

//       set({ token, user });
//     } catch (error) {
//       console.log("Auth check failed", error);
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   logout: async () => {
//     await AsyncStorage.removeItem("token");
//     await AsyncStorage.removeItem("user");
//     set({ token: null, user: null });
//   },
// }));

