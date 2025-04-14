import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const grammarItems = {
  1: ['Simple Present', 'To be', 'Subject Pronouns'],
  2: ['Win vs Lose', 'Past Simple'],
  3: ['Shopping vocab', 'Countable/Uncountable'],
  4: ['Relaxing activities', 'Present Continuous'],
  5: ['Food vocab', 'Quantifiers'],
  6: ['House rooms', 'Prepositions of place'],
  7: ['Animals', 'Comparisons'],
  8: ['Travel verbs', 'Future Simple'],
};
type ParamsType = {
    topicId: keyof typeof grammarItems;
    topicTitle: string;
  };
  

  const GrammarTopicDetailScreen = () => {
    const route = useRoute();
    const { topicId, topicTitle } = route.params as ParamsType;
  
    // Kiểm tra xem topicId có hợp lệ không
    const grammarTopics = grammarItems[topicId] || [];
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{topicTitle}</Text>
        {grammarTopics.length > 0 ? (
          <FlatList
            data={grammarTopics}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.text}>{item}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No topics available.</Text>
        )}
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
