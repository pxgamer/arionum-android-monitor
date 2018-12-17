import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { HomeScreen } from './HomeScreen'
import { AddAccountScreen } from './AddAccountScreen'
import { AccountDetailsScreen } from './AccountDetailsScreen'
import { TransactionDetailsScreen } from './TransactionDetailsScreen'

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  AddAccount: { screen: AddAccountScreen },
  AccountDetails: { screen: AccountDetailsScreen },
  TransactionDetails: { screen: TransactionDetailsScreen }
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render () {
    return <AppContainer/>
  }
}

