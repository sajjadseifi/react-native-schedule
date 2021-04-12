import React from 'react';
import { Animated, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const proggresColors = [
    ['#11aa33', 0.4],
    ['#F7B801', 0.4],
    ['#A30000', 0.2],
];
const Progress = ({ start = true, isPlaying = true, colors = proggresColors, duration = 10, size = 40, strokeWidth = 3, onEndTimHandler = () => { } }) => {
    let end = false;
    const isEndHandler = (time) => {
        if (end == false && time == 1) {
            onEndTimHandler();
            end = true;
        }
    }
    return (
        <View>
            {start &&
                <CountdownCircleTimer
                    {...{ isPlaying, strokeWidth, size, duration, colors }}
                >
                    {({ remainingTime, animatedColor }) => {
                        isEndHandler(remainingTime);
                        return (
                            <Animated.Text style={{ color: animatedColor }}>
                                {remainingTime}
                            </Animated.Text>
                        )
                    }}
                </CountdownCircleTimer>
            }
        </View>
    )
};

export default Progress;