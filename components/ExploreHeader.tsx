import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

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
    <SafeAreaView style={[ defaultStyles.safeArea, { backgroundColor: '#fff' } ]} >
        <View style={exploreStyles.container}>
          <View style={exploreStyles.actionRow}>
            <Link href='/(modals)/booking' asChild>
              <TouchableOpacity style={exploreStyles.searchBtn}>
                <Ionicons name="search" size={24} />
                <View>
                  <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                  <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere • Any week</Text>
                </View>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={exploreStyles.filterBtn}>
              <Ionicons name="options-outline" size={24} />
            </TouchableOpacity>
          </View>

          {/* here i will continue */}


        </View>
    </SafeAreaView>
  )
}

const exploreStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 130,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    // width: 200,
    flex: 1,
    padding: 14,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  }
})