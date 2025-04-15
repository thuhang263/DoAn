import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";



const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const images = [
    require('../assets/images/cntt.jpg'),
  ];


  return (
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
              width: 370,
              margin: 15,
              height: 150,
              resizeMode: 'cover',
              borderRadius: 30,
            }}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default BannerCarousel;
