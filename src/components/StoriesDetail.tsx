import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import topicData from '../questions/it_stories_bilingual.json';
import { useNavigation, useRoute } from '@react-navigation/native';

const StoriesDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { storiesID } = route.params as { storiesID: number };

  // Tạo một danh sách chứa tất cả các chủ đề trong tất cả các khoa
  const allTopics = topicData.departments.flatMap(dept => [
    ...(dept.ai_topics || []),
    ...(dept.accounting_topics || []),
  ]);

  // Tìm tất cả các bài có cùng topicID
  const filteredTopics = allTopics.filter((t: any) => t.id === storiesID);

  if (filteredTopics.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy chủ đề phù hợp.</Text>
      </View>
    );
  }

  // State để lưu trữ bài đang được chọn
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  // Hiển thị thông tin chi tiết khi nhấp vào tên bài
  const handleTopicPress = (item: any) => {
    setSelectedTopic(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('HomeScreen');
          }
        }}>
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Danh sách chủ đề</Text>

      <FlatList
        data={filteredTopics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTopicPress(item)}>
            <Text style={styles.topicName}>{item.title_en}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Nếu có bài được chọn, hiển thị chi tiết */}
      {selectedTopic && (
        <View style={styles.contentContainer}>
          <Text style={styles.questionText}>Tiêu đề EN: {selectedTopic.title_en}</Text>
          <Text style={styles.questionText}>Tiêu đề VI: {selectedTopic.title_vi}</Text>
          <Text style={styles.questionText}>Nội dung VI: {selectedTopic.content_vi}</Text>
          <Text style={styles.questionText}>Nội dung EN: {selectedTopic.content_en}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: {
    paddingTop: 35,
    backgroundColor: '#62D1F9',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  backButton: { position: 'absolute', top: 30, left: 10, zIndex: 10, padding: 5 },
  backText: { color: 'blue' },
  topicName: { color: 'blue', fontSize: 18, marginTop: 15 },
  contentContainer: { marginTop: 20 },
  questionText: { color: 'black', fontSize: 16, marginTop: 10 },
  errorText: { fontSize: 20, color: 'red', textAlign: 'center', marginTop: 50 },
});

export default StoriesDetail;
