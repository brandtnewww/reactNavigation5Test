import React, { useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import { NavigationNativeContainer, useLinking } from '@react-navigation/native'
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

const parseDeepLink = (path, options) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}
  let match

  while ((match = regex.exec(path))) {
    params[match[1]] = match[2]
  }

  let navigationState

  // xcrun simctl openurl booted reactNavigationTest://screenE
  if (path.match('screenE')) {
    navigationState = {
      routes: [
        {
          name: 'Main',
          state: {
            routes: [
              {
                name: 'ScreenE',
                params: { goBack: 'tabs' }
              }
            ]
          }
        }
      ]
    }
  }

  // xcrun simctl openurl booted reactNavigationTest://tab2
  if (path.match('tab2')) {
    navigationState = {
      routes: [
        {
          name: 'Main',
          state: {
            routes: [
              {
                name: 'TabStack',
                state: {
                  routes: [
                    {
                      name: 'Tab2'
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }

  return navigationState
}

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const tabConfiguration = name => {
  if (name === 'Tab1') {
    return {
      label: 'Tab A',
      color: 'red'
    }
  } else {
    return (
      {
        label: 'Tab B',
        color: 'blue'
      }
    )
  }
}

const tabScreenOptions = props => {
  const { name } = props.route
  const { label, color } = tabConfiguration(name)

  console.warn(name)
  return ({
    tabBarLabel: ({ focused }) => {
      return <Text style={{ fontSize: 10, lineHeight: 12, color: focused ? color : 'grey' }}>{label}</Text>
    }
  })
}

// const TabBarLabel = styled(StyledText)`
//   font-size: 10;
//   line-height: 12;
//   color: ${props => !props.focused ? colors.grey : props.activeTintColor};
// `

const TabNavigator = (screenProps) => (
  // <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={(route) => tabScreenOptions(route)}>
  <Tab.Navigator screenOptions={(route) => tabScreenOptions(route)}>
    <Tab.Screen name='Tab1'>
      {() => (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='ScreenA' component={ScreenA} />
          <Stack.Screen name='ScreenB' component={ScreenB} />
          <Stack.Screen name='ScreenD' mode='card' component={ScreenD} />
        </Stack.Navigator>
      )}
    </Tab.Screen>
    <Tab.Screen name='Tab2'>
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
  const navigationRef = useRef()

  const prefixes = ['reactNavigationTest://']
  const { getInitialState } = useLinking(navigationRef, { prefixes, getStateFromPath: (path, options) => parseDeepLink(path, options) })

  const [isLoading, setIsLoading] = useState(true)
  const [userToken, setUserToken] = useState(undefined)
  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState()

  useEffect(() => {
    const userToken = 'ABCDEFGHI'
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    setUserToken(userToken)
  }, [])

  useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state)
        }
        setIsReady(true)
      })
  }, [getInitialState])

  if (!isReady) {
    return null
  }

  return (
    <NavigationNativeContainer initialState={initialState} ref={navigationRef}>
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
