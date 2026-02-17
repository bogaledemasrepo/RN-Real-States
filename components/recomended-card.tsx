import { RealState } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const RecommendedCard: React.FC<{ item: RealState }> = ({ item }) => {
  const router = useRouter();
  const handlePress = () => {
    // Handle card press, e.g., navigate to details
    router.push(`/properties/${item.id}`);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <View style={styles.badge}>
        {/* <Text style={styles.badgeText}>⭐ {item.}</Text> */}
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.loc}>{item.address}</Text>
        <Text style={styles.price}>${parseFloat(item.price) / 100}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    width: "49%",
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%", resizeMode: "cover" },
  badge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#FFF",
    padding: 6,
    borderRadius: 10,
  },
  badgeText: { fontSize: 12, color: "#007AFF", fontWeight: "bold" },
  overlay: { position: "absolute", bottom: 8, left: 8 },
  title: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
  loc: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 4 },
  price: { color: "#FFF", fontSize: 12, fontWeight: "bold", marginTop: 4 },
});
