import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SpecializedEnglishScreen = () => {
  const navigation = useNavigation();
  
  // State để lưu dữ liệu bài tập đọc
  const [readingExercises, setReadingExercises] = useState<any[]>([]);
 

  useEffect(() => {
  const fetchExercises = async () => {
    try {
      const exercisesSnapshot = await firestore()
        .collection('practice')
        .doc('basic')
        .collection('exercises')
        .get(); 
      if (!exercisesSnapshot.empty) {
        const exercises = exercisesSnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data(), 
        }));
        setReadingExercises(exercises);
        console.log('Fetched exercises:', exercises); 
      } else {
        console.log('No exercises found');
      }
    } catch (error) {
      console.error('Error fetching exercises: ', error);
    }
  };

  fetchExercises(); 
}, []); 
  const navigateToExerciseScreen = (exerciseId: string) => {
      switch (exerciseId.toLowerCase()) {
        case 'reading':
          navigation.navigate('TestReading');
          break;
        case 'listening':
          navigation.navigate('TestListenning');
          break;
        case 'writing':
          navigation.navigate('TestWriting');
          break;
        default:
          console.warn('Không có màn hình tương ứng với:', exerciseId);
      }
    };


  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <View style={{
        width: 360,
        height:140,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 20,
        backgroundColor: '#61BFE7', 
        borderBottomLeftRadius: 50, 
        borderBottomRightRadius: 50 
      }}>
          <View>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image style={{ width: 30, height: 30,top:30, left:20, }}
                  source={require('../../assets/images/back1.png')} />
              </TouchableOpacity>
                <Text style={styles.title}>Ôn tập cơ bản</Text>
           </View>
      </View>
     
      <Text style={styles.sectionTitle}>Các bài tập</Text>
      <View style={styles.content}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {readingExercises.length > 0 ? (
            readingExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={styles.selectionButton}
                onPress={() => navigateToExerciseScreen(exercise.id)}
              >
                <Text style={styles.buttonText}>
                  {exercise.id.charAt(0).toUpperCase() + exercise.id.slice(1)}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Chưa có bài tập nào</Text>
          )}
        </ScrollView>
    </View>


    </View>
    </SafeAreaView>
    
  );
};

export default SpecializedEnglishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    left:90,
    color:'#fff'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 10,
  },
  scrollContainer: {
    marginBottom: 10,
  },
  selectionButton: {
    width: 100,
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
    alignSelf: 'center',
    top: 10,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    top:30,
    alignItems: 'center',
  },
  exerciseItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
});
