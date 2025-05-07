import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/type';
import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';

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
  const { majorName, facultyName, unitId } = route.params; 
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);

  useEffect(() => {
    console.log('facultyName:', facultyName);
    console.log('unitId:', unitId);
    console.log('majorName:', majorName); // Nếu cần
  
    const fetchVocabulary = async () => {
      try {
        const snapshot = await firestore()
          .collection('faculties')
          .doc(facultyName)
          .collection('units')
          .doc(unitId)
          .collection('vocal')
          .get();
    
        const vocabList: VocabularyItem[] = snapshot.docs.map(doc => doc.data() as VocabularyItem);
        setVocabulary(vocabList);
      } catch (error) {
        console.error('Lỗi lấy dữ liệu Firestore:', error);
      }
    };
  
    fetchVocabulary();
  }, []);
  
  const onPressWord = (word: VocabularyItem) => {
    navigation.navigate('VocabularyItemScreen', { word });
  };

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 40 }}>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10, alignSelf: 'center' }}>{unitId}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', left: 10 }}
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}
        >
          <Image source={require('../assets/images/back1.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={vocabulary}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressWord(item)}
            style={{
              padding: 15,
              backgroundColor: '#fff',
              marginBottom: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#ddd',
              position: 'relative',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>word: {item.word}</Text>
            <Text style={{ fontWeight: 'bold' }}>partOfSpeech: {item.partOfSpeech}</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={(event) => {
                  event.stopPropagation();
                  Tts.speak(item.word);
                }}
                style={{ position: 'absolute', width: 20, height: 20 }}
              >
                <Image
                  source={require('../assets/images/sound.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <Text style={{ fontStyle: 'italic', color: 'gray', left: 30 }}>{item.phonetic}</Text>
            </View>
            <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>definition: {item.definition}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
