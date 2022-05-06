import React from 'react'
import {Text, Layout} from '@ui-kitten/components'
import Container from '../components/layout'
import {Image, StyleSheet, View, Pressable, ScrollView} from 'react-native'

import {categoryFlower, products} from '../../db'
import ProductCard from '../components/home/card'

export default function HomePage({navigation}:any) {

    return (
    <Container>
        <ScrollView>
            {/* <Layout level="1" style={style.swiper}>
                <Text>React Native</Text>
            </Layout> */}

            <Layout level="2" style={style.blockMenu}>

                {
                    categoryFlower.map((item, key) => (
                    <Layout level="1" style={style.menuCart} key={key}>
                        <Pressable  onPress={() => navigation.navigate('Category', item)} style={style.cardInner}>
                            <Image style={style.image} source={{ uri: item.image }} />
                            <Text style={style.text}>{item.name}</Text>
                        </Pressable>
                    </Layout>
                    ))
                }

                <Layout level="2" style={style.popular}>
                    <Layout level="2" style={style.header}>
                        <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Popular</Text>
                    </Layout>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {
                            products
                            .filter(item => item.tags[0] === 'flowers')
                            .sort((a, b) => a.view < b.view ? 1 : -1)
                            .slice(0, 2)
                            .map((item, key) => (<ProductCard item={item} key={key} navigation={navigation} />))
                        }
                    </View>
                </Layout>

                <Layout level="2" style={style.popular}>
                    <Layout level="2" style={style.header}>
                        <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Last Views</Text>
                    </Layout>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {
                            products.filter(item => item.tags[0] === 'flowers').slice(0, 2).map((item, key) => (
                                <ProductCard item={item} key={key} navigation={navigation} />
                            ))
                        }
                    </View>
                </Layout>

            </Layout>
        </ScrollView>
    </Container>
    )
}

const style = StyleSheet.create({
    swiper: { width: '97%', height: 200, borderRadius: 20, marginVertical: 20, marginHorizontal: '1.5%', justifyContent: 'center', alignItems: 'center', shadowColor: "#000", shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 1, },
    blockMenu: { width: '97%', borderRadius: 20, paddingVertical: 10, marginHorizontal: '1.5%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' },
    menuCart: { width: '31%', borderRadius: 25, paddingVertical: 5, shadowColor: "#000", shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 1, margin: '1%' },
    image: {width: 85, height: 85, borderRadius: 50},
    text: { fontSize: 12, marginTop: 5 },
    cardInner: {justifyContent: 'center', alignItems: 'center'},
    header: {padding: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderRadius: 20,},
    popular: {width: '97%', borderRadius: 20, marginVertical: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' },
})