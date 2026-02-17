import { useAuth } from "@/context/auth-context";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";

const RootLayout = () => {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user) return router.navigate("/(root)/tabs");
  }, [user, router]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tabs" />
      <Stack.Screen name="properties/[id]" />
    </Stack>
  );
};

export default RootLayout;
