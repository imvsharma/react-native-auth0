import React, {Component} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import Auth0 from 'react-native-auth0';
import Config from "react-native-config";
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";
import {
    headerColorStyle,
    headerTextColorStyle,
    buttonStyle
  } from "../styles/colors";
import styles from "../styles/Login";

const Auth0 = new Auth0({
    domain: Config.AUTH0_DOMAIN,
    clientId: Config.AUTH0_CLIENT_ID
})

export default class Login extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Login",
            headerStyle: {
                backgroundColor: headerColorStyle
            },
            headerTitleStyle:{
                color: headerTextColorStyle
            }
        }
    }

    state = {
        hasInitialized: false
    };

    componentDidMount () {
        SInfo.getItem('accessToken', {}).then(accessToken => {
            if(accessToken) {
                Auth0.auth.userInfo({token: accessToken}).then(data => {this.gotoAccount(data);}).catch(err => {
                    SInfo.getItem("refreshToken", {}).then(refreshToken => { // get the refresh token from the secure storage
                        // request for a new access token using the refresh token 
                        auth0.auth
                          .refreshToken({ refreshToken: refreshToken })
                          .then(newAccessToken => {
                            SInfo.setItem("accessToken", newAccessToken);
                            RNRestart.Restart();
                          })
                          .catch(accessTokenErr => {
                            console.log("error getting new access token: ", accessTokenErr);
                          });
                      });
                })
            }else {
                this.setState({
                    hasInitialized: true
                })

                console.log("no access token");
            }
        })
    }
}