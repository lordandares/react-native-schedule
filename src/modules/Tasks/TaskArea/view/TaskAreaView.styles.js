export const taskAreaViewStyles = theme => ({
  container: {
    paddingLeft: theme.spacing.unit16,
    paddingBottom: theme.spacing.unit8,
    paddingRight: theme.spacing.unit4,
    height: '100%',
    width: '100%',

  },
  sectionHeader: {
    marginBottom: 2,
  },
  sectionHeaderText: theme.sectionTitle,
  sectionItem: {
    paddingBottom: 26,
    paddingTop: 26,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.palette.grey['500'],
  },
  sectionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.unit4,
  },
  sectionItemText: {
    fontSize: 16,
    fontWeight: theme.palette.semiBold.fontWeight,
    color: theme.palette.grey.gray9,
    width: '30%',
  },
  colorRating: {
    width: '100%',
  },
  navIcon: {
    color: theme.palette.primary.main,
    marginRight: 10,
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
  underlayColor: {
    color: theme.palette.grey['300'],
  },
  itemDetail: {
    paddingTop: 13,
  },
  itemDetailText: {
    fontSize: 14,
  },
});
