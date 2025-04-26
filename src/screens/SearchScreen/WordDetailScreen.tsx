import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

// Định nghĩa kiểu cho params
type RootStackParamList = {
  WordDetailScreen: { word: string };
};

type WordDetailScreenRouteProp = RouteProp<RootStackParamList, 'WordDetailScreen'>;

const WordDetailScreen: React.FC = () => {
  const route = useRoute<WordDetailScreenRouteProp>();
  const { word } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.wordTitle}>{word}</Text>
      <Text style={styles.detailText}>
        Đây là màn hình chi tiết từ. Bạn có thể hiển thị thêm nghĩa, ví dụ hoặc thông tin khác tại đây.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  wordTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 15 },
  detailText: { fontSize: 18 },
});

export default WordDetailScreen;
