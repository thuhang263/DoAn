import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/type';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // Lấy danh sách các unit từ Firestore
  useEffect(() => {
    if (!faculty || !exerciseType) return;

    const fetchUnits = async () => {
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

    fetchUnits();
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
          <Text style={{ color: 'gray' }}>Không có unit nào.</Text>
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
                                { width: '48%', marginVertical: 5 }, // Đảm bảo mỗi nút chiếm gần 50% chiều rộng
                                selectedOption === option
                                  ? isChecked
                                    ? isCorrect
                                      ? styles.correctOption
                                      : styles.wrongOption
                                    : styles.selectedOption // màu khi chỉ chọn nhưng chưa kiểm tra
                                  : null,
                              ]}
                              onPress={() => handleSelectAnswer(key, option)}
                              disabled={isChecked} // Không cho chọn lại sau khi kiểm tra
                            >
                              <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                          ))}
                      </View>

                      {/* Nút kiểm tra */}
                      <TouchableOpacity
                        style={styles.checkButton}
                        onPress={() => handleCheckAnswer(key)}
                        disabled={isChecked} // Không cho kiểm tra lại
                      >
                        <Text style={styles.checkButtonText}>Kiểm tra</Text>
                      </TouchableOpacity>

                      {/* Hiển thị đáp án đúng nếu sai */}
                      {isChecked && !isCorrect && (
                        <Text style={styles.correctAnswerText}>
                          Đáp án đúng: {question.answer}
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
  backgroundColor: '#6BDBFB', 
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
    justifyContent: 'space-between', // Giúp căn đều hai cột
  },
  optionButton: {
    width: '48%',
  paddingVertical: 10,
  marginVertical: 5,
  marginHorizontal: '1%', // đảm bảo có khoảng cách giữa các cột
  backgroundColor: '#ddd',
  borderRadius: 6,
  alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  correctOption: {
    backgroundColor: '#28a745', // Màu xanh khi đúng
  },
  wrongOption: {
    backgroundColor: '#dc3545', // Màu đỏ khi sai
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
