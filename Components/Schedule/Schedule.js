import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Color from "../../Constants/Color";
import FormButtonText from "../UI/Buttons/FromButtonText";
import ShadowCard from "../UI/Cards/ShadowCard";
import FlexRow from "../UI/Flex/FlexRow";
import ChangerSchedule from "./Changer/ChangerSchedule";
import DateAndTime from "./DateAndTime/DateAndTime";
import DitaleBoxSechudle from "./DitaleBox/DitaleBoxSechudle";
import IsDonChecked from "./IsDoneChecked";
import TitleSchedule from "./Title/TitleSchedule";
import * as actionTypes from "../../store/actions/actionsType";
import * as scheduleActions from "../../store/actions/schedule.action";
import TouchableDoubleClick from "../UI/Touchable/TouchableDoubleClick";
import * as dateUtils from "../../utils/date";
import SwitchReversEE from "../UI/Switch/SwitchReverceEE";
import { useDispatch } from "react-redux";
import { fontFamily } from "../../load/font";

const Schedule = ({
  onAction = (id, action) => {},
  style,
  model,
  ...props
}) => {
  const dispatch = useDispatch();

  const { id, title, description, outDate } = model;
  const date = new Date(outDate);
  const calendar = dateUtils.getNumericStringDate(date);
  const time = dateUtils.getStringTime(date);
  let isDone = model.isDone;

  const [isLoading, setIsLoading] = useState(false);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  const [isSeeDitale, setIsSeeDit] = useState(false);
  const [isDoneState, setIsDoneState] = useState(isDone);

  let [anotherClickable, setAnotherClickable] = useState(false);
  let mergedStyle = {
    ...styles.schedule,
    ...style,
  };
  let shadowStyle = {
    ...styles.shadowBox,
  };
  if (isDoneState) {
    shadowStyle = {
      ...shadowStyle,
      ...styles.isDone,
    };
  }

  useEffect(() => {
    setIsDoneState(isDone);
  }, [isDone]);

  const seeModreHandler = useCallback(() => {
    setAnotherClickable(true);
    setIsSeeDit(!isSeeDitale);
  });
  const toggleSwitch = useCallback(async () => {
    setAnotherClickable(true);
    const revers = !isDone;
    isDone = !isDone;
    setIsDoneLoading(true);

    await dispatch(scheduleActions.isDoneUpdateSechudle(id, isDone));
    setIsDoneLoading(false);
  }, [dispatch, setAnotherClickable, setIsDoneLoading, setIsDoneState]);

  const onOpenViewHandler = () => {
    if (anotherClickable) setAnotherClickable(false);
    else onAction(id, actionTypes.VIEW_SECHUDLE);
  };

  return (
    <View style={styles.scheduleContainer}>
      <ShadowCard style={shadowStyle}>
        <TouchableDoubleClick onDoubleClick={onOpenViewHandler}>
          <View style={mergedStyle}>
            <View style={styles.topContainer}>
              <TitleSchedule style={styles.titleSchedule} title={title} />
              <ChangerSchedule onPress={onAction} noteId={id} />
            </View>
            <FlexRow style={styles.mainActionContainer}>
              <SwitchReversEE
                onSwitchHandler={toggleSwitch}
                enabled={isDoneState}
              />
              <DateAndTime
                date={calendar}
                dateColor={"#cab300"}
                time={time}
                timeColor={"#2b89e7"}
              />
            </FlexRow>
            {!isLoading && isSeeDitale && (
              <DitaleBoxSechudle
                describtion={description}
                date={calendar}
                time={time}
              />
            )}
          </View>
          <View style={styles.seeDitaleContanier}>
            {isLoading ? (
              <ActivityIndicator
                size={22}
                color={Color.dodgerblue}
              ></ActivityIndicator>
            ) : (
              <FormButtonText
                onPress={seeModreHandler}
                textStyle={styles.seeDitale}
              >
                {!isSeeDitale ? "توضیحات" : "بستن"}
              </FormButtonText>
            )}
          </View>
          <IsDonChecked
            isfetched={isDoneLoading}
            active={isDoneState}
            isDone={true}
          />
        </TouchableDoubleClick>
      </ShadowCard>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  shadowBox: {
    padding: 0,
  },
  schedule: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scheduleContainer: {
    paddingBottom: 10,
    position: "relative",
  },
  titleSchedule: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#222",
  },
  seeDitaleContanier: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  seeDitale: {
    fontSize: 20,
    fontFamily:fontFamily.yekan,
  },
  topContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  mainActionContainer: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  isDone: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,

    elevation: 7,
  },
  editContainer: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
});
