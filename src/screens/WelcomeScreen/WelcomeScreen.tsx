import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  const handleLanguageSelect = (language: string) => {
    console.log(`Language selected: ${language}`);
    navigation.navigate('RootBottomNavigation', {
        screen: 'HomeScreen',
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/hello.png')} style={styles.catImage} />
          <Image source={require('../../assets/images/welcome.png')} style={styles.avatarImageText} />
      <Text style={styles.subtitle}>Chọn ngôn ngữ hiển thị</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('vi')}>
        <Text style={styles.buttonText}>🇻🇳  Tiếng Việt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('en')}>
        <Text style={styles.buttonText}>🇺🇸  English</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    catImage: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      marginBottom: 40,
    },
    button: {
      width: '80%',
      padding: 15,
      backgroundColor: '#E9ECED',
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    buttonText: {
      fontSize: 18,
    },
    avatarImageText:{
      width:400,
      height:70,
      left:70
    }
  });
  
export default WelcomeScreen;
