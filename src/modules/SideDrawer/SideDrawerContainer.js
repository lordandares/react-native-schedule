import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import SideDrawerStyles from './SideDrawerContainer.styles';
import NextIcons from '../../shared/customIcons/NextIcons';
import LegalContent, {
  LEGAL_TERMS_OF_SERVICE,
  LEGAL_SECURITY_POLICY,
  LEGAL_PRIVACY_STATEMENT,
} from '../LegalPage/LegalContent';
import { IS_ANDROID } from '../../shared/utils/platform';
import { SCREEN_LEGAL_PAGE } from '../../shared/constants/screens';
import { APP_TABS } from '../../shared/constants/tabs';
import { withStyles } from '../../shared/withStyles';
import SIDE_DRAWER from './constants/SideDrawer';

export class SideDrawerComponent extends React.Component {
  handleNav = contentId => () => {
    this.handleClose();
    Navigation.push(APP_TABS.HOME.id, {
      component: {
        name: SCREEN_LEGAL_PAGE,
        passProps: { contentId },
      },
    });
  }

  handleClose = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        right: {
          visible: false,
          enabled: false,
        },
      },
    });
  }

  renderLink = (contentId) => {
    const { styles } = this.props;
    return (
      <TouchableOpacity id={contentId} onPress={this.handleNav(contentId)} style={styles.menuButton}>
        <Text style={styles.menuText}>{LegalContent[contentId].navTitle}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { styles, t: translate } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer} scrollEnabled={IS_ANDROID}>
          <TouchableOpacity id="closeSideDrawer" onPress={this.handleClose} style={styles.closeButton} >
            <NextIcons name="icon-x-close" style={styles.closeButtonIcon} size={16} />
          </TouchableOpacity>
          <View style={styles.menuContainer} >
            {this.renderLink(LEGAL_TERMS_OF_SERVICE)}
            {this.renderLink(LEGAL_SECURITY_POLICY)}
            {this.renderLink(LEGAL_PRIVACY_STATEMENT)}
          </View>

          <View style={styles.footerContainer}>
            <Text id="copyright" style={styles.footerText}>{translate(SIDE_DRAWER.COPYRIGHT)}</Text>
            <Text id="version" style={styles.footerText}>
              {translate(SIDE_DRAWER.VERSION)} {DeviceInfo.getVersion()}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect()(withStyles(SideDrawerStyles, {
  themePropName: 'withStylesTheme',
})(withNamespaces()(SideDrawerComponent)));
