const homeComponentStyles = theme => ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
  },
  text: {
    fontSize: 15,
    color: theme.palette.text.primary,
    marginVertical: 10,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 15,
    color: theme.palette.error.main,
    marginVertical: 10,
    textAlign: 'center',
  },
  pickerText: {
    fontSize: 15,
    color: theme.palette.common.black,
    textAlign: 'center',
  },
});

export default homeComponentStyles;
