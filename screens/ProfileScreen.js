import React from 'react';
import { View, Text, Image, StyleSheet, Button, Linking } from 'react-native';

export default function ProfileScreen() {
  const handleTermsAndConditions = () => {
    Linking.openURL('https://example.com/terms-and-conditions'); // Replace with your actual terms URL
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/profile-picture.jpg' }} // Replace with user profile picture URL
        style={styles.profilePicture}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.info}>Email: john.doe@example.com</Text>
      <Text style={styles.info}>Phone: +1234567890</Text>
      <Button title="Terms and Conditions" onPress={handleTermsAndConditions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});
