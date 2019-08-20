// @flow
import React from 'react';
import { View, Text, Button, Image, WebView, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import AppCenter from 'appcenter';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import loginComponentStyles from './LoginComponentRopc.styles';
import { withStyles } from '../../../../shared/withStyles';
import type { Props, State } from './LoginComponentRopc.types';
import EnvironmentPickerComponent from '../EnvironmentPickerComponent/EnvironmentPickerComponent';
import FormInput from '../../../../shared/components/FormInput/FormInput';
import images from '../../../../images';
import IconLoader from '../../../../shared/utils/IconLoader';
import { SCREEN_LEGAL_PAGE, SCREEN_LOADING } from '../../../../shared/constants/screens';
import theme from '../../../../shared/theme';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import AnalyticsEvents from '../../../../shared/constants/analyticsEvents';
import AUTH_MODULE from '../../constants/Auth';

let deviceId: string;


async function getDeviceId() {
  deviceId = await AppCenter.getInstallId();
}

export const USERNAME = 'username';
export const PASSWORD = 'password';
export const SETTINGS_BUTTON_ID = 'settings-cog';

class LoginComponent extends React.Component<Props, State> {
  static options = getAppBarStyle(theme)
  static isShowingOverlay = false;
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      showEnvironmentSelector: false,
      showForgotPasswordWebView: false,

      fieldFocused: '',
      touched: [],
      errors: {},

      // Form fields
      [USERNAME]: __DEV__ ? '' : '', // Insert your username for faster logins
      [PASSWORD]: __DEV__ ? '' : '', // -"- password
    };

    getDeviceId();
    this.iconLoader = new IconLoader();
  }


  componentDidMount() {
    const { userLoggedIn, componentId } = this.props;
    if (userLoggedIn) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          rightButtons: [
            {
              id: SETTINGS_BUTTON_ID,
              color: LoginComponent.options.topBar.rightButtons[0].color,
              icon: this.iconLoader.getIcon('settings'),
            },
          ],
        },
      });
    }
  }


  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    if ((loading !== nextProps.loading)) {
      if (nextProps.loading) {
        nextProps.showOverlay(SCREEN_LOADING);
      } else {
        nextProps.dismissOverlay(SCREEN_LOADING);
      }
    }
  }

  onEnvironmentChange = changedValue => this.props.switchEnvironment(changedValue);

  //
  // FORM HANDLING
  //
  setField = (fieldName: string, fieldValue: string) => {
    const { touched } = this.state;
    if (touched.indexOf(fieldName) === -1) touched.push(fieldName);
    this.setState({ [fieldName]: fieldValue, touched, fieldFocused: '' }, () => this.formIsValid(false));
  };
  getError = (fieldName: string) => this.state.errors[fieldName]
  navigationButtonPressed(e) {
    if (e.buttonId === SETTINGS_BUTTON_ID) {
      this.props.trackEvent(AnalyticsEvents.PRESS_SETTINGS_COG);
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          right: {
            visible: true,
            enabled: false,
          },
        },
      });
    } else if (e.type === 'DeepLink' && e.link === SCREEN_LEGAL_PAGE) {
      Navigation.push(this.props.componentId, {
        component: {
          name: SCREEN_LEGAL_PAGE,
          passProps: { contentId: e.payload },
        },
      });
    }
  }
  focusTo = (fieldName: string) => { this.setState({ fieldFocused: fieldName }); }
  isFocused = (fieldName: string) => (this.state.fieldFocused === fieldName)
  // VALIDATION PROCESSOR
  formIsValid = (isSubmit: boolean = false): boolean => {
    const { state } = this;
    const { touched } = state;
    const validationErrors = {};

    // Validated fields
    validationErrors[USERNAME] = (state[USERNAME]) ? null : 'err';
    validationErrors[PASSWORD] = (state[PASSWORD]) ? null : 'err';

    if (isSubmit) {
      this.setState({
        touched: [PASSWORD, USERNAME],
        errors: validationErrors,
      });
    } else {
      const errors = _.pick(validationErrors, touched);
      this.setState({ errors });
    }
    const isValid = _.isEmpty(_.reject(validationErrors, _.isNil));
    return isValid;
  };

  toggleEnvironmentPicker = () => this.setState({ showEnvironmentSelector: !this.state.showEnvironmentSelector });

  handleLogin = () => {
    const { login, preventNoSubscriptionLoginFlag } = this.props;
    if (this.formIsValid(true)) {
      login(this.state[USERNAME], this.state[PASSWORD], preventNoSubscriptionLoginFlag);
    }
  };

  toggleForgotPasswordWebView = () => {
    this.setState({ showForgotPasswordWebView: !this.state.showForgotPasswordWebView });
  };


  renderLoggedOut = () => {
    const { props } = this;
    const { styles, authErrorMessage, t: translate } = props;

    return [
      <View key={1}>
        <Text style={styles.welcomeText} onLongPress={this.toggleEnvironmentPicker}>
          {translate(AUTH_MODULE.WELCOME)}
        </Text>

        {Boolean(authErrorMessage) && <Text id="authErrorMessage" style={styles.warningText}>{authErrorMessage}</Text>}
        <View style={styles.padding20} />
        <FormInput
          id="username"
          fieldName={USERNAME}
          parentComp={this}
          inputProps={{
            autoCorrect: false,
            placeholder: translate(AUTH_MODULE.EMAIL),
            onSubmitEditing: () => this.focusTo(PASSWORD),
            defaultValue: this.state[USERNAME],
          }}
        />
        <View style={styles.padding4} />
        <FormInput
          id="password"
          fieldName={PASSWORD}
          parentComp={this}
          inputProps={{
            placeholder: translate(AUTH_MODULE.PASSWORD),
            secureTextEntry: true,
            returnKeyType: 'go',
            onSubmitEditing: this.handleLogin,
            defaultValue: this.state[PASSWORD],
          }}
        />
        <View style={styles.padding20} />
        <TouchableOpacity
          id="loginButton"
          onPress={this.handleLogin}
          style={styles.loginButton}
        >
          <Text id="loginButtonText" style={styles.loginButtonText}>{translate(AUTH_MODULE.SIGN_IN)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          id="forgotPasswordButton"
          onPress={this.toggleForgotPasswordWebView}
          style={styles.forgotPasswordButtonContainer}
        >
          <Text id="forgotPasswordButtonText" style={styles.forgotPasswordButtonText}>
            {translate(AUTH_MODULE.FORGOT_PASSWORD)}
          </Text>
        </TouchableOpacity>
        {this.renderEnvPicker()}
      </View>,
      <View key={2} />,
      <View key={3} />,
    ];
  };

  renderLoggedIn = () => {
    const {
      styles, userLoggedIn, userInManagement, environment, t: translate,
    } = this.props;

    return [
      <Text style={styles.welcomeText} key={1} onLongPress={this.toggleEnvironmentPicker}>
        {translate(AUTH_MODULE.WELCOME)}
        {userLoggedIn && userInManagement && `\n${userInManagement}`}
      </Text>,
      this.renderEnvPicker(environment),
      <View key={3} style={styles.logoutButtonWrap}>
        <Button
          id="logoutButton"
          title={translate(AUTH_MODULE.LOG_OUT)}
          onPress={this.props.logout}
          color={theme.palette.login.buttonBg}
        />
      </View>,
    ];
  };

  renderEnvPicker = () =>
    (this.state.showEnvironmentSelector ? (
      <View key={10}>
        <EnvironmentPickerComponent
          id="environmentPicker"
          environment={this.props.environment}
          onEnvironmentChange={this.onEnvironmentChange}
        />
        <Text>Push Notification Device ID:</Text>
        <Text>{deviceId}</Text>
      </View>
    ) : (
      <View key={10} />
    ));


  render() {
    const { showForgotPasswordWebView } = this.state;
    const {
      userLoggedIn, styles, testFlag, environment,
      t: translate,
    } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          contentContainerStyle={styles.contentContainer}
          extraHeight={50}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={images.logoLogin} style={styles.logoImage} />
          {userLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()}
        </KeyboardAwareScrollView>

        {testFlag && <Image id="qbot" source={images.qbot} style={styles.testIndicator} />}

        {showForgotPasswordWebView && (
          <Modal
            id="forgotPasswordWebView"
            visible
            animationType="slide"
            onRequestClose={this.toggleForgotPasswordWebView}
          >
            <SafeAreaView style={styles.forgotPasswordWebView}>
              <View style={styles.forgotPasswordWebViewCloseButtonContainer}>
                <TouchableOpacity
                  id="closeForgotPasswordButton"
                  onPress={this.toggleForgotPasswordWebView}
                >
                  <Text id="closeForgotPasswordButtonText" style={{ color: theme.palette.common.white }}>
                    {translate(AUTH_MODULE.CLOSE)}
                  </Text>
                </TouchableOpacity>
              </View>
              <WebView source={{
                uri: `https://${environment === 'prod' ? 'q' :
                `q-${environment}`}.teamsoftware.com/forgot-password/`,
              }}
              />
            </SafeAreaView>
          </Modal>
        )}
      </View>
    );
  }
}

export default withStyles(loginComponentStyles)(withNamespaces()(LoginComponent));
