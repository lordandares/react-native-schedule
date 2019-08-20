// @flow
import { Navigation } from 'react-native-navigation';
import ScheduleComponent from './modules/Schedule/ScheduleComponentContainer';
import SitesComponent from './modules/Sites/SitesComponentContainer';
import SiteList from './modules/Sites/SiteList/SiteListContainer';
import SiteShiftsComponent from './modules/Sites/SiteShiftsComponentContainer';
import WorkComponent from './modules/Work/WorkComponentContainer';
import WorkTicketDetailComponentContainer from './modules/WorkTicket/WorkTicketDetailComponentContainer';
import ShiftDetailComponent from './modules/Schedule/ShiftDetailComponentContainer';
import ShiftCoverageComponent from './modules/Schedule/ShiftCoverageComponentContainer';
import ShiftInstructionsComponent from './modules/Schedule/ScheduleInstructionComponentContainer';
import ClockInOutEditComponent from './modules/Schedule/ClockInOutComponentContainer';
import LoginComponent from './modules/Auth/LoginComponentContainer';
import SideDrawerContainer from './modules/SideDrawer/SideDrawerContainer';
import LegalPageContainer from './modules/LegalPage/LegalPageContainer';
import { TaskDetailContainer } from './modules/Tasks/TaskDetail/TaskDetailContainer';
import { TaskAreaContainer } from './modules/Tasks/TaskArea/TaskAreaContainer';
import TaskItemContainer from './modules/Tasks/TaskItem/TaskItemContainer';
import { CreateTaskContainer } from './modules/Tasks/CreateTask/CreateTaskContainer';
import { CoverageListContainer } from './shared/components/CoverageList/CoverageListContainer';
import CreateShiftContainer from './modules/Schedule/CreateShiftComponentContainer';
import {
  SCREEN_SIDE_DRAWER,
  SCREEN_LEGAL_PAGE,
  SCREEN_LOADING,
  SCREEN_TASK_DETAIL,
  SCREEN_WORK_DETAIL,
  SCREEN_WORK_LIST,
  SCREEN_TASK_AREA,
  SCREEN_TASK_ITEM,
  SCREEN_CREATE_TASK,
  SCREEN_SITE_LIST,
  SCREEN_COVERAGE_LIST,
  SCREEN_CREATE_SHIFT,
} from './shared/constants/screens';
import LoadingScreen from './modules/Loading/LoadingScreen';

export const registerScreens = (store: any, provider: any) => {
  Navigation.registerComponentWithRedux('Schedule', () => ScheduleComponent, provider, store);
  Navigation.registerComponentWithRedux('Sites', () => SitesComponent, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_SITE_LIST, () => SiteList, provider, store);
  Navigation.registerComponentWithRedux('SiteShifts', () => SiteShiftsComponent, provider, store);
  Navigation.registerComponentWithRedux('ShiftCoverage', () => ShiftCoverageComponent, provider, store);
  Navigation.registerComponentWithRedux('ShiftDetail', () => ShiftDetailComponent, provider, store);
  Navigation.registerComponentWithRedux('ShiftInstructions', () => ShiftInstructionsComponent, provider, store);
  Navigation.registerComponentWithRedux('ClockInOutEditComponent', () => ClockInOutEditComponent, provider, store);
  Navigation.registerComponentWithRedux('Auth', () => LoginComponent, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_WORK_LIST, () => WorkComponent, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_WORK_DETAIL, () => WorkTicketDetailComponentContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_SIDE_DRAWER, () => SideDrawerContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_LEGAL_PAGE, () => LegalPageContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_LOADING, () => LoadingScreen);
  Navigation.registerComponentWithRedux(SCREEN_TASK_DETAIL, () => TaskDetailContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_TASK_AREA, () => TaskAreaContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_TASK_ITEM, () => TaskItemContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_CREATE_TASK, () => CreateTaskContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_COVERAGE_LIST, () => CoverageListContainer, provider, store);
  Navigation.registerComponentWithRedux(SCREEN_CREATE_SHIFT, () => CreateShiftContainer, provider, store);
};
