import React from 'react'
import { Alert, Button, TextInput, View } from 'react-native'
import { Repository } from './Repository'
import { ArionumApi } from './ArionumApi'

export class AddAccountScreen extends React.Component {
  static navigationOptions = {
    title: 'Add account',
  }

  constructor (props) {
    super(props)
    this.repo = new Repository()
    this.state = {
      text: ''
    }
    this.onPressOk = this.onPressOk.bind(this)
  }

  async onPressOk () {
    let server = await this.repo.getRandomServer()
    let api = new ArionumApi(server)
    let accountId = this.state.text.trim()
    let result = await api.checkAddress(accountId)

    if (result) {
      this.repo.addAccount(accountId)
      this.props.navigation.navigate('Home')
    } else {
      Alert.alert('Error', 'Invalid account id')
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{ padding: 20 }}>

        <TextInput
          placeholder="Enter account id"
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          style={{ marginTop: 20, marginBottom: 20, borderColor: '#f0f0f0', padding: 5, fontSize: 15, borderWidth: 1 }}
          multiline={true}
          numberOfLines={4}
        />

        <Button
          title="OK"
          onPress={this.onPressOk}

        />

      </View>
    )
  }
}
