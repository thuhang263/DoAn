import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

const ReadingScreen: React.FC = () => {
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [checkedAnswers, setCheckedAnswers] = useState<{ [key: string]: boolean }>({});
  const navigation = useNavigation();
  
  useEffect(() => {
  const fetchParts = async () => {
    try {
      const snapshot = await firestore()
        .collection('practice')
        .doc('basic')
        .collection('exercises')
        .doc('Reading')
        .collection('parts')
        .get();

      if (!snapshot.empty) {
        const partsData: any[] = [];
        for (const doc of snapshot.docs) {
          const data = doc.data();
          const part = {
            id: doc.id,
            title: data.title || '',  
            paragraph: data.paragraph || '',  
            content: data.content || '',  
            questions: Object.entries(data)
              .filter(([key]) => key !== 'title' && key !== 'paragraph' && key !== 'content')
              .map(([key, value]) => ({
                question: value.question || key,
                options: value.options || [],
                answer: value.answer || '',
              })),
          };
          partsData.push(part);
        }

        setParts(partsData);
      } else {
        setError('Không có dữ liệu.');
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu parts:', error);
      setError('Đã xảy ra lỗi khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  };

  fetchParts();
}, []);

  const handleSelectAnswer = (questionKey: string, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionKey]: option,
    }));
  };

  const handleCheckAnswer = (questionKey: string) => {
    setCheckedAnswers((prev) => ({
      ...prev,
      [questionKey]: true,
    }));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
  <SafeAreaView style={{ flex: 1 }}>
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
             <Text style={{color:'#fff', fontSize:18, left:110, top:10}}>Reading!</Text>
      </View>
      <ScrollView style={styles.container}>
      {parts.map((part, index) => {
        return (
          <View key={index} style={styles.partBox}>
            <Text style={styles.partTitle}>{part.title || `Part ${index + 1}`}</Text>

            {part.questions && part.questions.length > 0 && part.questions.map((q: any, idx: number) => {
              const questionKey = `${part.id}_q${idx}`;
              const selectedOption = selectedAnswers[questionKey];
              const isChecked = checkedAnswers[questionKey];
              const isCorrect = selectedOption === q.answer;

              return (
                <View key={questionKey} style={styles.questionBox}>
                  <Text style={styles.questionText}>{q.question}</Text>
                  {q.options.map((option: string, opIndex: number) => (
                    <TouchableOpacity
                      key={opIndex}
                      style={[
                        styles.optionButton,
                        selectedOption === option
                          ? isChecked
                            ? isCorrect
                              ? styles.correctOption
                              : styles.wrongOption
                            : styles.selectedOption
                          : null,
                      ]}
                      onPress={() => handleSelectAnswer(questionKey, option)}
                      disabled={isChecked}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={styles.checkButton}
                    onPress={() => handleCheckAnswer(questionKey)}
                    disabled={isChecked}
                  >
                    <Text style={styles.checkButtonText}>{t('kiemtra')}</Text>
                  </TouchableOpacity>
                  {isChecked && !isCorrect && (
                    <Text style={styles.correctAnswerText}>
                     {t('DapAn')}: {q.answer}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
</SafeAreaView>

);

};

export default ReadingScreen;

const styles = StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: '#f9f9f9',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  partBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 3,
  },
  partTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  questionBox: {
    marginTop: 10,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: '#6BDBFB',
  },
  correctOption: {
    backgroundColor: '#28a745',
  },
  wrongOption: {
    backgroundColor: '#dc3545',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  checkButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  correctAnswerText: {
    marginTop: 10,
    color: '#dc3545',
    fontWeight: 'bold',
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
    bottom:40,
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
