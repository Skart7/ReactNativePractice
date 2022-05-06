import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type CartType = {
    getCart: { data: any[], qty: number, amount: number },
    Increase: ({data}:any) => void
    Decrease: ({data}:any) => void
    DeleteProduct: ({data}:any) => void
    DeleteStorage: () => void
    getStorage: () => void
}

const cartContextDefaultValue: CartType = {
    getCart: { data: [], qty: 0, amount: 0 },
    Increase: () => {},
    Decrease: () => {},
    DeleteProduct: () => {},
    DeleteStorage: () => {},
    getStorage: () => {},
}

const CartContext = React.createContext<CartType>(cartContextDefaultValue)

export function useCart() {
    return React.useContext(CartContext)
}

export function CartProvider({children}:any) {

    const initData = {data: [], qty: 0, amount: 0}
    const [getCart, setCart] = React.useState(initData)
    const [trigger, setTrigger] = React.useState(0)

    const getStorage = async () => {
        const storage = await AsyncStorage.getItem('cart')

        if(storage) {
            const _storage = JSON.parse(storage)
            return setCart(_storage)
        }
        else {
            return await AsyncStorage.setItem('cart', JSON.stringify(initData))
        }
    }
    const getAmount = (storage: any) => {
        storage.amount = storage.data.reduce((acc:any, i:any) => acc + (parseInt(i.price) * i.count ), 0)
    }
    const getQty = (storage: any) => {
        storage.qty = storage.data.reduce((acc:any, i:any) => acc + (parseInt(i.count)), 0)
    }
    const saveCart = async (storage: any) => {
        await AsyncStorage.setItem('cart', JSON.stringify(storage))
    }
    const Increase = async (data: any) => {
        const storage = await AsyncStorage.getItem('cart')

        if(storage) {
            const _storage = JSON.parse(storage)
            const existProduct = _storage.data.find( (item:any) => item.id === data.id.toString())

            if(existProduct) {
                existProduct.count++
                existProduct.total_price = (parseInt(existProduct.price) * existProduct.count)
            }
            else {
                _storage.data.push({ 
                    id: data.id.toString(),
                    name: data.name,
                    image: data.image || null,
                    stock: Number(data.qty),
                    price: Number(data.price),
                    count: 1,
                    total_price: Number(data.price),
                })
            }
            getAmount(_storage)
            getQty(_storage)
            saveCart(_storage)
            setTrigger(state => state + 1)
        }
    }
    const Decrease = async (data:any) => {
        const storage = await AsyncStorage.getItem('cart')

        if(storage) {
            const _storage = JSON.parse(storage)
            const existProduct = _storage.data.find( (item:any) => item.id.toString() === data.id.toString())
      
            if(existProduct && existProduct.count === 1) {
                _storage.data.splice(_storage.data.indexOf(existProduct), 1)
            }
            else {
              existProduct.count--
              existProduct.total_price = (parseInt(existProduct.price) * existProduct.count)
            }
            getAmount(_storage)
            getQty(_storage)
            saveCart(_storage)
            setTrigger(state => state + 1)
        }
    } 
    const DeleteProduct = async (data:any) => {
        const storage = await AsyncStorage.getItem('cart')

        if(storage) {
            const _storage = JSON.parse(storage)
            const existProduct = _storage.data.find( (item:any) => item.id.toString() === data.id.toString())
      
            if(existProduct) {
                _storage.data.splice(_storage.data.indexOf(existProduct), 1)
            }
            getAmount(_storage)
            getQty(_storage)
            saveCart(_storage)
            setTrigger(state => state + 1)
        }
    }
    const DeleteStorage = async () => {
        await AsyncStorage.removeItem('cart')
        await AsyncStorage.setItem('cart', JSON.stringify(initData))
        setTrigger(state => state + 1)
    }
    
    React.useEffect(() => {
        getStorage()
    }, [trigger])

    const value = {
        getCart,
        Increase,
        Decrease,
        DeleteProduct,
        DeleteStorage,
        getStorage,
    }

    return (
        <>
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        </>
        )
}
