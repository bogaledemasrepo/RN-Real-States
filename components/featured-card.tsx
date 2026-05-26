import { RealState } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const FeaturedCard: React.FC<{ item: RealState }> = ({ item }) => {
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
        {/* <Text style={styles.loc}>{item.address}</Text> */}
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    width: 180,
    height: 240,
    marginRight: 15,
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
  overlay: { position: "absolute", bottom: 20, left: 20 },
  title: { color: "#FFF", fontSize: 14, fontWeight: "500" },
  loc: { color: "rgba(255,255,255,0.8)" },
  price: { color: "#FFF", fontSize: 18, fontWeight: "600", marginTop: 4 },
});
