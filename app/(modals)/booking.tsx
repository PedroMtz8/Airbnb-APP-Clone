import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur';
import { defaultStyles } from '@/constants/styles';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Booking() {
  const router = useRouter();

  const onClearAll = () => {
    router.navigate('Home');
  }

  return (
    <BlurView intensity={70} tint='dark' style={[ defaultStyles.safeArea, bstyles.container]} >
      <Text>Booking</Text>


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
  }
})