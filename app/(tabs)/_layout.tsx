import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarStyle: {
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        height: 60,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
      },
      tabBarLabelStyle: {
        fontFamily: 'mon-sb'
      }
    }} >
      {/* <Text>RootLayout</Text> */}
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="wishlists" 
        options={{
          tabBarLabel: 'Wishlists',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="trips" 
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="inbox" 
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-outline" color={color} size={size} />,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
        }} 
      />
    </Tabs>
  );
}