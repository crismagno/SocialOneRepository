import React, { memo } from "react";
import { Text } from "react-native";
import styles from "./styles";
import { ITextMessageTypeProps } from "./types";

export const TextMessageType: React.FC<ITextMessageTypeProps> = (props): JSX.Element => {

    const textByType = (): String => {
        if (props?.messageIsDisabled) return "Message was removed"
        switch(props.type) {
            case "text": return props.valueText;
            case "audio": return "Audio";
            case "document": return "Documento";
            case "figure": return "Figura";
            case "image": return "Imagem";
            case "video": return "Video";
            case "microphone": return "Microfone";
            default: return "...";
        };
    };

    return <Text
        style={styles.textLastMessage(props.colorText)}
        numberOfLines={1}>
        {textByType()}
    </Text>; 
};

export default memo(TextMessageType);