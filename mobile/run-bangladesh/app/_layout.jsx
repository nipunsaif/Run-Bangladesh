// import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import SafeScreen from "../components/SafeScreen";
// import { StatusBar } from "expo-status-bar";
// import { useFonts } from "expo-font";

// import { useAuthStore } from "../store/authStore";
// import { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const router = useRouter();
//   const segments = useSegments();

//   const { checkAuth, user, token } = useAuthStore();

//   const [fontsLoaded] = useFonts({
//     "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
//   });

//   useEffect(() => {
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded]);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   // handle navigation based on the auth state
//   useEffect(() => {
//     const inAuthScreen = segments[0] === "(auth)";
//     const isSignedIn = user && token;

//     if (!isSignedIn && !inAuthScreen) router.replace("/auth)");
//     else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
//   }, [user, token, segments]);

//   return (
//     <SafeAreaProvider>
//       <SafeScreen>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="(tabs)" />
//           <Stack.Screen name="(auth)" />
//           <Stack.Screen name="register" />
//         </Stack>
//       </SafeScreen>
//       <StatusBar style="dark" />
//     </SafeAreaProvider>
//   );
// }


import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
// 1. Import Stripe Provider
import { StripeProvider } from "@stripe/stripe-react-native";

import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token } = useAuthStore();

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    checkAuth();
  }, []);

  // handle navigation based on the auth state
  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    // Fixed Typo: "/auth)" -> "/(auth)"
    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments]);

  // 2. Replace with your actual Stripe Publishable Key
  const STRIPE_KEY = "pk_test_51ScfFaGV20NnVQMC894lBguWiRzuIiZugKb1IYMHw82eB2DzokFE9qiL3lv6xeIgBCBHOMEnx8knHIe9CZaxX0sz00N629FzOu";

  return (
    // 3. Wrap app with StripeProvider
    <StripeProvider publishableKey={STRIPE_KEY}>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="register" />
          </Stack>
        </SafeScreen>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </StripeProvider>
  );
}