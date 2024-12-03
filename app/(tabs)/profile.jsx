import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditUser from "../../components/EditUser";
import FavPets from "../../components/FavPets";
import AdoptedPets from "../../components/AdoptedPets";
import AddNewPet from "../../components/AddNewPet";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import AdminPets from "../../components/AdminPets";

export default function HomeScreen() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const renderContent = () => {
    return (
      <>
        <Header />
        <EditUser></EditUser>
        <AddNewPet></AddNewPet>
        {user.isAdmin && <AdminPets></AdminPets>}
        {!user.isAdmin && <FavPets></FavPets>}
        {!user.isAdmin && <AdoptedPets></AdoptedPets>}
        <Footer />
      </>
    );
  };

  if (!user) {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authCard}>
          <Text style={styles.title}>You haven't been already log in!</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => renderContent()}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={!isPopupOpen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1cdb3",
  },
});
