import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'expo-router';

export default function Profile() {

  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Log out" onPress={() => signOut()} />
      {
        !isSignedIn && (
          <Link href="/(modals)/login" >
            <Text>
              Log in
            </Text>
          </Link>
        )
      }
    </View>
  )
}