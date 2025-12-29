import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const PropertyDetail = () => {
    const {id}=useLocalSearchParams();
    console.log("Page ",id)
  return (
    <View>
      <Text>PropertyDetail</Text>
    </View>
  )
}

export default PropertyDetail