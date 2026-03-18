import { View, Text } from 'react-native'
import React from 'react'
import { Slot, usePathname } from 'expo-router';
// ADD - LINTER, FORMATTER


export default function AuthLayout() {
    console.log("auth");
    const path = usePathname();
    console.log(path);

  return (
    <View className='flex-1'>
    
      <Slot/>

    </View>
  )
}