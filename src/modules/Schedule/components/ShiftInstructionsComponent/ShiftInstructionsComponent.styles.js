import type { ShiftInstructionsComponentStyles } from './ShiftInstructionsComponent.types';

const shiftInstructionsComponentStyles: ShiftInstructionsComponentStyles = theme => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.palette.scheduleSubHeader.backgroundColor,
  },
  header: {
    paddingTop: theme.container.paddingTop,
    paddingLeft: theme.container.paddingLeft,
    paddingBottom: theme.container.paddingBottom,
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: theme.palette.subHeaderText.fontSize,
    fontWeight: theme.palette.subHeaderText.fontWeight,
    color: theme.palette.subHeaderText.color,
  },
  headerAction: {
    fontSize: 16,
    color: theme.palette.primary.dark,
    marginRight: theme.spacing.unit16,
  },
});

export default shiftInstructionsComponentStyles;
