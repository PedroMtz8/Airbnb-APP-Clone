import { View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'

export default function Index(){
  return (
    <View>
      <Stack.Screen 
        options={{
          header: () => <ExploreHeader />
        }}
      />
      <Listings />
    </View>
  )
}