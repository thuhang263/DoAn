import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamsType } from '../navigations/type';

const StoryContentScreen: React.FC = () => {
  const navigation = useNavigation<StackParamsType>();
  const route = useRoute();
  const { story } = route.params as { story: any };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backIcon}
          source={require('../assets/images/back1.png')}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{story.title_vi}</Text>
        <Text style={styles.text}>{story.content_vi}</Text>
        <Text style={styles.title}>{story.title_en}</Text>
        <Text style={styles.text}>{story.content_en}</Text>
      </ScrollView>
    </View>
  );
};

export default StoryContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
