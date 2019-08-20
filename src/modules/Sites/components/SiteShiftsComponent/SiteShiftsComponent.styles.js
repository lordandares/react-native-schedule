import type { SiteShiftsComponentStyles } from './SiteShiftsComponent.types';

const siteShiftsComponentStyles: SiteShiftsComponentStyles = theme => ({
  scrollContainer: {
    backgroundColor: theme.palette.scheduleSubHeader.backgroundColor,
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

export default siteShiftsComponentStyles;
