import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const Timer = ({ restartTimer, timerActive }) => {
  const timer = 10;// set timer
  const [seconds, setSeconds] = useState(timer);

  useEffect(() => {
    if (timerActive && seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Cleanup the timer when the component unmounts or the timer is stopped
      return () => clearInterval(timer);
    }
  }, [timerActive, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      restartTimer();
    }
  }, [seconds, restartTimer]);

  useEffect(() => {
    if (!timerActive) {
      setSeconds(timer);
    }
  }, [timerActive]);

  return (
    <View>
      <Text>{seconds} seconds</Text>
    </View>
  );
};

export default Timer;
