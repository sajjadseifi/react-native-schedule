import React, { Fragment } from 'react';
import FlexRow from '../Flex/FlexRow';
import BorderText from './BorderText';

const MultiBorderText = ({ items = [], beetwinConponent, color = "black", colors= [] }) => {
    const isArrColor = colors.length > 0;
    return (
        <FlexRow style={{alignItems:"center"}}>
            {items.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <BorderText
                            color={isArrColor && index <= colors.length ? colors[index] : color}
                            value={item}
                        />
                        {(index + 1 != items.length) && beetwinConponent}
                    </Fragment>
                );
            })}
        </FlexRow>
    );
};
export default MultiBorderText;