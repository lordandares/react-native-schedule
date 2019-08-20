// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { withNamespaces } from 'react-i18next';

import Touchable from '../../Touchable/Touchable';
import CustomIcon from '../../../customIcons/NextIcons';
import { withStyles } from '../../../withStyles';
import { TaskTemplateViewStyles } from './TaskTemplateView.styles';
import type { ITaskTemplateDisplayProps } from '../TaskTemplate.types';
import TASK_TEMPLATE from '../constants/TaskTemplateView';

class taskTemplateView extends React.PureComponent<ITaskTemplateDisplayProps> {
  render = () => {
    const {
      styles: {
        container, templateHeader, templateContent, templateText, navIcon,
      },
      taskTemplate,
      onNavIconTouched,
      t: translate,
    } = this.props;
    return (
      <View style={container}>
        <Text style={templateHeader}>{translate(TASK_TEMPLATE.TEMPLATE).toUpperCase()}</Text>
        <Touchable testID="site-nav-button" disabled={onNavIconTouched === undefined} onPress={onNavIconTouched}>
          <View style={templateContent}>
            <Text style={templateText}>{taskTemplate.title}</Text>
            {onNavIconTouched && <CustomIcon testID="site-nav-icon" style={navIcon} name="caretright" />}
          </View>
        </Touchable>
      </View>
    );
  };
}

export const TaskTemplateView = withStyles(TaskTemplateViewStyles)(withNamespaces()(taskTemplateView));
