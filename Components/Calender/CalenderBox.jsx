import React, { useState } from "react";
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import Color from "../../Constants/Color";

const CalendarBox = ({ minDate, currentDate, selectedDate, maxDate, onSelectHandler }) => {
    currentDate = currentDate ? currentDate : new Date().toUTCString();
    const [selected, setSelected] = useState(selectedDate || "");
    const onClickDayChanged = (day) => {
        if (onSelectHandler) {
            setTimeout(() => onSelectHandler(day), 800);
        }
        setSelected(day.dateString);
    }
    return (
        <Calendar
            markedDates={{
                [currentDate]: { selected: true, },
                [selected]: { selected: true, selectedColor: Color.bluePrimary }
            }}
            markingType={'multi-dot'}
            current={new Date()}
            minDate={minDate}
            maxDate={maxDate}
            onDayPress={onClickDayChanged}
            horizontal={true}
            enableSwipeMonths={true}
        // onDayLongPress={(day) => { console.log('selected day', day) }}
        // onMonthChange={(month) => { console.log('month changed', month) }}

        />
    )
};
export default CalendarBox;


LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


