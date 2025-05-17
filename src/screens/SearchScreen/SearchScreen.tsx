import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Image, ActivityIndicator, Keyboard } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { State } from 'react-native-track-player';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';
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
  const [phonetic, setPhonetic] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [meaning, setMeaning] = useState('');
  const [saved, setSaved] = useState(false);
  const { t } = useTranslation();
  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
  
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`);
      if (!response.ok) {
        throw new Error('Không tìm thấy từ');
      }
      const json = await response.json();
      const entry = json[0];
  
      const wordItem: WordItem = {
        word: entry.word,
        meaning: entry.meanings[0]?.definitions[0]?.definition || '',
        partOfSpeech: entry.meanings[0]?.partOfSpeech || '',
        example: entry.meanings[0]?.definitions[0]?.example || 'No example available.',
        phonetic: entry.phonetic || (entry.phonetics[0]?.text || ''),
        audio: entry.phonetics[0]?.audio || '',
      };
      setPhonetic(wordItem.phonetic);
      setPartOfSpeech(wordItem.partOfSpeech);
      setMeaning(wordItem.meaning);
      setSearchResults([wordItem]);
      setSaved(false);
      if (!searchHistory.includes(searchQuery)) {
        setSearchHistory([searchQuery, ...searchHistory]);
      }
    } catch (err: any) {
      console.error('Lỗi khi tìm kiếm:', err);
      setError(err.message || 'Có lỗi xảy ra');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    if (!searchQuery.trim()) return;
  
    const newWord = {
      word: searchQuery.trim(),
      phonetic: phonetic.trim(),
      partOfSpeech: partOfSpeech.trim(),
      meaning: meaning.trim(),
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
  
    try {
      await firestore().collection('notebook').add(newWord);
      setSaved(true);
      Keyboard.dismiss();
    } catch (error) {
      console.error('Lỗi khi lưu từ:', error);
      alert('Không thể lưu từ!');
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
    <FlatList
      data={searchResults}
      keyExtractor={(item, index) => `${item.word}-${index}`}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.resultItem}
        >
          <View>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>Word:</Text> {item.word}</Text>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>Phonetic:</Text> {item.phonetic}</Text>
            <TouchableOpacity onPress={() => playAudio(item.audio)}>
              <Text style={{ fontSize: 24 }}>🔊</Text>
            </TouchableOpacity>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>Part of Speech:</Text> {item.partOfSpeech}</Text>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>Meaning:</Text> {item.meaning}</Text>
            <Text style={styles.resultText}><Text style={{ fontWeight: 'bold' }}>Example:</Text> {item.example}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
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
      <View>
        <TouchableOpacity
          style={[styles.saveButton, saved && styles.savedButton]}
          onPress={handleSave}
        >
          
          <Text style={styles.saveButtonText}>{saved ? t('saved') : t('save')}</Text>
        </TouchableOpacity>
      </View>
      {/*check*/}
      {!searchQuery.trim() && (
        <View style={styles.guideBox}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/timkiem2.png')}
              style={styles.catImage}
            />
            <Text style={styles.guideText}>
              {t('huongdan')}
            </Text>
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
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

