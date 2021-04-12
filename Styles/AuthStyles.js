import { StyleSheet } from "react-native";
import Color from "../Constants/Color";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Color.white,
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    imgBg: {
      width: "100%",
      height: 300,
    },
    card: {
      width: "100%",
      position:"absolute",
      bottom:0,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 35,
      paddingVertical: 25,
      paddingHorizontal: 20,
      paddingHorizontal:40,
      borderRadius:0,
      borderTopStartRadius:80,
    },
    inputContainer: {
      marginBottom: 3,
    },
    buttonContainer: {
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    switchButton:{
      fontSize:18,
      fontWeight:"bold",
    },
    requsetButton: {
      color: Color.crimson,
    },
    switchTextContainer: {
      marginTop: 20,
      width: "100%",
      flexDirection: "row",
    },
    switchText: {
      fontSize: 40,
      color: "green",
      alignItems: "flex-start",
    },
    formButtonContainer: {
      alignItems: "flex-end",

    },
    forgetPassword: {
      justifyContent: "flex-start",
      marginBottom: 20,
    },
    forgetPasswordText: {
      fontSize: 14,
    },
    switchToLogin: {
      color: Color.crimson,
      fontSize: 14,
    },
    switchToSignUp: {
      color: Color.forestgreen,
      fontSize: 14,
    },
    toast: {
      zIndex: 5000,
    },
  });
  