import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
interface Topic {
  id: number;
  title: string;
  image: any;
}
const data: Topic[] =  [
  { id: 1, title: 'Present Simple', image: require('../../assets/images/sport.png') },
  { id: 3, title: 'Present Continuous', image: require('../../assets/images/champion.png') },
  { id: 2, title: 'Past Simple', image: require('../../assets/images/shop.png') },
  { id: 4, title: 'Past Continuous', image: require('../../assets/images/relax.png') },
  { id: 5, title: 'Pronouns who, which, where', image: require('../../assets/images/food.png') },
  { id: 6, title: 'Order of adjectives', image: require('../../assets/images/house.png') },
  { id: 7, title: 'Present perfect', image: require('../../assets/images/animal.png') },
  { id: 8, title: 'Used to', image: require('../../assets/images/travel.png') },
  { id: 9, title: 'Future Form', image: require('../../assets/images/travel.png') },
  { id: 10, title: 'Be going to', image: require('../../assets/images/travel.png') },
  { id: 11, title: 'Pass Perfect', image: require('../../assets/images/travel.png') },
  { id: 12, title: 'First Conditional and Second Conditinal', image: require('../../assets/images/travel.png') },
];

const TestGrammar = () => {
  const navigation = useNavigation();
  
  const renderItem = ({ item }: { item: Topic }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('GrammarDetail', { grammarId: item.id })}
        >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
         <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={styles.container}>
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
            <Text style={styles.header}>Grammar</Text>
            </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </View>
      
   
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: { justifyContent: 'space-around', paddingHorizontal: 10 },
  itemContent:{
    width:369,
    alignContent:'center',
    left:20,

  },
  header: {
    paddingTop: 35, // Đẩy nội dung xuống 30
    backgroundColor: '#78C93C',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
  },
  
  item: {
    flex: 1,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  selectedItem: {
    backgroundColor: '#78C93C',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    top: 30,             // Khoảng cách từ đỉnh màn hình
    left: 10,             // Khoảng cách từ trái màn hình
    zIndex: 10,           // Hiển thị trên các thành phần khác
    padding: 5,           // Thêm padding để dễ nhấn
  },
  backIcon: {
    width: 30,  // Chiều rộng ảnh
    height: 30, // Chiều cao ảnh
    resizeMode: 'contain', // Duy trì tỉ lệ của ảnh
  },
});

export default TestGrammar;
