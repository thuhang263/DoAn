import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Image, StyleSheet,
  SafeAreaView, StatusBar, ImageBackground, ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface Read {
  id: string; 
  title: string;
  image: any;
}

const StoriesScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<Read[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const getFaculties = async () => {
      try {
        const snapshot = await firestore().collection('faculties').get();
        const list = snapshot.docs.map(doc => ({
          id: doc.id, 
          title: doc.id,
          image: getImageByFaculty(doc.id),
        }));
        setData(list);
      } catch (error) {
        console.error('Lỗi tải danh sách khoa:', error);
      } finally {
        setLoading(false);
      }
    };

    getFaculties();
  }, []);

  const getImageByFaculty = (facultyId: string) => {
    switch (facultyId) {
      case 'Khoa Công nghệ thông tin': return require('../../assets/stories/cntt.jpg');
      case 'Khoa Cơ khí': return require('../../assets/stories/cokhi.jpg');
      case 'Khoa Điện - Điện tử': return require('../../assets/stories/dien.jpg');
      case 'Khoa Hóa - Môi trường': return require('../../assets/stories/hoa_moitrg.jpg');
      case 'Khoa Kỹ thuật tài nguyên nước': return require('../../assets/stories/nuoc.jpg');
      case 'Khoa Kế toán và Kinh doanh': return require('../../assets/stories/ketoan.jpg');
      case 'Khoa Công trình': return require('../../assets/stories/congtrinh.jpg');
      case 'Khoa Luật và Lý luận chính trị': return require('../../assets/stories/luat.jpg');
      case 'Khoa Kinh tế và Quản lý': return require('../../assets/stories/kinhte.jpg');
      default: return require('../../assets/stories/cntt.jpg');
    }
  };

  const renderItem = ({ item }: { item: Read }) => {
    const imageSource = getImageByFaculty(item.title);
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
            <Text style={styles.text}>{t(`faculties.${item.title}`)}</Text>
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
          <Text style={styles.header}>{t('docsongngu')}</Text>
        </View>

        <View style={styles.itemContent}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
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
