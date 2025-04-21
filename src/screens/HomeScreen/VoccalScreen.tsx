import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const data = [
  { id: 1, title: 'Khoa công nghệ thông tin', image: require('../../assets/images/champion.png') },
  { id: 2, title: 'Khoa kỹ thuật tài nguyên nước', image: require('../../assets/images/champion.png') },
  { id: 3, title: 'Khoa cơ khí', image: require('../../assets/images/shop.png') },
  { id: 4, title: 'Khoa Điện - Điện tử', image: require('../../assets/images/relax.png') },
  { id: 5, title: 'Khoa hóa - Môi trường', image: require('../../assets/images/food.png') },
  { id: 6, title: 'Khoa kinh tế và quản lý', image: require('../../assets/images/house.png') },
  { id: 7, title: 'Khoa kế toán và kinh doanh', image: require('../../assets/images/animal.png') },
  { id: 8, title: 'Khoa công trình', image: require('../../assets/images/travel.png') },
  { id: 8, title: 'Khoa luật và lý luận chính trị', image: require('../../assets/images/travel.png') },
];

const VoccalScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<number | null>(null);
  
  const renderItem = ({ item }: { item: any }) => (
    
    <TouchableOpacity
      style={[styles.item, selected === item.id && styles.selectedItem]}
      onPress={() => setSelected(item.id)}
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
            source={require('../../assets/images/back1.png')}
            />
            </TouchableOpacity>
            <Text style={styles.header}>Các bộ từ vựng</Text>
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

export default VoccalScreen;
