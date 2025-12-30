import { Property } from "@/types";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const FeaturedCard: React.FC<{ item: Property }> = ({ item }) => (
  <TouchableOpacity style={styles.container}>
    <Image source={{ uri: item.imageUrl }} style={styles.img} />
    <View style={styles.badge}>
      <Text style={styles.badgeText}>⭐ {item.rating}</Text>
    </View>
    <View style={styles.overlay}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.loc}>{item.location}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 240,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%" },
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
  title: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  loc: { color: "rgba(255,255,255,0.8)" },
  price: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginTop: 4 },
});
