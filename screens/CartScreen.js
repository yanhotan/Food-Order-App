import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCart } from './CartContext';

const screenWidth = Dimensions.get('window').width;

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart, checkoutCart } = useCart();
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const sst = subtotal * 0.06;
    const total = subtotal + sst;
    return { subtotal, sst, total };
  };

  const { subtotal, sst, total } = calculateTotal();

  const handleCheckout = () => {
    checkoutCart(); // Call checkoutCart from CartContext
    setPaymentModalVisible(false);
    setAlertVisible(true); // Show custom alert
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.trashButton}>
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      overshootRight={false}
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
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Subtotal: RM{subtotal.toFixed(2)}</Text>
          <Text style={styles.totalText}>SST (6%): RM{sst.toFixed(2)}</Text>
          <Text style={styles.totalTextBold}>Total: RM{total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => setPaymentModalVisible(true)}>
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
            <TouchableOpacity style={styles.paymentButton} onPress={handleCheckout}>
              <Text style={styles.paymentButtonText}>Pay Later at Counter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPaymentModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Alert Modal */}
      <Modal
        transparent={true}
        visible={isAlertVisible}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertContainer}>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Info</Text>
            <Text style={styles.alertMessage}>Your order has been placed.</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  itemsContainer: {
    paddingBottom: 150,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#333',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
  },
  quantityButton: {
    backgroundColor: '#FFD700',
    padding: 5,
    borderRadius: 5,
  },
  trashButton: {
    backgroundColor: '#FFD700',
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
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderTopColor: '#333',
    borderTopWidth: 1,
  },
  totalContainer: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  totalTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  checkoutButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#000',
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
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFD700',
    fontSize: 16,
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  alertContent: {
    width: '80%',
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  alertButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
