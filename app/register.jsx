import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const { register } = useContext(AuthContext);
  const router = useRouter(); // Используем useRouter для маршрутизации

  const handleSubmit = async () => {
    try {
      await register(email, password, fullName, avatarUrl);
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <View style={styles.authContainer}>
      <View style={styles.authCard}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          placeholderTextColor="#888"
          value={avatarUrl}
          onChangeText={setAvatarUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => router.push("login")} >
          <Text style={styles.link}>Already have an account? Login!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1cdb3", // Бежевый цвет
  },
  authCard: {
    backgroundColor: "#5a3c2a", // Коричневый цвет
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#dab18f",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f1cdb3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#5a3c2a",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#e39f72",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RegisterPage;
