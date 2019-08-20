import type { ShiftListComponentStyles } from './ShiftListComponent.types';

const shiftListComponentStyles : ShiftListComponentStyles = theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.common.white,
  },
  flex: {
    flex: 1,
  },
  subHeader: {
    backgroundColor: theme.palette.scheduleSubHeader.backgroundColor,
  },
  subHeaderText: {
    fontSize: theme.palette.subHeaderText.fontSize,
    fontWeight: theme.palette.subHeaderText.fontWeight,
    color: theme.palette.subHeaderText.color,
    paddingTop: theme.container.paddingTop,
    paddingLeft: theme.container.paddingLeft,
    paddingBottom: theme.container.paddingBottom,
  },
  scrollContainer: {
    paddingBottom: theme.scrollContainer.paddingBottom,
  },
});

export default shiftListComponentStyles;
