import { Link } from "expo-router";
import { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Burger from "@/components/ui/Burger";
import { AuthContext } from "@/context/AuthContext";
export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuPosition = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current; // Начальная позиция меню за пределами экрана справа
  const overlayOpacity = useRef(new Animated.Value(0)).current; // Начальная прозрачность overlay

  const { user } = useContext(AuthContext);

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(menuPosition, {
      toValue: isMenuActive ? 0 : Dimensions.get("window").width, // Если меню активно, перемещаем в 0 (на экран), иначе за пределы экрана
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(overlayOpacity, {
      toValue: isMenuActive ? 1 : 0, // Плавное изменение прозрачности overlay
      duration: 300,
      useNativeDriver: true,
    }).start();

    
  }, [isMenuActive]);

  return (
    <View style={styles.headerContainer}>
      <Link href="/">
        <View>
          <Text style={styles.logoMain}>Cozy House</Text>
          <Text style={styles.logoSub}>Shelter for pets in Boston</Text>
        </View>
      </Link>

      <View>
        <Burger isMenuActive={isMenuActive} setIsMenuActive={toggleMenu} />
        {isMenuActive && (
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <Animated.View
              style={[
                styles.overlay,
                { opacity: overlayOpacity }, // Прозрачность затемнения
              ]}
            />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            styles.nav,
            {
              transform: [{ translateX: menuPosition }], // Анимация выезда
            },
          ]}
        >
          <Link onPress={toggleMenu} href="/">
            <Text style={styles.navItem}>Home</Text>
          </Link>
          <Link onPress={toggleMenu} href={user ? "/profile" : "/login"}>
            <Text style={styles.navItem}>{user ? "Profile" : "Login"}</Text>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "brown",
  },
  logoMain: {
    fontFamily: "Georgia",
    fontSize: Dimensions.get("window").width * 0.08,
    color: "#f1cdb3",
  },
  logoSub: {
    fontFamily: "Arial",
    fontSize: Dimensions.get("window").width * 0.03,
    color: "#fff",
  },
  nav: {
    position: "absolute",
    top: -20,
    right: -10, // Начальная позиция меню за экраном справа
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height,
    backgroundColor: "#292929",
    justifyContent: "center", // Центрирование по вертикали
    alignItems: "center", // Центрирование по горизонтали
    zIndex: 2,
    rowGap: 30,
  },
  navItem: {
    color: "#f1cdb3",
    fontSize: 30, // Размер шрифта для лучшей читаемости
    marginVertical: 30, // Расстояние между ссылками
    textAlign: "center", // Центрируем текст
  },
  overlay: {
    position: "absolute",
    top: -20,
    left: -350,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачный черный фон
    zIndex: 1, // На заднем плане меню
  },
});
