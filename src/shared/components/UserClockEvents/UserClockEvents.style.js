import { Platform } from 'react-native';
import theme from '../../theme';

const tabsComponentStyles = () => ({
  container: {
    marginLeft: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    height: 44,
  },
  mainContainer: {
    paddingBottom: theme.spacing.unit12,
  },
  totalHoursContainer: {
    marginLeft: 22,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.palette.unit,
  },
  totalHoursText: {
    fontWeight: '600',
    color: theme.palette.text.primary,
  },
  totalHoursLabel: {
    marginLeft: 18,
    width: 120,
  },
  noClockInLabel: {
    marginLeft: 18,
    width: 120,
    color: theme.palette.grey1,
  },
  displayRed: {
    color: theme.palette.error.main,
  },
  bullet: {
    backgroundColor: 'transparent',
    color: theme.palette.grey[400],
  },
  label: {
    marginLeft: 18,
    width: 70,
  },
  typeLabel: {
    color: theme.palette.grey[400],
    marginLeft: 5,
  },
  line: {
    position: 'absolute',
    left: 26,
    top: Platform.OS === 'ios' ? 19 : 20,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  lineCircle: {
    paddingVertical: Platform.OS === 'ios' ? 1.5 : 1,
    zIndex: 10,
    backgroundColor: 'transparent',
    color: theme.palette.grey[400],
  },
});

export default tabsComponentStyles;
