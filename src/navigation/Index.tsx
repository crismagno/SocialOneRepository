import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import NavigationAuth from "./NavigationAuth";
import { useEffect } from 'react';
import actionsSocketStore from "./../reduxStore/actions/socket";

const Init: React.FC = (): JSX.Element => {

	const { 
		socketStateStore,
		connectSocket, 
		disconnectSocket
	} = actionsSocketStore();

	//to init the app set two methods 1. when mount app and 2. when destroyed app
	useEffect(() => {
		connectSocket();
		return () => disconnectSocket();
	}, []);

	useEffect(() => {
		socketStateStore?.socket?.on("me", (data: any) => {
			console.log("MEEEEE==>>>", data)
		});
	}, [socketStateStore]);

	return <SafeAreaView style={{ flex: 1 }}>
		<NavigationContainer >
			<NavigationAuth />
		</NavigationContainer>
	</SafeAreaView>;
}

export default Init;