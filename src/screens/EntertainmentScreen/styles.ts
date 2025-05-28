import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('window');
const isTablet = width >= 768;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTrailer: {
    top: 50,
    backgroundColor: '#18141D',
    width: width,
    height: height,
    borderRadius: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedButtons: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateX: -75}],
  },
  share: {
    width: isTablet ? 30 * 1.5 : 30,
    height: isTablet ? 30 * 1.5 : 30,
    marginHorizontal: 20,
    bottom: isTablet ? 150 * 1.5 : 180,
    right: isTablet ? 70 * 1.5 : 60,
  },
  love: {
    width: isTablet ? 30 * 1.5 : 30,
    height: isTablet ? 30 * 1.5 : 30,
    marginHorizontal: 20,
    right: isTablet ? 37 * 1.5 : 30,
    bottom: isTablet ? 250 * 1.5 : 280,
  },
  add: {
    width: isTablet ? 30 * 1.5 : 30,
    height: isTablet ? 30 * 1.5 : 30,
    marginHorizontal: 20,
    bottom: isTablet ? 150 * 1.5 : 180,
  },
  errorText: {
    color: '#fff',
    fontSize: 15,
  },

  movieInfo: {
    position: 'absolute',
    bottom: 150,
    alignItems: 'center',
  },
  poster: {
    width: isTablet ? 100 * 1.5 : 100,
    height: isTablet ? 100 * 1.5 : 100,
    borderRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: isTablet ? 20 * 1.5 : 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  genre: {
    color: '#fff',
    fontSize: isTablet ? 16 * 1.5 : 16,
  },
  statusText: {
    color: '#fff',
    fontSize: isTablet ? 16 * 1.5 : 16,
    bottom: isTablet ? 150 * 1.5 : 180,
  },
});

export default styles;
