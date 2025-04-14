import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DatePicker = () => {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthDates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      monthDates.push(new Date(currentYear, currentMonth, day));
    }

    setDates(monthDates);
  }, []);

  const getDayName = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          const isSelected = selectedDate?.toDateString() === item.toDateString();
          return (
            <TouchableOpacity onPress={() => handleDatePress(item)} style={styles.touchable}>
              <View style={[styles.dateItem, isSelected && styles.activeDate]}>
                <Text style={[styles.dayText, isSelected && styles.activeDayText]}>
                  {getDayName(item)}
                </Text>
                <Text style={[styles.dateText, isSelected && styles.activeDateText]}>
                  {item.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  flatListContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  touchable: {
    marginHorizontal: 5,
  },
  dateItem: {
    width: 50,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  activeDate: {
    backgroundColor: '#61BFE7', // Màu xanh lá cây
  },
  dayText: {
    fontSize: 14,
    color: '#999',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
  },
  activeDayText: {
    color: '#000', // Màu chữ khi chọn
    fontWeight: 'bold',
  },
  activeDateText: {
    color: '#000', // Màu chữ khi chọn
  },
});

export default DatePicker;
