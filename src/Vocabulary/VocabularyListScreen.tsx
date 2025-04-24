import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import vocabularyData from './it.json';
import { RootStackParamList } from '../navigations/type';
import { FavoriteWord } from '../model/FavoriteWord';
import Realm from 'realm';
import Tts from 'react-native-tts';
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const isFavorite = (item: VocabularyItem) => favorites.includes(item.word);
  // Tìm major theo majorName
  const major = vocabularyData
  .flatMap(faculty => faculty.majors)
  .find(m => m.majorName === majorName);


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
 

  useEffect(() => {
    const openRealm = async () => {
      try {
        const realmInstance = await Realm.open({
          schema: [FavoriteWord],
        });
        setRealm(realmInstance);
      } catch (error) {
        console.error('Lỗi mở Realm:', error);
      } finally {
        setLoading(false);
      }
    };
  
    openRealm();
  
    return () => {
      if (realm) {
        realm.close();
      }
    };
  }, []);
  useEffect(() => {
   let favoritesResults: Realm.Results<any> | null = null;

    const openRealm = async () => {
      const realmInstance = await Realm.open({
        schema: [FavoriteWord],
      });
      setRealm(realmInstance);

      favoritesResults = realmInstance.objects<FavoriteWord>('FavoriteWord');

      // Cập nhật state favorites ban đầu
      const initialFavorites = Array.from(favoritesResults).map(item => item.word);
      setFavorites(initialFavorites);

      
      favoritesResults.addListener(() => {
        const updatedFavorites = Array.from(favoritesResults!).map(item => item.word);
        setFavorites(updatedFavorites);
      });
    };

    openRealm();

    return () => {
      if (favoritesResults) {
        favoritesResults.removeAllListeners();
      }
      if (realm) {
        realm.close();
      }
    };
  }, []);

  const toggleFavorite = (item: VocabularyItem) => {
    console.log('toggleFavorite called with word:', item.word);
    if (!realm) {
      console.log('Realm chưa sẵn sàng');
      return;
    }
  
    const isFav = favorites.includes(item.word);
  
    try {
      realm.write(() => {
        console.log('realm.write bắt đầu');
        if (isFav) {
          const toDelete = realm.objectForPrimaryKey<FavoriteWord>('FavoriteWord', item.word);
          console.log('Tìm đối tượng để xóa:', toDelete);
          if (toDelete) {
            realm.delete(toDelete);
            console.log('Đã xóa:', item.word);
          }
        } else {
          realm.create('FavoriteWord', {
            word: item.word,
            majorName,
          });
          console.log('Đã thêm:', item.word);
        }
      });
    } catch (error) {
      console.error('Lỗi trong realm.write:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 10,marginTop:40, }}>
      <View>
        <Text style={{ fontSize: 20, marginBottom: 10,alignSelf:'center' }}>{majorName}</Text>
          <TouchableOpacity
            style={{
              position: 'absolute',           
              left: 10,                    
                      

            }}
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
              position: 'relative'
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.word}</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.partOfSpeech}</Text>
             {/* Phát âm */}
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                onPress={(event) => {
                  event.stopPropagation();
                  Tts.speak(item.word);
                }}
                style={{ position: 'absolute', width:20, height:20, }}
              >
                <Image
                  source={require('../assets/images/sound.png')}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>
              <Text style={{ fontStyle: 'italic', color: 'gray',left:30, }}>{item.phonetic}</Text>
            </View>
            
            <Text numberOfLines={2}>{item.definition}</Text>
            <TouchableOpacity
                onPress={(event) => {
                  event.stopPropagation();  // Ngăn sự kiện lan lên TouchableOpacity cha
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


