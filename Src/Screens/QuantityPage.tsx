import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useTableNumberStore } from '../store/TableNumberStore';
import { useItemStore } from '../store/ItemStore';

const QuantityPage = ({ route, navigation }) => {
  const { item, selectedSize, } = route.params || {};

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(selectedSize?.price || 0);
  const [loading, setLoading] = useState(false);



  const tableNumber = useTableNumberStore(state => state.tableNumber);
  const setItem = useItemStore(state => state.setItem);



  useEffect(() => {
    if (selectedSize) {
      setTotalPrice((selectedSize.price || 0) * quantity);
    }
  }, [selectedSize, quantity]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };



  useEffect(() => {
    if (selectedSize) {
      const newTotal = (selectedSize.price || 0) * quantity;
      setTotalPrice(newTotal);
    }
  }, [selectedSize, quantity]);

  const handleAddToBag = async () => {
    if (!item || !selectedSize) return;

    const finalItem = {
      ...item,
      selectedSize,
      quantity,
      totalPrice,
      tableNumber,
    };

    await setItem(finalItem);

    console.log('Final item stored in Zustand:', finalItem);

    navigation.navigate('TabNavigatort', {
      screen: 'Bag', // navigate to Bag screen
    });

  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.imageUrl }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.sizeText}>
          Size: <Text style={{ color: '#D17842' }}>{selectedSize?.size}</Text>
        </Text>
        <Text style={styles.basePrice}>Base Price: ${selectedSize?.price}</Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.qtyButton}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.qtyButton}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Total Price */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>${totalPrice}</Text>
      </View>

      {/* Order Now Button */}
      <TouchableOpacity
        style={styles.orderButton}

        onPress={handleAddToBag}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.orderText}>Add To Bag</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default QuantityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 20,
    marginTop: 40,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sizeText: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  basePrice: {
    color: '#FFD700',
    fontSize: 18,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  qtyButton: {
    backgroundColor: '#D17842',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  qtyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantity: {
    color: 'white',
    fontSize: 22,
    marginHorizontal: 25,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },
  totalLabel: {
    color: 'white',
    fontSize: 18,
  },
  totalPrice: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#D17842',
    paddingVertical: 15,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 50,
  },
  orderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
