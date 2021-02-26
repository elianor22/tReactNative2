import React, {Component} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Label,
  ScrollView,
  Button,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';

import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

import storage from '@react-native-firebase/storage';

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      image: null,
      images: null,
      
     
    };
  
  }

  // untuk mendapatkan lokasi saaat ini
  
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
           
          },
          images: null,
        });
      })
      .catch((e) => alert('Tidak jadi mengambil gambar'));
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
           
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert('Tidak jadi mengambil gambar');
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

  sendData = async () => {
    const uploadUri = this.state.image.uri
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1)

    try{
      await storage().ref(filename).putFile(uploadUri)
      
      Alert.alert('image uploaded!','gambar berhasil di upload')
    }catch(e){
      console.log(e)
    }
    
      
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1, width: '100%'}}
          keyboardShouldPersistTaps="always">
          
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
