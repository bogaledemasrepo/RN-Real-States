import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const CustomButton = ({ title, onPress, isLoading, disabled, style }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.button, 
        (disabled || isLoading) && styles.disabled, 
        style
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: "#3183ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});