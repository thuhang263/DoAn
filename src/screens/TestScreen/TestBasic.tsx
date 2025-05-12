import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const faculties = ['Công nghệ thông tin', 'Kinh tế và Quản lý', 'Xây dựng', 'Môi trường', 'Điện - Điện tử'];
const exerciseTypes = ['Từ vựng', 'Ngữ pháp', 'Đọc hiểu', 'Nghe hiểu'];

const SpecializedEnglishScreen = () => {
  const navigation = useNavigation();
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(faculties[0]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(exerciseTypes[0]);

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Image style={{width: 30, height: 30, resizeMode: 'contain'}} source={require('../../assets/images/back1.png')} />
        </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.title}>Ôn tập cơ bản</Text>      

      {/* Section chọn loại bài */}
      <Text style={styles.sectionTitle}>Loại bài tập</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {exerciseTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.selectionButton,
              selectedExercise === type && styles.selectedButton
            ]}
            onPress={() => setSelectedExercise(type)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedExercise === type && styles.selectedText
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bạn có thể thêm nội dung bài tập tương ứng bên dưới */}
      <View style={styles.content}>
        <Text style={{ fontSize: 16 }}>
          Hiển thị nội dung: {selectedFaculty} - {selectedExercise}
        </Text>
      </View>
    </View>
  );
};

export default SpecializedEnglishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    
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
    width:100,
    height:50,
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
    alignSelf  :'center',
    top:10,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    marginBottom:500,
    alignItems: 'center',
  },
});
