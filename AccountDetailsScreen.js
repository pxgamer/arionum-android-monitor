import React from 'react';
import {  View, FlatList, Alert, Button, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ArionumApi } from './ArionumApi';
import { Repository } from './Repository';
import {  ListItem } from 'react-native-elements';
import { Utils } from './Utils';

export class AccountDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('accountId', 'Account Details'),
        };
      };

    constructor(props){
        super(props);       
        this.repo = new Repository();

        this.state = {
            accountId : '',
            transactions : [],
            loading: true
        };     
    }

    async componentDidMount() {
        //this.loadData();
    }    


    getColorForTransaction(transaction)
    {
        switch(transaction.type)
        {
            case "credit":
                return "green";
            case "debit":
                return "red";  
            case "mining":
                return "green";
            default: 
                return "black";
        }
    }

    async loadData(accountId)
    {    
        let server = await this.repo.getRandomServer();
        let api = new ArionumApi(server);

        let data = await api.getTransactions(accountId);
        
        let newTransactions = data.map (
            x => {
                return {
                    key: x.id,
                    account: (x.type=="credit") ? x.src : x.dst,
                    date: Utils.dateFromTs(x.date),
                    value: parseFloat(x.val),
                    transaction: x
                }
            }
        );

        

        


        let newState = { 
            accountId : accountId, 
            transactions : newTransactions,
            loading : false
        };            

        
        this.setState(newState);
    }

    render() {
      const {navigate} = this.props.navigation;
      
      return (
        <View style={{flex: 1, padding: 20, flexDirection: 'column', justifyContent: 'space-between'}}>
        <NavigationEvents
              onDidFocus={payload => { this.loadData(this.props.navigation.getParam('accountId', null)); } }
            />
        {this.state.loading && (
            <ActivityIndicator animating={true} hidesWhenStopped={true} size="large" />
        )}

        <FlatList
          data={this.state.transactions}
          initialNumToRender={10}
        
          renderItem={({item}) => <ListItem      
            key={item.key}        
            title={ item.account} 
            titleProps={{ numberOfLines: 1 }}            
            subtitle={Utils.formatShortDate(item.date)}
            rightIcon={{ name: 'arrow-forward' }}             
            bottomDivider={true} 
            containerStyle={{ padding:0, paddingTop: 10,  paddingBottom: 10}}            
            badge={{ value: Utils.formatAmount(item.value), containerStyle: { backgroundColor: this.getColorForTransaction(item.transaction)}   }}
            onPress={() => navigate('TransactionDetails', { transactionId : item.key, transaction: item.transaction })}

            /> }                        
        />
        
            <Button
            title="Delete account"
            onPress={() => {

                Alert.alert(
                    'Delete account',
                    'Are you sure?',
                    [                      
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'OK', onPress: () => { 
                          this.repo.deleteAccount(this.state.accountId);
                          navigate("Home");  
                     }},
                    ],
                    { cancelable: false }
                  );

             }}
            />
        </View>
      );
    }
  }