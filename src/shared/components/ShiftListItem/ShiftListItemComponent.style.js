const shiftListItemComponentStyles = theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingStart: 17,
    paddingEnd: 20,
    minHeight: 72,
    backgroundColor: theme.palette.common.white,
    borderLeftColor: theme.palette.common.white,
    borderLeftWidth: 3,
  },
  activeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingStart: 17,
    paddingEnd: 20,
    minHeight: 72,
    backgroundColor: theme.palette.active,
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
    marginRight: 16,
  },
  textsContainer: {
    flex: 1,
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    width: 108,
    height: 70,
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
  },
  activeTime: {
    backgroundColor: theme.palette.active,
  },
  clockInButton: {
    justifyContent: 'center',
    width: 108,
    height: 34,
    backgroundColor: theme.palette.success.main,
    borderRadius: 4,
  },
  clockInButtonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  clockOutButton: {
    justifyContent: 'center',
    width: 108,
    height: 34,
    backgroundColor: theme.palette.error.main,
    borderRadius: 4,
  },
  clockOutButtonText: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  clockButtonView: {
    marginLeft: 20,
  },
  hoursTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: theme.palette.title.fontSize,
    fontWeight: '600',
    color: theme.palette.text.primary,
  },
  locationText: {
    fontSize: theme.palette.subInformation.fontSize,
    color: theme.palette.text.secondary,
  },
  textCompleteView: {
    marginLeft: 20,
  },
  completeText: {
    fontSize: theme.palette.title.fontSize,
    fontWeight: '600',
    color: theme.palette.common.black,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderColor: theme.palette.error.main,
    borderWidth: 2,
  },
  repeatingIcon: {
    marginLeft: 6,
  },
  title: {
    fontSize: theme.palette.title.fontSize,
    fontWeight: theme.palette.title.fontWeight,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.unit4,
  },
  containerExceptionName: {
    flexDirection: 'row',
  },
  lineCircle: {
    marginLeft: theme.spacing.unit8,
    marginRight: theme.spacing.unit8,
    marginTop: 6,
  },
  hoursDescription: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: theme.size.unit16,
    fontWeight: '600',
  },
  displayRed: {
    color: theme.palette.error.main,
  },
  avatarImage: {
    // we are going to add this in a new story.
  },
});

export default shiftListItemComponentStyles;
