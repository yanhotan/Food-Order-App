import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native'; // Import Modal here
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCart } from './CartContext';

const screenWidth = Dimensions.get('window').width;

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const sst = subtotal * 0.06; // 6% SST
    const total = subtotal + sst;
    return { subtotal, sst, total };
  };

  const { subtotal, sst, total } = calculateTotal();

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.trashButton}>
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      overshootRight={false} // Prevent overshoot animation
    >
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>RM{(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.itemsContainer}
      />

      {/* Footer for Total Price and Checkout */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Subtotal: RM{subtotal.toFixed(2)}</Text>
          <Text style={styles.totalText}>SST (6%): RM{sst.toFixed(2)}</Text>
          <Text style={styles.totalTextBold}>Total: RM{total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setPaymentModalVisible(true)}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Modal */}
      <Modal
        transparent={true}
        visible={isPaymentModalVisible}
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Payment Method</Text>
            <TouchableOpacity style={styles.paymentButton} onPress={() => alert('Pay at Counter')}>
              <Text style={styles.paymentButtonText}>Pay at Counter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton} onPress={() => alert('E-Wallet')}>
              <Text style={styles.paymentButtonText}>E-Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton} onPress={() => alert('FPX Online Payment')}>
              <Text style={styles.paymentButtonText}>FPX Online Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

// Styles...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemsContainer: {
    paddingBottom: 150, // Space for the footer
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: '#FF6B6B',
    padding: 5,
    borderRadius: 5,
  },
  trashButton: {
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 60,
    borderRadius: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
  totalContainer: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
});