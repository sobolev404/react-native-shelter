import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function AdminPets() {
  const { petsApi, fetchPets } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const openEditModal = (pet) => {
    setEditingPet(pet);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingPet(null);
    setModalVisible(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://d8f8-151-249-187-243.ngrok-free.app/pets/${editingPet._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPet),
        }
      );

      if (response.ok) {
        Alert.alert("Успешно", "Данные питомца обновлены!");
        fetchPets();
        closeEditModal();
      } else {
        Alert.alert("Ошибка", "Не удалось обновить данные питомца.");
      }
    } catch (error) {
      console.error("Ошибка обновления:", error);
      Alert.alert("Ошибка", "Что-то пошло не так...");
    }
  };

  const renderPetCard = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: item.img }} alt={item.name} />
      <View style={styles.petDesc}>
        <Text>{item.name}</Text>
        <Text>{item.breed}</Text>
      </View>
      <View style={styles.btns}>
        <View style={styles.btnCont}>
          <Text onPress={() => openEditModal(item)}>✏️</Text>
        </View>
        <View style={styles.btnCont}>
          <Text
            onPress={() =>
              Alert.alert("Подтвердите", "Удалить питомца?", [
                { text: "Отмена", style: "cancel" },
                {
                  text: "Удалить",
                  onPress: () => handleDelete(item._id),
                  style: "destructive",
                },
              ])
            }
          >
            ❌
          </Text>
        </View>
      </View>
    </View>
  );

  const handleDelete = async (petId) => {
    try {
      const response = await fetch(
        `https://d8f8-151-249-187-243.ngrok-free.app/pets/${petId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        Alert.alert("Успешно", "Питомец удален.");
        fetchPets();
      } else {
        Alert.alert("Ошибка", "Не удалось удалить питомца.");
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      Alert.alert("Ошибка", "Что-то пошло не так...");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <FlatList
        data={petsApi}
        keyExtractor={(item) => item._id}
        renderItem={renderPetCard}
        contentContainerStyle={styles.cardList}
      />

      {isModalVisible && editingPet && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeEditModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView>
                <Text style={styles.modalTitle}>Редактировать питомца</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Имя"
                  value={editingPet.name}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, name: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL изображения"
                  value={editingPet.img}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, img: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Тип (например, собака, кошка)"
                  value={editingPet.type}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, type: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Порода"
                  value={editingPet.breed}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, breed: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Описание"
                  value={editingPet.description}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, description: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Возраст"
                  value={String(editingPet.age)}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, age: parseInt(text) || 0 })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Прививки"
                  value={editingPet.inoculations}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, inoculations: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Заболевания"
                  value={editingPet.diseases}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, diseases: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Паразиты"
                  value={editingPet.parasites}
                  onChangeText={(text) =>
                    setEditingPet({ ...editingPet, parasites: text })
                  }
                />
                <View style={styles.modalButtons}>
                  <Button title="Сохранить" onPress={handleUpdate} />
                  <Button title="Отмена" color="red" onPress={closeEditModal} />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  cardList: { alignSelf: "center" },
  card: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  petDesc: { rowGap: 5 },
  btns: { flexDirection: "row", columnGap: 15 },
  btnCont: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
