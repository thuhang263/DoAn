import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface GrammarTopic {
  id: number;
  title: string;
}


const GrammaScreen = () => {
  const navigation = useNavigation();
    const [data, setData] = useState<GrammarTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const getGrammar = async () => {
      try {
        const snapshot = await firestore().collection('tenses').orderBy('topicId').get();
        const list = snapshot.docs.map(doc => ({
          id: doc.data().topicId,
          title: `topic${doc.data().topicId}`, 
        }));
        setData(list);
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
      } finally {
      setLoading(false);
    }
  };


  getGrammar();
}, []);


  const renderItem = ({ item }: { item: GrammarTopic }) => (
  <TouchableOpacity
    style={{
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    }}
    onPress={() => {
      setSelected(item.id);
      navigation.navigate('GrammarTopicDetailScreen', {
        topicId: item.id,
         topicName: t(`topicName.${item.title}`), 
      });
    }}
  >
    <Image
      source={require('../../assets/images/nguphap.png')}
      style={styles.image}
    />
   <Text style={styles.text}>{t(`topicName.${item.title}`)}</Text> 
  </TouchableOpacity>
  );


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#61BFE7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
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
            source={require('../../assets/images/back1.png')}
            />
          </TouchableOpacity>     
          <Text style={styles.header}>{t('nguphap')}</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContent:{
    marginTop:10,
    width:369,
    alignContent:'center',
    left:20,

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
   image: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    margin:6,
    padding:12,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
  },
  selectedItem: {
    backgroundColor: '#61BFE7',
  },
  
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    
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

export default GrammaScreen;
