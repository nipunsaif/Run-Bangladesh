// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { useAuthStore } from "../../store/authStore";

// import { Image } from "expo-image";
// import { useEffect, useState } from "react";

// import styles from "../../assets/styles/home.styles";
// import { API_URL } from "../../constants/api";
// import { Ionicons } from "@expo/vector-icons";
// import { formatPublishDate } from "../../lib/utils";
// import COLORS from "../../constants/colors";
// import Loader from "../../components/Loader";

// export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function Home() {
//   const { token } = useAuthStore();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const fetchBooks = async (pageNum = 1, refresh = false) => {
//     try {
//       if (refresh) setRefreshing(true);
//       else if (pageNum === 1) setLoading(true);

//       const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=2`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch books");

//       // todo fix it later
//       // setBooks((prevBooks) => [...prevBooks, ...data.books]);

//       const uniqueBooks =
//         refresh || pageNum === 1
//           ? data.books
//           : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
//               [...books, ...data.books].find((book) => book._id === id)
//             );

//       setBooks(uniqueBooks);

//       setHasMore(pageNum < data.totalPages);
//       setPage(pageNum);
//     } catch (error) {
//       console.log("Error fetching books", error);
//     } finally {
//       if (refresh) {
//         await sleep(800);
//         setRefreshing(false);
//       } else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleLoadMore = async () => {
//     if (hasMore && !loading && !refreshing) {
//       await fetchBooks(page + 1);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.bookCard}>
//       <View style={styles.bookHeader}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
//           <Text style={styles.username}>{item.user.username}</Text>
//         </View>
//       </View>

//       <View style={styles.bookImageContainer}>
//         <Image source={item.image} style={styles.bookImage} contentFit="cover" />
//       </View>

//       <View style={styles.bookDetails}>
//         <Text style={styles.bookTitle}>{item.title}</Text>
//         <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
//         <Text style={styles.caption}>{item.caption}</Text>
//         <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
//       </View>
//     </View>
//   );

//   const renderRatingStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           style={{ marginRight: 2 }}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchBooks(1, true)}
//             colors={[COLORS.primary]}
//             tintColor={COLORS.primary}
//           />
//         }
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.1}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Run Bangladesh</Text>
//             <Text style={styles.headerSubtitle}>Run For Better bangladesh</Text>
//           </View>
//         }
//         ListFooterComponent={
//           hasMore && books.length > 0 ? (
//             <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
//           ) : null
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
//             <Text style={styles.emptyText}>No recommendations yet</Text>
//             <Text style={styles.emptySubtext}>Be the first to share a book!</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// }


// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Alert
// } from "react-native";
// import { useAuthStore } from "../../store/authStore";

// import { Image } from "expo-image";
// import { useEffect, useState } from "react";

// import styles from "../../assets/styles/home.styles";
// import { API_URL } from "../../constants/api";
// import { Ionicons } from "@expo/vector-icons";
// import { formatPublishDate } from "../../lib/utils";
// import COLORS from "../../constants/colors";
// import Loader from "../../components/Loader";
// import MapView, { Marker, Polyline } from "react-native-maps";

// export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function Home() {
//   const { token } = useAuthStore();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // --- Map State ---
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const fetchBooks = async (pageNum = 1, refresh = false) => {
//     try {
//       if (refresh) setRefreshing(true);
//       else if (pageNum === 1) setLoading(true);

//       const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=10`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch books");

//       const uniqueBooks =
//         refresh || pageNum === 1
//           ? data.books
//           : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
//               [...books, ...data.books].find((book) => book._id === id)
//             );

//       setBooks(uniqueBooks);
//       setHasMore(pageNum < data.totalPages);
//       setPage(pageNum);
//     } catch (error) {
//       console.log("Error fetching books", error);
//     } finally {
//       if (refresh) {
//         await sleep(800);
//         setRefreshing(false);
//       } else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleLoadMore = async () => {
//     if (hasMore && !loading && !refreshing) {
//       await fetchBooks(page + 1);
//     }
//   };

//   // --- Handle Card Click (Robust Parsing) ---
//   const handleCardPress = (item) => {
//     // Helper to safely parse location whether it is a JSON string or already an object
//     const parseLocation = (loc) => {
//       if (!loc) return null;
//       if (typeof loc === 'object') return loc; 
//       try {
//         return JSON.parse(loc);
//       } catch (e) {
//         console.log("Location parse error:", e);
//         return null;
//       }
//     };

//     const start = parseLocation(item.startLocation);
//     const end = parseLocation(item.endLocation);

//     // Only open map if we have valid coordinates
//     if (start && end && start.latitude && end.latitude) {
//       setSelectedEvent({ ...item, startCoordinate: start, endCoordinate: end });
//       setMapVisible(true);
//     } else {
//       Alert.alert("No Route", "This event does not have route details available.");
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       activeOpacity={0.9} 
//       onPress={() => handleCardPress(item)}
//     >
//       <View style={styles.bookCard}>
//         <View style={styles.bookHeader}>
//           <View style={styles.userInfo}>
//             <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
//             <Text style={styles.username}>{item.user.username}</Text>
//           </View>
//           {/* Map Icon to indicate clickable route */}
//           <Ionicons name="map-outline" size={20} color={COLORS.primary} />
//         </View>

//         <View style={styles.bookImageContainer}>
//           <Image source={item.image} style={styles.bookImage} contentFit="cover" />
//         </View>

//         <View style={styles.bookDetails}>
//           <Text style={styles.bookTitle}>{item.title}</Text>
//           <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
//           <Text style={styles.caption}>{item.caption}</Text>
//           <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderRatingStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           style={{ marginRight: 2 }}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchBooks(1, true)}
//             colors={[COLORS.primary]}
//             tintColor={COLORS.primary}
//           />
//         }
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.1}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Run Bangladesh</Text>
//             <Text style={styles.headerSubtitle}>Run For Better Bangladesh</Text>
//           </View>
//         }
//         ListFooterComponent={
//           hasMore && books.length > 0 ? (
//             <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
//           ) : null
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
//             <Text style={styles.emptyText}>No recommendations yet</Text>
//             <Text style={styles.emptySubtext}>Be the first to share a route!</Text>
//           </View>
//         }
//       />

