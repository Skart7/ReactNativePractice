import React from 'react'
import Container from '../components/layout'
import { FlatList, View, StyleSheet } from 'react-native'

import ProductCard from '../components/cart/card'
import { Button, Layout, Text } from '@ui-kitten/components'

import {useCart} from '../components/providers/cart'

export default function CartPage({navigation}:any) {

    const {getCart} = useCart()

    return (
    <Container>
        {
            getCart.data.length > 0 ? (
            <>
            <FlatList
                data={getCart.data}
                renderItem={({item}) => (
                    <ProductCard item={item} />
                )}
            />
    
            <Layout level="4" style={style.infoBlock}>
                <View style={style.infoBlockInner}>
                    <Text style={style.text} category="p1">Total count:</Text>
                    <Text style={style.text} category="h6">{getCart.qty}</Text>
                </View>
                <View style={style.infoBlockInner}>
                    <Text style={style.text} category="p1">Total price:</Text>
                    <Text style={style.text} category="h6">${getCart.amount}</Text>
                </View>
                <View>
                    <Button style={style.buttonCheckout}>Create Order</Button>
                </View>
            </Layout>
            </>
            ) : (
                <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Your Cart is empty</Text>
                </Layout>
            )
            
        }
    </Container>
    )
}

const style = StyleSheet.create({
    infoBlock: { width: '100%', padding: 25, paddingTop: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    infoBlockInner: { marginVertical: '2%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'},
    text: { fontWeight: 'bold' },
    buttonCheckout: { borderRadius: 25 },
})