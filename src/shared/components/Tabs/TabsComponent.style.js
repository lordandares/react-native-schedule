const tabsComponentStyles = theme => ({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flex: 1,
    height: theme.spacing.unit48,
    maxHeight: theme.spacing.unit48,
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    height: theme.spacing.unit48,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    backgroundColor: theme.palette.primary.dark,
  },
  tabContainerActive: {
    borderBottomColor: theme.palette.secondary.dark,
  },
  tabText: {
    fontSize: theme.palette.subInformation.fontSize,
    fontWeight: theme.palette.subHeaderText.fontWeight,
    color: theme.header.navBarSubtitleColor,
    textAlign: 'center',
    marginBottom: theme.spacing.unit12,
    marginTop: theme.spacing.unit12,
  },
  tabTextActive: {
    color: theme.palette.common.white,
  },
  contentContainer: {
    flex: 1,
  },
});

export default tabsComponentStyles;
