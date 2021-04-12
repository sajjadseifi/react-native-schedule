import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const KeyValue = ({ title, value, size = 16, titleColor = "black", valueColor = "black" }) => {

    return (
        <View style={styles.titleValue}>
            <Text style={{ ...styles.title, fontSize: size, color: titleColor }}>{title}</Text>
            <Text>{" "}</Text>
            <Text style={{ ...styles.value, fontSize: size, color: valueColor }}>{value}</Text>
        </View>
    );
};

export default KeyValue;

const styles = StyleSheet.create({
    titleValue: {
        flexDirection: "row",

    },
    title: {
        fontWeight: "bold",
    },
    value: {
        opacity: 0.7
    },
})