import React from 'react'
import { Button, Text, View } from 'react-native'

const ScreenG = (props) => {
  const { onSignIn } = props
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Sign In' onPress={() => onSignIn('SIGN')} />
      <Text style={{ fontFamily: 'NeuzeitGro-Bol' }}>Neuzeit Grotesk Bold</Text>
      {/* <Text style={{ fontFamily: 'Hack-Bold' }}>Hack Bold</Text> */}
    </View>
  )
}

export default ScreenG
