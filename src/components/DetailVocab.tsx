import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigations/type';
import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';


type DetailVocabRouteProp = RouteProp<RootStackParamList, 'DetailVocab'>;

type Props = {
  route: DetailVocabRouteProp;
};

interface DetailVocab {
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
}

export default function DetailVocab({ route }: Props) {
  const { topicId, topicTitle } = route.params; 
  const navigation = useNavigation();
  const [vocabulary, setVocabulary] = useState<DetailVocab[]>([]);


  useEffect(() => {
    const getVocabulary = async () => {
      try {
        const snapshot = await firestore()
          .collection('vocab')
          .doc(topicId)
          .collection('words')
          .get();

        const vocabList: DetailVocab[] = snapshot.docs.map(doc => doc.data() as DetailVocab);
        setVocabulary(vocabList);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách từ vựng. Vui lòng thử lại sau.');
      }
    };

    getVocabulary();
  }, [topicId]);


  return (
    <View style={{ flex: 1, padding: 10, marginTop: 40 }}>
        <View>
            <TouchableOpacity
                style={{position: 'absolute',
                    top:-10,
                    left: 10,
                    zIndex: 10,
                    padding: 5,}}
                onPress={() => {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                }
                }}
            >
            <Image style={{width: 30,
                height: 30,
                resizeMode: 'contain',
            }} 
            source={require('../assets/images/back1.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginBottom: 10, alignSelf: 'center' }}>
        {String(topicTitle)}
      </Text>
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
            <Text style={{ fontWeight: 'bold' }}>Word: {String(item.word)}</Text>
            <Text style={{ fontWeight: 'bold' }}>Part of Speech: {String(item.partOfSpeech)}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <TouchableOpacity
                onPress={(event) => {
                  event.stopPropagation();
                  Tts.speak(String(item.word));
                }}
              >
                <Image
                  source={require('../assets/images/sound.png')}
                  style={{ width: 20, height: 20, marginRight: 8 }}
                />
              </TouchableOpacity>
              <Text style={{ fontStyle: 'italic', color: 'gray' }}>{String(item.phonetic)}</Text>
            </View>
            <Text numberOfLines={2} style={{ fontWeight: 'bold', marginTop: 5 }}>
              Definition: {String(item.definition)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
