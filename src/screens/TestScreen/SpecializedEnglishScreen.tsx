import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const faculties = ['Công nghệ thông tin', 'Kinh tế và Quản lý', 'Xây dựng', 'Môi trường', 'Điện - Điện tử'];
const exerciseTypes = ['Từ vựng', 'Ngữ pháp', 'Đọc hiểu', 'Nghe hiểu'];

const SpecializedEnglishScreen = () => {
  const navigation = useNavigation();
  const [selectedFaculty, setSelectedFaculty] = useState(faculties[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown trạng thái
  const [selectedExercise, setSelectedExercise] = useState(exerciseTypes[0]);

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={require('../../assets/images/back1.png')} />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.title}>Tiếng Anh Chuyên Ngành</Text>

      {/* Dropdown chọn khoa */}
      <Text style={styles.sectionTitle}>Chọn khoa</Text>
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setDropdownOpen(!dropdownOpen)}>
        <Text style={styles.dropdownText}>{selectedFaculty}</Text>
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

      {/* Section chọn loại bài */}
      <Text style={styles.sectionTitle}>Loại bài tập</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {exerciseTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.selectionButton,
              selectedExercise === type && styles.selectedButton,
            ]}
            onPress={() => setSelectedExercise(type)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedExercise === type && styles.selectedText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Nội dung hiển thị */}
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
    alignSelf:'center',
    top:10,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    marginBottom:400,
    alignItems: 'center',
  },
});
