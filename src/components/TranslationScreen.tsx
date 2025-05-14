import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

interface Question {
  id: string;
  question: string;
  options: { [key: string]: string }; // A, B, C, D
  answer: string; // "A", "B", "C", "D"
}

const TranslationScreen = ({ faculty }: { faculty: string }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState<string>('');
  const navigation = useNavigation();

  const fetchQuestions = async () => {
    try {
      const docSnapshot = await firestore()
        .collection('practice')
        .doc('specialized')
        .collection('faculties')
        .doc(faculty)
        .collection('exercises')
        .doc('Translation')
        .get();

      const data = docSnapshot.data();
      setTitle(data?.title || 'Translation');

      const formattedQuestions = Object.entries(data || {})
        .filter(([key]) => key.startsWith('question'))
        .map(([key, value]: [string, any]) => ({
          id: key,
          question: value.question,
          options: value.options,
          answer: value.answer,
        }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [faculty]);

  const handleSelect = (questionId: string, choice: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: choice }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: 70, backgroundColor: '#62D1F9', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} source={require('../assets/images/back1.png')} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <ScrollView style={{ padding: 10 }}>
        {questions.map((q, index) => {
          const selected = selectedAnswers[q.id];
          const correctAnswer = q.answer;

          return (
            <View key={q.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>{index + 1}. {q.question}</Text>

              {Object.entries(q.options).map(([key, value]) => {
                  const isSelected = selected === key;
                  const isCorrect =
                    submitted && q.options[selected || ''] === q.answer && value === q.answer;
                  const isWrongSelected =
                    submitted && isSelected && q.options[key] !== q.answer;

                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleSelect(q.id, key)}
                      style={[
                        styles.optionButton,
                        isCorrect
                          ? styles.correctOption
                          : isWrongSelected
                          ? styles.wrongOption
                          : isSelected && !submitted
                          ? styles.selectedOption
                          : null,
                      ]}
                    >
                      <Text style={styles.optionText}>{value}</Text>
                    </TouchableOpacity>
                  );
                })}


                {submitted && (
                  <Text style={styles.answerText}>
                    Đáp án đúng: {correctAnswer}. {q.options[correctAnswer]}
                  </Text>
                )}
            </View>
          );
        })}

        {!submitted && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Nộp bài</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
   correctOption: {
    backgroundColor: '#78C93C', // ✅ Xanh lá nếu đúng
  },
  wrongOption: {
    backgroundColor: 'red', // ❌ Đỏ nếu sai
  },
  selectedOption: {
    backgroundColor: '#2196F3', // 🔵 Xanh dương nếu đang chọn nhưng chưa nộp bài
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
  answerText: {
    marginTop: 10,
    fontStyle: 'italic',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default TranslationScreen;
