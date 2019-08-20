const workTicketItemComponentStyles = theme => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingStart: 17,
    paddingEnd: 20,
    minHeight: 72,
    backgroundColor: theme.palette.common.white,
    borderLeftColor: theme.palette.common.white,
    borderLeftWidth: 3,
    borderBottomColor: theme.palette.grey[200],
    borderBottomWidth: 1,
  },
  avatarContainer: {
    marginRight: theme.spacing.unit16,
  },
  textsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: theme.palette.title.fontSize,
    fontWeight: theme.palette.title.fontWeight,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.unit4,
  },
  assigned: {
    fontSize: theme.palette.subTitle.fontSize,
    fontWeight: theme.palette.subTitle.fontWeight,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing.unit4,
  },
  unassigned: {
    fontSize: theme.palette.subTitle.fontSize,
    fontWeight: '400',
    color: theme.palette.error.main,
    marginBottom: theme.spacing.unit4,
  },
  siteCustomerText: {
    fontSize: theme.palette.subInformation.fontSize,
    color: theme.palette.grey[500],
  },
  margin: {
    marginTop: 5,
  },
  closedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextClosed: {
    ...theme.statusTextClosed,
  },
  statusTextTitle: {
    ...theme.statusText,
    color: theme.palette.common.black,
  },
  closedCommonText: {
    fontSize: 13,
    color: theme.palette.grey[700],
  },
});

export default workTicketItemComponentStyles;
