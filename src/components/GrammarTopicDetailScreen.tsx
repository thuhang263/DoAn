import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


  const GrammarTopicDetailScreen = () => {
  
    return (
      <View style={styles.container}>
       <Text>Hello</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    padding: 15,
    backgroundColor: '#E6F2FF',
    borderRadius: 10,
    marginBottom: 10,
  },
  text: { fontSize: 16 },
});

export default GrammarTopicDetailScreen;
