import React from "react";
import App from "./../navigation/Index";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#9584ff',
      accent: '#ff3e89',
      error: 'red'
    },
};

const Main: React.FC = (): JSX.Element => {
    return <PaperProvider theme={theme}>
        <App />
    </PaperProvider>;
};

export default Main;