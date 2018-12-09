import React from 'react';
import {   View  } from 'react-native';
import { Repository } from './Repository';
import { TextInput, Button } from 'react-native';

export class AddAccountScreen extends React.Component {
    static navigationOptions = {
      title: 'Add account',
    };

    

    constructor(props){
        super(props);  
        this.repo = new Repository();
        this.state = {
          text : ''
        };     
        this.onPressOk = this.onPressOk.bind(this);      
    }

    onPressOk()
    {        
        this.repo.addAccount(this.state.text);
        this.props.navigation.navigate('Home');
    }



    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={{padding: 20}}>
            
            <TextInput            
            placeholder="Enter account id"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}            
            style={{marginTop : 20, marginBottom: 20, borderColor : "#f0f0f0", padding: 5, fontSize: 15, borderWidth : 1}}
            multiline={true}
            numberOfLines={4}
            />
          
            <Button
            title="OK"
            onPress={this.onPressOk}
            
            />

        </View>
      );
    }
  }