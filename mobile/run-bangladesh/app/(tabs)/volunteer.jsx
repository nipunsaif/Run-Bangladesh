import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore"; 
import { API_URL } from "../../constants/api"; 

// --- Dark Theme Constants ---
const DARK_COLORS = {
  background: "#121212",
  surface: "#1E1E1E",
  surfaceLighter: "#333333",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA",
  border: "#333333",
  primaryAccent: "#D43745",
  delete: "#e74c3c",
};

export default function Volunteer() {
  const router = useRouter();
  // If navigated from an event card, these params might exist. 
  // If accessed directly from tab, they might be undefined.
  const { eventId, eventTitle } = useLocalSearchParams(); 
  const { token } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  // Initial Mock Data 
  const [volunteers, setVolunteers] = useState([
    { _id: "1", name: "Rahim Uddin", role: "Crowd Control" },
    { _id: "2", name: "Fatima Begum", role: "First Aid" },
  ]);

  // --- 1. Add Volunteer ---
  const handleAddVolunteer = async () => {
    if (!newName.trim() || !newRole.trim()) {
      Alert.alert("Missing Info", "Please enter both Name and Role.");
      return;
    }

    const tempId = Date.now().toString();
    const newVolunteer = { _id: tempId, name: newName, role: newRole };

    // Optimistic Update (Show immediately)
    setVolunteers((prev) => [newVolunteer, ...prev]);
    setNewName("");
    setNewRole("");

    // API Call (Commented out until backend is ready)
    
    try {
      await fetch(`${API_URL}/volunteers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId, name: newName, role: newRole }),
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save volunteer to server.");
      setVolunteers((prev) => prev.filter(v => v._id !== tempId));
    }

  };

  // --- 2. Remove Volunteer ---
  const handleRemoveVolunteer = (id) => {
    Alert.alert(
      "Remove Volunteer",
      "Are you sure you want to remove this person?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            // Optimistic Delete
            setVolunteers((prev) => prev.filter((v) => v._id !== id));

            // API Call (Commented out until backend is ready)
            /*
            try {
              await fetch(`${API_URL}/volunteers/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              });
            } catch (error) {
              console.log("Error deleting volunteer");
            }
            */
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => handleRemoveVolunteer(item._id)}
        style={styles.deleteBtn}
      >
        <Ionicons name="trash-outline" size={20} color={DARK_COLORS.delete} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: DARK_COLORS.background }}
    >
      <StatusBar barStyle="light-content" />

      {/* --- Header --- */}
      <View style={styles.header}>
        {/* If accessed via tab, back button might not be needed, but good for UX if drilled down */}
        {router.canGoBack() && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={DARK_COLORS.textPrimary} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.headerTitle}>Volunteer Team</Text>
          {eventTitle ? (
            <Text style={styles.headerSubtitle}>{eventTitle}</Text>
          ) : (
            <Text style={styles.headerSubtitle}>Manage Event Staff</Text>
          )}
        </View>
      </View>

      <View style={styles.container}>
        
        {/* --- Add Form --- */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add New Volunteer</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Volunteer Name"
            placeholderTextColor={DARK_COLORS.textSecondary}
            value={newName}
            onChangeText={setNewName}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="Role (e.g. Medic)"
              placeholderTextColor={DARK_COLORS.textSecondary}
              value={newRole}
              onChangeText={setNewRole}
            />
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleAddVolunteer}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- List --- */}
        <Text style={[styles.sectionTitle, { marginTop: 25, marginBottom: 10 }]}>
          Current Volunteers ({volunteers.length})
        </Text>

        <FlatList
          data={volunteers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={40} color={DARK_COLORS.textSecondary} />
              <Text style={styles.emptyText}>No volunteers assigned yet.</Text>
            </View>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: DARK_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: DARK_COLORS.border,
  },
  backButton: { padding: 5, marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: DARK_COLORS.textPrimary },
  headerSubtitle: { fontSize: 12, color: DARK_COLORS.textSecondary },

  container: { flex: 1, padding: 20 },

  // Form
  formContainer: {
    backgroundColor: DARK_COLORS.surface,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: DARK_COLORS.border,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: DARK_COLORS.textPrimary, marginBottom: 15 },
  input: {
    backgroundColor: DARK_COLORS.surfaceLighter,
    color: DARK_COLORS.textPrimary,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DARK_COLORS.border,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  addButton: {
    backgroundColor: DARK_COLORS.primaryAccent,
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Align with input bottom margin
  },

  // List Item
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DARK_COLORS.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DARK_COLORS.border,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DARK_COLORS.surfaceLighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: DARK_COLORS.border,
  },
  avatarText: { color: DARK_COLORS.primaryAccent, fontWeight: 'bold' },
  name: { fontSize: 16, fontWeight: 'bold', color: DARK_COLORS.textPrimary },
  role: { fontSize: 14, color: DARK_COLORS.textSecondary },
  deleteBtn: { padding: 8 },

  // Empty
  emptyContainer: { alignItems: 'center', marginTop: 40, opacity: 0.6 },
  emptyText: { color: DARK_COLORS.textSecondary, marginTop: 10 },
});