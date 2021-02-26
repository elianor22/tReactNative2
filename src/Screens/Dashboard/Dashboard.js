import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import firestore from '@react-native-firebase/firestore';
// import {ActivityIndicator} from 'react-native';

export default function Dashboard({navigation}) {
   const [loading, setLoading] = useState(true); // Set loading to true on component mount
   const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const Users = firestore()
      .collection('Users')
      .onSnapshot((querySnapshot) => {
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({
            ...doc.data(),
            key: doc.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => Users();
  }, []);

   if (loading) {
     return <ActivityIndicator />;
   }
  return (
    <View>
      <Text>Dashboard</Text>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View
            style={{
              height: 50,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ScrollView>
              <Text>User ID: {item.id}</Text>
              <Text>User Name: {item.name}</Text>
              <Text>Gender : {item.gender}</Text>
            </ScrollView>
          </View>
        )}
      />
      

      <View>
        <TouchableOpacity
          style={styles.addUser}
          onPress={() => navigation.navigate('Add User')}>
          <Text>go to add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addUser: {
    position: 'absolute',
    right: 0,
    bottom:0,
    width: 100
    
  },
});
