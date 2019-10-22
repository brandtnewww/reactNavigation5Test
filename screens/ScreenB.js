import React from 'react'
import { Button, View } from 'react-native'

const ScreenB = (props) => {
  const { navigation } = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey' }}>
      <Button title='Go Back!' onPress={() => navigation.goBack()} />
      <Button title='To Screen D as Modal!' onPress={() => navigation.navigate({ name: 'ScreenD' })} />
    </View>
  )
}

export default ScreenB
