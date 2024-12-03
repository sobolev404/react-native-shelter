import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PetCard({ pet, onClick }) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.card}>
      <Image style={styles.image} source={{ uri: pet.img }} alt={pet.name} />
      <Text style={styles.name}>{pet.name}</Text>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.buttonText}>Learn more</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: "#f1cdb3",
    borderRadius: 16,
    padding: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
