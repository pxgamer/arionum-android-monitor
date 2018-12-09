import React from 'react';
import {  ScrollView, View  } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ArionumApi } from './ArionumApi';
import { Repository } from './Repository';
import { Divider, Text } from 'react-native-elements';
import { Utils } from './Utils';


export class TransactionDetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('transactionId', 'Transaction Details'),
        };
      };

    constructor(props){
        super(props);       
        this.repo = new Repository();

        this.state = {
            transactionId : '',
            transactionDetails : null
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

    async loadData(transaction)
    {        
        let newState = {             
            transaction : transaction
        };            
        
        this.setState(newState);
    }

    itemRender(title, value)
    {
        return (
            <View>                
                <Text style={{ color: "grey", paddingTop: 10 }}>{title}</Text>
                <Text style={{ color: "black" }} selectable={true} >{value.toString()}</Text>
                <Divider />                
            </View>
        );
    }

    subRender(transaction)
    {
        if (transaction != null)
        return (
            <ScrollView >                
                {this.itemRender('Date', Utils.dateFromTs(this.state.transaction.date) )}
                {this.itemRender('Value', this.state.transaction.val)}
                {this.itemRender('Source', this.state.transaction.src)}
                {this.itemRender('Destination', this.state.transaction.dst)}
                {this.itemRender('Message', this.state.transaction.message)}
                {this.itemRender('Type', this.state.transaction.type)}
                {this.itemRender('Confirmations', this.state.transaction.confirmations)}
                {this.itemRender('Fee', this.state.transaction.fee)}
                {this.itemRender('Id', this.state.transaction.id)}
                {this.itemRender('Height', this.state.transaction.height)}
                {this.itemRender('Block', this.state.transaction.block)}
                {this.itemRender('Public key', this.state.transaction.public_key)}
                {this.itemRender('Signature', this.state.transaction.signature)}                                                    
            </ScrollView>
        )
        else
            return (
                <View></View>
            );
    }

    render() {      
      return (
        <View style={{padding: 20}}>
        <NavigationEvents
              onDidFocus={payload => { this.loadData(this.props.navigation.getParam('transaction', null)); } }
            />
            {this.subRender(this.state.transaction)}
        </View>
      );
    }
  }