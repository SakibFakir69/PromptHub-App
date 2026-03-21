import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Platform } from 'react-native';
// Put this OUTSIDE your RegisterPage component
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ 
        borderLeftColor: '#00AA45', 
        backgroundColor: '#00AA45', 
        marginTop: Platform.OS === 'ios' ? 0 : 20, // Adjust for Android status bar
        height: 70,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#00AA45' }}
      text2Style={{ fontSize: 13, color: '#657786' }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FF3B30', backgroundColor: '#111', height: 70 }}
      text1Style={{ fontSize: 16, color: '#FFF' }}
      text2Style={{ fontSize: 13, color: '#FFBABA' }}
    />
  )
};