// @flow
import React, { PureComponent } from 'react';
import { TextInput, Text, Platform, View } from 'react-native';
import EditTextStyles from './EditText.styles';
import { withStyles } from '../../withStyles';
import theme from '../../theme';
import type { EditTextProps } from './EditText.types';

class EditText extends PureComponent<EditTextProps> {
  onBlur = e => this.props.onBlur && this.props.onBlur(e.nativeEvent.text);

  onChange = e => this.props.onChange && this.props.onChange(e);

  render() {
    let inputStyle = Platform.OS === 'ios' ? this.props.styles.iosInput : this.props.styles.input;
    if (this.props.disabled) {
      inputStyle = Object.assign({}, inputStyle, this.props.styles.disabledInput);
    }

    return (
      <View>
        {this.props.title && <Text style={this.props.styles.title}>{this.props.title}</Text>}
        <TextInput
          multiline={this.props.multiline}
          placeholderTextColor={theme.palette.grey[500]}
          underlineColorAndroid="transparent"
          style={inputStyle}
          onChangeText={this.onChange}
          onBlur={this.onBlur}
          defaultValue={this.props.defaultValue}
          editable={!this.props.disabled}
        />
      </View>
    );
  }
}

export default withStyles(EditTextStyles)(EditText);
