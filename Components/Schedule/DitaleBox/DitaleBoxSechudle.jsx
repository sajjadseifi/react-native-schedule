import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../../../Constants/Color';
import { fontFamily } from '../../../load/font';

const DitaleBoxSechudle = ({ describtion, date, time }) => {
    return (
        <View style={styles.diatelsContainer}>
            <View style={styles.descriptionView}>
                <Text style={styles.descriptionTitle}>وظیفه</Text>
                <View style={styles.descriptionBox}>
                    <Text style={styles.description} numberOfLines={3}>{describtion}</Text>
                </View>
            </View>
        </View>
    );
};


export default DitaleBoxSechudle;

const styles = StyleSheet.create({
    diatelsContainer: {
        paddingTop: 5,
        paddingBottom: 0,
        paddingHorizontal: 10,
        alignItems:"flex-end",
    },
    descriptionView: {
    },
    descriptionTitle: {
        fontSize: 25,
        fontFamily:fontFamily.far, 
    },
    descriptionBox:{
        paddingHorizontal:15,
    },
    description: {
        fontSize: 17,
        fontFamily:fontFamily.yekan
    },

    dateContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    titleDate: {
        color: Color.darkslateblue,
        fontWeight: "bold",
        fontSize: 17,
    },
    space: {
        marginHorizontal: 5,
    }
});