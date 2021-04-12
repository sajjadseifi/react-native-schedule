import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import {  TouchableOpacity } from "react-native-gesture-handler";

export const IconHandler = ({ style,size=20,color="black",name, handler }) => {
  const mergerdStyle = {
    ...styles.iconHandler,
    style,
  };
  
  return (
    <View style={mergerdStyle}>
      <TouchableOpacity onPressOut={handler}>
        <FontAwesome size={size} color={color} name={name} />
      </TouchableOpacity>
    </View>
  );
};

export default IconHandler;

const styles = StyleSheet.create({
  iconHandler: {},
});

