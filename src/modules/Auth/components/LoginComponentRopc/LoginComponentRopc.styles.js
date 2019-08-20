import { Platform } from 'react-native';

const homeComponentStyles = theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.login.background,
    paddingHorizontal: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  padding4: {
    height: theme.spacing.unit,
  },
  padding20: {
    height: theme.spacing.unit20,
  },
  // Content
  logoImage: {
    marginTop: theme.spacing.unit20,
    alignSelf: 'center',
    height: 140,
    resizeMode: 'contain',
  },
  testIndicator: {
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: 50,
    left: -50,
  },
  loginButton: {
    height: 40,
    width: '100%',
    backgroundColor: theme.palette.common.green,
    elevation: Platform.select({ ios: null, android: 3 }),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  loginButtonText: {
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordButtonContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordButtonText: {
    color: theme.palette.primary.main,
    fontWeight: '600',
    fontSize: 14,
  },
  logoutButton: {
    height: 40,
    marginHorizontal: 74,
    marginBottom: theme.spacing.unit20,
  },
  welcomeText: {
    fontSize: 20,
    color: theme.palette.login.text,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
  },
  warningText: {
    backgroundColor: theme.palette.error.light,
    borderRadius: 4,
    borderColor: theme.palette.error.light,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '400',
    color: theme.palette.error.main,
    padding: theme.spacing.unit8,
    marginTop: theme.spacing.unit12,
  },
  // Environment picker
  pickerText: {
    fontSize: 15,
    color: theme.palette.common.black,
    textAlign: 'center',
  },
  loadingModal: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1004,
    backgroundColor: 'rgba(192,192,192,0.8)',
  },
  // Forgot Password WebView
  forgotPasswordWebView: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
  },
  forgotPasswordWebViewCloseButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.select({ ios: 0, andorid: 10 }),
    height: 40,
  },
});

export default homeComponentStyles;
