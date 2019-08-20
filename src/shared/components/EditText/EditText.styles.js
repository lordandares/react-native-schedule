export default function styles(theme) {
  return {
    container: {
    },
    input: {
      color: theme.palette.login.text,
      paddingLeft: 15,
      marginRight: 15,
      fontSize: 16,
      backgroundColor: 'white',
      // Border
      borderRadius: 4,
      borderColor: '#cbcfd1',
      borderWidth: 1,
    },
    iosInput: {
      color: theme.palette.login.text,
      paddingLeft: 15,
      marginRight: 15,
      fontSize: 16,
      backgroundColor: 'white',
      // Border
      borderRadius: 4,
      borderColor: '#cbcfd1',
      borderWidth: 1,
      paddingBottom: 4,
    },
    disabledInput: {
      backgroundColor: theme.palette.grey[100],
    },
    title: {
      ...theme.palette.title,
      fontWeight: theme.palette.semiBold.fontWeight,
      paddingTop: theme.spacing.unit20,
      marginBottom: theme.spacing.unit8,
    },
  };
}

