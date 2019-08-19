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

const auth0 = new Auth0({ domain: "reactauth0auth.auth0.com" , clientId: 'EILl2eda7XSQA1CMucucxlQeUUiZl3Q9' });

console.log('auth0', auth0);

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
                auth0.auth.userInfo({token: accessToken}).then(data => {this.gotoAccount(data);}).catch(err => {
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

    render() {
        return (
          <View style={styles.container}>
            <ActivityIndicator
              size="large"
              color="#05a5d1"
              animating={!this.state.hasInitialized}
            />
            {this.state.hasInitialized && (
              <Button onPress={this.login} title="Login" color={buttonStyle} />
            )}
          </View>
        );
      }

    login = () => {
      auth0.webAuth.authorize({
        scope: "openid offline_access profile email",
        audience: "https://reactauth0auth.auth0.com/userinfo",
        device: DeviceInfo.getUniqueID(),
        prompt: 'login'
      }).then(res => {
          SInfo.setItem("accessToken", res.accessToken, {});
          SInfo.setItem("refreshToken", res.refreshToken, {});
          auth0.auth.userInfo({token: res.accessToken}).then(data => {
            this.gotoAccount(data);
          }).catch(err => {
            console.log("error occurred while trying to get user details: ", err);
          })
      }).catch(err => {
        console.log("error occurred while trying to authenticate: ", err);
      })
    }

    gotoAccount = data => {
      this.setState({
        hasInitialized: true
      })

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Account",
            params: {
              name: data.name,
              picture: data.picture
            }
          })
        ]
      })

      this.props.navigation.dispatch(resetAction);
    }
}