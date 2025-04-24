import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';
import topicData from '../questions/it_stories_bilingual.json';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamsType } from '../navigations/type';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoriesDetail: React.FC = () => {
  const navigation = useNavigation<StackParamsType>();
  const route = useRoute();

  const { storiesID } = route.params as {
    storiesID: number;
    storiesName: string;
  };

  const selectedDepartment = topicData.departments.find(
    (dept) => dept.topicId === storiesID
  );

  const mergedTopics = selectedDepartment
    ? [
        ...(selectedDepartment.ai_topics || []),
        ...(selectedDepartment.accounting_topics || []),
      ]
    : [];

  // Trạng thái mở rộng bài viết
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('StoryContentScreen', { story: item })}
    >
      <Text style={styles.title}>{item.title_vi}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View>
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
                  source={require('../assets/images/back1.png')}
                />
                </TouchableOpacity>
            <Text style={styles.header}>{selectedDepartment?.topicName}</Text>
          </View>
        </View>
       <View style = {styles.list}>
       <FlatList
          data={mergedTopics}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
       </View>
        
      </View>
    </SafeAreaView>
    
  );
};

export default StoriesDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40, 
    backgroundColor: '#61BFE7',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    height:100,
    bottom:30,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#8FE1FF',
    padding: 12,
    borderRadius: 8,
    top:30,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  content: {
    fontSize: 16,
    color: '8FE1FF',
    marginBottom: 6,
  },
  button: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  backButton: {
    position: 'absolute', 
    left: 10,            
    zIndex: 10,           
    padding: 5,   
    
  },
  backIcon: {
    width: 30,  
    height: 30, 
    resizeMode: 'contain', 
  },
  list:{
    padding:20,
    bottom:60,
  },
});
