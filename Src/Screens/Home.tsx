import {
  View,
  Text,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useGetCoffee } from '../Hooks/coffee';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Assets } from '../Assets/index';
import { useTableNumberStore } from '../store/TableNumberStore';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth / 2 - 22;

const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const tableNumber = useTableNumberStore(s => s.tableNumber);

  const categories = ['All', 'Espresso', 'Cappuccino', 'Americano', 'Espressiom'];

  const { data: coffee, isLoading, isError } = useGetCoffee(selectedCategory);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>
          ${item.sizes?.[0]?.price ?? 'N/A'}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart', { item })}
        >
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={Assets.FourIcons} style={styles.headerIcon} />
        <Text style={styles.tableText}>Table {tableNumber}</Text>
      </View>

      <Text style={styles.title}>Find the best coffee for you</Text>

      <TextInput
        placeholder="find your coffee..."
        placeholderTextColor="#aaa"
        style={styles.search}
      />

      {/* Categories */}
      <View style={styles.categoryWrapper}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === item && styles.categoryActive,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Coffee list */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#D17842" style={{ marginTop: 50 }} />
      ) : isError ? (
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>Failed to load coffee</Text>
      ) : (
        <FlatList
          data={coffee}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>No Coffee Found</Text>
          )}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerIcon: { width: 45, height: 45 },

  tableText: {
    fontSize: 22,
    color: 'orange',
    alignSelf: 'center',
  },

  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: -5,
  },

  search: {
    backgroundColor: '#252A32',
    padding: 16,
    borderRadius: 14,
    color: 'white',
    marginBottom: 6,
  },

  /** VERY IMPORTANT FIX */
  categoryWrapper: {
    marginBottom: 4, // BEFORE the gap was coming from here
    paddingBottom: 0, // FIX
  },

  categoryItem: {
    backgroundColor: '#252A32',
    paddingHorizontal: 14,
    height: 34,
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: '#D17842',
  },

  categoryText: {
    color: 'gray',
    fontSize: 14,
  },

  categoryTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },

  list: {
    flex: 1,
    paddingTop: 0, // FIX main spacing issue
    marginTop: 0, // FIX main spacing issue
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#252A32',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 14,
    paddingBottom: 10,
  },

  image: {
    width: '85%',
    height: 160,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 12,
  },

  name: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingTop: 5,
    fontSize: 16,
  },

  category: {
    color: 'white',
    paddingLeft: 16,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 8,
  },

  priceText: {
    color: '#c67c4e',
    fontSize: 18,
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#D17842',
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 20,
    borderRadius: 10,
  },

  empty: {
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Home;
