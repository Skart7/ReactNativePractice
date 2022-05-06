import React from 'react'
import { Button, Input, Layout } from '@ui-kitten/components'

import Container from '../../components/layout'
import { StyleSheet } from 'react-native'

export default function ProfilePage() {

    const [fname, setFname] = React.useState('')
    const [lname, setLname] = React.useState('')


    return (
    <Container>
       <Layout style={styles.layout}>
        <Layout style={styles.box}>
            <Input
                placeholder="Fname"
                value={fname}
                size="large"
                style={styles.input}
                onChangeText={(e) => setFname(e)}
            />
            <Input
                placeholder="Lname"
                value={lname}
                size="large"
                style={styles.input}
                onChangeText={(e) => setLname(e)}
            />
            </Layout>
            <Button>Save</Button>
       </Layout>
    </Container>
    )
}

const styles = StyleSheet.create({
    layout: {
      width: '100%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    box: {
      width: 300,
      padding: 20,
      borderRadius: 10,
    },
    input: {
      marginVertical: 5
    },
  })