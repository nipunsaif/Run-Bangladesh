// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function TabLayout() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: COLORS.primary,
//         headerTitleStyle: {
//           color: COLORS.textPrimary,
//           fontWeight: "600",
//         },
//         headerShadowVisible: false,
//         tabBarStyle: {
//           backgroundColor: COLORS.cardBackground,
//           borderTopWidth: 1,
//           borderTopColor: COLORS.border,
//           paddingTop: 5,
//           paddingBottom: insets.bottom,
//           height: 60 + insets.bottom,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="create"
//         options={{
//           title: "Create",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="add-circle-outline" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }




import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";

export default function TabLayout() {
  const { user } = useAuthStore();
  
  // Check if the logged-in user has the 'admin' role
  const isAdmin = user?.role === "admin";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* 1. HOME TAB (Visible to Everyone) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 2. CREATE TAB (Visible ONLY to Admin) */}
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          // logic: If NOT admin, set href to null to hide the tab button
          href: isAdmin ? "/(tabs)/create" : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 3. VOLUNTEER TAB (Visible ONLY to Admin) */}
      <Tabs.Screen
        name="volunteer"
        options={{
          title: "Volunteer",
          // logic: If NOT admin, set href to null to hide the tab button
          href: isAdmin ? "/(tabs)/volunteer" : null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 4. PROFILE TAB (Visible to Everyone) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}



