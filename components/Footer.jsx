import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import emailIcon from "../assets/icons/email.png"
import phoneIcon from "../assets/icons/phone.png"
import locationIcon from "../assets/icons/location.png"


export default function SectionFooter() {
  return (
    <View style={styles.wrapperFooter}>
        {/* Контакты */}
        <View style={styles.contacts}>
          <Text style={styles.title}>For questions and suggestions</Text>
          <TouchableOpacity
            onPress={() => {
              // Ссылка на почту
            }}
          >
            <View style={styles.contactsItem}>
              <Image source={emailIcon} style={styles.icon} />
              <Text style={styles.contactText}>email@shelter.com</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Ссылка для звонка
            }}
          >
            <View style={styles.contactsItem}>
              <Image source={phoneIcon} style={styles.icon} />
              <Text style={styles.contactText}>+13 674 567 75 54</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Локация */}
        <View style={styles.location}>
          <Text style={styles.title}>We are waiting for your visit</Text>
          <TouchableOpacity
            onPress={() => {
              // Ссылка на Google Maps
            }}
          >
            <View style={styles.locationItem}>
              <Image source={locationIcon} style={styles.icon} />
              <Text style={styles.locationText}>
                1 Central Street, Boston (entrance from the store)
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // Ссылка на другую локацию
            }}
          >
            <View style={styles.locationItem}>
              <Image source={locationIcon} style={styles.icon} />
              <Text style={styles.locationText}>18 South Park, London</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperFooter: {
    backgroundColor: "#1a1a1a", // Замените на ваш фон, если используется картинка
    padding: 20,
  },
  footer: {
    flexDirection: "column",
    alignItems: "center",
    rowGap: 20,
  },
  contacts: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  contactsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  contactText: {
    color: "#f1cdb3",
    fontSize: 16,
    marginLeft: 10,
  },
  location: {
    alignItems: "center",
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  locationText: {
    color: "#f1cdb3",
    fontSize: 16,
    marginLeft: 10,
  },
  footerImg: {
    width: "80%",
    maxWidth: 300,
    height: undefined,
    aspectRatio: 1,
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
