import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import Color from '../../../../Constants/Color';
import FlexRow from '../../Flex/FlexRow';


const BorderInput = ({ color, disabled, placeholder, value, textarea = null, iconName, isArrow, onChange, onPress }) => {

    if (color) {
        styles.BorderInput = {
            ...styles.BorderInput,
            borderBottomColor: color
        };
    }
    let BorderInputMerged= styles.BorderInput;
    if(textarea){
        BorderInputMerged={
            ...BorderInputMerged,
            alignItems:"flex-start",
            paddingVertical:15,
            paddingBottom:0,
        };
    }
    return (
        <TouchableWithoutFeedback
            onPress={onPress ? onPress : () => { }}
        >

            <View style={BorderInputMerged}
            >
                <FontAwesome
                    size={20}
                    name={iconName}
                    color={color ? color : "black"}
                />
                {!disabled ?
                    !textarea ?
                        <TextInput
                            style={styles.input}
                            value={value}
                            placeholder={placeholder}
                            onChangeText={onChange ? onChange : () => { }}
                            numberOfLines={textarea ? textarea : 1}
                            editable={true}
                        />
                        :
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={onChange ? onChange : () => { }}
                            defaultValue={value}
                            maxLength={115}
                            placeholder={placeholder}
                            // placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    :
                    <View style={styles.inputDummyContainer}>
                        <Text
                            numberOfLines={1}
                            style={styles.inputDummy}
                        >{value}</Text>
                    </View>
                }
                {isArrow && <FontAwesome
                    style={styles.arrowDwon} size={20}
                    name="angle-down"
                    color={color ? color : "black"}
                />
                }
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BorderInput;


const styles = StyleSheet.create({
    BorderInput: {
        marginVertical: 10,
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#eaeaea",
        borderRadius: 20,
        paddingVertical: 5
    },
    textareaContainer:{
        height:150,
        padding:0,
        margin:0,
    },  
    textarea:{
        textAlign:"right",
        fontWeight:"bold",
        fontSize:20,
        paddingHorizontal:10,
    },  
    input: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        flex: 1,
        marginHorizontal: 5,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "right"
    },
    inputDummy: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        fontSize: 18,
        fontWeight: "bold",
        color: "#888"
    },
    inputDummyContainer: {
        flexDirection: "row-reverse",
        flex: 1,
    },
    arrowDwon: {
        fontWeight: "bold"
    },
})