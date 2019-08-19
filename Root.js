import React from 'react';
import { createStackNavigator } from 'react-navigation';


const Stack = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Account: {
        scren: AccountScreen
    },
    initialRouteName: "Login"
});

export default Stack;