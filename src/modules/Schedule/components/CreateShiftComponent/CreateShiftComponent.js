import React from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import theme from '../../../../shared/theme';

class CreateShiftComponent extends React.Component {
  static options = getAppBarStyle(theme)
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  render() {
    return (
      <View>
        <Text>
                Blank Page.
        </Text>
      </View>
    );
  }
}

export default CreateShiftComponent;
