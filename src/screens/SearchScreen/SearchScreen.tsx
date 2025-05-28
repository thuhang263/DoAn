import React, { useState } from 'react';
import {View,TextInput,TouchableOpacity,Text,FlatList,Image,ActivityIndicator,Keyboard,Alert,
} from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import TrackPlayer from 'react-native-track-player';
import { getRealm, SearchedWord } from '../../model/realm';

interface WordItem {
  word: string;
  meaning: string;
  partOfSpeech: string;
  example: string;
  phonetic: string;
  audio: string;
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<WordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const { t } = useTranslation();

  // Lưu từ tìm kiếm vào Realm
  const saveSearchedWord = async (wordItem: WordItem) => {
    try {
      const realm = await getRealm();

      const existing = realm.objectForPrimaryKey<SearchedWord>('SearchedWord', wordItem.word);

      realm.write(() => {
        if (existing) {
          existing.meaning = wordItem.meaning;
          existing.partOfSpeech = wordItem.partOfSpeech;
          existing.example = wordItem.example;
          existing.phonetic = wordItem.phonetic;
          existing.audio = wordItem.audio;
          existing.searchedAt = new Date();
        } else {
          realm.create('SearchedWord', {
            ...wordItem,
            searchedAt: new Date(),
          });
        }
      });

      setSaved(true);
      Alert.alert(t('saved'), t('tuvungdadulieu'));
      Keyboard.dismiss();
    } catch (err) {
      console.error('Lỗi khi lưu từ vào Realm:', err);
      Alert.alert(t('error'), t('khongtheluutu'));
    }
  };

  const handleSearch = async () => {
  if (searchQuery.trim() === '') return;

  setLoading(true);
  setError(null);
  setSaved(false);
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`);
    if (!response.ok) throw new Error(t('khongtimthaytu'));

    const json = await response.json();
    const entry = json[0];

    const wordItem: WordItem = {
      word: entry.word,
      meaning: entry.meanings[0]?.definitions[0]?.definition || '',
      partOfSpeech: entry.meanings[0]?.partOfSpeech || '',
      example: entry.meanings[0]?.definitions[0]?.example || t('noexample'),
      phonetic: entry.phonetic || (entry.phonetics[0]?.text || ''),
      audio: entry.phonetics[0]?.audio || '',
    };

    setSearchResults([wordItem]);

    if (!searchHistory.includes(searchQuery)) {
      setSearchHistory([searchQuery, ...searchHistory]);
    }
  } catch (err: any) {
    console.error('Lỗi khi tìm kiếm:', err);
    setError(err.message || t('loixayra'));
    setSearchResults([]);
  } finally {
    setLoading(false);
  }
};
const handleSave = async () => {
  if (searchResults.length > 0) {
    await saveSearchedWord(searchResults[0]);
  }
};


  const playAudio = async (audioUrl: string) => {
    if (!audioUrl) {
      console.warn('No audio URL to play');
      return;
    }

    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: 'audio1',
        url: audioUrl,
        title: 'Pronunciation',
        artist: 'Dictionary',
      });
      await TrackPlayer.play();
    } catch (error) {
      console.error('Lỗi phát âm:', error);
    }
  };

  const renderHistory = () => (
    <FlatList
      data={searchHistory}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            setSearchQuery(item);
            handleSearch();
          }}
        >
          <Text style={styles.historyItem}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const renderSearchResults = () => (
  <>
    <FlatList
      data={searchResults}
      keyExtractor={(item, index) => `${item.word}-${index}`}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.resultItem} activeOpacity={1}>
          <View>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>{t('word')}:</Text> {item.word}</Text>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>{t('phonetic')}:</Text> {item.phonetic}</Text>
            <TouchableOpacity onPress={() => playAudio(item.audio)}>
              <Image
                source={require('../../assets/images/sound.png')}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            </TouchableOpacity>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>{t('partofspeech')}:</Text> {item.partOfSpeech}</Text>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>{t('meaning')}:</Text> {item.meaning}</Text>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>{t('example')}:</Text> {item.example}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
      <Text style={styles.saveButtonText}>{t('save')}</Text>
    </TouchableOpacity>
  </>
);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/Vocabulary.png')} style={styles.avatarImageText} />
        </View>
        <Image source={require('../../assets/images/timkiem.png')} style={styles.avatarImage} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('search')}
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onFocus={() => setSearchResults([])}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Image source={require('../../assets/images/search2.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {!searchQuery.trim() && (
        <View style={styles.guideBox}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/timkiem2.png')} style={styles.catImage} />
            <Text style={styles.guideText}>{t('huongdan')}</Text>
          </View>
          <View>
            <Text style={styles.stepTitle}>{t('buoc1')}</Text>
            <Text style={styles.stepText}>{t('buoc1.1')}</Text>
            <Text style={styles.stepTitle}>{t('buoc2')}</Text>
            <Text style={styles.stepText}>{t('buoc2.1')}</Text>
          </View>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      )}

      {!loading && !error && (searchResults.length === 0 ? (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>{t('lichsu')}</Text>
          {renderHistory()}
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>{t('ketqua')}</Text>
          {renderSearchResults()}
        </View>
      ))}
    </View>
  );
};

export default SearchScreen;
