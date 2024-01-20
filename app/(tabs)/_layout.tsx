import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb'
      }
    }} >
      {/* <Text>RootLayout</Text> */}
      <Tabs.Screen name="index" options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
      }} />
    </Tabs>
  );
}