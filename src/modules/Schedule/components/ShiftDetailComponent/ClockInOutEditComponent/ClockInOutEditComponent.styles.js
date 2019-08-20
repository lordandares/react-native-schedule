import type { ClockInOutEditComponentStyles } from './ClockInOutEditComponent.types';

const clockInOutEditComponentStyles: ClockInOutEditComponentStyles = theme => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.palette.scheduleSubHeader.backgroundColor,
  },
  scrollViewWrapper: {
    flex: 1,
  },
  paddingWrapper: {
    paddingTop: theme.spacing.unit24,
    paddingBottom: theme.spacing.unit16,
  },
  separateItem: {
    marginBottom: theme.spacing.unit16,
  },
  containerItem: {
    flexDirection: 'row',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit16,
    borderBottomWidth: 1,
    borderColor: theme.palette.grey[100],
  },
  text: {
    flex: 1,
    fontSize: theme.size.unit16,
  },
  eventTimeText: {
    flex: 3,
  },
  totalWrapper: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing.unit20,
    fontSize: theme.size.unit16,
  },
  hoursDescription: {
    flex: 4,
    fontSize: theme.size.unit16,
    fontWeight: '600',
  },
  displayRed: {
    color: theme.palette.error.main,
  },
  saveButtonContainer: {
    backgroundColor: 'white',
    padding: theme.spacing.unit8,
  },
  saveButton: {
    backgroundColor: theme.palette.primary.dark,
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default clockInOutEditComponentStyles;
