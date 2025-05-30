
import React, { useEffect } from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigation from './RootStackNavigation';
import {StyleSheet} from 'react-native';
import { initAppLanguage } from '../utils/i18n';

const AppNavigation = () => {
  useEffect(() => {
    initAppLanguage();
  }, []);
  return (
    <GestureHandlerRootView style={styles.flex1}>
      <SafeAreaProvider style={styles.flex1}>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
