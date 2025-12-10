// import { useState } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter } from "expo-router";
// import styles from "../../assets/styles/create.styles";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import { useAuthStore } from "../../store/authStore";

// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { API_URL } from "../../constants/api";

// export default function Create() {
//   const [title, setTitle] = useState("");
//   const [caption, setCaption] = useState("");
//   const [rating, setRating] = useState(3);
//   const [image, setImage] = useState(null); // to display the selected image
//   const [imageBase64, setImageBase64] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { token } = useAuthStore();

//   console.log(token);

//   const pickImage = async () => {
//     try {
//       // request permission if needed
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
//           return;
//         }
//       }

//       // launch image library
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: "images",
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.5, // lower quality for smaller base64
//         base64: true,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);

//         // if base64 is provided, use it

//         if (result.assets[0].base64) {
//           setImageBase64(result.assets[0].base64);
//         } else {
//           // otherwise, convert to base64
//           const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });

//           setImageBase64(base64);
//         }
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "There was a problem selecting your image");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!title || !caption || !imageBase64) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // get file extension from URI or default to jpeg
//       const uriParts = image.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

//       const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

//       const response = await fetch(`${API_URL}/books`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           caption,
//           rating: rating.toString(),
//           image: imageDataUrl,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       Alert.alert("Success", "Your book recommendation has been posted!");
//       setTitle("");
//       setCaption("");
//       setRating(3);
//       setImage(null);
//       setImageBase64(null);
//       router.push("/");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       Alert.alert("Error", error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderRatingPicker = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
//           <Ionicons
//             name={i <= rating ? "star" : "star-outline"}
//             size={32}
//             color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           />
//         </TouchableOpacity>
//       );
//     }
//     return <View style={styles.ratingContainer}>{stars}</View>;
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
//         <View style={styles.card}>
//           {/* HEADER */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Add New Event</Text>
//             <Text style={styles.subtitle}>Run For Better Bangladesh</Text>
//           </View>

//           <View style={styles.form}>
//             {/* BOOK TITLE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Title</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="book-outline"
//                   size={20}
//                   color={COLORS.textSecondary}
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter event title"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={title}
//                   onChangeText={setTitle}
//                 />
//               </View>
//             </View>

//             {/* RATING */}
//             {/* <View style={styles.formGroup}>
//               <Text style={styles.label}>Your Rating</Text>
//               {renderRatingPicker()}
//             </View> */}

//             {/* IMAGE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Cover Image</Text>
//               <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//                 {image ? (
//                   <Image source={{ uri: image }} style={styles.previewImage} />
//                 ) : (
//                   <View style={styles.placeholderContainer}>
//                     <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
//                     <Text style={styles.placeholderText}>Tap to select image</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* CAPTION */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Caption</Text>
//               <TextInput
//                 style={styles.textArea}
//                 placeholder="Write event details..."
//                 placeholderTextColor={COLORS.placeholderText}
//                 value={caption}
//                 onChangeText={setCaption}
//                 multiline
//               />
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//               {loading ? (
//                 <ActivityIndicator color={COLORS.white} />
//               ) : (
//                 <>
//                   <Ionicons
//                     name="cloud-upload-outline"
//                     size={20}
//                     color={COLORS.white}
//                     style={styles.buttonIcon}
//                   />
//                   <Text style={styles.buttonText}>Share</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }



// import { useState } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter } from "expo-router";
// import styles from "../../assets/styles/create.styles";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import { useAuthStore } from "../../store/authStore";

// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { API_URL } from "../../constants/api";

// export default function Create() {
//   const [title, setTitle] = useState("");
//   const [caption, setCaption] = useState("");
//   const [rating, setRating] = useState(3);
//   const [image, setImage] = useState(null); // to display the selected image
//   const [imageBase64, setImageBase64] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { token } = useAuthStore();

//   console.log(token);

//   const pickImage = async () => {
//     try {
//       // request permission if needed
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
//           return;
//         }
//       }

//       // launch image library
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: "images",
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.5, // lower quality for smaller base64
//         base64: true,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);

//         // if base64 is provided, use it

//         if (result.assets[0].base64) {
//           setImageBase64(result.assets[0].base64);
//         } else {
//           // otherwise, convert to base64
//           const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });

//           setImageBase64(base64);
//         }
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "There was a problem selecting your image");
//     }
//   };

