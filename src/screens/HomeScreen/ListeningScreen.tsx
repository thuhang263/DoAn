import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Tts from 'react-native-tts';
import listeningData from '../../listening/listening.json';

interface Paragraph {
  id: number;
  title: string;
  content_en: string;
  content_vi: string;
}

const ListenOnly = () => {
  const [currentParagraph, setCurrentParagraph] = useState<Paragraph | null>(null);

  useEffect(() => {
    
    Tts.setDefaultRate(0.5, true);
  }, []);

  const handleSpeak = () => {
    if (!currentParagraph) return;
    Tts.stop();
    Tts.speak(currentParagraph.content_en);
  };

  const renderItem = ({ item }: { item: Paragraph }) => (
    <TouchableOpacity
      style={[
        styles.paragraphCard,
        currentParagraph?.id === item.id && styles.selectedCard,
      ]}
      onPress={() => setCurrentParagraph(item)}
    >
      <Text style={styles.paragraphTitle}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.paragraphPreview}>
        {item.content_en}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        🎧 {listeningData.department} - Luyện nghe
      </Text>

      <FlatList
        data={listeningData.paragraphs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />

      {currentParagraph && (
        <View style={styles.practiceContainer}>
          <Text style={styles.practiceTitle}>{currentParagraph.title}</Text>
          <Text style={styles.paragraph}>{currentParagraph.content_en}</Text>

          <TouchableOpacity style={styles.button} onPress={handleSpeak}>
            <Text style={styles.buttonText}>🔊 Nghe đoạn văn</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ListenOnly;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  list: { maxHeight: 520, marginBottom: 20 },
  paragraphCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    marginBottom: 8,
  },
  selectedCard: {
    backgroundColor: '#BBDEFB',
  },
  paragraphTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  paragraphPreview: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  practiceContainer: {
   
    borderColor: '#ccc',
    paddingTop: 12,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
