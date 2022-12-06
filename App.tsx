/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import StackNavigation from './src/Navigation/StackNavigation';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import {store} from './src/state/store';
let persistor = persistStore(store);

import Icon from 'react-native-vector-icons/Feather';
import Warn from 'react-native-vector-icons/Ionicons';
import Error from 'react-native-vector-icons/MaterialIcons';

import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ToastProvider
            placement="top"
            duration={5000}
            animationType="zoom-in"
            animationDuration={250}
            successColor="green"
            dangerColor="red"
            warningColor="orange"
            normalColor="gray"
            // icon={<Icon />}
            successIcon={<Icon name="check-circle" color="white" />}
            dangerIcon={<Error name="dangerous" color="white" />}
            warningIcon={<Warn name="warning-sharp" color="white" />}
              
            >
            <StackNavigation />
          </ToastProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
