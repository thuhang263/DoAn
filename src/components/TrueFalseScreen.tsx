import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';


interface Question {
  id: string;
  question: string;
  answer: boolean; 
}

const ExerciseScreen = ({ faculty }: { faculty: string }) => {
 
    const [questions, setQuestions] = useState<Question[]>([]); 
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | null }>({});
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState<string>('');
    const navigation = useNavigation();
    const getQuestions = async () => {
    try {
        const docSnapshot = await firestore()
            .collection('practice')
            .doc('specialized')
            .collection('faculties')
            .doc(faculty)
            .collection('exercises')
            .doc('True False')
            .get();

            if (!docSnapshot.exists) {
            console.error('Không tìm thấy dữ liệu!');
            return;
        }

        const data = docSnapshot.data();
            if (!data || !data.questions) {
            console.error('Dữ liệu không hợp lệ hoặc không có câu hỏi!');
            return;
        }

        setTitle(data.title || ''); // Cập nhật tiêu đề từ Firestore

        const questions = data.questions.map((q: any, index: number) => ({
            id: index.toString(),
            question: q.statement,
            answer: q.answer === 'T',
            }));

        setQuestions(questions);
    } catch (error) {
        console.error('Lỗi khi lấy câu hỏi:', error);
    }
    };



  // Gọi hàm fetch khi component mount
    useEffect(() => {
        getQuestions();
    }, [faculty]);

    const handleSelect = (questionId: string, answer: string) => {
        if (submitted) return;
        setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <View style={{flex:1}}>
            <View style={{width: '100%',height:70, backgroundColor:'#62D1F9' }}>
                <View>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    }}
                    >
                        <Image style={styles.backIcon} source={require('../assets/images/back1.png')} />
                    </TouchableOpacity>       
                </View>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            
            <ScrollView style={{  }}>
            
            {questions.map((q, index) => {
                const selected = selectedAnswers[q.id];
                const isCorrect = selected === (q.answer ? 'True' : 'False');

                return (
                <View key={q.id} style={styles.questionContainer}>
                    <Text style={styles.questionText}>{index + 1}. {q.question}</Text>

                    <View style={styles.optionsContainer}>
                    {['True', 'False'].map((label) => {
                        const isSelected = selected === label;
                       

                        return (
                        <TouchableOpacity
                            key={label}
                            onPress={() => handleSelect(q.id, label)}
                            style={[
                            styles.optionButton,
                            isSelected && submitted && {
                                backgroundColor: isCorrect ? '#4CAF50' : '#F44336',
                            },
                            isSelected && !submitted && { backgroundColor: '#2196F3' },
                            ]}
                        >
                            <Text style={styles.optionText}>{label}</Text>
                        </TouchableOpacity>
                        );
                    })}
                    </View>

                    {submitted && (
                    <Text style={styles.answerText}>
                        {t('DapAn')}: {q.answer ? 'True' : 'False'}
                    </Text>
                    )}
                </View>
                );
            })}

            {!submitted && (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>{t('kiemtra')}</Text>
                </TouchableOpacity>
            )}
            </ScrollView>
        </View>
        
        );
    };

const styles = StyleSheet.create({
    questionContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionButton: {
        width:70,
        height:30,
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
    },
    optionText: {
        fontSize: 16,
        color: '#000',
        alignSelf:'center'
    },
    answerText: {
        marginTop: 10,
        fontStyle: 'italic',
        color: '#555',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    titleText:{
        fontSize:16,
        alignSelf:"center",
        top:30,
       color:'#fff'
    },
    backButton: {
    position: 'absolute',
    top:20,
    left: 30,
    zIndex: 10,
    padding: 5,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default ExerciseScreen;
