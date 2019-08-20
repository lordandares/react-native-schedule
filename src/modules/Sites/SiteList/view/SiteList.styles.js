const SiteListStyles = theme => ({
  sitesContainer: {
    paddingTop: theme.spacing.unit32,
    paddingBottom: theme.spacing.unit32,
    paddingLeft: theme.spacing.unit20,
  },
  title: {
    fontSize: theme.palette.title.fontSize,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.common.white,
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


export default SiteListStyles;
