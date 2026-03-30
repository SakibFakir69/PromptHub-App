import * as SecureStore from "expo-secure-store";


const logOutUser = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");

  if (!accessToken || !refreshToken) {
    return;
  }
  // LOG OUT FROM DEVICE
  if (accessToken && refreshToken) {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  }
};

const isValidUser = async () => {

  try {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if(accessToken && refreshToken)
    {
        return {
            isValidUser:true
        }
    }
    //  IF VALID GO TO NEXT STEP 


  } catch (error) {
    console.log(error);
  }
};


export const authUtilsController ={
    logOutUser, isValidUser
}