import { Navigation } from 'react-native-navigation';
import _ from 'lodash';

import getLoadingLayout from '../utils/getLoadingLayout';
import { APP_TABS } from '../constants/tabs';

/* ------------- ACTION TYPES ------------------*/
const SELECT_TAB: string = 'SELECT_TAB';
const RESELECT_TAB: string = 'RESELECT_TAB';
const SET_NAVIGATOR: string = 'SET_NAVIGATOR';
const SET_OVERLAY_IN_USE: string = 'SET_OVERLAY_IN_USE';
const SCREEN_CHANGED = 'SCREEN_CHANGED';
const CHANGE_INNER_TAB = 'CHANGE_INNER_TAB';
const NAVIGATION_POP = 'NAVIGATION_POP';

export const selectTab = (selectedTabIndex: number) => (dispatch: Function, getState: Function) => {
  getState().appNavigation.navigator.popToRoot({
    animated: false,
  });
  dispatch({ type: SELECT_TAB, payload: selectedTabIndex });
};

export const reselectTab = () => (dispatch: Function, getState: Function) => {
  getState().appNavigation.navigator.popToRoot({
    animated: true,
    animationType: 'fade',
  });
  dispatch({ type: RESELECT_TAB });
};

export function setNavigator(navigator: any) {
  return {
    type: SET_NAVIGATOR,
    payload: navigator,
  };
}

export const navigationPop = componentId => (dispatch: Function) => {
  Navigation.pop(componentId);
  dispatch({ type: NAVIGATION_POP });
};

export const showOverlay = (overlayId: any) => (dispatch: Function, getState: Function) => {
  const { overlayInUse } = getState().appNavigation;
  if (!overlayInUse.includes(overlayId)) {
    Navigation.showOverlay(getLoadingLayout(overlayId));
    dispatch({ type: SET_OVERLAY_IN_USE, payload: [...overlayInUse, overlayId] });
  }
};

export const dismissOverlay = (overlayId: any) => (dispatch: Function, getState: Function) => {
  const { overlayInUse } = getState().appNavigation;
  if (overlayInUse.includes(overlayId)) {
    Navigation.dismissOverlay(overlayId);
    const newOverlayInUse = overlayInUse.filter(id => overlayId !== id);
    dispatch({ type: SET_OVERLAY_IN_USE, payload: newOverlayInUse });
  }
};

export const screenChanged = screenName => ({ type: SCREEN_CHANGED, screenName });

export const changeInnerTab = ({ index }, innerTabIndex) =>
  ({ type: CHANGE_INNER_TAB, tabIndex: index, innerTabIndex });


const initialState = {
  activeTab: 0,
  activeInnerTabs: {
    [APP_TABS.SCHEDULE.index]: 0,
    [APP_TABS.WORK.index]: 0,
  },
  activeScreen: null,
  navigator: {},
  overlayInUse: [],
  selectedTab: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    case RESELECT_TAB:
      return {
        ...state,
      };
    case SET_NAVIGATOR:
      return {
        ...state,
        navigator: action.payload,
      };
    case SET_OVERLAY_IN_USE:
      return {
        ...state,
        overlayInUse: action.payload,
      };
    case SCREEN_CHANGED:
      return {
        ...state,
        activeScreen: action.screenName,
      };
    case CHANGE_INNER_TAB: {
      const activeInnerTabs = { ...state.activeInnerTabs };
      activeInnerTabs[action.tabIndex] = action.innerTabIndex;
      return {
        ...state,
        activeInnerTabs,
      };
    }
    case NAVIGATION_POP: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

export default reducer;

export const appNavigationTypes = {
  SELECT_TAB,
  RESELECT_TAB,
  SET_NAVIGATOR,
  SCREEN_CHANGED,
  INNER_TAB_CHANGED: CHANGE_INNER_TAB,
  NAVIGATION_POP,
};

export const appNavigationActions = {
  screenChanged,
  innerTabChanged: changeInnerTab,
};

/* ---------------- SELECTORS --------------- */
export const getCurrentScreen = ({ appNavigation }) => appNavigation.activeScreen;
export const getActiveTab = ({ appNavigation }) => _.find(APP_TABS, { index: appNavigation.activeTab });
export const getActiveInnerTabIdxFor = tab =>
  ({ appNavigation }) =>
    ((tab && tab.index) ? appNavigation.activeInnerTabs[tab.index] : null);
export const getActiveInnerTab = (state) => {
  const tab = getActiveTab(state);
  const idx = getActiveInnerTabIdxFor(tab)(state);
  return _.find(tab.innerTabs, { index: idx });
};
