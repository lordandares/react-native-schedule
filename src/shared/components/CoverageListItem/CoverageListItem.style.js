const CoverageListItemStyles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.size.unit24,
    paddingHorizontal: theme.size.unit16,
    backgroundColor: theme.palette.common.white,
  },
  touchable: {
    backgroundColor: theme.palette.common.white,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {},
  nameTextContainer: {
    flex: 1,
  },
  payRateTextContainer: {
    marginLeft: 20,
  },
  fullNameText: {
    fontSize: 16, // temporary assignment
    fontWeight: '600',
    color: theme.palette.text.primary, // temporary assignment
  },
  payRateText: {
    fontSize: 12, // temporary assignment
    color: theme.palette.text.primary, // temporary assignment
  },
  avatarContainer: {
    marginRight: theme.spacing.unit * 4,
  },
  avatarStyles: {
    fontSize: 36,
    color: theme.palette.error.main, // temporary assignment
  },
  avatarStylesSelected: {
    // TEMP STYLE TO MARK SELECTED USER
    fontSize: 36,
    color: theme.palette.primary.main,
  },
  assignText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.primary.dark,
  },
});

export default CoverageListItemStyles;
