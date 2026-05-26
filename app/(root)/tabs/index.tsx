import { FeaturedCard } from "@/components/featured-card";
import Header from "@/components/header-component";
import { RecommendedCard } from "@/components/recomended-card";
import { BASE_URL } from "@/constants";
import { RealState } from "@/types";
import { Link } from "expo-router";
import React, { FC, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 2. Main Screen Component
const RealEstateHome: FC = () => {
  const { top } = useSafeAreaInsets();
  const [featuredData, setFeaturedData] = React.useState<RealState[]>([]);
  const [recommendations, setRecommendations] = React.useState<RealState[]>([]);
  const getFeaturedData = async () => {
    const response = await fetch(`${BASE_URL}/listings/featured`);
    if (!response.ok)
      return console.log("Failed to fetch featured data", response);
    const data = await response.json();
    setFeaturedData(data);
  };
  const fetchRecommended = async () => {
    const response = await fetch(
      `${BASE_URL}/listings/recommended?lat=155.78&lng=78.45`,
    );
    if (!response.ok)
      return console.log("Failed to fetch fetchRecommended", response);
    const data = await response.json();
    setRecommendations(data);
  };
  useEffect(() => {
    getFeaturedData();
  }, []);
  useEffect(() => {
    fetchRecommended();
  }, []);
  const renderHeader = () => (
    <View style={{ paddingHorizontal: 12 }}>
      <Header />
      {/* <SearchInput /> */}
      {/* <SectionHeader title="Featured" /> */}
      <View style={{ height: 20 }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={featuredData}
        keyExtractor={(item) => `featured-${item.id}`}
        renderItem={({ item }) => (
          <Link href={`/(root)/properties/${item.id}`} asChild>
            <FeaturedCard item={item} />
          </Link>
        )}
      />

      <SectionHeader title="Our Recommendation" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 8 }}
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
        data={recommendations}
        renderItem={({ item }) => (
          <Link href={`/(root)/properties/${item.id}`} asChild>
            <RecommendedCard key={item.id} item={item} />
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{ paddingBottom: 40, gap: "1%" }}
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
    marginVertical: 12,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "semibold", color: "#828383" },
  seeAll: { color: "#FF8C00", fontWeight: "600" },

  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F7F8FA",
    marginRight: 10,
  },
  activeCategory: { backgroundColor: "#FF8C00" },
  recPrice: { color: "#FF8C00", fontWeight: "bold", fontSize: 14 },
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 8 },
});

export default RealEstateHome;
