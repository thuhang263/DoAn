import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';


import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>(); // Sử dụng useNavigation
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/textTest.png')} style={styles.avatarImageText} />
        </View>
        <Image source={require('../../assets/images/lt.png')} style={styles.avatarImage} />
      </View>
      
     <View>
        <Image source={require('../../assets/images/testImage.png')} style={styles.avatarImageItem} />
       
     </View>
      
     <View style={{right:30}}>
        <TouchableOpacity style={styles.btnVoc} onPress={() => navigation.navigate('TestVoc')}>
          <Text style={styles.text}>Từ vựng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGra} onPress={() => navigation.navigate('TestGrammar')}>
          <Text style={styles.text}>Ngữ pháp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnListen} onPress={() => navigation.navigate('TestListenning')}>
          <Text style={styles.text}>Bài nghe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRead} onPress={() => navigation.navigate('TestReading')}>
          <Text style={styles.text}>Bài đọc</Text>
        </TouchableOpacity>
     </View>

    </ScrollView>
  );
};


export default TestScreen;