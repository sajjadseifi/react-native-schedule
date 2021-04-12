import React, { useCallback, useContext } from 'react';
import {  View } from 'react-native';
import Color from '../../../Constants/Color';
import InputsType from '../../../Constants/InputsType';
import AuthFormContext from '../../../Context/AuthFormContext';
import Form from '../../../Per-Text/Form';
import FormButtonText from '../../UI/Buttons/FromButtonText';
import ShadowCard from '../../UI/Cards/ShadowCard';
import InputPack from '../../UI/Inputs/InputPack';
import { FORM_FORGETPASSWORD, FORM_LOGIN_JSX } from './auth.form.types';
import AuthFormButton from './AuthFormButton';

const ForgetPasswordForm = () => {
    const Auth = useContext(AuthFormContext);
    const { onSwith, onRequest, isLoading, authForm, onCahngeInput, bgHide, styles } = Auth;

    const switchHandler = useCallback(() => {
        if (onSwith)
            onSwith(FORM_LOGIN_JSX)
    }, [onSwith]);
    const requestHandler = useCallback(() => {
        if (onRequest)
            onRequest(FORM_FORGETPASSWORD);
    }, [onRequest]);

    return (
        <ShadowCard hideColor={bgHide} style={styles.card}>
            <InputPack
                tag="forgetPassword"
                inputType={InputsType.ForgetPassword}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.forgetPassword}
                error={authForm.inputErrors.forgetPassword}
                onInputChangeText={onCahngeInput}
                isShowError={authForm.formSubmited}
            />
            <View style={styles.formButtonContainer}>
                <AuthFormButton
                    isLoading={isLoading}
                    title={Form.send}
                    onPress={requestHandler}
                    color={"#1dba9d"}
                />
                <View style={styles.switchTextContainer}>
                    <FormButtonText
                        disabled={isLoading}
                        onPress={switchHandler}
                        title={Form.login}
                        textStyle={styles.switchButton}
                        color={Color.crimson}
                    />
                </View>
            </View>
        </ShadowCard>
    );
};
export default ForgetPasswordForm;

