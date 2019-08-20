// @flow
export const CreateTaskStyles = (theme: Object) => ({
  container: {
    paddingHorizontal: theme.spacing.unit16,
    marginVertical: theme.spacing.unit16,
  },
  coverageWrapper: {
    borderWidth: 1,
    borderColor: theme.palette.grey[100],
  },
  coverageHeader: {
    ...theme.sectionTitle,
    marginTop: theme.spacing.unit16,
  },
  createButtonEnabled: {
    borderRadius: theme.size.unit,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.common.darkBlue,
  },
  createButtonDisabled: {
    borderRadius: theme.size.unit,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.grey.A200,
  },
  createButtonText: theme.buttonText,
});
