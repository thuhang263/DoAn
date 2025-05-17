import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import BannerCarousel from '../../components/BannerCarousel';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/home2.png')} style={styles.avatarImageText} />
        </View>
        <Image source={require('../../assets/images/learn.png')} style={styles.avatarImage} />
      </View>

      <ScrollView style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <BannerCarousel />
        </View>

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

        <Text style={styles.sectionTitle}>{t('review')}</Text>
        <View style={styles.ReadContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('VoccalScreen')}>
            <Image source={require('../../assets/images/tvcn3.jpg')} style={styles.avatarImageItem} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('GrammaScreen')}>
            <Image source={require('../../assets/images/np.png')} style={styles.avatarImageItem} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle2}>{t('practiceSkills')}</Text>
        <View style={styles.ReadContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('StoriesScreen')}>
            <Image source={require('../../assets/images/doc.jpg')} style={styles.avatarImageItem} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SpeakingScreen')}>
            <Image source={require('../../assets/images/speak.jpg')} style={styles.avatarImageItem} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle2}>{t('entertainment')}</Text>
        <View style={styles.ReadContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ListeningScreen')}>
            <Image source={require('../../assets/images/listen.png')} style={styles.avatarImageItem} />
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

