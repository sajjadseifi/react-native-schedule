import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import Color from '../../../Constants/Color';

const SwitchUiRevers = ({ onSwitchHandler, enabled }) => {
    const [isDisable, setIsDisable] = useState(!(!!enabled));
    const [start, setStart] = useState(false);
    const toggleSwitch = () => {
        setIsDisable(!isDisable);
    };
    useEffect(() => {
        if (start) {
            console.log("start");
            setStart(false);
        } else {
            console.log("onSwitchHandler");
            if (onSwitchHandler)
                onSwitchHandler(!isDisable);
        }

    }, [isDisable, start]);
    return (
        <View style={styles.switchUi}>
            <Switch
                trackColor={{ true: Color.gray, false: Color.bluePrimary }}
                thumbColor={!isDisable ? Color.yellowPrimary : Color.whiteGray}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDisable}
            />
        </View>
    );
};

export default SwitchUiRevers;


const styles = StyleSheet.create({
    switchUi: {
        flexDirection: "row-reverse",
    },
});