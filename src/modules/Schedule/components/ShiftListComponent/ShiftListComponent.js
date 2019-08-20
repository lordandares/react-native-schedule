import React, { Component } from 'react';
import { FlatList } from 'react-native';

import ShiftListComponentStyles from './ShiftListComponent.styles';
import ShiftListItemComponent from '../../../../shared/components/ShiftListItem/ShiftListItemComponent';
import type { Shift } from '../../../../shared/types/schedule.types';
import FlatListItemSeparator from '../../../../shared/components/FlatListItemSeparator/FlatListItemSeparatorComponent';
import { withStyles } from '../../../../shared/withStyles';
import { ShiftListComponentProps } from './ShiftListComponent.types';

class ShiftListComponent extends Component<ShiftListComponentProps> {
  static DoShiftsExist(shifts: Shift[]): boolean {
    return shifts && shifts.length > 0;
  }

  onPressItem = (shift: Shift) => {
    this.props.onShiftSelected(shift);
  };

  render() {
    const hasShifts: boolean = ShiftListComponent.DoShiftsExist(this.props.shifts);

    if (!hasShifts) {
      return null;
    }

    return (
      <FlatList
        style={this.props.styles.scrollContainer}
        data={this.props.shifts}
        renderItem={(shiftWrapper: Shift) => (
          <ShiftListItemComponent
            shift={shiftWrapper.item}
            clockIn={this.props.clockIn}
            clockOut={this.props.clockOut}
            onPressItem={this.onPressItem}
          />
        )}
        keyExtractor={(item: Shift) => item.id}
        ItemSeparatorComponent={FlatListItemSeparator}
        refreshControl={this.props.refreshControl}
      />
    );
  }
}

export default withStyles(ShiftListComponentStyles, { themePropName: 'withStylesTheme' })(ShiftListComponent);
