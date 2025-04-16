
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
    TestListenning="TestListenning",
    TestReading ="TestReading",
    VocabularyDetailScreen="VocabularyDetailScreen",
    GrammarTopicDetailScreen="GrammarTopicDetailScreen",
    ImageDetailScreen ="ImageDetailScreen",
    TopicVideo="TopicVideo",
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
    [Screens.TestListenning]: undefined;
    [Screens.TestReading]:undefined;
    [Screens.VocabularyDetailScreen]: { topicId: number };
    [Screens.GrammarTopicDetailScreen]:{ topicId:number,topicTitle:string};

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
    TestListenning:undefined;
    VocabularyDetailScreen: { topicId: number };
    TestReading:undefined;
    GrammarDetail :{grammarId:number}
    GrammarTopicDetailScreen: { topicId: number; topicTitle: string }; 
    ImageDetailScreen:undefined;
    TopicVideo:undefined;
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


export type StackParamsType = NativeStackNavigationProp<RootStackParamList>;
