

import { View, Text } from 'react-native'
import React from 'react'
import ProfileScreen from '@/src/components/auth/profile-screen'
import { useGetMeQuery } from '@/src/store/features/auth/auth.features'
import ProfileScreenSkeleton from '@/src/components/profile/profile-skeleton';

export default function Profile() {

  const {data:userData,isLoading} = useGetMeQuery(null);
  
  const data= userData?.data || [];

  if(isLoading)
  {
    return <ProfileScreenSkeleton/>
  }


  return (
    <ProfileScreen user={data} isLoading={isLoading}/>
  )
}