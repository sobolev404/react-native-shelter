import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adoptedPets,setAdoptedPets] = useState([])

  const [petsApi, setPetsApi] = useState([]);

  const router = useRouter(); // Используем useRouter для маршрутизации
  const URL = "https://d3ab-146-120-15-51.ngrok-free.app";
  // const URL = 'http://localhost:4444'
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        fetchUserData(storedToken);
      } else {
        setLoading(false);
      }
    };
    initializeAuth();
  }, [token]);

  const fetchUserData = async (currentToken) => {
    setLoading(true);
    try {
      const response = await fetch(URL + "/auth/me", {
        headers: {
          Authorization: `Bearer ${currentToken || token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUser(userData);

      // Fetch user's favorite pets
      setUserPets(userData.favoritePets);
      setAdoptedPets(userData.adoptedPets)
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await fetch(URL + "/pets");
      const data = await response.json();
      setPetsApi(data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    }
  };

  const fetchUserPets = async () => {
    try {
      const response = await fetch(`${URL}/favPetsList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }), // Передаем userId в body
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserPets((prev) => ({ ...prev, favoritePets: data.favoritePets }));
      } else {
        alert("Failed to fetch favorite pets");
      }
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    }
  };

  const fetchAdoptedPets = async () => {
    try {
      const response = await fetch(`${URL}/adoptedPetsList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }), // Передаем userId в body
      });
  
      if (response.ok) {
        const data = await response.json();
        setAdoptedPets((prev) => ({ ...prev, adoptedPets: data.adoptedPets }));
      } else {
        alert("Failed to fetch adopted pets");
      }
    } catch (error) {
      console.error("Error fetching adopted pets:", error);
    }
  };
  

  const login = async (email, password) => {
    try {
      const response = await fetch(URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data);
      setToken(data.token);
      await AsyncStorage.setItem("token", data.token);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  const register = async (email, password, fullName, avatarUrl) => {
    try {
      const response = await fetch(URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName, avatarUrl }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        if (data.errors) {
          // Если есть ошибки валидации, выводим их
          alert(data.errors.join("\n")); // Выводим все ошибки в одном сообщении
        } else {
          throw new Error(data.message || "Registration failed");
        }
        return;
      }
  
      setUser(data);
      setToken(data.token);
      await AsyncStorage.setItem("token", data.token);
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Произошла ошибка при регистрации: " + error.message); // Показываем сообщение об ошибке
    }
  };
  

  const addPetToUser = async (pet) => {
    try {
      const response = await fetch(`${URL}/favourites`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id, petId: pet._id }), // Отправляем только petId
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} was added to your wishlist`);
        setUserPets(data.user.favoritePets); // Обновляем состояние избранного
        fetchPets();
      } else {
        const error = await response.json();
        alert(`Failed to add pet to wishlist: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding pet to wishlist:", error);
      alert("An error occurred while adding the pet to your wishlist.");
    }
  };

  const removePetFromUser = async (pet) => {
    try {
      const response = await fetch(`${URL}/favourites/remove`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          petId: pet._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} was removed from your wishlist`);
        setUserPets(data.user.favoritePets); // Обновляем состояние избранных
        fetchPets();
      } else {
        alert("Failed to remove pet from wishlist.");
      }
    } catch (error) {
      console.error("Error removing pet from wishlist:", error);
      alert("An error occurred while removing the pet from your wishlist.");
    }
  };

  const addAdoptedPet = async (pet) => {
    try {
      const response = await fetch(`${URL}/adopt`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id, // ID пользователя
          petId: pet._id, // ID питомца
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} has been successfully adopted`);
        setAdoptedPets(data.user.adoptedPets);
        fetchPets(); // Опционально обновляем список всех питомцев
        setUserPets(data.user.favoritePets)
      } else {
        const error = await response.json();
        alert(`Failed to adopt pet: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      alert("An error occurred while adopting the pet.");
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("token");
    router.push("/");
  };

  const deletePet = async (petId) => {
    try {
      const response = await fetch(`${URL}/pets/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Добавьте токен, если API требует авторизации
        },
      });
  
      if (response.ok) {
        alert("Pet deleted successfully!");
        fetchPets(); // Обновите список питомцев после удаления
      } else {
        const error = await response.json();
        alert(`Failed to delete pet: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting pet:", error);
      alert("An error occurred while deleting the pet.");
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        fetchUserData,
        loading,
        addPetToUser,
        removePetFromUser,
        userPets,
        setUserPets,
        fetchPets, // добавили fetchPets
        petsApi, // доступ к данным питомцев
        addAdoptedPet,
        adoptedPets,
        fetchAdoptedPets,
        fetchUserPets,
        deletePet
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
