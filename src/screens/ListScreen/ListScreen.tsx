import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DatePicker from '../../components/DatePicker'; 

import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>(); // Sử dụng useNavigation
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      
        <Image source={require('../../assets/images/studyList.png')} style={styles.avatarImage} />
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/listText.png')} style={styles.avatarImageText} />
        </View>
      </View>
      
     
      
     

    </ScrollView>
  );
};


export default HomeScreen;