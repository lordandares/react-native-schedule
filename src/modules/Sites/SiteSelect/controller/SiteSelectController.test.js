// @flow


import { SiteSelectController } from './SiteSelectController';

describe('SiteSelectController', () => {
  it('should call onPress when onSitePressed is called', () => {
    const mock = jest.fn();
    const controller = new SiteSelectController({}, mock);
    controller.onSitePressed();
    expect(mock).toHaveBeenCalled();
  });

  it('should set isEnabled to false when onPress is not provided', () => {
    const controller = new SiteSelectController({}, null);
    expect(controller.isEnabled).toBeFalsy();
  });

  it('should set isEnabled to true when onPress is provided', () => {
    const controller = new SiteSelectController({}, jest.fn());
    expect(controller.isEnabled).toBeTruthy();
  });
});
