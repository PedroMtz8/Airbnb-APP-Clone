import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/styles'
import { FeatureGeo, ListingGeoV2 } from '@/interfaces/listingGeo'
import { useRouter } from 'expo-router'
import MapView from 'react-native-map-clustering'

interface Props {
  listings: ListingGeoV2
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
}

export default function ListingsMap({ listings }: Props) {

  const router = useRouter();

  const onMarkSelected = (list: FeatureGeo) => {
    console.log(list)
    router.push(`/listing/${list.properties.id}`)
  }

  const renderCluster = (cluster: any) => {

    const { id, geometry, properties, onPress } = cluster

    const points = properties.point_count;

    return (
      <Marker 
        key={'cluster' + id}
        coordinate={{
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
        }}
        onPress={onPress}
      >
        <View style={styles.marker} >
          <Text 
            style={{
              color: 'black',
              textAlign: 'center',
              fontFamily: 'mon-sb',
            }} 
          >
            {points}
          </Text>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaultStyles.container} >
      <MapView 
        animationEnabled={false}
        style={StyleSheet.absoluteFill} 
        showsUserLocation
        showsMyLocationButton
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
        clusterFontFamily='mon-sb'
        renderCluster={renderCluster}
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