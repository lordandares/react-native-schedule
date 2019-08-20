import React from 'react';
import { shallow } from 'enzyme';
import InfinityScroll from './InfinityScroll';

describe('Infinity Sroll', () => {
  it('should shallow render InfinityScroll', () => {
    shallow(<InfinityScroll />);
  });

  it('should not call the reachBottom function when the bottom is reached and action condition is falsy', () => {
    const mockCallback = jest.fn();

    shallow(<InfinityScroll
      reachBottomCallback={mockCallback}
      infiniteScrollDayPosition={31}
      actionValidation={false}
    />);

    expect(mockCallback).not.toHaveBeenCalled();
  });

  it('should call the reachBottom function when the bottom is reached and action condition is truthy', () => {
    const mockCallback = jest.fn();
    const nativeEventMock = {
      nativeEvent: {
        layoutMeasurement: { height: 2 },
        contentOffset: { y: 2 },
        contentSize: { height: 1 },
      },
    };

    const infinityScrollWrapper = shallow(<InfinityScroll
      reachBottomCallback={mockCallback}
      infiniteScrollDayPosition={31}
      actionValidation
    />).dive();

    infinityScrollWrapper.instance().props.onScroll(nativeEventMock);
    expect(mockCallback).toHaveBeenCalled();
  });
});
