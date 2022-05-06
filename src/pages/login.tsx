import React from 'react'
import {StyleSheet} from 'react-native'
import { Layout, Button, Input, Text } from '@ui-kitten/components'

export default function LoginPage({navigation}:any) {

  const [login, setLogin] = React.useState('')
  const [name, setName] = React.useState('')
  const [errLogin, setErrLogin] = React.useState('')
  const [errName, setErrName] = React.useState('')
  const [err, setErr] = React.useState('')

  const HandleChangeLoginVal = (e:any) => setLogin(e)
  const HandleChangeNameVal = (e:any) => setName(e)


  return (
    <Layout style={styles.layout} level="4">
        <Layout style={styles.box} level="4">
        <Input
            placeholder="login"
            value={login}
            size="large"
            status={errLogin ? "danger" : "info"}
            caption={errLogin ? errLogin : "Write Your NickName"}
            style={styles.input}
            onChangeText={HandleChangeLoginVal}
        />
        <Input
            placeholder="name"
            value={name}
            size="large"
            status={errName ? "danger" : "info"}
            caption={errName ? errName : "Write Your Real Name"}
            style={styles.input}
            onChangeText={HandleChangeNameVal}
        />
        {
          err ? <Text style={{ color: 'red' }}>{err}</Text> : null
        }
        </Layout>
        <Button>Next</Button>
    </Layout>
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