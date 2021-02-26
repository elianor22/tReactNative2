/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AddUser from './src/Screens/Adduser/AddUser';
import Dashboard from './src/Screens/Dashboard/Dashboard';
import Location from './src/Screens/Location/Location';
import Test from './Test'


AppRegistry.registerComponent(appName, () => AddUser);
