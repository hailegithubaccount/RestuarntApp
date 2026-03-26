import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images } from '../Assets/index';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Alertprops {
  title: any;
  description: any;
  AlertType?: 'success' | 'error' | 'info' | 'warning';
}

const Delete: React.FC<Alertprops> = ({
  title,
  description,
  AlertType = 'info',
}) => {
  const imageContainer =
    AlertType == 'success'
      ? Images.successIcon
      : AlertType == 'info'
      ? Images.infoIcon
      : AlertType == 'error'
      ? Images.devError
      : Images.arrowRightWhite;

  return (
    <View
      style={[
        styles.alerMainBox,
        {
          backgroundColor:
            AlertType == 'success'
              ? 'orange'
              : AlertType == 'error'
              ? 'blue'
              : AlertType == 'info'
              ? 'yellow'
              : 'black',

          borderColor:
            AlertType == 'success'
              ? 'orange'
              : AlertType == 'error'
              ? 'blue'
              : AlertType == 'info'
              ? 'yellow'
              : 'black',
        },
      ]}
    >
      <View>
        <Image
          source={AlertType == 'warning' ? Images.nointernet : imageContainer}
          style={styles.image}
        />
      </View>

      <View
        style={{
          paddingLeft: 10,
        }}
      >
        <Text>{title}</Text>

        <Text>{description}</Text>
      </View>
    </View>
  );
};

export default Delete;

const styles = StyleSheet.create({
  alerMainBox: {
    flexDirection: 'row',

    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 15,
    width: '85%',
    paddingLeft: 20,
    borderRadius: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
});
