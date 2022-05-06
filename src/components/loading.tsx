import { Layout, Spinner } from '@ui-kitten/components'
import React from 'react'

type iLoading = {
    show: boolean
}

export default function Loading({show}:iLoading) {

    if(!show) { return null } 

    return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.25)', zIndex: 1}}>
        <Spinner size='giant'/>
    </Layout>
    )
}