//   const handleSubmit = async () => {
//     if (!title || !caption || !imageBase64 || !rating) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // get file extension from URI or default to jpeg
//       const uriParts = image.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";

//       const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

//       const response = await fetch(`${API_URL}/books`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           caption,
//           rating: rating.toString(),
//           image: imageDataUrl,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       Alert.alert("Success", "Your book event has been posted!");
//       setTitle("");
//       setCaption("");
//       setRating(3);
//       setImage(null);
//       setImageBase64(null);
//       router.push("/");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       Alert.alert("Error", error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderRatingPicker = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
//           <Ionicons
//             name={i <= rating ? "star" : "star-outline"}
//             size={32}
//             color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           />
//         </TouchableOpacity>
//       );
//     }
//     return <View style={styles.ratingContainer}>{stars}</View>;
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
//         <View style={styles.card}>
//           {/* HEADER */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Add New Event</Text>
//             <Text style={styles.subtitle}>Share your favorite reads with others</Text>
//           </View>

//           <View style={styles.form}>
//             {/* BOOK TITLE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Title</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="book-outline"
//                   size={20}
//                   color={COLORS.textSecondary}
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter book title"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={title}
//                   onChangeText={setTitle}
//                 />
//               </View>
//             </View>

//             {/* RATING */}
//             {/* <View style={styles.formGroup}>
//               <Text style={styles.label}>Your Rating</Text>
//               {renderRatingPicker()}
//             </View> */}

//             {/* IMAGE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Cover Image</Text>
//               <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//                 {image ? (
//                   <Image source={{ uri: image }} style={styles.previewImage} />
//                 ) : (
//                   <View style={styles.placeholderContainer}>
//                     <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
//                     <Text style={styles.placeholderText}>Tap to select image</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* CAPTION */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Description</Text>
//               <TextInput
//                 style={styles.textArea}
//                 placeholder="Write your review or thoughts about this book..."
//                 placeholderTextColor={COLORS.placeholderText}
//                 value={caption}
//                 onChangeText={setCaption}
//                 multiline
//               />
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//               {loading ? (
//                 <ActivityIndicator color={COLORS.white} />
//               ) : (
//                 <>
//                   <Ionicons
//                     name="cloud-upload-outline"
//                     size={20}
//                     color={COLORS.white}
//                     style={styles.buttonIcon}
//                   />
//                   <Text style={styles.buttonText}>Share</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }



// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
//   Modal,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { useRouter } from "expo-router";
// import styles from "../../assets/styles/create.styles";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import { useAuthStore } from "../../store/authStore";

// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import * as Location from "expo-location";
// import MapView, { Marker, Polyline } from "react-native-maps"; // Import Map Components
// import { API_URL } from "../../constants/api";

// export default function Create() {
//   const [title, setTitle] = useState("");
//   const [caption, setCaption] = useState("");
//   const [rating, setRating] = useState(3);
//   const [image, setImage] = useState(null);
//   const [imageBase64, setImageBase64] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- Location State ---
//   const [startLocation, setStartLocation] = useState(null);
//   const [endLocation, setEndLocation] = useState(null);
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectingFor, setSelectingFor] = useState(null); // 'start' or 'end'
//   const [currentRegion, setCurrentRegion] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });
//   // ----------------------

//   const router = useRouter();
//   const { token } = useAuthStore();

//   // Get User's Current Location on Mount
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });
//     })();
//   }, []);

//   const pickImage = async () => {
//     try {
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
//           return;
//         }
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: "images",
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.5,
//         base64: true,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//         if (result.assets[0].base64) {
//           setImageBase64(result.assets[0].base64);
//         } else {
//           const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           setImageBase64(base64);
//         }
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "There was a problem selecting your image");
//     }
//   };

//   // --- Map Handlers ---
//   const openMap = (type) => {
//     setSelectingFor(type);
//     setMapVisible(true);
//   };

//   const handleMapPress = (event) => {
//     const coords = event.nativeEvent.coordinate;
//     if (selectingFor === 'start') {
//       setStartLocation(coords);
//     } else if (selectingFor === 'end') {
//       setEndLocation(coords);
//     }
//   };

//   const confirmLocation = () => {
//     setMapVisible(false);
//     setSelectingFor(null);
//   };
//   // --------------------

//   const handleSubmit = async () => {
//     if (!title || !caption || !imageBase64 || !startLocation || !endLocation) {
//       Alert.alert("Error", "Please fill in all fields including locations.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const uriParts = image.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
//       const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

