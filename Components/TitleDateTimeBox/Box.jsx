import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontFamily } from '../../load/font';
import ShadowCard from '../UI/Cards/ShadowCard';
import FlexCenterCenter from '../UI/Flex/FlexCenterCenter';
import MultiBorderText from '../UI/Text/MultiBorderText';

const Box = ({iconTitle, title, arr = [], color, beetwinText, beetwinColor }) => {
    if (beetwinColor) {
        styles.beetwinText = {
            ...styles.beetwinText,
            color: beetwinColor
        };
    }
    return (
        <ShadowCard style={styles.shadowBox}>
            <View style={styles.Box}>
                <FlexCenterCenter>
                    <FontAwesome name={iconTitle} size={23}/>
                    <Text style={styles.title}>{title}</Text>
                </FlexCenterCenter>
                <MultiBorderText
                    items={arr}
                    color={color}
                    beetwinConponent={<Text style={styles.beetwinText}>{beetwinText}</Text>}
                />
            </View>
        </ShadowCard>

    );
};

export default Box;

const styles = StyleSheet.create({
    shadowBox: {
        flex: 1,
        marginHorizontal: 15,
    },
    Box: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginVertical:5,
        fontSize: 20,
        // fontWeight: "bold",
        color: "#222",
        fontFamily:fontFamily.roya
    },
    beetwinText: {
        fontWeight: "bold",
        fontSize: 18,
        marginHorizontal: 3
    }
}); 