//       {/* --- Full Screen Map Modal --- */}
//       <Modal 
//         visible={mapVisible} 
//         animationType="slide" 
//         onRequestClose={() => setMapVisible(false)}
//       >
//         <View style={mapStyles.modalContainer}>
//           {/* Close Button */}
//           <TouchableOpacity 
//             style={mapStyles.closeButton} 
//             onPress={() => setMapVisible(false)}
//           >
//             <Ionicons name="close" size={28} color="black" />
//           </TouchableOpacity>

//           {/* Map */}
//           {selectedEvent && (
//             <MapView
//               style={mapStyles.map}
//               initialRegion={{
//                 latitude: (selectedEvent.startCoordinate.latitude + selectedEvent.endCoordinate.latitude) / 2,
//                 longitude: (selectedEvent.startCoordinate.longitude + selectedEvent.endCoordinate.longitude) / 2,
//                 latitudeDelta: Math.abs(selectedEvent.startCoordinate.latitude - selectedEvent.endCoordinate.latitude) * 2.5 || 0.05,
//                 longitudeDelta: Math.abs(selectedEvent.startCoordinate.longitude - selectedEvent.endCoordinate.longitude) * 2.5 || 0.05,
//               }}
//             >
//               <Marker 
//                 coordinate={selectedEvent.startCoordinate} 
//                 title="Start Point" 
//                 pinColor="green" 
//               />
//               <Marker 
//                 coordinate={selectedEvent.endCoordinate} 
//                 title="End Point" 
//                 pinColor="red" 
//               />
//               <Polyline 
//                 coordinates={[selectedEvent.startCoordinate, selectedEvent.endCoordinate]} 
//                 strokeWidth={4} 
//                 strokeColor={COLORS.primary} 
//               />
//             </MapView>
//           )}
          
//           {/* Info Card Overlay */}
//           {selectedEvent && (
//              <View style={mapStyles.infoCard}>
//                 <Text style={mapStyles.infoTitle}>{selectedEvent.title}</Text>
//                 <Text numberOfLines={2} style={mapStyles.infoCaption}>{selectedEvent.caption}</Text>
//              </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const mapStyles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: 'white',
//     padding: 8,
//     borderRadius: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   infoCard: {
//     position: 'absolute',
//     bottom: 40,
//     left: 20,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 12,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   infoTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: COLORS.textPrimary,
//   },
//   infoCaption: {
//     fontSize: 14,
//     color: COLORS.textSecondary,
//   }
// });




// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Alert
// } from "react-native";
// import { useAuthStore } from "../../store/authStore";

// import { Image } from "expo-image";
// import { useEffect, useState } from "react";

// import styles from "../../assets/styles/home.styles";
// import { API_URL } from "../../constants/api";
// import { Ionicons } from "@expo/vector-icons";
// import { formatPublishDate } from "../../lib/utils";
// import COLORS from "../../constants/colors";
// import Loader from "../../components/Loader";
// import MapView, { Marker, Polyline } from "react-native-maps";

