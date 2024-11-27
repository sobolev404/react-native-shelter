import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

const LoginPage = () => {
  const { user, login, logout } = useContext(AuthContext); // Получаем данные из контекста
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    login(email, password);
  };

  if (user) {
    // Если пользователь авторизован
    return (
      <View style={styles.authContainer}>
        <View style={styles.authCard}>
          <Text style={styles.title}>You have already log in!</Text>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Если пользователь не авторизован
  return (
    <KeyboardAvoidingView
      style={styles.authContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.authCard}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888" // Задайте цвет для placeholder
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("register")}
        >
          <Text style={styles.link}>Don't have an account? Register!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1cdb3",
  },
  authCard: {
    backgroundColor: "#5a3c2a",
    padding: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#dab18f",
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    padding: 12,
    backgroundColor: "#f1cdb3",
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
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
});

export default LoginPage;
