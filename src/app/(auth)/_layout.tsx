import { View, Text } from 'react-native'
import React from 'react'
import { Slot, usePathname } from 'expo-router';

export default function AuthLayout() {
    console.log("auth");
    const path = usePathname();
    console.log(path);

  return (
    <View>
    
      <Slot/>

    </View>
  )
}