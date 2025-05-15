
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
    TestListenning="TestListenning",
    TestReading ="TestReading",
    GrammarTopicDetailScreen="GrammarTopicDetailScreen",
    ImageDetailScreen ="ImageDetailScreen",
    TopicVideo="TopicVideo",
    StoriesDetail ="StoriesDetail",
    StoriesScreen="StoriesScreen",
    VocabularyItemScreen='VocabularyItemScreen',
}

export type RootBottomParamList = {
    [Screens.HomeScreen]: undefined;
    [Screens.DetailScreen]: undefined;
    [Screens.SearchScreen]: undefined;
    [Screens.ListScreen]: undefined;
    [Screens.TestScreen]: undefined;
    [Screens.TestListenning]: undefined;
    [Screens.TestReading]:undefined;
    [Screens.GrammarTopicDetailScreen]:{ topicId:number,topicTitle:string};
    [Screens.StoriesDetail]: { storiesID:number };
};

export type RootStackParamList = {
    [Screens.RootBottomNavigation]: NavigatorScreenParams<RootBottomParamList>;
    [Screens.DetailScreen]: { movieId: number };
    WelcomeScreen:undefined;
    HomeScreen:undefined;
    ListScreen:undefined;
    SearchScreen:undefined;
    TestScreen:undefined;
    VoccalScreen:undefined;
    GrammaScreen:undefined;
    VideoScreen: { videoId: string };
    TestListenning:undefined;
    TestReading:undefined;
    GrammarTopicDetailScreen: { topicId: number; topicName: string }; 
    TopicVideo:undefined;
    StoriesDetail:{storiesID:number, storiesName: string};
    StoriesScreen:undefined;
    MajorListScreen: { facultyName: string, };
    VocabularyListScreen: {
      majorName: string;
      facultyName: string;
      unitId: string;
    };
    
    VocabularyItemScreen: { word: {
      word: string;
      partOfSpeech: string;
      phonetic: string;
      definition: string;
    }};
    StoryContentScreen: {
      facultyId: string;
      paragraphId: string;
      storyId: string; 
    };
    ListeningScreen:undefined;
    WordDetailScreen: {
      word: string;
      meaning: string;
      partOfSpeech: string;
      example: string;
      phonetic: string;
      audio: string;
    };
    SpeakingScreen:undefined;
    SpeakingDetailScreen:{ paragraph: string, id: number };
    FavoriteVocabScreen:undefined;
    NotebookScreen:undefined;
    DetailVocab: {
      topicId: string;
      topicTitle: string;
    };
    ImageDetailScreen:undefined;
    TestBasic:undefined;
    SpecializedEnglishScreen:undefined;
    ExerciseScreen: { faculty: string, exerciseType: string };
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}


export type StackParamsType = NativeStackNavigationProp<RootStackParamList>;
