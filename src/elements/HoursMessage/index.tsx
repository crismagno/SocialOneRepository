import React, { memo } from "react";
import { Text } from "react-native";
import styles from "./styles";
import { IHoursMessageProps } from "./types";
import moment from "moment";
import { useEffect } from "react";
// import "moment/locale/en-in";
// import "moment/locale/pt-br";
import "moment/min/moment-with-locales.min.js"

export const HoursMessage: React.FC<IHoursMessageProps> = (props): JSX.Element => {
    useEffect(() => {
        moment.locale('en-in');
    }, []);

    const hoursDisplay = (): String => {
        if (!props.date) return "...";

        const diffOfDateMessageForToday = moment().diff(props.date, 'days');

        if (diffOfDateMessageForToday === 0)
            return moment(props.date).format('LT');

        if (diffOfDateMessageForToday === 1)
            return "yesterday";

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

export default memo(HoursMessage);