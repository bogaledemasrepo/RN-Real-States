import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Importing from Expo's built-in library
import { Ionicons } from '@expo/vector-icons';

// Define the valid icon names from Ionicons for type safety
type IonIconName = keyof typeof Ionicons.glyphMap;

interface SettingsItemProps {
  icon: IonIconName;
  label: string;
  onPress?: () => void;
  destructive?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  label, 
  onPress, 
  destructive = false 
}) => (
  <TouchableOpacity 
    style={styles.itemContainer} 
    onPress={onPress}
    activeOpacity={0.6}
  >
    <View style={styles.itemLeft}>
      <Ionicons 
        name={icon} 
        size={24} 
        color={destructive ? '#E53E3E' : '#1A1D1E'} 
      />
      <Text style={[styles.itemLabel, destructive && styles.destructiveText]}>
        {label}
      </Text>
    </View>
    {!destructive && (
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    )}
  </TouchableOpacity>
);

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Area */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: 'https://github.com/adrianhajdin.png' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Adrian Hajdin</Text>
        </View>

        {/* Top Section */}
        <View style={styles.section}>
          <SettingsItem icon="calendar-outline" label="My Booking" />
          <SettingsItem icon="wallet-outline" label="Payments" />
        </View>

        <View style={styles.divider} />

        {/* Main Settings Section */}
        <View style={styles.section}>
          <SettingsItem icon="person-outline" label="Profile" />
          <SettingsItem icon="notifications-outline" label="Notification" />
          <SettingsItem icon="shield-checkmark-outline" label="Security" />
          <SettingsItem icon="language-outline" label="Language" />
          <SettingsItem icon="help-circle-outline" label="Help Center" />
          <SettingsItem icon="people-outline" label="Invite Friends" />
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <SettingsItem 
            icon="log-out-outline" 
            label="Logout" 
            destructive 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1D1E',
  },
  profileCard: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FF8C00',
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1D1E',
    marginTop: 16,
  },
  section: {
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A1D1E',
    marginLeft: 16,
  },
  destructiveText: {
    color: '#E53E3E',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginVertical: 10,
  },
});

export default ProfileScreen;