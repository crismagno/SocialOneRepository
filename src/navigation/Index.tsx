import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import NavigationAuth from "./NavigationAuth";
  
const Init: React.FC = (): JSX.Element =>
	<SafeAreaView style={{ flex: 1 }}>
		<NavigationContainer >
			<NavigationAuth />
		</NavigationContainer>
	</SafeAreaView>;

export default Init;