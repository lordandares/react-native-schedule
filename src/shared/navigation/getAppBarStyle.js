// @flow
export function getAppBarStyle(theme: any): any {
  return {
    topBar: {
      visible: true,
      elevation: 0,
      buttonColor: theme.palette.common.white,
      backButton: {
        color: theme.palette.common.white,
        showTitle: false,
        title: '',
      },
      rightButtons: [{
        id: 'rightButtons', // we need to add an id to make this works in ios
        color: theme.palette.common.white,
      }],
      background: {
        color: theme.palette.primary.dark,
      },
      title: {
        fontSize: theme.header.navBarTextFontSize,
        color: theme.header.navBarTextColor,
      },
      subtitle: {
        color: theme.header.navBarSubtitleColor,
        navBarSubtitleFontSize: theme.header.navBarSubtitleFontSize,
      },
    },
    bottomTab: {
      iconColor: theme.palette.grey[400],
      selectedIconColor: theme.palette.secondary.dark,
    },
  };
}
