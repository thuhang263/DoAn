import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
  const faculty: Faculty | undefined =
    vocabularyData.facultyName === facultyName ? vocabularyData : undefined;

  if (!faculty) {
    return <Text>Không tìm thấy khoa</Text>;
  }

  return (
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
          style={{ padding: 20, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>{item.majorName}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default MajorListScreen;
