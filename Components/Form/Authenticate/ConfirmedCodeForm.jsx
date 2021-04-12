import React, { useCallback, useContext } from 'react';
import {  StyleSheet, View } from 'react-native';
import Color from '../../../Constants/Color';
import InputsType from '../../../Constants/InputsType';
import AuthFormContext from '../../../Context/AuthFormContext';
import FormButtonText from '../../UI/Buttons/FromButtonText';
import ShadowCard from '../../UI/Cards/ShadowCard';
import InputPack from '../../UI/Inputs/InputPack';
import { FORM_LOGIN_JSX, FROM_CONFIREMD_CODE } from './auth.form.types';
import Progress from '../../Progress/Progress';
import { useSelector } from 'react-redux';
import Form from '../../../Per-Text/Form';
import AuthFormButton from './AuthFormButton';

const ConfirmedCodeForm = () => {
    const Auth = useContext(AuthFormContext);
    const { onSwith, onRequest, isLoading, authForm, onCahngeInput, showNotifications, styles, emptyAlltokens, bgHide } = Auth;
    const expiresIn = useSelector(state => state.auth.expiresInConfirmCode);

    if (expiresIn) {

    }
    const switchHandler = useCallback(() => {
        if (onSwith)
            onSwith(FORM_LOGIN_JSX);
        emptyAlltokens();

    }, [emptyAlltokens, onSwith]);
    const requestHandler = useCallback(() => onRequest(FROM_CONFIREMD_CODE), [onRequest]);

    const timoutHandler = useCallback(() => {
        showNotifications("مهلت ارسال به پایان رسید! دوباره تلاش کنید");
        emptyAlltokens();
    }, [emptyAlltokens, showNotifications]);
    return (
        <ShadowCard hideColor={bgHide} style={styles.card}>
            <View style={signUpStyles.timerBox}>
                <Progress start={true} duration={expiresIn} onEndTimHandler={timoutHandler} ></Progress>
            </View>
            <InputPack
                tag="confirmCode"
                inputType={InputsType.ConfirmCode}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.confirmCode}
                error={authForm.inputErrors.confirmCode}
                onInputChangeText={onCahngeInput}
                isShowError={authForm.formSubmited}
            />
            <View style={styles.formButtonContainer}>
                <AuthFormButton
                    isLoading={isLoading}
                    title={Form.confirm}
                    onPress={requestHandler}
                    color={Color.greenBlue}
                    boxStyle={{ marginBottom: 15 }}
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
export default ConfirmedCodeForm;

const signUpStyles = StyleSheet.create({
    ShadowCard: {
        position: "relative",
    },
    timerBox: {
        position: "absolute",
        bottom: 10,
        right: 15,
    }
});