import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

interface Props {
  listings: Array<any>;
  category: string;
}

export default function Listings({ listings, category }: Props) {

  useEffect(() => {
    console.log('LISTINGS: ', category);
  }, [category])

  return (
    <View>
      <Text>Listings</Text>
    </View>
  )
}