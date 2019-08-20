export const TaskTemplateViewStyles = theme => ({
  container: {
    marginTop: theme.spacing.unit12,
    marginBottom: theme.spacing.unit16,
  },
  templateHeader: {
    ...theme.sectionTitle,
  },
  templateContent: {
    borderWidth: 1,
    borderRadius: theme.size.unit,
    borderColor: theme.palette.grey[100],
    padding: theme.spacing.unit16,
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateText: {
    fontSize: theme.size.unit16,
    fontWeight: theme.palette.semiBold.fontWeight,
    color: theme.palette.text.primary,
  },
  navIcon: {
    color: theme.palette.grey.A600,
    fontSize: theme.size.unit24,
    fontWeight: theme.palette.title.fontWeight,
  },
});
