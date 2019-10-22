import React, { Fragment, useEffect, useState } from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { useScreens } from 'react-native-screens'

import ScreenA from './screens/ScreenA'
import ScreenB from './screens/ScreenB'
import ScreenC from './screens/ScreenC'
import ScreenD from './screens/ScreenD'
import ScreenE from './screens/ScreenE'
import ScreenF from './screens/ScreenF'
import ScreenG from './screens/ScreenG'

useScreens()

// Create a Stack Nav with a Tab Nav and a Modal
// Implement Lottie Animations on Each Screen & Test Performance
// Implement Switch Navigation

// Plan Navigation for ClassNinjas

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TabNavigator = (screenProps) => (
  <Tab.Navigator screenProps={screenProps}>
    <Tab.Screen name='Tab 1'>
      {() => (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='ScreenA' component={ScreenA} />
          <Stack.Screen name='ScreenB' component={ScreenB} />
          <Stack.Screen name='ScreenD' mode='card' component={ScreenD} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
    <Tab.Screen name='Tab 2'>
      {() => (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='ScreenC' component={ScreenC} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
  </Tab.Navigator>
)

const MainNavigator = (screenProps) => (
  <Stack.Navigator mode='modal' headerMode='none'>
    <Stack.Screen name='TabStack'>
      {() => (
        <TabNavigator />
      )}
    </Stack.Screen>
    <Stack.Screen name='ScreenE' component={ScreenE} />
  </Stack.Navigator>
)

export default function App () {
  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(undefined)

  useEffect(() => {
    // const userToken = 'ABCDEFGHI'
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    setUserToken(userToken)
  }, [])

  return (
    <NavigationNativeContainer>
      <Stack.Navigator headerMode='none'>
        {isLoading ? (
          <Stack.Screen name='Splash' component={ScreenF} />
        ) : userToken === undefined ? (
          <Stack.Screen name='Onboarding'>
            {() => <ScreenG onSignIn={setUserToken} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name='Main'>
            {() => <MainNavigator />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  )
}
