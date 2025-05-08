import React, { useEffect, useState } from 'react';
import {
  View,Text, FlatList,TouchableOpacity,Image, StyleSheet, SafeAreaView, StatusBar, ImageBackground, ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

interface Topic {
  id: number;
  title: string;
}

const StoriesScreen = () => {
  const navigation = useNavigation();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const snapshot = await firestore().collection('reading').get();
        const data: Topic[] = snapshot.docs.map((doc, index) => ({
          id: index + 1,
          title: doc.data().title || doc.id, // Lấy title từ Firestore, nếu không có thì dùng doc.id
        }));
        setTopics(data);
      } catch (error) {
        console.error('Error fetching faculties: ', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFaculties();
  }, []);
  

  const getImageById = (id: number) => {
    switch (id) {
      case 1: return require('../../assets/stories/cntt.jpg');
      case 2: return require('../../assets/stories/ketoan.jpg');
      case 3: return require('../../assets/stories/cokhi.jpg');
      case 4: return require('../../assets/stories/dien.jpg');
      case 5: return require('../../assets/stories/hoa_moitrg.jpg');
      case 6: return require('../../assets/stories/kinhte.jpg');
      case 7: return require('../../assets/stories/nuoc.jpg');
      case 8: return require('../../assets/stories/congtrinh.jpg');
      case 9: return require('../../assets/stories/luat.jpg');
      default: return require('../../assets/stories/cntt.jpg');
    }
  };

  const renderItem = ({ item }: { item: Topic }) => {
    const imageSource = getImageById(item.id);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('StoriesDetail', {
            storiesID: item.id,
            storiesName: item.title,
          })
        }
      >
        <ImageBackground source={imageSource} style={styles.image} imageStyle={{ borderRadius: 10 }}>
          <View style={styles.overlay}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#61BFE7" />
      </View>
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
          <Text style={styles.header}>Đọc song ngữ Anh - Việt</Text>
        </View>

        <View style={styles.itemContent}>
          <FlatList
            data={topics}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
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
    marginTop: 20,
    paddingHorizontal: 10,
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
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  item: {
    flex: 1,
    height: 120,
    marginHorizontal: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
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

export default StoriesScreen;
