// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuthStore } from "../../store/authStore";
// import { API_URL } from "../../constants/api";
// import COLORS from "../../constants/colors";

// export default function RegisterEvent() {
//   const router = useRouter();
  
//   // 1. Receive params passed from Home (index.jsx)
//   const { eventId, eventTitle } = useLocalSearchParams();
  
//   const { user, token } = useAuthStore();

//   const [formData, setFormData] = useState({
//     fullName: user?.username || "",
//     email: user?.email || "",
//     phone: "",
//     age: "",
//     gender: "Male", // Default selection
//   });

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     // Basic Validation
//     if (!formData.fullName || !formData.phone || !formData.age) {
//       Alert.alert("Missing Details", "Please fill in all required fields.");
//       return;
//     }

//     if (!eventId) {
//       Alert.alert("Error", "Event ID is missing. Please go back and try again.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Construct Payload
//       const payload = {
//         eventId: eventId,
//         participantName: formData.fullName,
//         participantEmail: formData.email,
//         participantPhone: formData.phone,
//         participantAge: formData.age,
//         participantGender: formData.gender,
//       };

//       // API Call
//       // Make sure your backend has a POST route at /registrations
//       const response = await fetch(`${API_URL}/registrations`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       Alert.alert("Success", "You have successfully registered for the event!", [
//         { text: "OK", onPress: () => router.back() }
//       ]);
      
//     } catch (error) {
//       console.log("Registration Error:", error);
//       Alert.alert("Error", error.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1, backgroundColor: "#f8f9fa" }}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Event Registration</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
        
//         {/* Event Summary Card */}
//         <View style={styles.eventSummary}>
//             <Text style={styles.summaryLabel}>Registering for:</Text>
//             <Text style={styles.eventTitle}>{eventTitle || "Unknown Event"}</Text>
//             <View style={styles.eventIdContainer}>
//                 <Ionicons name="pricetag-outline" size={14} color="#666" />
//                 <Text style={styles.eventIdText}>ID: {eventId}</Text>
//             </View>
//         </View>

//         <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Participant Details</Text>

//             {/* Name */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formData.fullName}
//                     onChangeText={(text) => setFormData({...formData, fullName: text})}
//                     placeholder="Enter full name"
//                     placeholderTextColor="#999"
//                 />
//             </View>

//             {/* Email (Read Only) */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Email Address</Text>
//                 <TextInput
//                     style={[styles.input, styles.disabledInput]}
//                     value={formData.email}
//                     editable={false}
//                 />
//             </View>

//             {/* Phone */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formData.phone}
//                     onChangeText={(text) => setFormData({...formData, phone: text})}
//                     placeholder="+880 1XXX XXXXXX"
//                     placeholderTextColor="#999"
//                     keyboardType="phone-pad"
//                 />
//             </View>

//             {/* Age & Gender Row */}
//             <View style={styles.row}>
//                 <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
//                     <Text style={styles.label}>Age</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={formData.age}
//                         onChangeText={(text) => setFormData({...formData, age: text})}
//                         placeholder="e.g. 25"
//                         placeholderTextColor="#999"
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 <View style={[styles.inputGroup, { flex: 1 }]}>
//                     <Text style={styles.label}>Gender</Text>
//                     <View style={styles.genderContainer}>
//                         <TouchableOpacity 
//                             style={[styles.genderBtn, formData.gender === 'Male' && styles.genderBtnActive]}
//                             onPress={() => setFormData({...formData, gender: 'Male'})}
//                         >
//                             <Text style={[styles.genderText, formData.gender === 'Male' && styles.genderTextActive]}>M</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity 
//                             style={[styles.genderBtn, formData.gender === 'Female' && styles.genderBtnActive]}
//                             onPress={() => setFormData({...formData, gender: 'Female'})}
//                         >
//                             <Text style={[styles.genderText, formData.gender === 'Female' && styles.genderTextActive]}>F</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             {/* Terms Disclaimer */}
//             <Text style={styles.disclaimer}>
//                 By clicking confirm, you agree to the Run Bangladesh terms of service and safety guidelines.
//             </Text>

