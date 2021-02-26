import React, {Component, useEffect} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Label,
  ScrollView,
  Button
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import Location from '../Location/Location'
import RNLocation from 'react-native-location';



class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      umur: 0,
      status: '',
      address: '',
      image: null,
      images: null,
      viewLocation: [],
    };
    RNLocation.configure({
      distanceFilter: 5.0,
    });
  }


   
    // untuk mendapatkan lokasi saaat ini 
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
                message:
                  'We use your location to show where you are on the map',
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
            
          );
        } else {
          console.log('Here 7');
          location = await RNLocation.getLatestLocation({timeout: 100});
          console.log(
            location,
            location.longitude,
            location.latitude,
            
          );
          this.setState({viewLocation: location});
        }
      }
    
 
    // memngambil gambar dengan kamera

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => alert(e));
  }

  // mengambil gambar lewat gallery
  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  // render gambar 
  renderImage(image) {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  // render semua gambar ke view
  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  sendData =()=>{
  firestore()
    .collection('Users')

    .add({
      name: this.state.name,
      age: this.state.umur,
      gender: this.state.gender,
      status: this.state.status,
      address: this.state.address,
      location:
        `${this.state.viewLocation.latitude}` +
        ' ; ' +
        `${this.state.viewLocation.longitude}`,
    })
    .then(() => {
      
      console.log('User added!');
      Alert.alert('User berhasil di tambahkan');
    });
    

  console.log(JSON.stringify(this.state))
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1, width: '100%'}}
          keyboardShouldPersistTaps="always">
          <Text style={{fontSize: 30, textAlign: 'center', marginVertical: 20}}>
            Add User
          </Text>
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
            <Picker.Item label="Pilih Gender " />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          <Text style={styles.text}>Umur</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Umur"
            onChangeText={(umur) => this.setState({umur: umur})}
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
            <Picker.Item label="Pilih Status" />
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
          <View style={{marginLeft: 30, marginTop: 10, marginBottom: 10}}>
            <ScrollView>
              {this.state.image ? this.renderAsset(this.state.image) : null}
              {this.state.images
                ? this.state.images.map((i) => (
                    <View key={i.uri}>{this.renderAsset(i)}</View>
                  ))
                : null}
            </ScrollView>
          </View>
          <Text style={styles.text}>Lokasi sekarang</Text>

          <View style={styles.container}>
            <Text>Latitude: {this.state.viewLocation.latitude} </Text>
            <Text>Longitude:{this.state.viewLocation.longitude} </Text>

            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                width: '40%',
              }}>
              <Button title="Get Location" onPress={this.permissionHandle} />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(true)}
            style={styles.button}>
            <Text style={styles.text}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.pickSingle(true)}
            style={styles.button}>
            <Text style={styles.text}>Select from galleries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.sendData}>
            <Text style={styles.buttonTitle}>Send Data</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AddUser;