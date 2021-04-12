import React, { useEffect, useState } from "react";
import { StyleSheet} from "react-native";
import NavigationContainer from "./Navigations/NavigationContainer";
import * as imgLaoder from "./load/image";
import Store from "./store/store";
import Toast from "react-native-toast-message";
import AppLoading from "expo-app-loading";
import * as fontLoader from "./load/font";


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    imgLaoder.load();
  }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fontLoader.fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err)=>{console.error(err)}}
      />
    );
  }
  return (
    <Store>
      <NavigationContainer />
      <Toast style={styles.toast} ref={(ref) => Toast.setRef(ref)} />
    </Store>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  font:{
    // fontFamily:"open-sans",
    fontSize:25,
  }
});
