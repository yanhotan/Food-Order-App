import React, { useState, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QuantityModal from '../components/QuantityModal';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';  // Import CartContext

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

const items = [
  { id: '1', name: 'Laptop', image: images.laptop, rating: 4.5, reviews: 2000, sales: '3.5k', price: 5199, discount: 10 },
  { id: '2', name: 'Phone', image: images.phone, rating: 4.8, reviews: 1500, sales: '4.2k', price: 3699 },
  { id: '3', name: 'TV', image: images.tv, rating: 4.6, reviews: 1800, sales: '2.8k', price: 3999, discount: 23 },
  { id: '4', name: 'Game Console', image: images.gameConsole, rating: 4.8, reviews: 2200, sales: '4.1k', price: 199, discount: 30 },
  { id: '5', name: 'Headphones', image: images.headphones, rating: 4.4, reviews: 1300, sales: '1.9k', price: 399, discount: 20 },
  { id: '6', name: 'Camera', image: images.camera, rating: 4.9, reviews: 2500, sales: '5.3k', price: 2099, discount: 15 },
  { id: '7', name: 'Watch', image: images.watch, rating: 4.4, reviews: 700, sales: '900', price: 150 },
  { id: '8', name: 'Tablet', image: images.tablet, rating: 4.1, reviews: 300, sales: '600', price: 600 }
];

const shockingSales = [
  { id: '1', name: 'TV', image: images.tv, price: 1200, discount: 20 },
  { id: '2', name: 'Bluetooth Speaker', image: images.speaker, price: 150, discount: 15 },
  { id: '4', name: 'Tablet', image: images.tablet, price: 600, discount: 25 },
  { id: '5', name: 'Watch', image: images.watch, price: 300, discount: 30 },
];

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query
  const { addToCart } = useContext(CartContext);  // Get addToCart function from CartContext
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);  // Use the addToCart from context
    setModalVisible(false);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        {item.discount ? (
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>RM{item.price.toFixed(2)}</Text>
            <Text style={styles.discountedPrice}>
              RM{(item.price * (1 - item.discount / 100)).toFixed(2)}
            </Text>
            <Text style={styles.discount}>{`-${item.discount}%`}</Text>
          </View>
        ) : (
          <Text style={styles.price}>RM{item.price.toFixed(2)}</Text>
        )}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
          <Text style={styles.sales}>{item.sales} sold</Text>
        </View>
        <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.cartButton}>
          <Ionicons name="cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
        value={searchQuery} // Bind the search query to input
        onChangeText={(text) => setSearchQuery(text)} // Update state when the user types
      />
      <View style={styles.shockingSaleWrapper}>
        <Text style={styles.sectionTitle}>Shocking Sale</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.shockingSaleContainer}>
          {shockingSales.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleProductPress(item)}>
              <View style={styles.shockingSaleItemContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.name}>{item.name}</Text>
                {item.discount ? (
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>RM{item.price.toFixed(2)}</Text>
                    <Text style={styles.discountedPrice}>
                      RM{(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </Text>
                    <Text style={styles.discount}>{`-${item.discount}%`}</Text>
                  </View>
                ) : (
                  <Text style={styles.price}>RM{item.price.toFixed(2)}</Text>
                )}
                <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.cartButton}>
                  <Ionicons name="cart" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredItems} // Use the filtered items list
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.itemsContainer}
        scrollEnabled={false} // Prevent FlatList from scrolling separately
      />
      <QuantityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}  // Pass handleAddToCart to QuantityModal
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  shockingSaleWrapper: {
    marginBottom: 10, // Ensures space below the section
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'red',
  },
  shockingSaleContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  shockingSaleItemContainer: {
    width: 150,
    marginRight: 10,
    alignItems: 'center',
  },
  itemsContainer: {
    paddingHorizontal: 10,
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
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 14,
    color: '#E53935',
    marginLeft: 5,
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
  cartButton: {
    marginTop: 10,
  },
});

