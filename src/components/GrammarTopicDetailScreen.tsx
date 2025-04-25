import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { StackParamsType } from '../navigations/type';
import grammarDataJson from '../Grammar/grammar_structures.json';
import { useNavigation, useRoute } from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu
interface GrammarTopic {
  topicId: number;
  topicName: string;
  name?: string;
  structure: string;
  usage: string[];
  rules?: string[];
  signal_words?: string[];
}

interface GrammarData {
  tenses: GrammarTopic[];
}

const grammarData = grammarDataJson as GrammarData;

const GrammarTopicDetailScreen = () => {
  const navigation = useNavigation<StackParamsType>();
  const route = useRoute();
  const { topicId } = route.params as { topicId: number; topicName: string };

  const topic = grammarData.tenses.find(item => item.topicId === topicId);

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
                source={require('../assets/images/back1.png')}
              />
            </TouchableOpacity>
              <Text style={styles.header}>{topic.name || topic.topicName}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.label}>1. Cấu trúc:</Text>
          <Text style={styles.content}>{topic.structure}</Text>

          {topic.usage?.length > 0 && (
            <>
              <Text style={styles.label}>2. Cách sử dụng:</Text>
              {topic.usage.map((item, index) => (
                <Text key={index} style={styles.bullet}>• {item}</Text>
              ))}
            </>
          )}

          {Array.isArray(topic.rules) && topic.rules.length > 0 && (
            <>
              <Text style={styles.label}>3. Quy tắc:</Text>
              {topic.rules.map((item, index) => (
                <Text key={index} style={styles.bullet}>• {item}</Text>
              ))}
            </>
          )}

          {Array.isArray(topic.signal_words) && topic.signal_words.length > 0 && (
            <>
              <Text style={styles.label}>4. Dấu hiệu nhận biết:</Text>
              <Text style={styles.content}>
                {topic.signal_words.join(', ')}
              </Text>
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