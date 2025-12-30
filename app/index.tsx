import { CustomButton } from "@/components/custom-button";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const getStarted = () => {
    router.navigate("/(auth)/login");
    console.log("Pressed");
  };
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        style={styles.image}
        source={require("../assets/images/onboarding.png")}
        contentFit="contain"
        transition={1000}
      />
      <View style={{ width: "100%", paddingHorizontal: 16 }}>
        <Text style={styles.textSize2}>Welcome to RN-Real-States</Text>
        <Text style={styles.textSize1}>Let&apos;s Get You Closer to</Text>
        <Text style={styles.textSize1}>Your Ideal Home</Text>
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
    lineHeight:24,
    color: "#666666ff",
    textAlign: "center",
  },
});
