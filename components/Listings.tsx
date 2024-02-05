import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

export default function Listings({ listings, category, refresh }: Props) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null)


  useEffect(() => {
    console.log('refresh listings')
    if(refresh){
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [refresh])

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
          <Animated.View style={stls.listing} entering={FadeInRight} exiting={FadeOutLeft} >
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

          </Animated.View>
        </TouchableOpacity>
      </Link>
    )
  };
  return (
      <FlatList
        ref={listRef}
        data={loading ? [] : listings}
        renderItem={renderRow}
      />
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