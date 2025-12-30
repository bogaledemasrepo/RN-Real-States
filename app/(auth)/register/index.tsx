import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

import { CustomButton } from "@/components/custom-button";
import { CustomInput } from "@/components/custom-input";
import { useAuth } from "@/context/auth-context";

const API_URL = "";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name too short!").required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const SignUp = () => {
  const { handleSetUser, handleTost } = useAuth();

  const handleRegister = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      await AsyncStorage.setItem("authToken", data.token || "");
      handleSetUser({ ...data.user, token: data.token });
      router.replace("/(root)/tabs");
    } catch (err: any) {
      handleTost(err.message, "error", 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e9ecf4" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#3183ff"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Smart Chat App</Text>
          <View style={{ width: 28 }} />
        </View>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            acceptTerms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}
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
              <Text style={styles.cardTitle}>Create New Account</Text>

              <View style={styles.inputGap}>
                <CustomInput
                  icon="account"
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                />

                <CustomInput
                  icon="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
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

                {/* Terms Checkbox */}
                <View style={{ marginBottom: 10 }}>
                  <View style={styles.rowCenter}>
                    <Checkbox
                      style={styles.checkbox}
                      value={values.acceptTerms}
                      onValueChange={(val) => setFieldValue("acceptTerms", val)}
                      color={values.acceptTerms ? "#3183ff" : undefined}
                    />
                    <Text style={styles.mutedText}>
                      Accept Terms and Policies.
                    </Text>
                  </View>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <Text style={styles.errorText}>{errors.acceptTerms}</Text>
                  )}
                </View>
              </View>

              <CustomButton
                title="Register"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                style={{ marginBottom: 20 }}
              />

              <SocialLoginSection />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Local Sub-component
const SocialLoginSection = () => (
  <View>
    <Text style={styles.orText}>Or Sign In With</Text>
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

export default SignUp;

const styles = StyleSheet.create({
  container: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#3183ff" },
  card: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 20,
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8a8a8a",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGap: {
    gap: 4,
    marginBottom: 10,
  },
  errorText: {
    color: "#ff6060",
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  mutedText: {
    fontSize: 14,
    color: "#8a8a8a",
  },
  checkbox: {
    marginRight: 8,
    width: 18,
    height: 18,
  },
  orText: {
    textAlign: "center",
    color: "#8a8a8a",
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialBtn: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: "#f0f6ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d0e3ff",
  },
});
