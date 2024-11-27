import React, { useState, useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Burger({ setIsMenuActive, isMenuActive }) {
  const rotateAnim = useRef(new Animated.Value(0)).current; // Изначально 0, т.е. без поворота

  // Привязываем анимацию поворота к состоянию isMenuActive
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isMenuActive ? 1 : 0, // Если меню активно, поворачиваем на 90 градусов
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuActive]); // Анимация запускается при изменении isMenuActive

  // Обработчик нажатия
  const handlePress = () => {
    setIsMenuActive((prevState) => !prevState); // Переключаем состояние меню
  };

  // Преобразуем значение анимации в угол поворота (от 0 до 90 градусов)
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"], // Поворот на 90 градусов
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.burger}>
      <Animated.View
        style={[
          styles.burgerContainer,
          {
            transform: [{ rotate: rotateInterpolate }], // Применяем анимацию поворота ко всему контейнеру
          },
        ]}
      >
        <Text style={styles.burgerSpan}></Text>
        <Text style={styles.burgerSpan}></Text>
        <Text style={styles.burgerSpan}></Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  burger: {
    position: "relative",
    flexDirection: "column",
    zIndex: 3,
  },
  burgerContainer: {
    position: "relative",
    flexDirection: "column",
  },
  burgerSpan: {
    width: 30,
    height: 3,
    backgroundColor: "#f1cdb3",
    marginBottom: 9, // Вместо rowGap
  },
});
