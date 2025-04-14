import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
  const navigation = useNavigation();
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
    Alert.alert('Kết quả', isCorrect ? 'Chính xác!' : `Sai rồi! Đáp án đúng là: ${correctAnswer}`);
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
        <View style={styles.header}>
        <TouchableOpacity  onPress={() => setSelectedLesson(null)}>
            <Image 
            style={styles.backBtn}
            source={require('../../assets/images/back1.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCheckAnswer(question.answer)}>
            <Image 
            style={styles.checkBtn} 
            source={require('../../assets/images/check.png')}
            />
          </TouchableOpacity>

          
        </View>
        
        <View style={styles.content}>
        <Text style={styles.title}>{selectedLesson.title}</Text>
        <Text style={styles.text}>{selectedLesson.text}</Text>
        <TouchableOpacity  onPress={() => handleListen(selectedLesson.text)}>
          <Image
          style={styles.listenBtn}
          source={require('../../assets/images/loa.png')}
          />
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
                source={require('../../assets/images/back1.png')}
              />
                </TouchableOpacity>
                <Text style={styles.header}>Listening Now!</Text>
        </View>
 
     
      
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLesson}
        contentContainerStyle={{ paddingBottom: 20,padding:20, }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width:50,
    height:50,
    alignSelf:'center'
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
   left:250,
   bottom:10,
  },
  checkText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  backBtn: {
   width:40,
   height:40,
  },
  backText: {
    color: '#fff',
    textAlign: 'center',
  },
  header: {
    flexDirection:'row',
    paddingTop: 35, // Đẩy nội dung xuống 30
    width:410,
    backgroundColor: '#62D1F9',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,             // Khoảng cách từ đỉnh màn hình
    left: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khác
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 30,  // Chiều rộng ảnh
    height: 30, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
  content:{
    marginTop:40,
    padding:20,
  },
  
});

export default TestListenning;
