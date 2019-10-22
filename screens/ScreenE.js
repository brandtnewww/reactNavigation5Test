import React, { useEffect, useRef, useState } from 'react'
import { Button, View } from 'react-native'
import LottieView from 'lottie-react-native'

const ScreenE = (props) => {
  const { navigation, route } = props

  const animationRef = useRef(null)
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true)
      animationRef && animationRef.current && animationRef.current.play()
    }, 100)
    return () => {
      animationRef && animationRef.current && animationRef.current.reset()
      setStartAnimation(false)
    }
  }, [])

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
      <View style={{ width: 320, height: 320 }}>
        {startAnimation && <LottieView ref={animationRef} source={require('../assets/lottie/RightAnswer1Mobile.json')} />}
      </View>
      <Button title={title} onPress={handleNavigation} />
    </View>
  )
}

export default ScreenE
