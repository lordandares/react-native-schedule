// @flow
import AppCenter from 'appcenter';
import Push from 'appcenter-push';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { persistStore } from 'redux-persist';
import configureStore from './store';
import './shared/config/ReactotronConfig';
import { registerScreens } from './registerScreens';
import { STARTUP_ACTION } from './shared/redux/startup';
import './shared/i18n/i18next';


const THIS = this;

const store = configureStore();
export const storeDispatch = store.dispatch;
export const storeGetState = store.getState;

export default function () {
  THIS.state = {
    wrapperSdkVersion: AppCenter.getSdkVersion(),
  };

  Push.setListener({
    onPushNotificationReceived(pushNotification) {
      let { message } = pushNotification;

      if (message === null || message === undefined) {
        // Android messages received in the background don't include a message.
        // On Android, that fact can be used to
        // check if the message was received in the background or foreground.
        // For iOS the message is always present.
        // title = 'Android background';
        // message = '<empty>';
      }

      // Any custom name/value pairs added in the portal are in customProperties
      if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
        message += `\nCustom properties:\n${JSON.stringify(pushNotification.customProperties)}`;
      }

      // Removed to avoid display this message. Decided to keep it commented out instead of removed
      // just in case we need to restore it quickly.
      // if (AppState.currentState === 'active') {
      //   Alert.alert(title, message);
      // }
      // else {
      //   // Sometimes the push callback is received shortly
      //   // before the app is fully active in the foreground.
      //   // In this case you'll want to save off the notification
      //   // info and wait until the app is fully shown
      //   // in the foreground before displaying any UI.
      //   // You could use AppState.addEventListener to be notified
      //   // when the app is fully in the foreground.

      //   // Showing an alert when not in the "active" state seems to work on iOS;
      //   // for Android, we show a toast
      //   // message instead
      //   if (Platform.OS === 'android') {
      //     ToastAndroid.show(`Notification while inactive:\n${message}`, ToastAndroid.LONG);
      //   }
      //   Alert.alert(title, message);
      // }
    },
  });
  registerScreens(store, Provider);
  Navigation.events().registerAppLaunchedListener(() => {
    persistStore(store, null, () => {
      store.dispatch({ type: STARTUP_ACTION });
    });
  });
}
