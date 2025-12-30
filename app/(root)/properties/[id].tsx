import { RECOMMENDATIONS } from "@/constants";
import { Property } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const Facility = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.facilityItem}>
    <View style={styles.facilityIcon}>
      <Ionicons name={icon} size={22} color="#FF8C00" />
    </View>
    <Text style={styles.facilityLabel}>{label}</Text>
  </View>
);


export default function RealEstateApp() {
  const {top,bottom}=useSafeAreaInsets()
  const { id } = useLocalSearchParams();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  useEffect(() => {
    const data = RECOMMENDATIONS.find((Item) => Item.id === id);
    if (data) return setSelectedProperty(data);
  }, [id]);
  return (
    <View style={[styles.container,{paddingTop:top,paddingBottom:bottom}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: selectedProperty?.imageUrl }}
          style={styles.detailHero}
        >
          <SafeAreaView style={styles.detailHeader}>
            <TouchableOpacity
              onPress={() => router.navigate("/(root)/tabs")}
              style={styles.roundBtn}
            >
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[styles.roundBtn, { marginRight: 10 }]}>
                <Ionicons name="heart-outline" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.roundBtn}>
                <Ionicons name="share-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>{selectedProperty?.name}</Text>
          <View style={styles.detailSubRow}>
            <Text style={styles.typeTag}>Apartment</Text>
            <Text style={styles.ratingText}>
              ⭐ {selectedProperty?.rating} (1,275 reviews)
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Stat icon="bed-outline" val="8 Beds" />
            <Stat icon="water-outline" val="3 Bath" />
            <Stat icon="move-outline" val="2000 sqft" />
          </View>

          <Text style={styles.detailSectionTitle}>Agent</Text>
          <View style={styles.agentRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.agentAvatar}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.agentName}>Natasya Wilodra</Text>
              <Text style={styles.agentRole}>Owner</Text>
            </View>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#FF8C00"
              style={{ marginRight: 15 }}
            />
            <Ionicons name="call-outline" size={24} color="#FF8C00" />
          </View>

          <Text style={styles.detailSectionTitle}>Facilities</Text>
          <View style={styles.facilitiesGrid}>
            <Facility icon="car-outline" label="Car Parking" />
            <Facility icon="sunny-outline" label="Swimming" />
            <Facility icon="barbell-outline" label="Gym" />
            <Facility icon="restaurant-outline" label="Restaurant" />
          </View>
        </View>
      </ScrollView>

      {/* Booking Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceSub}>PRICE</Text>
          <Text style={styles.totalPrice}>{selectedProperty?.price}</Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Booking Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stat = ({ icon, val }: any) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Ionicons name={icon} size={18} color="#FF8C00" />
    <Text style={{ marginLeft: 5 }}>{val}</Text>
  </View>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  ratingText: { color: "#007AFF", fontWeight: "bold", fontSize: 12 },

  // Detail Styles
  detailHero: { width: "100%", height: 400 },
  detailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  detailContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
  },
  detailTitle: { fontSize: 24, fontWeight: "bold" },
  detailSubRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  typeTag: {
    backgroundColor: "#FFF7ED",
    color: "#FF8C00",
    padding: 5,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  agentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  agentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  agentName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  agentRole: {
    color: "#8C8E98",
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facilityItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 15,
  },
  facilityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },
  facilityLabel: {
    fontSize: 10,
    marginTop: 5,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF8C00",
  },
  bookBtn: {
    backgroundColor: "#FF8C00",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
  },
  bookBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  priceSub: {
    color: "#8C8E98",
    fontSize: 10,
  },
});
