// @flow

export type FeatureFlagUser = {
  key: string,
  firstName?: string,
  lastName?: string,
  name?: string,
  email?: string,
  custom?: any,
  anonymous?: boolean,
};

export interface IFeatureFlagClient {
  identifyUser(user: FeatureFlagUser): void;
  subscribeToChanges(callback: (flags: any) => void): void;
}

export interface IFeatureFlagClientFactory {
  getFeatureFlagClient(clientKey: string): IFeatureFlagClient;
}
