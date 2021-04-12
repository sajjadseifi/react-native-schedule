import React, { useCallback, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '../../../Constants/Color';
import InputsType from '../../../Constants/InputsType';
import AuthFormContext from '../../../Context/AuthFormContext';
import FormButtonText from '../../UI/Buttons/FromButtonText';
import ShadowCard from '../../UI/Cards/ShadowCard';
import InputPack from '../../UI/Inputs/InputPack';
import { FORM_FORGETPASSWORD_JSX, FORM_LOGIN, FORM_SIGNUP_JSX } from './auth.form.types';
import AuthFormButton from './AuthFormButton';
import Form from '../../../Per-Text/Form';
const ForgetPassword = "ForgetPassword";
const SignUp = "SignUp";

const LoginForm = () => {

    const Auth = useContext(AuthFormContext);
    const { onSwith, onRequest, isLoading, authForm, onCahngeInput, bgHide, styles } = Auth;

    const switchHandler = useCallback((FORM_JSX) => {
        if (onSwith) {
            switch (FORM_JSX) {
                case ForgetPassword: return onSwith(FORM_FORGETPASSWORD_JSX, {});
                case SignUp: return onSwith(FORM_SIGNUP_JSX, {});
            }
        }
    }, [onSwith]);

    const requestHandler = useCallback(() => {
        if (onRequest)
            onRequest(FORM_LOGIN);
    }, [onRequest]);
    return (
        <ShadowCard hideColor={bgHide} style={styles.card}>
            <InputPack
                tag="username"
                inputType={InputsType.Username}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.username}
                error={authForm.inputErrors.username}
                onInputChangeText={onCahngeInput}
                isShowError={authForm.formSubmited}
            />
            <InputPack
                tag="password"
                inputType={InputsType.Password}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.password}
                error={authForm.inputErrors.password}
                onInputChangeText={onCahngeInput}
                isShowError={authForm.formSubmited}
            />
            <View style={styles.formButtonContainer}>
                <FormButtonText
                    style={styles.forgetPassword}
                    textStyle={styles.forgetPasswordText}
                    onPress={() => switchHandler(ForgetPassword)}
                    title={Form.forgetYourPassword_Q} />

                <AuthFormButton
                    isLoading={isLoading}
                    title={Form.login}
                    onPress={requestHandler}
                    color={Color.crimson}
                    textStyle={signUpStyles.formSubmiteButton}
                />
                <View style={styles.switchTextContainer}>
                    <FormButtonText
                        disabled={isLoading}
                        color={Color.cornflowerblue}
                        textStyle={styles.switchButton}
                        onPress={() => switchHandler(SignUp)}
                        title={Form.signup}
                    />
                </View>
            </View>
        </ShadowCard>
    );
};

export default LoginForm;

const signUpStyles = StyleSheet.create({
    switchButton: {
        color: Color.cornflowerblue,
        fontSize: 14,
    },
    linearGradient: {
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 50,

    },
    formSubmiteButton: {
        color: Color.crimson,
    },
    forgetPassword: {
        justifyContent: "flex-end",
        marginBottom: 5,
        backgroundColor: "red",
    },
    forgetPasswordText: {
        fontSize: 14,
        backgroundColor: "red",
    },
});
