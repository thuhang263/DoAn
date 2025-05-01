import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, Platform, PermissionsAndroid, Linking, TouchableOpacity, Image, StatusBar } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { SafeAreaView } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const paragraph: string = `Software engineering is the application of engineering principles to software development.
It is a systematic approach that aims to produce reliable and efficient software.`;

const SpeakingScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const navigation = useNavigation();
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
      return true; // iOS tự động được phép nếu config đúng
    } catch (err) {
      console.warn('Lỗi khi xin quyền ghi âm:', err);
      return false;
    }
  };
  

  const onStartRecord = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Không có quyền ghi âm',
        'Hãy bật quyền ghi âm trong phần Cài đặt > Ứng dụng.',
        [
          {
            text: 'Mở cài đặt',
            onPress: () => Linking.openSettings(),
          },
          { text: 'Hủy', style: 'cancel' },
        ]
      );
      return;
    }

    try {
      const path = Platform.select({
        ios: 'voice.m4a',
        android: `${RNFS.ExternalDirectoryPath}/voice.mp4`, // Lưu vào thư mục ứng dụng cho Android
      });

      const result = await audioRecorderPlayer.startRecorder(path);
      console.log('Bắt đầu ghi âm:', result);
      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener((e) => {
        // Optional: bạn có thể in thời gian ghi âm tại đây
        return;
      });
    } catch (e: any) {
      console.error('Lỗi khi bắt đầu ghi âm:', e);
      Alert.alert('Lỗi ghi âm', e.message || 'Không thể bắt đầu ghi âm');
    }
  };

  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordedAudio(result);
      setIsRecording(false);
    } catch (e: any) {
      Alert.alert('Lỗi dừng ghi âm', e.message || 'Không thể dừng ghi âm');
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
    } catch (e: any) {
      Alert.alert('Lỗi phát lại', e.message || 'Không thể phát lại');
    }
  };

  const onStopPlay = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setIsPlaying(false);
    } catch (e: any) {
      Alert.alert('Lỗi dừng phát', e.message || 'Không thể dừng phát');
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('HomeScreen'); // Chuyển về Home nếu không có màn nào để quay lại
              }
            }}
          >
            <Image
                style={styles.backIcon}
                source={require('../../assets/images/back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Speaking Practice</Text>
        </View>
      
        
        <Text style={styles.paragraph}>{paragraph}</Text>
        <View style={styles.buttonContainer}>
       
          <Button
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
            color={isRecording ? 'red' : 'blue'}
            onPress={isRecording ? onStopRecord : onStartRecord}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={isPlaying ? 'Stop Playback' : 'Play Recording'}
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
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 24,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  header: {
    paddingTop: 35, 
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
   
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

export default SpeakingScreen;
