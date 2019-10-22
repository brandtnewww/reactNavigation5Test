import React from 'react'
import { Button, View } from 'react-native'

const ScreenA = (props) => {
  const { navigation } = props

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Button title='To Screen B' onPress={() => navigation.navigate('ScreenB')} />
      <Button title='Open Modal Screen E' onPress={() => navigation.navigate('ScreenE')} />
    </View>
  )
}

export default ScreenA
