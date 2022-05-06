import React from 'react'
import { Layout, Text } from '@ui-kitten/components'

import Container from '../../components/layout'
import { FlatList, StyleSheet, View } from 'react-native'


export default function OrdersPage() {

    const data = [
        {
            user: {fname: 'Some', lname: 'Sombler'},
            cart: {qty: 1, amount: 100, data: []},
            date: "2022/05/05",
            id: 1,
            status: 'paided',
        },
        {
            user: {fname: 'Some', lname: 'Sombler'},
            cart: {qty: 1, amount: 100, data: []},
            date: "2022/05/05",
            id: 2,
            status: 'not paided',
        },
        {
            user: {fname: 'Some', lname: 'Sombler'},
            cart: {qty: 1, amount: 100, data: []},
            date: "2022/05/05",
            id: 3,
            status: 'paided',
        },
        {
            user: {fname: 'Some', lname: 'Sombler'},
            cart: {qty: 1, amount: 100, data: []},
            date: "2022/05/05",
            id: 4,
            status: 'paided',
        },
    ]

    return (
    <Container>
       {
           data.length > 0 ? (
            <FlatList
                data={data}
                renderItem={({item}) => (
                    <Layout level="1" style={style.card}>
                        <View>
                            <Text category="h5" style={{ fontWeight: 'bold'}}>{item.date}</Text>
                            <Text style={{ fontWeight: 'bold'}}>{item.user.fname} {item.user.lname}</Text>
                            <Text status={item.status === 'paided' ? 'success':'danger'} style={{ fontWeight: 'bold'}}>{item.status}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                            <Text>amount ${item.cart.amount}</Text>
                            <Text>qty {item.cart.qty}</Text>
                        </View>
                    </Layout>
                )}
            />
           ) : (
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Your Order List is empty</Text>
            </Layout>
        )
       }
    </Container>
    )
}

const style = StyleSheet.create({
    card: {borderRadius: 25, margin: '2%', padding: '5%', justifyContent: 'space-between', flexDirection: 'row', shadowColor: "#000", shadowOffset: {width: 0,height: 1},shadowOpacity: 0.20,shadowRadius: 1.41,elevation: 1, position: 'relative'},
})