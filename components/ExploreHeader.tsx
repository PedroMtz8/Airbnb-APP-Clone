import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { defaultStyles } from '@/constants/styles';
import { Link } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import categories from '@/mockData/categories.json';
import * as Haptics from 'expo-haptics';

interface Props {
  onCategoryChanged: (category: string) => void;
}

export default function ExploreHeader({ onCategoryChanged }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeCategory, setActiveCategory] = useState(0);

  const onSelectedCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveCategory(index);
    selected?.measure((x, y, width, height, pageX, pageY) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
      // console.log(x, y, width, height, pageX, pageY)
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onCategoryChanged(categories[index].name)
  }

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
          <ScrollView 
            ref={scrollRef}
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              gap: 20,
              paddingHorizontal: 16,
            }}
          >
            {
              categories.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  ref={ref => itemsRef.current[index] = ref}
                  onPress={ () => onSelectedCategory(index) }
                  style={ activeCategory === index ? exploreStyles.categoriesBtnActive : exploreStyles.categoriesBtn}
                >
                  {/* <Ionicons name={category.icon} size={24} /> */}
                  <MaterialIcons 
                    name={category.icon as any}
                    size={25} 
                    color={ activeCategory === index ? '#000' : Colors.grey }
                  />
                    <Text style={activeCategory === index ? exploreStyles.categoryTextActive : exploreStyles.categoryText}>
                      {category.name}
                    </Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>

        </View>
    </SafeAreaView>
  )
}

const exploreStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 150,
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
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
})