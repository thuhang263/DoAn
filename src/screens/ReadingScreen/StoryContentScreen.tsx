import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Tts from 'react-native-tts';
import firestore from '@react-native-firebase/firestore';

interface Story {
  title: string;
  content_en: string;
  content_vi: string;
  image?: string;
}

const StoryContentScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { facultyId, paragraphId, storyId } = route.params as {
    facultyId: string;
    paragraphId: string;
    storyId: string;
  };

  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const docRef = firestore()
          .collection('reading')
          .doc(facultyId)
          .collection('paragraphs')
          .doc(paragraphId)
          .collection('stories')
          .doc(storyId);

        const docSnap = await docRef.get();

        if (docSnap.exists()) {
          setStory(docSnap.data() as Story);
        } else {
          console.warn('Document not found.');
          setStory(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [facultyId, paragraphId, storyId]);

  useEffect(() => {
    return () => {
      Tts.stop(); 
    };
  }, []);

  const speakStory = async () => {
    if (!story) return;
    try {
      await Tts.stop();
      await Tts.setDefaultLanguage('en-US');
      await Tts.setDefaultRate(0.4, true);
      await Tts.speak(story.content_en);
    } catch (error) {
      console.error('Error starting TTS:', error);
    }
  };

  const getImage = (imageName?: string) => {
    return require('../../assets/images/ai.jpg'); 
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#61BFE7" />
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.centered}>
        <Text>Không tìm thấy nội dung.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backIcon}
          source={require('../../assets/images/back1.png')}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={getImage(story.image)} style={styles.storyImage} />
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.text}>{story.content_en}</Text>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.text}>{story.content_vi}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={speakStory}>
            <Text style={styles.buttonText}>Phát Audio</Text>
          </TouchableOpacity>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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