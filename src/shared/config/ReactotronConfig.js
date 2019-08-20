/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import { ErrorHandlerTypes } from '@next/schedule/lib/redux/ErrorHandlerRedux';

if (__DEV__) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'NEXT' })
    .useReactNative()
    // .use(reduxPlugin({ onRestore: Immutable }))
    .use(reduxPlugin({
      except: [ErrorHandlerTypes.ADD_ERROR],
    }))
    .use(sagaPlugin())
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron; //eslint-disable-line
}
