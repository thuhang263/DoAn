import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

interface Topic {
    id: number;
    title: string;
   
  }

const data: Topic[] = [
  { id: 1, title: 'Công nghệ thông tin' },
  { id: 2, title: 'Kế Toán và Kinh doanh' },
  { id: 3, title: 'Cơ khí' },
  { id: 4, title: 'Điện - Điện tử' },
  { id: 5, title: 'Hóa - Môi trường' },
  { id: 6, title: 'Nước' },
  { id: 7, title: 'Công trình', },
  { id: 8, title: 'Xây dựng' },
];

const StoriesScreen = () => {
  const navigation = useNavigation();

  
  const renderItem = ({ item }: { item: Topic }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('StoriesDetail', {
              storiesID: item.id,
              
            })
          }
          >
        
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
            source={require('../../assets/images/back1.png')}
            />
            </TouchableOpacity>
            <Text style={styles.header}>Đọc song ngữ Anh - Việt</Text>
        </View>
     
        <View style={styles.itemContent}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
        />
        </View>
      
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
  },
  itemContent:{
    marginTop:40,
  },
  header: {
    paddingTop: 35, // Đẩy nội dung xuống 30
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
  },
  
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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
    backgroundColor: '#61BFE7',
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

export default StoriesScreen;