// export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function Home() {
//   const { token } = useAuthStore();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // --- Map State ---
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const fetchBooks = async (pageNum = 1, refresh = false) => {
//     try {
//       if (refresh) setRefreshing(true);
//       else if (pageNum === 1) setLoading(true);

//       const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=10`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch books");

//       const uniqueBooks =
//         refresh || pageNum === 1
//           ? data.books
//           : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
//               [...books, ...data.books].find((book) => book._id === id)
//             );

//       setBooks(uniqueBooks);
//       setHasMore(pageNum < data.totalPages);
//       setPage(pageNum);
//     } catch (error) {
//       console.log("Error fetching books", error);
//     } finally {
//       if (refresh) {
//         await sleep(800);
//         setRefreshing(false);
//       } else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleLoadMore = async () => {
//     if (hasMore && !loading && !refreshing) {
//       await fetchBooks(page + 1);
//     }
//   };

//   // --- Handle Map Icon Click ---
//   const handleMapIconPress = (item) => {
//     // Helper to safely parse location whether it is a JSON string or already an object
//     const parseLocation = (loc) => {
//       if (!loc) return null;
//       if (typeof loc === 'object') return loc; 
//       try {
//         return JSON.parse(loc);
//       } catch (e) {
//         console.log("Location parse error:", e);
//         return null;
//       }
//     };

//     const start = parseLocation(item.startLocation);
//     const end = parseLocation(item.endLocation);

//     // Only open map if we have valid coordinates
//     if (start && end && start.latitude && end.latitude) {
//       setSelectedEvent({ ...item, startCoordinate: start, endCoordinate: end });
//       setMapVisible(true);
//     } else {
//       Alert.alert("No Route", "This event does not have route details available.");
//     }
//   };

//   const renderItem = ({ item }) => (
//     // Changed from TouchableOpacity to View so the whole card isn't clickable
//     <View style={styles.bookCard}>
//       <View style={styles.bookHeader}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
//           <Text style={styles.username}>{item.user.username}</Text>
//         </View>
        
//         {/* Only this icon triggers the map now */}
//         <TouchableOpacity 
//           onPress={() => handleMapIconPress(item)} 
//           style={{ padding: 5 }} // Added padding for easier clicking
//         >
//           <Ionicons name="map-outline" size={24} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.bookImageContainer}>
//         <Image source={item.image} style={styles.bookImage} contentFit="cover" />
//       </View>

//       <View style={styles.bookDetails}>
//         <Text style={styles.bookTitle}>{item.title}</Text>
//         <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
//         <Text style={styles.caption}>{item.caption}</Text>
//         <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>
//       </View>
//     </View>
//   );

//   const renderRatingStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           style={{ marginRight: 2 }}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchBooks(1, true)}
//             colors={[COLORS.primary]}
//             tintColor={COLORS.primary}
//           />
//         }
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.1}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Run Bangladesh</Text>
//             <Text style={styles.headerSubtitle}>Run For Better Bangladesh</Text>
//           </View>
//         }
//         ListFooterComponent={
//           hasMore && books.length > 0 ? (
//             <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
//           ) : null
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
//             <Text style={styles.emptyText}>No recommendations yet</Text>
//             <Text style={styles.emptySubtext}>Be the first to share a route!</Text>
//           </View>
//         }
//       />

//       {/* --- Full Screen Map Modal --- */}
//       <Modal 
//         visible={mapVisible} 
//         animationType="slide" 
//         onRequestClose={() => setMapVisible(false)}
//       >
//         <View style={mapStyles.modalContainer}>
//           {/* Close Button */}
//           <TouchableOpacity 
//             style={mapStyles.closeButton} 
//             onPress={() => setMapVisible(false)}
//           >
//             <Ionicons name="close" size={28} color="black" />
//           </TouchableOpacity>

//           {/* Map */}
//           {selectedEvent && (
//             <MapView
//               style={mapStyles.map}
//               initialRegion={{
//                 latitude: (selectedEvent.startCoordinate.latitude + selectedEvent.endCoordinate.latitude) / 2,
//                 longitude: (selectedEvent.startCoordinate.longitude + selectedEvent.endCoordinate.longitude) / 2,
//                 latitudeDelta: Math.abs(selectedEvent.startCoordinate.latitude - selectedEvent.endCoordinate.latitude) * 2.5 || 0.05,
//                 longitudeDelta: Math.abs(selectedEvent.startCoordinate.longitude - selectedEvent.endCoordinate.longitude) * 2.5 || 0.05,
//               }}
//             >
//               <Marker 
//                 coordinate={selectedEvent.startCoordinate} 
//                 title="Start Point" 
//                 pinColor="green" 
//               />
//               <Marker 
//                 coordinate={selectedEvent.endCoordinate} 
//                 title="End Point" 
//                 pinColor="red" 
//               />
//               <Polyline 
//                 coordinates={[selectedEvent.startCoordinate, selectedEvent.endCoordinate]} 
//                 strokeWidth={4} 
//                 strokeColor={COLORS.primary} 
//               />
//             </MapView>
//           )}
          
//           {/* Info Card Overlay */}
//           {selectedEvent && (
//              <View style={mapStyles.infoCard}>
//                 <Text style={mapStyles.infoTitle}>{selectedEvent.title}</Text>
//                 <Text numberOfLines={2} style={mapStyles.infoCaption}>{selectedEvent.caption}</Text>
//              </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const mapStyles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     zIndex: 10,
//     backgroundColor: 'white',
//     padding: 8,
//     borderRadius: 25,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   infoCard: {
//     position: 'absolute',
//     bottom: 40,
//     left: 20,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 12,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   infoTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: COLORS.textPrimary,
//   },
//   infoCaption: {
//     fontSize: 14,
//     color: COLORS.textSecondary,
//   }
// });


// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Alert
// } from "react-native";
// import { useAuthStore } from "../../store/authStore";

// import { Image } from "expo-image";
// import { useEffect, useState } from "react";

// import styles from "../../assets/styles/home.styles";
// import { API_URL } from "../../constants/api";
// import { Ionicons } from "@expo/vector-icons";
// import { formatPublishDate } from "../../lib/utils";
// import COLORS from "../../constants/colors";
// import Loader from "../../components/Loader";
// import MapView, { Marker, Polyline } from "react-native-maps";

