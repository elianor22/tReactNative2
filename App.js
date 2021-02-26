// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddUser from './src/Screens/Adduser/AddUser';
import Dashboard from './src/Screens/Dashboard/Dashboard';
import EditUser from './src/Screens/EditUser/EditUser';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          onPress={() => navigation.navigate('AddUser')}
        />
        <Stack.Screen
          name="Add User"
          component={AddUser}
        />
        <Stack.Screen name="Edit User" component={EditUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
