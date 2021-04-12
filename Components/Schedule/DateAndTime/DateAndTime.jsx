import React from 'react';
import FlexRow from '../../UI/Flex/FlexRow';
import BorderText from '../../UI/Text/BorderText';
import SpaceText from '../../UI/Text/SpaceText';

const DateAndTime = ({ date = null, dateColor = "black", time = null, timeColor = "black", space = 5 }) => {
    return (
        <FlexRow>
            <BorderText value={date} color={dateColor} />
            <SpaceText space={space} />
            <BorderText value={time} color={timeColor} />
        </FlexRow>
    )
};

export default DateAndTime;
