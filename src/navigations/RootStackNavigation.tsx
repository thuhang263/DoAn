import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from './type';
import RootBottomNavigation from './RootBottomNavigation';

import VoccalScreen from '../screens/HomeScreen/VoccalScreen';
import GrammaScreen from '../screens/HomeScreen/GrammaScreen';
import VideoScreen from '../screens/HomeScreen/VideoScreen';
import TestListening from '../screens/TestScreen/TestListenning';

import TestReading from '../screens/TestScreen/TestReading';
import GrammarTopicDetailScreen from '../components/GrammarTopicDetailScreen';
import ImageDetailScreen from '../components/Vocab';
import TopicVideo from '../components/TopicVideo';
import StoriesDetail from '../screens/ReadingScreen/StoriesDetail';
import StoriesScreen from '../screens/ReadingScreen/StoriesScreen';
import VocabularyListScreen from '../screens/Vocabulary/VocabularyListScreen';
import MajorListScreen from '../screens/Vocabulary/MajorListScreen';
import StoryContentScreen from '../screens/ReadingScreen/StoryContentScreen';
import TestScreen from '../screens/TestScreen/TestScreen';
import SpeakingScreen from '../screens/SpeakingScreen/SpeakingScreen';
import SpeakingDetailScreen from '../screens/SpeakingScreen/SpeakingDetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import DetailVocab from '../components/DetailVocab';
import TestBasic from '../screens/TestScreen/TestBasic';
import SpecializedEnglishScreen from '../screens/TestScreen/SpecializedEnglishScreen';
import ExerciseScreen from '../screens/TestScreen/ExerciseScreen';
import TestWriting from '../screens/TestScreen/TestWriting';
import EntertainmentScreen from '../screens/EntertainmentScreen/EntertainmentScreen';



const RootStackNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown:false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Screens.RootBottomNavigation} component={RootBottomNavigation}/>
  
      <Stack.Screen name="VoccalScreen" component={VoccalScreen} />
      <Stack.Screen name="GrammaScreen" component={GrammaScreen} /> 
      <Stack.Screen name={Screens.TestListenning} component={TestListening} />
      <Stack.Screen name={Screens.TestReading} component={TestReading} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="GrammarTopicDetailScreen" component={GrammarTopicDetailScreen} />
      <Stack.Screen name="ImageDetailScreen" component={ImageDetailScreen} />
      <Stack.Screen name="TopicVideo" component={TopicVideo} />
      <Stack.Screen name="StoriesDetail" component={StoriesDetail} />
      <Stack.Screen name="StoriesScreen" component={StoriesScreen} />
      <Stack.Screen name="VocabularyListScreen" component={VocabularyListScreen} />
      <Stack.Screen name="MajorListScreen" component={MajorListScreen} />
      <Stack.Screen name="StoryContentScreen" component={StoryContentScreen} />
      <Stack.Screen name="EntertainmentScreen" component={EntertainmentScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="SpeakingScreen" component={SpeakingScreen} />
      <Stack.Screen name="SpeakingDetailScreen" component={SpeakingDetailScreen} />
      <Stack.Screen name="DetailVocab" component={DetailVocab} />
      <Stack.Screen name="TestBasic" component={TestBasic} />
      <Stack.Screen name="SpecializedEnglishScreen" component={SpecializedEnglishScreen} />
      <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
      <Stack.Screen name="TestWriting" component={TestWriting} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;