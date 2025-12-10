
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { Link } from "expo-router";
// import styles from "../../assets/styles/login.styles";
// // import styles from "/Users/nipunsaif/Desktop/v3/app/mobile/run-bangladesh/assets/styles/login.styles";
// import { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";

// import { useAuthStore } from "../../store/authStore";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { isLoading, login, isCheckingAuth } = useAuthStore();

//   const handleLogin = async () => {
//     const result = await login(email, password);

//     if (!result.success) Alert.alert("Error", result.error);
//   };

//   if (isCheckingAuth) return null;

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View style={styles.container}>
//         {/* ILLUSTRATION */}
//         <View style={styles.topIllustration}>
//           <Image
//             source={require("../../assets/images/run_bangladesh.jpg")}
//             style={styles.illustrationImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.card}>
//           <View style={styles.formContainer}>
//             {/* EMAIL */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="mail-outline"
//                   size={20}
//                   color={COLORS.primary}
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your email"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//               </View>
//             </View>

//             {/* PASSWORD */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <View style={styles.inputContainer}>
//                 {/* LEFT ICON */}
//                 <Ionicons
//                   name="lock-closed-outline"
//                   size={20}
//                   color={COLORS.primary}
//                   style={styles.inputIcon}
//                 />
//                 {/* INPUT */}
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your password"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                 />

//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                   style={styles.eyeIcon}
//                 >
//                   <Ionicons
//                     name={showPassword ? "eye-outline" : "eye-off-outline"}
//                     size={20}
//                     color={COLORS.primary}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Login</Text>
//               )}
//             </TouchableOpacity>


//             {/* FOOTER */}
//             <View style={styles.footer}>
//               <Text style={styles.footerText}>Don't have an account?</Text>
//               <Link href="/signup" asChild>
//                 <TouchableOpacity>
//                   <Text style={styles.link}>Sign Up</Text>
//                 </TouchableOpacity>
//               </Link>
//             </View>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }



// // File name index.jsx

// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { Link } from "expo-router";
// import styles from "../../assets/styles/login.styles";
// import { useState } from "react";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";

// import { useAuthStore } from "../../store/authStore";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
  
//   // State for handling Role Selection
//   const [selectedRole, setSelectedRole] = useState(null); // 'user' | 'admin' | null

//   const { isLoading, login, isCheckingAuth } = useAuthStore();

//   const RED_BUTTON_COLOR = '#E63946'; 

//   const handleLogin = async () => {
//     const result = await login(email, password);

//     if (!result.success) Alert.alert("Error", result.error);
//   };

//   if (isCheckingAuth) return null;

//   // --- RENDER: ROLE SELECTION SCREEN ---
//   if (!selectedRole) {
//     return (
//       <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
//         <View style={styles.topIllustration}>
//           <Image
//             source={require("../../assets/images/run_bangladesh.jpg")}
//             style={{ width: 150, height: 150, marginBottom: 40 }}
//             resizeMode="contain"
//           />
//         </View>

//         <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30, color: COLORS.primary }}>
//           Choose Account Type
//         </Text>

//         <View style={{ width: "100%", gap: 20 }}>
//           {/* USER SELECTION BUTTON */}
//           <TouchableOpacity
//             onPress={() => setSelectedRole("user")}
//             style={{
//               backgroundColor: RED_BUTTON_COLOR,
//               padding: 20,
//               borderRadius: 15,
//               flexDirection: "row",
//               alignItems: "center",
//               elevation: 3,
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.2,
//               shadowRadius: 4,
//             }}
//           >
//             <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 50, marginRight: 15 }}>
//               <Ionicons name="person" size={30} color="#fff" />
//             </View>
//             <View>
//               <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>User</Text>
//               <Text style={{ color: "#eee", fontSize: 12 }}>Login as a regular user</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={24} color="#eee" style={{ marginLeft: "auto" }} />
//           </TouchableOpacity>

//           {/* ADMIN SELECTION BUTTON */}
//           <TouchableOpacity
//             onPress={() => setSelectedRole("admin")}
//             style={{
//               backgroundColor: RED_BUTTON_COLOR,
//               padding: 20,
//               borderRadius: 15,
//               flexDirection: "row",
//               alignItems: "center",
//               elevation: 3,
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.2,
//               shadowRadius: 4,
//             }}
//           >
//             <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 50, marginRight: 15 }}>
//               <Ionicons name="shield-checkmark" size={30} color="#fff" />
//             </View>
//             <View>
//               <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Admin</Text>
//               <Text style={{ color: "#eee", fontSize: 12 }}>Access dashboard & controls</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={24} color="#eee" style={{ marginLeft: "auto" }} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   // --- RENDER: LOGIN FORM (If role is selected) ---
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View style={styles.container}>
//         <View style={styles.topIllustration}>
//           <Image
//             source={require("../../assets/images/run_bangladesh.jpg")}
//             style={styles.illustrationImage}
//             resizeMode="contain"
//           />
//         </View>

