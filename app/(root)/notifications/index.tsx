import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NotificationScreen = () => {
    return (<SafeAreaView style={{flex:1}}>
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"#696969",fontWeight:"bold",fontSize:16}}>Notification not found!</Text>
        </View>
    </SafeAreaView>
    )
}

export default NotificationScreen