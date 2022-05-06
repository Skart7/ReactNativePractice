import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { IconDown, IconUp } from '../icons'

import {useCart} from '../providers/cart'


export default function ProductCard({item}:any) {

    const {Increase, Decrease} = useCart()

    return (
    <Layout level="1" style={style.card}>
        <View style={style.leftContentCard}>
            <Image style={{ width: 100, height: 100, borderRadius: 20 }} source={{ uri: item.image }} />
        </View>
        <View style={style.rightContentCard}>
            <Text>{item.name}</Text>
            <View style={style.cardAction}>
                <View style={style.priceBlock}>
                    <Text category="h6" style={style.price}>${item.price}</Text>
                    <Text style={style.qty}>x{item.count}</Text>
                </View>
                <View>
                    <Button accessoryLeft={IconUp} appearance="ghost" size="medium" onPress={() => Increase(item)} />
                    <Button accessoryLeft={IconDown} appearance="ghost" size="medium" onPress={() => Decrease(item)} />
                </View>
            </View>
        </View>
    </Layout>
    )
}

const style = StyleSheet.create({
    card: { width: '98%', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, padding: 15,flexDirection: 'row', margin: '1%', shadowColor: "#000", shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 1},
    cardAction: {justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'},
    rightContentCard: { width: '69%' },
    leftContentCard: { width: '29%' },
    priceBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',},
    price: {fontWeight: 'bold', marginHorizontal: '2%'},
    qty: {fontWeight: 'bold', marginHorizontal: '2%', paddingHorizontal: 6, paddingVertical: 4, backgroundColor: '#000', color: 'white', borderRadius: 50},
})