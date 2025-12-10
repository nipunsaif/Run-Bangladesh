import React from "react";
import { View } from "react-native";
import renderer, { act } from "react-test-renderer";
import RootLayout from "./_layout";

// --- 1. MOCK DEPENDENCIES ---

// Mock Expo Router
const mockReplace = jest.fn();
jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");

  const Stack = ({ children }) => <View testID="mock-stack">{children}</View>;
  Stack.Screen = () => <View testID="mock-screen" />;

  return {
    useRouter: () => ({ replace: mockReplace }),
    useSegments: () => [], 
    Stack: Stack,
    SplashScreen: {
      hideAsync: jest.fn(),
      preventAutoHideAsync: jest.fn(),
    },
  };
});

// Mock Stripe Provider
jest.mock("@stripe/stripe-react-native", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    StripeProvider: ({ children }) => <View testID="stripe-provider">{children}</View>,
  };
});

// Mock SafeArea Context
jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    SafeAreaProvider: ({ children }) => <View testID="safe-area">{children}</View>,
  };
});

// Mock Fonts
jest.mock("expo-font", () => ({
  useFonts: () => [true], 
}));

// Mock Auth Store
const mockCheckAuth = jest.fn();
jest.mock("../store/authStore", () => ({
  useAuthStore: () => ({
    checkAuth: mockCheckAuth,
    user: null,
    token: null,
  }),
}));

// Mock SafeScreen Component
jest.mock("../components/SafeScreen", () => {
  const React = require("react");
  const { View } = require("react-native");
  return ({ children }) => <View testID="safe-screen">{children}</View>;
});

describe("<RootLayout />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders successfully (Provider Structure Check)", async () => {
    let tree;
    await act(async () => {
      tree = renderer.create(<RootLayout />);
    });

    const root = tree.root;

    // Check if providers are present
    expect(root.findByProps({ testID: "stripe-provider" })).toBeTruthy();
    expect(root.findByProps({ testID: "safe-area" })).toBeTruthy();
    expect(root.findByProps({ testID: "mock-stack" })).toBeTruthy();
    
    // Check if checkAuth was called on mount
    expect(mockCheckAuth).toHaveBeenCalledTimes(1);
  });
});