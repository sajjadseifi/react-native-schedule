import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fontFamily } from "../../../load/font";

const TitleSchedule = ({ title,style }) => {
  const mergedStyle = {
    ...styles.title,
    ...style
  };
  return (
    <View style={styles.titleContainer}>
      <Text style={mergedStyle}>{title}</Text>
    </View>
  );
};

export default TitleSchedule;

const styles = StyleSheet.create({
  titleContainer: {
  },
  title:{
    fontFamily:fontFamily.mj
  },
});
