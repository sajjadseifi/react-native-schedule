import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Color from '../../../Constants/Color';

const SwitchUi = ({ onSwitchHandler, }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    };
    useEffect(() => {
        onSwitchHandler(isEnabled);
    }, [isEnabled]);
    return (
        <View style={styles.switchUi}>
            <Switch
                trackColor={{ false: Color.gray, true: Color.bluePrimary }}
                thumbColor={isEnabled ? Color.yellowPrimary : Color.whiteGray}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default SwitchUi;

const styles = StyleSheet.create({
    switchUi:{
        flexDirection:"row-reverse",
    } ,
});