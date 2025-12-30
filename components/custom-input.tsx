import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
}

export const CustomInput = ({
  icon,
  error,
  touched,
  isPassword,
  ...props
}: CustomInputProps) => {
  const [visible, setVisible] = useState(!isPassword);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, touched && error && styles.inputError]}>
        <MaterialCommunityIcons name={icon} size={22} color="#c7c7c7" />
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#c7c7c7"
          secureTextEntry={isPassword && !visible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <MaterialCommunityIcons
              name={visible ? "eye-off" : "eye"}
              size={22}
              color="#c7c7c7"
            />
          </TouchableOpacity>
        )}
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f7f7",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
  },
  inputError: { borderColor: "#ff6060", backgroundColor: "#fff5f5" },
  textInput: { flex: 1, marginLeft: 10, fontSize: 15, color: "#000" },
  errorText: { color: "#ff6060", fontSize: 11, marginTop: 4, marginLeft: 4 },
});
