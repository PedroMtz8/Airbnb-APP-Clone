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
import { ListingGeoV2 } from '@/interfaces/listingGeo';

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

      <ListingsMap listings={listingsDataGeo as ListingGeoV2} />

      <ListingsBottomSheet listings={items} category={category} />
    </GestureHandlerRootView>
  )
}