import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';


import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
const ListScreen = () => {
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
      <View>
        <View style={styles.item}>
            <Image
             style ={styles.ImageItem}
              source={require('../../assets/images/item2.png')}>
            </Image>
            <Text style={styles.text}>Từ vựng yêu thích</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.TextBtn}>View</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.item}>
          <Image
            style ={styles.ImageItem}
            source={require('../../assets/images/item1.png')}>
            </Image>
            <Text style={styles.text}>Unlearned</Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.TextBtn}>View</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};


export default ListScreen;