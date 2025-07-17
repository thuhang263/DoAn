import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '../../utils/i18n';

const WelcomeScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const checkEmailDomain = (inputEmail: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@e\.tlu\.edu\.vn$/;
    return pattern.test(inputEmail);
  };

  const handleVerifyEmail = () => {
    if (checkEmailDomain(email.trim().toLowerCase())) {
      Alert.alert('✅ Thành công', 'Chào mừng bạn đến với ứng dụng ôn tập tiếng Anh!');
      setIsVerified(true);
    } else {
      Alert.alert('❌ Thất bại', 'Rất tiếc, vui lòng nhập email sinh viên Thủy Lợi hợp lệ (@e.tlu.edu.vn).');
      setIsVerified(false);
    }
  };

  const handleLanguageSelect = async (language: string) => {
    await setAppLanguage(language);
    navigation.navigate('RootBottomNavigation', { screen: 'HomeScreen' });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <LottieView
          source={require('../../assets/animations/Animation - 1751563847877.json')}
          autoPlay
          loop
          style={styles.catAnimation}
        />

        <TextInput
          style={styles.input}
          placeholder="Nhập email Thủy Lợi (VD: abc@e.tlu.edu.vn)"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyEmail}>
          <Text style={styles.buttonText}>🔐 Xác minh email</Text>
        </TouchableOpacity>

        {isVerified && (
          <>
            <Text style={styles.subtitle}>{t('chooseLanguage')}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('vi')}>
              <Text style={styles.buttonText}>🇻🇳 {t('vietnamese')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleLanguageSelect('en')}>
              <Text style={styles.buttonText}>🇺🇸 {t('english')}</Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  catAnimation: { width: 550, height: 300, marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginVertical: 20 },
  button: {
    width: 300,
    padding: 15,
    backgroundColor: '#E9ECED',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  verifyButton: {
    width: 300,
    padding: 15,
    backgroundColor: '#1976d2',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  buttonText: { fontSize: 18, color: '#000' },
  input: {
    width: 300,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginBottom: 10,
  },
});

export default WelcomeScreen;
