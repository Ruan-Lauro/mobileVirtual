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

  alert('Passei do primeiro');

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  alert('Passei do segundo');

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  alert('Passei do terceiro');
 
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  alert('Passei do quarto');

  const storedToken = await AsyncStorage.getItem('pushToken');
  if (storedToken) {
    alert('Fui armazenado');
    return storedToken; 
  }

  alert('Passei do quinto');

  token = (await Notifications.getExpoPushTokenAsync()).data;

  alert(token);

  alert('Passei do sexto');

  await AsyncStorage.setItem('pushToken', token);

  alert('Passei do setimo');
 
  await authenticationAddTN({ token, userId });

  alert('Passei do oitavo');

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Mural Virtual',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFFFFF',
      showBadge: true,  
    });
  }

  alert(`Passei do nono ${token}`);

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

