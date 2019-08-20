const shiftListItemComponentStyles = theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.unit16,
    paddingStart: theme.spacing.unit16,
    paddingEnd: theme.spacing.unit20,
    minHeight: theme.spacing.unit72,
    backgroundColor: theme.palette.common.white,
    borderLeftColor: theme.palette.common.white,
    borderLeftWidth: 3,
  },
  activeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.unit16,
    paddingStart: theme.spacing.unit16,
    paddingEnd: theme.spacing.unit20,
    minHeight: theme.spacing.unit72,
    backgroundColor: 'rgba(23, 168, 235, 0.1)',
    borderLeftColor: theme.palette.primary.light,
    borderLeftWidth: 3,
  },
  leftContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarButtonContainer: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: theme.spacing.unit16,
  },
  textsContainer: {
    flex: 1,
  },
  rightContainer: {},
  title: {
    fontSize: theme.palette.title.fontSize,
    fontWeight: theme.palette.title.fontWeight,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.unit4,
  },
  hoursTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // TODO: Pull all the specific text styles out and use re-usable styles from the theme
  subtitle: {
    fontSize: theme.palette.subTitle.fontSize,
    fontWeight: theme.palette.subTitle.fontWeight,
    color: theme.palette.text.primary,
  },
  locationText: {
    fontSize: theme.palette.subInformation.fontSize,
    color: theme.palette.text.secondary,
  },
  textCompleteView: {
    marginLeft: theme.spacing.unit20,
  },
  completeText: {
    fontSize: theme.palette.title.fontSize,
    fontWeight: '600',
    color: theme.palette.common.black,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: theme.spacing.unit16,
    borderColor: theme.palette.error.main,
    borderWidth: 2,
  },
  repeatingIconSmall: {
    marginLeft: 6,
  },
  repeatingIconBig: {
    marginLeft: 6,
  },
  avatarImage: {
    // we are going to add this in a new story.
  },
});

export default shiftListItemComponentStyles;
