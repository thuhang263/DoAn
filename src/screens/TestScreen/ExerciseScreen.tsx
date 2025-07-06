import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/type';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrueFalseScreen from '../../components/TrueFalseScreen'; 
import CollocationScreen from '../../components/CollocationScreen';
import TranslationScreen from '../../components/TranslationScreen';
import { t } from 'i18next';
// Định nghĩa kiểu cho route
type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'ExerciseScreen'>;

type Props = {
  route: ExerciseScreenRouteProp;
  navigation: any;
};

const ExerciseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { faculty, exerciseType } = route.params;
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [checkedAnswers, setCheckedAnswers] = useState<{ [key: string]: boolean }>({});

 
  useEffect(() => {
    if (!faculty || !exerciseType) return;

    const getQuestions = async () => {
      try {
        const snapshot = await firestore()
          .collection('practice')
          .doc('specialized')
          .collection('faculties')
          .doc(faculty)
          .collection('exercises')
          .doc(exerciseType)
          .collection('units')
          .get();

        const unitsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(unitsList);
        setUnits(unitsList);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách unit:', error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [faculty, exerciseType]);

  // Xử lý chọn đáp án
  const handleSelectAnswer = (questionKey: string, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionKey]: option,
    }));
  };

  // Xử lý kiểm tra đáp án
  const handleCheckAnswer = (questionKey: string) => {
    setCheckedAnswers((prev) => ({
      ...prev,
      [questionKey]: true,
    }));
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
    
  }
  if (exerciseType === 'True False') {
    return <TrueFalseScreen faculty={faculty} />;
  }
  if (exerciseType === 'collocation') {
    return <CollocationScreen faculty={faculty} />;
  }
  if (exerciseType === 'Translation') {
    return <TranslationScreen faculty={faculty} />;
  }
  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
        <View>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                }
                }}
                >
                <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
            </TouchableOpacity>       
        </View>
      <Text style={styles.title}> {exerciseType}</Text>

      <ScrollView style={styles.unitList}>
        {units.length === 0 ? (
          <Text style={{ color: 'gray' }}>{t('khongcounits')}</Text>
        ) : (
          units.map((unit, index) => (
            <View key={index} style={styles.unitItem}>
              <Text style={styles.unitTitle}>{unit.name || 'Không có tên'}</Text>

              {/* Hiển thị danh sách câu hỏi */}
              {Object.keys(unit).map((key) => {
                if (key.startsWith('question')) {
                  const question = unit[key];
                  const selectedOption = selectedAnswers[key];
                  const isChecked = checkedAnswers[key];
                  const isCorrect = selectedOption === question.answer;

                  return (
                    <View key={key} style={styles.questionItem}>
                      {/* Hiển thị câu hỏi */}
                      <Text style={styles.questionText}>{question.question || 'Không có câu hỏi'}</Text>

                      <View style={styles.optionsContainer}>
                        {question.options &&
                          Array.isArray(question.options) &&
                          question.options.map((option: string, idx: number) => (
                            <TouchableOpacity
                              key={idx}
                              style={[
                                styles.optionButton,
                                { width: '48%', marginVertical: 5 }, 
                                selectedOption === option
                                  ? isChecked
                                    ? isCorrect
                                      ? styles.correctOption
                                      : styles.wrongOption
                                    : styles.selectedOption 
                                  : null,
                              ]}
                              onPress={() => handleSelectAnswer(key, option)}
                              disabled={isChecked} 
                            >
                              <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                          ))}
                      </View>

                      {/* Nút kiểm tra */}
                      <TouchableOpacity
                        style={styles.checkButton}
                        onPress={() => handleCheckAnswer(key)}
                        disabled={isChecked} 
                      >
                        <Text style={styles.checkButtonText}>{t('kiemtra')}</Text>
                      </TouchableOpacity>

                      {/* Hiển thị đáp án đúng nếu sai */}
                      {isChecked && !isCorrect && (
                        <Text style={styles.correctAnswerText}>
                          {t('DapAn')}: {question.answer}
                        </Text>
                      )}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))
        )}
        </ScrollView>

        
    </View>
    </SafeAreaView>
    
  );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  
  },
  selectedOption: {
  backgroundColor: '#2196F3', 
},
  unitList: {
    flex: 1,
  },
  unitItem: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  unitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  questionItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
  },
  optionButton: {
    width: '48%',
  paddingVertical: 10,
  marginVertical: 5,
  marginHorizontal: '1%', 
  backgroundColor: '#ddd',
  borderRadius: 6,
  alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  correctOption: {
    backgroundColor: '#4CAF50', 
  },
  wrongOption: {
    backgroundColor: '#F44336', 
  },
  checkButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  correctAnswerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#dc3545',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top:-10,
    left: 30,
    zIndex: 10,
    padding: 5,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  backButtonText:{
    fontSize:16
  }
});
