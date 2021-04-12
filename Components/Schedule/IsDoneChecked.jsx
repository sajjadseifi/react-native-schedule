import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Color from '../../Constants/Color';


const IsDonChecked = ({ isfetched, isDone, active, top, right, size = 12 }) => {
 
    styles.isDoneContainer = {
        ...styles.isDoneContainer,
        [top ? "top" : "bottom"]: 10,
        [right ? "right" : "left"]: 10,
    };
    return (
        <>
            { isDone && (
                <View style={styles.isDoneContainer}>
                    {isfetched ?
                        <ActivityIndicator style={{width:15}} size={"small"} color={Color.crimson} />
                        :
                        <FontAwesome size={size} name="check" color={active ? "green" : "#ccc"} />
                    }
                </View>
            )}
        </>
    );
};

export default IsDonChecked;

const styles = StyleSheet.create({
    isDoneContainer: {
        position: "absolute",
        // bottom: 0,
        // right: 0,
    },
})