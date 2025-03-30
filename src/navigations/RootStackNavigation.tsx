import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from './type';
import RootBottomNavigation from './RootBottomNavigation';
import DetailScreen from '../screens/DetailScreen/DetailScreen';
import VoccalScreen from '../screens/HomeScreen/VoccalScreen';
import GrammaScreen from '../screens/HomeScreen/GrammaScreen';
import EndTest from '../screens/TestScreen/EndTest';
import TestItem from '../screens/TestScreen/TestItem';
import VideoScreen from '../screens/HomeScreen/VideoScreen';
import MovieScreen from '../screens/HomeScreen/MovieScreen';


const RootStackNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
      <Stack.Screen name={Screens.RootBottomNavigation} component={RootBottomNavigation}/>
      <Stack.Screen name={Screens.DetailScreen} component={DetailScreen} />
      
      <Stack.Screen name="VoccalScreen" component={VoccalScreen} />
      <Stack.Screen name="GrammaScreen" component={GrammaScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />

      <Stack.Screen name={Screens.TestItem} component={TestItem} />
      <Stack.Screen name={Screens.EndTest} component={EndTest} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;