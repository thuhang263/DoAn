import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { setAppLanguage } from '../../utils/i18n';
import i18n from '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
export default function SettingScreen() {    
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [message,setMessage] = useState('');
  const changeLanguage = async (lang: string) => {
    await setAppLanguage(lang);
    Alert.alert(
      i18n.t('Ngôn ngữ đã thay đổi'),
      i18n.t('Ứng dụng bây giờ sẽ hiển thị bằng ngôn ngữ bạn đã chọn')
    );
  };

  const handleSubmit = async () => {
    if (message.trim().length === 0) {
      Alert.alert(t('enteryourmessage'));
      return;
    }

    try {
      await firestore().collection('feedbacks').add({
        message,
        createdAt: firestore.FieldValue.serverTimestamp(),
        platform: Platform.OS,
        language: i18n.language,
      });
      Alert.alert(t('camon'));
      setMessage('');
    } catch (error) {
      console.error('loigui', error);
      Alert.alert(t('guilaisau'));
    }
  };
  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // tuỳ chỉnh offset nếu cần
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.layoutContainerTop}>
            <View style={styles.textContain}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
              </TouchableOpacity>
              <Image
                style={styles.imageText}
                source={require('../../assets/images/setText.png')}
              />
            </View>
            <Image style={styles.image} source={require('../../assets/images/cat.png')} />
          </View>

          <View style={styles.content}>
            <View style={styles.row}>
              <Image source={require('../../assets/images/cat3.png')} style={styles.catImage} />
              <Text style={styles.guideText}>{t('huongdandoiNN')}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => changeLanguage('vi')}>
              <Text style={styles.buttonText}>🇻🇳 {t('vietnamese')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => changeLanguage('en')}>
              <Text style={styles.buttonText}>🇺🇸 {t('english')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content2}>
            <View style={styles.row}>
              <Image source={require('../../assets/images/comment.png')} style={styles.catImage} />
              <Text style={styles.guideText}>{t('huongdandoiNNN')}</Text>
            </View>
            <TextInput
              style={styles.input}
              multiline
              placeholder={t('enteryourmessage')}
              value={message}
              onChangeText={setMessage}
            />
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.sentbtn}>
            <Text style={{ color: '#fff', alignSelf: 'center', top: 5 }}>Gửi ngay!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:{
    backgroundColor: '#fff',
      padding: 10,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 4,
      width:320,
      alignSelf:'center',
      marginTop:20,
  },
   input: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  sentbtn:{
    backgroundColor: '#61BFE7', 
    borderRadius: 5, 
    width:100,
    height:30,
    bottom:30,
    alignSelf:'center'
   
  },
  content2:{
    backgroundColor: '#fff',
      padding: 10,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 4,
      width:320,
      alignSelf:'center',
      marginTop:10,
  },
  guideText: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    catImage: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
      marginRight: 10,
    },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
  backButton: { position: 'absolute', top: 30, left: 10 },
  backIcon: { width: 24, height: 24, resizeMode: 'contain' },
  layoutContainerTop: {
    width: '100%',
    height: 160,
    padding: 24,
    backgroundColor: '#61BFE7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
  },
  buttonText: { 
    fontSize: 16,
    alignSelf:'center', 
  },
  textContain:{
    flex: 1,
  },
  

  image:{
    width:90,
    height:120,
  },
  imageText:{
    width:150,
    height:38,
    top:70,
    left:30,
  },
  text:{
    color:'#fff',
    textAlign: 'center'
  },
   button: { 
    width: '80%', 
    padding: 15, 
    backgroundColor: '#E9ECED', 
    borderRadius: 12, 
    left:30, 
    marginBottom: 15 
  },
  boldText: { marginTop: 80, color: '#fff', fontSize: 23, textAlign: 'center' },
  layoutContainer: {
    alignContent:'center',
    width: 320,
    height: 500,
    padding: 20,
    backgroundColor: '#2C5D2F',
    top:20,
    borderColor: '#F10203',
    borderRadius: 25,
    marginLeft:20
  },
  itemContainer: {
    top:80,
    margin:10,
    flexDirection:'row',
    alignItems: 'center',
    backgroundColor: '#781A1B',
    borderRadius: 10,
    padding: 25,
  },
  viewSetting: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  
  

});
