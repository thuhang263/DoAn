import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';


import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>(); // Sử dụng useNavigation
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/Vocabulary.png')} style={styles.avatarImageText} />
        </View>
        <Image source={require('../../assets/images/searchImage.png')} style={styles.avatarImage} />    
      </View>
      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/images/search2.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="black"
        />
      </View>

     
      
     

    </ScrollView>
  );
};


export default SearchScreen;