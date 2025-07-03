import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamsType } from '../../navigations/type';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import { t } from 'i18next';

const StoriesDetail: React.FC = () => {
  const navigation = useNavigation<StackParamsType>();
  const route = useRoute();

  const { storiesID, storiesName } = route.params as {
    storiesID: number;
    storiesName: string;
  };

  const [paragraphs, setParagraphs] = useState<any[]>([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const snapshot = await firestore()
          .collection('reading')
          .doc(storiesName)
          .collection('paragraphs')
          .get();
    
        const data = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(), 
        }));
    
        setParagraphs(data);
      } catch (error) {
        console.error('Error fetching paragraphs:', error);
      }
    };
    
  
    getStories();
  }, [storiesName]);
  

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('StoryContentScreen', {
          facultyId: storiesName,
         paragraphId: item.docId,
          storyId: item.id,
        })
      }
    >
      <Image
        source={require('../../assets/images/read.png')} 
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.header}>
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
              source={require('../../assets/images/back1.png')}
            />
          </TouchableOpacity>
           <Text style={{color:'#fff', fontSize:18,alignSelf:'center'}}>{t(`faculties.${storiesName}`)}</Text>
        </View>

        <View style={styles.list}>
          <FlatList
            data={paragraphs}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoriesDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    backgroundColor: '#61BFE7',
    padding: 15,
    height: 100,
    bottom: 40,
  },
  title:{
    fontSize:16,
    color:'black'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    top:20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 10,
    padding: 5,
    top:35,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  list: {
    padding: 20,
    bottom: 60,
  },
});