import React from 'react'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import { default as theme } from './theme.json'

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import NavigationProvider from './src/components/providers/navigation'
import {CartProvider} from './src/components/providers/cart'

import 'react-native-gesture-handler'

export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SafeAreaProvider>
          <CartProvider>
            <NavigationProvider />
          </CartProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  )
}