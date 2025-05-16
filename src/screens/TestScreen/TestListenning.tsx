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
  SafeAreaView,
} from 'react-native';
import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';

interface Question {
  question: string;
  answer: 'True' | 'False';
}

interface Lesson {
  id: number;
  title: string;
  text: string;
  questions: Question[];
}

const TestListenning = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: 'True' | 'False' | null }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
  const navigation = useNavigation();

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.3);
    Tts.setDefaultPitch(1.2);
  }, []);

  useEffect(() => {
    const fetchListeningParts = async () => {
      try {
        const snapshot = await firestore()
          .collection('practice')
          .doc('basic')
          .collection('exercises')
          .doc('Listening')
          .collection('parts')
          .get();

        const partsData: Lesson[] = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            id: Number(doc.id.replace('part', '')) || 0,
            title: data.title,
            category: data.category,
            text: data.transcript,
            questions: data.questions,
          };
        });

        setLessons(partsData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu listening:', error);
      }
    };

    fetchListeningParts();
  }, []);

  const handleListen = (text: string) => {
    Tts.stop();
    Tts.speak(text);
  };

  const handleSelectOption = (questionIndex: number, option: 'True' | 'False') => {
    if (showResults[questionIndex]) return;
    setSelectedOptions(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleCheckAnswer = (questionIndex: number) => {
    if (selectedOptions[questionIndex] === undefined || selectedOptions[questionIndex] === null) {
      Alert.alert('Thông báo', 'Hãy chọn True hoặc False!');
      return;
    }

    setShowResults(prev => ({ ...prev, [questionIndex]: true }));

    const correctAnswer = selectedLesson?.questions[questionIndex].answer;
    const isCorrect = selectedOptions[questionIndex] === correctAnswer;
    Alert.alert('Kết quả', isCorrect ? 'Chính xác!' : `Sai rồi! Đáp án đúng là: ${correctAnswer}`);
  };

  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => {
        setSelectedLesson(item);
        setSelectedOptions({});
        setShowResults({});
      }}
      
    >
      <Image
          source={require('../../assets/images/nghe2.png')} 
          style={{width: 60,
          height: 60,
          borderRadius: 10,
          marginRight: 12,
          borderWidth: 1,
          borderColor: '#ddd',}}
      />
      <Text style={styles.lessonTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (selectedLesson) {
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedLesson(null)}>
            <Image style={styles.backBtn} source={require('../../assets/images/back1.png')} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>{selectedLesson.title}</Text>
            <Text style={styles.text}>{selectedLesson.text}</Text>
            <TouchableOpacity onPress={() => handleListen(selectedLesson.text)}>
              <Image style={styles.listenBtn} source={require('../../assets/images/loa.png')} />
            </TouchableOpacity>

            {selectedLesson.questions.map((question, index) => {
              const selectedOption = selectedOptions[index];
              const showResult = showResults[index];
              const correctAnswer = question.answer;

              return (
                <View key={index} style={styles.questionContainer}>
                  <Text style={styles.question}>{`${index + 1}. ${question.question}`}</Text>

                  {(['True', 'False'] as ('True' | 'False')[]).map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === correctAnswer;

                    return (
                      <TouchableOpacity
                        key={idx}
                        style={[
                          styles.option,
                          isSelected && showResult && {
                            backgroundColor: isCorrect ? '#4CAF50' : '#F44336',
                          },
                          isSelected && !showResult && {
                            backgroundColor: '#2196F3',
                          },
                          !isSelected && showResult && isCorrect && {
                            backgroundColor: '#4CAF50',
                          },
                        ]}
                        onPress={() => handleSelectOption(index, option)}
                        disabled={showResult}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    );
                  })}

                  <TouchableOpacity
                    style={[styles.checkAnswerBtn, showResult && styles.disabledBtn]}
                    onPress={() => handleCheckAnswer(index)}
                    disabled={showResult}
                  >
                    <Text style={{ color: '#fff' }}>Kiểm tra</Text>
                  </TouchableOpacity>
                </View>

              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
      
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <Text style={{color:'#fff', fontSize:18, left:110, top:10}}>Listening Now!</Text>
      </View>

      <FlatList
        data={lessons}
        keyExtractor={item => item.id.toString()}
        renderItem={renderLesson}
        contentContainerStyle={{  padding: 20 }}
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
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 16,
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
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
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
  optionText: {
    fontSize: 16,
  },
  checkAnswerBtn: {
    backgroundColor: '#62D1F9',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  disabledBtn: {
    backgroundColor: '#a0cfee',
  },
  backBtn: {
    width: 40,
    height: 40,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 35,
    width: 410,
    backgroundColor: '#62D1F9',
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
  content: {
    padding: 20,
  },

});

export default TestListenning;
