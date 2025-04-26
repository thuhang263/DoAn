import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { State } from 'react-native-track-player';
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

  const navigation = useNavigation();

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
  
      setSearchResults([wordItem]);
  
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
          onPress={() => navigation.navigate('WordDetailScreen', { 
            word: item.word, 
            meaning: item.meaning,
            partOfSpeech: item.partOfSpeech,
            example: item.example,
            phonetic: item.phonetic,
            audio: item.audio,
          })}
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
        <Image source={require('../../assets/images/searchImage.png')} style={styles.avatarImage} />    
      </View>

      <View style={styles.searchContainer}>
        <Image source={require('../../assets/images/search2.png')} style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onFocus={() => setSearchResults([])}
        />
      </View>

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      )}

      {!loading && !error && (searchResults.length === 0 ? (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Lịch sử tìm kiếm</Text>
          {renderHistory()}
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Kết quả tìm kiếm</Text>
          {renderSearchResults()}
        </View>
      ))}
    </View>
  );
};

export default SearchScreen;
