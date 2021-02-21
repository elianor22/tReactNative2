import React, {Component} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Label,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';
import {Picker} from '@react-native-picker/picker';


class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      umur: 0,
      status: '',
      address: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1, width: '100%'}}
          keyboardShouldPersistTaps="always">
          <Text style={{fontSize:30,textAlign:'center',marginVertical:20,}}>Add User</Text>
          <Text style={styles.text}>Masukan Nama</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(name) => this.setState({name: name})}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.text}>Pilih Gender</Text>
          <Picker
            selectedValue={this.state.gender}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          <Text style={styles.text}>Umur</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Umur"
            onChangeText={(password) => this.setState({password: password})}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.text}>Status</Text>
          <Picker
            selectedValue={this.state.status}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({status: itemValue})
            }>
            <Picker.Item label="Single" value="Single" />
            <Picker.Item label="Married" value="Married" />
          </Picker>
          <Text style={styles.text}>Alamat</Text>
          <TextInput
            style={styles.address}
            multiline={true}
            placeholderTextColor="#aaaaaa"
            placeholder="Address"
            onChangeText={(address) => this.setState({address: address})}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={this.registerUser}>
            <Text style={styles.buttonTitle}>Send Data</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AddUser;