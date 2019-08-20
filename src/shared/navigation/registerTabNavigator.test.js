import { registerTabNavigator } from './registerTabNavigator';

describe('registerTabNavigator', () => {
  const navigator = {
    events: [],
    addOnNavigatorEvent(event: Function): void {
      this.events.push(event);
    },
  };

  const reselectTab = jest.fn();
  const selectTab = jest.fn();

  registerTabNavigator({
    navigator,
    setNavigator: jest.fn(),
    selectTab,
    reselectTab,
  });

  it('should reselectTab if tab is reselected', () => {
    navigator.events[0]({ id: 'bottomTabReselected' });
    expect(reselectTab).toHaveBeenCalled();
  });

  it('should selectTab if tab is selected', () => {
    navigator.events[0]({ id: 'bottomTabSelected' });
    expect(selectTab).toHaveBeenCalled();
  });

  it('should pass id though from event', () => {
    navigator.events[0]({ id: 'bottomTabSelected', selectedTabIndex: 7 });
    expect(selectTab).toHaveBeenCalledWith(7);
  });
});
