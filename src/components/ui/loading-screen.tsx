import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
     
      <ActivityIndicator size="large" color="white" />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
   
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});