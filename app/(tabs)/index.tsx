import { View } from 'react-native';
import React, { useMemo } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import ListingsData from '@/assets/data/airbnb-listings.json';
import { Listing } from '@/interfaces/listing';

export default function Index(){
  const [category, setCategory] = React.useState('')
  const items = useMemo(() => {
    const filter = (ListingsData as Listing[]).filter((item) => {
      return item.medium_url !== null
    })
    console.log('filtered:  ', filter.length)
    return filter
  }, [category])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: '#fff' }} >
      <Stack.Screen 
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      <Listings category={category} listings={items} />
    </View>
  )
}