// export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function Home() {
//   const { token } = useAuthStore();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // --- Map State ---
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const fetchBooks = async (pageNum = 1, refresh = false) => {
//     try {
//       if (refresh) setRefreshing(true);
//       else if (pageNum === 1) setLoading(true);

//       const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=10`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch books");

//       const uniqueBooks =
//         refresh || pageNum === 1
//           ? data.books
//           : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
//               [...books, ...data.books].find((book) => book._id === id)
//             );

//       setBooks(uniqueBooks);
//       setHasMore(pageNum < data.totalPages);
//       setPage(pageNum);
//     } catch (error) {
//       console.log("Error fetching books", error);
//     } finally {
//       if (refresh) {
//         await sleep(800);
//         setRefreshing(false);
//       } else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleLoadMore = async () => {
//     if (hasMore && !loading && !refreshing) {
//       await fetchBooks(page + 1);
//     }
//   };

//   // --- Handle Map Icon Click ---
//   const handleMapIconPress = (item) => {
//     const parseLocation = (loc) => {
//       if (!loc) return null;
//       if (typeof loc === 'object') return loc; 
//       try {
//         return JSON.parse(loc);
//       } catch (e) {
//         console.log("Location parse error:", e);
//         return null;
//       }
//     };

//     const start = parseLocation(item.startLocation);
//     const end = parseLocation(item.endLocation);

//     if (start && end && start.latitude && end.latitude) {
//       setSelectedEvent({ ...item, startCoordinate: start, endCoordinate: end });
//       setMapVisible(true);
//     } else {
//       Alert.alert("No Route", "This event does not have route details available.");
//     }
//   };

//   // --- Handle Register Click ---
//   const handleRegisterPress = (item) => {
//     Alert.alert("Registration", `You have clicked to register for: ${item.title}`);
//     // TODO: Add your navigation or API logic here
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.bookCard}>
//       {/* Header */}
//       <View style={styles.bookHeader}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
//           <Text style={styles.username}>{item.user.username}</Text>
//         </View>
        
//         {/* Map Icon */}
//         <TouchableOpacity 
//           onPress={() => handleMapIconPress(item)} 
//           style={{ padding: 5 }} 
//         >
//           <Ionicons name="map-outline" size={24} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       {/* Image */}
//       <View style={styles.bookImageContainer}>
//         <Image source={item.image} style={styles.bookImage} contentFit="cover" />
//       </View>

//       {/* Details */}
//       <View style={styles.bookDetails}>
//         <Text style={styles.bookTitle}>{item.title}</Text>
//         <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
//         <Text style={styles.caption}>{item.caption}</Text>
//         <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>

//         {/* REGISTER BUTTON */}
//         <TouchableOpacity 
//           style={customStyles.registerButton}  
//           onPress={() => handleRegisterPress(item)}
//         >
//           <Text style={customStyles.registerButtonText}>Register for Event</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderRatingStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           style={{ marginRight: 2 }}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchBooks(1, true)}
//             colors={[COLORS.primary]}
//             tintColor={COLORS.primary}
//           />
//         }
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.1}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Run Bangladesh</Text>
//             <Text style={styles.headerSubtitle}>Run For Better Bangladesh</Text>
//           </View>
//         }
//         ListFooterComponent={
//           hasMore && books.length > 0 ? (
//             <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
//           ) : null
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
//             <Text style={styles.emptyText}>No recommendations yet</Text>
//             <Text style={styles.emptySubtext}>Be the first to share a route!</Text>
//           </View>
//         }
//       />

//       {/* --- Full Screen Map Modal --- */}
//       <Modal 
//         visible={mapVisible} 
//         animationType="slide" 
//         onRequestClose={() => setMapVisible(false)}
//       >
//         <View style={mapStyles.modalContainer}>
//           <TouchableOpacity 
//             style={mapStyles.closeButton} 
//             onPress={() => setMapVisible(false)}
//           >
//             <Ionicons name="close" size={28} color="black" />
//           </TouchableOpacity>

//           {selectedEvent && (
//             <MapView
//               style={mapStyles.map}
//               initialRegion={{
//                 latitude: (selectedEvent.startCoordinate.latitude + selectedEvent.endCoordinate.latitude) / 2,
//                 longitude: (selectedEvent.startCoordinate.longitude + selectedEvent.endCoordinate.longitude) / 2,
//                 latitudeDelta: Math.abs(selectedEvent.startCoordinate.latitude - selectedEvent.endCoordinate.latitude) * 2.5 || 0.05,
//                 longitudeDelta: Math.abs(selectedEvent.startCoordinate.longitude - selectedEvent.endCoordinate.longitude) * 2.5 || 0.05,
//               }}
//             >
//               <Marker coordinate={selectedEvent.startCoordinate} title="Start" pinColor="green" />
//               <Marker coordinate={selectedEvent.endCoordinate} title="End" pinColor="red" />
//               <Polyline 
//                 coordinates={[selectedEvent.startCoordinate, selectedEvent.endCoordinate]} 
//                 strokeWidth={4} 
//                 strokeColor={COLORS.primary} 
//               />
//             </MapView>
//           )}
          
