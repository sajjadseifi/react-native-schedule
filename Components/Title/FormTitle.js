import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../../Constants/Color";

const FormTitle = ({ color, title, children }) => {
  return (
    <View style={styles.FormTitleContainer}>
      <Text
        style={{
          ...styles.FormTitle,
          color: color ? color : styles.FormTitle.color,
        }}
      >
        {children || title}
      </Text>
    </View>
  );
}; 
export default FormTitle;

const styles = StyleSheet.create({
  FormTitleContainer: {
      paddingBottom:30,
  },
  FormTitle: {
    fontSize: 32,
    color:Color.dodgerblue,
    fontWeight:"bold",
    letterSpacing:1
  },
});
