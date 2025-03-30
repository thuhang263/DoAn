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
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            console.log("Từ khóa nhập:", text);
          }}
        />

      <Button title="Tìm kiếm" onPress={() => fetchVideos(searchQuery)} />

      {loading && <ActivityIndicator size="large" color="green" />}

      <FlatList
        data={videos}
        keyExtractor={(item) => item?.id?.videoId || Math.random().toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MovieScreen;