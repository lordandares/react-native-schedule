import ThemedStyleSheet from 'react-with-styles/src/ThemedStyleSheet';
import reactNativeInterface from 'react-with-styles-interface-react-native/src/reactNativeInterface';
import { css, withStyles } from 'react-with-styles';
import theme from './theme';

ThemedStyleSheet.registerTheme(theme);
ThemedStyleSheet.registerInterface(reactNativeInterface);

export { withStyles, css };
