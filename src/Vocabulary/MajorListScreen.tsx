import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import vocabularyData from '../Vocabulary/it.json'; // chỉnh đúng đường dẫn

// Định nghĩa kiểu param cho navigation stack
type RootStackParamList = {
  MajorListScreen: { facultyName: string };
  VocabularyListScreen: { majorName: string; vocabulary: VocabularyItem[] };
};

// Kiểu route prop cho màn MajorListScreen
type MajorListScreenRouteProp = RouteProp<RootStackParamList, 'MajorListScreen'>;

// Kiểu navigation prop rõ cho tránh lỗi
type Navigation = NavigationProp<RootStackParamList, 'MajorListScreen'>;

// Định nghĩa các interface
interface VocabularyItem {
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
}

interface Major {
  majorName: string;
  vocabulary: VocabularyItem[];
}

interface Faculty {
  facultyName: string;
  majors: Major[];
}

// Props của component MajorListScreen
interface Props {
  route: MajorListScreenRouteProp;
}

const MajorListScreen: React.FC<Props> = ({ route }) => {
  // Sử dụng useNavigation với kiểu Navigation
  const navigation = useNavigation<Navigation>();
  const { facultyName } = route.params;

  // Tìm đúng faculty dựa trên facultyName
  // Vì dữ liệu bạn đưa chỉ có 1 khoa nên mình làm đơn giản
  // Nếu có nhiều khoa thì sẽ dùng find()
  const faculty: Faculty | undefined = vocabularyData.find(
    (item) => item.facultyName === facultyName
  );

  if (!faculty) {
    return <Text>Không tìm thấy khoa</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style = {styles.container}>
      <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
              }}
            >
              <Image
              style={styles.backIcon}
                source={require('../assets/images/back1.png')}
              />
          </TouchableOpacity>
            <Text style={styles.header}>{faculty.facultyName}</Text>
      </View>
                 
      <FlatList
        data={faculty.majors}
        keyExtractor={(item) => item.majorName}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('VocabularyListScreen', {
                majorName: item.majorName,
                vocabulary: item.vocabulary,
              })
            }
            style={{ marginTop: 30, padding: 20, borderBottomWidth: 1 }}
          >
            <Text style={{ fontSize: 18 }}>{item.majorName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header: {
    paddingTop: 35, // Đẩy nội dung xuống 30
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,             // Khoảng cách từ đỉnh màn hình
    left: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khác
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 30,  // Chiều rộng ảnh
    height: 30, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
}

)
export default MajorListScreen;
