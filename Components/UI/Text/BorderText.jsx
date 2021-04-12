import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontFamily } from '../../../load/font';

const BorderText = ({ value = null, round=5,fontSize = 15, strokeWidth = 1, color = "black", spaceH = 8, spaceV = 4 }) => {
    const newStyle = {
        ...styles.borderText,
        fontSize: fontSize,
        borderWidth: strokeWidth,
        color: color,
        borderColor: color,
        paddingHorizontal: spaceH,
        paddingVertical: spaceV,
        borderRadius:round,
    };
    return <Text style={newStyle} >{value}</Text>
};
export default BorderText;

const styles = StyleSheet.create({
    borderText: {
        color: "black",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "black",
        fontFamily:fontFamily.mj,
    },
});