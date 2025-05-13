import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const BannerCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  
  return (
    <View>
      <View style={styles.videoLabel}>
          <Text style={styles.verticalText}>100+ Từ vựng ôn thi đầu ra</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ImageDetailScreen')}>
            <Image
            style={styles.image}
            source={require('../assets/images/next.png')}
            >
            </Image>
          </TouchableOpacity>  
      </View>
    <FlatList
      ref={flatListRef}
      data={null}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity >
          <Image
            source={item}
            style={{
              width: 320,
              margin: 15,
              height: 150,
              resizeMode: 'cover',
              borderRadius: 30,
              
            }}
          />
        </TouchableOpacity>
      )}
    />
    </View>
    
  );
};
const styles = StyleSheet.create({
  videoLabel: {
    left:20,
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection:'row',
    borderRadius:'30',
    margin:15,
  },
  verticalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000'
  },
  image:{
    width:30,
    height:30,
    left:40,
  }
});
export default BannerCarousel;
