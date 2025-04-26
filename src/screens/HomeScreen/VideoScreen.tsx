import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/type"; 
type VideoScreenRouteProp = RouteProp<RootStackParamList, "VideoScreen">;

const VideoScreen = () => {
  const route = useRoute<VideoScreenRouteProp>();

  
  if (!route.params || !route.params.videoId) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 18 }}>Không tìm thấy video</Text>
      </View>
    );
  }

  const { videoId } = route.params;
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: videoUrl }} style={{ flex: 1, width: "100%" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VideoScreen;
