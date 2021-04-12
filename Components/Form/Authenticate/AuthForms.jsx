import React, { useEffect, useReducer, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AuthFormProvider } from "../../../Context/AuthFormContext";
import * as  authTypes from "./auth.form.types";
import * as  authActions from "./AuthenticateActions";
import ConfirmedCodeForm from "./ConfirmedCodeForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import SignUpForm from "./SignUpForm";
import * as images from "../../../load/image";
import * as authReduxActions from "../../../store/actions/auth";
import { fromAuthReducer, initialState } from "./AuthenticateFormReducer";
import * as AuthStyles from "../../../Styles/AuthStyles";
const AuthForms = ({ navigation, ...props }) => {

    //selector
    let tokenId = useSelector(state => state.auth.token);
    let confirmToken = useSelector(state => state.auth.confirmToken);
    let resetToken = useSelector(state => state.auth.resetToken);
    let isLoading = useSelector(state => state.auth.loading);
    let error = useSelector(state => state.auth.error);
    let formErrors = useSelector(state => state.auth.formErrors);
    let iscycle = true;

    //state
    const [stateType, setStateType] = useState(authTypes.FORM_LOGIN_JSX);
    const [authForm, dispatchAuthFrom] = useReducer(fromAuthReducer, initialState);
    const dispatch = useDispatch();

    const changeInputValueHandler = (tag, value, isValid, clientErorr) => {
        authActions.changeRducerValueHandler(dispatchAuthFrom, tag, value, isValid, clientErorr);
    }
    useEffect(() => {
        if (!iscycle) {
            return;
        }

        dispatchAuthFrom(authTypes.emptyErrors());

        if (formErrors == null || formErrors == undefined) return;

        for (let key in formErrors) {
            changeInputValueHandler(
                key,
                authForm.inputValues[key],
                false,
                formErrors[key]
            );
        }
        return () => {
            iscycle = false;
        }
    }, [formErrors]);
    //effect
    useEffect(() => {
        // return;
        if (tokenId) navigation.navigate("Sechudle");

        else if (confirmToken) setStateType(authTypes.FROM_CONFIREMD_CODE_JSX);

        else if (resetToken) setStateType(authTypes.FROM_RESET_PASSWORD_JSX);

        else setStateType(authTypes.FORM_LOGIN_JSX);

        return () => {
            confirmToken = null;
            resetToken = null;
        };
    }, [confirmToken, resetToken, tokenId]);
    //handler
    const onSwitchHandler = (type, payload) => {
        dispatchAuthFrom(authTypes.emptyErrors());
        setStateType(type);
    };
    async function requestHandler(actionType) {
        if (!authForm.formSubmited) {
            dispatchAuthFrom(authTypes.submitedFormReducer());
        }
        authActions.authecticationActionsHandler(
            actionType,
            authForm.inputValues,
            dispatch);
    };
    const showNotifications = (message, succes) => {
        if (succes)
            dispatch(authReduxActions.successRequest(message));
        else
            dispatch(authReduxActions.failureRequest(message));

    };
    const emptyAlltokens = () => {
        dispatch(authReduxActions.emptyTokens());
    };
    let AuthFormCmp = <Text>Form</Text>;
    let imgCmp = null;
    let marginTop = 0;
    let bg = "white";
    switch (stateType) {
        case authTypes.FORM_SIGNUP_JSX:
            bg = "#95bff7";
            imgCmp = images.signup;
            AuthFormCmp = <SignUpForm />;
            break;
        case authTypes.FORM_LOGIN_JSX:
            bg = "#fe7da4";
            imgCmp = images.login;
            AuthFormCmp = <LoginForm />;
            break;
        case authTypes.FORM_FORGETPASSWORD_JSX:
            bg = "#05fbce";
            imgCmp = images.forgotPassword;
            AuthFormCmp = <ForgetPasswordForm />;
            break;
        case authTypes.FROM_CONFIREMD_CODE_JSX:
            bg = "#6ce4ff";
            imgCmp = images.confirmCode;
            AuthFormCmp = <ConfirmedCodeForm />;
            break;
        case authTypes.FROM_RESET_PASSWORD_JSX:
            bg = "#eaeff6";
            imgCmp = images.resetPassword;
            AuthFormCmp = <ResetPasswordForm />;
            break;
    }
    return (
        <AuthFormProvider value={{
            onSwith: onSwitchHandler,
            onRequest: requestHandler,
            isLoading: isLoading,
            authForm: authForm,
            formErrors: formErrors,
            showNotifications: showNotifications,
            onCahngeInput: changeInputValueHandler,
            emptyAlltokens: emptyAlltokens,
            bgHide: bg,
            styles: AuthStyles.styles
        }}>
            <View style={{ ...styles.bg, backgroundColor: bg }}>
                <ImageBackground style={styles.imgBg} source={imgCmp} />
            </View>
            {AuthFormCmp}
        </AuthFormProvider>
    );
};

export default AuthForms;

const styles = StyleSheet.create({
    imgBg: {
        width: "100%",
        height: 330,
    },
    bg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        paddingVertical: 45,
        alignItems: "center",
    },
    safe: {
        marginTop: 300
    }
})