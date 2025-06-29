import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { t } from 'i18next';

interface Grammar {
  topicId: number;
  topicName: string;
  structure: string;
  usage: string;  
  rules?: string; 
  signal_words?: string;  
}

const GrammarTopicDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { topicId, topicName } = route.params as { topicId: number; topicName: string };

  const [topic, setTopic] = useState<Grammar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGrammarDetail = async () => {
      try {
        const snapshot = await firestore()
          .collection('tenses')
          .where('topicId', '==', topicId)
          .get();

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data() as Grammar;
          setTopic(data);
        }
      } catch (error) {
        console.error('Lỗi lấy chi tiết topic:', error);
      } finally {
        setLoading(false);
      }
    };

    getGrammarDetail();
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
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                  navigation.goBack();
              } else {
                  navigation.navigate('HomeScreen'); 
              }
              }}
            >
            <Image
              style={styles.backIcon}
              source={require('../assets/images/back1.png')}
            />
            </TouchableOpacity>
            <Text style={styles.header}>{t(`topicName.topic${topic.topicId}`)}</Text>
        </View>
      <ScrollView style={styles.container}>
        {/* Nội dung chi tiết topic */}
        <View style={styles.body}>
          <Text style={styles.label}>{t('cautruc')}</Text>
          <Text style={styles.content}>{topic.structure}</Text>

          <Text style={styles.label}>{t('cachsudung')}</Text>
          {/* Hiển thị trực tiếp usage vì nó là chuỗi */}
          <Text style={styles.content}>{topic.usage}</Text>

          {topic.rules && (
            <>
              <Text style={styles.label}>{t('quytac')}</Text>
              <Text style={styles.content}>{topic.rules}</Text>
            </>
          )}

          {topic.signal_words && (
            <>
              <Text style={styles.label}>{t('dauhieu')}</Text>
              <Text style={styles.content}>{topic.signal_words}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
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
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    padding: 10,
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

export default GrammarTopicDetailScreen;
