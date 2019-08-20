/* eslint-disable class-methods-use-this */
// @flow

import { Platform } from 'react-native';
import LaunchDarkly from 'next-launch-darkly/lib/index';
import type { IFeatureFlagClient, FeatureFlagUser } from '../featureflags.types';

class LaunchDarklyClient implements IFeatureFlagClient {
  constructor(launchDarklyKey: string, flagList: string[]) {
    LaunchDarklyClient.flagList = flagList;
    // needed for ios allFlags call
    LaunchDarkly.setFlags(flagList);
    const user = this.getAnonymousLaunchDarklyUser();
    LaunchDarkly.configure(launchDarklyKey, user);
    this.subscribeToChangedFromNativeModule();
  }

  getAnonymousLaunchDarklyUser: { (): FeatureFlagUser } = () =>
    ({
      key: 'static-mobile-user',
      isAnonymous: true,
      custom: {
        platform: Platform.OS,
      },
    }: any);

  subscribeToChanges(callback: any) {
    LaunchDarklyClient.subscribers.push(callback);
    LaunchDarklyClient.getFlags();
  }

  identifyUser = (user: FeatureFlagUser): void => {
    let newUser;
    if (user) {
      newUser = user;
    } else {
      newUser = this.getAnonymousLaunchDarklyUser();
    }
    LaunchDarkly.identify(newUser);
    LaunchDarklyClient.getFlags();
  };

  static getFlags(): void {
    LaunchDarkly.allFlags((results) => {
      const flags = JSON.parse(results);
      LaunchDarklyClient.flagsChanged(flags);
    });
  }

  subscribeToChangedFromNativeModule() {
    LaunchDarklyClient.flagList.forEach((flag) => {
      LaunchDarkly.addFeatureFlagChangeListener(flag, () => LaunchDarklyClient.getFlags());
    });
  }

  static flagsChanged = (flags: any) => {
    LaunchDarklyClient.subscribers.map(callback => callback(flags));
  };

  static flagList: string[] = [];
    static subscribers: any = [];
}

export default LaunchDarklyClient;
