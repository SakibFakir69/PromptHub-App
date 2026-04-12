

import { View, Text } from 'react-native'
import React from 'react'
import SettingScreen from '@/src/components/setting/setting-screen'
import { useGetMeQuery, useLogoutUserMutation } from '@/src/store/features/auth/auth.features';

export default function Setting() {

   const {data:userData,isLoading} = useGetMeQuery(null);
   const [ logoutUser] = useLogoutUserMutation();
      
      const data= userData?.data || [];

      const handleLogOut =async ()=>{
        try {
          const result = await logoutUser(null).unwrap();
          console.log(result , 'log out user');
          
        } catch (error) {
          console.log(error);
          
        }
      }



  return (
    <SettingScreen user={data} onLogout={handleLogOut} />
  )
}