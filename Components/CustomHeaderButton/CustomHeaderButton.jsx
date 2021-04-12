import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Color from '../../Constants/Color';


const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Color.primary}
    />
  );
};

export default CustomHeaderButton;

export const CustomHeaderButtonCursiom = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      color={"#e70878"}
    />
  );
};