//           {selectedEvent && (
//              <View style={mapStyles.infoCard}>
//                 <Text style={mapStyles.infoTitle}>{selectedEvent.title}</Text>
//                 <Text numberOfLines={2} style={mapStyles.infoCaption}>{selectedEvent.caption}</Text>
//              </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // Additional styles for the button and map
// const customStyles = StyleSheet.create({
//   registerButton: {
//     backgroundColor: '#e74c3c', // Red Color
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#e74c3c",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   registerButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });

// const mapStyles = StyleSheet.create({
//   modalContainer: { flex: 1, backgroundColor: 'white' },
//   map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
//   closeButton: {
//     position: 'absolute', top: 50, right: 20, zIndex: 10,
//     backgroundColor: 'white', padding: 8, borderRadius: 25,
//     elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
//   },
//   infoCard: {
//     position: 'absolute', bottom: 40, left: 20, right: 20,
//     backgroundColor: 'white', padding: 15, borderRadius: 12,
//     elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
//   },
//   infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLORS.textPrimary },
//   infoCaption: { fontSize: 14, color: COLORS.textSecondary }
// });


// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Alert
// } from "react-native";
// import { useAuthStore } from "../../store/authStore";

// import { Image } from "expo-image";
// import { useEffect, useState } from "react";

// import styles from "../../assets/styles/home.styles";
// import { API_URL } from "../../constants/api";
// import { Ionicons } from "@expo/vector-icons";
// import { formatPublishDate } from "../../lib/utils";
// import COLORS from "../../constants/colors";
// import Loader from "../../components/Loader";
// import MapView, { Marker, Polyline } from "react-native-maps";

// export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function Home() {
//   const { token } = useAuthStore();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // --- Map State ---
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const fetchBooks = async (pageNum = 1, refresh = false) => {
//     try {
//       if (refresh) setRefreshing(true);
//       else if (pageNum === 1) setLoading(true);

//       const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=10`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch books");

//       const uniqueBooks =
//         refresh || pageNum === 1
//           ? data.books
//           : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
//               [...books, ...data.books].find((book) => book._id === id)
//             );

//       setBooks(uniqueBooks);
//       setHasMore(pageNum < data.totalPages);
//       setPage(pageNum);
//     } catch (error) {
//       console.log("Error fetching books", error);
//     } finally {
//       if (refresh) {
//         await sleep(800);
//         setRefreshing(false);
//       } else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleLoadMore = async () => {
//     if (hasMore && !loading && !refreshing) {
//       await fetchBooks(page + 1);
//     }
//   };

//   // --- Handle Map Icon Click ---
//   const handleMapIconPress = (item) => {
//     const parseLocation = (loc) => {
//       if (!loc) return null;
//       if (typeof loc === 'object') return loc; 
//       try {
//         return JSON.parse(loc);
//       } catch (e) {
//         console.log("Location parse error:", e);
//         return null;
//       }
//     };

//     const start = parseLocation(item.startLocation);
//     const end = parseLocation(item.endLocation);

//     if (start && end && start.latitude && end.latitude) {
//       setSelectedEvent({ ...item, startCoordinate: start, endCoordinate: end });
//       setMapVisible(true);
//     } else {
//       Alert.alert("No Route", "This event does not have route details available.");
//     }
//   };

//   // --- Handle Register Click ---
//   const handleRegisterPress = (item) => {
//     Alert.alert("Registration", `You have clicked to register for: ${item.title}`);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.bookCard}>
//       {/* Header */}
//       <View style={styles.bookHeader}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
//           <Text style={styles.username}>{item.user.username}</Text>
//         </View>
        
//         {/* Map Icon */}
//         <TouchableOpacity 
//           onPress={() => handleMapIconPress(item)} 
//           style={{ padding: 5 }} 
//         >
//           <Ionicons name="map-outline" size={24} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       {/* Image */}
//       <View style={styles.bookImageContainer}>
//         <Image source={item.image} style={styles.bookImage} contentFit="cover" />
//       </View>

//       {/* Details */}
//       <View style={styles.bookDetails}>
//         <Text style={styles.bookTitle}>{item.title}</Text>
//         <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
//         <Text style={styles.caption}>{item.caption}</Text>
//         <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>

//         {/* REGISTER BUTTON */}
//         <TouchableOpacity 
//           style={customStyles.registerButton} 
//           onPress={() => handleRegisterPress(item)}
//         >
//           <Text style={customStyles.registerButtonText}>Register for Event</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderRatingStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           style={{ marginRight: 2 }}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchBooks(1, true)}
//             colors={[COLORS.primary]}
//             tintColor={COLORS.primary}
//           />
//         }
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.1}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Run Bangladesh</Text>
//             <Text style={styles.headerSubtitle}>Run For Better Bangladesh</Text>
//           </View>
//         }
//         ListFooterComponent={
//           hasMore && books.length > 0 ? (
//             <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
//           ) : null
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
//             <Text style={styles.emptyText}>No recommendations yet</Text>
//             <Text style={styles.emptySubtext}>Be the first to share a route!</Text>
//           </View>
//         }
//       />

