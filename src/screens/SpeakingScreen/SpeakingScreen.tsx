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
          .collection('speaking') 
          .get();
          
    
        const docs = snapshot.docs.map(doc => ({
          id: doc.id, 
          paragraph: doc.data().paragraph || '', 
        }));
    
        setDocuments(docs); 
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
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
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#61BFE7" />
        ) : (
          documents.map((doc) => (
            <TouchableOpacity
           
              key={doc.id}
              style={styles.card}
              onPress={() => navigation.navigate('SpeakingDetailScreen', { paragraph: doc.paragraph, id: doc.id })}
            >
              <Image
                  source={require('../../assets/images/speak.png')} 
                  style={styles.image}
              />
              <View style={{flex:1}}>
                <Text style={styles.paragraph}>{doc.id}</Text> 
              </View>
             
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    top:10,
    width:320,
    alignSelf:'center',
  },
});

export default SpeakingScreen;