//       const response = await fetch(`${API_URL}/books`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           caption,
//           rating: rating.toString(),
//           image: imageDataUrl,
//           // Sending coordinates as strings or objects depending on your backend requirement
//           startLocation: JSON.stringify(startLocation),
//           endLocation: JSON.stringify(endLocation),
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       Alert.alert("Success", "Your book event has been posted!");
//       // Reset State
//       setTitle("");
//       setCaption("");
//       setRating(3);
//       setImage(null);
//       setImageBase64(null);
//       setStartLocation(null);
//       setEndLocation(null);
//       router.push("/");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       Alert.alert("Error", error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
//         <View style={styles.card}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Add New Event</Text>
//             <Text style={styles.subtitle}>Share your favorite reads with others</Text>
//           </View>

//           <View style={styles.form}>
//             {/* TITLE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Title</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="book-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter book title"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={title}
//                   onChangeText={setTitle}
//                 />
//               </View>
//             </View>

//             {/* LOCATION PICKERS */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Route</Text>
              
//               {/* Start Location Button */}
//               <TouchableOpacity 
//                 style={[styles.locationButton, startLocation && styles.locationButtonActive]} 
//                 onPress={() => openMap('start')}
//               >
//                 <Ionicons name="location" size={20} color={startLocation ? COLORS.white : COLORS.primary} />
//                 <Text style={startLocation ? styles.locationTextActive : styles.locationText}>
//                   {startLocation ? "Start Point Set" : "Set Start Location"}
//                 </Text>
//               </TouchableOpacity>

//               {/* End Location Button */}
//               <TouchableOpacity 
//                 style={[styles.locationButton, endLocation && styles.locationButtonActive, { marginTop: 10 }]} 
//                 onPress={() => openMap('end')}
//               >
//                 <Ionicons name="flag" size={20} color={endLocation ? COLORS.white : COLORS.primary} />
//                 <Text style={endLocation ? styles.locationTextActive : styles.locationText}>
//                   {endLocation ? "End Point Set" : "Set End Location"}
//                 </Text>
//               </TouchableOpacity>

//               {/* Mini Map Preview (Optional: Shows route if both set) */}
//               {startLocation && endLocation && (
//                 <View style={mapStyles.miniMapContainer}>
//                    <MapView
//                     style={mapStyles.miniMap}
//                     scrollEnabled={false}
//                     zoomEnabled={false}
//                     initialRegion={{
//                       latitude: (startLocation.latitude + endLocation.latitude) / 2,
//                       longitude: (startLocation.longitude + endLocation.longitude) / 2,
//                       latitudeDelta: Math.abs(startLocation.latitude - endLocation.latitude) * 1.5,
//                       longitudeDelta: Math.abs(startLocation.longitude - endLocation.longitude) * 1.5,
//                     }}
//                    >
//                      <Marker coordinate={startLocation} pinColor="green" />
//                      <Marker coordinate={endLocation} pinColor="red" />
//                      <Polyline coordinates={[startLocation, endLocation]} strokeWidth={2} strokeColor={COLORS.primary} />
//                    </MapView>
//                 </View>
//               )}
//             </View>

//             {/* IMAGE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Cover Image</Text>
//               <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//                 {image ? (
//                   <Image source={{ uri: image }} style={styles.previewImage} />
//                 ) : (
//                   <View style={styles.placeholderContainer}>
//                     <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
//                     <Text style={styles.placeholderText}>Tap to select image</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* CAPTION */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Description</Text>
//               <TextInput
//                 style={styles.textArea}
//                 placeholder="Details about the event..."
//                 placeholderTextColor={COLORS.placeholderText}
//                 value={caption}
//                 onChangeText={setCaption}
//                 multiline
//               />
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//               {loading ? (
//                 <ActivityIndicator color={COLORS.white} />
//               ) : (
//                 <>
//                   <Ionicons name="cloud-upload-outline" size={20} color={COLORS.white} style={styles.buttonIcon} />
//                   <Text style={styles.buttonText}>Share Event</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* --- FULL SCREEN MAP MODAL --- */}
//         <Modal visible={mapVisible} animationType="slide">
//           <View style={mapStyles.modalContainer}>
//             <View style={mapStyles.modalHeader}>
//               <Text style={mapStyles.modalTitle}>
//                 {selectingFor === 'start' ? "Pick Start Point" : "Pick End Point"}
//               </Text>
//               <Text style={mapStyles.modalSubtitle}>Tap on the map to place marker</Text>
//             </View>

