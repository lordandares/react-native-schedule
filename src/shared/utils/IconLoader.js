// @flow
import { Platform } from 'react-native';

import CustomIcon from '../customIcons/NextIcons';
import theme from '../theme';

const tabBarIconSize: number = Platform.OS === 'android' ? 24 : 25;
const PRE_LOAD_ICON_IMAGES_NAME = [
  { name: 'dashboard', size: tabBarIconSize },
  { name: 'sites', size: tabBarIconSize },
  { name: 'schedule', size: tabBarIconSize },
  { name: 'work', size: tabBarIconSize },
  { name: 'close', size: tabBarIconSize },
  { name: 'settings', size: tabBarIconSize },
  { name: 'add', size: tabBarIconSize },
];

export default class IconLoader {
  static instance: any = null;
  calendarIcons: any[] = [];
  generalIcons: any[] = [];

  constructor() {
    if (IconLoader.instance) {
      return IconLoader.instance;
    }
    IconLoader.instance = this;
  }

  loadImageIcons = async () => {
    await this.loadCalendarIcons();
    const promiseArray: Promise[] = PRE_LOAD_ICON_IMAGES_NAME.map(iconPops =>
      CustomIcon.getImageSource(iconPops.name, iconPops.size, iconPops.color));
    this.generalIcons = await Promise.all(promiseArray);
  };

  loadCalendarIcons = async () => {
    const promiseArray = [];
    for (let i = 1; i < 32; i += 1) {
      promiseArray.push(CustomIcon.getImageSource(`calendar-${i}`, 24, theme.header.buttonColor));
    }
    const icons = await Promise.all(promiseArray);
    this.calendarIcons = [{}, ...icons];
  };

  getCalendarIcon = (day: number) => {
    if (this.calendarIcons.length === 0) {
      throw new Error('error: icon list is not loaded');
    }
    if (day < 1 || day > 31) {
      throw new Error('error: day has to be > 0 and < 31');
    }

    return this.calendarIcons[day];
  };

  getIcon = (iconName: string) => {
    const iconIndex = PRE_LOAD_ICON_IMAGES_NAME.findIndex(iconProps => iconProps.name === iconName);
    if (iconIndex < 0) {
      throw new Error(`error: icon name "${iconName}" not found`);
    }
    return this.generalIcons[iconIndex];
  };
}
