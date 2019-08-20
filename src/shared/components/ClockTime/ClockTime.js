import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment-timezone';

import ClockTimeStyles from './ClockTime.style';
import { getEventType } from '../../utils/clockInOut/clockInOutFormatter';
import { checkIndexIsOdd } from '../../utils/clockInOut/clockInOutHelpers';
import { withStyles } from '../../withStyles';

class ClockTime extends Component {
  getFormattedDate(eventTime) {
    return moment(eventTime)
      .tz(this.props.siteTimeZone)
      .format('hh:mm A');
  }

  render() {
    const {
      index, clockEvent, listStyles, styles, onDateChange,
    } = this.props;

    return (
      <View
        style={[
          listStyles.containerItem,
          checkIndexIsOdd(index) ? listStyles.separateItem : null,
        ]}
        key={`${clockEvent.eventType}-${index}`}
        className="clockEvent"
      >
        <Text style={listStyles.text}>
          {getEventType(clockEvent.eventType)}
        </Text>
        <DatePicker
          style={styles.picker}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              flex: 0,
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: 'auto',
            },
            btnText: {
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
            dateText: {
              fontSize: 16,
            },
            dateTouchBody: {
              flex: 0,
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: 'auto',
            },
          }}
          key={`${clockEvent.eventType}-${index}`}
          showIcon={false}
          date={this.getFormattedDate(this.props.clockEvent.eventTime)}
          mode="time"
          placeholder="select time"
          format="hh:mm A"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            onDateChange(date, clockEvent);
          }}
          locale={moment.locale()}
        />
      </View>
    );
  }
}

export default withStyles(ClockTimeStyles, {
  themePropName: 'withStylesTheme',
})(ClockTime);