//             <MapView
//               style={mapStyles.map}
//               initialRegion={currentRegion}
//               showsUserLocation={true}
//               onPress={handleMapPress}
//             >
//               {startLocation && <Marker coordinate={startLocation} title="Start" pinColor="green" />}
//               {endLocation && <Marker coordinate={endLocation} title="End" pinColor="red" />}
              
//               {/* Temporary marker for what user is currently selecting */}
//               {selectingFor === 'start' && startLocation && (
//                  <Marker coordinate={startLocation} pinColor="green" />
//               )}
//               {selectingFor === 'end' && endLocation && (
//                  <Marker coordinate={endLocation} pinColor="red" />
//               )}
//             </MapView>

//             <View style={mapStyles.modalFooter}>
//               <TouchableOpacity 
//                 style={[styles.button, { backgroundColor: COLORS.secondary, flex: 1, marginRight: 10 }]} 
//                 onPress={() => setMapVisible(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.button, { flex: 1 }]} 
//                 onPress={confirmLocation}
//               >
//                 <Text style={styles.buttonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// // Additional styles for Map integration
// // (You can move these to your external style file if preferred)
// const mapStyles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   modalHeader: {
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     zIndex: 1,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.textPrimary,
//   },
//   modalSubtitle: {
//     fontSize: 14,
//     color: COLORS.textSecondary,
//     marginTop: 5,
//   },
//   map: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   modalFooter: {
//     position: 'absolute',
//     bottom: 30,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   miniMapContainer: {
//     marginTop: 15,
//     height: 150,
//     width: '100%',
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   miniMap: {
//     flex: 1,
//   }
// });




// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   KeyboardAvoidingView,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
//   Modal,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { useRouter } from "expo-router";
// import styles from "../../assets/styles/create.styles";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import { useAuthStore } from "../../store/authStore";

// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import * as Location from "expo-location";
// import MapView, { Marker, Polyline } from "react-native-maps"; 
// import { API_URL } from "../../constants/api";

// export default function Create() {
//   const [title, setTitle] = useState("");
//   const [caption, setCaption] = useState("");
//   const [rating, setRating] = useState(3);
//   const [image, setImage] = useState(null);
//   const [imageBase64, setImageBase64] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // --- Location State ---
//   const [startLocation, setStartLocation] = useState(null);
//   const [endLocation, setEndLocation] = useState(null);
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectingFor, setSelectingFor] = useState(null); // 'start' or 'end'

//   // ✅ UPDATED: DEFAULT REGION SET TO BANGLADESH (DHAKA CENTER)
//   const [currentRegion, setCurrentRegion] = useState({
//     latitude: 23.8103, // Dhaka Latitude
//     longitude: 90.4125, // Dhaka Longitude
//     latitudeDelta: 0.1, // Zoom level (smaller = closer, larger = wider view)
//     longitudeDelta: 0.1,
//   });
//   // ----------------------

//   const router = useRouter();
//   const { token } = useAuthStore();

//   useEffect(() => {
//     (async () => {
//       // We attempt to get the real user location, but we start with Bangladesh as default
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         // If denied, we just stay on the default Bangladesh coordinates
//         return;
//       }

//       // Optional: If you want to force Bangladesh even if the user is elsewhere (or on a US simulator),
//       // you can comment out the lines below. 
//       // Otherwise, this will move the map to their real GPS location if found.
//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });
//     })();
//   }, []);

//   const pickImage = async () => {
//     try {
//       if (Platform.OS !== "web") {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "We need camera roll permissions to upload an image");
//           return;
//         }
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: "images",
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.5,
//         base64: true,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//         if (result.assets[0].base64) {
//           setImageBase64(result.assets[0].base64);
//         } else {
//           const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           setImageBase64(base64);
//         }
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//       Alert.alert("Error", "There was a problem selecting your image");
//     }
//   };

//   // --- Map Handlers ---
//   const openMap = (type) => {
//     setSelectingFor(type);
//     setMapVisible(true);
//   };

//   const handleMapPress = (event) => {
//     const coords = event.nativeEvent.coordinate;
//     if (selectingFor === 'start') {
//       setStartLocation(coords);
//     } else if (selectingFor === 'end') {
//       setEndLocation(coords);
//     }
//   };

