

import { View, Text } from 'react-native'
import React from 'react'
import EditProfileScreen from '@/src/components/profile/profile-edit'
import { useGetMeQuery } from '@/src/store/features/auth/auth.features';
import { router } from 'expo-router';

export default function EditProfile() {
    
      const {data:userData,isLoading} = useGetMeQuery(null);
      
      const data= userData?.data || [];
      const handelOnSave = ()=>{
        console.log("on saved clicked")
      }

  return (
    <EditProfileScreen user={data} onBack={()=>router.back() } />
  )
}