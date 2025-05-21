import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/type';
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
    const fetchFavorites = async () => {
      try {
        const snapshot = await firestore().collection('favoriteVoc').get();
        const favorites = snapshot.docs.map(doc => doc.id); 
       
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu yêu thích:', error);
      }
    };
  
    fetchFavorites();
  }, []); 
  
  useEffect(() => {
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
  useEffect(() => {
    Tts.setDefaultLanguage('en-US'); 
    Tts.setDefaultRate(0.4);         
    Tts.setDefaultPitch(1.0);      
  }, []);


  return (
    <View style={{ flex: 1, padding: 10, marginTop: 40 }}>
      <View >
        <View style={{marginTop:30,}}>
            <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: 'center' }}>{unitId}</Text>
        </View>
       
        <TouchableOpacity
          style={{ position: 'absolute', left: 10,}}
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
          }}
        >
          <Image source={require('../../assets/images/back1.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={vocabulary}
        keyExtractor={(item) => item.word}
        renderItem={({ item }) => (
          <TouchableOpacity
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
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <TouchableOpacity
                onPress={(event) => {
                  event.stopPropagation();
                  Tts.speak(item.word);
                }}
              >
                <Image
                  source={require('../../assets/images/sound.png')}
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
              </TouchableOpacity>
              <Text style={{ fontStyle: 'italic', color: 'gray' }}>{item.phonetic}</Text>
            </View>
            <Text numberOfLines={2} style={{ fontWeight: 'bold', marginTop: 5 }}>
              definition: {item.definition}
            </Text>

            
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
