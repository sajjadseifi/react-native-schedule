import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Color from "../../../Constants/Color";
import { fontFamily } from "../../../load/font";
import { validation } from "../../../utils/validaiton";

const Input = ({ tag, style, onInputChangeText, ...props }) => {
  const inputTextChanged = (text) => {
    const isValid = validation(props.validate, text);
    onInputChangeText(tag, text, isValid, null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        onChangeText={inputTextChanged}
        style={{ ...styles.textInput, ...style }}
        placeholderTextColor={Color.darkslateblueopactity}
      />
    </View>
  );
};
export default Input;
const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: "center",
    flex: 1,
  },
  textInput: {
    fontSize: 17,
    color: Color.darkslateblue,
    textAlign:"right",
    fontFamily:fontFamily.roya,
  },
});