//   const confirmLocation = () => {
//     setMapVisible(false);
//     setSelectingFor(null);
//   };
//   // --------------------

//   const handleSubmit = async () => {
//     // Validate both start and end locations are set
//     if (!title || !caption || !imageBase64 || !startLocation || !endLocation) {
//       Alert.alert("Error", "Please fill in all fields including route points.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const uriParts = image.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
//       const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

//       const response = await fetch(`${API_URL}/books`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           caption,
//           rating: rating.toString(),
//           image: imageDataUrl,
//           startLocation: JSON.stringify(startLocation),
//           endLocation: JSON.stringify(endLocation),
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       Alert.alert("Success", "Your event has been posted!");
      
//       // Reset everything
//       setTitle("");
//       setCaption("");
//       setRating(3);
//       setImage(null);
//       setImageBase64(null);
//       setStartLocation(null);
//       setEndLocation(null);
      
//       router.push("/");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       Alert.alert("Error", error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
//         <View style={styles.card}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Add New Event</Text>
//             <Text style={styles.subtitle}>Share your route and details</Text>
//           </View>

//           <View style={styles.form}>
//             {/* TITLE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Title</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="book-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter event title"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={title}
//                   onChangeText={setTitle}
//                 />
//               </View>
//             </View>

//             {/* LOCATION PICKERS */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Route</Text>
              
//               <TouchableOpacity 
//                 style={[styles.locationButton, startLocation && styles.locationButtonActive]} 
//                 onPress={() => openMap('start')}
//               >
//                 <Ionicons name="location" size={20} color={startLocation ? COLORS.white : COLORS.primary} />
//                 <Text style={startLocation ? styles.locationTextActive : styles.locationText}>
//                   {startLocation ? "Start Point Set" : "Set Start Location"}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity 
//                 style={[styles.locationButton, endLocation && styles.locationButtonActive, { marginTop: 10 }]} 
//                 onPress={() => openMap('end')}
//               >
//                 <Ionicons name="flag" size={20} color={endLocation ? COLORS.white : COLORS.primary} />
//                 <Text style={endLocation ? styles.locationTextActive : styles.locationText}>
//                   {endLocation ? "End Point Set" : "Set End Location"}
//                 </Text>
//               </TouchableOpacity>

//               {/* MINI MAP PREVIEW */}
//               {startLocation && endLocation && (
//                 <View style={mapStyles.miniMapContainer}>
//                    <MapView
//                     style={mapStyles.miniMap}
//                     scrollEnabled={false}
//                     zoomEnabled={false}
//                     initialRegion={{
//                       latitude: (startLocation.latitude + endLocation.latitude) / 2,
//                       longitude: (startLocation.longitude + endLocation.longitude) / 2,
//                       latitudeDelta: Math.abs(startLocation.latitude - endLocation.latitude) * 1.5 || 0.05,
//                       longitudeDelta: Math.abs(startLocation.longitude - endLocation.longitude) * 1.5 || 0.05,
//                     }}
//                    >
//                      <Marker coordinate={startLocation} pinColor="green" />
//                      <Marker coordinate={endLocation} pinColor="red" />
//                      <Polyline coordinates={[startLocation, endLocation]} strokeWidth={2} strokeColor={COLORS.primary} />
//                    </MapView>
//                 </View>
//               )}
//             </View>

//             {/* IMAGE */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Event Cover Image</Text>
//               <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//                 {image ? (
//                   <Image source={{ uri: image }} style={styles.previewImage} />
//                 ) : (
//                   <View style={styles.placeholderContainer}>
//                     <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
//                     <Text style={styles.placeholderText}>Tap to select image</Text>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </View>

//             {/* CAPTION */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Description</Text>
//               <TextInput
//                 style={styles.textArea}
//                 placeholder="Details about the event..."
//                 placeholderTextColor={COLORS.placeholderText}
//                 value={caption}
//                 onChangeText={setCaption}
//                 multiline
//               />
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
//               {loading ? (
//                 <ActivityIndicator color={COLORS.white} />
//               ) : (
//                 <>
//                   <Ionicons name="cloud-upload-outline" size={20} color={COLORS.white} style={styles.buttonIcon} />
//                   <Text style={styles.buttonText}>Share Event</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* --- MAP MODAL --- */}
//         <Modal visible={mapVisible} animationType="slide">
//           <View style={mapStyles.modalContainer}>
//             <View style={mapStyles.modalHeader}>
//               <Text style={mapStyles.modalTitle}>
//                 {selectingFor === 'start' ? "Pick Start Point" : "Pick End Point"}
//               </Text>
//               <Text style={mapStyles.modalSubtitle}>Tap map to select location (Bangladesh)</Text>
//             </View>

