import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DetailScreen = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default DetailScreen;
