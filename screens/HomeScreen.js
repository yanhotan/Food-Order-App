import React, { useState, useContext, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QuantityModal from '../components/QuantityModal';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

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

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Best Seller'); 
  const { addToCart } = useContext(CartContext); 
  const navigation = useNavigation();
  const flatListRef = useRef();

  const categoryKeys = Object.keys(categories);

  // Flatten all items for FlatList
  const allItems = categoryKeys.flatMap(category =>
    categories[category].map(item => ({ ...item, category }))
  );

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    setModalVisible(false);
  };

  const scrollToCategory = (category) => {
    const firstIndex = allItems.findIndex(item => item.category === category);
    if (firstIndex !== -1) {
      flatListRef.current.scrollToIndex({ index: firstIndex, animated: true });
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleCategory = viewableItems[0].item.category;
      setSelectedCategory(visibleCategory);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>RM{item.price.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.cartButton}>
        <Ionicons name="cart" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food..."
        placeholderTextColor="#FFD700"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categoryKeys.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => scrollToCategory(category)}
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
        ref={flatListRef}
        data={allItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.itemsContainer}
        numColumns={2}
      />
      <QuantityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#1C1C1C',
    color: '#FFD700',
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
    backgroundColor: '#1C1C1C',
  },
  selectedCategoryButton: {
    backgroundColor: '#8B0000',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#FFD700',
  },
  selectedCategoryButtonText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  itemsContainer: {
    paddingHorizontal: 5,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#1C1C1C',
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
    color: '#FFD700',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#FFD700',
  },
  cartButton: {
    marginTop: 5,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    padding: 5,
  },
});
