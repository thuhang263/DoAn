import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';


const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar} />
          <Text style={styles.userName}>Kim Trang</Text>
        </View>
        <Image source={require('../../assets/images/duck.png')} style={styles.avatarImage} />
      </View>
      
      {/* Date Selection */}
      <View style={styles.dateContainer}>
        {[16, 17, 18, 19, 20, 21, 22].map((day, index) => (
          <View key={index} style={day === 18 ? styles.activeDate : styles.dateItem}>
            <Text style={styles.dateText}>{day}</Text>
          </View>
        ))}
      </View>
      
      {/* Attendance Button */}
      <TouchableOpacity style={styles.attendanceButton}>
        <Text style={styles.attendanceText}>Attendance</Text>
      </TouchableOpacity>
      
      {/* Latest Lesson */}
      <View style={styles.lessonCard}>
       
        <View>
          <Text style={styles.lessonTitle}>Vocabulary: Work</Text>
          <Text style={styles.lessonSubText}>Continue your journey!</Text>
        </View>
        <View style={styles.starContainer}>
          
        </View>
      </View>
      
      <TouchableOpacity style={styles.studyButton}>
        <Text style={styles.studyButtonText}>Continue Studying</Text>
      </TouchableOpacity>
      
      {/* Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryBox}>
            <Image source={require('../../assets/images/voc.png')} style={styles.avatarImage} />
            <Text style={styles.categoryText}>Vocabulary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
            <Image source={require('../../assets/images/gram.png')} style={styles.avatarImage} />
            <Text style={styles.categoryText}>Grammar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
            <Image source={require('../../assets/images/movie.png')} style={styles.avatarImage} />
            <Text style={styles.categoryText}>Movie</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: 'lightgreen', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc' },
  userName: { marginLeft: 10, fontSize: 18, fontWeight: 'bold' },
  avatarImage: { width: 50, height: 50 },
  dateContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  dateItem: { padding: 5 },
  activeDate: { backgroundColor: 'green', padding: 5, borderRadius: 5 },
  dateText: { fontSize: 16 },
  attendanceButton: { backgroundColor: 'green', padding: 10, alignSelf: 'center', borderRadius: 5 },
  attendanceText: { color: '#fff', fontWeight: 'bold' },
  lessonCard: { flexDirection: 'row', alignItems: 'center', padding: 15, margin: 10, borderWidth: 1, borderRadius: 10 },
  lessonTitle: { fontWeight: 'bold', fontSize: 16 },
  lessonSubText: { color: 'gray' },
  starContainer: { flexDirection: 'row', marginLeft: 'auto' },
  studyButton: { backgroundColor: 'green', padding: 10, alignSelf: 'center', borderRadius: 5, marginVertical: 10 },
  studyButtonText: { color: '#fff', fontWeight: 'bold' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
  categoryBox: { backgroundColor: 'lightgreen', padding: 20, borderRadius: 10, width: '40%', alignItems: 'center', marginVertical: 5 },
  categoryText: { fontWeight: 'bold' },
});

export default HomeScreen;