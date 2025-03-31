
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


export enum Screens {
    HomeScreen = 'HomeScreen',
    ListScreen = 'ListScreen',
    SearchScreen ='SearchScreen',
    DetailScreen = 'DetailScreen',
    TestScreen ='TestScreen',
    RootBottomNavigation = 'RootBottomNavigation',
    VoccalScreen = "VoccalScreen",
    EndTest = "EndTest",
    TestItem="TestItem",
    TestVoc ="TestVoc",
    TestGrammar ="TestGrammar",
    TestListening="TestListening",
    VocabularyDetailScreen="VocabularyDetailScreen",
}

export type RootBottomParamList = {
    [Screens.HomeScreen]: undefined;
    [Screens.DetailScreen]: undefined;
    [Screens.SearchScreen]: undefined;
 
    [Screens.ListScreen]: undefined;
    [Screens.TestScreen]: undefined;
    [Screens.EndTest]: undefined;
    [Screens.TestVoc]: undefined;
    [Screens.TestGrammar]: undefined;
    [Screens.TestListening]: undefined;
    [Screens.VocabularyDetailScreen]: { topicId: number };
 
};

export type RootStackParamList = {
    [Screens.RootBottomNavigation]: NavigatorScreenParams<RootBottomParamList>;
    [Screens.DetailScreen]: { movieId: number };
    HomeScreen:undefined;
    ListScreen:undefined;
    SearchScreen:undefined;
    TestScreen:undefined;
    VoccalScreen:undefined;
    GrammaScreen:undefined;
    TestItem:undefined;
    EndTest: { correctCount: number }; 
    MovieScreen: undefined;
    VideoScreen: { videoId: string }; // Đảm bảo có videoId
    TestVoc:undefined;
    TestGrammar:undefined;
    TestListening:undefined;
    VocabularyDetailScreen: { topicId: number };
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


export type StackParamsType = NativeStackNavigationProp<RootStackParamList>;
