import React, { useContext } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { usePathname } from "expo-router";

export default function PetPopup({ pet, closePopup }) {
  const { user, addPetToUser, removePetFromUser, addAdoptedPet } =
    useContext(AuthContext);

  const pathname = usePathname();

  function convertMonthsToAge(months) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const yearsLabel = years > 1 ? "years" : "year";
    const monthsLabel = remainingMonths > 1 ? "months" : "month";

    let result = "";
    if (years > 0) {
      result += `${years} ${yearsLabel}`;
    }

    if (remainingMonths > 0) {
      if (years > 0) result += " ";
      result += `${remainingMonths} ${monthsLabel}`;
    }

    return result || "0 months";
  }

  const handleAddToFavorites = () => {
    addPetToUser(pet);
    closePopup();
  };

  const handleRemoveFromFavorites = () => {
    removePetFromUser(pet);
    closePopup();
  };

  const handleAddAdoptedPet = () => {
    addAdoptedPet(pet);
    closePopup();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={closePopup}
    >
      <TouchableWithoutFeedback onPress={closePopup}>
        <View style={styles.popupContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.popupContent}>
              <View style={styles.popupTop}>
                <Image source={{ uri: pet.img }} style={styles.popupImage} />
                <ScrollView contentContainerStyle={styles.popupText}>
                  <Text style={styles.popupName}>{pet.name}</Text>
                  <Text style={styles.popupType}>
                    {convertMonthsToAge(pet.age)}
                  </Text>
                  <Text style={styles.popupType}>{pet.breed}</Text>
                  <Text style={styles.popupDesc}>{pet.description}</Text>
                </ScrollView>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
                <Text style={styles.closeButtonText}>&#x2715;</Text>
              </TouchableOpacity>
              {user && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    pathname !== "/" ? styles.removeButton : styles.addButton,
                  ]}
                  onPress={
                    pathname !== "/"
                      ? handleRemoveFromFavorites
                      : handleAddToFavorites
                  }
                >
                  <Text style={styles.actionButtonText}>
                    {pathname !== "/"
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </Text>
                </TouchableOpacity>
              )}
              {user && pathname === "/profile" && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.addButton]}
                  onPress={handleAddAdoptedPet}
                >
                  <Text style={styles.actionButtonText}>Take to home</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: "90%",
    padding: 20,
    alignItems: "center",
  },
  popupTop: {
    flexDirection: "row",
  },
  popupImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  popupText: {
    marginLeft: 20,
    flex: 1,
  },
  popupName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupType: {
    fontSize: 16,
    marginBottom: 5,
  },
  popupDesc: {
    fontSize: 14,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#f1cdb3",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  actionButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
  removeButton: {
    backgroundColor: "#FF6347",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
