
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import preposition_questions from '../../questions/preposition_questions.json';
import {useNavigation} from '@react-navigation/native';

import {Screens} from '../../navigations/type'; // Đảm bảo import đúng

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const TestReading: React.FC = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const question: Question = preposition_questions.preposition_questions[currentIndex];
  

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === question.answer) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
    }
  };
  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrectAnswer = answer === question.answer;
    setIsCorrect(isCorrectAnswer);
    handleAnswer(answer);
  };
  const handleNextQuestion = () => {
    if (currentIndex < preposition_questions.preposition_questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setTimeout(() => {
        navigation.navigate(Screens.EndTest, {correctCount});
      }, 500); // Thêm độ trễ để UI cập nhật trước khi chuyển màn
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
                    navigation.navigate('HomeScreen'); // Chuyển về Home nếu không có màn nào để quay lại
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
      <View style={styles.scoreContainer}>
        <View style={styles.correctItem}>
          <Text style={styles.scoreText}>Correct: {correctCount}</Text>
        </View>
        <View style={styles.incorrectItem}>
          <Text style={styles.scoreText}>Incorrect: {incorrectCount}</Text>
        </View>
      </View>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          Question {currentIndex + 1}/{preposition_questions.preposition_questions.length}
        </Text>
      </View>
      
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option &&
                (isCorrect ? styles.correct : styles.incorrect),
            ]}
            onPress={() => handleAnswerPress(option)}
            disabled={selectedAnswer !== null}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedAnswer !== null && (
        <Text style={isCorrect ? styles.correctText : styles.incorrectText}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </Text>
      )}
      {selectedAnswer !== null && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentIndex < preposition_questions.preposition_questions.length - 1
              ? 'Next'
              : 'Finish'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    header: {
      paddingTop: 35, // Đẩy nội dung xuống 30
      width:410,
      backgroundColor: '#78C93C',
      padding: 15,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff',
      height:100,
    },
    correctItem: {
      right: 50,
    },
    incorrectItem: {
      left: 50,
    },
    backButton: {
      position: 'absolute', // Đặt vị trí tuyệt đối
      top: 40,             // Khoảng cách từ đỉnh màn hình
      left: 30,             // Khoảng cách từ trái màn hình
      zIndex: 10,           // Hiển thị trên các thành phần khác
      padding: 5,           // Thêm padding để dễ nhấn
    },
    backIcon: {
      width: 30,  // Chiều rộng ảnh
      height: 30, // Chiều cao ảnh
      resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
    },
    statusBar: {
      top:50,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginVertical: 10,
    },
    statusText: {
      color: 'black',
      fontSize: 16,
    },
    questionText: {
      color: 'black',
      fontSize: 18,
      marginTop:  80,
    },
    correctText: {
      color: '#00ff00',
      fontSize:  16,
      marginTop: 50,
    },
    optionsContainer: {
      width: 353,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      top:30,
    },
    optionButton: {
      width: '48%',
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 10,
    },
    optionText: {
      color: 'black',
      fontSize: 16,
      
    },
    correct: {
      backgroundColor: '#5EBB1A',
      borderColor: '#00ff00',
    },
    incorrect: {
      backgroundColor: '#E91D25',
      borderColor: '#ff0000',
    },
  
    nextButton: {
      backgroundColor: '#5EBB1A',
      borderRadius: 10,
      padding: 12,
      marginTop: 15,
      width: 353,
      alignItems: 'center',
    },
    nextButtonText: {
      color: '#000',
      fontSize:  18,
      fontWeight: 'bold',
    },
    scoreContainer: {
      top:60,
      flexDirection: 'row',
      justifyContent:'space-between',
    },
    scoreText: {
     
      color: 'black',
      fontSize:  18,
      
    },
    incorrectText: {

      color: '#ff0000', // Màu đỏ cho chữ Incorrect
      fontSize: 16,
      marginTop: 50,
    },
  });
export default TestReading;
