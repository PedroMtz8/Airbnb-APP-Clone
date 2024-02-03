import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/styles'
import { ListingGeo } from '@/interfaces/listingGeo'
import { useRouter } from 'expo-router'

interface Props {
  listings: {
    features: ListingGeo[]
  }
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

export default function ListingsMap({ listings }: Props) {

  const router = useRouter();

  const onMarkSelected = (list: ListingGeo) => {
    console.log(list)
    router.push(`/listing/${list.properties.id}`)
  }

  return (
    <View style={defaultStyles.container} >
      <MapView 
        style={StyleSheet.absoluteFill} 
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
      >
        {
          listings.features.map((listing) => (
            <Marker 
              onPress={() => onMarkSelected(listing)}
              key={listing.properties.id}
              coordinate={{
                latitude: Number(listing.properties.latitude),
                longitude: Number(listing.properties.longitude),
              }}
            >
              <View style={styles.marker} >
                <Text style={styles.markerText} >
                  ${listing.properties.price}
                </Text>
              </View>
            </Marker>
          ))
        }
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 12,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
  }
})