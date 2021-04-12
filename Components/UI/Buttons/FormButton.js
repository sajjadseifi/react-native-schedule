import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../../Constants/Color";

const FormButton = ({
  style,
  title,
  textStyle,
  children,
  onPress,
  ...props
}) => {
  const mergedStyle = {
    ...styles.FormButton,
    ...style,
  };
  const mergedTextStyle = {
    ...styles.text,
    ...textStyle,
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props} style={mergedStyle}>
        <Text style={mergedTextStyle}>{title || children}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default FormButton;

const styles = StyleSheet.create({
  FormButton: {
    backgroundColor: Color.darkslateblue,
    height:44,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius:8
  },
  text: {
    color: Color.white,
    fontSize:20,
    fontWeight:"bold"
  },
});
