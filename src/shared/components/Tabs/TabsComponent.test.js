/* eslint-disable function-paren-newline */
import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';

import { TabsComponent } from './TabsComponent';

describe('TabsComponent', () => {
  const styles = {};
  const fakeTab = { label: 'yo' };
  it('should render a tab', () => {
    const container =
      shallow(
        <TabsComponent styles={styles}>
          <View id="yo" tab={fakeTab} />
          <View id="yo2" tab={fakeTab} />
        </TabsComponent>,
      );

    const tab = container.find('#yo');
    expect(tab).toHaveLength(1);
  });

  it('should render a tab with null children', () => {
    const container =
      shallow(
        <TabsComponent styles={styles}>
          <View id="yo" tab={fakeTab} />
          {null}
        </TabsComponent>,
      );

    const tab = container.find('#yo');
    expect(tab).toHaveLength(1);
  });
});
