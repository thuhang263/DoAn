import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {getMoviesWithTrailers} from '../../api/tmdbApi';
import styles from '../ListeningScreen/styles';

const {width, height} = Dimensions.get('window');

interface MovieTrailer {
  id: string;
  title: string;
  poster: string;
  trailerKey: string;
  genre: string;
  year: string;
}

const ListeningScreen = () => {
  const [videos, setVideos] = useState<MovieTrailer[]>([]);
  const [playing, setPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoList = await getMoviesWithTrailers();
      setVideos(videoList);
    };
    fetchVideos();
  }, []);

  const onChangeVideo = useCallback((index: number) => {
    setCurrentVideoId(() => {
      const newVideo = videos[index]?.trailerKey || null;
      return newVideo;
    });
    setPlaying(true);
  }, [videos]);

 
  

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.videoContainer}>
            <View style={styles.videoTrailer}>
              {item.trailerKey ? (
                <YoutubePlayer
                  ref={playerRef}
                  height={height}
                  width={width}
                  videoId={item.trailerKey}
                  play={currentVideoId === item.trailerKey ? playing : false}
                />
              ) : (
                <Text style={styles.errorText}>No Trailer Available</Text>
              )}
            </View>
            <View style={styles.movieInfo}>
              <Image source={{uri: item.poster}} style={styles.poster} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.genre}>{item.year}</Text>
            </View>
            
          </View>
        )}
        onMomentumScrollEnd={event => {
          const viewHeight = event.nativeEvent.layoutMeasurement.height;
          const index = Math.round(
            event.nativeEvent.contentOffset.y / viewHeight,
          );
          onChangeVideo(index);
        }}
        snapToInterval={height}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

export default ListeningScreen;