//         <View style={styles.card}>
//           <View style={styles.formContainer}>
            
//             {/* BACK / HEADER */}
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
//                 <TouchableOpacity onPress={() => setSelectedRole(null)} style={{ marginRight: 10 }}>
//                     <Ionicons name="arrow-back" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
//                     {selectedRole} Login
//                 </Text>
//             </View>

//             {/* EMAIL */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="mail-outline"
//                   size={20}
//                   color={COLORS.primary}
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your email"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//               </View>
//             </View>

//             {/* PASSWORD */}
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="lock-closed-outline"
//                   size={20}
//                   color={COLORS.primary}
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter your password"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                 />

//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                   style={styles.eyeIcon}
//                 >
//                   <Ionicons
//                     name={showPassword ? "eye-outline" : "eye-off-outline"}
//                     size={20}
//                     color={COLORS.primary}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
//               {isLoading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Login as {selectedRole === 'admin' ? 'Admin' : 'User'}</Text>
//               )}
//             </TouchableOpacity>

//             {/* FOOTER - Hide Sign up if Admin */}
//             {selectedRole === 'user' && (
//                 <View style={styles.footer}>
//                 <Text style={styles.footerText}>Don't have an account?</Text>
//                 <Link href="/signup" asChild>
//                     <TouchableOpacity>
//                     <Text style={styles.link}>Sign Up</Text>
//                     </TouchableOpacity>
//                 </Link>
//                 </View>
//             )}
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }





// // File name index.jsx

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import styles from "../../assets/styles/login.styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // State for handling Role Selection
  const [selectedRole, setSelectedRole] = useState(null); // 'user' | 'admin' | null

  const { isLoading, login, isCheckingAuth } = useAuthStore();

  const RED_BUTTON_COLOR = '#E63946'; 

  const handleLogin = async () => {
    // UPDATED: Pass 'selectedRole' so the store knows which endpoint to hit
    // and the app knows if the logged-in person is an admin or user.
    const result = await login(email, password, selectedRole);

    if (!result.success) Alert.alert("Error", result.error);
  };

  if (isCheckingAuth) return null;

  // --- RENDER: ROLE SELECTION SCREEN ---
  if (!selectedRole) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/run_bangladesh.jpg")}
            style={{ width: 150, height: 150, marginBottom: 40 }}
            resizeMode="contain"
          />
        </View>

        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 30, color: COLORS.primary }}>
          Choose Account Type
        </Text>

        <View style={{ width: "100%", gap: 20 }}>
          {/* USER SELECTION BUTTON */}
          <TouchableOpacity
            onPress={() => setSelectedRole("user")}
            style={{
              backgroundColor: RED_BUTTON_COLOR,
              padding: 20,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 50, marginRight: 15 }}>
              <Ionicons name="person" size={30} color="#fff" />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>User</Text>
              <Text style={{ color: "#eee", fontSize: 12 }}>Login as a regular user</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#eee" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>

          {/* ADMIN SELECTION BUTTON */}
          <TouchableOpacity
            onPress={() => setSelectedRole("admin")}
            style={{
              backgroundColor: RED_BUTTON_COLOR,
              padding: 20,
              borderRadius: 15,
              flexDirection: "row",
              alignItems: "center",
              elevation: 3,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 50, marginRight: 15 }}>
              <Ionicons name="shield-checkmark" size={30} color="#fff" />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Admin</Text>
              <Text style={{ color: "#eee", fontSize: 12 }}>Access dashboard & controls</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#eee" style={{ marginLeft: "auto" }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- RENDER: LOGIN FORM (If role is selected) ---
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/run_bangladesh.jpg")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.formContainer}>
            
            {/* BACK / HEADER */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => setSelectedRole(null)} style={{ marginRight: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {selectedRole} Login
                </Text>
            </View>

            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login as {selectedRole === 'admin' ? 'Admin' : 'User'}</Text>
              )}
            </TouchableOpacity>

            {/* FOOTER - Hide Sign up if Admin */}
            {selectedRole === 'user' && (
                <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Link href="/signup" asChild>
                    <TouchableOpacity>
                    <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                </Link>
                </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}