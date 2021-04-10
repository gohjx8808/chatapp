import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Navigator from './src/modules/navigation/views/navigator';

const App = () => {
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
