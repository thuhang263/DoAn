import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

type Vocab = {
  word: string;
  phonetic:string;
  partOfSpeech:string;
  meaning:string;
};

const NotebookScreen = () => {
    const [notebookList, setNotebookList] = useState<Vocab[]>([]);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchData = async () => {
        const snapshot = await firestore().collection('notebook').get();
        const data = snapshot.docs.map(doc => doc.data() as Vocab);
        setNotebookList(data);
        };
        fetchData();
    }, []);

  return (
    <SafeAreaView style={{flex:1}}>
        <View>
            <Text style={styles.header}>Sổ tay</Text>
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
                {notebookList.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.word}>Word: {item.word}</Text>
                    <Text style={styles.phonetic}>Phonetic: {item.phonetic}</Text>
                    <Text style={styles.partOfSpeech}>Part of speech: {item.partOfSpeech}</Text>
                    <Text style={styles.definition}>Definition: {item.meaning}</Text>
                </View>
                ))}
            </ScrollView>
        </View>
    </SafeAreaView>

    
  );
};

export default NotebookScreen;

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomWidth: 1 },
  word: { fontWeight: 'bold', fontSize: 16 },
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
  container: { padding: 16 },
  card: { backgroundColor: '#fff', marginBottom: 10, padding: 12, borderRadius: 8, elevation: 2 },

  phonetic: { fontStyle: 'italic', marginVertical: 4 },
  partOfSpeech: { color: 'gray' },
  definition: { marginTop: 4 },
});
