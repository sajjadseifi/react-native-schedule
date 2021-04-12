import React, { useEffect, useRef } from "react";
import Toast from "react-native-toast-message";
import { NavigationActions } from "react-navigation";
import { useDispatch, useSelector } from "react-redux";
import SechudelNavigation from "./SechudelNavigation";
import * as authActions from "../store/actions/auth";
const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  const isStartUp = useSelector((state) => state.auth.isStartUp);
  
  let isSuccessReq = useSelector((state) => state.auth.success);
  let notif = useSelector((state) => state.auth.message);
  let notifTitle = useSelector((state) => state.auth.messageTitle);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notif == "" || notif === undefined || notif === null) {
      return;
    }

    Toast.show({
      type: isSuccessReq ? "success" : "error", // | info",
      position: "top",
      text1: notifTitle ? notifTitle : isSuccessReq ? "موفق" : "خظا",
      text2: notif,
      visibilityTime: 5000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
    });
    dispatch(authActions.emptyMessage());
    return () => {
      dispatch(authActions.emptyMessage());
      notif = null;
    };
  }, [isSuccessReq, notif, dispatch]);
  useEffect(() => {
    if (isStartUp) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Startup" })
      );
    } else if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "AuthScreen" })
      );
    }
  }, [isAuth, isStartUp]);

  return (
    <>
      <SechudelNavigation ref={navRef} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default NavigationContainer;