//             <MapView
//               style={mapStyles.map}
//               // ✅ Uses the region state which defaults to Bangladesh
//               region={currentRegion} 
//               onRegionChangeComplete={(region) => setCurrentRegion(region)} // Keeps map position when moving
//               showsUserLocation={true}
//               onPress={handleMapPress}
//             >
//               {startLocation && <Marker coordinate={startLocation} title="Start" pinColor="green" />}
//               {endLocation && <Marker coordinate={endLocation} title="End" pinColor="red" />}
              
//               {/* Dynamic Marker while selecting */}
//               {selectingFor === 'start' && startLocation && <Marker coordinate={startLocation} pinColor="green" />}
//               {selectingFor === 'end' && endLocation && <Marker coordinate={endLocation} pinColor="red" />}
//             </MapView>

//             <View style={mapStyles.modalFooter}>
//               <TouchableOpacity 
//                 style={[styles.button, { backgroundColor: COLORS.secondary, flex: 1, marginRight: 10 }]} 
//                 onPress={() => setMapVisible(false)}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity 
//                 style={[styles.button, { flex: 1 }]} 
//                 onPress={confirmLocation}
//               >
//                 <Text style={styles.buttonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const mapStyles = StyleSheet.create({
//   modalContainer: { flex: 1, backgroundColor: 'white' },
//   modalHeader: {
//     paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20,
//     backgroundColor: 'white', zIndex: 1, borderBottomWidth: 1, borderBottomColor: '#eee',
//   },
//   modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textPrimary },
//   modalSubtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 5 },
//   map: { flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height },
//   modalFooter: {
//     position: 'absolute', bottom: 30, left: 20, right: 20,
//     flexDirection: 'row', justifyContent: 'space-between',
//   },
//   miniMapContainer: {
//     marginTop: 15, height: 150, width: '100%', borderRadius: 12,
//     overflow: 'hidden', borderWidth: 1, borderColor: '#eee',
//   },
//   miniMap: { flex: 1 }
// });

import { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Dimensions,
  Keyboard
} from "react-native";
import { useRouter } from "expo-router";
import styles from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
import { API_URL } from "../../constants/api";

