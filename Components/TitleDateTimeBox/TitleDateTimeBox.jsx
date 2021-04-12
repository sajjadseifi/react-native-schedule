import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import ShadowCard from '../UI/Cards/ShadowCard';
import FlexRow from '../UI/Flex/FlexRow';
import Box from './Box';

const TitleDateTimeBox = ({ iconTitle, date = "", time = "", dateColor = "black", timeColor = "black" }) => {
    const dateArr = date.split("/");
    const timeArr = time.split(":");
    const titleRef = useRef(null);
    useEffect(() => {
        console.log(titleRef.style);
    }, [titleRef]);
    return (
        <View style={styles.titleDateTimeBox}>
            <View style={styles.titleIconContainer}>
                <ShadowCard style={{ ...styles.title, backgroundColor: dateColor}}>
                    <FontAwesome color={"white"} name={iconTitle} size={25} />
                </ShadowCard>
            </View>
            <FlexRow style={styles.doubleBoxContainer}>
                <Box
                    beetwinText="/"
                    beetwinColor={timeColor}
                    arr={dateArr}
                    color={dateColor}
                    title={"تاریخ"}
                    iconTitle={"calendar"}
                />
                <Box
                    beetwinText=":"
                    beetwinColor={dateColor}
                    arr={timeArr}
                    color={timeColor}
                    title={"زمان"}
                    iconTitle={"clock-o"}
                />
            </FlexRow>
        </View>
    );
};

export default TitleDateTimeBox;

const styles = StyleSheet.create({
    titleDateTimeBox: {
        marginVertical: 10,
    },
    titleIconContainer: {
        alignItems: "center",
        marginBottom:5
    },
    title: {
        borderRadius: 50,
        height: 45,
        width: 45,
        padding:5,
        alignItems: "center",
        justifyContent: "center",
    },
    side: {
        flex: 1,
        height: "100%",
    },
    borderRelation: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    ghaem: {
        backgroundColor: "black",
        width: 2,
        height:7,
    },
    innerBorderRelation: {
        flex: 0.5,
        height: 20,
        borderColor: "black",
        borderWidth: 2,
        borderBottomWidth: 0,
    },
    doubleBoxContainer: {
        justifyContent: "space-evenly",
    },
}); 