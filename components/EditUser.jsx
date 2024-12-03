import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function EditUser() {
  const { user, logout, loading, fetchUserData, token } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    avatarUrl: "",
    password: "",
  });

  useEffect(() => {
    if (!user) {
      fetchUserData();
    } else {
      setFormData({
        fullName: user.fullName || "",
        avatarUrl: user.avatarUrl || "",
        password: "",
      });
    }
  }, [user, fetchUserData]);

  function handleChange(name, value) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      const response = await fetch(
        `https://d8f8-151-249-187-243.ngrok-free.app/auth/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            avatarUrl: formData.avatarUrl,
            password: formData.password || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      fetchUserData();
      setIsEditing(false);
      setFormData((prevData) => ({
        ...prevData,
        password: "",
      }));
      Alert.alert("Success", "Profile updated successfully.");
    } catch (err) {
      console.error("Error updating user:", err);
      Alert.alert("Error", "Failed to update profile.");
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {user.isAdmin ? "Admin Panel" : "User Profile"}
      </Text>
      {user ? (
        <>
          {!isEditing ? (
            <View>
              <Text style={styles.label}>
                <Text style={styles.bold}>Fullname:</Text> {user.fullName}
              </Text>
              <Text style={styles.label}>
                <Text style={styles.bold}>Email:</Text> {user.email}
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    logout();
                  }}
                >
                  <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                placeholder="New Fullname"
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="New Avatar URL"
                value={formData.avatarUrl}
                onChangeText={(text) => handleChange("avatarUrl", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <Text>User data not available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    elevation: 5,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
});
