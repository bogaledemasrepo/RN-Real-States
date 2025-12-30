import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Index = () => {
  const {bottom,top}=useSafeAreaInsets();
  return (
    <View style={{paddingTop:top,paddingBottom:bottom}}>
      <Text>Index</Text>
    </View>
  )
}

export default Index