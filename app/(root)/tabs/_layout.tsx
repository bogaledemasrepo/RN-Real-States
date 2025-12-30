import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{headerShown:false}}>
    <Tabs.Screen name="index" options={{title:"Home",tabBarLabel:"Home",tabBarIcon:({color,focused,size})=><FontAwesome5 name="home" size={size} color={color} />}} />
    <Tabs.Screen name="explore" options={{title:"Explore",tabBarLabel:"Explore",tabBarIcon:({color,focused,size})=><MaterialIcons name="explore" size={size} color={color} />}} />
    <Tabs.Screen name="profile" options={{title:"Profile",tabBarLabel:"Profile",tabBarIcon:({color,focused,size})=><FontAwesome5 name="user" color={color} size={size}/>}}/>
    </Tabs>
  )
}

export default TabsLayout
