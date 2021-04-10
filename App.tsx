import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigator from './src/Navigator';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primary: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0f4c81',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
