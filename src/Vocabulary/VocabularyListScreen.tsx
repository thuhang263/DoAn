import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import vocabularyData from './it.json';
import { RootStackParamList } from '../navigations/type';

type VocabularyListScreenRouteProp = RouteProp<RootStackParamList, 'VocabularyListScreen'>;

type Props = {
  route: VocabularyListScreenRouteProp;
};

interface VocabularyItem {
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
}

export default function VocabularyListScreen({ route }: Props) {
  const navigation = useNavigation();
  const { majorName } = route.params;

  // Tìm major theo majorName
  const major = vocabularyData.majors.find(m => m.majorName === majorName);

  if (!major) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Không tìm thấy ngành {majorName}</Text>
      </View>
    );
  }

  const onPressWord = (word: VocabularyItem) => {
    navigation.navigate('VocabularyItemScreen', { word });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{majorName}</Text>
      <FlatList
        data={major.vocabulary}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressWord(item)}
            style={{
              padding: 10,
              backgroundColor: '#fff',
              marginBottom: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#ddd'
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.word}</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.partOfSpeech}</Text>
            <Text style={{ fontStyle: 'italic', color: 'gray' }}>{item.phonetic}</Text>
            <Text numberOfLines={2}>{item.definition}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
