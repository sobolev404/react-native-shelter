import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import Header from "@/components/Header";
import PetsCardsSection from "@/components/PetsCardsSection";
import Footer from "@/components/Footer";

export default function HomeScreen() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const renderContent = () => {
    return (
      <>
        <Header />
        <PetsCardsSection setIsPopupOpen={setIsPopupOpen} />
        <Footer />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => renderContent()}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={!isPopupOpen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
