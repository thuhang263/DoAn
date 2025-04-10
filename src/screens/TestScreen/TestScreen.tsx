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
        <Image source={require('../../assets/images/duck.png')} style={styles.avatarImage} />
      </View>
      
     <View>
        <Image source={require('../../assets/images/testImage.png')} style={styles.avatarImageItem} />
       
     </View>
      
     <View>
        <TouchableOpacity style={styles.btnVoc} onPress={() => navigation.navigate('TestVoc')}>
          <Text style={styles.text}>Vocabulary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGra} onPress={() => navigation.navigate('TestGrammar')}>
          <Text style={styles.text}>Grammar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnListen} onPress={() => navigation.navigate('TestListenning')}>
          <Text style={styles.text}>Listening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRead} onPress={() => navigation.navigate('TestReading')}>
          <Text style={styles.text}>Reading</Text>
        </TouchableOpacity>
     </View>

    </ScrollView>
  );
};


export default TestScreen;