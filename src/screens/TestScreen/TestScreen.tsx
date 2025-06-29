import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import {  StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
interface Test {
  id: string;
  title: string;
}

const TestScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>(); 
  const { t } = useTranslation();
  const testData: Test[] = [
    { id: 'basic', title: 'test.basic' },
    { id: 'specialized', title: 'test.specialized' },
];


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
      
     <View style={{ top: 120 }}>
        {testData.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={{
              marginTop: 20,
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
            onPress={() =>
              navigation.navigate(test.id === 'basic' ? 'TestBasic' : 'SpecializedEnglishScreen')
            }>
            <Image
              source={require('../../assets/images/test2.png')}
              style={{
                width: 60,
                height: 60,
                borderRadius: 20,
                marginRight: 12,
                borderWidth: 1,
                borderColor: '#ddd',
              }}
            />
            <Text style={styles.text}>{t(test.title)}</Text>
          </TouchableOpacity>
        ))}
      </View>


    </ScrollView>
  );
};


export default TestScreen;