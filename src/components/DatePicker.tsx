import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

type DatePickerProps = {
  onDateChange?: (date: Date) => void; // Thêm prop callback
};

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Tạo danh sách tất cả các ngày trong tháng hiện tại
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

  // Hàm lấy thứ (tên của ngày trong tuần)
  const getDayName = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date); // Gọi callback nếu có
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => {
          const isSelected = selectedDate?.toDateString() === item.toDateString();
          return (
            <TouchableOpacity onPress={() => handleDatePress(item)}>
              <View
                style={[
                  styles.dateContainer,
                  isSelected && { backgroundColor: '#FDD74B' },
                ]}
              >
                <Text style={styles.dateText}>{item.getDate()}</Text>
                <Text style={styles.dayText}>{getDayName(item)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.flatListContainer}
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
  dateContainer: {
    width: 50,
    height: 90,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    alignItems: 'center',
    margin: 5,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#555',
  },
});

export default DatePicker;