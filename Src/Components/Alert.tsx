import {StyleSheet, View, Text, Image, ImageSourcePropType} from 'react-native';

import {Images} from '../Assets/index';

interface CustomAlertProps {
  title: string;
  description: string;
  alertType?: 'success' | 'error' | 'warning' | 'info';
}

function CustomAlert({
  title,
  description,
  alertType = 'success',
}: CustomAlertProps) {
  const alertIconSource: ImageSourcePropType =
    alertType === 'success'
      ? Images.successIcon
      : alertType === 'info'
      ? Images.infoIcon
      : Images.infoIcon;

  return (
    <View
      style={[
        styles.container,
        {
          borderColor:
            alertType === 'error'
              ? 'black'
              : alertType === 'warning'
              ? '#EBC400'
              : alertType === 'success'
              ? '#66B809'
              : '#417BE1',
          backgroundColor:
            alertType === 'success'
              ? '#DDF7E0'
              : alertType === 'warning'
              ? '#FBF4CE'
              : alertType === 'error'
              ? 'black'
              : '#DBE6F9',
          paddingVertical: alertType === 'error' ? 10 : 0,
          width: alertType === 'error' ? 'auto' : '92%',
          alignItems: alertType === 'error' ? 'center' : 'flex-start',
          marginTop: alertType === 'error' ? 120 : 50,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {alertType !== 'error' && (
          <View
            style={{
              marginRight: 10,
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={
                alertType === 'warning' ? Images.nointernet : alertIconSource
              }
              style={[
                styles.alertIcon,
                {
                  width: alertType === 'warning' ? 50 : 30,
                  height: alertType === 'warning' ? 50 : 30,
                },
              ]}
            />
          </View>
        )}
        <View style={{maxWidth: '80%'}}>
          {alertType !== 'error' && <Text style={[styles.title]}>{title}</Text>}
          <Text
            style={[
              styles.description,
              {
                color: alertType === 'error' ? 'white' : '#595959',
                textAlign: alertType === 'error' ? 'center' : 'left',
              },
            ]}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CustomAlert;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    padding: 10,
    paddingVertical: 0,
    zIndex: 100,
    borderRadius: 12,
    borderWidth: 1.2,
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    color: 'black',

  },
  description: {
    fontSize: 12,
    color: '#595959',
   
  },
  alertIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    resizeMode: 'contain',
  },
});
