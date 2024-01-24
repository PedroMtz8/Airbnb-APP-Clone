import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Page() {
  const {id} = useLocalSearchParams<{id: string}>()
  console.log('🚀 ~ Page ~ id:', id)
  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}