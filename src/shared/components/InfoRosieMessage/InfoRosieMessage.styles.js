const infoRosieMessage = theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: theme.size.unit14,
    alignSelf: 'center',
    height: theme.size.unit44,
    width: theme.size.unit44,
  },
  info: {
    textAlign: 'center',
    color: theme.palette.infoText.color,
    fontSize: theme.palette.infoText.fontSize,
  },
});

export default infoRosieMessage;
