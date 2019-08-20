import { selectIsTestFlagOn } from './featureflags.selectors';

describe('feature flag selectors', () => {
  describe('selectIsTestFlagOn', () => {
    it('should select test-flag true', () => {
      const featureFlagState: any = {
        featureFlags: {
          flags: { 'test-flag': true },
        },
      };
      const result: boolean = selectIsTestFlagOn(featureFlagState);
      expect(result)
        .toBeTruthy();
    });

    it('should select test-flag false', () => {
      const featureFlagState: any = {
        featureFlags: {
          flags: { 'test-flag': false },
        },
      };
      const result: boolean = selectIsTestFlagOn(featureFlagState);
      expect(result)
        .toBeFalsy();
    });
  });
});
