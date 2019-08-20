import type { ShiftDetailComponentStyles } from './ShiftDetailComponent.types';

const shiftDetailComponentStyles: ShiftDetailComponentStyles = theme => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.palette.scheduleSubHeader.backgroundColor,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.common.white,
  },
  header: {
    paddingTop: theme.container.paddingTop,
    paddingLeft: theme.container.paddingLeft,
    paddingBottom: theme.container.paddingBottom,
    borderBottomColor: 'transparent',
  },
  headerText: {
    fontSize: theme.palette.subHeaderText.fontSize,
    fontWeight: theme.palette.subHeaderText.fontWeight,
    color: theme.palette.subHeaderText.color,
    textAlign: 'left',
  },
  contentContainer: {
    backgroundColor: 'white',
  },
  instructionsContainer: {
    height: 200,
    paddingHorizontal: 15,
  },
  instructionsContent: {
    backgroundColor: 'transparent',
  },
  usersClockinContainer: {
    backgroundColor: 'white',
  },
  clockButtonView: {
    marginBottom: 20,
  },
  clockInButton: {
    justifyContent: 'center',
    flex: 1,
    height: 34,
    backgroundColor: theme.palette.common.white,
  },
  clockInButtonText: {
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  clockOutButton: {
    justifyContent: 'center',
    flex: 1,
    height: 34,
    backgroundColor: theme.palette.error.main,
  },
  clockOutButtonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingModal: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(192,192,192,0.8)',
  },
});

export default shiftDetailComponentStyles;
