import React from 'react';
import { View, StyleSheet, WebView, Platform } from 'react-native';
import RNFS from 'react-native-fs';

import WebViewQuillEditorStyles from './WebViewQuillEditor.styles';

type Props = {
  theme: string,
  onDeltaChangeCallback(): void,
  getDeltaCallback(): void,
  backgroundColor: string,
  htmlContentToDisplay: string,
  contentToDisplay: string,
};

const MESSAGE_PREFIX = 'react-native-webview-quilljs';

export default class WebViewQuillEditor extends React.Component<Props> {
  constructor() {
    super();
    this.state = {
      webViewFilesNotAvailable: true,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ webViewFilesNotAvailable: false });
  }

  // get the contents of the editor.  The contents will be in the Delta format
  // defined here: https://quilljs.com/docs/delta/
  getDelta = () => {
    this.sendMessage('GET_DELTA');
  };

  handleMessage = (event) => {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (msgData.prefix && msgData.prefix === MESSAGE_PREFIX) {
        // eslint-disable-next-line
        // console.log(`WebViewQuillEditor: received message ${msgData.type}`, msgData);
        this.sendMessage('MESSAGE_ACKNOWLEDGED');
        switch (msgData.type) {
          case 'EDITOR_LOADED':
            this.editorLoaded();
            break;
          case 'TEXT_CHANGED':
            if (this.props.onDeltaChangeCallback) {
              this.props.onDeltaChangeCallback(msgData.payload);
            }
            break;
          case 'RECEIVE_DELTA':
            if (this.props.getDeltaCallback) this.props.getDeltaCallback(msgData.payload);
            break;
          default:
            // eslint-disable-next-line
            console.warn(
              `WebViewQuillEditor Error: Unhandled message type received "${msgData.type}"`);
        }
      }
    } catch (err) {
      // eslint-disable-next-line
      console.warn(err);
    }
  };

  webViewLoaded = () => {
    this.sendMessage('LOAD_EDITOR', {
      theme: this.props.theme,
    });
    if (this.props.backgroundColor) {
      this.sendMessage('SET_BACKGROUND_COLOR', {
        backgroundColor: this.props.backgroundColor,
      });
    }
  };

  editorLoaded = () => {
    // send the content to the editor if we have it
    if (this.props.contentToDisplay) {
      this.sendMessage('SET_CONTENTS', {
        delta: this.props.contentToDisplay,
      });
    }
    if (this.props.htmlContentToDisplay) {
      this.sendMessage('SET_HTML_CONTENTS', {
        html: this.props.htmlContentToDisplay,
      });
    }
  };

  sendMessage = (type, payload) => {
    // only send message when webview is loaded
    if (this.webview) {
      this.webview.postMessage(
        JSON.stringify({
          prefix: MESSAGE_PREFIX,
          type,
          payload,
        }),
        '*',
      );
    }
  };

  createWebViewRef = (webview) => {
    this.webview = webview;
  };

  render = () => {
    const quillEditorHtml = `file://${RNFS.MainBundlePath}/reactQuillEditor-index.html`;
    const source =
      Platform.OS === 'ios'
        ? { uri: quillEditorHtml }
        : { uri: 'file:///android_asset/dist/reactQuillEditor-index.html' };
    return (
      <View style={WebViewQuillEditorStyles.container}>
        {!this.state.webViewFilesNotAvailable && (
          <WebView
            style={{
              flex: 1,
              ...StyleSheet.absoluteFillObject,
            }}
            ref={this.createWebViewRef}
            source={source}
            originWhitelist={['*']}
            onLoadEnd={this.webViewLoaded}
            onMessage={this.handleMessage}
            javaScriptEnabled
          />
        )}
      </View>
    );
  };
}

// Specifies the default values for props:
WebViewQuillEditor.defaultProps = {
  theme: 'snow',
};