//       {/* --- Full Screen Map Modal --- */}
//       <Modal 
//         visible={mapVisible} 
//         animationType="slide" 
//         onRequestClose={() => setMapVisible(false)}
//       >
//         <View style={mapStyles.modalContainer}>
//           <TouchableOpacity 
//             style={mapStyles.closeButton} 
//             onPress={() => setMapVisible(false)}
//           >
//             <Ionicons name="close" size={28} color="black" />
//           </TouchableOpacity>

//           {selectedEvent && (
//             <MapView
//               style={mapStyles.map}
//               initialRegion={{
//                 latitude: (selectedEvent.startCoordinate.latitude + selectedEvent.endCoordinate.latitude) / 2,
//                 longitude: (selectedEvent.startCoordinate.longitude + selectedEvent.endCoordinate.longitude) / 2,
//                 latitudeDelta: Math.abs(selectedEvent.startCoordinate.latitude - selectedEvent.endCoordinate.latitude) * 2.5 || 0.05,
//                 longitudeDelta: Math.abs(selectedEvent.startCoordinate.longitude - selectedEvent.endCoordinate.longitude) * 2.5 || 0.05,
//               }}
//             >
//               <Marker coordinate={selectedEvent.startCoordinate} title="Start" pinColor="green" />
//               <Marker coordinate={selectedEvent.endCoordinate} title="End" pinColor="red" />
//               <Polyline 
//                 coordinates={[selectedEvent.startCoordinate, selectedEvent.endCoordinate]} 
//                 strokeWidth={4} 
//                 strokeColor={COLORS.primary} 
//               />
//             </MapView>
//           )}
          
//           {selectedEvent && (
//              <View style={mapStyles.infoCard}>
//                 <Text style={mapStyles.infoTitle}>{selectedEvent.title}</Text>
//                 <Text numberOfLines={2} style={mapStyles.infoCaption}>{selectedEvent.caption}</Text>
//              </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // Updated color to #D43745
// const customStyles = StyleSheet.create({
//   registerButton: {
//     backgroundColor: '#D43745', 
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#D43745",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   registerButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });

// const mapStyles = StyleSheet.create({
//   modalContainer: { flex: 1, backgroundColor: 'white' },
//   map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
//   closeButton: {
//     position: 'absolute', top: 50, right: 20, zIndex: 10,
//     backgroundColor: 'white', padding: 8, borderRadius: 25,
//     elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
//   },
//   infoCard: {
//     position: 'absolute', bottom: 40, left: 20, right: 20,
//     backgroundColor: 'white', padding: 15, borderRadius: 12,
//     elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
//   },
//   infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLORS.textPrimary },
//   infoCaption: { fontSize: 14, color: COLORS.textSecondary }
// });


// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Modal,
//   StyleSheet,
//   Dimensions,
//   Alert
// } from "react-native";
// import { useAuthStore } from "../../store/authStore";
// import { useRouter } from "expo-router"; 

// import { Image } from "expo-image";
// import { useEffect, useState } from "react";

// import styles from "../../assets/styles/home.styles";
// import { API_URL } from "../../constants/api";
// import { Ionicons } from "@expo/vector-icons";
// import { formatPublishDate } from "../../lib/utils";
// import COLORS from "../../constants/colors";
// import Loader from "../../components/Loader";
// import MapView, { Marker, Polyline } from "react-native-maps";

// export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default function Home() {
//   const { token } = useAuthStore();
//   const router = useRouter();
  
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   // --- Map State ---
//   const [mapVisible, setMapVisible] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const fetchBooks = async (pageNum = 1, refresh = false) => {
//     try {
//       if (refresh) setRefreshing(true);
//       else if (pageNum === 1) setLoading(true);

//       const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=10`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Failed to fetch books");

//       const uniqueBooks =
//         refresh || pageNum === 1
//           ? data.books
//           : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
//               [...books, ...data.books].find((book) => book._id === id)
//             );

//       setBooks(uniqueBooks);
//       setHasMore(pageNum < data.totalPages);
//       setPage(pageNum);
//     } catch (error) {
//       console.log("Error fetching books", error);
//     } finally {
//       if (refresh) {
//         await sleep(800);
//         setRefreshing(false);
//       } else setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleLoadMore = async () => {
//     if (hasMore && !loading && !refreshing) {
//       await fetchBooks(page + 1);
//     }
//   };

//   // --- Handle Map Icon Click ---
//   const handleMapIconPress = (item) => {
//     const parseLocation = (loc) => {
//       if (!loc) return null;
//       if (typeof loc === 'object') return loc; 
//       try {
//         return JSON.parse(loc);
//       } catch (e) {
//         console.log("Location parse error:", e);
//         return null;
//       }
//     };

//     const start = parseLocation(item.startLocation);
//     const end = parseLocation(item.endLocation);

//     if (start && end && start.latitude && end.latitude) {
//       setSelectedEvent({ ...item, startCoordinate: start, endCoordinate: end });
//       setMapVisible(true);
//     } else {
//       Alert.alert("No Route", "This event does not have route details available.");
//     }
//   };

//   // --- Handle Register Click ---
//   const handleRegisterPress = (item) => {
//     // UPDATED: Navigates to the file inside the (tabs) folder
//     router.push({
//       pathname: "/(tabs)/register", 
//       params: { 
//         eventId: item._id, 
//         eventTitle: item.title 
//       }
//     });
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.bookCard}>
//       {/* Header */}
//       <View style={styles.bookHeader}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
//           <Text style={styles.username}>{item.user.username}</Text>
//         </View>
        
