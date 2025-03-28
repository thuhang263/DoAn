
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/type';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const isTablet = width >= 768;
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
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() =>
              navigation.navigate('RootBottomNavigation', {
                screen: 'HomeScreen',
              })
            }>
            <Text style={styles.buttonText}>Home</Text>
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
    width: isTablet ? 360 * 1.5 : 360,
    height: isTablet ? 393 * 1.5 : 393,
    backgroundColor: '#fff',
    padding: isTablet ? 20 * 1.5 : 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    width: isTablet ? 200 * 1.5 : 200,
    height: isTablet ? 200 * 1.5 : 200,
    marginBottom: 10,
  },
  title: {
    fontSize: isTablet ? 22 * 1.5 : 22,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
  description: {
    fontSize: isTablet ? 16 * 1.5 : 16,
    color: '#000',
    marginVertical: isTablet ? 10 * 1.5 : 10,
  },
  buttonContainer: {flexDirection: 'row', marginTop: 15},
  playAgain: {
    backgroundColor: '#78C93C',
    padding: isTablet ? 10 * 1.5 : 10,
    borderRadius: 5,
    marginRight: 10,
  },
  homeButton: {
    backgroundColor: '#78C93C',
    padding: isTablet ? 10 * 1.5 : 10,
    borderRadius: 5,
    borderColor:'#78C93C',
  },
  buttonText: {color: '#fff', fontSize: isTablet ? 16 * 1.5 : 16},
});

export default EndGame;
