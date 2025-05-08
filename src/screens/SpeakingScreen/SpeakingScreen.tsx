import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SpeakingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const snapshot = await firestore()
          .collection('speaking') // Lấy tất cả documents trong collection "speaking"
          .get();
          
    
        const docs = snapshot.docs.map(doc => ({
          id: doc.id, // Lấy ID của document
          paragraph: doc.data().paragraph || '', // Lấy nội dung đoạn văn
        }));
    
        setDocuments(docs); // Lưu danh sách documents vào state
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments(); // Gọi hàm để lấy dữ liệu
  }, []);
  
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

        {loading ? (
          <ActivityIndicator size="large" color="#61BFE7" />
        ) : (
          documents.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.paragraphBox}
              onPress={() => navigation.navigate('SpeakingDetailScreen', { paragraph: doc.paragraph, id: doc.id })}
            >
              <Text style={styles.paragraph}>{doc.id}</Text> 
            </TouchableOpacity>
          ))
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
