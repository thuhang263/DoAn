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
        
       
     </View>
      
     <View style={{top:120}}>
         <TouchableOpacity
         style={{ marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 15,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
               }}
          onPress={() => navigation.navigate('SpecializedEnglishScreen')}>
          <Image
              source={require('../../assets/images/code.png')} 
              style={{width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 12,
              borderWidth: 1,
              borderColor: '#ddd',}}
          />
        <Text style={styles.text}>Kiểm tra tiếng Anh chuyên ngành</Text>
        </TouchableOpacity>
         <TouchableOpacity 
         style={{ marginTop: 50,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 15,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
               }}
          onPress={() => navigation.navigate('TestBasic')}>
          <Image
              source={require('../../assets/images/code.png')} 
              style={{width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 12,
              borderWidth: 1,
              borderColor: '#ddd',}}
          />
          <Text style={styles.text}>Ôn tập cơ bản theo chứng chỉ B1</Text>
        </TouchableOpacity>
     </View>

    </ScrollView>
  );
};


export default TestScreen;