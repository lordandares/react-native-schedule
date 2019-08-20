import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import HTMLView from 'react-native-htmlview';

import LegalPageContainerStyles from './LegalPageContainer.styles';
import { getAppBarStyle } from '../../shared/navigation/getAppBarStyle';
import theme from '../../shared/theme';
import LegalContent from './LegalContent';
import { withStyles } from '../../shared/withStyles';

export class LegalPageComponent extends React.Component {
  static options = getAppBarStyle(theme)

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { contentId } = this.props;
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        title: {
          text: LegalContent[contentId].navTitle,
        },
      },
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'willDisappear') {
      Navigation.popToRoot(this.props.componentId);
    }
  }

  render() {
    const { styles, contentId } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} >
          <View style={styles.contentContainer} >
            <Text style={styles.textTitle}>
              {LegalContent[contentId].title}
            </Text>
            <HTMLView style={styles.textContent} value={LegalContent[contentId].content} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withStyles(LegalPageContainerStyles, { themePropName: 'withStylesTheme' })(LegalPageComponent);
