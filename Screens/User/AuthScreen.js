import React, { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import AuthForms from "../../Components/Form/Authenticate/AuthForms";
import { styles } from "../../Styles/AuthStyles";

const AuthScreen = (props) => {
  let notif = useSelector((state) => state.auth.message);
  let isSuccessReq = useSelector((state) => state.auth.success);

  useEffect(() => {
    if (notif) {
      Toast.show({
        type: isSuccessReq ? "success" : "error", // | info",
        position: "top",
        text1: isSuccessReq ? "موفق" : "خظا",
        text2: notif,
        visibilityTime: 5000,
        autoHide: true,
        topOffset: 60,
        bottomOffset: 40,
      });
    }
    return () => {
      notif = null;
      isSuccessReq = null;
    };
  }, [notif, isSuccessReq]);
  //sign-up.pnga
  return (
    <View style={styles.container}>
      <AuthForms navigation={props.navigation} />
      <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

export default AuthScreen;
