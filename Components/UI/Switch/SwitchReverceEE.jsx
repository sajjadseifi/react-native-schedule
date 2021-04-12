import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Color from '../../../Constants/Color';

const SwitchReversEE = ({ onSwitchHandler, enabled }) => {
    const isEnabled = !(!!enabled);
    return (
        <View style={styles.switchUi}>
            <Switch
                trackColor={{ true: Color.gray, false: Color.bluePrimary }}
                thumbColor={!isEnabled ? Color.yellowPrimary : Color.whiteGray}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onSwitchHandler}
                value={isEnabled}
            />
        </View>
    );
};

export default SwitchReversEE;


const styles = StyleSheet.create({
    switchUi: {
        flexDirection: "row-reverse",
    },
});