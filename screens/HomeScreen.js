import React, { useState, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QuantityModal from '../components/QuantityModal';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext'; // Import CartContext

// Categories and Items Structure (example)
const categories = {
  "Best Seller": [
    { id: '1', name: 'Chirashi Don', image: require('../assets/Best Seller/Chirashi Don.jpg'), price: 16.96 },
    { id: '2', name: 'Sake Bento Set', image: require('../assets/Best Seller/Sake Bento Set.jpg'), price: 31.8 },
  ],
  "Maki": [
    { id: '3', name: 'California Maki (8pcs)', image: require('../assets/Maki/California Maki (8pcs).jpg'), price: 18.5 },
    { id: '4', name: 'Ebiten Tobikko Maki (8pcs)', image: require('../assets/Maki/Ebiten Tobikko Maki(8pcs).jpg'), price: 19.99 },
    { id: '5', name: 'Norwegian Maki (8pcs)', image: require('../assets/Maki/Norwegian Maki(8pcs).jpg'), price: 21.5 },
    { id: '6', name: 'Unagi Tama Maki (8pcs)', image: require('../assets/Maki/Unagi Tama Maki(8pcs).jpg'), price: 22.0 },
  ],
  "Temaki": [
    { id: '7', name: 'Negitoro Temaki', image: require('../assets/Temaki/Negitoro Temaki.jpg'), price: 12.5 },
    { id: '8', name: 'Sake Ikura Temaki', image: require('../assets/Temaki/Sake Ikura Temaki.jpg'), price: 13.5 },
    { id: '9', name: 'Soft Kani Temaki', image: require('../assets/Temaki/Soft Kani Temaki.jpg'), price: 14.5 },
  ],
  "Tempura": [
    { id: '10', name: 'Ebi Tempura', image: require('../assets/Tempura/Ebi Tempura.jpg'), price: 15.0 },
    { id: '11', name: 'Tempura Moriawase', image: require('../assets/Tempura/Tempura Moriawase.jpg'), price: 18.0 },
  ],
  "Value Sushi": [
    // Add items here if available
    { id: '12', name: 'Value Sushi A', image: require('../assets/Value Sushi/Value Sushi A.jpg'), price: 18.0 },
    { id: '13', name: 'Value Sushi B', image: require('../assets/Value Sushi/Value Sushi B.jpg'), price: 18.0 },
    { id: '14', name: 'Value Sushi C', image: require('../assets/Value Sushi/Value Sushi C.jpg'), price: 18.0 },
    { id: '15', name: 'Value Sushi D', image: require('../assets/Value Sushi/Value Sushi D.jpg'), price: 18.0 },
    { id: '16', name: 'Value Sushi E', image: require('../assets/Value Sushi/Value Sushi D.jpg'), price: 18.0 },
  ],
  "Yakimono": [
    { id: '17', name: 'Gindara Terriyaki', image: require('../assets/Yakimono/Gindara Terriyaki.jpg'), price: 20.0 },
    { id: '18', name: 'Surume Ika Sugatayaki', image: require('../assets/Yakimono/Surume Ika Sugatayaki.jpg'), price: 22.0 },
    { id: '19', name: 'Unagi Kabayaki', image: require('../assets/Yakimono/Unagi Kabayaki.jpg'), price: 25.0 },
  ],
};


const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Best Seller'); // Default category
  const { addToCart } = useContext(CartContext); // Get addToCart function from CartContext
  const navigation = useNavigation();

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity); // Use the addToCart from context
    setModalVisible(false);
  };

  // Filter items based on category and search query
  const filteredItems = categories[selectedCategory].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>RM{item.price.toFixed(2)}</Text>
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
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {Object.keys(categories).map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.itemsContainer}
      />
      <QuantityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000', // Black background
  },
  searchBar: {
    height: 40,
    borderColor: '#FFD700', // Yellow border
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#1C1C1C', // Dark background for search bar
    color: '#FFD700', // Yellow text
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#1C1C1C', // Dark background for unselected button
  },
  selectedCategoryButton: {
    backgroundColor: '#8B0000', // Blackish-red for selected category
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#FFD700', // Yellow text
  },
  selectedCategoryButtonText: {
    color: '#FFD700', // Yellow text for selected category
  },
  itemsContainer: {
    paddingHorizontal: 5,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#1C1C1C', // Dark background for items
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFD700', // Yellow text
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#FFD700', // Yellow price
  },
  cartButton: {
    marginTop: 5,
    backgroundColor: '#FFD700', // Yellow button
    borderRadius: 20,
    padding: 5,
  },
});
