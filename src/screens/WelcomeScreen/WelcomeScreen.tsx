import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
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
      <LottieView
        source={require('../../assets/animations/Animation - 1751563847877.json')}
        autoPlay
        loop
        style={styles.catAnimation}
      />

      <Text style={styles.subtitle}>{t('chooseLanguage')}</Text>
      <View style={{marginBottom:300}}>
        <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('vi')}>
          <Text style={styles.buttonText}>🇻🇳 {t('vietnamese')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('en')}>
          <Text style={styles.buttonText}>🇺🇸 {t('english')}</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  catAnimation: { width: 550, height: 550, marginBottom: 50 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  button: {
    width: 300,
    padding: 15,
    backgroundColor: '#E9ECED',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: { fontSize: 18 },
});

export default WelcomeScreen;
