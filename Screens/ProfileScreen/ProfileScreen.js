import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace("Login"); // Redirect to Login screen after logout
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Profile Screen
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#ff4757",
          padding: 12,
          borderRadius: 8,
          width: 150,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
