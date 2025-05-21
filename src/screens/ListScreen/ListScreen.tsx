import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '../../navigations/type';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

const ListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomeScreen'>>();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/ds.png')} style={styles.avatarImage} />
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/listText.png')} style={styles.avatarImageText} />
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View>
          {/* Notebook */}
          <View style={styles.item}>
            <Image
              style={styles.ImageItem}
              source={require('../../assets/images/item1.png')}
            />
            <Text style={styles.text}>{t('sotay')}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('NotebookScreen')}
            >
              <Text style={styles.TextBtn}>{t('view')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListScreen;
