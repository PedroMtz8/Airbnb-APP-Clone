import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function ModalHeaderText() {

  const [active, setActive] = useState(0);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
      <TouchableOpacity onPress={() => setActive(0) } >
        <Text
          style={{ 
            fontFamily: 'mon-sb',
            
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1) } >
        <Text>Experiencies</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

})