//         {/* Map Icon */}
//         <TouchableOpacity 
//           onPress={() => handleMapIconPress(item)} 
//           style={{ padding: 5 }} 
//         >
//           <Ionicons name="map-outline" size={24} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       {/* Image */}
//       <View style={styles.bookImageContainer}>
//         <Image source={item.image} style={styles.bookImage} contentFit="cover" />
//       </View>

//       {/* Details */}
//       <View style={styles.bookDetails}>
//         <Text style={styles.bookTitle}>{item.title}</Text>
//         <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
//         <Text style={styles.caption}>{item.caption}</Text>
//         <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>

//         {/* REGISTER BUTTON */}
//         <TouchableOpacity 
//           style={customStyles.registerButton} 
//           onPress={() => handleRegisterPress(item)}
//         >
//           <Text style={customStyles.registerButtonText}>Register for Event</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderRatingStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <Ionicons
//           key={i}
//           name={i <= rating ? "star" : "star-outline"}
//           size={16}
//           color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           style={{ marginRight: 2 }}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <Loader />;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={books}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => fetchBooks(1, true)}
//             colors={[COLORS.primary]}
//             tintColor={COLORS.primary}
//           />
//         }
//         onEndReached={handleLoadMore}
//         onEndReachedThreshold={0.1}
//         ListHeaderComponent={
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Run Bangladesh</Text>
//             <Text style={styles.headerSubtitle}>Run For Better Bangladesh</Text>
//           </View>
//         }
//         ListFooterComponent={
//           hasMore && books.length > 0 ? (
//             <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
//           ) : null
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
//             <Text style={styles.emptyText}>No recommendations yet</Text>
//             <Text style={styles.emptySubtext}>Be the first to share a route!</Text>
//           </View>
//         }
//       />

//       {/* --- Full Screen Map Modal --- */}
//       <Modal 
//         visible={mapVisible} 
//         animationType="slide" 
//         onRequestClose={() => setMapVisible(false)}
//       >
//         <View style={mapStyles.modalContainer}>
//           <TouchableOpacity 
//             style={mapStyles.closeButton} 
//             onPress={() => setMapVisible(false)}
//           >
//             <Ionicons name="close" size={28} color="black" />
//           </TouchableOpacity>

//           {selectedEvent && (
//             <MapView
//               style={mapStyles.map}
//               initialRegion={{
//                 latitude: (selectedEvent.startCoordinate.latitude + selectedEvent.endCoordinate.latitude) / 2,
//                 longitude: (selectedEvent.startCoordinate.longitude + selectedEvent.endCoordinate.longitude) / 2,
//                 latitudeDelta: Math.abs(selectedEvent.startCoordinate.latitude - selectedEvent.endCoordinate.latitude) * 2.5 || 0.05,
//                 longitudeDelta: Math.abs(selectedEvent.startCoordinate.longitude - selectedEvent.endCoordinate.longitude) * 2.5 || 0.05,
//               }}
//             >
//               <Marker coordinate={selectedEvent.startCoordinate} title="Start" pinColor="green" />
//               <Marker coordinate={selectedEvent.endCoordinate} title="End" pinColor="red" />
//               <Polyline 
//                 coordinates={[selectedEvent.startCoordinate, selectedEvent.endCoordinate]} 
//                 strokeWidth={4} 
//                 strokeColor={COLORS.primary} 
//               />
//             </MapView>
//           )}
          
//           {selectedEvent && (
//              <View style={mapStyles.infoCard}>
//                 <Text style={mapStyles.infoTitle}>{selectedEvent.title}</Text>
//                 <Text numberOfLines={2} style={mapStyles.infoCaption}>{selectedEvent.caption}</Text>
//              </View>
//           )}
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const customStyles = StyleSheet.create({
//   registerButton: {
//     backgroundColor: '#D43745', 
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: "#D43745",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   registerButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });

// const mapStyles = StyleSheet.create({
//   modalContainer: { flex: 1, backgroundColor: 'white' },
//   map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
//   closeButton: {
//     position: 'absolute', top: 50, right: 20, zIndex: 10,
//     backgroundColor: 'white', padding: 8, borderRadius: 25,
//     elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
//   },
//   infoCard: {
//     position: 'absolute', bottom: 40, left: 20, right: 20,
//     backgroundColor: 'white', padding: 15, borderRadius: 12,
//     elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
//   },
//   infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLORS.textPrimary },
//   infoCaption: { fontSize: 14, color: COLORS.textSecondary }
// });



import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "expo-router"; 

import { Image } from "expo-image";
import { useEffect, useState } from "react";

