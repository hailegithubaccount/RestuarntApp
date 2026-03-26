import {Notifier} from 'react-native-notifier';


export function handleError(error) {
  const message = error?.response?.data?.message || error?.data?.message;
  if (message) {
    Notifier.showNotification({
      title: 'Error',
      description: message,
     
      duration: 5000,
     
    });
  }
}
