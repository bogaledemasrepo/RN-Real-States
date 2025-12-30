import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

import { CustomButton } from "@/components/custom-button";
import { CustomInput } from "@/components/custom-input";
import { useAuth } from "@/context/auth-context";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

const SignIn = () => {
  const { user, handleTost, handleSetUser } = useAuth();

  useEffect(() => {
    if (user) router.replace("/(auth)/login");
  }, [user]);

  const handleLogin = async (values: any, { setSubmitting }: any) => {
    try {
      // Mocking the API call logic
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      handleSetUser({ ...data.user, token: data.token });
    } catch (err: any) {
      handleTost(err.message, "error", 3000);
    } finally {
      setSubmitting(false);
    }
  };

const navigateToHome = ()=>{
  router.navigate("/(root)/tabs")
}

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.subTitle}>Welcome to</Text>
              <Text style={styles.subTitle}>Smart Chat App Login now</Text>
            </View>

            <CustomInput
              icon="email"
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
            />

            <CustomInput
              icon="lock"
              placeholder="Password"
              isPassword
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={errors.password}
              touched={touched.password}
            />

            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <Checkbox
                  style={styles.checkbox}
                  value={values.rememberMe}
                  onValueChange={(val) => setFieldValue("rememberMe", val)}
                  color={values.rememberMe ? "#3183ff" : undefined}
                />
                <Text style={styles.mutedText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.mutedText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              title="Login"
              onPress={()=>{
                navigateToHome()
              //  handleSubmit
              }}
              isLoading={isSubmitting}
            />

            <Link href="/(auth)/register" asChild>
              <TouchableOpacity style={styles.marginVertical12}>
                <Text style={styles.centerMutedText}>
                  Don&apos;t have an account? Register
                </Text>
              </TouchableOpacity>
            </Link>

            <SocialLoginSection />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const SocialLoginSection = () => (
  <View style={{ alignItems: "center" }}>
    <Text style={[styles.centerMutedText, { marginBottom: 12 }]}>
      Or Sign In With
    </Text>
    <View style={styles.socialRow}>
      {["facebook", "google", "apple"].map((icon) => (
        <TouchableOpacity key={icon} style={styles.socialBtn}>
          <MaterialCommunityIcons
            name={icon as any}
            size={20}
            color="#3183ff"
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf4",
    padding: 16,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 20,
    elevation: 2,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8a8a8a",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  mutedText: { fontSize: 14, color: "#8a8a8a" },
  centerMutedText: { textAlign: "center", color: "#8a8a8a" },
  checkbox: { marginRight: 8, width: 18, height: 18 },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 20 },
  socialBtn: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#f0f6ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d0e3ff",
  },
  marginVertical12: { marginVertical: 12 },
});
