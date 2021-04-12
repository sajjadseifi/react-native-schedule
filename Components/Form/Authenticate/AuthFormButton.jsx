import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fontFamily } from "../../../load/font";
import { styles } from "../../../Styles/AuthStyles";
import FormButtonText from "../../UI/Buttons/FromButtonText";

const AuthFormButton = ({ isLoading, onPress = () => { }, boxStyle, textStyle, color, title }) => {


    return (
        <View style={{ ...styles.buttonContainer, ...boxStyle }}>
            <View style={{ ...stylesAuth.AuthFormButton }} >
                <TouchableOpacity
                    activeOpacity={0.6}
                    disabled={isLoading}
                    style={{ ...stylesAuth.touchableOpacity, borderColor: color ? color : "black" }}
                    onPress={onPress}>
                    {isLoading ? (
                        <ActivityIndicator size={"large"} color={color} />
                    ) : (
                            <FormButtonText color={color} textStyle={stylesAuth.formButtonText} >{title}</FormButtonText>
                        )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AuthFormButton;


const stylesAuth = StyleSheet.create({
    AuthFormButton: {
        justifyContent: "center",
        width: "100%",
        marginTop: 5
    },
    touchableOpacity: {
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 2,
        width: "100%",
        borderRadius: 50,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
    },
    formButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: fontFamily.far
    }
});
