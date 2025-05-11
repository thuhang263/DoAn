import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

type Vocab = {
    word: string;
    phonetic: string;
    partOfSpeech: string;
    definition: string;
};

const FavoriteVocabScreen = () => {
    const [favoriteVocab, setFavoriteVocab] = useState<Vocab[]>([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchData = async () => {
        const snapshot = await firestore().collection('favoriteVoc').get();
        const data = snapshot.docs.map(doc => doc.data() as Vocab);
        setFavoriteVocab(data);
        };

        fetchData();
    }, []);

  return (
    <SafeAreaView style={{flex:1}}>
        <View>
            <Text style={styles.header}>Từ vựng yêu thích</Text>
            <TouchableOpacity
                style={{ position: 'absolute', left: 10 }}
                onPress={() => {
                    if (navigation.canGoBack()) navigation.goBack();
                }}
                >
                <Image source={require('../../assets/images/back1.png')} style={{ width: 30, height: 30,top:40, left:20, }} />
            </TouchableOpacity>
        </View>
        <View>
            <ScrollView style={styles.container}>
                {favoriteVocab.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.word}>Word: {item.word}</Text>
                    <Text style={styles.phonetic}>Phonetic: {item.phonetic}</Text>
                    <Text style={styles.partOfSpeech}>Part of speech: {item.partOfSpeech}</Text>
                    <Text style={styles.definition}>Definition: {item.definition}</Text>
                </View>
                ))}
            </ScrollView>
        </View>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { backgroundColor: '#fff', marginBottom: 10, padding: 12, borderRadius: 8, elevation: 2 },
  word: { fontSize: 16 },
  phonetic: { fontStyle: 'italic', marginVertical: 4 },
  partOfSpeech: { color: 'gray' },
  definition: { marginTop: 4 },
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
});

export default FavoriteVocabScreen;
