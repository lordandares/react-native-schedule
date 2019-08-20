import type { ShiftCoverageComponentStyles } from './ShiftCoverageComponent.types';

const shiftCoverageComponentStyles: ShiftCoverageComponentStyles = theme => ({
  wrapper: {
    flex: 1,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.searchInput.background,
  },
  searchIcon: {
    height: theme.spacing.unit48,
    paddingHorizontal: theme.spacing.unit12,
    paddingVertical: theme.spacing.unit8,
  },
  textInput: {
    flex: 1,
    height: theme.spacing.unit48,
    paddingHorizontal: theme.spacing.unit16,
    paddingRight: theme.spacing.unit12,
    paddingLeft: 0,
  },
  buttonBar: {
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.palette.grey[100],
  },
  button: {
    width: 100,
  },
});

export default shiftCoverageComponentStyles;
