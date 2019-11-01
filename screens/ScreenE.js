import React from 'react'
import { Button, View } from 'react-native'

const ScreenE = (props) => {
  const { navigation, route } = props

  let title = 'Go Back To Tabs'
  if (route && route.params && route.params.goBack === 'tabs') {
    title = 'Go Back To Screen A'
  }

  const handleNavigation = () => {
    if (route && route.params && route.params.goBack === 'tabs') {
      navigation.navigate('ScreenA')
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <Button title={title} onPress={handleNavigation} />
    </View>
  )
}

export default ScreenE
