import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SpecializedEnglishScreen = () => {
  const navigation = useNavigation();
  const [faculties, setFaculties] = useState<string[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách khoa
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const snapshot = await firestore()
          .collection('practice')
          .doc('specialized')
          .collection('faculties')
          .get();

        const facultyList = snapshot.docs.map((doc) => doc.id);
        setFaculties(facultyList);
        setSelectedFaculty(facultyList[0] || null);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách khoa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  // Lấy danh sách loại bài tập khi chọn khoa
  useEffect(() => {
    if (!selectedFaculty) return;

    const fetchExerciseTypes = async () => {
      try {
        const snapshot = await firestore()
          .collection('practice')
          .doc('specialized')
          .collection('faculties')
          .doc(selectedFaculty)
          .collection('exercises')
          .get();

        const types = snapshot.docs.map((doc) => doc.id);
        setExerciseTypes(types);
        setSelectedExercise(types[0] || null);
      } catch (error) {
        console.error('Lỗi khi lấy loại bài tập:', error);
      }
    };

    fetchExerciseTypes();
  }, [selectedFaculty]);

  // Hàm xử lý khi bấm nút "Tiếp theo"
  const handleNext = () => {
    if (selectedFaculty && selectedExercise) {
      navigation.navigate('ExerciseScreen', {
        faculty: selectedFaculty,
        exerciseType: selectedExercise,
      });
    } else {
      alert('Vui lòng chọn khoa và loại bài tập');
    }
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
      <View style={{width: 360,
        height:140,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 20,
        backgroundColor: '#61BFE7', 
        borderBottomLeftRadius: 50, 
        borderBottomRightRadius: 50 
      }}>
        {/* Nút quay lại */}
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image style={{ width: 30, height: 30 }}
            source={require('../../assets/images/back1.png')} />
          </TouchableOpacity>

          <Text style={styles.title}>Tiếng Anh Chuyên Ngành</Text>
        </View>
      </View>
     

      {/* Dropdown chọn khoa */}
      <Text style={styles.sectionTitle}>Chọn khoa</Text>
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setDropdownOpen(!dropdownOpen)}>
        <Text style={styles.dropdownText}>{selectedFaculty || 'Đang tải...'}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={styles.dropdownList}>
          {faculties.map((faculty) => (
            <TouchableOpacity
              key={faculty}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedFaculty(faculty);
                setDropdownOpen(false);
              }}
            >
              <Text>{faculty}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Loại bài tập */}
      <Text style={styles.sectionTitle}>Chọn bài tập</Text>
      {exerciseTypes.length === 0 ? (
        <Text style={{ color: 'gray', marginBottom: 10 }}>Không có loại bài tập nào.</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
          {exerciseTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.selectionButton, selectedExercise === type && styles.selectedButton]}
              onPress={() => setSelectedExercise(type)}
            >
              <Text
                style={[styles.buttonText, selectedExercise === type && styles.selectedText]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Nút Tiếp theo */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Tiếp theo</Text>
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
  backButton: {
    top: 40,
    left: 20,
    marginBottom: 10,
  },
  title: {
    left:70,
    fontSize: 18,
    fontWeight: 'bold',
    
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
    marginBottom: 300, // Điều chỉnh khoảng cách
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

