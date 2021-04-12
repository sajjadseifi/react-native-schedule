import React, { useCallback, useContext } from 'react';
import { View } from 'react-native';
import Color from '../../../Constants/Color';
import InputsType from '../../../Constants/InputsType';
import AuthFormContext from '../../../Context/AuthFormContext';
import Form from '../../../Per-Text/Form';
import FormButtonText from '../../UI/Buttons/FromButtonText';
import ShadowCard from '../../UI/Cards/ShadowCard';
import InputPack from '../../UI/Inputs/InputPack';
import { FORM_LOGIN_JSX, FORM_SIGNUP } from './auth.form.types';
import AuthFormButton from './AuthFormButton';

const SignUpForm = () => {
    const Auth = useContext(AuthFormContext);
    const { onSwith, onRequest, isLoading, authForm, onCahngeInput, bgHide, styles } = Auth;

    const switchHandler = useCallback(() => {
        if (onSwith)
            onSwith(FORM_LOGIN_JSX);
    }, [onSwith]);

    const requestHandler = useCallback(() => {
        if (onRequest)
            onRequest(FORM_SIGNUP)
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
                tag="email"
                inputType={InputsType.Email}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.email}
                error={authForm.inputErrors.email}
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

                <AuthFormButton
                    isLoading={isLoading}
                    title={Form.signup}
                    onPress={requestHandler}
                    color={Color.cornflowerblue}
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
export default SignUpForm;
