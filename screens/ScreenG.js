import React from 'react'
import { Button, View } from 'react-native'

const ScreenG = (props) => {
  const { onSignIn } = props
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Sign In' onPress={() => onSignIn('SIGN')} />
    </View>
  )
}

export default ScreenG
