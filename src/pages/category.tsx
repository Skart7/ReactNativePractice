import React from 'react'
import { Layout, Select, IndexPath, SelectItem, Button } from '@ui-kitten/components'
import Container from '../components/layout'
import { IconFilter } from '../components/icons'
import { StyleSheet, FlatList } from 'react-native'

import {products} from '../../db'
import ProductCard from '../components/home/card'

export default function CategoryPage({navigation, route}:any) {

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))
    const selector = ['Popular','From Cheaper', 'From More Expensive']
    const [loading, setLoading] = React.useState(false)
    const [content, setContent] = React.useState<any[]>([])

    React.useEffect(() => {
        
        setLoading(true)
        const data = products.filter(i => i.types === route.params.name)

        if(selector[selectedIndex.row] === 'Popular') {
            const res = data.sort((a, b) => a.view < b.view ? 1 : -1)
            setLoading(false)
            return setContent(res)
        }
        if(selector[selectedIndex.row] === 'From Cheaper') {
            const res = data.sort((a, b) => a.price > b.price ? 1 : -1)
            setLoading(false)
            return setContent(res)
        }
        if(selector[selectedIndex.row] === 'From More Expensive') {
            const res = data.sort((a, b) => a.price < b.price ? 1 : -1)
            setLoading(false)
            return setContent(res)
        }
        return setLoading(false)
    }, [selectedIndex,route])

    return (
    <Container loading={loading}>

        <Layout style={style.categoryHeader}>
            <Button style={style.buttonFilter} accessoryLeft={IconFilter} />
            <Select
                size="large"
                style={style.selector}
                selectedIndex={selectedIndex}
                value={selector[selectedIndex.row]}
                onSelect={(index:any) => setSelectedIndex(index)}>
                <SelectItem title='Popular'/>
                <SelectItem title='From Cheaper'/>
                <SelectItem title='From More Expensive'/>
            </Select>
        </Layout>

        <FlatList 
            data={content}
            numColumns={2}
            renderItem={({item}) => (
                <ProductCard item={item} navigation={navigation} />
            )}
        />

    </Container>
    )
}

const style = StyleSheet.create({
    categoryHeader: { marginVertical: '1%', alignItems: 'center', flexDirection: 'row'},
    selector: { width: '80%', marginHorizontal: '1%' },
    buttonFilter: {marginHorizontal: '1%'},
})