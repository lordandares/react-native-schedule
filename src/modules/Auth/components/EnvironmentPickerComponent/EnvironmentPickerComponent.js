/* eslint-disable no-irregular-whitespace */
import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import type { EnvironmentPickerComponentProps } from './EnvironmentPickerComponent.types';

/**
 * This component is more complex due to React Native Pickers only firing occasionally... ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻
 * See https://github.com/facebook/react-native/issues/15556#issuecomment-360181487 for more details
 * If this is fixed in the future, we can revert to an older version of this component from source control
 */
class EnvironmentPickerComponent extends PureComponent<EnvironmentPickerComponentProps> {
  constructor(props: EnvironmentPickerComponentProps) {
    super(props);
    this.state = { value: props.environment };
  }

  componentDidUpdate() {
    if (this.props.environment !== this.state.value) {
      this.props.onEnvironmentChange(this.state.value);
    }
  }

  onValueChange = (value: string) => {
    if (value) this.setState({ value });
  };

  render() {
    return (
      <Picker
        selectedValue={this.state.value}
        onValueChange={this.onValueChange}
      >
        <Picker.Item label="Dev" value="dev" />
        <Picker.Item label="Test" value="test" />
        <Picker.Item label="Prod" value="prod" />
      </Picker>
    );
  }
}

export default EnvironmentPickerComponent;
