import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import topicData from '../../questions/preposition_questions.json';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigations/type';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const TestItem: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { topicId } = route.params as { topicId: number };

  const topic = Array.isArray(topicData) ? topicData.find(t => t.topicId === topicId) : null;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  if (!topic) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No questions found for this topic.</Text>
      </View>
    );
  }

  const question: Question | undefined = topic?.questions[currentIndex];


  const handleAnswer = (selectedOption: string) => {
    if (!question) return; // Tránh lỗi nếu question là undefined
  
    if (selectedOption === question.answer) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };
  

  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrectAnswer = question ? answer === question.answer : false;

    setIsCorrect(isCorrectAnswer);
    handleAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (currentIndex < topic.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setTimeout(() => {
        navigation.navigate(Screens.EndTest, { correctCount });
      }, 500);
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
          }}>
          <Image style={styles.backIcon} source={require('../../assets/images/back.png')} />
        </TouchableOpacity>
        <Text style={styles.header}>{topic.topicName}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Correct: {correctCount}</Text>
        <Text style={styles.scoreText}>Incorrect: {incorrectCount}</Text>
      </View>
      <Text style={styles.statusText}>Question {currentIndex + 1}/{topic.questions.length}</Text>
      <Text style={styles.questionText}>{question?.question ?? "No question available"}</Text>
      <View style={styles.optionsContainer}>
        {question?.options?.map((option, index) => (
            <TouchableOpacity
            key={index}
            style={[styles.optionButton, selectedAnswer === option && (isCorrect ? styles.correct : styles.incorrect)]}
            onPress={() => handleAnswerPress(option)}
            disabled={selectedAnswer !== null}>
            <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
        )) ?? <Text style={styles.errorText}>No options available</Text>}
        </View>
      {selectedAnswer !== null && (
        <Text style={isCorrect ? styles.correctText : styles.incorrectText}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </Text>
      )}
      {selectedAnswer !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>{currentIndex < topic.questions.length - 1 ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  header: { paddingTop: 35, width: '100%', backgroundColor: '#78C93C', padding: 15, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff' },
  backButton: { position: 'absolute', top: 30, left: 10, zIndex: 10, padding: 5 },
  backIcon: { width: 30, height: 30, resizeMode: 'contain' },
  scoreContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 20 },
  scoreText: { color: 'black', fontSize: 18 },
  statusText: { color: 'black', fontSize: 16, marginTop: 20 },
  questionText: { color: 'black', fontSize: 18, marginTop: 30, textAlign: 'center' },
  optionsContainer: { width: '90%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  optionButton: { width: '48%', padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  optionText: { color: 'black', fontSize: 16 },
  correct: { backgroundColor: '#5EBB1A', borderColor: '#00ff00' },
  incorrect: { backgroundColor: '#E91D25', borderColor: '#ff0000' },
  correctText: { color: '#00ff00', fontSize: 16, marginTop: 10 },
  incorrectText: { color: '#ff0000', fontSize: 16, marginTop: 10 },
  nextButton: { backgroundColor: '#5EBB1A', borderRadius: 10, padding: 12, marginTop: 15, width: '90%', alignItems: 'center' },
  nextButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  errorText: { fontSize: 20, color: 'red', textAlign: 'center', marginTop: 50 }
});

export default TestItem;
