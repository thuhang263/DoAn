import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const VoccalScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const snapshot = await firestore().collection('faculties').get();
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.id,
          image: getImageByFaculty(doc.id), // tùy chọn ảnh
        }));
        setData(list);
      } catch (error) {
        console.error('Lỗi tải danh sách khoa:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  const getImageByFaculty = (facultyId: string) => {
    switch (facultyId) {
      case 'Khoa Công nghệ thông tin': return require('../../assets/images/cntt.png');
      case 'Khoa Cơ khí': return require('../../assets/images/cokhi.png');
      case 'Khoa Điện - Điện tử': return require('../../assets/images/dientu.png');
      case 'Khoa Hóa - Môi trường': return require('../../assets/images/moitrg.png');
      case 'Khoa Kỹ thuật tài nguyên nước': return require('../../assets/images/nuoc.png');
      case 'Khoa Kế toán và Kinh doanh': return require('../../assets/images/ketoan.png');
      case 'Khoa Công trình': return require('../../assets/images/congtrinh.png');
      case 'Khoa Luật và Lý luận chính trị': return require('../../assets/images/luat.png');
      case 'Khoa Kinh tế và Quản lý': return require('../../assets/images/kinhte.png');
      default: return require('../../assets/images/champion.png');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.item, selected === item.id && styles.selectedItem]}
      onPress={() => {
        setSelected(item.id);
        navigation.navigate('MajorListScreen', { facultyName: item.title });
      }}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{t(`faculties.${item.title}`)}</Text>
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
          <Text style={styles.header}>{t('botuvung')}</Text>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
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
    padding: 13,
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

export default VoccalScreen;
