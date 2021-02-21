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
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';


class EditUser extends Component {
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
    };
  }

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
  renderImage(image) {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
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

          <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(true)}
            style={styles.button}>
            <Text style={styles.text}>
              Open Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.pickSingle(true)}
            style={styles.button}>
            <Text style={styles.text}>Select from galleries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.registerUser}>
            <Text style={styles.buttonTitle}>Send Data</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default EditUser;