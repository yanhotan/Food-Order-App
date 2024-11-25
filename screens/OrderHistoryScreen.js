import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from './CartContext';

export default function OrderHistoryScreen() {
  const { orderHistory } = useContext(CartContext); // Fetch order history from context
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(orderHistory); // Load the order history dynamically
  }, [orderHistory]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>Date: {item.date}</Text>
      <Text style={styles.orderText}>Total: RM{item.total.toFixed(2)}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
        />
      ) : (
        <Text style={styles.emptyText}>No order history found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  orderContainer: {
    backgroundColor: '#1C1C1C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  orderText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    color: '#FFD700',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});
