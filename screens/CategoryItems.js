import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const images = {
  laptop: require('../assets/laptop.png'),
  phone: require('../assets/phone.png'),
  tv: require('../assets/tv.png'),
  speaker: require('../assets/speaker.png'),
  gameConsole: require('../assets/console.png'),
  headphones: require('../assets/headphones.png'),
  camera: require('../assets/camera.png'),
  watch: require('../assets/watch.png'),
  tablet: require('../assets/tablet.png'),
};

const products = {
  Electronics: [
    { id: '1', name: 'Laptop', price: 5199, rating: 4.5, reviews: 2000, sales: '3.5k', image: images.laptop },
    { id: '2', name: 'Smartphone', price: 3699, rating: 4.8, reviews: 1500, sales: '4.2k', image: images.phone },
    { id: '3', name: 'TV', price: 3999, rating: 4.6, reviews: 1800, sales: '2.8k', image: images.tv },
    { id: '4', name: 'Camera', price: 2099, rating: 4.9, reviews: 2500, sales: '5.3k', image: images.camera },
    { id: '5', name: 'Watch', price: 150, rating: 4.4, reviews: 700, sales: '900', image: images.watch },
    { id: '6', name: 'Tablet', price: 600, rating: 4.1, reviews: 300, sales: '600', image: images.tablet },
    { id: '7', name: 'Bluetooth Speaker', price: 150, rating: 4.3, reviews: 1100, sales: '1.2k', image: images.speaker },
  ],
};

export default function CategoryItems({ route, navigation }) {
  const { category } = route.params;
  const categoryItems = products[category] || [];
  
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>RM{item.price.toFixed(2)}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Text style={styles.reviewsText}>({item.reviews})</Text>
        <Text style={styles.sales}>{item.sales} sold</Text>
      </View>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.itemsContainer}
      />
      <Button 
        title="Go to Cart" 
        onPress={() => navigation.navigate('Cart', { cartItems })} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0', // Placeholder color
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  sales: {
    fontSize: 14,
    color: '#888',
    marginLeft: 'auto',
  },
});

