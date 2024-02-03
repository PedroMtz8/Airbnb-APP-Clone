import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React from 'react'

export default function Trips() {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            console.log('refreshing');
          }}
        />
      }
    >
      <Text>Trips</Text>
    </ScrollView>
  )
}