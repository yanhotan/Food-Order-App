
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { CartProvider } from './screens/CartContext';

import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import ProfileScreen from './screens/ProfileScreen';
import CategoryItems from './screens/CategoryItems';
import CartScreen from './screens/CartScreen';

const Tab = createBottomTabNavigator();
const ShopStack = createStackNavigator();

function ShopStackScreen() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="Shop"
        component={ShopScreen}
        options={{ headerShown: false }} // Hide the header for the ShopScreen
      />
      <ShopStack.Screen name="CategoryItems" component={CategoryItems}
        options={{ headerShown: false }} />
    </ShopStack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Cart') {
                iconName = 'cart';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}