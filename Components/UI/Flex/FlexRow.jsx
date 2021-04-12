import React from 'react';
import { StyleSheet, View } from 'react-native';

const FlexRow = ({ children, ...props }) => (
    <View {...props} style={{
        ...styles.flexRow,
        ...props.style
    }} >
        {children}
    </View>
);

export default FlexRow;

const styles = StyleSheet.create({
    flexRow:{
        flexDirection:"row"
    }
});