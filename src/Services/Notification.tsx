import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { useAddTokenNotification } from '../hooks/useAddTokenNotification';
// import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registerForPushNotificationsAsync(userId: string) {

  let token;
  const { authenticationAddTN } = useAddTokenNotification();
 
  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;


  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

 
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }


  const storedToken = await AsyncStorage.getItem('pushToken');
  if (storedToken) {
    return storedToken; 
  }


  try {
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } catch (error) {
    console.error("Erro ao gerar o token:", error);
    alert("Erro ao gerar o token de notificação.");
    return;
  }
  

  await AsyncStorage.setItem('pushToken', token);

 
  await authenticationAddTN({ token, userId });


  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Mural Virtual',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFFFFF',
      showBadge: true,  
    });
  }


  return token;
}


// Notifications.setNotificationHandler({
//   handleNotification: async (notification) => {
//     console.log('Received notification:', notification);
   
//     return {
//       shouldShowAlert: true, 
//       shouldPlaySound: true, 
//       shouldSetBadge: true,
//     };
//   },
// });


Notifications.addNotificationReceivedListener((notification) => {
  console.log('Received notification:', notification);

});

