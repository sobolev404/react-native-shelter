import React, { useState, useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Burger({ setIsMenuActive, isMenuActive }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isMenuActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isMenuActive]);

  const handlePress = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.burger}>
      <Animated.View
        style={[
          styles.burgerContainer,
          {
            transform: [{ rotate: rotateInterpolate }],
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
    marginBottom: 9,
  },
});
