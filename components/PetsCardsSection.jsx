import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import PetCard from "./PetCard";
import PetPopup from "./PetPopup";
import { AuthContext } from "@/context/AuthContext";
export default function PetsCardSection() {
  const { fetchPets, petsApi, loading } = useContext(AuthContext); // Получаем данные и функцию из контекста
  const [selectedPet, setSelectedPet] = useState(null);



  useEffect(() => {
    fetchPets();
  }, []);

  const openPopup = (pet) => {
    setSelectedPet(pet);
  };

  const closePopup = () => {
    setSelectedPet(null);
  };

  const renderItem = ({ item }) => (
    <PetCard onClick={() => openPopup(item)} pet={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Our friends who{"\n"}are looking for a house
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={petsApi}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      {selectedPet && (
        <PetPopup pet={selectedPet} closePopup={closePopup} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  loader: {
    marginTop: 50,
  },
  list: {
    paddingVertical: 16,
  },
});
