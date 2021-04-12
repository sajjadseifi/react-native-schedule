import { FontAwesome} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, StyleSheet, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../../Components/CustomHeaderButton/CustomHeaderButton";
import Schedule from "../../Components/Schedule/Schedule";
import ShadowCard from "../../Components/UI/Cards/ShadowCard";
import ErrorText from "../../Components/UI/Errors/ErrorText";
import FlexCenterCenter from "../../Components/UI/Flex/FlexCenterCenter";
import Color from "../../Constants/Color";
import IconName from "../../Constants/IconName";
import * as actionsType from "../../store/actions/actionsType";
import * as sechdleActions from "../../store/actions/schedule.action";
import AlertPro from "react-native-alert-pro";
import * as images from "../../load/image";

const renderItem = (item, onAction) => {
  return <Schedule onAction={onAction} model={item} />;
};
const AllSchedulesScreen = (props) => {
  let scheudlesDto = useSelector((state) => state.schedules.schedules);
  let isFetched = useSelector(state => state.schedules.loading);
  let errorMessage = useSelector(state => state.schedules.message);
  let alertPro = null;
  const [selectId, setSelectId] = useState(null);
  const [selectTitle, setSelectTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sechdleActions.loadAllSchedules());
  }, [dispatch]);

  const navigationAddPageHandler = () => {
    props.navigation.navigate("UpdateSechudule");
  };

  const onActionChangedHandler = (id, action) => {
    switch (action) {
      case actionsType.UPDATE_SECHUDLE:
        props.navigation.navigate("UpdateSechudule", { id });
        break;
      case actionsType.DELETE_SECHUDLE:
        const index = [...scheudlesDto].findIndex(x => x.id === id);
        if (index != -1)
          setSelectTitle(scheudlesDto[index].title);

        setSelectId(id);
        alertPro.open();
        break;
      case actionsType.VIEW_SECHUDLE:
        props.navigation.navigate("ViewSechudule", { onAction: onActionChangedHandler, id });
        break;
    }
  };

  const deleteSchedule = () => {
    const action = sechdleActions.deleteSechudle(selectId);

    dispatch(action);
    closeHandler();
  };
  const closeHandler = () => {
    alertPro.close();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgBase}
        source={images.allView}
      />

      {scheudlesDto.length != 0 ? (
        <FlatList
          style={{
            padding: 10,
          }}
          data={scheudlesDto}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) =>
            renderItem(itemData.item, onActionChangedHandler)
          }
        />
      ) : <FlexCenterCenter style={{ flex: 1 }}>
          {isFetched ? (
            <ActivityIndicator size={"large"} color={Color.primary} />
          ) : (
              <ErrorText errorMessage={errorMessage} />
            )}
        </FlexCenterCenter>
      }

      <View style={styles.addSechuleButtonBox}>
        <TouchableOpacity
          onPress={navigationAddPageHandler}
          activeOpacity={0.8}
        >

          <ShadowCard style={styles.addSechuleButton}>
            <FontAwesome name="plus" size={30} color={Color.bluePrimary} />
          </ShadowCard>
        </TouchableOpacity>
      </View>
      <AlertPro
        ref={ref => { alertPro = ref; }}
        onConfirm={deleteSchedule}
        onCancel={closeHandler}
        title="حدف برنامه روزانه"
        message={`ایا میخواهید برنامه روزانه ${selectTitle} را پاک کنید؟`}
        textCancel="خیر"
        textConfirm="بله"
        customStyles={{ ...costumStyle, }}
      />
    </View>
  );
};

AllSchedulesScreen.navigationOptions = (navData) => {
  const logout = () => navData.navigation.navigate("AuthLogout");
  return {
    title: "برنامه های روزنانه",
    headerStyle: {
      backgroundColor: Color.crimsonSame,
      shadowOpacity: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: "bold",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="LogOut"
          iconName={Platform.OS === 'android' ? IconName.ioIcons.logOut : 'log-out'}
          onPress={() => {
            Alert.alert(
              "خارج شدن از حساب",
              "ایا مایل به خارج شدن از حساب کاربری خود هستید؟",
              [
                { text: "بله", style: "destructive", onPress: logout },
                { text: "خیر", style: "cancel" }
              ]
            )
          }}
        />
      </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  bgBase: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,

  },
  container: {
    flex: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: "red",
  },
  addSechuleButtonBox: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addSechuleButton: {
    borderRadius: 100,
    margin: 10,
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",

  },
});
const costumStyle = {
  mask: {
    backgroundColor: "#00000077",
  },
  container: {
    // borderWidth: 2,
    // borderColor: "#9900cc",
    shadowColor: "#9900cc",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonCancel: {
    backgroundColor: Color.forestgreen,
  },
  buttonConfirm: {
    backgroundColor: Color.crimson,
  },
  textCancel: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textConfirm: {
    fontWeight: "bold",
    fontSize: 20,
  }
};

export default AllSchedulesScreen;
