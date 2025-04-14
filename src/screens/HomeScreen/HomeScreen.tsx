import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import DatePicker from '../../components/DatePicker'; 

import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>(); // Sử dụng useNavigation
  return (
    <SafeAreaView  style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>Welcome to your {'\n'}
                English learning
                journey!
          </Text>
        </View>
        <Image source={require('../../assets/images/duck.png')} style={styles.avatarImage} />
      </View>
      
      {/* Date Attendance*/}
      <View style={styles.dateContainer}>
        <DatePicker />
      </View>
      
      {/* Attendance Button */}
      <TouchableOpacity style={styles.attendanceButton}>
        <Text style={styles.attendanceText}>Attendance</Text>
      </TouchableOpacity>
      
      {/* Latest Lesson */}
      <View style={styles.lessonCard}>
        <View style={styles.Lastest}>
          <Text style={styles.textLastest}>Lastest Lesson</Text>
        </View>
        <View>
         
          <Text style={styles.lessonTitle}>Vocabulary: Work</Text>
          <Text style={styles.lessonSubText}>Continue your journey!</Text>
        </View>
        <View style={styles.starContainer}>
          <TouchableOpacity style={styles.studyButton}>
            <Text style={styles.studyButtonText}>Continue Studying</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      
      {/* Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryBox}  onPress={() => navigation.navigate('VoccalScreen')}>
            <Image source={require('../../assets/images/voc.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Vocabulary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}  onPress={() => navigation.navigate('GrammaScreen')}>
            <Image source={require('../../assets/images/gram.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Grammar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('MovieScreen')}>
            <Image source={require('../../assets/images/youtobe.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('MovieScreen')}>
            <Image source={require('../../assets/images/game.png')} style={styles.avatarImageItem} />
            <Text style={styles.categoryText}>Games</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>

  );
};


export default HomeScreen;