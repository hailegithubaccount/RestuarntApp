import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Assets } from '../Assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { useTableNumberStore } from '../store/TableNumberStore';

import { useItemStore } from '../store/ItemStore';

import { useOrderCoffee } from '../Hooks/coffee';


const Bag = ({ route }) => {
  const tableNumber = useTableNumberStore(state => state.tableNumber);
  const item = useItemStore(state => state.item);

  const { mutate: orderCoffee, isPending: isLoading } = useOrderCoffee({
    onSuccess: (data: any) => {
      const { checkout_url } = data;
      if (checkout_url) {
        Alert.alert('Redirecting to payment...');
        Linking.openURL(checkout_url);
      } else {
        Alert.alert('Error', 'No checkout URL received.');
      }
    },
    onError: (err: any) => {
      console.error('Order Error:', err.response?.data || err.message);
      Alert.alert('Error', 'Something went wrong while creating your order.');
    }
  });

  const handleOrderNow = () => {
    if (!item) return;

    const orderData = {
      tableNumber,
      items: [
        {
          coffeeName: item?.name,
          size: item?.selectedSize?.size,
          quantity: item?.quantity,
          price: item?.selectedSize?.price,
        },
      ],
      totalPrice: item?.totalPrice,
    };

    orderCoffee(orderData);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.SafeArea} edges={['top', 'left', 'right']}>
      <View style={styles.headerRow}>
              <Image source={Assets.FourIcons} style={styles.headerIcon} />
              <Text style={styles.tableText}>Table {tableNumber}</Text>
            </View>
   

      {item ? (
        <View style={[styles.body, { justifyContent: 'space-between', paddingVertical: 20 }]}>
          <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#252A32',
              width: '80%',
              alignSelf: 'center',
              padding: 15,
              borderRadius: 20,
            }}
          >
            <View>
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                paddingLeft: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                {item?.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: 'black',
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                    }}
                  >
                    Size
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 4,
                    alignSelf: 'flex-end',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 20,
                    }}
                  >
                    {item?.selectedSize?.size}
                  </Text>
                </View>
              </View>

              {/* this is for the qunatity */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <View
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: 'black',
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      alignSelf: 'center',
                    }}
                  >
                    Qunatity
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 35,
                    }}
                  >
                    {item?.quantity}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '4%',
              marginBottom: 40,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  marginBottom: 6,
                }}
              >
                Total Price
              </Text>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 25,
                }}
              >
                $ {''}
                <Text
                  style={{
                    color: 'white',
                  }}
                >
                  {item?.selectedSize?.price}.00
                </Text>
              </Text>
            </View>

            <TouchableOpacity
              style={{
                paddingHorizontal: 80,
                paddingVertical: 20,
                backgroundColor: 'orange',
                justifyContent: 'center',
                borderRadius: 20,
              }}
              onPress={handleOrderNow}
            >
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                }}
              >
                Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              color: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            please select first
          </Text>
        </View>
      )}
      </SafeAreaView>
    </View>
    
  );
};

export default Bag;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#0C0F14',
  
  },
  SafeArea: {
  
      paddingHorizontal: 12,
  },
    headerIcon: { width: 45, height: 45 },


   headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  tableText: {
    fontSize: 22,
    color: 'orange',
    alignSelf:'center'
  },
  body: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
});



