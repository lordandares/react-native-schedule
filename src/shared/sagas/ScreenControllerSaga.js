// @flow
import { Saga, eventChannel } from 'redux-saga';
import type { User } from '@next/schedule/types/management.types';
import { call, select, put, take } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';
import { getIsUserLoggedIn } from '@next/auth/src/redux/Auth';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';

import { getAppBarStyle } from '../navigation/getAppBarStyle';
import theme from '../theme';
import { SCREEN_SIDE_DRAWER } from '../constants/screens';
import IconLoader from '../utils/IconLoader';
import { appNavigationActions, getCurrentScreen } from '../redux/appNavigation';
import { APP_TABS } from '../constants/tabs';

// todo - move to an icon factory
async function prepareIcons() {
  const iconLoader = new IconLoader();
  await iconLoader.loadImageIcons();
  return {
    home: iconLoader.getIcon('dashboard'),
    today: iconLoader.getIcon('schedule'),
    sites: iconLoader.getIcon('sites'),
    work: iconLoader.getIcon('work'),
  };
}

let icons;

export function* startApp(): Saga<User> {
  if (!icons) {
    icons = yield call(prepareIcons);
  }
  const navigatorStyle = getAppBarStyle(theme);

  if (yield select(getIsUserLoggedIn)) {
    // eslint-disable-next-line no-console
    console.tron.log('User has authenticated, restarting the app...', true);
    Navigation.setDefaultOptions({
      sideMenu: {
        right: { enabled: false },
      },
    });
    Navigation.setRoot({
      root: {
        sideMenu: {
          right: {
            component: { name: SCREEN_SIDE_DRAWER },
          },
          center: {
            bottomTabs: {
              children: [{
                stack: {
                  id: APP_TABS.HOME.id,
                  children: [{
                    component: {
                      name: APP_TABS.AUTH.id,
                      options: {
                        topBar: {
                          title: { text: APP_TABS.HOME.label },
                        },
                      },
                    },
                  }],
                  options: {
                    bottomTab: {
                      ...navigatorStyle.bottomTab,
                      icon: icons.home,
                      testID: 'HOME_TAB',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [{
                    component: {
                      name: APP_TABS.SCHEDULE.label,
                      options: {
                        topBar: {
                          title: { text: APP_TABS.SCHEDULE.id },
                        },
                      },
                    },
                  }],
                  options: {
                    topBar: {
                      title: { text: APP_TABS.SCHEDULE.id },
                    },
                    bottomTab: {
                      ...navigatorStyle.bottomTab,
                      icon: icons.today,
                      testID: 'SHIFTS_TAB',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [{
                    component: {
                      name: APP_TABS.SITES.id,
                      options: {
                        topBar: {
                          title: { text: APP_TABS.SITES.label },
                        },
                      },
                    },
                  }],
                  options: {
                    topBar: {
                      title: { text: APP_TABS.SITES.label },
                    },
                    bottomTab: {
                      ...navigatorStyle.bottomTab,
                      icon: icons.sites,
                      testID: 'SITES_TAB',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [{
                    component: {
                      name: APP_TABS.WORK.id,
                      options: {
                        topBar: {
                          title: { text: APP_TABS.WORK.label },
                        },
                      },
                    },
                  }],
                  options: {
                    topBar: {
                      title: { text: APP_TABS.WORK.label },
                    },
                    bottomTab: {
                      ...navigatorStyle.bottomTab,
                      icon: icons.work,
                      testID: 'WORK_TAB',
                    },
                  },
                },
              }],
              options: {
                bottomTabs: {
                  animation: false,
                  titleDisplayMode: 'alwaysHide',
                },
              },
            },
          },
        },
      },
    });
    Navigation.mergeOptions(SCREEN_SIDE_DRAWER, {
      sideMenu: {
        right: {
          enabled: false,
        },
      },
    });
  } else {
    Navigation.setRoot({ root: { component: { name: APP_TABS.AUTH.id } } });
  }
  yield call(SplashScreen.hide);
}

export function screenChangeChannel() {
  return eventChannel((emitter) => {
    Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
      emitter(componentName);
    });

    return () => { };
  });
}

export function* watchScreenChanges() {
  const channel = yield call(screenChangeChannel);

  try {
    while (true) {
      const screenName = yield take(channel);
      const actualScreenName = yield select(getCurrentScreen);
      if (screenName !== actualScreenName) {
        yield put(appNavigationActions.screenChanged(screenName));
      }
    }
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`watchScreenChanges failed: ${error.message}`, error));
  } finally {
    yield call(channel.close);
  }
}
