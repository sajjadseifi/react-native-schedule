import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ShadowCard from "../../Components/UI/Cards/ShadowCard";
import Color from "../../Constants/Color";
import BorderInput from "../../Components/UI/Inputs/BorderInput/BorderInput";
import FormButtonLoader from "../../Components/UI/Buttons/FormButtonLoader";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SpaceText from "../../Components/UI/Text/SpaceText";
import FlexRow from "../../Components/UI/Flex/FlexRow";
import * as dateActions from "../../utils/date";
import * as scheduleActions from "../../store/actions/schedule.action";
import { useDispatch, useSelector } from "react-redux";
import SwitchReversEE from "../../Components/UI/Switch/SwitchReverceEE";
import Toast from "react-native-toast-message";
import { fontFamily } from "../../load/font";
const createPic = require("../../assets/images/hourse.png");
const editPic = require("../../assets/images/update-schedule.png");

const UpdateScheduleScreen = (props) => {
  const sechudleId = props.navigation.getParam("id");
  let singleSchedule = useSelector((state) => state.schedules.single);
  let isUdapdate = sechudleId !== null && sechudleId !== undefined;
  let baseColor = isUdapdate ? Color.greenBlue : Color.cornflowerblue;
  let imgPage = isUdapdate ? editPic : createPic;
  //model states
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [describle, setDescrible] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [calendar, setCalendar] = useState("تاریخ");
  const [time, setTime] = useState("زمان");
  //open modals states
  const [openClenderPicker, setOpenClenderPicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  //fetched States
  let isLoad = useSelector(state => state.schedules.loadingEdit);
  let isSuccessReq = useSelector(state => state.schedules.succssEdit);
  let notif = useSelector(state => state.schedules.message);

  //
  const dispatch = useDispatch();

  //-----------effects----------------------------
  useEffect(() => {
    if (singleSchedule) {
      const outDate = new Date(singleSchedule.outDate);
      setTitle(singleSchedule.title);
      setIsDone(singleSchedule.isDone);
      setDescrible(singleSchedule.description);
      setDate(outDate);
      setCalendar(dateActions.getStringDate(outDate));
      setTime(dateActions.getStringTime(outDate));
    }
    return () => {
      singleSchedule = null;
    };
  }, [singleSchedule]);

  useEffect(() => {
    if (isUdapdate)
      dispatch(scheduleActions.loadSingleSchedule(sechudleId));

    return () => {
      dispatch(scheduleActions.emptySingleSchedule());
    };
  }, [dispatch]);
  useEffect(() => {

    if (notif == "" || notif === undefined || notif === null) {
      return;
    }

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

    dispatch(scheduleActions.clearMessages());
    return () => {
      dispatch(scheduleActions.clearMessages());
    };
  }, [isSuccessReq, notif]);
  //--------handlers----------------------
  const hidecalendarPicker = () => (openClenderPicker) ? setOpenClenderPicker(false) : setOpenTimePicker(false);

  const handlecalendarConfirm = (d) => {
    hidecalendarPicker();
    const newDt = new Date(date);
    if (openClenderPicker) {
      newDt.setUTCFullYear(d.getUTCFullYear());
      newDt.setUTCMonth(d.getUTCMonth());
      newDt.setUTCDate(d.getUTCDate());

      const dateCal = dateActions.getStringDate(newDt);
      setCalendar(dateCal);
    } else {
      newDt.setUTCHours(d.getUTCHours());
      newDt.setUTCMinutes(d.getUTCMinutes());
      newDt.setUTCSeconds(d.getSeconds());
      const dateTim = dateActions.getStringTime(newDt);

      setTime(dateTim);
    }
    setDate(newDt);
  };
  const calendarOpenHandelr = () => setOpenClenderPicker(true);
  const timerOpenHandelr = () => setOpenTimePicker(true);

  const reequestSender = () => {
    let action;
    if (isUdapdate)
      action = scheduleActions.updateSechudle(sechudleId, title, describle, date, isDone);
    else
      action = scheduleActions.addSechule(title, describle, date);

    dispatch(action);
  };

  const toggleHandler = () => setIsDone(!isDone);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ ...styles.container, backgroundColor: baseColor }}>
      <ScrollView>
        <View style={styles.base}>
          <View
            style={styles.container}>
            <View style={styles.imgContainer}>
              <ImageBackground
                style={{ width: 180, height: 180 }}
                source={imgPage}
              />
            </View>
            <ShadowCard style={styles.card}>
              <BorderInput
                color={baseColor}
                iconName={"pencil"}
                value={title}
                onChange={(text) => setTitle(text)}
                placeholder={"عنوان"}
              />
              <BorderInput
                color={baseColor}
                iconName={"file-text-o"}
                value={describle}
                onChange={(text) => setDescrible(text)}
                placeholder={"وظیفه..."}
                textarea={5}
              />
              <BorderInput
                color={baseColor}
                iconName={"calendar-times-o"}
                onPress={calendarOpenHandelr}
                value={calendar}
                placeholder={"تاریخ"}
                isArrow
                disabled
              />

              <BorderInput
                color={baseColor}
                iconName={"clock-o"}
                onPress={timerOpenHandelr}
                value={time}
                placeholder={"زمان"}
                isArrow
                disabled
              />
              {isUdapdate && (
                <FlexRow style={styles.isDoneUpdate}>
                  <SwitchReversEE
                    onSwitchHandler={toggleHandler}
                    enabled={isDone}
                  />
                  <SpaceText space={3} />
                  <Text
                    style={{
                      ...styles.isDoneUpdateTtile,
                      color: isDone ? Color.greenBlue : Color.gray,
                    }}
                  >
                    Is Dont
                </Text>
                </FlexRow>
              )}

              <FormButtonLoader
                color={baseColor}
                title={isUdapdate ? "بروزرسانی" : "ایجاد"}
                onPress={reequestSender}
                isLoad={isLoad}
                textStyle={styles.submitedButton}
                
              />

            </ShadowCard>

            {(openTimePicker || openClenderPicker) && (
              <DateTimePickerModal
                isVisible={openTimePicker || openClenderPicker}
                mode={openTimePicker ? "time" : "date"}
                onConfirm={handlecalendarConfirm}
                onCancel={hidecalendarPicker}
                date={date}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
UpdateScheduleScreen.navigationOptions = (navData) => {
  const id = navData.navigation.getParam("id");
  const bgColor = id ? Color.greenBlue : Color.cornflowerblue;
  title = id ? "ویرایش برنامه" : "ایجاد برنامه جدید";

  return {
    title,
    headerStyle: {
      backgroundColor: bgColor,
      shadowOpacity: 0,
      elevation: 0,
    },
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: "bold",
    },
  };
};

const styles = StyleSheet.create({
  base: {
    position: "relative",

  },
  submitedButton:{
    fontFamily:fontFamily.roya,
    fontSize:32,
  },
  container: {
    // backgroundColor: "#fff",
    paddingHorizontal: 10,
    flex: 1,
    // backgroundColor:Color.cornflowerblue
  },
  imgContainer: {
    alignItems: "center",
  },
  card: {
    paddingHorizontal: 25,
    marginVertical: 10

  },
  buttonText: {},
  formBox: {
    width: 340,
  },
  posrelContainer: {
    position: "relative",
  },
  titleFormContainer: {
    marginBottom: 20,
  },
  titleForm: {
    fontSize: 30,
    fontWeight: "bold",
  },
  isDoneUpdate: {
    alignItems: "center",
    marginVertical: 10,
  },
  isDoneUpdateTtile: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.cornflowerblue,
  },
});

export default UpdateScheduleScreen;
