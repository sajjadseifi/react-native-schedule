import React, { useCallback, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Color from '../../../Constants/Color';
import InputsType from '../../../Constants/InputsType';
import AuthFormContext from '../../../Context/AuthFormContext';
import Form from '../../../Per-Text/Form';
import FormButtonText from '../../UI/Buttons/FromButtonText';
import ShadowCard from '../../UI/Cards/ShadowCard';
import FlexRow from '../../UI/Flex/FlexRow';
import InputPack from '../../UI/Inputs/InputPack';
import { FORM_LOGIN_JSX, FROM_RESET_PASSWORD } from './auth.form.types';
import AuthFormButton from './AuthFormButton';

const ResetPasswordForm = () => {
    const Auth = useContext(AuthFormContext);
    const { onSwith, onRequest, isLoading, authForm, onCahngeInput,bgHide,styles } = Auth;
    const username = useSelector(state => state.auth.username);

    const switchHandler = useCallback(() => {
        if (onSwith)
            onSwith(FORM_LOGIN_JSX);
    }, [onSwith]);

    const requestHandler = useCallback(() => {
        if (onRequest)
            onRequest(FROM_RESET_PASSWORD);
    }, [onRequest]);
    return (
        <ShadowCard hideColor={bgHide} style={{ ...styles.card, paddingTop: 15 }}>
            <FlexRow style={signUpStyles.describtion}>
                <Text style={signUpStyles.txt}>کاربر گرامی :</Text>
                <Text style={signUpStyles.username}>{username}</Text>
            </FlexRow>
            <InputPack
                tag="password"
                inputType={InputsType.Password}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.password}
                error={authForm.inputErrors.password}
                onInputChangeText={onCahngeInput}
                isShowError={authForm.formSubmited}
            />
            <InputPack
                tag="confirmPassword"
                inputType={InputsType.ConfirmedPassword}
                inputFullStyle={styles.inputContainer}
                value={authForm.inputValues.confirmPassword}
                error={authForm.inputErrors.confirmPassword}
                onInputChangeText={onCahngeInput}
                isShowError={authForm.formSubmited}
            />
            <View style={styles.formButtonContainer}>
                <AuthFormButton
                    isLoading={isLoading}
                    title={Form.changePassword}
                    onPress={requestHandler}
                    color={Color.dodgerblue}
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
export default ResetPasswordForm;

const signUpStyles = StyleSheet.create({

    describtion: {
        flexDirection: "row-reverse",
        paddingBottom: 15,
        alignItems: "center"
    },
    describtionTitle: {

    },
    split: {
        marginHorizontal: 5
    },
    man: {
        color: "red",
        fontSize: 17
    },
    woman: {
        color: "blue",
        fontSize: 17,
    },
    who: {
        paddingHorizontal: 8
    },
    txt:{
        marginLeft:5,
        fontSize:17,
        fontWeight:"bold"
    },
    username: {
        fontSize: 18,
    }
});
