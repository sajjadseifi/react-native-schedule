import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DateTextSchedule = ({date,size}) => {
    return(
        <View style={styles.dateTextScheduleContainer}>
            <Text style={styles.dateTextSchedule}>{date}</Text>
        </View>
    );
};

export default DateTextSchedule;

const styles= StyleSheet.create({
    dateTextScheduleContainer:{

    },
    dateTextSchedule:{
        
    }
}); 