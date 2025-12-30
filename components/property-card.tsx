import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  item: Property;
  onPress?: () => void;
}

export const PropertyCard: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.imageUrl }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.location}>{item.location}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price}</Text>
        <Ionicons name="heart-outline" size={18} color="#8C8E98" />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: { padding: 10 },
  name: { fontWeight: "bold", fontSize: 14 },
  location: { color: "#8C8E98", fontSize: 12, marginTop: 2 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: { color: "#FF8C00", fontWeight: "bold" },
});
