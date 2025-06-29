import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';

interface Specialized {
  faculties: string[];
  selectedFaculty: string | null;
  exerciseTypes: string[];
  selectedExercise: string | null;
  dropdownOpen: boolean;
  loading: boolean;
}

const SpecializedEnglishScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [state, setState] = useState<Specialized>({
    faculties: [],
    selectedFaculty: null,
    exerciseTypes: [],
    selectedExercise: null,
    dropdownOpen: false,
    loading: true,
  });

  // Lấy danh sách khoa
  useEffect(() => {
    const getFaculties = async () => {
      try {
        const snapshot = await firestore()
          .collection('practice')
          .doc('specialized')
          .collection('faculties')
          .get();

        const facultyList = snapshot.docs.map((doc) => doc.id);
        setState((prev) => ({
          ...prev,
          faculties: facultyList,
          selectedFaculty: facultyList[0] || null,
        }));
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khoa:', error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    getFaculties();
  }, []);

  useEffect(() => {
    if (!state.selectedFaculty) return;

    const getExerciseTypes = async () => {
      try {
        const snapshot = await firestore()
          .collection('practice')
          .doc('specialized')
          .collection('faculties')
          .doc(state.selectedFaculty!)

          .collection('exercises')
          .get();

        const types = snapshot.docs.map((doc) => doc.id);
        setState((prev) => ({
          ...prev,
          exerciseTypes: types,
          selectedExercise: types[0] || null,
        }));
      } catch (error) {
        console.error('Lỗi khi lấy loại bài tập:', error);
      }
    };

    getExerciseTypes();
  }, [state.selectedFaculty]);

  const handleNext = () => {
    const { selectedFaculty, selectedExercise } = state;
    if (selectedFaculty && selectedExercise) {
      navigation.navigate('ExerciseScreen', {
        faculty: selectedFaculty,
        exerciseType: selectedExercise,
      });
    } else {
      alert('Vui lòng chọn khoa và loại bài tập');
    }
  };

  if (state.loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/images/back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{t('testtacn')}</Text>
        </View>

        <Text style={styles.sectionTitle}>{t('chonkhoa')}</Text>
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() =>
            setState((prev) => ({ ...prev, dropdownOpen: !prev.dropdownOpen }))
          }
        >
          <Text style={styles.dropdownText}>
            {state.selectedFaculty || 'Đang tải...'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {state.dropdownOpen && (
          <View style={styles.dropdownList}>
            {state.faculties.map((faculty) => (
              <TouchableOpacity
                key={faculty}
                style={styles.dropdownItem}
                onPress={() =>
                  setState((prev) => ({
                    ...prev,
                    selectedFaculty: faculty,
                    dropdownOpen: false,
                  }))
                }
              >
                <Text style={{alignSelf:'center'}}>{faculty}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>{t('chonbaitap')}</Text>
        {state.exerciseTypes.length === 0 ? (
          <Text style={{ color: 'gray', marginBottom: 10 }}>
            {t('khongcobaitapnao')}
          </Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
            {state.exerciseTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectionButton,
                  state.selectedExercise === type && styles.selectedButton,
                ]}
                onPress={() => setState((prev) => ({ ...prev, selectedExercise: type }))}
              >
                <Text
                  style={[
                    styles.buttonText,
                    state.selectedExercise === type && styles.selectedText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{t('tieptheo')}</Text>
        </TouchableOpacity>
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
  header: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#61BFE7',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  backButton: {
    top: 40,
    left: 20,
    marginBottom: 10,
  },
  title: {
    top: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf:'center',
    right:30,
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownArrow: {
    fontSize: 16,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  dropdownItem: {
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 300,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

