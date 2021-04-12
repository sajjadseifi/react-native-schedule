import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
} from "react-native-gesture-handler";
import { fontFamily } from "../../../load/font";

const FormButtonText = ({
  style,
  title,
  textStyle,
  children,
  onPress,
  color,
  disabled,
  ...props
}) => {
  const mergedStyle = {
    ...styles.FormButton,
    ...style,
  };
  let mergedTextStyle = {
    ...styles.text,
    ...textStyle,
  };
  if(color){
    mergedTextStyle={
      ...mergedTextStyle,
      color,
    }
  }
  return (
    <View {...props} style={mergedStyle}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Text style={mergedTextStyle}>{children || title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormButtonText;

const styles = StyleSheet.create({
  FormButton: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "black",
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: fontFamily.mj,
  },
});
