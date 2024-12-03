import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "@/context/AuthContext";
export default function TabLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>🏠</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: user && user.isAdmin ? "Admin" : "Profile",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>👤</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>📃</Text>
          ),
        }}
      />
    </Tabs>
  );
}
