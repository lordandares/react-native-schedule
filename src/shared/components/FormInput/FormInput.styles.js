// TODO: colors
export default function styles(theme) {
  return {
    container: {
    },
    input: {
      color: theme.palette.login.text,
      paddingLeft: 15,
      fontSize: 16,
      height: 40,
      backgroundColor: 'white',
      // Border
      borderRadius: 4,
      borderColor: '#cbcfd1',
      borderWidth: 1,
    },
    inputError: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  };
}

