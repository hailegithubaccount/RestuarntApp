import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useBackgroundStore } from '../store/useBackgroundStore';

const Delete = ({ navigation ,route}) => {
  const [showOptions, setShowOptions] = useState(false);
  const {tableNumber}=route.params;


  
  const background = useBackgroundStore((state) => state.background);
  const setBackground = useBackgroundStore((state) => state.setBackground);

  const backgroundImages = [
    {
      uri: 'https://media.istockphoto.com/id/1623303770/photo/creative-background-image-is-blurred-evening-city-lights-and-light-snowfall.webp?b=1&s=612x612&w=0&k=20&c=--I6QisPR7yGmgujOI2co8U3FIK5tBv6xAjMup67ghc=',
    },
    {
      uri: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/abstract-glowing-christmas-background-free-photo.jpg?w=600&quality=80',
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcj2U8MHWlC1kPEgXBiY8SHvdt9tcf-nYVRwwqF__XWJCyYgkJQZlerNXCq5pxjoTO8Sw&usqp=CAU',
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYic71SwCF6P6IOt6vum-dZMxjqlU6Xq922MhukLxGX7b0OHZSfqwealWIKM1zvFivJwc&usqp=CAU',
    },
  ];

  return (
    <ImageBackground
      source={background } // ✅ Use current or default
      style={{ flex: 1, justifyContent: 'center' }}
      resizeMode="cover"
    >
      <TouchableOpacity onPress={() => navigation.navigate('Fetch')}>
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{tableNumber}</Text>
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          alignSelf: 'flex-end',
          marginTop: -760,
        }}
      >
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            borderColor: 'white',
            borderWidth: 4,
            justifyContent: 'center',
          }}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Image
            source={{
              uri: 'https://media.gettyimages.com/id/182832826/photo/fountain-pen-flourish.jpg?s=612x612&w=gi&k=20&c=dRS6I1FAEdV81oL0VzYAM8-EbM4zozy7c42FrawTgIk=',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 2,
            marginHorizontal: '2%',
            padding: 10,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          {backgroundImages.map((img, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setBackground(img)} 
            >
              <Image
                source={img}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ImageBackground>
  );
};

export default Delete;

const styles = StyleSheet.create({});
