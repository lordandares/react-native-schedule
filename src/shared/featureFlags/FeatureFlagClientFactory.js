/* eslint-disable class-methods-use-this */
// @flow

import { IFeatureFlagClient, IFeatureFlagClientFactory } from './featureflags.types';
import LaunchDarklyClient from './LaunchDarkly/LaunchDarklyClient';
import flagList from './flagList';

class FeatureFlagClientFactory implements IFeatureFlagClientFactory {
  static featureFlagClient: IFeatureFlagClient;

  getFeatureFlagClient(environmentKey: string): IFeatureFlagClient {
    if (FeatureFlagClientFactory.featureFlagClient) {
      return FeatureFlagClientFactory.featureFlagClient;
    }

    FeatureFlagClientFactory.featureFlagClient =
      new LaunchDarklyClient(environmentKey, flagList);
    return FeatureFlagClientFactory.featureFlagClient;
  }
}

export default FeatureFlagClientFactory;
