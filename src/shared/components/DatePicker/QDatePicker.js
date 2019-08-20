// @flow
import React from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { withNamespaces } from 'react-i18next';
import moment from 'moment-timezone';

import theme from '../../theme';
import COMMON from '../../constants/common';
import CustomIcon from '../../customIcons/NextIcons';
import Touchable from '../../components/Touchable/Touchable';
import { withStyles } from '../../withStyles';
import { QDatePickerStyles } from './QDatePicker.styles';
import type { IQDatePickerProps } from './QDatePicker.types';

class qDatePicker extends React.PureComponent<IQDatePickerProps> {
  render = () => {
    const {
      dateFormat,
      shortDateFormat,
      dueDate,
      onDateChange,
      t: translate,
      styles: {
        datePickerHeader, datePicker, dateInput, dateText, dateTouchBody, dateIconStyle,
      },
    } = this.props;
    return (
      <View>
        <Text style={datePickerHeader}>{translate(COMMON.DUE_DATE).toUpperCase()}</Text>
        <DatePicker
          cancelBtnText={translate(COMMON.CANCEL)}
          confirmBtnText={translate(COMMON.CONFIRM)}
          customStyles={{ dateInput, dateText, dateTouchBody }}
          date={dueDate}
          getDateStr={rawdate => moment(rawdate).format(`ddd, ${shortDateFormat}`)}
          format={dateFormat}
          iconComponent={
            <View style={dateIconStyle}>
              <CustomIcon name="schedule" size={theme.size.unit16} color={theme.palette.grey.A200} />
            </View>
          }
          mode="date"
          onDateChange={onDateChange}
          style={datePicker}
          TouchableComponent={Touchable}
          locale={moment.locale()}
        />
      </View>
    );
  };
}

export const QDatePicker = withStyles(QDatePickerStyles)(withNamespaces()(qDatePicker));
