import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

// Load danh sách bài đọc từ file JSON
const lessons = require('../../questions/reading_lessons.json').reading_lessons;

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

const TestReading = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [index: number]: string }>({});
  const [showResult, setShowResult] = useState(false);
  const navigation = useNavigation();

  const handleSelectOption = (questionIndex: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleCheckAnswers = () => {
    const unanswered = selectedLesson?.questions.findIndex(
      (_, i) => !selectedOptions.hasOwnProperty(i)
    );
    if (unanswered !== -1) {
      Alert.alert('Thông báo', `Hãy chọn đáp án cho tất cả các câu hỏi!`);
      return;
    }
    setShowResult(true);
  };

  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => {
        setSelectedLesson(item);
        setSelectedOptions({});
        setShowResult(false);
      }}
    >
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text style={styles.lessonCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  if (selectedLesson) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{selectedLesson.title}</Text>
          <Text style={styles.text}>{selectedLesson.text}</Text>

          {selectedLesson.questions.map((question, questionIndex) => (
            <View key={questionIndex} style={styles.questionBlock}>
              <Text style={styles.question}>
                Câu {questionIndex + 1}: {question.question}
              </Text>
              {question.options.map((option, optionIndex) => {
                const isSelected = selectedOptions[questionIndex] === option;
                const isCorrect = showResult && option === question.answer;
                const isWrong =
                  showResult && isSelected && option !== question.answer;

                return (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.option,
                      isSelected && styles.selectedOption,
                      isCorrect && styles.correctOption,
                      isWrong && styles.wrongOption,
                    ]}
                    onPress={() => handleSelectOption(questionIndex, option)}
                    disabled={showResult}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <TouchableOpacity
            style={styles.checkBtn}
            onPress={handleCheckAnswers}
          >
            <Text style={styles.checkText}>Kiểm tra</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedLesson(null)}
          >
            <Text style={styles.backText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('HomeScreen');
            }
          }}
        >
          <Image
            style={styles.backIcon}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Reading</Text>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLesson}
        contentContainerStyle={{ paddingBottom: 20, padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 40,
    padding: 20,
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
  questionBlock: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  option: {
    backgroundColor: '#eaeaea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
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
  header: {
    paddingTop: 35,
    width: 410,
    backgroundColor: '#78C93C',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
    padding: 5,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default TestReading;
