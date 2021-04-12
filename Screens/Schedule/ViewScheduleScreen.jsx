import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import IsDonChecked from '../../Components/Schedule/IsDoneChecked';
import TitleDateTimeBox from '../../Components/TitleDateTimeBox/TitleDateTimeBox';
import FormButtonText from '../../Components/UI/Buttons/FromButtonText';
import ArticleCard from '../../Components/UI/Cards/ArticleCard';
import FlexCenterCenter from '../../Components/UI/Flex/FlexCenterCenter';
import Color from '../../Constants/Color';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton, { CustomHeaderButtonCursiom } from '../../Components/CustomHeaderButton/CustomHeaderButton';
import TouchableDoubleClick from '../../Components/UI/Touchable/TouchableDoubleClick';
import { useDispatch, useSelector } from 'react-redux';
import * as scheduleActions from "../../store/actions/schedule.action";
import { getNumericStringDate, getStringTime } from '../../utils/date';
import IconName from '../../Constants/IconName';
import * as actionsType from "../../store/actions/actionsType";
import * as images from "../../load/image";
import { ScrollView } from 'react-native-gesture-handler';
import AlertPro from 'react-native-alert-pro';
const ViewScheduleScreen = (props) => {
    let alertPro;
    const schedule_id = props.navigation.getParam("id");

    const [isLoadData, setIsLoadData] = useState(true);
    const [error, setError] = useState("");
    const [isDoneLoad, setIsDoneLoad] = useState(false);

    const viewSchedule = useSelector(state => state.schedules.viewSchedule);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createDateString, setCreateDateString] = useState("");
    const [outDateString, setOutDateString] = useState("");
    const [createTimeString, setCreateTimeString] = useState("");
    const [outTimeString, setOutTimeString] = useState("");
    const [isDone, setIsDone] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        if (viewSchedule) {
            const outDate = new Date(viewSchedule.outDate);
            const createDate = new Date(viewSchedule.createDate);
            setTitle(viewSchedule.title);
            setDescription(viewSchedule.description);
            setCreateDateString(getNumericStringDate(createDate));
            setOutDateString(getNumericStringDate(outDate));
            setCreateTimeString(getStringTime(createDate));
            setOutTimeString(getStringTime(outDate));
            setIsDone(viewSchedule.isDone);
        }
    }, [viewSchedule]);

    useEffect(() => {
        dispatch(scheduleActions.loadViewSchedule(schedule_id));

        return () => {
            dispatch(scheduleActions.emptyViewSchedule());
        }

    }, [dispatch, schedule_id]);

    async function fetchedData() {

        setIsLoadData(true);
        if (error)
            setError("");

        try {
            await dispatch(scheduleActions.viewSchedule(schedule_id));
        } catch (err) {
            setError(err);
        }
    };

    const onSetIsDoneDuty = async () => {
        setIsDoneLoad(true);
        const reversed = !isDone;
        await dispatch(scheduleActions.isDoneUpdateSechudle(schedule_id, reversed));
        setIsDoneLoad(false);
    };

    if (!viewSchedule) {
        return (
            <FlexCenterCenter style={styles.container}>
                {(!!error) && <View><Text>{error}</Text></View>}
                {isLoadData ? <ActivityIndicator size="large" color="primary" />
                    : (<FormButtonText
                        title={"Try Agane"}
                        color={Color.primary}
                        onPress={fetchedData}
                    />)}
            </FlexCenterCenter>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <ImageBackground
                        style={styles.image}
                        source={images.viewSchedule}
                    />
                </View>
                <ArticleCard  titleIcon="calendar" title="عنوان فعالیت" textBody={title} />
                <TouchableDoubleClick onDoubleClick={onSetIsDoneDuty}>
                    <ArticleCard
                        titleIcon="analytics"
                        title="وظیفه"
                        textBody={description}
                        renderEnd={<IsDonChecked isfetched={isDoneLoad} size={14} isDone={true} active={viewSchedule.isDone} />}
                    />
                </TouchableDoubleClick>
                <View style={styles.titleDateTimeBoxContainer}>
                    <TitleDateTimeBox
                        iconTitle={"calendar-times-o"}
                        title={"Time Out"}
                        date={outDateString}
                        time={outTimeString}
                        dateColor={Color.yellowPrimaryDark}
                        timeColor={Color.cornflowerblue}
                    />
                    <TitleDateTimeBox
                        iconTitle={"pencil"}
                        title={"Created Time"}
                        date={createDateString}
                        time={createTimeString}
                        dateColor={Color.crimson}
                        timeColor={Color.cornflowerblue}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default ViewScheduleScreen;

ViewScheduleScreen.navigationOptions = (navData) => {
    const schedule_id = navData.navigation.getParam("id");
    const onAction = navData.navigation.getParam("onAction") || (() => { });

    return {
        title: "",
        headerStyle: {
            backgroundColor: "#f6eee3",
            shadowOpacity: 0,
            elevation: 0
        },
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButtonCursiom}>
                <Item
                    color={"red"}
                    title="Update"
                    iconName={IconName.materialIcon.update}
                    onPress={() => onAction(schedule_id, actionsType.UPDATE_SECHUDLE)}
                />
                <Item
                    title="Delete"
                    iconName={IconName.materialIcon.deleteForever}
                    onPress={() => {
                        onAction(schedule_id, actionsType.DELETE_SECHUDLE);
                    }}
                    color={"red"}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6eee3",
    },
    descriptionContainer: {
        position: "relative",
        backgroundColor: "red",
    },
    image: {
        // width:"90%",
        height: 240
    }
});