import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type";

const API_KEY = "AIzaSyBYx0VL_v8eB44_29m4PeeHgpNO797RgkA"; // Thay bằng API Key của bạn
type VideoScreenRouteProp = RouteProp<RootStackParamList, "VideoScreen">;
const MovieScreen = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const fetchVideos = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=10&type=video&key=${API_KEY}&videoEmbeddable=true`
      );
      console.log("Dữ liệu API trả về:", response.data);
      setVideos(response.data.items || []);
    } catch (error) {
      console.error("Lỗi khi lấy video:", error);
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: any }) => {
    const videoId = item?.id?.videoId;
    const title = item?.snippet?.title || "Không có tiêu đề";
    const thumbnail = item?.snippet?.thumbnails?.medium?.url || "";

    if (!videoId) return null;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#7CD33D",
          padding: 10,
          marginVertical: 5,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("VideoScreen", { videoId })}
      >
        <Image
          source={{ uri: thumbnail }}
          style={{ width: 80, height: 60, borderRadius: 10, marginRight: 10 }}
        />
        <Text style={{ color: "#fff", fontWeight: "bold", flexShrink: 1 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1}}>
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
              source={require('../../assets/images/back.png')}
                />
        </TouchableOpacity>
      <Text style={styles.header}>Movie</Text>
      </View>
      <View style={styles.input}>
      <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 20,
            width:360,
            left:20,
          }}
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            console.log("Từ khóa nhập:", text);
          }}
        />
      </View>
      

      <View style={styles.buttonContainer}>
        <Button title="Tìm kiếm" onPress={() => fetchVideos(searchQuery)} />
      </View>

      {loading && <ActivityIndicator size="large" color="green" />}

      <FlatList
        data={videos}
        keyExtractor={(item) => item?.id?.videoId || Math.random().toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: 200, // Giới hạn độ rộng nút
    alignSelf: 'center', // Căn giữa theo chiều ngang
  },
  header: {
    paddingTop: 35, // Đẩy nội dung xuống 30
    width:410,
    backgroundColor: '#78C93C',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
  },
  input:{
    marginTop:40,
  }
  });
export default MovieScreen;