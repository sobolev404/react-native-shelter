import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "@/context/AuthContext";

export default function AddNewPet() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    petImg: "",
    petType: "",
    petBreed: "",
    petDesc: "",
    petAge: "",
    petInoculations: "",
    petDiseases: "",
    petParasites: "",
  });
  const { fetchPets } = useContext(AuthContext);
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      img: formData.petImg,
      type: formData.petType,
      breed: formData.petBreed,
      description: formData.petDesc,
      age: Number(formData.petAge),
      inoculations: formData.petInoculations
        ? formData.petInoculations.split(",").map((str) => str.trim())
        : [],
      diseases: formData.petDiseases
        ? formData.petDiseases.split(",").map((str) => str.trim())
        : [],
      parasites: formData.petParasites
        ? formData.petParasites.split(",").map((str) => str.trim())
        : [],
    };

    try {
      const response = await fetch(
        "https://d8f8-151-249-187-243.ngrok-free.app/pets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Питомец добавлен:", data);
        setIsEditing(false);
        setFormData({
          name: "",
          petImg: "",
          petType: "",
          petBreed: "",
          petDesc: "",
          petAge: "",
          petInoculations: "",
          petDiseases: "",
          petParasites: "",
        });

        fetchPets();
      } else {
        console.error("Ошибка при добавлении питомца");
      }
    } catch (error) {
      console.error("Ошибка при запросе:", error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Add a new pet</Text>
      {!isEditing ? (
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Add pet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#888"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pet image(url)"
            placeholderTextColor="#888"
            value={formData.petImg}
            onChangeText={(text) => handleChange("petImg", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Type (dog/cat/etc)"
            placeholderTextColor="#888"
            value={formData.petType}
            onChangeText={(text) => handleChange("petType", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Breed"
            placeholderTextColor="#888"
            value={formData.petBreed}
            onChangeText={(text) => handleChange("petBreed", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#888"
            value={formData.petDesc}
            onChangeText={(text) => handleChange("petDesc", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age (months)"
            placeholderTextColor="#888"
            value={formData.petAge}
            onChangeText={(text) => handleChange("petAge", text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Inoculations (not required)"
            placeholderTextColor="#888"
            value={formData.petInoculations}
            onChangeText={(text) => handleChange("petInoculations", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Diseases (not required)"
            placeholderTextColor="#888"
            value={formData.petDiseases}
            onChangeText={(text) => handleChange("petDiseases", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Parasites (not required)"
            placeholderTextColor="#888"
            value={formData.petParasites}
            onChangeText={(text) => handleChange("petParasites", text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "90%",
    minWidth: 280,
    margin: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  title: {
    color: "#333",
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 15,
    color: "black",
  },
  btns: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancel: {
    backgroundColor: "#ccc",
  },
});
