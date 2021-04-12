import React from "react";
import { Platform} from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Color from "../Constants/Color";
import AllSchedulesScreen from "../Screens/Schedule/AllSchedulesScreen";
import UpdateScheduleScreen from "../Screens/Schedule/UpdateScheduleScreen";
import AuthScreen from "../Screens/User/AuthScreen";
import ViewScheduleScreen from "../Screens/Schedule/ViewScheduleScreen";
import StartupScreen from "../Screens/StartupScreen";
import AuthLogout from "../Screens/User/AuthLogout";
import {  MaterialIcons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Color.primary : "",
  },
  headerTitleStyle: {
    // fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    // fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Color.primary,
};

const SechuduleNavigatior = createStackNavigator(
  {
    AllSechudule: AllSchedulesScreen,
    ViewSechudule: {
      screen:ViewScheduleScreen,
      navigationOptions:{
        headerBackImage: (tintColor) => {
          return (
            <MaterialIcons name="arrow-left" size={35} color={"#e70878"} />
          );
        },
      }
    },
    UpdateSechudule: UpdateScheduleScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavOptions,
      headerBackImage: (tintColor) => {
        return (
          <MaterialIcons name="arrow-left" size={35} color={Color.white} />
        );
      },
    },
  }
);
const AuthNavigator = createStackNavigator(
  {
    AuthScreen: AuthScreen,
    AuthLogout: AuthLogout,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    // defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Sechudle: SechuduleNavigatior,
});
export default createAppContainer(MainNavigator);
