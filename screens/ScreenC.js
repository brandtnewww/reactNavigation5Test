import React from 'react'
import { Button, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

const ScreenC = (props) => {
  const { navigation } = props

  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate('ScreenE', { goBack: 'tabs' })
    }, [])
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Button title='Open Modal Screen E' onPress={() => navigation.navigate('ScreenE')} />
    </View>
  )
}

export default ScreenC
