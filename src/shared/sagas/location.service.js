export interface ILocationService {
  getUserLocation(): Promise;
}

export default class LocationService implements ILocationService {
  getUserLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      location => resolve(location),
      error => reject(error),
      // Do not set maximumAge as it causes problems getting the location
      // Ref: https://github.com/facebook/react-native/issues/12996
      { enableHighAccuracy: true },
    );
  });
}
