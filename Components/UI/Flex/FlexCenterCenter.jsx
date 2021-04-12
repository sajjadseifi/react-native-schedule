import React from 'react';
import { StyleSheet, View } from 'react-native';

const FlexCenterCenter = ({ children, ...props }) => (
    <View {...props} style={{
        ...styles.flexCenterCenter,
        ...props.style
    }} >
        {children}
    </View>
);

export default FlexCenterCenter;

const styles = StyleSheet.create({
    flexCenterCenter:{
        // flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    }
});