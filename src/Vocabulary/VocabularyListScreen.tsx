import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import vocabularyData from './it.json';
import { RootStackParamList } from '../navigations/type';
import Realm from 'realm';
import Tts from 'react-native-tts';
import { FavoriteWord, getRealm } from '../model/realm'; // Import FavoriteWord và getRealm đúng

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
  const [realm, setRealm] = useState<Realm | null>(null);
  const [favoriteWords, setFavoriteWords] = useState<string[]>([]);

  // Tìm major theo majorName
  const major = vocabularyData
    .flatMap(faculty => faculty.majors)
    .find(m => m.majorName === majorName);

  useEffect(() => {
    const setupRealm = async () => {
      try {
        const realmInstance = await getRealm();
        setRealm(realmInstance);

        // Lấy dữ liệu yêu thích từ Realm
        const favorites = realmInstance.objects<FavoriteWord>('FavoriteWord').map(f => f.word);
        setFavoriteWords([...favorites]);

        // Lắng nghe thay đổi để cập nhật danh sách
        const favoriteResults = realmInstance.objects<FavoriteWord>('FavoriteWord');
        favoriteResults.addListener(() => {
          const updatedFavorites = favoriteResults.map(f => f.word);
          setFavoriteWords([...updatedFavorites]);
        });
      } catch (error) {
        console.error('Lỗi mở Realm:', error);
      }
    };

    setupRealm();

    return () => {
      if (realm) {
        realm.close();
        setRealm(null);
      }
    };
  }, []);

  if (!major) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Không tìm thấy ngành {majorName}</Text>
      </View>
    );
  }

  const isFavorite = (item: VocabularyItem) => favoriteWords.includes(item.word);

  const toggleFavorite = (item: VocabularyItem) => {
    if (!realm) return;

    try {
      realm.write(() => {
        if (isFavorite(item)) {
          // Xóa từ yêu thích
          const wordToRemove = realm.objectForPrimaryKey<FavoriteWord>('FavoriteWord', item.word);
          if (wordToRemove) realm.delete(wordToRemove);
        } else {
          // Thêm vào yêu thích
          realm.create('FavoriteWord', { word: item.word, majorName });
        }
      });
    } catch (error) {
      console.error('Lỗi trong realm.write:', error);
    }
  };

  const onPressWord = (word: VocabularyItem) => {
    navigation.navigate('VocabularyItemScreen', { word });
  };

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 40 }}>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10, alignSelf: 'center' }}>{majorName}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', left: 10 }}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/back1.png')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={major.vocabulary}
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
            <Text style={{ fontWeight: 'bold' }}>{item.word}</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.partOfSpeech}</Text>
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

            <Text numberOfLines={2}>{item.definition}</Text>
            <TouchableOpacity
              onPress={(event) => {
                event.stopPropagation();
                toggleFavorite(item);
              }}
              style={{ position: 'absolute', top: 35, right: 10, padding: 5 }}
            >
              <Image
                source={
                  isFavorite(item)
                    ? require('../assets/images/fill.png')
                    : require('../assets/images/love.png')
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
