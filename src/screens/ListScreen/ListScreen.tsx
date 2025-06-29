import React, { useEffect, useState } from 'react';
import {View, Text, Image,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import TrackPlayer from 'react-native-track-player';
import { getRealm, SearchedWord } from '../../model/realm';

const ListScreen = () => {
  const [words, setWords] = useState<SearchedWord[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
  let realm: Realm;
  let results: Realm.Results<SearchedWord>;
  let listener: Realm.CollectionChangeCallback<SearchedWord>;

  const getWordsSearch = async () => {
    realm = await getRealm();
    results = realm.objects<SearchedWord>('SearchedWord').sorted('searchedAt', true);
    setWords([...results]);

    listener = () => {
      setWords([...results]);
    };

    results.addListener(listener);
  };

  getWordsSearch();

  return () => {
    if (results && results.isValid()) {  
      results.removeListener(listener);
    }
    if (realm && !realm.isClosed) {
      realm.close();
  }
};

}, []);
  const deleteWord = async (word: string) => {
    const realm = await getRealm();
    realm.write(() => {
      const item = realm.objectForPrimaryKey<SearchedWord>('SearchedWord', word);
      if (item) realm.delete(item);
    });
    const data = realm.objects<SearchedWord>('SearchedWord').sorted('searchedAt', true);
    setWords([...data]);
  };

  const playAudio = async (audioUrl: string) => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: `${Date.now()}`,
        url: audioUrl,
        title: 'Audio',
        artist: 'Dictionary',
      });
      await TrackPlayer.play();
    } catch (error) {
      console.error('Audio play error:', error);
      Alert.alert(t('error'), t('cannotPlayAudio'));
    }
  };

  const renderItem = ({ item }: { item: SearchedWord }) => (
    <View style={styles.item}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.word}>{item.word} 
              <Text style={styles.phonetic}>[{item.phonetic}]</Text>
          </Text>
          <Text style={styles.meaning}>{item.meaning}</Text>
          <Text style={styles.pos}>{item.partOfSpeech}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => playAudio(item.audio)} style={styles.iconBtn}>
            <Image source={require('../../assets/images/sound.png')} 
             style={{ width: 20, height: 20, marginRight: 8 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(t('confirmDelete'), '', [
                { text: t('cancel'), style: 'cancel' },
                { text: t('delete'), style: 'destructive', onPress: () => deleteWord(item.word) },
              ])
            }
            style={styles.iconBtn}
          >
            <Image source={require('../../assets/images/delete.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const EmptyComponent = () => (
    <View style={{ alignItems: 'center', marginTop: 40 }}>
      <Text>{t('notfound')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>  
        <View style={styles.header}>
          <Image source={require('../../assets/images/ds.png')} style={styles.avatarImage} />
          <View style={styles.profileContainer}>
            <Image source={require('../../assets/images/notebook.png')} style={styles.avatarImageText} />
          </View>
        </View>
        <FlatList
          data={words}
          keyExtractor={(item) => item.word}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
   header: {
      width: '100%',
      height:160,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 20, 
      backgroundColor: '#61BFE7', 
      borderBottomLeftRadius: 50, 
      borderBottomRightRadius: 50 
      },
   avatarImage: { width: 100, height: 100 ,left:10,top:20,},

    profileContainer: { flexDirection: 'row', alignItems: 'center' },
    avatarImageText:{
        width:150, 
        height: 19 ,
        right:60,
        top:20,
    },
  item: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  phonetic: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  meaning: {
    fontSize: 16,
    marginTop: 4,
  },
  pos: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 12,
  },
  icon: {
    width: 23,
    height: 24,
    tintColor: '#333',
  },
    ImageItem:{
      width:80,
      height:80,
      marginTop:20,

    },
    text:{
      color:'#fff',
      fontSize:18,
      top:5
    },
    btn:{
      
      width:200,
      height:40,
      backgroundColor:'#fff',
      borderRadius:20,
      marginTop:20,
    },
    TextBtn:{
      fontSize:16,
      textAlign:'center',
      marginTop:10,
    }
});

export default ListScreen;
