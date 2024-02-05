import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { Listing } from '@/interfaces/listing';
import Listings from './Listings';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
// import BottomSheet from '@ghorm'

interface Props {
  listings: Listing[];
  category: string;
}

export default function ListingsBottomSheet({ listings, category}: Props) {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [refresh, setRefresh] = React.useState(0)

  const snapPoints = useMemo(() => ['10%', '100%'], [])

  const showMap = () => {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }

  return (
    <BottomSheet 
      ref={bottomSheetRef} 
      index={1}
      snapPoints={snapPoints} 
      enablePanDownToClose={false}
      enableContentPanningGesture={false}
      handleIndicatorStyle={{
        backgroundColor: Colors.grey
      }} 
      style={istyles.sheetContainer}
    > 
      <View style={{ flex: 1 }} >
        <Listings listings={listings} category={category} refresh={refresh} />
        <View style={istyles.absoluteBtn} >
          <TouchableOpacity onPress={showMap} style={istyles.btn} >
            <Text style={{ fontFamily: 'mon-sb', color: '#fff' }} >Map</Text>
            <Ionicons name='map' size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        </View>
    </BottomSheet>
  )
}

const istyles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: { 
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    gap: 8
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1
    }
  }
})