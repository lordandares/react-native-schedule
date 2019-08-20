// @flow
import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import i18n from '../../../../shared/i18n/i18next';
import COMMON from '../../../../shared/constants/common';
import CoverageListItem from '../../../../shared/components/CoverageListItem/CoverageListItem';
import Touchable from '../../../../shared//components/Touchable/Touchable';
import SiteSelect from '../../../Sites/SiteSelect/SiteSelectContainer';
import { TaskTemplateView } from '../../../../shared/components/TaskTemplate/TaskTemplateView/TaskTemplateView';
import { QDatePicker } from '../../../../shared/components/DatePicker/QDatePicker';
import type { ICreateTaskProps } from '../CreateTask.types';

export class CreateTaskView extends React.PureComponent<ICreateTaskProps> {
  navigateToSiteList = () => {
    this.props.viewModel.navigateToSiteList(this);
  };

  renderSite = () => <SiteSelect site={this.props.viewModel.selectedSite} onPress={this.navigateToSiteList} />;

  renderTemplateView = () => {
    const { viewModel: { selectedTemplate } } = this.props;
    const defaultTemplate = selectedTemplate;

    return <TaskTemplateView taskTemplate={defaultTemplate} />;
  };

  renderDate = () => {
    const {
      viewModel: {
        dateFormat, onDateChange, dueDate,
      },
      shortDateFormat,
    } = this.props;
    return (
      <QDatePicker
        dateFormat={dateFormat}
        shortDateFormat={shortDateFormat}
        onDateChange={(date: Date) => onDateChange(date, this)}
        dueDate={dueDate}
      />
    );
  };

  renderCoverage = () => {
    const {
      styles: { coverageHeader, coverageWrapper },
      viewModel: { selectedUser, navigateToCoverageList },
    } = this.props;
    return (
      <View>
        <Text style={coverageHeader}>{i18n.translate(COMMON.COVERAGE).toUpperCase()}</Text>
        <View style={coverageWrapper}>
          <CoverageListItem user={selectedUser} onPressItem={() => navigateToCoverageList(this)} />
        </View>
      </View>
    );
  };

  renderCreateButton = () => {
    const {
      viewModel: { createTask, shouldDisableCreateButton },
      styles: { createButtonEnabled, createButtonDisabled, createButtonText },
    } = this.props;
    const disabled = shouldDisableCreateButton();
    return (
      <Touchable onPress={createTask} data-testid="create-button" disabled={disabled}>
        <View style={disabled ? createButtonDisabled : createButtonEnabled}>
          <Text style={createButtonText}>{i18n.translate(COMMON.CREATE)}</Text>
        </View>
      </Touchable>
    );
  };

  render = () => {
    const { styles: { container } } = this.props;

    return (
      <ScrollView style={container}>
        {this.renderSite()}
        {this.renderTemplateView()}
        {this.renderDate()}
        {this.renderCoverage()}
        {this.renderCreateButton()}
      </ScrollView>
    );
  };
}
