import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

// đăng ký playback service đúng cách (truyền hàm, không phải giá trị import)
TrackPlayer.registerPlaybackService(() => require('./src/utils/trackPlayerService'));

// setupPlayer 1 lần khi app khởi động
TrackPlayer.setupPlayer()
  .then(() => {
    console.log('TrackPlayer ready!');
  })
  .catch(e => console.error('Setup error:', e));

// đăng ký app
AppRegistry.registerComponent(appName, () => App);
