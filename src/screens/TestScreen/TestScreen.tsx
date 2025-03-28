import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import DatePicker from '../../components/DatePicker'; 

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
        <Image source={require('../../assets/images/duck.png')} style={styles.avatarImage} />
      </View>
      
     <View>
        <Image source={require('../../assets/images/testImage.png')} style={styles.avatarImageItem} />
        <Text style={styles.textContent}>Take the test in 30 minutes</Text>
     </View>
      
     <View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TestItem')}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
     </View>

    </ScrollView>
  );
};


export default TestScreen;