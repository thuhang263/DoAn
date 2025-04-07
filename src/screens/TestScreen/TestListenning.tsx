import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Tts from 'react-native-tts';

// Load danh sách bài nghe
const lessons = require('../../questions/listening_lessons.json').listening_lessons;

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Lesson {
  id: number;
  title: string;
  category: string;
  text: string;
  questions: Question[];
}

const TestListenning = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Cài đặt TTS 1 lần
  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.2);
  }, []);

  const handleListen = (text: string) => {
    Tts.stop();
    Tts.speak(text);
  };

  const handleCheckAnswer = (correctAnswer: string) => {
    if (!selectedOption) {
      Alert.alert('Thông báo', 'Hãy chọn một đáp án!');
      return;
    }

    setShowResult(true);
    const isCorrect = selectedOption === correctAnswer;
    Alert.alert('Kết quả', isCorrect ? '🎉 Chính xác!' : `❌ Sai rồi! Đáp án đúng là: ${correctAnswer}`);
  };

  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => {
        setSelectedLesson(item);
        setSelectedOption(null);
        setShowResult(false);
      }}
    >
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text style={styles.lessonCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  if (selectedLesson) {
    const question = selectedLesson.questions[0];

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{selectedLesson.title}</Text>
        <Text style={styles.text}>{selectedLesson.text}</Text>

        <TouchableOpacity style={styles.listenBtn} onPress={() => handleListen(selectedLesson.text)}>
          <Text style={styles.listenText}>🔊 Nghe đoạn văn</Text>
        </TouchableOpacity>

        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question.question}</Text>
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  isSelected && styles.selectedOption,
                  showResult && isSelected && option !== question.answer && styles.wrongOption,
                  showResult && option === question.answer && styles.correctOption,
                ]}
                onPress={() => setSelectedOption(option)}
                disabled={showResult}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.checkBtn} onPress={() => handleCheckAnswer(question.answer)}>
          <Text style={styles.checkText}>Kiểm tra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedLesson(null)}>
          <Text style={styles.backText}>⬅ Quay lại</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗣️ Bài nghe tiếng Anh</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLesson}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  lessonItem: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  lessonCategory: {
    color: 'gray',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
  listenBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  listenText: {
    color: '#fff',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#eaeaea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#d0e8ff',
  },
  correctOption: {
    backgroundColor: '#90ee90',
  },
  wrongOption: {
    backgroundColor: '#ffcccb',
  },
  optionText: {
    fontSize: 16,
  },
  checkBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  checkText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  backBtn: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 10,
  },
  backText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TestListenning;