import styles from "../../assets/styles/home.styles";
import { API_URL } from "../../constants/api";
import { Ionicons } from "@expo/vector-icons";
import { formatPublishDate } from "../../lib/utils";
import COLORS from "../../constants/colors";
import Loader from "../../components/Loader";
import MapView, { Marker, Polyline } from "react-native-maps";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
  const { token } = useAuthStore();
  const router = useRouter();
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // --- Map State ---
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      const response = await fetch(`${API_URL}/books?page=${pageNum}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch books");

      const uniqueBooks =
        refresh || pageNum === 1
          ? data.books
          : Array.from(new Set([...books, ...data.books].map((book) => book._id))).map((id) =>
              [...books, ...data.books].find((book) => book._id === id)
            );

      setBooks(uniqueBooks);
      setHasMore(pageNum < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log("Error fetching books", error);
    } finally {
      if (refresh) {
        await sleep(800);
        setRefreshing(false);
      } else setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLoadMore = async () => {
    if (hasMore && !loading && !refreshing) {
      await fetchBooks(page + 1);
    }
  };

  // --- Handle Map Icon Click ---
  const handleMapIconPress = (item) => {
    const parseLocation = (loc) => {
      if (!loc) return null;
      if (typeof loc === 'object') return loc; 
      try {
        return JSON.parse(loc);
      } catch (e) {
        console.log("Location parse error:", e);
        return null;
      }
    };

    const start = parseLocation(item.startLocation);
    const end = parseLocation(item.endLocation);

    if (start && end && start.latitude && end.latitude) {
      setSelectedEvent({ ...item, startCoordinate: start, endCoordinate: end });
      setMapVisible(true);
    } else {
      Alert.alert("No Route", "This event does not have route details available.");
    }
  };

  // --- Handle Register Click ---
  const handleRegisterPress = (item) => {
    // UPDATED: Pointing to /register (root folder), not /(tabs)/register
    router.push({
      pathname: "/register", 
      params: { 
        eventId: item._id, 
        eventTitle: item.title 
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookCard}>
      {/* Header */}
      <View style={styles.bookHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.profileImage }} style={styles.avatar} />
          <Text style={styles.username}>{item.user.username}</Text>
        </View>
        
        {/* Map Icon */}
        <TouchableOpacity 
          onPress={() => handleMapIconPress(item)} 
          style={{ padding: 5 }} 
        >
          <Ionicons name="map-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <View style={styles.bookImageContainer}>
        <Image source={item.image} style={styles.bookImage} contentFit="cover" />
      </View>

      {/* Details */}
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Text style={styles.date}>Shared on {formatPublishDate(item.createdAt)}</Text>

        {/* REGISTER BUTTON */}
        <TouchableOpacity 
          style={customStyles.registerButton} 
          onPress={() => handleRegisterPress(item)}
        >
          <Text style={customStyles.registerButtonText}>Register for Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBooks(1, true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Run Bangladesh</Text>
            <Text style={styles.headerSubtitle}>Run For Better Bangladesh</Text>
          </View>
        }
        ListFooterComponent={
          hasMore && books.length > 0 ? (
            <ActivityIndicator style={styles.footerLoader} size="small" color={COLORS.primary} />
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="book-outline" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No recommendations yet</Text>
            <Text style={styles.emptySubtext}>Be the first to share a route!</Text>
          </View>
        }
      />

      {/* --- Full Screen Map Modal --- */}
      <Modal 
        visible={mapVisible} 
        animationType="slide" 
        onRequestClose={() => setMapVisible(false)}
      >
        <View style={mapStyles.modalContainer}>
          <TouchableOpacity 
            style={mapStyles.closeButton} 
            onPress={() => setMapVisible(false)}
          >
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>

          {selectedEvent && (
            <MapView
              style={mapStyles.map}
              initialRegion={{
                latitude: (selectedEvent.startCoordinate.latitude + selectedEvent.endCoordinate.latitude) / 2,
                longitude: (selectedEvent.startCoordinate.longitude + selectedEvent.endCoordinate.longitude) / 2,
                latitudeDelta: Math.abs(selectedEvent.startCoordinate.latitude - selectedEvent.endCoordinate.latitude) * 2.5 || 0.05,
                longitudeDelta: Math.abs(selectedEvent.startCoordinate.longitude - selectedEvent.endCoordinate.longitude) * 2.5 || 0.05,
              }}
            >
              <Marker coordinate={selectedEvent.startCoordinate} title="Start" pinColor="green" />
              <Marker coordinate={selectedEvent.endCoordinate} title="End" pinColor="red" />
              <Polyline 
                coordinates={[selectedEvent.startCoordinate, selectedEvent.endCoordinate]} 
                strokeWidth={4} 
                strokeColor={COLORS.primary} 
              />
            </MapView>
          )}
          
          {selectedEvent && (
             <View style={mapStyles.infoCard}>
                <Text style={mapStyles.infoTitle}>{selectedEvent.title}</Text>
                <Text numberOfLines={2} style={mapStyles.infoCaption}>{selectedEvent.caption}</Text>
             </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const customStyles = StyleSheet.create({
  registerButton: {
    backgroundColor: '#D43745', 
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#D43745",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

const mapStyles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: 'white' },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  closeButton: {
    position: 'absolute', top: 50, right: 20, zIndex: 10,
    backgroundColor: 'white', padding: 8, borderRadius: 25,
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
  },
  infoCard: {
    position: 'absolute', bottom: 40, left: 20, right: 20,
    backgroundColor: 'white', padding: 15, borderRadius: 12,
    elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
  },
  infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: COLORS.textPrimary },
  infoCaption: { fontSize: 14, color: COLORS.textSecondary }
});