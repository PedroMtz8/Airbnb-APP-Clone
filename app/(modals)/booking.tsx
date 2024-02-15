import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/styles';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { places } from '@/assets/data/places';
import DatePicker from 'react-native-modern-datepicker';

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
  const [openCard, setOpenCard] = React.useState(2);
  const today = new Date().toISOString().substring(0, 10);
  const [selectedPlace, setSelectedPlace] = React.useState(0);
  const [groups, setGroups] = React.useState(guestsGropus);

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
          <>
            <Animated.Text entering={FadeIn} style={bstyles.cardHeader} >When's your trip?</Animated.Text>
            <Animated.View style={bstyles.cardBody} >
              <DatePicker 
                current={today}
                selected={today}
                mode="calendar"
                options={{
                  defaultFont: 'mon',
                  headerFont: 'mon-sb',
                  borderColor: 'transparent',
                  mainColor: Colors.primary,
                }} 
              />
            </Animated.View>
          </>
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
          <>
            <Animated.Text style={bstyles.cardHeader} >Who's coming?</Animated.Text>
            <Animated.View style={bstyles.cardBody}>
              {groups.map((group, index) => (
                <View key={index} style={[bstyles.guestItem, index + 1 < guestsGropus.length ? bstyles.itemBorder : null  ]} >
                  <View>
                    <Text>{group.name}</Text>
                    <Text>{group.text}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity
                      onPress={() => {
                        if (groups[index].count === 0) return;
                        const newGroups = [...guestsGropus];
                        newGroups[index].count--;
                        setGroups(newGroups)
                      }}
                    >
                      <Ionicons name='remove-circle-outline' size={26} color={ guestsGropus[index].count > 0 ? Colors.grey : '#cdcdcd' } />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'mon', fontSize: 18, textAlign: 'center' }} >{group.count}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newGroups = [...guestsGropus];
                        newGroups[index].count++;
                        setGroups(newGroups)
                      }}
                    >
                      <Ionicons name='add-circle-outline' size={26} color={Colors.grey} />
                    </TouchableOpacity>
                  </View>
                </View>
                // <View key={index} style={[bstyles.guestItem, index !== 3 && bstyles.itemBorder]}>
                //   <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }} >{group.name}</Text>
                //   <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }} >
                //     <TouchableOpacity>
                //       <Ionicons name='remove-circle' size={24} color={Colors.dark} />
                //     </TouchableOpacity>
                //     <Text style={{ fontFamily: 'mon-sb', fontSize: 18 }} >{group.count}</Text>
                //     <TouchableOpacity>
                //       <Ionicons name='add-circle' size={24} color={Colors.dark} />
                //     </TouchableOpacity>
                //   </View>
                // </View>
              ))}
            </Animated.View>
          </>
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