import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const SearchBar = () => (
  <View style={styles.container}>
    <Ionicons name="search-outline" size={20} color="#8C8E98" />
    <TextInput placeholder="Search something" style={styles.input} />
    <Ionicons name="options-outline" size={20} color="#1A1D1E" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
  },
  input: { flex: 1, marginLeft: 10 },
});
