import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';

export default function ModalHeaderText() {

  const [active, setActive] = useState(0);

  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginRight: 30, gap: 15 }} >
      <TouchableOpacity onPress={() => setActive(0) } >
        <Text
          style={{ 
            fontFamily: 'mon-sb',
            fontSize: 18,
            color: active === 0 ? '#000' : Colors.grey,
            textDecorationLine: active === 0 ? 'underline' : 'none'
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1) } >
        <Text
          style={{ 
            fontFamily: 'mon-sb',
            fontSize: 18,
            color: active === 1 ? '#000' : Colors.grey,
            textDecorationLine: active === 1 ? 'underline' : 'none'
          }}
        >
          Experiencies
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

})