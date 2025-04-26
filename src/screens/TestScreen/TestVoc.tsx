import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { StackParamsType } from '../../navigations/type';

interface Topic {
  id: number;
  title: string;
  image: any;
}

const data: Topic[] = [
  { id: 1, title: 'All about me', image: require('../../assets/images/sport.png') },
  { id: 2, title: 'Winning and Losing', image: require('../../assets/images/champion.png') },
  { id: 3, title: 'Let’s Shop', image: require('../../assets/images/shop.png') },
  { id: 4, title: 'Relax', image: require('../../assets/images/relax.png') },
  { id: 5, title: 'Extreme Diet', image: require('../../assets/images/food.png') },
  { id: 6, title: 'My Home', image: require('../../assets/images/house.png') },
  { id: 7, title: 'Wild at Heart', image: require('../../assets/images/animal.png') },
  { id: 8, title: 'We are off', image: require('../../assets/images/travel.png') },
];

const TestVoc = () => {
  const navigation = useNavigation<StackParamsType>();

  const renderItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('VocabularyDetailScreen', { topicId: item.id })}
      >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
        </TouchableOpacity>
        <Text style={styles.header}>Các bài từ vựng</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 35,
    backgroundColor: '#62D1F9',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height: 100,
  },
  row: { justifyContent: 'space-around', paddingHorizontal: 10 },
  item: {
    flex: 1,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  image: { width: 50, height: 50, marginBottom: 10 },
  text: { fontSize: 16, fontWeight: 'bold' },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
    padding: 5,
  },
  backIcon: { width: 30, height: 30, resizeMode: 'contain' },
});

export default TestVoc;
