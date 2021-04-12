import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontFamily } from '../../../load/font';
import FlexRow from '../Flex/FlexRow';
import ShadowCard from './ShadowCard';

const ArticleCard = ({ title, titleIcon, textBody, renderEnd }) => {
    return (
        <ShadowCard style={styles.articleCard}>
            <FlexRow style={styles.titleContaner}>
                <Ionicons name={titleIcon} size={26} />
                <Text style={styles.title}>{title}</Text>
            </FlexRow>
            <Text style={styles.body}>{textBody}</Text>
            {renderEnd}
        </ShadowCard>
    );
};

export default ArticleCard;
const styles = StyleSheet.create({
    articleCard: {
        marginVertical: 10,
        marginHorizontal: 10,
        position: "relative",
        shadowOpacity:0,
    },
    titleContaner: {
        alignItems: "center",
        flexDirection:"row-reverse",
    },
    title: {
        color: "black",
        fontSize: 22,
        // fontWeight:"bold",
        marginHorizontal: 5,
        fontFamily:fontFamily.mj,
    },
    body: {
        fontSize: 17,
        color: "#333",
        marginRight: 32,
        marginLeft: 16,
        textAlign:"right",
        fontFamily:fontFamily.roya
    }

});