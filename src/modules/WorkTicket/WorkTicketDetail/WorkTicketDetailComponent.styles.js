const workDetailComponentStyles = theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.common.white,
  },
  scrollView: { padding: theme.spacing.unit20 },
  sectionTitle: {
    ...theme.sectionTitle,
  },
  sectionSubtitle: {
    ...theme.sectionSubtitle,
  },
  sectionSubtitleMargin: {
    margin: theme.size.unit10,
  },
  sectionContent: {
    ...theme.sectionContent,
  },
  sectionContentPrimary: {
    color: theme.palette.common.darkBlue,
  },
  sectionContainer: { marginTop: theme.spacing.unit20 },
  dueDateTextContainer: { flexDirection: 'row' },
  dueDateText: {
    ...theme.dueDateText,
  },
  dueDateDiffText: {
    ...theme.dueDateDiffText,
  },
  siteContainer: {
    flexDirection: 'row',
    backgroundColor: theme.palette.grey[50],
    borderWidth: 1,
    borderColor: theme.palette.grey[100],
    borderTopLeftRadius: theme.size.unit,
    borderTopRightRadius: theme.size.unit,
    padding: theme.size.unit10,
    alignItems: 'center',
  },
  siteText: {
    ...theme.linkText,
    marginLeft: theme.spacing.unit16,
  },
  customerContainer: {
    ...theme.customerContainer,
  },
  bottomContainer: {
    width: '100%',
    padding: theme.spacing.unit16,
    backgroundColor: theme.palette.common.darkIndigo,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainerClosed: {
    backgroundColor: theme.palette.common.lightGreen,
  },
  statusContainer: {
    flex: 1,
    marginLeft: theme.size.unit10,
  },
  statusDesc: {
    ...theme.statusUser,
  },
  statusDescClosed: {
    ...theme.statusUserClosed,
  },
  statusText: {
    ...theme.statusText,
  },
  statusTextClosed: {
    ...theme.statusTextClosed,
  },
  statusUser: {
    ...theme.statusUser,
  },
  statusUserClosed: {
    ...theme.statusUserClosed,
  },
  bold: { ...theme.palette.bold },
  button: {
    borderRadius: theme.size.unit,
    backgroundColor: theme.palette.common.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...theme.buttonText,
  },
});

export default workDetailComponentStyles;
