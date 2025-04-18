import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const data =  [
  { id: 1, title: 'Hiện tại đơn',  },
  { id: 3, title: 'Hiện tại tiếp diễn' },
  { id: 2, title: 'Quá khứ đơn' },
  { id: 4, title: 'Quá khử tiếp diễn' },
  { id: 5, title: 'Pronouns who, which, where' },
  { id: 6, title: 'Order of adjectives' },
  { id: 7, title: 'Hiện tại hoàn thành' },
  { id: 8, title: 'Used to' },
  { id: 9, title: 'Future Form' },
  { id: 10, title: 'Be going to' },
  { id: 11, title: 'Quá khứ hoàn thành' },
  { id: 12, title: 'First Conditional and Second Conditinal' },
];

const GrammaScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<number | null>(null);
  
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.item, selected === item.id && styles.selectedItem]}
      onPress={() => {
        setSelected(item.id);
        navigation.navigate('GrammarTopicDetailScreen', { topicId: item.id, topicName: item.title });
      }}
      
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
            <Text style={styles.header}>Ngữ Pháp</Text>
        </View>
     
        <View style={styles.itemContent}>
          <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
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
    marginTop:10,
    width:369,
    alignContent:'center',
    left:20,

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
  
  item: {
    margin:6,
    padding:12,
    alignItems: 'center',
    borderRadius: 30,
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

export default GrammaScreen;
