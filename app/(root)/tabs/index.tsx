import { FeaturedCard } from "@/components/featured-card";
import Header from "@/components/header-component";
import { PropertyCard } from "@/components/property-card";
import SearchInput from "@/components/search-input";
import { RECOMMENDATIONS } from "@/constants";
import React, { FC } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


// 2. Main Screen Component
const RealEstateHome: FC = () => {
  const { top } = useSafeAreaInsets();
  const renderHeader = () => (
    <View style={{ paddingHorizontal: 12 }}>
      {/* Header Profile */}

      <Header />
      {/* Search Bar */}
      <SearchInput />

      <SectionHeader title="Featured" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={RECOMMENDATIONS}
        keyExtractor={(item) => `featured-${item.id}`}
        renderItem={({ item }) => <FeaturedCard item={item} />}
      />

      <SectionHeader title="Our Recommendation" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {["All", "House", "Villa", "Apartments"].map((cat, i) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, i === 0 && styles.activeCategory]}
          >
            <Text
              style={{ color: i === 0 ? "white" : "black", fontWeight: "500" }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={[styles.safeArea, { paddingTop: top }]}>
      <FlatList
        data={RECOMMENDATIONS}
        renderItem={({item})=><PropertyCard key={item.id} item={item} onPress={()=>{}}/>}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

// 3. Sub-Components with Type Definitions
const SectionHeader: FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.seeAll}>See All</Text>
    </TouchableOpacity>
  </View>
);


// 4. Stylesheet
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1A1D1E" },
  seeAll: { color: "#FF8C00", fontWeight: "600" },

  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F7F8FA",
    marginRight: 10,
  },
  activeCategory: { backgroundColor: "#FF8C00" },
  recPrice: { color: "#FF8C00", fontWeight: "bold", fontSize: 14 },
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 12 },
});

export default RealEstateHome;
