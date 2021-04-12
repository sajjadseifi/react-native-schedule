import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import  * as images from "../../../load/image";
const ShadowCard = ({ hideColor = null, ...props }) => {
  const mergedStyle = {
    ...styles.Card,
    ...props.style,
  };
  return (
    <View {...props} style={mergedStyle}>
      {hideColor ? (
        <>
          <View style={styles.dummyBox}>
            <ImageBackground style={styles.insideCorner} source={images.cornerInside}/>
          </View>
          <View>{props.children}</View>
        </>
      ) : (
        <>{props.children}</>
      )}
    </View>
  );
};

export default ShadowCard;

const styles = StyleSheet.create({
  Card: {
    //-------shadow-----------
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    //------------------
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  dummyBox: {
    width: 70,
    height: 70,
    position: "absolute",
    top: -69,
    right: 0,
  },
  insideCorner:{
    width:"100%",
    height:"100%",
  },
  bigDummyBox: {
    width: "100%",
    height: "100%",
    borderBottomEndRadius: 1000,
    backgroundColor: "red",
  },
});
