import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import BannerCarousel from '../../components/BannerCarousel';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Text style={styles.userName}>Chúc bạn ôn tập tiếng anh {'\n'} hiệu quả với TLEnglish!</Text>
          </View>
          <Image source={require('../../assets/images/duck.png')} style={styles.avatarImage} />
        </View>

        <View style={{ marginTop: 10 }}>
          <BannerCarousel />
        </View>
         {/*  Video học thuật */}
         <View style={styles.videoSection}>
            <TouchableOpacity onPress={() => navigation.navigate('TopicVideo')}>
              <View style={styles.thumbnailContainer}>
                <Image source={require('../../assets/images/IT.png')} style={styles.videoThumbnail} />
                <Image source={require('../../assets/images/youtobe.png')} style={styles.youtubeIcon} />
              </View>
            </TouchableOpacity>
            <View style={styles.videoLabel}>
              <Text style={styles.verticalText}>Video</Text>
            </View>
          </View>

        {/*  Ôn tậptập */}
        <Text style={styles.sectionTitle}>Ôn tập</Text>
        <View style={styles.ReadContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('VoccalScreen')}>
            <Image source={require('../../assets/images/tvcn3.jpg')} style={styles.avatarImageItem} /> 
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('GrammaScreen')}>
            <Image source={require('../../assets/images/np.png')} style={styles.avatarImageItem} />
          </TouchableOpacity>
        </View> 
          
        {/* Đọc và nghe */}
        <Text style={styles.sectionTitle2}>Song ngữ và Nghe</Text>
        <View style={styles.ReadContainer}>
          <TouchableOpacity  onPress={() => navigation.navigate('StoriesScreen')}>
            <Image source={require('../../assets/images/doc.jpg')} style={styles.avatarImageItem} />

          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('ListeningScreen')}>
          <Image source={require('../../assets/images/listen.png')} style={styles.avatarImageItem} />

          </TouchableOpacity>
        </View> 
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
