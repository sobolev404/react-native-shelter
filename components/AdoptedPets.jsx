import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import PetCard from "./PetCard";
import PetPopup from "./PetPopup";

export default function AdoptedPets() {
  const [selectedPet, setSelectedPet] = useState(null);
  const { user, adoptedPets, fetchAdoptedPets } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  function openPopup(pet) {
    setSelectedPet(pet);
  }

  function closePopup() {
    setSelectedPet(null);
  }

  if (!user || !adoptedPets) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adopted Pets:</Text>
      {adoptedPets.length !== 0 ? (
        <FlatList
          data={adoptedPets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{ uri: item.img }}
                alt={item.name}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noPets}>You haven't adopt any pets yet...</Text>
      )}

      {selectedPet && <PetPopup pet={selectedPet} closePopup={closePopup} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  list: {
    paddingBottom: 16,
  },
  noPets: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  petName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  petDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#f1cdb3",
    padding: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    padding: 16,
    margin: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  name: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
});
