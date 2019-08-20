export default theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.secondary.dark,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  // Top
  closeButton: {
    marginTop: theme.spacing.unit16,
    marginRight: theme.spacing.unit16,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  closeButtonIcon: {
    color: theme.palette.common.white,
  },
  // Menu
  menuContainer: {
    marginTop: theme.spacing.unit28,
    marginHorizontal: theme.spacing.unit32,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menuButton: {
    marginBottom: theme.spacing.unit12,
  },
  menuText: {
    color: theme.palette.common.white,
    fontSize: 20,
  },
  // Footer
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.unit16,
    marginHorizontal: theme.spacing.unit32,
  },
  footerText: {
    marginTop: theme.spacing.unit,
    fontSize: theme.size.unit10,
    color: theme.palette.common.white,
    fontWeight: '300',
  },
});

