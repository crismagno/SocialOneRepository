import React, { useEffect } from "react";
import { View } from "react-native";
import styles from "./styles";
import ListChat from "./components/ListChat";
import { IndexActionsStore } from "./../../reduxStore/actions";
import { IChatItem } from "../../types";

const Home: React.FC = (props): JSX.Element => {

    const {
        actionsSocket,
        actionsUser,
        actionsChat,
        actionsPeople
    } = IndexActionsStore();

    const globalSocket = actionsSocket?.socketStateStore?.socket; 
    const user = actionsUser?.userState;

    useEffect(() => {
        // socket that inform new chat to creator and person
        globalSocket?.on(`create-chat-send-to-creator-${user._id}`, (data: IChatItem): void => {
            actionsChat.addChatsOnState([data]);
        });
        globalSocket?.on(`create-chat-send-to-person-${user._id}`, (data: IChatItem): void => {
            if (data?.creator === user._id) return;
            actionsChat.addChatsOnState([data]);
        });
        
        // inform that user being online 
        globalSocket
            ?.compress(true)
            ?.emit(`inform-user-online`, {
                userId: user._id,
                socketId: globalSocket?.id
            });

        // inform users online
        globalSocket?.on(`inform-user-is-online`, (userId: string): void => {
            if (!userId.trim()) return;
            actionsChat.updateStatusOnlineOfPerson(userId, true);
            actionsPeople.updateStatusOnlineOfPerson(userId, true);
            
            // if my user then update status to online 
            if (userId === user._id) {
                actionsUser.updateStatusOnline(true);
            }
        });
        
        // inform users offnline
        globalSocket?.on(`inform-user-is-offline`, (userId: string): void => {
            if (!userId.trim()) return;
            actionsChat.updateStatusOnlineOfPerson(userId, false);
            actionsPeople.updateStatusOnlineOfPerson(userId, false);
            
            // if my user then update status to offline 
            if (userId === user._id) {
                actionsUser.updateStatusOnline(false);
            }
        });

        return () => {
            globalSocket?.off(`create-chat-send-to-creator-${user._id}`);
            globalSocket?.off(`create-chat-send-to-person-${user._id}`);
            globalSocket?.off(`inform-user-is-online`);
            globalSocket?.off(`inform-user-is-offline`);
        };
    }, []);

    return <View style={styles.container}>
        <ListChat />
    </View>;
};

export default Home;