import { CustomButton } from "@/components/custom-button";
import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const getStarted = () => {
    router.navigate("/(auth)/login");
    console.log("Pressed");
  };
  async function authLogin() {
    const token = await AsyncStorage.getItem("access-token");
    fetch(`${BASE_URL}/users/me`,{
      headers:{
        "Authorization":"Bearer "+token
      }
    }).then(res => {
      if (!res.ok) throw Error("Invalid token!");
      return res.json()
    }).then(data => {
      console.log(data)
    }).catch(err=>{
      console.error("ERROR",err)
    })
  }
  useEffect(() => {
    authLogin();
  }, [])
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        style={styles.image}
        source={require("../assets/images/onboarding.png")}
        contentFit="fill"
        transition={1000}
      />
      <View style={{ width: "100%", paddingHorizontal: 16 }}>
        <Text style={styles.textSize2}>Welcome to RN-Real-States</Text>
        <Text style={styles.textSize1}>Let&apos;s Get You Closer to</Text>
        <Text style={[styles.textSize1, { color: "#3183ff" }]}>
          Your Ideal Home
        </Text>
        <CustomButton title="Get Started" onPress={getStarted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "66%",
  },
  textSize2: {
    fontSize: 14,
    fontFamily: "Rubik-Normal",
    color: "#999",
    textTransform: "uppercase",
    textAlign: "center",
  },
  textSize1: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    color: "#666666ff",
    textAlign: "center",
  },
});
