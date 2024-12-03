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
  ).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  useEffect(() => {
    Animated.timing(menuPosition, {
      toValue: isMenuActive ? 0 : Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(overlayOpacity, {
      toValue: isMenuActive ? 1 : 0,
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
              style={[styles.overlay, { opacity: overlayOpacity }]}
            />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            styles.nav,
            {
              transform: [{ translateX: menuPosition }],
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
    right: -10,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height,
    backgroundColor: "#292929",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    rowGap: 30,
  },
  navItem: {
    color: "#f1cdb3",
    fontSize: 30,
    marginVertical: 30,
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    top: -20,
    left: -350,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});
