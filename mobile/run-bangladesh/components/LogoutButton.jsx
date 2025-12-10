// import { View, Text, TouchableOpacity, Alert } from "react-native";
// import { useAuthStore } from "../store/authStore";
// import styles from "../assets/styles/profile.styles";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../constants/colors";

// export default function LogoutButton() {
//   const { logout } = useAuthStore();

//   const confirmLogout = () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Logout", onPress: () => logout(), style: "destructive" },
//     ]);
//   };

//   return (
//     <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
//       <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
//       <Text style={styles.logoutText}>Logout</Text>
//     </TouchableOpacity>
//   );
// }


import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "expo-router"; 
import styles from "../assets/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter(); 

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        // 3. Make onPress async to handle navigation
        onPress: async () => {
          await logout();
          
          // Navigate to (auth)/index.js
          // Since (auth) is a group, the URL path is usually just "/"
          router.replace("/"); 
        } 
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
      <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}