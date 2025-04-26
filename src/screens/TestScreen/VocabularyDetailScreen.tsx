import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import topicData from '../../questions/school_vocabulary_questions.json';
import { useNavigation, useRoute } from '@react-navigation/native';


const TestItem: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { topicId } = route.params as { topicId: number };

  const topic = Array.isArray(topicData) ? topicData.find(t => t.topicId === topicId) : null;

  const [answers, setAnswers] = useState<{ [key: number]: string | null }>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  if (!topic) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No questions found for this topic.</Text>
      </View>
    );
  }

  const handleAnswerPress = (questionIndex: number, selectedOption: string) => {
    const currentAnswer = answers[questionIndex];
    if (currentAnswer !== undefined) return;

    const isCorrect = selectedOption === topic.questions[questionIndex].answer;

    setAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };


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
          <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
        </TouchableOpacity>
        <Text style={styles.header}>{topic.topicName}</Text>
      </View>

      {/* Hiển thị số câu đúng/sai */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Correct: {correctCount}</Text>
        <Text style={styles.scoreText}>Incorrect: {incorrectCount}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {topic.questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{index + 1}. {question.question}</Text>
            <View style={styles.optionsContainer}>
              {question.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionButton,
                    answers[index] === option
                      ? option === question.answer
                        ? styles.correct
                        : styles.incorrect
                      : null,
                  ]}
                  onPress={() => handleAnswerPress(index, option)}
                  disabled={answers[index] !== undefined} 
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Nút Finish */}
      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => {
          navigation.navigate('EndTest', { correctCount });
        }}
        
      >
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { marginTop: 20, paddingHorizontal: 10 },
  header: {
    paddingTop: 35,
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
  },
  backButton: { position: 'absolute', top: 40, left: 30, zIndex: 10 },
  backIcon: { width: 30, height: 30, resizeMode: 'contain' },
  scoreContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 20,left:20, },
  scoreText: { color: 'black', fontSize: 18 },
  questionContainer: { marginBottom: 20, borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 10 },
  questionText: { color: 'black', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    width: '45%',
    alignItems: 'center',
  },
  optionText: { color: 'black', fontSize: 16 },
  correct: { backgroundColor: '#5EBB1A', borderColor: '#00ff00' },
  incorrect: { backgroundColor: '#E91D25', borderColor: '#ff0000' },
  finishButton: { backgroundColor: '#62D1F9', borderRadius: 10, padding: 12, marginTop: 15, width: '90%', alignItems: 'center', alignSelf: 'center' },
  finishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorText: { fontSize: 20, color: 'red', textAlign: 'center', marginTop: 50 },
});

export default TestItem;
