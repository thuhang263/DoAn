import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { RootStackParamList } from '../../navigations/type'; 
import { useTranslation } from 'react-i18next';


type MajorListScreenRouteProp = RouteProp<RootStackParamList, 'UnitScreen'>;
type Navigation = NavigationProp<RootStackParamList, 'UnitScreen'>;

interface VocabularyItem {
  word: string;
  partOfSpeech: string;
  phonetic: string;
  definition: string;
}

interface Unit {
  unitName: string;
  vocabulary: VocabularyItem[];
}

const UnitScreen: React.FC<{ route: MajorListScreenRouteProp }> = ({ route }) => {
  const navigation = useNavigation<Navigation>();
  const { facultyName } = route.params;
  const { t } = useTranslation();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUnits = async () => {
      try {
        const unitsSnapshot = await firestore()
          .collection('faculties')
          .doc(facultyName)
          .collection('units')
          .get();

          const fetchedUnits: Unit[] = unitsSnapshot.docs.map((doc) => ({
            unitName: doc.data().unitName || doc.id, 
            vocabulary: doc.data().vocabulary || [],
          }));
        setUnits(fetchedUnits);
      } catch (error) {
        console.error('Lỗi khi lấy units:', error);
      } finally {
        setLoading(false);
      }
    };

    getUnits();
  }, [facultyName]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
              }
            }}
          >
            <Image style={styles.backIcon} source={require('../../assets/images/back1.png')} />
          </TouchableOpacity>
         <Text style={styles.header}>{t(`faculties.${facultyName}`)}</Text>

        </View>

        <FlatList
          data={units}
          keyExtractor={(item) => item.unitName}
          renderItem={({ item }) => (
            <TouchableOpacity
           
              onPress={() =>
                navigation.navigate('VocabularyListScreen', {
                  majorName: item.unitName,
                  facultyName: facultyName,
                  unitId: item.unitName,
                })
              }
              style={{ marginTop: 10,
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
            >
              <Image
                  source={require('../../assets/images/code.png')} 
                  style={styles.image}
              />
              <Text style={{ fontSize: 18 }}>{item.unitName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 35,
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 18,
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
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default UnitScreen;
