import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamsType } from '../navigations/type';
import Tts from 'react-native-tts';

const StoryContentScreen: React.FC = () => {
  const navigation = useNavigation<StackParamsType>();
  const route = useRoute();
  const { story } = route.params as { story: any };

  const [isReading, setIsReading] = useState(false);
  const [step, setStep] = useState<'en' | 'vi' | null>(null);

  useEffect(() => {
    const onFinish = () => {
      if (step === 'en') {
        Tts.setDefaultLanguage('vi-VN');
        Tts.speak(story.content_vi);
        setStep('vi');
      } else if (step === 'vi') {
        setIsReading(false);
        setStep(null);
        Tts.setDefaultLanguage('en-US');
      }
    };

    const finishListener = Tts.addEventListener('tts-finish', onFinish);

    return () => {
      finishListener.remove(); // Cleanup đúng chuẩn (hiện tại addEventListener trả về 1 object có remove)
      Tts.stop();
    };
  }, [step, story.content_vi]);

  const speakStory = async () => {
    if (isReading) return;
    await Tts.stop();
    setIsReading(true);
    setStep('en');
    await Tts.setDefaultLanguage('en-US');
    await Tts.setDefaultRate(0.4, true); 
    Tts.speak(story.content_en);
  };

  const stopSpeaking = async () => {
    await Tts.stop();
    setIsReading(false);
    setStep(null);
  };
  const getImage = (imageName: string) => {
    switch (imageName) {
      case 'ai_applications.png':
        return require('../assets/images/ai.jpg');
      case 'ai_news.png':
        return require('../assets/images/ai.jpg');
      case 'big_data.png':
        return require('../assets/images/ai.jpg');
      case 'cloud_computing.png':
        return require('../assets/images/ai.jpg');
      // thêm ảnh khác tương ứng
      default:
        return require('../assets/images/ai.jpg'); // ảnh mặc định nếu không tìm thấy
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backIcon}
          source={require('../assets/images/back1.png')}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={getImage(story.image)}
          style={styles.storyImage}
        />
        <Text style={styles.title}>{story.title_en}</Text>
        <Text style={styles.text}>{story.content_en}</Text>
        <Text style={styles.title}>{story.title_vi}</Text>
        <Text style={styles.text}>{story.content_vi}</Text>
        

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, isReading && { backgroundColor: '#888' }]}
            onPress={speakStory}
            disabled={isReading}
          >
            {isReading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Phát Audio</Text>
            )}
          </TouchableOpacity>

          {isReading && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red', marginLeft: 10 }]}
              onPress={stopSpeaking}
            >
              <Text style={styles.buttonText}>Dừng</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StoryContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  storyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
