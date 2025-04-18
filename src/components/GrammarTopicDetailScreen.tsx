import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StackParamsType } from '../navigations/type';
import grammarDataJson from '../Grammar/grammar_structures.json';
import { useNavigation, useRoute } from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu
interface GrammarTopic {
  topicId: number;
  topicName: string;
  name?: string;
  structure: string;
  usage: string[];
  rules?: string[];
  signal_words?: string[];
}

interface GrammarData {
  tenses: GrammarTopic[];
}

const grammarData = grammarDataJson as GrammarData;

const GrammarTopicDetailScreen = () => {
  const navigation = useNavigation<StackParamsType>();
  const route = useRoute();
  const { topicId } = route.params as { topicId: number; topicName: string };

  const topic = grammarData.tenses.find(item => item.topicId === topicId);

  if (!topic) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Không tìm thấy nội dung!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{topic.name || topic.topicName}</Text>

      <Text style={styles.label}>Cấu trúc:</Text>
      <Text style={styles.content}>{topic.structure}</Text>

      {topic.usage?.length > 0 && (
        <>
          <Text style={styles.label}>Cách sử dụng:</Text>
          {topic.usage.map((item, index) => (
            <Text key={index} style={styles.bullet}>• {item}</Text>
          ))}
        </>
      )}

      {Array.isArray(topic.rules) && topic.rules.length > 0 && (
        <>
          <Text style={styles.label}>Quy tắc:</Text>
          {topic.rules.map((item, index) => (
            <Text key={index} style={styles.bullet}>• {item}</Text>
          ))}
        </>
      )}

      {Array.isArray(topic.signal_words) && topic.signal_words.length > 0 && (
        <>
          <Text style={styles.label}>Dấu hiệu nhận biết:</Text>
          <Text style={styles.content}>
            {topic.signal_words.join(', ')}
          </Text>
        </>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#61BFE7'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  content: {
    fontSize: 16,
    marginBottom: 10
  },
  bullet: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50
  }
});

export default GrammarTopicDetailScreen;
