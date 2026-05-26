import { useAuth } from "@/context/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  const router = useRouter()
  const { user } = useAuth();
  return (
    <View style={styles.headerRow}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.greetingText}>Good Morning</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.navigate("/notifications")}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  profileContainer: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  greetingText: { color: "#8C8E98", fontSize: 12 },
  userName: { fontSize: 16, fontWeight: "bold", color: "#1A1D1E" },
});
export default Header;
