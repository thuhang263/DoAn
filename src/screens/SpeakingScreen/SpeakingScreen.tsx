import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View, Text, Button, StyleSheet, ScrollView, Alert, Platform,
  PermissionsAndroid, Linking, TouchableOpacity, Image, StatusBar
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { SafeAreaView } from 'react-native';
import speakingData from '../SpeakingScreen/speaking_topics.json'; // ✅ Đường dẫn đúng tới file JSON

const audioRecorderPlayer = new AudioRecorderPlayer();

const SpeakingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedParagraph, setSelectedParagraph] = useState<string | null>(null);

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
        'Không có quyền ghi âm',
        'Hãy bật quyền ghi âm trong phần Cài đặt > Ứng dụng.',
        [
          { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
          { text: 'Hủy', style: 'cancel' },
        ]
      );
      return;
    }

    try {
      const path = Platform.select({
        ios: 'voice.m4a',
        android: `${RNFS.ExternalDirectoryPath}/voice.mp4`,
      });

      const result = await audioRecorderPlayer.startRecorder(path);
      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener(() => {
        return;
      });
    } catch (e: any) {
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
              else navigation.navigate('HomeScreen');
            }}
          >
            <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
          </TouchableOpacity>
          <Text style={styles.header}>Speaking Practice</Text>
        </View>

        {/* ✅ Hiển thị danh sách các đoạn văn */}
        {speakingData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.paragraphBox}
            onPress={() => setSelectedParagraph(item.paragraph)}
          >
            <Text style={styles.paragraph}>{item.paragraph}</Text>
          </TouchableOpacity>
        ))}

        {/* ✅ Hiển thị đoạn được chọn để luyện nói */}
        {selectedParagraph && (
          <>
            <Text style={[styles.paragraph, { fontWeight: 'bold', color: '#000' }]}>
              {selectedParagraph}
            </Text>

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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
   
    
  },
  paragraphBox: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 12,
  },
  header: {
    paddingTop: 35,
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
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

export default SpeakingScreen;
