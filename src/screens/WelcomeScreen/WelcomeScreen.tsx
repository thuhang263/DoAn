import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../../utils/i18n';

const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();

  const handleLanguageSelect = async (language: string) => {
    await setAppLanguage(language);
    navigation.navigate('RootBottomNavigation', { screen: 'HomeScreen' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/images/hello.png')} style={styles.catImage} />
      <Image source={require('../../assets/images/welcome.png')} style={styles.welcomeImage} />
      <Text style={styles.subtitle}>{t('chooseLanguage')}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('vi')}>
        <Text style={styles.buttonText}>🇻🇳 {t('vietnamese')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('en')}>
        <Text style={styles.buttonText}>🇺🇸 {t('english')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  catImage: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  button: { width: '80%', padding: 15, backgroundColor: '#E9ECED', borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  buttonText: { fontSize: 18 },
  welcomeImage:{
    width:310,
    height:80,
    alignSelf:'center',
    alignContent:'center',
    left:60,
  }
});

export default WelcomeScreen;
