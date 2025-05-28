import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'AIzaSyBYx0VL_v8eB44_29m4PeeHgpNO797RgkA'; // Thay bằng API Key thật

const majors = [
  { id: 1, title: 'Khoa Công Nghệ Thông Tin', query: 'English for information technology' },
  { id: 2, title: 'Khoa Kinh Tế và Quản Lý', query: 'English for Economics' },
  { id: 3, title: 'Khoa Cơ Khí', query: 'English for Mechanical Engineering' },
  { id: 4, title: 'Khoa Kế toán và Kinh doanh', query: 'English for Accounting and business' },
  { id: 5, title: 'Khoa Kỹ thuật Tài nguyên nước', query: 'English for Water Resources Engineering' },
  { id: 6, title: 'Khoa Hóa - Môi trường', query: 'English for Environmental Engineering' },
  { id: 7, title: 'Khoa Điện - Điện tử', query: 'English for Electrical and Electronic Engineering' },
  { id: 8, title: 'Khoa Lý luận Chính trị', query: 'English for Political Theory' },
  { id: 9, title: 'Khoa Công trình', query: 'English for Civil Engineering' }


];

const TopicVideo = () => {
  const [videosByMajor, setVideosByMajor] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fetchVideos = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=10&type=video&key=${API_KEY}&videoEmbeddable=true`
      );
      return response.data.items || [];
    } catch (error) {
      console.error('Lỗi khi fetch video:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadAllVideos = async () => {
      let allData: any = {};
      for (const major of majors) {
        const videos = await fetchVideos(major.query);
        allData[major.title] = videos;
      }
      setVideosByMajor(allData);
      setLoading(false);
    };

    loadAllVideos();
  }, []);

  const renderVideoItem = ({ item }: { item: any }) => {
    const thumbnail = item.snippet?.thumbnails?.medium?.url;
    const title = item.snippet?.title;
    const videoId = item.id?.videoId;
  
    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() => {
          navigation.navigate("VideoScreen", { videoId: item.id?.videoId });
        }}
      >
        <Image source={{ uri: thumbnail }} style={styles.videoImage} />
        <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
      </TouchableOpacity>
    );
  };
  

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={{ marginTop: 30 }} />;
  }

  return (
    <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('HomeScreen'); // Chuyển về Home nếu không có màn nào để quay lại
          }
          }}
          >
          <Image
          style={styles.backIcon}
          source={require('../assets/images/back1.png')}
          />
        </TouchableOpacity>
          <Text style={styles.header}>Video</Text>
        </View>
      

      {majors.map((major) => (
        <View key={major.id} style={styles.majorSection}>
          <View style={styles.majorHeader}>
            <Text style={styles.majorTitle}>{major.title}</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <FlatList
            data={videosByMajor[major.title]}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id.videoId}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 35,
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height: 100,
  },
  majorSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  majorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  majorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: '#aaa',
  },
  videoCard: {
    width: 140,
    backgroundColor: '#61BFE7',
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  videoImage: {
    width: '100%',
    height: 90,
  },
  videoTitle: {
    color: '#fff',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,             // Khoảng cách từ đỉnh màn hình
    left: 30,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khác
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 30,  // Chiều rộng ảnh
    height: 30, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
});

export default TopicVideo;
