import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/styles';

export default function Booking() {
  return (
    <BlurView intensity={70} tint='light' style={[ defaultStyles.safeArea, bstyles.container]} >
      <Text>Booking</Text>
    </BlurView>
  )
}
const bstyles = StyleSheet.create({
  container: {
    flex: 1
  }
})