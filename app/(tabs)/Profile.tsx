import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/styles';
import Colors from '@/constants/Colors';

export default function Profile() {

  const { signOut, isSignedIn, userId } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = React.useState(user?.firstName);
  const [lastName, setLastName] = React.useState(user?.lastName);
  const [email, setEmail] = React.useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = React.useState(false);

  useEffect(() => {
    if(!user) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);

  }, [user])

  const onSaveUser = async () => {
    
    setEdit(false);
  }

  const onCaptureImage = async () => {

  }

  return (
    <SafeAreaView style={defaultStyles.safeArea} >
      <View style={pstyle.headerContainer} >
        <Text style={pstyle.header}>Profile</Text>
        <Ionicons name='notifications-outline' size={26} />
      </View>

      {user &&  (
        <View style={pstyle.card}>
          <TouchableOpacity onPress={onCaptureImage} >
            <Image source={{ uri: user?.imageUrl }} style={pstyle.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }} >
            {
              edit ? 
              (
              <View style={pstyle.editRow} >
                <TextInput 
                  placeholder='First Name' 
                  value={firstName || ''}
                  onChange={e => setFirstName(e.nativeEvent.text)}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput 
                  placeholder='Last Name' 
                  value={lastName || ''}
                  onChange={e => setLastName(e.nativeEvent.text)}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser} >
                  <Ionicons name='checkmark-outline' size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
              ) : 
              (
              <View style={pstyle.editRow} >
                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)} >
                  <Ionicons name='create-outline' size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
              ) 
            }
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && <Button title="Log out" onPress={() => signOut()} color={Colors.dark} />}
      {
        !isSignedIn && (
          <Link href="/(modals)/login" >
            <Text>
              Log in
            </Text>
          </Link>
        )
      }
    </SafeAreaView>
  )
}

const pstyle = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    marginHorizontal: 24,
    marginTop: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  }
})