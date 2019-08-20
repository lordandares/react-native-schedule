const siteSelectStyles = theme => (
  {
    container: {
      backgroundColor: theme.palette.common.white,
    },
    sectionTitle: {
      ...theme.sectionTitle,
      paddingBottom: theme.spacing.unit,
      backgroundColor: theme.palette.grey[50],
    },
    sectionSubtitle: {
      ...theme.sectionSubtitle,
      marginTop: theme.spacing.unit8,
    },
    sectionSubtitleMargin: {
      margin: theme.size.unit10,
    },
    sectionContent: {
      ...theme.sectionContent,
    },
    siteContainer: {
      flexDirection: 'row',
      backgroundColor: theme.palette.grey[50],
      borderWidth: 1,
      borderColor: theme.palette.grey[100],
      borderTopLeftRadius: theme.size.unit,
      borderTopRightRadius: theme.size.unit,
      padding: theme.size.unit10,
      alignItems: 'center',
      top: -1,
    },
    spacer: {
      flexGrow: 1,
    },
    caret: {
      marginRight: theme.spacing.unit,
    },
    siteText: {
      ...theme.linkText,
      marginLeft: theme.spacing.unit16,
    },
    disabledSiteText: {
      ...theme.linkText,
      color: theme.palette.text.primary,
      marginLeft: theme.spacing.unit16,
    },
    customerContainer: {
      borderWidth: 1,
      borderColor: theme.palette.grey[100],
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      paddingRight: theme.spacing.unit16,
      paddingLeft: theme.spacing.unit16,
      paddingBottom: theme.spacing.unit16,
      top: -1,
    },
    emptySiteContainer: {
      borderWidth: 1,
      borderColor: theme.palette.grey[100],
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      paddingRight: theme.spacing.unit16,
      paddingLeft: theme.spacing.unit16,
      paddingBottom: theme.spacing.unit16,
      top: -1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    emptyIcon: {
      marginTop: theme.spacing.unit16,
    },
  });


export default siteSelectStyles;
