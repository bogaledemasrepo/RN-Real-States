import FilterModal from '@/components/FilterModal';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Apartment {
  id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  image: string;
}

const APARTMENTS: Apartment[] = [
  { id: '1', title: 'Lucky Lake Apartments', location: 'Beijing, China', price: '$1234', rating: 4.8, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400' },
  { id: '2', title: 'Home Away From Home', location: 'Beijing, China', price: '$1234', rating: 4.8, image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=400' },
];

const CATEGORIES = ['All', 'House', 'Villa', 'Apartments', 'Others'];

const ExploreScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);
  const {bottom,top}=useSafeAreaInsets();

  const renderApartment = ({ item }: { item: Apartment }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FF8C00" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={22} color="#8E8E93" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.cardLocation}>{item.location}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container,{paddingTop:top}]}>
      

      <FlatList
        ListHeaderComponent={
        <View style={[{marginHorizontal:8}]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search for Your Ideal Home</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#8E8E93" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Beijing China" 
          />
          {/* TRIGGER: Set state to true here */}
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Ionicons name="options-outline" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={{ marginVertical: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setActiveCategory(cat)}
                style={[styles.catButton, activeCategory === cat && styles.catButtonActive]}
              >
                <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.resultsText}>Found 182 Apartments</Text>
      </View>
      }
        data={APARTMENTS}
        renderItem={renderApartment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {/* RENDER MODAL: Pass the state and the closer function */}
      <FilterModal 
        visible={filterVisible} 
        onClose={() => setFilterVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#FFF8F0',
    padding: 12,
    borderRadius: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1D1E' },
  dot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF8C00',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 12,
    height: 55,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '600' },
  catButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginRight: 10,
  },
  catButtonActive: { backgroundColor: '#FF8C00', borderColor: '#FF8C00' },
  catText: { color: '#8E8E93', fontWeight: '600' },
  catTextActive: { color: 'white' },
  resultsText: { fontSize: 20, fontWeight: '700', marginBottom: 15 },
  listContent: {paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 12,
    marginVertical:6,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 },
    }),
  },
  imageWrapper: { position: 'relative' },
  cardImage: { width: 100, height: 100, borderRadius: 8 },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: { fontSize: 10, fontWeight: '700', marginLeft: 2 },
  cardContent: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { fontSize: 16, fontWeight: '700', flex: 1, marginRight: 5 },
  cardLocation: { fontSize: 13, color: '#8E8E93' },
  cardPrice: { fontSize: 18, fontWeight: '700', color: '#FF8C00' },
});

export default ExploreScreen;