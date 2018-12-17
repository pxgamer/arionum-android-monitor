import React from 'react'
import { ActivityIndicator, Button, FlatList, View } from 'react-native'
import { ArionumApi } from './ArionumApi'
import { NavigationEvents } from 'react-navigation'
import { Repository } from './Repository'
import { Badge, Divider, ListItem, Text } from 'react-native-elements'
import { Utils } from './Utils'

export class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Arionum Monitor',
  }

  constructor (props) {

    super(props)
    this.repo = new Repository()
    this.state = {
      accountList: [],
      sum: 0.0,
      lastUpdated: null,
      server: null,
      loading: true
    }

  }

  async componentDidMount () {

    setInterval(() => (
      this.updateAllValues()
    ), 60000)
  }

  async updateAllValues () {

    let newServer = await this.repo.getRandomServer()
    let api = new ArionumApi(newServer)
    let balances = await api.getBalances(await this.repo.getAccountList())
    let newAccountList = balances.map(x => { return { key: x.accountId, value: x.value } })
    let newSum = 0.0
    balances.forEach((x) => { newSum += x.value })
    this.setState({
      accountList: newAccountList,
      sum: newSum,
      lastUpdated: new Date(),
      server: newServer,
      loading: false
    }, function () { })

  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, padding: 20, flexDirection: 'column', justifyContent: 'space-between' }}>
        <NavigationEvents
          onDidFocus={payload => this.updateAllValues()}
        />

        <Text>Total balance</Text>
        <Badge
          value={Utils.formatAmount(this.state.sum)}
          textStyle={{ fontSize: 18 }}
          containerStyle={{ marginBottom: 10 }}
        />

        <Divider style={{ backgroundColor: 'blue' }}/>

        {this.state.loading && (
          <ActivityIndicator animating={true} hidesWhenStopped={true} size="large"/>
        )}

        <FlatList
          data={this.state.accountList}

          renderItem={({ item }) => <ListItem
            key={item.key}
            title={item.key}
            titleProps={{ numberOfLines: 1 }}
            rightIcon={{ name: 'arrow-forward' }}
            bottomDivider={true}
            containerStyle={{ padding: 0, paddingTop: 15, paddingBottom: 15 }}
            onPress={() => navigate('AccountDetails', { accountId: item.key })}
            badge={{ value: Utils.formatAmount(item.value) }}
          />}

        />
        <Divider style={{ backgroundColor: 'blue' }}/>
        <Text>{Utils.formatShortDate(this.state.lastUpdated)}</Text>
        <Text>{(this.state.server != null) ? this.state.server : ''}</Text>

        <Button
          title="Add account"
          onPress={() => navigate('AddAccount')}
        />

      </View>
    )
  }
}
