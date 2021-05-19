import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import { IHoursMessageProps } from "./types";
import moment from "moment";
import "moment/locale/en-in";

const HoursMessage: React.FC<IHoursMessageProps> = (props): JSX.Element => {

    const hoursDisplay = (): String => {
        if (!props.date) return "...";

        const diffOfDateMessageForToday = moment().diff(props.date, 'days');

        if (diffOfDateMessageForToday === 0)
            return moment(props.date).format('LT');

        if (diffOfDateMessageForToday === 1)
            return "ontem";

        if (diffOfDateMessageForToday > 1 && diffOfDateMessageForToday <= 6)
            return moment(props.date).format('dddd');

        if (diffOfDateMessageForToday > 6)
            return moment(props.date).format('l');
    }; 

    return <Text
        numberOfLines={1}
        style={styles.textHourLastMessage(props.colorText)}>
        {hoursDisplay()}
    </Text>;
};

export default HoursMessage;