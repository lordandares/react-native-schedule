import type { IFeatureFlagClient } from '../featureflags.types';
import LaunchDarklyClient from './LaunchDarklyClient';
import LaunchDarkly from '../../../../../libs/js/next-launch-darkly/lib';

jest.mock('next-launch-darkly/lib/index', () => ({
  configure: jest.fn(),
  addFeatureFlagChangeListener: jest.fn(),
  allFlags: callback => callback('{"test-flag": true}'),
  identify: jest.fn(),
  setFlags: jest.fn(),
}));

describe('launchDarklyClient', () => {
  const launchDarklyClient: IFeatureFlagClient = new LaunchDarklyClient('key', ['test-flag']);
  describe('subscribeToChanges', () => {
    it('should add subscribers', () => {
      const callback = jest.fn();
      launchDarklyClient.subscribeToChanges(callback);
      expect(LaunchDarklyClient.subscribers)
        .toContain(callback);
    });
    it('callbacks should fire whenever flags are retrieved', () => {
      const callback = jest.fn(() => {
      });
      launchDarklyClient.subscribeToChanges(callback);
      LaunchDarklyClient.getFlags();
      expect(callback)
        .toHaveBeenCalled();
    });
  });
  describe('identifyUser', () => {
    it('should use an anonymous user if one is not supplied', () => {
      launchDarklyClient.identifyUser(null);
      const anonUser = {
        key: 'static-mobile-user',
        isAnonymous: true,
        custom: {
          platform: 'ios',
        },
      };
      expect(LaunchDarkly.identify)
        .toHaveBeenCalledWith(anonUser);
    });
    it('should use a real user if one is supplied', () => {
      const anonUser = {
        key: 'static-mobile-user',
        isAnonymous: true,
      };
      launchDarklyClient.identifyUser(anonUser);
      expect(LaunchDarkly.identify)
        .toHaveBeenCalledWith(anonUser);
    });
  });
});
