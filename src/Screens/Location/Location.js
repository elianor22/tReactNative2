import React, {useState,Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import RNLocation from 'react-native-location';
RNLocation.configure({
  distanceFilter: 5.0,
});

class Location extends Component{

  constructor (props){
    super(props)
    this.state ={
      viewLocation:[],
    }
  }

   permissionHandle = async () => {
    console.log('here');

    permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'We need to access your location',
          message: 'We use your location to show where you are on the map',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    });
    console.log(permission);

    let location;
    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
    } else {
      console.log('Here 7');
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.log(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
      this.setState({viewLocation:location});
      
    }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Latitude: {this.state.viewLocation.latitude} </Text>
        <Text>Longitude:{this.state.viewLocation.longitude} </Text>

        <View
          style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
          <Button title="Get Location" onPress={this.permissionHandle} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    marginTop:10,
  },
});

export default Location;
