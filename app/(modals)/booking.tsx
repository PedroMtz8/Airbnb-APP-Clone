import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/styles';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { places } from '@/assets/data/places';

const guestsGropus = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Booking() {
  const router = useRouter();
  const [openCard, setOpenCard] = React.useState(0);

  const [selectedPlace, setSelectedPlace] = React.useState(0);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  }

  return (
    <BlurView intensity={100} tint='light' style={[ defaultStyles.safeArea, bstyles.container]} >
      {/* WHERE */}
      <View style={bstyles.card} >
        {openCard !== 0 && (
          <AnimatedTouchableOpacity 
            onPress={() => setOpenCard(0)} 
            style={bstyles.cardPreview}
            entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
          >
            <Text style={[bstyles.previewText]} >Where</Text>
            <Text style={[bstyles.previewdData]} >I'm flexible</Text>

          </AnimatedTouchableOpacity>
        )}
        {openCard === 0 && (
          <>
            <Animated.Text style={bstyles.cardHeader} >Where to?</Animated.Text>
            <Animated.View style={bstyles.cardBody}>
              <View style={bstyles.searchSection} >
                <Ionicons style={bstyles.searchIcon} name='search' size={20} />
                <TextInput style={bstyles.inputField} placeholder='Search destination' placeholderTextColor={Colors.grey}  />
              </View>
              
            </Animated.View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ gap: 25, paddingLeft: 20, marginBottom: 30 }}
              >
                {places.map((place, index) => (
                  <TouchableOpacity key={index} onPress={() => setSelectedPlace(index) } >
                    <Image 
                      source={place.img} 
                      style={[selectedPlace === index ? bstyles.placeSelected : bstyles.place, {
                        marginRight: index === places.length - 1 ? 20 : 0,
                      }]} 
                    />
                    <Text style={{ fontFamily: selectedPlace === index ? 'mon-sb': '', paddingTop: 6}} >{place.title}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
          </>
        )}
      </View>

      {/* WHEN */}
      <View style={bstyles.card} >
        {openCard !== 1 && (
          <AnimatedTouchableOpacity 
            onPress={() => setOpenCard(1)}
            style={bstyles.cardPreview}
            entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
          >
            
            <Text style={[bstyles.previewText]} >When</Text>
            <Text style={[bstyles.previewdData]} >Any week</Text>

          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <Animated.View style={bstyles.cardBody} >
            <Animated.Text entering={FadeIn} style={bstyles.cardHeader} >Who's coming?</Animated.Text>
          </Animated.View>
        )}
      </View>

      {/* WHEN */}
      <View style={bstyles.card} >
        {openCard !== 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={bstyles.cardPreview}
            entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
          >
            
            <Text style={[bstyles.previewText]} >Who</Text>
            <Text style={[bstyles.previewdData]} >Add guests</Text>

          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <Animated.View style={bstyles.cardBody}>
            <Animated.Text style={bstyles.cardHeader} >Add to?</Animated.Text>
          </Animated.View>
        )}
      </View>

      {/* FOOTER */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
          <TouchableOpacity
            onPress={onClearAll}
          >
            <Text style={{ fontSize: 18, fontFamily: 'mon-sb', textDecorationLine: 'underline' }}>
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
            onPress={() => router.back()}
          >
            <Ionicons name='search-outline' size={24} color="#fff" style={defaultStyles.btnIcon} />
            <Text style={[defaultStyles.btnText]} >
              Search 2
            </Text>
          </TouchableOpacity>

        </View>

      </Animated.View>
    </BlurView>
  )
}
const bstyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: 'mon-b',
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  searchSection: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  placesContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 120,
  },
  previewText: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: 'mon-sb',
    fontSize: 14,
    color: Colors.dark,
  },

  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
})