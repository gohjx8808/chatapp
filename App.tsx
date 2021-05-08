import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import Navigator from './src/modules/navigation/views/Navigator';
import {store} from './src/store';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primary: string;
      danger: string;
    }
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0f4c81',
    danger: '#FF0000',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
