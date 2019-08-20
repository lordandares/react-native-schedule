import {
  Platform,
  Dimensions,
} from 'react-native';

export const DEFAULT_HEIGHT_TAB = Platform.OS === 'ios' ? 64 : 85;
export const DEFAULT_HEIGHT_NAV_BAR = Platform.OS === 'ios' ? 49 : 95;

export const getContainerMaxHeight = (
  heightTab: number = DEFAULT_HEIGHT_TAB,
  heightNavBar: number = DEFAULT_HEIGHT_NAV_BAR,
): number => (
  Dimensions.get('screen').height - heightTab - heightNavBar
);

export const getContainerWidth = (): number => (
  Dimensions.get('screen').width
);
