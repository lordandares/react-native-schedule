
const nothingToSeeHereMessage = theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    marginTop: theme.size.unit24,
    height: theme.size.unit192,
    width: theme.size.unit192,
  },
  info: {
    textAlign: 'center',
    color: theme.palette.infoText.color,
    fontSize: theme.size.unit24,
    fontWeight: '600',
  },
});

export default nothingToSeeHereMessage;
