import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const BannerCarousel = () => {
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.banner}>
        <TouchableOpacity onPress={() => navigation.navigate('ImageDetailScreen')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={styles.verticalText}>{t('banner')}</Text>
            <Image
              style={styles.image}
              source={require('../assets/images/next.png')}
            />
          </View>
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
  banner:{
    flexDirection:"row",
    left:30,
    marginBottom:10,
  },
  verticalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000'
  },
  image:{
    width:20,
    height:20,
    left:100,
  }
});
export default BannerCarousel;
