import React, { Component } from 'react';
import { View, Text ,FlatList,Image,StyleSheet,ActivityIndicator} from 'react-native';
import {Card,CardItem, Item} from 'native-base';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      dataSource: []
    };
  }
getUserFromApi = () => {
  return fetch("https://randomuser.me/api/?results=50")
    .then(Response => Response.json())
    .then(ResponseJson => {
      this.setState({
      isLoading:false,
      dataSource: this.state.dataSource.concat(ResponseJson.results)
    });
  })
    .catch(error => console.log(error));
  
};

_keyExtrator = (datasource, index) => datasource.email;
componentDidMount(){
  this.getUserFromApi();
}
  render() {
    if(this.state.isLoading){
     return(
       <View>
      <ActivityIndicator size='large' color='#fff'/>
      </View>
     );
    }

    return (
      <FlatList
      data={this.state.dataSource}
      keyExtrator={this._keyExtrator}
      renderItem={({item}) => (
        <Card>
          <CardItem>
            <View style={styles.cont}>
               <Image style={styles.pro} 
               source={{ uri:item.picture.medium}}
               />
            </View>
            <View style={styles.userinfo}>
               <Text>
                 Name : {item.name.tittle} {item.name.first} {item.name.last}
               </Text>
                 <Text>Email:{item.email}</Text>
                 <Text>Location:{item.location.city }</Text>
                 <Text>Country:{item.location.country}</Text>
            </View>
          </CardItem>

        </Card>
      )}
    />
    );
  }
}

const styles=StyleSheet.create({
  cont :{
    flex:2,
    justifyContent:'center',
    alignItems:'center',
  },
  pro:{
    flex:5,
    height:100,
    width:100,
    marginEnd:10,
  },
  userinfo:{
    flex:5,
    flexDirection: 'column',

  }
})
