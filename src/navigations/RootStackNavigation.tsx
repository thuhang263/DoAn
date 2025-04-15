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
import TestVoc from '../screens/TestScreen/TestVoc';
import TestGrammar from '../screens/TestScreen/TestGrammar';
import TestListening from '../screens/TestScreen/TestListenning';
import VocabularyDetailScreen from '../screens/TestScreen/VocabularyDetailScreen';
import TestReading from '../screens/TestScreen/TestReading';
import GrammarDetail from '../screens/TestScreen/GrammarDetail';
import GrammarTopicDetailScreen from '../components/GrammarTopicDetailScreen';
import ImageDetailScreen from '../components/ImageDetailScreen';

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
      <Stack.Screen name={Screens.TestVoc} component={TestVoc} />
      <Stack.Screen name={Screens.TestGrammar} component={TestGrammar} />
      <Stack.Screen name={Screens.TestListenning} component={TestListening} />
      <Stack.Screen name={Screens.TestReading} component={TestReading} />
      <Stack.Screen name={Screens.EndTest} component={EndTest} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="VocabularyDetailScreen" component={VocabularyDetailScreen} />
      <Stack.Screen name="GrammarDetail" component={GrammarDetail} />
      <Stack.Screen name="GrammarTopicDetailScreen" component={GrammarTopicDetailScreen} />
      <Stack.Screen name="ImageDetailScreen" component={ImageDetailScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;