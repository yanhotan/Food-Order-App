import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { CartProvider } from './screens/CartContext';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import CategoryItems from './screens/CategoryItems';
import CartScreen from './screens/CartScreen';

const Tab = createBottomTabNavigator();
const ShopStack = createStackNavigator();

// ShopStack for managing category navigation
function ShopStackScreen() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="CategoryItems"
        component={CategoryItems}
        options={{ headerShown: false }}
      />
    </ShopStack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Menu') {
                iconName = focused ? 'menu' : 'menu-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'Order History') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FFD700',
            tabBarInactiveTintColor: '#fff',
            tabBarStyle: {
              backgroundColor: '#000',
            },
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitleStyle: {
              color: '#FFD700',
            },
          })}
        >
          <Tab.Screen name="Menu" component={HomeScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="Order History" component={OrderHistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
