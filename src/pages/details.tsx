import React from 'react'
import { Button, Layout, Text } from '@ui-kitten/components'
import Container from '../components/layout'

import {Image} from 'react-native'
import { IconCart } from '../components/icons'

import {useCart} from '../components/providers/cart'

export default function DetailsPage({route}:any) {

    const {params} = route

    const {Increase, Decrease, getCart} = useCart()

    const RenderButton = React.useCallback(() => {
        let product = getCart.data.find(i => i.id === params.id)

        if(product) {
            return (
            <Button 
                accessoryLeft={IconCart} 
                size="small" 
                status="danger" 
                onPress={() => Decrease(params)}
            />
           )
        }
        return (
            <Button 
                accessoryLeft={IconCart} 
                size="small" 
                onPress={() => Increase(params)}
            />
        )
    }, [route])

    return (
    <Container>

        <Layout level="2" style={{ width: '100%', alignItems: 'center', paddingHorizontal: '10%' }}>
            <Image style={{ height: 350, width: 350, borderRadius: 20}} resizeMode="center" source={{ uri: params.image }} />
        </Layout>
        <Layout level="2" style={{ width: '100%', paddingHorizontal: '10%' }}>
            <Layout level="2" style={{ marginBottom: '5%' }}>
                <Text category="h6" style={{ fontWeight: 'bold' }}>{params.name}</Text>
                <Text category="c1" status="basic">{params.types}</Text>
            </Layout>
            <Layout level="2" style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text category="h5" style={{ fontWeight: 'bold'}}>${params.price}</Text>
                <RenderButton  />
            </Layout>
        </Layout>

    </Container>
    )
}