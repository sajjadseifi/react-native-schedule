import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import Input from "./Input";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Color from "../../../Constants/Color";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const InputIcon = ({
  iconName = "defalut",
  iconColor = Color.cornflowerblue,
  iconSize = 22,
  secureTextEntry = false,
  ...props
}) => {
  const [sizeIcon, setSizeIcon] = useState(18);
  const [spaceWidthInput, setSpaceWidthInput] = useState(15);
  const [stylesInputIcon, seStylesInputIcon] = useState(styles.InputIcon);
  const [eye, setEye] = useState({
    status: secureTextEntry,
    name: "eye-off",
    color: Color.gray,
    size: 21,
  });
  let Cmp = (
    <FontAwesome
      name={iconName}
      size={sizeIcon}
      color={iconColor}
      style={{ ...styles.icon, marginLeft: spaceWidthInput }}
    />
  );
  if (props.isPull) {
    Cmp = (
      <ActivityIndicator
        size={"small"}
        color={Color.cornflowerblue}
      ></ActivityIndicator>
    );
  }
  const onFocusedHandler = () => {
    setSizeIcon(iconSize);
    setSpaceWidthInput(8);
    seStylesInputIcon((prev) => {
      return { ...prev, borderColor: "#transparent" };
    });
  };

  const onBlureHandler = () => {
    setSizeIcon(18);
    setSpaceWidthInput(15);
    seStylesInputIcon((prev) => {
      return { ...prev, borderColor: "transparent" };
    });
  };
  const reversSecure = () => {
    setEye((prev) => {
      const name = prev.status ? "eye" : "eye-off";
      return { ...prev, name: name, status: !eye.status };
    });
  };
  return (
    <View style={stylesInputIcon}>
      {secureTextEntry && (
        <TouchableWithoutFeedback onPress={reversSecure}>
          <Ionicons style={styles.eye} {...eye} />
        </TouchableWithoutFeedback>
      )}
      <Input
        {...props}
        secureTextEntry={eye.status}
        onFocus={onFocusedHandler}
        onBlur={onBlureHandler}
      />
      <View style={styles.side}>{Cmp}</View>
    </View>
  );
};

export default InputIcon;

const styles = StyleSheet.create({
  InputIcon: {
    width: 290,
    borderRadius: 100,
    borderColor: "transparent",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ececec",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 15,
    marginRight: 15,
    width: 20,
  },
  eye: {
    marginHorizontal: 10,
  },
});
