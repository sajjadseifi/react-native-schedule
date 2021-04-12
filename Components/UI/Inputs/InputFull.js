import React from "react";
import { StyleSheet, View } from "react-native";
import ErrorText from "../Errors/ErrorText";
import InputIcon from "./InputIcon";

const InputFull = ({ isShowError,error,inputFullStyle, ...props }) => {
  const mergedStyle = {
    ...styles.InputFull,
    ...inputFullStyle,
  };

  return (
    <View style={mergedStyle}>
      <InputIcon {...props} />
      <View style={styles.errorContent}>
        {<ErrorText errorMessage={isShowError && error} />}
      </View>
    </View>
  );
};

export default InputFull;

const styles = StyleSheet.create({
  InputFull: {},
  errorContent: {
    marginTop: 3,
    flexDirection:"row-reverse"
  },
});
