import React from "react";
import { StyleSheet, Text } from "react-native";
import Color from "../../../Constants/Color";

const ErrorText = ({ errorMessage, errorColor=Color.error }) => (
  <Text numberOfLines={1}
   style={{
       ...styles.errorText,
       color:errorColor?errorColor:Color.error
   }}>
    {errorMessage}
  </Text>
);

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    justifyContent: "center",
    color: Color.error,
    fontSize: 14,
    letterSpacing: 1,
    height: 20,
    fontWeight: "bold",
  },
});