//             {/* Submit Button */}
//             <TouchableOpacity 
//                 style={styles.submitButton} 
//                 onPress={handleRegister}
//                 disabled={loading}
//             >
//                 {loading ? (
//                     <ActivityIndicator color="white" />
//                 ) : (
//                     <Text style={styles.submitButtonText}>Confirm Registration</Text>
//                 )}
//             </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   backButton: {
//     padding: 5,
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   container: {
//     padding: 20,
//   },
//   eventSummary: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 20,
//     borderLeftWidth: 5,
//     borderLeftColor: '#D43745',
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     color: '#888',
//     textTransform: 'uppercase',
//     marginBottom: 5,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   eventIdContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   eventIdText: {
//     fontSize: 12,
//     color: '#666',
//     marginLeft: 5,
//   },
//   formContainer: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//     color: '#333',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: '#f9f9f9',
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: '#333',
//   },
//   disabledInput: {
//     backgroundColor: '#f0f0f0',
//     color: '#999',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   genderContainer: {
//     flexDirection: 'row',
//     height: 50,
//   },
//   genderBtn: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#eee',
//     marginRight: 5,
//     borderRadius: 8,
//     backgroundColor: '#f9f9f9',
//   },
//   genderBtnActive: {
//     backgroundColor: '#D43745',
//     borderColor: '#D43745',
//   },
//   genderText: {
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   genderTextActive: {
//     color: 'white',
//   },
//   disclaimer: {
//     fontSize: 12,
//     color: '#999',
//     textAlign: 'center',
//     marginVertical: 20,
//     lineHeight: 18,
//   },
//   submitButton: {
//     backgroundColor: '#D43745',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#D43745",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   }
// });


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuthStore } from "../store/authStore";
// import { API_URL } from "../constants/api";

// // Define Dark Theme Colors locally for this screen
// const DARK_COLORS = {
//   background: "#121212",
//   surface: "#1E1E1E",
//   surfaceLighter: "#333333",
//   surfaceDisabled: "#444444",
//   textPrimary: "#FFFFFF",
//   textSecondary: "#AAAAAA",
//   border: "#333333",
//   primaryAccent: "#D43745", // Keeping your existing red
// };

// export default function RegisterEvent() {
//   const router = useRouter();
  
//   // 1. Receive params passed from Home (index.jsx)
//   const { eventId, eventTitle } = useLocalSearchParams();
  
//   const { user, token } = useAuthStore();

//   const [formData, setFormData] = useState({
//     fullName: user?.username || "",
//     email: user?.email || "",
//     phone: "",
//     age: "",
//     gender: "Male", // Default selection
//   });

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     // Basic Validation
//     if (!formData.fullName || !formData.phone || !formData.age) {
//       Alert.alert("Missing Details", "Please fill in all required fields.");
//       return;
//     }

//     if (!eventId) {
//       Alert.alert("Error", "Event ID is missing. Please go back and try again.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Construct Payload
//       const payload = {
//         eventId: eventId,
//         participantName: formData.fullName,
//         participantEmail: formData.email,
//         participantPhone: formData.phone,
//         participantAge: formData.age,
//         participantGender: formData.gender,
//       };

//       // API Call
//       const response = await fetch(`${API_URL}/registrations`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       Alert.alert("Success", "You have successfully registered for the event!", [
//         { text: "OK", onPress: () => router.back() }
//       ]);
      
//     } catch (error) {
//       console.log("Registration Error:", error);
//       Alert.alert("Error", error.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1, backgroundColor: DARK_COLORS.background }}
//     >
//       <StatusBar barStyle="light-content" />
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color={DARK_COLORS.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Event Registration</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
        
//         {/* Event Summary Card */}
//         <View style={styles.eventSummary}>
//             <Text style={styles.summaryLabel}>Registering for:</Text>
//             <Text style={styles.eventTitle}>{eventTitle || "Unknown Event"}</Text>
//             <View style={styles.eventIdContainer}>
//                 <Ionicons name="pricetag-outline" size={14} color={DARK_COLORS.textSecondary} />
//                 <Text style={styles.eventIdText}>ID: {eventId}</Text>
//             </View>
//         </View>

//         <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Participant Details</Text>

//             {/* Name */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formData.fullName}
//                     onChangeText={(text) => setFormData({...formData, fullName: text})}
//                     placeholder="Enter full name"
//                     placeholderTextColor={DARK_COLORS.textSecondary}
//                 />
//             </View>

//             {/* Email (Read Only) */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Email Address</Text>
//                 <TextInput
//                     style={[styles.input, styles.disabledInput]}
//                     value={formData.email}
//                     editable={false}
//                 />
//             </View>

//             {/* Phone */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formData.phone}
//                     onChangeText={(text) => setFormData({...formData, phone: text})}
//                     placeholder="+880 1XXX XXXXXX"
//                     placeholderTextColor={DARK_COLORS.textSecondary}
//                     keyboardType="phone-pad"
//                 />
//             </View>

//             {/* Age & Gender Row */}
//             <View style={styles.row}>
//                 <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
//                     <Text style={styles.label}>Age</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={formData.age}
//                         onChangeText={(text) => setFormData({...formData, age: text})}
//                         placeholder="e.g. 25"
//                         placeholderTextColor={DARK_COLORS.textSecondary}
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 <View style={[styles.inputGroup, { flex: 1 }]}>
//                     <Text style={styles.label}>Gender</Text>
//                     <View style={styles.genderContainer}>
//                         <TouchableOpacity 
//                             style={[styles.genderBtn, formData.gender === 'Male' && styles.genderBtnActive]}
//                             onPress={() => setFormData({...formData, gender: 'Male'})}
//                         >
//                             <Text style={[styles.genderText, formData.gender === 'Male' && styles.genderTextActive]}>M</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity 
//                             style={[styles.genderBtn, formData.gender === 'Female' && styles.genderBtnActive]}
//                             onPress={() => setFormData({...formData, gender: 'Female'})}
//                         >
//                             <Text style={[styles.genderText, formData.gender === 'Female' && styles.genderTextActive]}>F</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             {/* Terms Disclaimer */}
//             <Text style={styles.disclaimer}>
//                 By clicking confirm, you agree to the Run Bangladesh terms of service and safety guidelines.
//             </Text>

//             {/* Submit Button */}
//             <TouchableOpacity 
//                 style={styles.submitButton} 
//                 onPress={handleRegister}
//                 disabled={loading}
//             >
//                 {loading ? (
//                     <ActivityIndicator color="white" />
//                 ) : (
//                     <Text style={styles.submitButtonText}>Confirm Registration</Text>
//                 )}
//             </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     backgroundColor: DARK_COLORS.surface,
//     borderBottomWidth: 1,
//     borderBottomColor: DARK_COLORS.border,
//   },
//   backButton: {
//     padding: 5,
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: DARK_COLORS.textPrimary,
//   },
//   container: {
//     padding: 20,
//   },
//   eventSummary: {
//     backgroundColor: DARK_COLORS.surface,
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 20,
//     borderLeftWidth: 5,
//     borderLeftColor: DARK_COLORS.primaryAccent,
//     // Shadows are subtler in dark mode
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     color: DARK_COLORS.textSecondary,
//     textTransform: 'uppercase',
//     marginBottom: 5,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: DARK_COLORS.textPrimary,
//     marginBottom: 5,
//   },
//   eventIdContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   eventIdText: {
//     fontSize: 12,
//     color: DARK_COLORS.textSecondary,
//     marginLeft: 5,
//   },
//   formContainer: {
//     backgroundColor: DARK_COLORS.surface,
//     borderRadius: 12,
//     padding: 20,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//     color: DARK_COLORS.textPrimary,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: DARK_COLORS.textSecondary,
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: DARK_COLORS.surfaceLighter,
//     borderWidth: 1,
//     borderColor: DARK_COLORS.border,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: DARK_COLORS.textPrimary,
//   },
//   disabledInput: {
//     backgroundColor: DARK_COLORS.surfaceDisabled,
//     color: DARK_COLORS.textSecondary,
//     borderColor: DARK_COLORS.border,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   genderContainer: {
//     flexDirection: 'row',
//     height: 50,
//   },
//   genderBtn: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: DARK_COLORS.border,
//     marginRight: 5,
//     borderRadius: 8,
//     backgroundColor: DARK_COLORS.surfaceLighter,
//   },
//   genderBtnActive: {
//     backgroundColor: DARK_COLORS.primaryAccent,
//     borderColor: DARK_COLORS.primaryAccent,
//   },
//   genderText: {
//     fontWeight: 'bold',
//     color: DARK_COLORS.textSecondary,
//   },
//   genderTextActive: {
//     color: 'white',
//   },
//   disclaimer: {
//     fontSize: 12,
//     color: DARK_COLORS.textSecondary,
//     textAlign: 'center',
//     marginVertical: 20,
//     lineHeight: 18,
//   },
//   submitButton: {
//     backgroundColor: DARK_COLORS.primaryAccent,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: DARK_COLORS.primaryAccent,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   }
// });


// import { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useAuthStore } from "../store/authStore";
// import { API_URL } from "../constants/api";

// // Dark Theme Colors
// const DARK_COLORS = {
//   background: "#121212",
//   surface: "#1E1E1E",
//   surfaceLighter: "#333333",
//   surfaceDisabled: "#444444",
//   textPrimary: "#FFFFFF",
//   textSecondary: "#AAAAAA",
//   border: "#333333",
//   primaryAccent: "#D43745", 
// };

// export default function RegisterEvent() {
//   const router = useRouter();
//   const { eventId, eventTitle } = useLocalSearchParams();
//   const { user, token } = useAuthStore();

//   const [formData, setFormData] = useState({
//     fullName: user?.username || "",
//     email: user?.email || "",
//     phone: "",
//     age: "",
//     gender: "Male",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     if (!formData.fullName || !formData.phone || !formData.age) {
//       Alert.alert("Missing Details", "Please fill in all required fields.");
//       return;
//     }

//     if (!eventId) {
//       Alert.alert("Error", "Event ID is missing. Please go back and try again.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         eventId: eventId,
//         participantName: formData.fullName,
//         participantEmail: formData.email,
//         participantPhone: formData.phone,
//         participantAge: formData.age,
//         participantGender: formData.gender,
//       };

//       const response = await fetch(`${API_URL}/registrations`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       Alert.alert("Success", "You have successfully registered for the event!", [
//         { text: "OK", onPress: () => router.back() }
//       ]);
      
//     } catch (error) {
//       console.log("Registration Error:", error);
//       Alert.alert("Error", error.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1, backgroundColor: DARK_COLORS.background }}
//     >
//       <StatusBar barStyle="light-content" />
      
//       {/* --- UPDATED HEADER --- */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color={DARK_COLORS.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Event Registration</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.container}>
        
//         {/* Event Summary Card */}
//         <View style={styles.eventSummary}>
//             <Text style={styles.summaryLabel}>Registering for:</Text>
//             <Text style={styles.eventTitle}>{eventTitle || "Unknown Event"}</Text>
//             <View style={styles.eventIdContainer}>
//                 <Ionicons name="pricetag-outline" size={14} color={DARK_COLORS.textSecondary} />
//                 <Text style={styles.eventIdText}>ID: {eventId}</Text>
//             </View>
//         </View>

//         <View style={styles.formContainer}>
//             <Text style={styles.sectionTitle}>Participant Details</Text>

//             {/* Name */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formData.fullName}
//                     onChangeText={(text) => setFormData({...formData, fullName: text})}
//                     placeholder="Enter full name"
//                     placeholderTextColor={DARK_COLORS.textSecondary}
//                 />
//             </View>

//             {/* Email (Read Only) */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Email Address</Text>
//                 <TextInput
//                     style={[styles.input, styles.disabledInput]}
//                     value={formData.email}
//                     editable={false}
//                 />
//             </View>

//             {/* Phone */}
//             <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={formData.phone}
//                     onChangeText={(text) => setFormData({...formData, phone: text})}
//                     placeholder="+880 1XXX XXXXXX"
//                     placeholderTextColor={DARK_COLORS.textSecondary}
//                     keyboardType="phone-pad"
//                 />
//             </View>

//             {/* Age & Gender Row */}
//             <View style={styles.row}>
//                 <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
//                     <Text style={styles.label}>Age</Text>
//                     <TextInput
//                         style={styles.input}
//                         value={formData.age}
//                         onChangeText={(text) => setFormData({...formData, age: text})}
//                         placeholder="e.g. 25"
//                         placeholderTextColor={DARK_COLORS.textSecondary}
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 <View style={[styles.inputGroup, { flex: 1 }]}>
//                     <Text style={styles.label}>Gender</Text>
//                     <View style={styles.genderContainer}>
//                         <TouchableOpacity 
//                             style={[styles.genderBtn, formData.gender === 'Male' && styles.genderBtnActive]}
//                             onPress={() => setFormData({...formData, gender: 'Male'})}
//                         >
//                             <Text style={[styles.genderText, formData.gender === 'Male' && styles.genderTextActive]}>M</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity 
//                             style={[styles.genderBtn, formData.gender === 'Female' && styles.genderBtnActive]}
//                             onPress={() => setFormData({...formData, gender: 'Female'})}
//                         >
//                             <Text style={[styles.genderText, formData.gender === 'Female' && styles.genderTextActive]}>F</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             {/* Terms Disclaimer */}
//             <Text style={styles.disclaimer}>
//                 By clicking confirm, you agree to the Run Bangladesh terms of service and safety guidelines.
//             </Text>

//             {/* Submit Button */}
//             <TouchableOpacity 
//                 style={styles.submitButton} 
//                 onPress={handleRegister}
//                 disabled={loading}
//             >
//                 {loading ? (
//                     <ActivityIndicator color="white" />
//                 ) : (
//                     <Text style={styles.submitButtonText}>Confirm Registration</Text>
//                 )}
//             </TouchableOpacity>

//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   // --- FIXED HEADER STYLES ---
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // Adjusted padding: Smaller top padding (safe area) and tighter bottom padding
//     paddingTop: Platform.OS === 'ios' ? 20 : 20, 
//     paddingBottom: 15, 
//     paddingHorizontal: 20,
//     backgroundColor: DARK_COLORS.surface,
//     borderBottomWidth: 1,
//     borderBottomColor: DARK_COLORS.border,
//   },
//   backButton: {
//     padding: 5,
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 18, // Reduced from 20 to look cleaner
//     fontWeight: 'bold',
//     color: DARK_COLORS.textPrimary,
//   },
//   // ---------------------------
  
//   container: {
//     padding: 20,
//   },
//   eventSummary: {
//     backgroundColor: DARK_COLORS.surface,
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 20,
//     borderLeftWidth: 5,
//     borderLeftColor: DARK_COLORS.primaryAccent,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   summaryLabel: {
//     fontSize: 12,
//     color: DARK_COLORS.textSecondary,
//     textTransform: 'uppercase',
//     marginBottom: 5,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: DARK_COLORS.textPrimary,
//     marginBottom: 5,
//   },
//   eventIdContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   eventIdText: {
//     fontSize: 12,
//     color: DARK_COLORS.textSecondary,
//     marginLeft: 5,
//   },
//   formContainer: {
//     backgroundColor: DARK_COLORS.surface,
//     borderRadius: 12,
//     padding: 20,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//     color: DARK_COLORS.textPrimary,
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 14,
//     color: DARK_COLORS.textSecondary,
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: DARK_COLORS.surfaceLighter,
//     borderWidth: 1,
//     borderColor: DARK_COLORS.border,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: DARK_COLORS.textPrimary,
//   },
//   disabledInput: {
//     backgroundColor: DARK_COLORS.surfaceDisabled,
//     color: DARK_COLORS.textSecondary,
//     borderColor: DARK_COLORS.border,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   genderContainer: {
//     flexDirection: 'row',
//     height: 50,
//   },
//   genderBtn: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: DARK_COLORS.border,
//     marginRight: 5,
//     borderRadius: 8,
//     backgroundColor: DARK_COLORS.surfaceLighter,
//   },
//   genderBtnActive: {
//     backgroundColor: DARK_COLORS.primaryAccent,
//     borderColor: DARK_COLORS.primaryAccent,
//   },
//   genderText: {
//     fontWeight: 'bold',
//     color: DARK_COLORS.textSecondary,
//   },
//   genderTextActive: {
//     color: 'white',
//   },
//   disclaimer: {
//     fontSize: 12,
//     color: DARK_COLORS.textSecondary,
//     textAlign: 'center',
//     marginVertical: 20,
//     lineHeight: 18,
//   },
//   submitButton: {
//     backgroundColor: DARK_COLORS.primaryAccent,
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: DARK_COLORS.primaryAccent,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   }
// });


import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import { API_URL } from "../constants/api";
// 1. Import Stripe Hook
import { useStripe } from "@stripe/stripe-react-native";

// Dark Theme Colors
const DARK_COLORS = {
  background: "#121212",
  surface: "#1E1E1E",
  surfaceLighter: "#333333",
  surfaceDisabled: "#444444",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA",
  border: "#333333",
  primaryAccent: "#D43745", 
};

export default function RegisterEvent() {
  const router = useRouter();
  const { eventId, eventTitle, price } = useLocalSearchParams(); // Assuming price might be passed
  const { user, token } = useAuthStore();
  const { initPaymentSheet, presentPaymentSheet } = useStripe(); // 2. Initialize Hook

  const [formData, setFormData] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
    age: "",
    gender: "Male",
  });

  const [loading, setLoading] = useState(false);
  // Default fee if not passed via params
  const registrationFee = price || "500"; 

  // 3. Helper to fetch Payment Intent from your Backend
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payments/intents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventId: eventId,
        amount: registrationFee, // Send amount to backend
      }),
    });
    
    if (!response.ok) throw new Error("Could not initialize payment");
    
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const handlePayAndRegister = async () => {
    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.age) {
      Alert.alert("Missing Details", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // --- STEP 1: Initialize Payment Sheet ---
      // We fetch the client secret from the backend first
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: "Run Bangladesh",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set to true allows Apple Pay / Google Pay if configured
        allowsDelayedPaymentMethods: true, 
        defaultBillingDetails: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
        },
        appearance: {
            colors: {
                primary: DARK_COLORS.primaryAccent,
                background: DARK_COLORS.surface,
                componentBackground: DARK_COLORS.surfaceLighter,
                componentBorder: DARK_COLORS.border,
                componentDivider: DARK_COLORS.border,
                primaryText: DARK_COLORS.textPrimary,
                secondaryText: DARK_COLORS.textSecondary,
                componentText: DARK_COLORS.textPrimary,
                placeholderText: DARK_COLORS.textSecondary,
            },
        }
      });

      if (initError) {
        setLoading(false);
        Alert.alert("Payment Error", "Could not open payment sheet.");
        return;
      }

      // --- STEP 2: Present Payment Sheet (User Pays) ---
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        setLoading(false);
        // User cancelled or failed
        if (paymentError.code !== 'Canceled') {
             Alert.alert("Payment Failed", paymentError.message);
        }
        return;
      }

      // --- STEP 3: Payment Success -> Register User in Database ---
      // Now that payment is confirmed, we save the registration
      const payload = {
        eventId: eventId,
        participantName: formData.fullName,
        participantEmail: formData.email,
        participantPhone: formData.phone,
        participantAge: formData.age,
        participantGender: formData.gender,
        paymentStatus: "paid", // Add status
        amountPaid: registrationFee
      };

      const response = await fetch(`${API_URL}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed after payment");
      }

      Alert.alert("Success", "Payment & Registration Successful!", [
        { text: "OK", onPress: () => router.back() }
      ]);
      
    } catch (error) {
      console.log("Process Error:", error);
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: DARK_COLORS.background }}
    >
      <StatusBar barStyle="light-content" />
      
      {/* --- HEADER (Fixed Height) --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={DARK_COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Registration</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Event Summary Card */}
        <View style={styles.eventSummary}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start'}}>
                <View>
                    <Text style={styles.summaryLabel}>Registering for:</Text>
                    <Text style={styles.eventTitle}>{eventTitle || "Unknown Event"}</Text>
                    <View style={styles.eventIdContainer}>
                        <Ionicons name="pricetag-outline" size={14} color={DARK_COLORS.textSecondary} />
                        <Text style={styles.eventIdText}>ID: {eventId}</Text>
                    </View>
                </View>
                {/* Price Tag Display */}
                <View style={styles.priceTag}>
                    <Text style={styles.priceLabel}>Fee</Text>
                    <Text style={styles.priceValue}>৳{registrationFee}</Text>
                </View>
            </View>
        </View>

        <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Participant Details</Text>

            {/* Name */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={formData.fullName}
                    onChangeText={(text) => setFormData({...formData, fullName: text})}
                    placeholder="Enter full name"
                    placeholderTextColor={DARK_COLORS.textSecondary}
                />
            </View>

            {/* Email (Read Only) */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={formData.email}
                    editable={false}
                />
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) => setFormData({...formData, phone: text})}
                    placeholder="+880 1XXX XXXXXX"
                    placeholderTextColor={DARK_COLORS.textSecondary}
                    keyboardType="phone-pad"
                />
            </View>

            {/* Age & Gender Row */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.age}
                        onChangeText={(text) => setFormData({...formData, age: text})}
                        placeholder="e.g. 25"
                        placeholderTextColor={DARK_COLORS.textSecondary}
                        keyboardType="numeric"
                    />
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity 
                            style={[styles.genderBtn, formData.gender === 'Male' && styles.genderBtnActive]}
                            onPress={() => setFormData({...formData, gender: 'Male'})}
                        >
                            <Text style={[styles.genderText, formData.gender === 'Male' && styles.genderTextActive]}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.genderBtn, formData.gender === 'Female' && styles.genderBtnActive]}
                            onPress={() => setFormData({...formData, gender: 'Female'})}
                        >
                            <Text style={[styles.genderText, formData.gender === 'Female' && styles.genderTextActive]}>F</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Terms Disclaimer */}
            <Text style={styles.disclaimer}>
                By clicking "Pay & Register", you agree to the Run Bangladesh terms of service and safety guidelines.
            </Text>

            {/* Submit Button */}
            <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handlePayAndRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.submitButtonText}>Pay ৳{registrationFee} & Register</Text>
                )}
            </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 20, 
    paddingBottom: 15, 
    paddingHorizontal: 20,
    backgroundColor: DARK_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: DARK_COLORS.border,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_COLORS.textPrimary,
  },
  container: {
    padding: 20,
  },
  eventSummary: {
    backgroundColor: DARK_COLORS.surface,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: DARK_COLORS.primaryAccent,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: DARK_COLORS.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DARK_COLORS.textPrimary,
    marginBottom: 5,
    maxWidth: '70%',
  },
  eventIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIdText: {
    fontSize: 12,
    color: DARK_COLORS.textSecondary,
    marginLeft: 5,
  },
  // New Styles for Price
  priceTag: {
    alignItems: 'flex-end',
    backgroundColor: DARK_COLORS.surfaceLighter,
    padding: 8,
    borderRadius: 8,
  },
  priceLabel: {
    fontSize: 10,
    color: DARK_COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DARK_COLORS.primaryAccent,
  },
  formContainer: {
    backgroundColor: DARK_COLORS.surface,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: DARK_COLORS.textPrimary,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: DARK_COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: DARK_COLORS.surfaceLighter,
    borderWidth: 1,
    borderColor: DARK_COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: DARK_COLORS.textPrimary,
  },
  disabledInput: {
    backgroundColor: DARK_COLORS.surfaceDisabled,
    color: DARK_COLORS.textSecondary,
    borderColor: DARK_COLORS.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderContainer: {
    flexDirection: 'row',
    height: 50,
  },
  genderBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DARK_COLORS.border,
    marginRight: 5,
    borderRadius: 8,
    backgroundColor: DARK_COLORS.surfaceLighter,
  },
  genderBtnActive: {
    backgroundColor: DARK_COLORS.primaryAccent,
    borderColor: DARK_COLORS.primaryAccent,
  },
  genderText: {
    fontWeight: 'bold',
    color: DARK_COLORS.textSecondary,
  },
  genderTextActive: {
    color: 'white',
  },
  disclaimer: {
    fontSize: 12,
    color: DARK_COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: DARK_COLORS.primaryAccent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: DARK_COLORS.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});