export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Location & Map State ---
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null); // 'start' or 'end'
  const [searchQuery, setSearchQuery] = useState(""); // Search text

  // 1. HARDCODED DEFAULT TO DHAKA, BANGLADESH
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 23.8103, 
    longitude: 90.4125,
    latitudeDelta: 0.05, 
    longitudeDelta: 0.05,
  });

  const router = useRouter();
  const { token } = useAuthStore();

  // NOTE: I removed the useEffect that auto-fetches location.
  // This prevents the simulator from jumping to the USA automatically.

  // --- Search Functionality ---
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    Keyboard.dismiss();
    try {
      // Use Expo Location to convert text to coordinates
      let geocodedLocation = await Location.geocodeAsync(searchQuery);

      if (geocodedLocation.length > 0) {
        const { latitude, longitude } = geocodedLocation[0];
        // Move map to the searched location
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } else {
        Alert.alert("Not Found", "Could not find that location.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not search location. Make sure you have internet.");
    }
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "We need camera roll permissions");
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        } else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setImageBase64(base64);
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // --- Map Actions ---
  const openMap = (type) => {
    setSelectingFor(type);
    setSearchQuery(""); // Clear search when opening
    setMapVisible(true);
  };

  const handleMapPress = (event) => {
    const coords = event.nativeEvent.coordinate;
    if (selectingFor === 'start') {
      setStartLocation(coords);
    } else if (selectingFor === 'end') {
      setEndLocation(coords);
    }
  };

  const confirmLocation = () => {
    setMapVisible(false);
    setSelectingFor(null);
  };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !startLocation || !endLocation) {
      Alert.alert("Error", "Please fill in all fields including locations.");
      return;
    }

    try {
      setLoading(true);

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType ? `image/${fileType.toLowerCase()}` : "image/jpeg";
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
          startLocation: JSON.stringify(startLocation),
          endLocation: JSON.stringify(endLocation),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      Alert.alert("Success", "Event posted successfully!");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);
      setStartLocation(null);
      setEndLocation(null);
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Event</Text>
            <Text style={styles.subtitle}>Share your route and details</Text>
          </View>

          <View style={styles.form}>
            {/* TITLE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="book-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter event title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* LOCATION BUTTONS */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Route</Text>
              
              <TouchableOpacity 
                style={[styles.locationButton, startLocation && styles.locationButtonActive]} 
                onPress={() => openMap('start')}
              >
                <Ionicons name="location" size={20} color={startLocation ? COLORS.white : COLORS.primary} />
                <Text style={startLocation ? styles.locationTextActive : styles.locationText}>
                  {startLocation ? "Start Point Set" : "Set Start Location"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.locationButton, endLocation && styles.locationButtonActive, { marginTop: 10 }]} 
                onPress={() => openMap('end')}
              >
                <Ionicons name="flag" size={20} color={endLocation ? COLORS.white : COLORS.primary} />
                <Text style={endLocation ? styles.locationTextActive : styles.locationText}>
                  {endLocation ? "End Point Set" : "Set End Location"}
                </Text>
              </TouchableOpacity>

              {/* MINI MAP PREVIEW */}
              {startLocation && endLocation && (
                <View style={mapStyles.miniMapContainer}>
                   <MapView
                    style={mapStyles.miniMap}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    region={{
                      latitude: (startLocation.latitude + endLocation.latitude) / 2,
                      longitude: (startLocation.longitude + endLocation.longitude) / 2,
                      latitudeDelta: Math.abs(startLocation.latitude - endLocation.latitude) * 1.5 || 0.05,
                      longitudeDelta: Math.abs(startLocation.longitude - endLocation.longitude) * 1.5 || 0.05,
                    }}
                   >
                     <Marker coordinate={startLocation} pinColor="green" />
                     <Marker coordinate={endLocation} pinColor="red" />
                     <Polyline coordinates={[startLocation, endLocation]} strokeWidth={3} strokeColor={COLORS.primary} />
                   </MapView>
                </View>
              )}
            </View>

            {/* IMAGE */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Cover Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* CAPTION */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Details about the event..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={20} color={COLORS.white} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Share Event</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* --- FULL SCREEN MAP MODAL --- */}
        <Modal visible={mapVisible} animationType="slide">
          <View style={mapStyles.modalContainer}>
            
            {/* Search Bar Container */}
            <View style={mapStyles.searchContainer}>
                <View style={mapStyles.searchBox}>
                    <Ionicons name="search" size={20} color="#666" style={{marginRight: 8}} />
                    <TextInput 
                        placeholder="Search location (e.g. Uttara)"
                        style={mapStyles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <Ionicons name="close-circle" size={20} color="#ccc" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={mapStyles.searchButton} onPress={handleSearch}>
                    <Text style={mapStyles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            
            {/* Header info */}
            <View style={mapStyles.instructionBar}>
                <Text style={mapStyles.instructionText}>
                    {selectingFor === 'start' ? "📍 Tap to set Start Point" : "🏁 Tap to set End Point"}
                </Text>
            </View>

            <MapView
              style={mapStyles.map}
              region={currentRegion} 
              onRegionChangeComplete={region => setCurrentRegion(region)}
              onPress={handleMapPress}
            >
              {startLocation && <Marker coordinate={startLocation} title="Start" pinColor="green" />}
              {endLocation && <Marker coordinate={endLocation} title="End" pinColor="red" />}
              
              {/* Temporary Marker for current selection */}
              {selectingFor === 'start' && startLocation && <Marker coordinate={startLocation} pinColor="green" />}
              {selectingFor === 'end' && endLocation && <Marker coordinate={endLocation} pinColor="red" />}
            </MapView>

            {/* Bottom Action Buttons */}
            <View style={mapStyles.modalFooter}>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: COLORS.secondary, flex: 1, marginRight: 10 }]} 
                onPress={() => setMapVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, { flex: 1 }]} 
                onPress={confirmLocation}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Updated Map Styles with Search Bar
const mapStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  // Search Bar Styles
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    elevation: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Instruction Bar under Search
  instructionBar: {
    position: 'absolute',
    top: 105,
    left: 20,
    right: 20,
    zIndex: 9,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalFooter: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniMapContainer: {
    marginTop: 15,
    height: 150,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  miniMap: {
    flex: 1,
  }
});