import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

interface Question {
  id: string;
  number: number;
  option: string;
  answer: string;
}

interface Pair {
  letter: string;
  word: string;
}

const CollocationScreen = ({ faculty }: { faculty: string }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [pairs, setPairs] = useState<Pair[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const navigation = useNavigation();
    const [title, setTitle] = useState<string>('');
    const fetchQuestions = async () => {
    try {
        const docSnapshot = await firestore()
            .collection('practice')
            .doc('specialized')
            .collection('faculties')
            .doc(faculty)
            .collection('exercises')
            .doc('collocation')
            .get();

        if (!docSnapshot.exists) {
            console.error('Không tìm thấy dữ liệu!');
        return;
        }
       
      
        const data = docSnapshot.data();
            setTitle(data?.title || 'Translation');
            if (!data || !data.questions || !data.pairs) {
            console.error('Dữ liệu không hợp lệ!');
             
        return;
        }

        // Xử lý câu hỏi
        const questions = Object.entries(data.questions).map(([key, q]: [string, any]) => ({
            id: key,
            number: q.number,
            option: q.option,
            answer: q.answer,
            }));

        // Xử lý pairs từ object thành array
        const pairObject = data.pairs;
        const pairs = Object.entries(pairObject)
            .map(([letter, word]) => ({
                letter,
                word: word as string,
            }))
            .sort((a, b) => a.letter.localeCompare(b.letter));
        setQuestions(questions);
        setPairs(pairs);
        } catch (error) {
            console.error('Lỗi khi lấy câu hỏi:', error);
        }
    };


    useEffect(() => {
        fetchQuestions();
    }, [faculty]);

    const handleInputChange = (questionId: string, text: string) => {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [questionId]: text.trim().toLowerCase() }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <SafeAreaView style={{flex:1}}>
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
                <View style={{ marginTop: 16,left:10 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 8,fontSize:16 }}>{t('danhsach')}:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {pairs.map((p, idx) => (
                        <View key={idx} style={{ flexDirection: 'row', marginRight: 12, marginBottom: 8 }}>
                            <Text>{p.letter}. </Text>
                            <Text>{p.word}</Text>
                        </View>
                        ))}
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.tableContainer}>
                        {questions.map((q) => {
                        const userAnswer = answers[q.id];
                        const isCorrect = userAnswer === q.answer?.toLowerCase();

                        return (
                            <View key={q.id} style={styles.rowContainer}>
                                <Text style={styles.leftText}>{q.number}. {q.option}</Text>
                            
                            <TextInput
                                editable={!submitted}
                                style={[
                                styles.input,
                                submitted && {
                                    backgroundColor: isCorrect ? '#4CAF50' : '#F44336',
                                },
                                ]}
                                onChangeText={(text) => handleInputChange(q.id, text)}
                                value={answers[q.id] || ''}
                                placeholder={t('nhapdapan')}
                            />                           
                            </View>                           
                        );
                        })}
                       
                    </View>
                    {!submitted && (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>{t("kiemtra")}</Text>
                    </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
        
        
    );
    };

const styles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        top:30,
        color:'#fff'
    },
    tableContainer: {
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
       
    },
    leftText: {
        width: '50%',
        fontSize: 16,
    },
    input: {
        backgroundColor: '#eee',
        width:150,
        height:50,
        borderRadius: 6,
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

export default CollocationScreen;
