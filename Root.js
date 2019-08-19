import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';

const Stack = createStackNavigator({
    Login: {
        screen: Login
    },
    /* Account: {
        scren: AccountScreen
    }, */
    initialRouteName: "Login"
});

const Root = createAppContainer(Stack)

export default Root;