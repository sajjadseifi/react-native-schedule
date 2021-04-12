import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as Progress from "react-native-progress";
import { END_START_UP } from "../store/actions/actionsType";
import * as images from "../load/image";
const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [iseEnd, setIsEnd] = useState(false);
  let start = true;
  const nexLoad = useCallback(() => {
    setProgress((prevState) => {
      if ((iseEnd && prevState < 100) || prevState < 85) {
        setTimeout(() => nexLoad(), 400);
        return prevState + 5;
      }
      return prevState;
    });

    return () => {
      setIsEnd(false);
    };
  }, [iseEnd]);

  const finishedLoad = () => {
    if (progress < 100) setIsEnd(true);
    if (progress >= 85) nexLoad();
  };
  useEffect(() => {
    const tryLogin = async () => {
      start = false;
      try {
        const res = await authActions.storage.load({
          key: "authData",
          autoSync: true,
          syncInBackground: true,
          syncParams: {
            extraFetchOptions: {},
            someFlag: true,
          },
        });

        successResult(res);
      } catch (err) {
        catcResult(err);
      } finally {
        finishedLoad();
      }
    };
    if (start) {
      nexLoad();
      tryLogin();
    }
    return () => {
      start = false;
    };
  }, [dispatch, nexLoad]);
  const successResult = (res) => {
    setTimeout(() => {
      if (res == null || res === undefined)
        return props.navigation.navigate("Auth");

      dispatch({ type: END_START_UP });
      dispatch(authActions.authSuccess(res.tokenId, res.username));
      props.navigation.navigate("Sechudle");
    }, ((100 - progress) / 5) * 400);
  };
  const catcResult = (err) => {
    switch (err.name) {
      case "NotFoundError":
        // console.warn("NotFoundError");
        break;
      case "ExpiredError":
        // console.warn("ExpiredError");
        break;
    }

    setTimeout(() => {
      dispatch({ type: END_START_UP });
      props.navigation.navigate("Auth");
    }, ((100 - progress) / 5) * 400);
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imgBg} source={images.startup} />
      <View style={styles.loadContainer}>
        <View style={styles.progressBox}>
          <Progress.Bar progress={progress / 100} />
        </View>
      </View>
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f8fb",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBox: {
    marginTop: 30,
  },
  imgBg: {
    width: 360,
    height: 360,
  },
});
