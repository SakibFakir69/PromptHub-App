import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 

  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

import RegisterPage from '@/src/components/auth/register-screen';

export default function RegisterScreen() {
  

  return (
    <RegisterPage/>
  );
}