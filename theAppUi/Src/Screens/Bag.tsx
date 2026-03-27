import { ActivityIndicator, Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Assets } from '../Assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { useTableNumberStore } from '../store/TableNumberStore';

import { useItemStore } from '../store/ItemStore';

import { useOrderCoffee } from '../Hooks/coffee';


import { useUserStore } from '../store/userStore';

const Bag = ({ navigation, route }: { navigation: any, route: any }) => {
  const tableNumber = useTableNumberStore(state => state.tableNumber);
  const item = useItemStore(state => state.item);
  const user = useUserStore(state => state.user);

  const { mutate: orderCoffee, isPending: isLoading } = useOrderCoffee({
    onSuccess: (data: any) => {
      const { checkout_url } = data;
      if (checkout_url) {
        Alert.alert('Success', 'Order created! Redirecting to payment...');
        Linking.openURL(checkout_url);
      } else {
        Alert.alert('Error', 'No checkout URL received.');
      }
    },
    onError: (err: any) => {
      console.error('Order Error:', err.response?.data || err.message);
      const serverMessage = err.response?.data?.error || err.response?.data?.message || err.message;
      Alert.alert('Order Failed', `Reason: ${serverMessage}`);
    }
  });

  const handleOrderNow = () => {
    if (!item) return;

    if (!user) {
      Alert.alert(
        'Login Required',
        'Please login or register to place your order.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('Login', { fromScreen: 'Bag' }) }
        ]
      );
      return;
    }

    const totalPrice = item?.totalPrice || 0;
    if (totalPrice <= 0) {
      Alert.alert('Invalid Order', 'Total price must be greater than 0.');
      return;
    }

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
      totalPrice: totalPrice,
      userId: user._id || user.id,
      userEmail: user.email,
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
          <View style={styles.body}>
            <View style={styles.itemCard}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item?.name}
                </Text>
                
                <View style={styles.sizeBadge}>
                  <Text style={styles.sizeLabel}>Size:</Text>
                  <Text style={styles.sizeValue}>{item?.selectedSize?.size}</Text>
                </View>

                <View style={styles.quantityRow}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityValue}>{item?.quantity}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.checkoutSection}>
              <View style={styles.priceContainer}>
                <Text style={styles.totalLabel}>Total Price</Text>
                <View style={styles.priceValueRow}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <Text style={styles.priceText}>{item?.selectedSize?.price}.00</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.payButton, isLoading && { opacity: 0.7 }]}
                onPress={handleOrderNow}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.payButtonText}>Pay Now</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your bag is empty.</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => navigation.navigate('TabNavigatort', { screen: 'Home' })}
            >
              <Text style={styles.browseText}>Browse Menu</Text>
            </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  headerIcon: { width: 35, height: 35 },
  tableText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  body: {
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#252A32',
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  itemName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sizeLabel: {
    color: '#AEB2B7',
    fontSize: 14,
    marginRight: 10,
  },
  sizeValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#0C0F14',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    color: '#AEB2B7',
    fontSize: 14,
    marginRight: 10,
  },
  quantityBadge: {
    backgroundColor: 'orange',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  quantityValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#0C0F14',
  },
  priceContainer: {
    justifyContent: 'center',
  },
  totalLabel: {
    color: '#AEB2B7',
    fontSize: 14,
    marginBottom: 4,
  },
  priceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: 'orange',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 4,
  },
  priceText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 20,
    shadowColor: 'orange',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#AEB2B7',
    fontSize: 18,
    marginBottom: 20,
  },
  browseButton: {
    backgroundColor: 'rgba(255,165,0,0.1)',
    borderWidth: 1,
    borderColor: 'orange',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 15,
  },
  browseText: {
    color: 'orange',
    fontSize: 16,
    fontWeight: '600',
  },
});



