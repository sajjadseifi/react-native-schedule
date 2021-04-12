import React from 'react';
import { StyleSheet, View } from 'react-native';
import ErrorText from './ErrorText';

const ErrorBox=({ color="white", bgColor="red", errorMessage="Error"})=>{

    return(
        <View style={{
            ...styles.container,
            backgroundColor:bgColor
        }}>
            <ErrorText
                errorColor={color}
                errorMessage={errorMessage}
            />
        </View>
    );
};


export default ErrorBox;

const styles = StyleSheet.create({
    container:{
        padding:5,
        paddingHorizontal:15,
        borderRadius:7
    },  
});