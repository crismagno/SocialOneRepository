import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import NavigationAuth from "./NavigationAuth";
import { useEffect } from 'react';
import { IndexActionsStore } from "./../reduxStore/actions";

const Init: React.FC = (): JSX.Element => {

	const { 
		actionsSocket,
		actionsChat,
		actionsUser,
		actionsPeople
	} = IndexActionsStore();

	const globalSocket = actionsSocket.socketStateStore?.socket;
	const user = actionsUser?.userState;

	//to init the app set two methods 1. when mount app and 2. when destroyed app
	useEffect(() => {
		actionsSocket.connectSocket();
		return () => {
			globalSocket?.off(`connect`);
			globalSocket?.off(`disconnect`);
			actionsSocket.disconnectSocket();
		};
	}, []);

	useEffect(() => {
		globalSocket?.on("connect", () => {
			// inform that user being online 
			if (user._id) {
				globalSocket
					?.compress(true)
					?.emit(`inform-user-online`, {
						userId: user._id,
						socketId: globalSocket?.id
					});
			};
		});

		globalSocket?.on("disconnect", () => {
			//put offline peoples and chats
			actionsChat?.updateStatusOnlineOfAllPerson(false);
			actionsPeople?.updateStatusOnlineOfAllPerson(false);
			actionsUser?.updateStatusOnline(false);
		});
	}, [actionsSocket?.socketStateStore, user]);

	return <SafeAreaView style={{ flex: 1 }}>
		<NavigationContainer >
			<NavigationAuth />
		</NavigationContainer>
	</SafeAreaView>;
};

export default Init;