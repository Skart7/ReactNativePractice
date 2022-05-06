import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaView, View, TouchableOpacity } from 'react-native'

import { Button, Drawer, DrawerItem, IndexPath, Layout, Text, useTheme } from '@ui-kitten/components'

import HomePage from '../../pages/index'
import CartPage from '../../pages/cart'
import OrdersPage from '../../pages/account/orders'
import Profile from '../../pages/account/profile'
import CategoryPage from '../../pages/category'
import LoginPage from '../../pages/login'
import DetailsPage from '../../pages/details'
import { IconBack, IconCart, IconHome, IconLogIn, IconMenu, IconUser, IconOrder } from '../icons'
import {useCart} from './cart'

export default function NavigationProvider() {

    const { Navigator, Screen } = createDrawerNavigator()
    const theme = useTheme()
    const {getCart} = useCart()

    const Header = ({navigation}:any) => {

      const GoToProfile = () => navigation.navigate('Profile')
      const GoToOrderPage = () => navigation.navigate('Orders')

        return (
        <Layout level="2">
          <Layout 
            style={{ backgroundColor: theme['color-primary-disabled'], height: 200, paddingVertical: 50, paddingHorizontal: 20, marginBottom: 5, position: 'relative'}}>
            <TouchableOpacity onPress={GoToProfile}>
              <IconUser style={{ width: 75, height: 75 }}  />
            </TouchableOpacity>
          
            <Text category="h6" style={{ marginTop: 10, fontWeight: 'bold'}}>Have a nice day</Text>
            <Text category="p1" style={{ textTransform: 'uppercase' }}>User</Text>
          </Layout>
          <Button onPress={GoToOrderPage} appearance="outline" size="large" accessoryLeft={IconOrder} style={{ position: 'absolute', top: 45, right: 5 }} />
        </Layout>
        )
    }

    const DrawerContent = ({ navigation, state }:any) => {

        return (
          <SafeAreaView>
            <Drawer
                style={{ height: '100%' }}
                header={<Header navigation={navigation} />}
                selectedIndex={new IndexPath(state.index)}
                onSelect={index => navigation.navigate(state.routeNames[index.row])}>
                <DrawerItem title='Home' accessoryLeft={IconHome} style={{ paddingVertical: 20 }} />
                <DrawerItem title='Cart' accessoryLeft={IconCart} style={{ paddingVertical: 20 }} />
                <DrawerItem title='Login' accessoryLeft={IconLogIn} style={{ paddingVertical: 20 }} />
            </Drawer>
        </SafeAreaView>
        )
    }

    const RightDefaultContentHeader = ({navigation}:any) => {

    return (
    <View style={{ position: 'relative' }}>
      <Text style={{ position: 'absolute', top: 5, right: 15, backgroundColor: theme['color-primary-default'], borderRadius: 50, zIndex: 1, fontSize: 10, paddingHorizontal: 5, paddingVertical: 1, fontWeight: 'bold' }}>{getCart.qty}</Text>
      <Button size="large" appearance='ghost' status="primary" accessoryLeft={IconCart} onPress={() => navigation.navigate('Cart')} />
    </View>
  )
    }
    const LeftDefaultContentHeader = ({ navigation}:any) => {

      return (
        <Button size="large" appearance='ghost' status="primary" accessoryLeft={IconMenu} onPress={() => navigation.openDrawer()} />
      )
    }
    const LeftHeaderContentGoBack = ({ navigation}:any) => {
      return (
        <Button size="large" appearance='ghost' status="basic" accessoryLeft={IconBack} onPress={() => navigation.goBack()} />
      )
    }

    const DrawerNav = () => {
        return (
            <Navigator
             drawerContent={props => <DrawerContent {...props} />} 
             initialRouteName="Home" 
             useLegacyImplementation={true}
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme['color-primary-disabled'],
                },
                headerTintColor: theme['text-primary-color'],
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
             >
              <Screen 
                name='Home' 
                component={HomePage} 
                options={({navigation}:any) => ({
                  title: "React Native",
                  headerRight: () => <RightDefaultContentHeader navigation={navigation} />,
                  headerLeft: () => <LeftDefaultContentHeader navigation={navigation} />,
                })} 
              />
              <Screen 
                name='Cart' 
                component={CartPage}
                options={ ({navigation}:any) => ({
                  title: "My Cart",
                  headerLeft: () => <LeftHeaderContentGoBack navigation={navigation} />
                })} 
                />
                <Screen 
                  name='Login' 
                  component={LoginPage}
                  options={({navigation}:any) => ({
                    title: "Login",
                    headerLeft: () => <LeftHeaderContentGoBack navigation={navigation} />
                  })} 
                />
                <Screen 
                  name='Profile' 
                  component={Profile}
                  options={({navigation}:any) => ({
                    title: "My Profile",
                    headerLeft: () => <LeftHeaderContentGoBack navigation={navigation} />
                  })} 
                />
                <Screen 
                  name='Orders' 
                  component={OrdersPage}
                  options={({navigation}:any) => ({
                    title: "My Orders",
                    headerLeft: () => <LeftHeaderContentGoBack navigation={navigation} />
                  })} 
                />
                <Screen 
                  name='Category' 
                  component={CategoryPage} 
                  options={({navigation, route}:any) => ({
                    title: `React Native | ${route.params ? route.params.name : 'Category'}`,
                    headerRight: () => <RightDefaultContentHeader navigation={navigation} />,
                    headerLeft: () => <LeftDefaultContentHeader navigation={navigation} />,
                  })} 
                />
                <Screen 
                  name='Details' 
                  component={DetailsPage}
                  options={({navigation}:any) => ({
                      title: "Product detail",
                      headerLeft: () => <LeftHeaderContentGoBack navigation={navigation} />
                    })} 
                />
            </Navigator>
          )
    }

    return (
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    )
}