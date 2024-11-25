import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuantityModal({ visible, onClose, product, onAddToCart }) {
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, quantity);
      setQuantity(1); // Reset quantity after adding to cart
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{product?.name}</Text>
          <Text style={styles.modalPrice}>RM{product?.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    color: '#FFD700',
    marginHorizontal: 15,
  },
  addToCartButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    width: '70%', // Make both buttons the same width
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    width: '70%', // Same width as ADD TO CART button
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: '#FFD700',
    fontSize: 16,
  },
});
