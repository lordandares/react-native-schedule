// @flow
import React, { PureComponent } from 'react';
import { View, TextInput } from 'react-native';

import { withStyles } from '../../withStyles';
import FormInputStyles from './FormInput.styles';
import theme from '../../theme';

/**
 * @deprecated Use EditText Instead
 */
class FormInput extends PureComponent {
  static defaultProps = {
    focus: false,
    inputProps: {},
  }

  componentWillReceiveProps() {
    if (this.isFocused()) this.focus();
  }

  getError = () : string => {
    const { fieldName, parentComp } = this.props;
    return parentComp ? parentComp.getError(fieldName) : '';
  }

  setField = (text : string) => {
    const { fieldName, parentComp } = this.props;
    if (parentComp) parentComp.setField(fieldName, text);
  }

  isFocused = () : boolean => {
    const { fieldName, parentComp } = this.props;
    return parentComp ? parentComp.isFocused(fieldName) : false;
  }

  focus = () => this.textInput.focus();

  render() {
    const { containerStyle, styles, inputProps } = this.props;
    const error = this.getError();
    const style = !error ? styles.input : [styles.input, styles.inputError];

    const placeholderColor = !error ? theme.palette.grey[500] : theme.palette.error.main;
    // const errorText = error || ' ';

    return (
      <View style={containerStyle || styles.container}>
        <TextInput
          {...inputProps}
          placeholderTextColor={placeholderColor}
          underlineColorAndroid="transparent"
          style={style}
          onChangeText={text => this.setField(text)}
          ref={(input) => { this.textInput = input; }}
        />
        {/* <Text style={[errorTextStyle]}>{errorText}</Text> */}
      </View>
    );
  }
}
export default withStyles(FormInputStyles)(FormInput);
