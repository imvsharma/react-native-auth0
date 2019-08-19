import React, {Component} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import Auth0 from 'react-native-auth0';
import Config from "react-native-config";
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";

const Auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
})

export default class Login extends Component {
    
}