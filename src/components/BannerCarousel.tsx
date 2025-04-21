import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Image, Dimensions, TouchableOpacity, Text, StyleSheet } from "react-native";




const BannerCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const images = [
    require('../assets/images/cntt.jpg'),
  ];


  return (
    <View>
      <View style={styles.videoLabel}>
          <Text style={styles.verticalText}>100+ Từ vựng ôn thi đầu ra</Text>
      </View>
    <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ImageDetailScreen')}>
          <Image
            source={item}
            style={{
              width: 320,
              margin: 15,
              height: 150,
              resizeMode: 'cover',
              borderRadius: 30,
              left:15,
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
    left:30,
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000'
    
  },
  verticalText: {
   
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000'
    

  },
});
export default BannerCarousel;
