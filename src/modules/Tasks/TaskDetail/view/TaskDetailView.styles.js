const inspectionDetailViewStyles = theme => ({
  container: {
    paddingLeft: theme.spacing.unit16,
    paddingBottom: theme.spacing.unit8,
    paddingRight: theme.spacing.unit4,
    height: '100%',
    width: '100%',
  },
  ListContainer: {
    paddingRight: theme.spacing.unit16,
    paddingLeft: theme.spacing.unit16,
    height: '100%',
    width: '100%',
  },
  sectionHeader: {
    marginBottom: 2,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.palette.grey.gray9,
  },
  sectionItem: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 26,
    paddingTop: 26,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.palette.grey['500'],
  },
  sectionItemText: {
    fontSize: 16,
    fontWeight: theme.palette.semiBold.fontWeight,
    color: theme.palette.grey.gray9,
    width: '80%',
  },
  navIcon: {
    color: theme.palette.primary.main,
  },
  submitButton: {
    borderRadius: theme.size.unit,
    backgroundColor: theme.palette.common.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    ...theme.buttonText,
  },
});

export default inspectionDetailViewStyles;
