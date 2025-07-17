import React, { useEffect, useState } from 'react';
import {
  View, Image, StyleSheet, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList, ActivityIndicator, Alert,
} from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { RootStackParamList } from '../navigations/type'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

type NavigationType = NativeStackNavigationProp<RootStackParamList, 'ImageDetailScreen'>;

const imageMap: Record<string, any> = {
  allAboutMe: require('../assets/images/sport.png'),
  winningAndLosing: require('../assets/images/sport.png'),
  letIsShop: require('../assets/images/shop.png'),
  relax: require('../assets/images/relax.png'),
  extremeDiets: require('../assets/images/food.png'),
  myHome: require('../assets/images/house.png'),
  wildAtHeart: require('../assets/images/animal.png'),
  weAreOff: require('../assets/images/travel.png'),
};

const VocabScreen = () => {
  const navigation = useNavigation<NavigationType>();
  const [selected, setSelected] = useState<string | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const getVocabTopics = async () => {
    try {
      const snapshot = await firestore().collection('vocab').get();
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        title: formatTitle(doc.id),
        image: imageMap[doc.id] || require('../assets/images/house.png'),
      }));
      setTopics(fetched);
    } catch (error) {
      console.error('Lỗi khi lấy chủ đề vocab:', error);
        Alert.alert('Lỗi', 'Không thể tải chủ đề từ vựng. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const formatTitle = (id: string) => {
    return id
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  useEffect(() => {
    getVocabTopics();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.item, selected === item.id && styles.selectedItem]}
      onPress={() => {
        setSelected(item.id);
        navigation.navigate('DetailVocab', {
          topicId: item.id,
          topicTitle: item.title,
        });
      }}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

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
            <Image style={styles.backIcon} source={require('../assets/images/back1.png')} />
          </TouchableOpacity>
          <Text style={styles.header}>{t('tuvung')}</Text>
        </View>

        <View style={styles.itemContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#61BFE7" />
          ) : (
            <FlatList
              data={topics}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContent: {
    marginTop: 40,
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
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  selectedItem: {
    backgroundColor: '#61BFE7',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
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

export default VocabScreen;
