import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';

interface Props {
  listings: Listing[];
  category: string;
}

export default function Listings({ listings, category }: Props) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
        /* do something here */
      setLoading(false);
    }, 200)
  }, [category])

  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={stls.listing}>
            <Image source={{ uri: item.medium_url  }} style={stls.image} />
          </View>
        </TouchableOpacity>
      </Link>
    )
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={loading ? [] : listings}
        renderItem={renderRow}
      />
      {/* <Text>Listings</Text> */}
    </View>
  )
}

const stls = StyleSheet.create({
  listing: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  }
})