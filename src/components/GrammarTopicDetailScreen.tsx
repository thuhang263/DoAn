import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

interface GrammarTopic {
  topicId: number;
  topicName: string;
  structure: string;
  usage: string[];
  rules?: string[];
  signal_words?: string[];
}

const GrammarTopicDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { topicId } = route.params as { topicId: number; topicName: string };

  const [topic, setTopic] = useState<GrammarTopic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const snapshot = await firestore()
          .collection('tenses')
          .where('topicId', '==', topicId)
          .get();

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as GrammarTopic;
          setTopic(data);
        }
      } catch (error) {
        console.error('Lỗi lấy chi tiết topic:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#61BFE7" />
      </SafeAreaView>
    );
  }

  if (!topic) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Không tìm thấy nội dung!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView style={styles.container}>
        {/* Header và phần nội dung giữ nguyên, dùng `topic` đã lấy từ Firestore */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
   
  },
  content: {
    fontSize: 16,
    marginBottom: 10
  },
  bullet: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50
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
  body:{
    padding:20,
  }
});

export default GrammarTopicDetailScreen;