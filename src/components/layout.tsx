import React from 'react'
import { Layout } from '@ui-kitten/components'

import Loading from './loading'

type iLayout = {
    children: any, 
    loading?: boolean,
    style?: object
}

export default function Container({children, loading = false, style}:iLayout) {
    return (
        <Layout level="2" style={{ width: '100%', height: '100%', position: 'relative', ...style }}>
            <Loading show={loading} />
            {children}
        </Layout>
    )
}