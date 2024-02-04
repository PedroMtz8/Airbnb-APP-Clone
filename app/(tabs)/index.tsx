import { View } from 'react-native';
import React, { useMemo } from 'react';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Listing } from '@/interfaces/listing';
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index(){
  const [category, setCategory] = React.useState('')
  const items = useMemo(() => {
    const filter = (listingsData as Listing[]).filter((item) => {
      return item.medium_url !== null
    })
    return filter
  }, [category])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }} >
      <Stack.Screen 
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />

      {/* <Listings category={category} listings={items} /> */}
      <ListingsMap listings={listingsDataGeo} />

      <ListingsBottomSheet listings={items} category={category} />
    </GestureHandlerRootView>
  )
}