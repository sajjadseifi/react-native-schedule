import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TouchableDoubleClick = ({ onDoubleClick = () => { }, children,timerDoubleClick=300}) => {
    const [isDoubled,setIsDoubled] = useState(false);
    const onDoubleClickHandler = () => {
        const inreval = setTimeout(() => (setIsDoubled(false)), timerDoubleClick);
        if (isDoubled) {
            clearTimeout(inreval);
            onDoubleClick();
        }
        setIsDoubled(!isDoubled); 
    };
    return (
        <TouchableWithoutFeedback onPress={onDoubleClickHandler}>
            <View>{children}</View>
        </TouchableWithoutFeedback>
    );
};

export default TouchableDoubleClick;