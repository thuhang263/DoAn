
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/type';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const EndGame: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EndTest'>>();
  const correctCount = route.params?.correctCount ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.resultBox}>
        <Image
          source={require('../../assets/images/complete.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.description}>{correctCount} correct answers</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.playAgain}
            onPress={() => navigation.navigate('TestScreen')}>
            <Text style={styles.buttonText}>Trở về</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playAgain}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('HomeScreen'); 
              }
            }}
            >
            <Text style={styles.buttonText}>Làm lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBox: {
    width: 360,
    height: 393,
    backgroundColor: '#fff',
    padding:  20,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    width:  200,
    height:  200,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginVertical: 10,
  },
  buttonContainer: {flexDirection: 'row', marginTop: 15},
  playAgain: {
    backgroundColor: '#78C93C',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  homeButton: {
    backgroundColor: '#78C93C',
    padding: 10,
    borderRadius: 5,
    borderColor:'#78C93C',
  },
  buttonText: {color: '#fff', fontSize: 16},
});

export default EndGame;
