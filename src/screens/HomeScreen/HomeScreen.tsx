import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar, TextInput } from 'react-native';


import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
import BannerCarousel from '../../components/BannerCarousel';
const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>(); // Sử dụng useNavigation
  return (
    <SafeAreaView  style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>Welcome to TLEnglish!</Text>
        </View>
        <Image source={require('../../assets/images/duck.png')} style={styles.avatarImage} />
      </View>
      <View style={{ marginTop: 30 }}>
          <BannerCarousel />
      </View>
      
      {/* Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryBox}  onPress={() => navigation.navigate('VoccalScreen')}>
            <Image source={require('../../assets/images/voc.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Bộ từ vựng chuyên ngành</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}  onPress={() => navigation.navigate('GrammaScreen')}>
            <Image source={require('../../assets/images/grama.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Ngữ pháp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('TopicVideo')}>
            <Image source={require('../../assets/images/youtobe.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('StoriesScreen')}>
            <Image source={require('../../assets/images/game.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('StoriesScreen')}>
            <Image source={require('../../assets/images/sach.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Song ngữ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('StoriesScreen')}>
            <Image source={require('../../assets/images/viet.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Luyện nghe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>

  );
};


export default HomeScreen;