import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar,
  Platform, ActivityIndicator,
  PermissionsAndroid,
  Alert,
  Linking
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { t } from 'i18next';

const audioRecorderPlayer = new AudioRecorderPlayer();

const SpeakingDetailScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as { id: string };
    const [paragraph, setParagraph] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
  
    useEffect(() => {
      console.log('useEffect chạy với id:', id);
      const fetchParagraph = async () => {
        try {
          setLoading(true);
          console.log('Bắt đầu truy vấn Firestore...');
          const querySnapshot = await firestore()
            .collection('speaking')
            .doc(id)
            .collection('topic')
            .get();
  
          if (!querySnapshot.empty) {
            const document = querySnapshot.docs[0];
            console.log('Dữ liệu Firestore:', document.data());
            setParagraph(document.data()?.paragraph || '');
          } else {
            console.log('Không tìm thấy tài liệu!');
          }
        } catch (error) {
          console.error('Lỗi khi tải nội dung:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchParagraph();
    }, [id]);
  
    const requestPermissions = async (): Promise<boolean> => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Yêu cầu quyền ghi âm',
              message: 'Ứng dụng cần quyền ghi âm để bạn luyện nói.',
              buttonNeutral: 'Hỏi lại sau',
              buttonNegative: 'Từ chối',
              buttonPositive: 'Đồng ý',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
      } catch (err) {
        console.warn('Lỗi xin quyền:', err);
        return false;
      }
    };
      
  
    const onStartRecord = async () => {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Không có quyền ghi âm hoặc lưu trữ',
          'Hãy bật quyền ghi âm và lưu trữ trong phần Cài đặt > Ứng dụng.',
          [
            { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
            { text: 'Hủy', style: 'cancel' },
          ]
        );
        return;
      }
  
      try {
        // Dừng phiên ghi âm trước nếu đang chạy
        if (isRecording) {
          console.log('Đang ghi âm, dừng phiên trước...');
          await audioRecorderPlayer.stopRecorder();
          audioRecorderPlayer.removeRecordBackListener();
          setIsRecording(false);
        }
  
        const path = Platform.select({
          ios: `${RNFS.DocumentDirectoryPath}/voice.m4a`,
          android: `${RNFS.DocumentDirectoryPath}/voice.m4a`,
        });
  
        // Kiểm tra thư mục
        const dirPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.DocumentDirectoryPath;
        await RNFS.mkdir(dirPath);
  
        console.log('Bắt đầu ghi âm với đường dẫn:', path);
        const result = await audioRecorderPlayer.startRecorder(path);
        console.log('Kết quả ghi âm:', result);
        setIsRecording(true);
  
        audioRecorderPlayer.addRecordBackListener((e) => {
          console.log('Trạng thái ghi âm:', e);
          return;
        });
      } catch (e) {
        console.error('Lỗi khi ghi âm:', e);
        Alert.alert('Không thể bắt đầu ghi âm');
      }
    };
  
    const onStopRecord = async () => {
      try {
        console.log('Dừng ghi âm...');
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordedAudio(result);
        setIsRecording(false);
        console.log('Kết quả dừng ghi âm:', result);
      } catch (e) {
        console.error('Lỗi dừng ghi âm:', e);
        Alert.alert('Không thể dừng ghi âm');
      }
    };
  
    const onStartPlay = async () => {
      try {
        if (!recordedAudio) return;
        await audioRecorderPlayer.startPlayer(recordedAudio);
        audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.currentPosition === e.duration) {
            onStopPlay();
          }
        });
        setIsPlaying(true);
      } catch (e) {
        console.error('Lỗi phát lại:', e);
        Alert.alert('Không thể phát lại');
      }
    };
  
    const onStopPlay = async () => {
      try {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsPlaying(false);
      } catch (e) {
        console.error('Lỗi dừng phát:', e);
        Alert.alert('Không thể dừng phát');
      }
    };
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
            </TouchableOpacity>

          </View>
  
          {loading ? (
            <ActivityIndicator size="large" color="#61BFE7" />
          ) : (
            <Text style={[styles.paragraph, { fontWeight: 'bold', color: '#000' }]}>
              {paragraph}
            </Text>
          )}
  
          <View style={styles.buttonContainer}>
            <Button
              title={isRecording ? t('dungghiam') : t('ghiam')}
              color={isRecording ? 'red' : 'blue'}
              onPress={isRecording ? onStopRecord : onStartRecord}
              disabled={loading}
            />
          </View>
  
          <View style={styles.buttonContainer}>
            <Button
              title={isPlaying ? t('dungghiam') : t('playrecording')}
              disabled={!recordedAudio}
              onPress={isPlaying ? onStopPlay : onStartPlay}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    padding: 12,
  },
  buttonContainer: {
    marginTop: 12,
    width:200,
    alignSelf:'center',
    borderRadius:20,
  },
  header: {
    paddingTop: 35,
    backgroundColor: '#61BFE7',
    padding: 15,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 10,
    padding: 5,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default SpeakingDetailScreen;


