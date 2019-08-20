// @flow
import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import AppCenter from 'appcenter';
import { Navigation } from 'react-native-navigation';

import loginComponentStyles from './LoginComponent.styles';
import { withStyles } from '../../../../shared/withStyles';
import type { Props, State } from './LoginComponent.types';
import EnvironmentPickerComponent from '../EnvironmentPickerComponent/EnvironmentPickerComponent';
import { SCREEN_LOADING } from '../../../../shared/constants/screens';
import getLoadingLayout from '../../../../shared/utils/getLoadingLayout';

let deviceId: string;

async function getDeviceId() {
  deviceId = await AppCenter.getInstallId();
}

class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showEnvironmentSelector: false,
    };
    getDeviceId();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    if ((loading !== nextProps.loading)) {
      if (nextProps.loading) {
        Navigation.showOverlay(getLoadingLayout(SCREEN_LOADING));
      } else {
        Navigation.dismissOverlay(SCREEN_LOADING);
      }
    }
  }

  onEnvironmentChange = (changedValue) => {
    this.props.switchEnvironment(changedValue);
  };

  toggleEnvironmentPicker = () => {
    this.setState({
      showEnvironmentSelector: !this.state.showEnvironmentSelector,
    });
  };

  render() {
    const {
      userLoggedIn,
      authErrorMessage,
      userInManagement,
    } = this.props;

    return (
      <ScrollView>
        <Text
          style={this.props.styles.text}
          onLongPress={this.toggleEnvironmentPicker}
        >
          AUTHENTICATION!
        </Text>

        <Text style={this.props.styles.text}>
          {(userLoggedIn && userInManagement) && `Welcome: ${userInManagement}`}
        </Text>
        <Text style={this.props.styles.warningText}>{`${authErrorMessage} `}</Text>
        {!userLoggedIn && <Button title="login" onPress={this.props.login} />}
        {userLoggedIn && (
          <Button
            title="logout"
            onPress={this.props.logout}
            disabled={!userLoggedIn}
          />
        )}
        {this.state.showEnvironmentSelector && (
          <View>
            <EnvironmentPickerComponent
              id="environmentPicker"
              environment={this.props.environment}
              onEnvironmentChange={this.onEnvironmentChange}
            />
            <Text>Push Notification Device Id:</Text>
            <Text>{deviceId}</Text>
          </View>
        )}

      </ScrollView>
    );
  }
}

export default withStyles(loginComponentStyles)(LoginComponent);
