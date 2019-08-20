import FeatureFlagClientFactory from './FeatureFlagClientFactory';

jest.mock('next-launch-darkly/lib/index', () => ({
  configure: jest.fn(),
  addFeatureFlagChangeListener: jest.fn(),
  allFlags: callback => callback('{"test-flag": true}'),
  identify: jest.fn(),
  setFlags: jest.fn(),
}));

describe('featureFlagClientFactory', () => {
  it('should return a valid FeatureFlagClient', () => {
    const client = new FeatureFlagClientFactory().getFeatureFlagClient('key');
    expect(client).toBeTruthy();
  });
});
