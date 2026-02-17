import { useAuth } from "@/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
const API_URL = "";
export default function AuthLayout() {
  const { handleSetUser } = useAuth();
  const { user } = useAuth();

  useEffect(() => {
    async function autoLogin() {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        fetch(`${API_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to auto login!");
            return res.json();
          })
          .then((data) => {
            handleSetUser({ ...data, token: token });
          })
          .catch((err) => console.log(err));
      }
    }
    autoLogin();
  });
  useEffect(() => {
    if (user) return router.navigate("/(root)/tabs");
  }, [user]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register/index" />
    </Stack>
  );
}
