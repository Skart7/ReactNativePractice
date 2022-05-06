import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { Image, View, Pressable } from 'react-native'
import { IconCart } from '../icons'

import {useCart} from '../providers/cart'


export default function ProductCard({item, navigation}:any) {

    const {Increase, DeleteProduct, getCart} = useCart()

    const RenderButton = React.useCallback(() => {
        let product = getCart.data.find(i => i.id === item.id)

        if(product) {
            return (
            <Button 
                accessoryLeft={IconCart} 
                size="small" 
                status="danger" 
                onPress={() => DeleteProduct(item)}
            />
           )
        }
        return (
            <Button 
                accessoryLeft={IconCart} 
                size="small" 
                onPress={() => Increase(item)}
            />
        )
    }, [])

    return (
    <Layout level="1" style={{ width: '48%', margin: '1%', alignItems: 'center', paddingVertical: 10, borderRadius: 20, shadowColor: "#000", shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 1,}}>
        <Pressable onPress={() => navigation.navigate('Details', item)}>
            <Image style={{ width: 150, height: 150 }} source={{ uri: item.image }} />
        </Pressable>
        <View style={{ marginVertical: 10, justifyContent: 'flex-start', height: 40, overflow: 'hidden' }}>
            <Text>{item.name}</Text>
        </View>
        <View style={{ justifyContent: 'space-around', alignItems: 'center', width: '100%', marginVertical: 5, flexDirection: 'row'}}>
            <Text category="h6" style={{ fontWeight: 'bold'}}>$ {item.price}</Text>
            <RenderButton />
        </View>
    </Layout>
    )
}