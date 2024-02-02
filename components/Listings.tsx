import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';

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
        <TouchableOpacity style={{ width: '100%' }} >
          <View style={stls.listing}>
            <Image source={{ uri: item.medium_url as string  }} style={stls.image} />
            <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
              <Ionicons name='heart-outline' size={24} color={"#000"} />
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating as number / 20}</Text>
              </View>
            </View>

            <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
              <Text style={{ fontFamily: 'mon' }}>night</Text>
            </View>

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
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
})