// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddUser from './src/Screens/Adduser/AddUser';
import Dashboard from './src/Screens/Dashboard/Dashboard';


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
        <Stack.Screen name="AddUser" component={AddUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
