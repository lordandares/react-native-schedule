// @flow
import type { registerNavigationProps } from './navigation.types';


export function registerTabNavigator(props: registerNavigationProps): void {
  props.setNavigator(props.navigator);

  props.navigator.addOnNavigatorEvent((event) => {
    if (event.id === 'bottomTabReselected') {
      props.reselectTab();
    }
    if (event.id === 'bottomTabSelected') {
      props.selectTab(event.selectedTabIndex);
    }
  });
}
