import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Assets } from '../Assets';
import { useItemStore } from '../store/ItemStore';

const { height } = Dimensions.get('window');

const Cart = ({ navigation, route }) => {
  const { item } = route.params || {};
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0] || null);

  

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{ uri: item?.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.text}>{item?.name || 'No name'}</Text>
                <Text style={styles.originText}>
                  From {item?.origin || 'Unknown'}
                </Text>
              </View>

              <View style={styles.locationBox}>
                <Image
                  source={Assets.locationIcons}
                  style={styles.locationIcon}
                />
                <Text style={styles.locationText}>{item?.origin}</Text>
              </View>
            </View>

            <Text style={styles.ratingText}>⭐ {item?.rating || 0}</Text>
          </View>
        </ImageBackground>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.detailText}>
            {item?.description || 'No description available for this coffee.'}
          </Text>

          {/* Size Selector */}
          <Text style={styles.sectionTitle}>Choose Size</Text>
          <View style={styles.sizeContainer}>
            {item?.sizes?.map((sizeObj, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeBox,
                  selectedSize?.size === sizeObj.size && styles.selectedBox,
                ]}
                onPress={() => setSelectedSize(sizeObj)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize?.size === sizeObj.size && { color: 'black' },
                  ]}
                >
                  {sizeObj.size}
                </Text>
                <Text
                  style={[
                    styles.priceText,
                    selectedSize?.size === sizeObj.size && { color: 'black' },
                  ]}
                >
                  ${sizeObj.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Selected Price */}
          <View style={styles.finalPriceBox}>
            <Text style={styles.finalPriceText}>
              Selected Price: ${selectedSize?.price || 0}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('QuantityPage', {
                  item,
                  selectedSize,
                })
              }
              style={{
                backgroundColor: 'orange',
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  padding: 20,
                  paddingHorizontal: 30,
                  color: 'white',
                }}
              >
                Add The Quantity
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cart;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: height * 0.6,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  originText: {
    color: '#c4c4c4',
    fontSize: 15,
    marginTop: 4,
  },
  locationBox: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: '#D17842',
    resizeMode: 'contain',
  },
  locationText: {
    color: '#D17842',
    marginTop: 5,
  },
  ratingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailsContainer: {
    backgroundColor: 'black',
    padding: 20,
    flex: 1,
    marginTop: -10,
  },
  detailTitle: {
    color: '#c67c4e',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailText: {
    color: '#e0e0e0',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 5,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeBox: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '40%',
  },
  selectedBox: {
    backgroundColor: 'white',
    borderColor: '#FFD700',
  },
  sizeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    color: '#FFD700',
    fontSize: 16,
    marginTop: 5,
  },
  finalPriceBox: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  finalPriceText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: '10%',
  },
});


