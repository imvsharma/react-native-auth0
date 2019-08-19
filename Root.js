import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';
import Account from './src/screens/Account';

const Stack = createStackNavigator({
    Login: {
        screen: Login
    },
    Account: {
        screen: Account
    },
    initialRouteName: "Login"
});

const Root = createAppContainer(Stack)

export default Root;