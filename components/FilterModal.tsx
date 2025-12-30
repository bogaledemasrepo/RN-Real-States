import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose }) => {
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [propertyType, setPropertyType] = useState('Apartments');

  const PropertyChip = ({ label }: { label: string }) => {
    const isActive = propertyType === label;
    return (
      <TouchableOpacity 
        style={[styles.chip, isActive && styles.chipActive]}
        onPress={() => setPropertyType(label)}
      >
        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const Counter = ({ value, setValue }: { value: number; setValue: (v: number) => void }) => (
    <View style={styles.counterRow}>
      <TouchableOpacity onPress={() => setValue(Math.max(0, value - 1))} style={styles.counterBtn}>
        <Ionicons name="remove" size={20} color="#FF8C00" />
      </TouchableOpacity>
      <Text style={styles.counterValue}>{value}</Text>
      <TouchableOpacity onPress={() => setValue(value + 1)} style={styles.counterBtn}>
        <Ionicons name="add" size={20} color="#FF8C00" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filter</Text>
            <TouchableOpacity><Text style={styles.resetText}>Reset</Text></TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            
            {/* Price Range Section */}
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.sliderContainer}>
              {/* Note: In a real app, you'd render a background bar chart here */}
              <MultiSlider
                values={[102, 327]}
                sliderLength={320}
                min={0}
                max={500}
                selectedStyle={{ backgroundColor: '#FF8C00' }}
                markerStyle={styles.sliderMarker}
              />
              <View style={styles.priceLabels}>
                <Text style={styles.priceValue}>$102</Text>
                <Text style={styles.priceValue}>$327</Text>
              </View>
            </View>

            {/* Property Type */}
            <Text style={styles.sectionTitle}>Property Type</Text>
            <View style={styles.chipGroup}>
              {['Apartments', 'Townhomes', 'Homes', 'Condos', 'Duplexes', 'Studios'].map(t => (
                <PropertyChip key={t} label={t} />
              ))}
            </View>

            {/* Home Details */}
            <Text style={styles.sectionTitle}>Home Details</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Bedrooms</Text>
              <Counter value={bedrooms} setValue={setBedrooms} />
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Bathrooms</Text>
              <Counter value={bathrooms} setValue={setBathrooms} />
            </View>

            {/* Building Size */}
            <Text style={styles.sectionTitle}>Building Size</Text>
            <View style={styles.sliderContainer}>
               <MultiSlider
                values={[1370, 2720]}
                sliderLength={320}
                min={0}
                max={5000}
                selectedStyle={{ backgroundColor: '#FF8C00' }}
                markerStyle={styles.sliderMarker}
              />
            </View>

          </ScrollView>

          {/* Action Button */}
          <TouchableOpacity style={styles.setFilterBtn} onPress={onClose}>
            <Text style={styles.setFilterText}>Set Filter</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim background behind modal
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '90%',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backBtn: {
    backgroundColor: '#FFF8F0',
    padding: 10,
    borderRadius: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  resetText: { color: '#FF8C00', fontSize: 16, fontWeight: '600' },
  scrollBody: { paddingBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 25, marginBottom: 15 },
  sliderContainer: { alignItems: 'center' },
  sliderMarker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#FF8C00',
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -10,
  },
  priceValue: { color: '#FF8C00', fontWeight: '700' },
  chipGroup: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginRight: 10,
    marginBottom: 10,
  },
  chipActive: { backgroundColor: '#FF8C00', borderColor: '#FF8C00' },
  chipText: { color: '#8E8E93', fontWeight: '600' },
  chipTextActive: { color: 'white' },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  detailLabel: { fontSize: 16, color: '#8E8E93', fontWeight: '500' },
  counterRow: { flexDirection: 'row', alignItems: 'center' },
  counterBtn: { padding: 4, backgroundColor: '#FFF8F0', borderRadius: 8 },
  counterValue: { marginHorizontal: 15, fontSize: 16, fontWeight: '700' },
  setFilterBtn: {
    backgroundColor: '#FF8C00',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  setFilterText: { color: 'white', fontSize: 18, fontWeight: '700' },
});

export default FilterModal;