import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles';

const categories = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

export default function ExploreHeader() {
  return (
    <SafeAreaView style={[ defaultStyles.safeArea, { flex: 1 } ]} >
      <View>
        <View style={exploreStyles.container}>

        </View>
      </View>
    </SafeAreaView>
  )
}

const exploreStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  }
})