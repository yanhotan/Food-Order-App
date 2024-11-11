import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const categories = [
  { name: 'Sports', items: ['Football', 'Tennis Racket'] },
  { name: 'Fashion', items: ['Jeans', 'T-shirt', 'Dress'] },
  { name: 'Electronics', items: ['Laptop', 'Smartphone', 'TV', 'Camera', 'Watch', 'Tablet', 'Bluetooth Speaker'] },
  { name: 'Grocery', items: ['Fruits', 'Vegetables'] },
  { name: 'Entertainment', items: ['TV', 'Game Console'] },
  { name: 'Daily', items: ['Toothpaste', 'Shampoo'] },
];

const screenHeight = Dimensions.get('window').height;

export default function ShopScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryBox}
            onPress={() => navigation.navigate('CategoryItems', { category: item.name, items: item.items })}
          >
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  categoryBox: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#87e2ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 210, // Adjust height to occupy 1/3 of the screen height
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
