import React, { useEffect } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import * as images from "../../load/image";
import FlexRow from "../../Components/UI/Flex/FlexRow";
const AuthLogout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(authActions.logoutAct());
        }, 1000);
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.img}
                source={images.logout}
            />
            <View style={{ marginTop: 20 }}>
                <Text style={styles.logoutText}>مراقب خودت باش</Text>
            </View>
            <FlexRow style={{ marginTop: 20 }}>
                <ActivityIndicator size={28} color={"#a1a1a1"}></ActivityIndicator>
            </FlexRow>
        </View>
    );
};

export default AuthLogout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        width: 375,
        height: 400,
        // backgroundColor:"red",
    },
    logoutText: {
        fontWeight: "bold",
        fontSize: 28
    },
    linearGradient: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 25,
        color: '#a7a7a7',
        fontWeight: "bold",
    },
});