import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import FormButtonText from "./FromButtonText";

const FormButtonLoader = ({ isLoad, onPress, title, color, textStyle }) => {
  return (
    <View style={styles.formButtonLoader}>
      {isLoad ? (
        <ActivityIndicator size={23} color={color}></ActivityIndicator>
      ) : (
        <FormButtonText
          title={title}
          onPress={onPress}
          color={color}
          textStyle={textStyle}
        />
      )}
    </View>
  );
};

export default FormButtonLoader;

const styles = StyleSheet.create({
  formButtonLoader: {
    height: 36,
    justifyContent: "center",
  },
});
