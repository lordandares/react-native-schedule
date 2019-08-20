const scheduleComponentStyles = theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.common.white,
  },
  tabContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
  emptyList: {
    marginTop: theme.spacing.unit32,
  },
  datePicker: {
    zIndex: -1,
    position: 'absolute',
  },
});

export default scheduleComponentStyles;
