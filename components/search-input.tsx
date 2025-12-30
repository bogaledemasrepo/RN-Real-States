import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const SearchInput = () => {
  return (
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#8C8E98" />
            <TextInput
              placeholder="Search something"
              placeholderTextColor="#8C8E98"
              style={styles.searchInput}
            />
            <Ionicons name="options-outline" size={20} color="black" />
          </View>
  )
}
const styles = StyleSheet.create({
      searchBar: {
    flexDirection: "row",
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    padding: 12,
    marginTop: 25,
    alignItems: "center",
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
})
export default SearchInput