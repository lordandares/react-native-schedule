export const QDatePickerStyles = theme => ({
  datePickerHeader: theme.sectionTitle,
  datePicker: {
    width: '100%',
    maxWidth: '100%',
    marginTop: theme.spacing.unit,
  },
  dateText: {
    color: theme.palette.text.primary,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
    paddingLeft: theme.spacing.unit16,
  },
  dateTouchBody: {
    flexDirection: 'row-reverse',
    backgroundColor: theme.palette.common.white,
    borderWidth: 1,
    borderColor: theme.palette.grey[100],
  },
  dateIconStyle: {
    marginLeft: theme.spacing.unit16,
  },
});
