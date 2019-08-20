export default theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.grey[50],
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: theme.spacing.unit20,
    marginVertical: theme.spacing.unit16,
  },
  textTitle: {
    fontSize: 14,
    color: theme.palette.grey.gray9,
    fontWeight: 'bold',
    marginBottom: theme.spacing.unit12,
  },
  textContent: {
    fontSize: 12,
    color: theme.palette.grey.gray9,
    marginBottom: theme.spacing.unit12,
  },
});

